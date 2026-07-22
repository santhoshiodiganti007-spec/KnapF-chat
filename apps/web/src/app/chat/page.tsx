'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Avatar, Badge } from '@nova/ui';
import { formatTime } from '@nova/utils';
import type { Message, Channel } from '@nova/types';
import { 
  Hash, Send, Plus, Users, Settings, Bell, Search, 
  Smile, Paperclip, MoreVertical, LogOut, ArrowLeft
} from 'lucide-react';

const mockChannels: Channel[] = [
  { id: '1', name: 'general', description: 'KnapF Team Announcements & Daily Updates', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'engineering', description: 'Frontend, NestJS backend, monorepo discussions', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'deployments', description: 'Vercel & CI/CD deployment status', isPrivate: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'design-system', description: 'Shared Tailwind UI components', isPrivate: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
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
    content: 'Awesome! All Next.js and NestJS monorepo apps are fully configured.',
    userId: 'u2',
    channelId: '1',
    user: { id: 'u2', name: 'Pawan', email: 'pawan@knapf.dev', role: 'ADMIN', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    content: 'Great work team! Ready to start collaboration.',
    userId: 'u3',
    channelId: '1',
    user: { id: 'u3', name: 'Sarojana', email: 'sarojana@knapf.dev', role: 'MODERATOR', createdAt: '', updatedAt: '' },
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ChatPage() {
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
    <div className="h-screen w-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col justify-between select-none">
        <div>
          {/* Workspace Header */}
          <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
                K
              </div>
              <span className="font-bold text-slate-100 text-sm tracking-wide">KnapF Workspace</span>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-1.5 text-slate-400 hover:text-slate-200">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Channels List */}
          <div className="p-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Channels</span>
              <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
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
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <Avatar name="Sayanna" status="online" size="sm" />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-semibold text-slate-200 truncate">Sayanna</span>
              <span className="text-[10px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col justify-between bg-slate-950">
        {/* Channel Top Header */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Vercel Live
            </Badge>
            <div className="h-4 w-px bg-slate-800" />
            <button className="hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-900">
              <Users className="w-4 h-4" />
            </button>
            <button className="hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-900">
              <Bell className="w-4 h-4" />
            </button>
            <button className="hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-900">
              <Settings className="w-4 h-4" />
            </button>
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

        {/* Message Input Box */}
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
    </div>
  );
}
