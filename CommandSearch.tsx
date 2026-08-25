'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BedDouble, CalendarCheck, Users, UtensilsCrossed, FileText, UserCheck, ArrowRight } from 'lucide-react';

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandSearch({ open, onClose }: CommandSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const quickLinks = [
    { label: 'Create New Reservation', href: '/reservations/new', icon: CalendarCheck, category: 'Quick Action' },
    { label: 'Check-In Reception Desk', href: '/check-in', icon: BedDouble, category: 'Quick Action' },
    { label: 'Check-Out & Guest Folio', href: '/check-out', icon: FileText, category: 'Quick Action' },
    { label: 'Restaurant POS Floor Layout', href: '/restaurant/tables', icon: UtensilsCrossed, category: 'Restaurant' },
    { label: 'Kitchen KDS Display', href: '/restaurant/kitchen', icon: UtensilsCrossed, category: 'Kitchen' },
    { label: 'Food Ingredients Inventory', href: '/inventory/ingredients', icon: UtensilsCrossed, category: 'Inventory' },
    { label: 'Staff Roster & Attendance', href: '/staff', icon: UserCheck, category: 'Management' },
    { label: 'AI Operations & Analytics', href: '/ai-analytics', icon: Search, category: 'AI Intelligence' },
  ];

  const filteredLinks = query.trim() === ''
    ? quickLinks
    : quickLinks.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const navigateTo = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            placeholder="Type to search rooms, guests, bookings, orders, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {query.trim() === '' ? 'Suggested Navigation' : 'Search Results'}
          </p>

          {filteredLinks.length > 0 ? (
            filteredLinks.map((item) => (
              <button
                key={item.href + item.label}
                onClick={() => navigateTo(item.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-slate-950">{item.label}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Navigate with <strong>ESC</strong> to close</span>
          <span className="font-mono">HOTELNEX AI Command Search</span>
        </div>
      </div>
    </div>
  );
}
