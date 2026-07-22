'use client';

import React, { useState } from 'react';
import { Button, Input, Avatar, Badge, Card } from '@nova/ui';
import { formatTime } from '@nova/utils';
import type { Message, Channel } from '@nova/types';
import { 
  Hash, Send, Plus, Users, Settings, Bell, Search, 
  Smile, Paperclip, MoreVertical, LogOut, ArrowLeft,
  Activity, Server, Database, RefreshCw, Cpu, MessageSquare
} from 'lucide-react';

const mockChannels: Channel[] = [
  { id: '1', name: 'general', description: 'KnapF Team Announcements & Daily Updates', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'engineering', description: 'Frontend, NestJS backend, monorepo discussions', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'deployments', description: 'Vercel & CI/CD deployment status', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'design-system', description: 'Shared Tailwind UI components', isPrivate: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const customUsers = [
  { id: 'u1', name: 'Sayanna', email: 'sayanna@knapf.dev', role: 'ADMIN', status: 'online' },
  { id: 'u2', name: 'Pawan', email: 'pawan@knapf.dev', role: 'ADMIN', status: 'online' },
  { id: 'u3', name: 'Sarojana', email: 'sarojana@knapf.dev', role: 'MODERATOR', status: 'online' },
  { id: 'u4', name: 'Bhavishya', email: 'bhavishya@knapf.dev', role: 'USER', status: 'offline' },
  { id: 'u5', name: 'Kittu', email: 'kittu@knapf.dev', role: 'USER', status: 'offline' },
  { id: 'u6', name: 'Naveen', email: 'naveen@knapf.dev', role: 'USER', status: 'online' },
];

const initialMessages: Message[] = [
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
    content: 'Awesome! All Next.js and NestJS monorepo apps are fully configured and deployed.',
    userId: 'u2',
    channelId: '1',
    user: { id: 'u2', name: 'Pawan', email: 'pawan@knapf.dev', role: 'ADMIN', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    content: 'Great work team! Ready to start collaboration in our channels.',
    userId: 'u3',
    channelId: '1',
    user: { id: 'u3', name: 'Sarojana', email: 'sarojana@knapf.dev', role: 'MODERATOR', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function CombinedApp() {
  const [view, setView] = useState<'chat' | 'admin'>('chat');
  const [activeChannel, setActiveChannel] = useState<Channel>(mockChannels[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      content: inputText,
      userId: 'currentUser',
      channelId: activeChannel.id,
      user: { id: 'currentUser', name: 'Sayanna', email: 'sayanna@knapf.dev', role: 'ADMIN', createdAt: '', updatedAt: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-screen w-screen flex bg-slate-950 text-slate-100 overflow-hidden font-sans">
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
                <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800">
                  <Plus className="w-4 h-4" />
                </button>
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
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Team Members (6)</span>
              </div>
              <div className="space-y-1">
                {customUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-300">
                    <Avatar name={u.name} size="sm" status={u.status as any} />
                    <span className="truncate font-medium">{u.name}</span>
                  </div>
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

        {/* User Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <Avatar name="Sayanna" status="online" size="sm" />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-semibold text-slate-200 truncate">Sayanna</span>
              <span className="text-[10px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>
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

            <div className="flex items-center gap-3 text-slate-400">
              <Badge variant="emerald" className="gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live on Vercel
              </Badge>
            </div>
          </header>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-4 group hover:bg-slate-900/30 p-2 rounded-xl transition-colors">
                <Avatar name={msg.user?.name || 'User'} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200">{msg.user?.name}</span>
                    {msg.user?.role === 'ADMIN' && <Badge variant="indigo">Admin</Badge>}
                    <span className="text-[11px] text-slate-500">{formatTime(msg.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/40">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2 focus-within:border-indigo-500 transition-colors">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message #${activeChannel.name}...`}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none px-2"
              />
              <button type="button" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900">
                <Smile className="w-4 h-4" />
              </button>
              <Button type="submit" size="sm" variant="primary" className="p-2.5 rounded-lg">
                <Send className="w-4 h-4" />
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
              <div className="text-3xl font-extrabold text-white mt-2">6</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Active Members</span>
            </Card>

            <Card glass className="p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Messages</span>
              <div className="text-3xl font-extrabold text-white mt-2">12.8K</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">High activity</span>
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
    </div>
  );
}
