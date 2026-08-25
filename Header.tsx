'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, Command, CheckCircle2, AlertTriangle, Info, Clock, User } from 'lucide-react';
import CommandSearch from './CommandSearch';
import { formatDateTime } from '@/lib/utils';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notifications?: any[];
}

export default function Header({ userName = 'Admin', userRole = 'SUPER_ADMIN', notifications = [] }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  const defaultNotifications = notifications.length > 0 ? notifications : [
    { id: '1', title: 'Low Inventory Warning', message: 'Mozzarella Cheese stock is below minimum limit.', type: 'WARNING', time: '10m ago' },
    { id: '2', title: 'New VIP Reservation', message: 'Suite 301 reserved by Mr. Amit Shah.', type: 'INFO', time: '1h ago' },
    { id: '3', title: 'AC Maintenance Requested', message: 'Room 109 cooling repair in progress.', type: 'ALERT', time: '2h ago' },
  ];

  return (
    <>
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm">
        {/* Left: Greeting & Search Bar */}
        <div className="flex items-center gap-6 pl-10 md:pl-0">
          <div>
            <h2 className="font-semibold text-slate-800 text-sm md:text-base flex items-center gap-2">
              Good Evening, <span className="text-slate-900 font-bold">{userName}</span> 👋
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Grand Horizon Hotel & Restaurant Dashboard
            </p>
          </div>

          {/* CTRL + K Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs hover:bg-slate-200/70 hover:border-slate-300 transition-all w-64 justify-between group shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              <span>Search guests, rooms, orders...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-slate-400 font-bold border border-slate-200 shadow-sm flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right: Live Clock, Notifications & AI Shortcut */}
        <div className="flex items-center gap-3">
          {/* Live Clock Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono text-xs shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{timeStr || '10:00:00 AM'}</span>
          </div>

          {/* AI Quick Button */}
          <a
            href="/ai-assistant"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden sm:inline">Ask AI</span>
          </a>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative border border-slate-200"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" /> Notifications
                  </h4>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    {defaultNotifications.length} New
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {defaultNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors flex items-start gap-2.5"
                    >
                      {n.type === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                      {n.type === 'ALERT' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                      {n.type === 'INFO' && <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-xs font-semibold text-slate-800 leading-snug">{n.title}</p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Search Palette Modal */}
      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
