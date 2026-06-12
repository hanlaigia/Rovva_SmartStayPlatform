'use client'

import { BarChart3, Users, Building2, DoorOpen, Bookmark, AlertCircle, CreditCard, Gift, FileText, UserCog, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  setActivePage: (page: string) => void
  activePage: string
}

export default function Sidebar({ isOpen, setActivePage, activePage }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'hosts', label: 'Quản lý Host', icon: Building2 },
    { id: 'rooms', label: 'Quản lý phòng & khách sạn', icon: DoorOpen },
    { id: 'bookings', label: 'Quản lý booking', icon: Bookmark },
    { id: 'disputes', label: 'Quản lý tranh chấp', icon: AlertCircle },
    { id: 'payments', label: 'Quản lý thanh toán', icon: CreditCard },
    { id: 'promotions', label: 'Quản lý khuyến mãi', icon: Gift },
    { id: 'admins', label: 'Quản lý Admin', icon: UserCog },
  ]

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border flex flex-col`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center h-10 rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
          {isOpen ? 'ADMIN' : 'A'}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && (
                  <span className="text-sm font-medium truncate flex-1 text-left">{item.label}</span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" title={!isOpen ? 'Logout' : undefined}>
          <svg size={20} className="flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span className="text-sm font-medium">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  )
}
