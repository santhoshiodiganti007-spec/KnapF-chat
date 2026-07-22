import React from 'react';
import { Card, Badge, Button, Avatar } from '@nova/ui';
import { 
  Users, Server, Activity, ShieldAlert, Cpu, HardDrive, 
  MessageSquare, Database, CheckCircle2, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
              A
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-sm">Nova Admin</h1>
              <span className="text-[11px] text-slate-400">v1.0.0 Monorepo</span>
            </div>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-purple-600/15 text-purple-400 border border-purple-500/30">
              <Activity className="w-4 h-4" /> System Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Users className="w-4 h-4" /> User Management
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Server className="w-4 h-4" /> Server Node Logs
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Database className="w-4 h-4" /> Prisma Schema
            </a>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <Badge variant="indigo" className="w-full justify-center py-1">
            Vercel Deployment Active
          </Badge>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">System Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time status monitoring for NestJS API & Postgres DB</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Metrics
          </Button>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card glass className="p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">Active Users</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">1,429</div>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">↑ +12% from yesterday</span>
          </Card>

          <Card glass className="p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Messages</span>
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">89.4K</div>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">↑ High traffic</span>
          </Card>

          <Card glass className="p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">Vercel Serverless Latency</span>
              <Cpu className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">42ms</div>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Optimal response time</span>
          </Card>

          <Card glass className="p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">DB Connection Pool</span>
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">8/20</div>
            <span className="text-xs text-slate-400 font-medium mt-1 inline-block">Prisma Engine Connected</span>
          </Card>
        </div>

        {/* User Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-bold mb-4">Recent User Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Avatar name="Alex Johnson" size="sm" />
                    <div>
                      <div className="font-semibold">Alex Johnson</div>
                      <div className="text-xs text-slate-400">alex@nova.dev</div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="indigo">ADMIN</Badge></td>
                  <td className="px-4 py-3"><span className="text-emerald-400 text-xs font-medium">Active</span></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">Jul 22, 2026</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Avatar name="Sarah Chen" size="sm" />
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-xs text-slate-400">sarah@nova.dev</div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="slate">USER</Badge></td>
                  <td className="px-4 py-3"><span className="text-emerald-400 text-xs font-medium">Active</span></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">Jul 22, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
