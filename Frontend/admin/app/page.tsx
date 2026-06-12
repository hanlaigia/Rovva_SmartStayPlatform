'use client'

import { useState } from 'react'
import { Menu, X, Bell, Settings } from 'lucide-react'
import Sidebar from '@/components/sidebar'
import DashboardContent from '@/components/dashboard-content'
import UserManagement from '@/components/user-management'
import HostManagement from '@/components/host-management'
import RoomManagement from '@/components/room-management'
import BookingManagement from '@/components/booking-management'
import DisputeManagement from '@/components/dispute-management'
import PaymentManagement from '@/components/payment-management'
import PromotionManagement from '@/components/promotion-management'
import AdminManagement from '@/components/admin-management'

export default function AdminPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent />
      case 'users':
        return <UserManagement />
      case 'hosts':
        return <HostManagement />
      case 'rooms':
        return <RoomManagement />
      case 'bookings':
        return <BookingManagement />
      case 'disputes':
        return <DisputeManagement />
      case 'payments':
        return <PaymentManagement />
      case 'promotions':
        return <PromotionManagement />
      case 'admins':
        return <AdminManagement />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setActivePage={setActivePage} activePage={activePage} />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
              <Bell size={20} className="text-primary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings size={20} className="text-muted-foreground" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}
