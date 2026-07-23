'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Avatar, Badge, Card } from '@nova/ui';
import { formatTime } from '@nova/utils';
import type { Message, Channel } from '@nova/types';
import { 
  Hash, Send, Plus, Users, Settings, Bell, Search, 
  Smile, Paperclip, MoreVertical, LogOut, ArrowLeft,
  Activity, Server, Database, RefreshCw, Cpu, MessageSquare,
  UserCheck, UserPlus, ChevronDown
} from 'lucide-react';

const mockChannels: Channel[] = [
  { id: '1', name: 'general', description: 'KnapF Team Announcements & Daily Updates', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'engineering', description: 'Frontend, NestJS backend, monorepo discussions', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'deployments', description: 'Vercel & CI/CD deployment status', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'design-system', description: 'Shared Tailwind UI components', isPrivate: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export interface CustomUserProfile {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  status: 'online' | 'offline';
}

const defaultTeamMembers: CustomUserProfile[] = [
  { id: 'u1', name: 'Sayanna', email: 'sayanna@knapf.dev', role: 'ADMIN', status: 'online' },
  { id: 'u2', name: 'Pawan', email: 'pawan@knapf.dev', role: 'ADMIN', status: 'online' },
  { id: 'u3', name: 'Sarojana', email: 'sarojana@knapf.dev', role: 'MODERATOR', status: 'online' },
  { id: 'u4', name: 'Bhavishya', email: 'bhavishya@knapf.dev', role: 'USER', status: 'online' },
  { id: 'u5', name: 'Kittu', email: 'kittu@knapf.dev', role: 'USER', status: 'online' },
  { id: 'u6', name: 'Naveen', email: 'naveen@knapf.dev', role: 'USER', status: 'online' },
];

const defaultInitialMessages: Message[] = [
  {
    id: 'm1',
    content: 'Welcome everyone! Sayanna, Pawan, Sarojana, Bhavishya, Kittu, and Naveen — KnapF-Chat is live on Vercel!',
    userId: 'u1',
    channelId: '1',
    user: { id: 'u1', name: 'Sayanna', email: 'sayanna@knapf.dev', role: 'ADMIN', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    content: 'Awesome! Everyone can now select their name or create a profile to chat live like Discord!',
    userId: 'u2',
    channelId: '1',
    user: { id: 'u2', name: 'Pawan', email: 'pawan@knapf.dev', role: 'ADMIN', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    content: 'Great work team! Pick your user profile in the bottom left corner to send messages as yourself.',
    userId: 'u3',
    channelId: '1',
    user: { id: 'u3', name: 'Sarojana', email: 'sarojana@knapf.dev', role: 'MODERATOR', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const LOCAL_STORAGE_MESSAGES_KEY = 'knapf_chat_messages_v2';
const LOCAL_STORAGE_USER_KEY = 'knapf_chat_active_user_v2';
const LOCAL_STORAGE_MEMBERS_KEY = 'knapf_chat_team_members_v2';

export default function CombinedApp() {
  const [view, setView] = useState<'chat' | 'admin'>('chat');
  const [activeChannel, setActiveChannel] = useState<Channel>(mockChannels[0]);
  const [teamMembers, setTeamMembers] = useState<CustomUserProfile[]>(defaultTeamMembers);
  const [currentUser, setCurrentUser] = useState<CustomUserProfile>(defaultTeamMembers[0]);
  const [messages, setMessages] = useState<Message[]>(defaultInitialMessages);
  const [inputText, setInputText] = useState('');
  
  // Profile Switcher state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'USER' | 'MODERATOR' | 'ADMIN'>('USER');

  // Load from localStorage & setup BroadcastChannel sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load custom team members
    const savedMembers = localStorage.getItem(LOCAL_STORAGE_MEMBERS_KEY);
    if (savedMembers) {
      try {
        setTeamMembers(JSON.parse(savedMembers));
      } catch (e) {
        console.error(e);
      }
    }

    // Load active user
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    // Load saved messages
    const savedMsgs = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    if (savedMsgs) {
      try {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Real-time broadcast sync across tabs/windows
    const bc = new BroadcastChannel('knapf_chat_channel');
    bc.onmessage = (event) => {
      if (event.data && event.data.type === 'NEW_MESSAGE') {
        setMessages(event.data.messages);
      } else if (event.data && event.data.type === 'NEW_MEMBER') {
        setTeamMembers(event.data.members);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_MESSAGES_KEY && e.newValue) {
        try {
          setMessages(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      bc.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save active user profile
  const handleSelectUser = (user: CustomUserProfile) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    }
    setIsProfileModalOpen(false);
  };

  // Add new team member profile
  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    const newMember: CustomUserProfile = {
      id: `u-${Date.now()}`,
      name: newUserName.trim(),
      email: `${newUserName.toLowerCase().replace(/\s+/g, '')}@knapf.dev`,
      role: newUserRole,
      status: 'online',
    };

    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    setCurrentUser(newMember);

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_MEMBERS_KEY, JSON.stringify(updatedMembers));
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newMember));
      
      const bc = new BroadcastChannel('knapf_chat_channel');
      bc.postMessage({ type: 'NEW_MEMBER', members: updatedMembers });
      bc.close();
    }

    setNewUserName('');
    setIsProfileModalOpen(false);
  };

  // Send message as the active user profile
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      content: inputText.trim(),
      userId: currentUser.id,
      channelId: activeChannel.id,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText('');

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(updatedMessages));
      const bc = new BroadcastChannel('knapf_chat_channel');
      bc.postMessage({ type: 'NEW_MESSAGE', messages: updatedMessages });
      bc.close();
    }
  };

  const channelMessages = messages.filter((m) => m.channelId === activeChannel.id);

  return (
    <div className="h-screen w-screen flex bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/70 flex flex-col justify-between select-none">
        <div>
          {/* Workspace Branding */}
          <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
                K
              </div>
              <span className="font-bold text-slate-100 text-sm tracking-wide">KnapF Workspace</span>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="p-3 border-b border-slate-800/60">
            <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setView('chat')}
                className={`py-1.5 rounded-md transition-all ${
                  view === 'chat' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                💬 Chat Room
              </button>
              <button
                onClick={() => setView('admin')}
                className={`py-1.5 rounded-md transition-all ${
                  view === 'admin' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Dashboard
              </button>
            </div>
          </div>

          {/* Channels & Members List */}
          {view === 'chat' ? (
            <div className="p-3">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Channels</span>
              </div>

              <div className="space-y-1 mb-6">
                {mockChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeChannel.id === channel.id
                        ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <Hash className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{channel.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Team Members ({teamMembers.length})
                </span>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300 text-xs font-medium flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Switch/Join
                </button>
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {teamMembers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUser(u)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-all ${
                      currentUser.id === u.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Avatar name={u.name} size="sm" status={u.status} />
                      <span className="truncate">{u.name}</span>
                    </div>
                    {currentUser.id === u.id && (
                      <Badge variant="indigo" className="text-[10px] py-0 px-1.5">You</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-purple-600/15 text-purple-400 border border-purple-500/30">
                <Activity className="w-4 h-4" /> System Overview
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                <Users className="w-4 h-4" /> User Management
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                <Server className="w-4 h-4" /> Server Node Logs
              </a>
            </div>
          )}
        </div>

        {/* Current Active User Profile Switcher Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90">
          <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 px-1">Chatting As:</div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Avatar name={currentUser.name} status="online" size="sm" />
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold text-slate-100 truncate">{currentUser.name}</span>
                <span className="text-[10px] text-indigo-400 font-medium capitalize">{currentUser.role}</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      {view === 'chat' ? (
        <main className="flex-1 flex flex-col justify-between bg-slate-950">
          {/* Header */}
          <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-indigo-400" />
              <div>
                <h2 className="text-sm font-bold text-slate-100">{activeChannel.name}</h2>
                <p className="text-xs text-slate-400">{activeChannel.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="indigo" className="gap-1 py-1 px-3">
                <UserCheck className="w-3.5 h-3.5" /> Posting as: <strong className="text-white">{currentUser.name}</strong>
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProfileModalOpen(true)}
                className="text-xs gap-1.5"
              >
                Switch Identity
              </Button>
            </div>
          </header>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {channelMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                <MessageSquare className="w-10 h-10 mb-2 opacity-40" />
                No messages in #{activeChannel.name} yet. Be the first to start the chat!
              </div>
            ) : (
              channelMessages.map((msg) => (
                <div key={msg.id} className="flex gap-4 group hover:bg-slate-900/40 p-2.5 rounded-xl transition-colors">
                  <Avatar name={msg.user?.name || 'User'} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">{msg.user?.name}</span>
                      {msg.user?.role === 'ADMIN' && <Badge variant="indigo">Admin</Badge>}
                      {msg.user?.role === 'MODERATOR' && <Badge variant="amber">Moderator</Badge>}
                      <span className="text-[11px] text-slate-500">{formatTime(msg.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-300 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/40">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5 focus-within:border-indigo-500 transition-colors">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message #${activeChannel.name} as ${currentUser.name}...`}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none px-2"
              />
              <button type="button" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900">
                <Smile className="w-4 h-4" />
              </button>
              <Button type="submit" size="sm" variant="primary" className="p-2.5 rounded-lg px-4 gap-2">
                Send <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </main>
      ) : (
        <main className="flex-1 p-8 overflow-y-auto bg-slate-950">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-100">KnapF-Chat Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">Real-time team status monitoring for NestJS API & Postgres DB</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card glass className="p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase">Team Members</span>
              <div className="text-3xl font-extrabold text-white mt-2">{teamMembers.length}</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Active Members</span>
            </Card>

            <Card glass className="p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Messages</span>
              <div className="text-3xl font-extrabold text-white mt-2">{messages.length}</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Synced live</span>
            </Card>

            <Card glass className="p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase">Latency</span>
              <div className="text-3xl font-extrabold text-white mt-2">38ms</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Optimal speed</span>
            </Card>

            <Card glass className="p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase">DB Connections</span>
              <div className="text-3xl font-extrabold text-white mt-2">6/20</div>
              <span className="text-xs text-slate-400 font-medium mt-1 inline-block">Prisma Connected</span>
            </Card>
          </div>
        </main>
      )}

      {/* Select User / Identity Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100">Select Who You Are Chatting As</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Select existing profile */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Choose Existing Team Member:
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {teamMembers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      currentUser.id === user.id
                        ? 'border-indigo-500 bg-indigo-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Avatar name={user.name} size="sm" />
                    <div className="overflow-hidden">
                      <div className="truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{user.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase">Or Join As New Member</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Join as new custom user */}
            <form onSubmit={handleCreateNewUser} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Your Display Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pawan, Sarojana, Alex..."
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Role:
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="USER">USER</option>
                  <option value="MODERATOR">MODERATOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="w-full gap-2 mt-2">
                <UserPlus className="w-4 h-4" /> Join & Start Chatting
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
