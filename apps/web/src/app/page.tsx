import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@nova/ui';
import { MessageSquare, ShieldCheck, Zap, Globe, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      
      {/* Navigation */}
      <header className="border-b border-slate-800/80 backdrop-blur-md bg-slate-950/70 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Nova-Chat
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/chat">
              <Button variant="primary" size="sm" className="gap-2">
                Launch App <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col items-center justify-center text-center relative z-10">
        <Badge variant="indigo" className="mb-6 py-1 px-4 text-xs font-semibold uppercase tracking-widest gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise Messaging
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Ultra-fast messaging built for high-velocity teams
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Nova-Chat is powered by a high-performance NestJS backend engine, Next.js App Router frontends, and a unified Prisma database monorepo.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/chat">
            <Button size="lg" variant="primary" className="gap-2 shadow-lg shadow-indigo-500/25 px-8">
              Open Workspace <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="px-8">
              View Monorepo Specs
            </Button>
          </a>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Card glass className="text-left hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Real-time Synchronization</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Instant channels and DM messaging powered by WebSockets & Serverless triggers.
            </p>
          </Card>

          <Card glass className="text-left hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Monorepo Standard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Shared design system (`@nova/ui`), TypeScript types (`@nova/types`), and utilities (`@nova/utils`).
            </p>
          </Card>

          <Card glass className="text-left hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Vercel Ready</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Architected for seamless deployment across Vercel frontend & serverless compute.
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <p>© 2026 Nova-Chat Monorepo. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400 text-xs">
            <span className="hover:text-white cursor-pointer">Docs</span>
            <span className="hover:text-white cursor-pointer">Vercel Setup</span>
            <span className="hover:text-white cursor-pointer">Prisma API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
