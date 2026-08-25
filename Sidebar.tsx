'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Users,
  LogIn,
  LogOut,
  UtensilsCrossed,
  Grid,
  ChefHat,
  ClipboardList,
  Boxes,
  Sparkles,
  Wrench,
  UserCheck,
  CreditCard,
  FileText,
  DollarSign,
  BarChart3,
  Star,
  Brain,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Hotel
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/actions/authActions';

interface SidebarProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
}

export default function Sidebar({ userRole = 'SUPER_ADMIN', userName = 'Admin', userEmail = '', userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const [restaurantOpen, setRestaurantOpen] = useState(pathname.startsWith('/restaurant'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST', 'ACCOUNTANT', 'STAFF'] },
    { name: 'Reservations', href: '/reservations', icon: CalendarCheck, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST'] },
    { name: 'Rooms Management', href: '/rooms', icon: BedDouble, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST'] },
    { name: 'Guest Profiles', href: '/guests', icon: Users, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST'] },
    { name: 'Front Desk Check-In', href: '/check-in', icon: LogIn, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST'] },
    { name: 'Check-Out & Folio', href: '/check-out', icon: LogOut, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST'] },
    
    // Restaurant POS Section
    {
      name: 'Restaurant POS',
      icon: UtensilsCrossed,
      role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RESTAURANT_MANAGER', 'KITCHEN_STAFF', 'RECEPTIONIST'],
      subItems: [
        { name: 'Table Layout', href: '/restaurant/tables', icon: Grid },
        { name: 'Food Orders', href: '/restaurant/orders', icon: ClipboardList },
        { name: 'Food Menu', href: '/restaurant/menu', icon: UtensilsCrossed },
        { name: 'Kitchen KDS', href: '/restaurant/kitchen', icon: ChefHat },
      ]
    },

    { name: 'Food Inventory', href: '/inventory/ingredients', icon: Boxes, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RESTAURANT_MANAGER'] },
    { name: 'Housekeeping', href: '/housekeeping', icon: Sparkles, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'HOUSEKEEPING'] },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'HOUSEKEEPING'] },
    { name: 'Staff Roster', href: '/staff', icon: UserCheck, role: ['SUPER_ADMIN', 'HOTEL_MANAGER'] },
    { name: 'Payments', href: '/payments', icon: CreditCard, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'ACCOUNTANT', 'RECEPTIONIST'] },
    { name: 'Invoices', href: '/invoices', icon: FileText, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'ACCOUNTANT', 'RECEPTIONIST'] },
    { name: 'Expenses', href: '/expenses', icon: DollarSign, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'ACCOUNTANT'] },
    { name: 'Reports & Financials', href: '/reports', icon: BarChart3, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'ACCOUNTANT'] },
    { name: 'Guest Reviews', href: '/reviews', icon: Star, role: ['SUPER_ADMIN', 'HOTEL_MANAGER'] },
    { name: 'AI Intelligence', href: '/ai-analytics', icon: Brain, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RESTAURANT_MANAGER'] },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, role: ['SUPER_ADMIN', 'HOTEL_MANAGER', 'RECEPTIONIST', 'STAFF'] },
    { name: 'Settings', href: '/settings', icon: Settings, role: ['SUPER_ADMIN', 'HOTEL_MANAGER'] },
  ];

  const filteredNav = navigation.filter(
    (item) => !item.role || item.role.includes(userRole) || userRole === 'SUPER_ADMIN'
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 text-white shadow-lg focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Dark Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 border-r border-slate-800",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/40">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Hotel className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1">
                HOTELNEX <span className="text-amber-500 font-bold text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">Hospitality SaaS Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation Scroll Region */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Main Navigation</p>
          </div>

          {filteredNav.map((item) => {
            if (item.subItems) {
              const isSubActive = pathname.startsWith('/restaurant');
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => setRestaurantOpen(!restaurantOpen)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isSubActive ? "text-amber-400 bg-slate-800/80" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-amber-500" />
                      <span>{item.name}</span>
                    </div>
                    {restaurantOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {restaurantOpen && (
                    <div className="pl-9 space-y-1">
                      {item.subItems.map((sub) => {
                        const active = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                              active
                                ? "text-amber-400 bg-amber-500/10 font-semibold border-l-2 border-amber-500"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                            )}
                          >
                            <sub.icon className="w-4 h-4" />
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-500 shadow-sm"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-amber-400" : "text-slate-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shrink-0 border border-slate-600">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-amber-400 font-mono tracking-tight uppercase truncate">{userRole.replace('_', ' ')}</p>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
