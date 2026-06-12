'use client'

import { TrendingUp, Users, Bookmark, Building2, DollarSign, AlertTriangle, Download } from 'lucide-react'

export default function DashboardContent() {
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '₫2.5M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Booking hôm nay',
      value: '45',
      change: '+8.2%',
      icon: Bookmark,
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Người dùng',
      value: '12,450',
      change: '+5.3%',
      icon: Users,
      color: 'from-teal-400 to-teal-600',
    },
    {
      title: 'Host hoạt động',
      value: '856',
      change: '+2.1%',
      icon: Building2,
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Tranh chấp',
      value: '12',
      change: '-3.2%',
      icon: AlertTriangle,
      color: 'from-red-400 to-red-600',
    },
    {
      title: 'Tỷ lệ hoàn thành',
      value: '94.5%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-600',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground mt-1">Thống kê và phân tích hoạt động</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-2">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top khách sạn được đặt nhiều</h3>
          <div className="space-y-3">
            {[
              { name: 'Resort Mekong Delta', bookings: 342, revenue: '₫85M' },
              { name: 'Luxury Beach Hotel', bookings: 298, revenue: '₫72M' },
              { name: 'Downtown Business Inn', bookings: 267, revenue: '₫64M' },
              { name: 'Mountain View Lodge', bookings: 245, revenue: '₫58M' },
            ].map((hotel, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div>
                  <p className="font-medium text-foreground text-sm">{hotel.name}</p>
                  <p className="text-xs text-muted-foreground">{hotel.bookings} bookings</p>
                </div>
                <div className="text-sm font-semibold text-primary">{hotel.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {[
              { action: 'Booking #12456 confirmed', time: '5 phút trước', type: 'success' },
              { action: 'New dispute reported', time: '28 phút trước', type: 'warning' },
              { action: 'Payment processed', time: '1 giờ trước', type: 'success' },
              { action: 'Host account activated', time: '2 giờ trước', type: 'info' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Xuất báo cáo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted border border-border hover:border-primary/30 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm mb-1">Báo cáo hàng ngày</p>
                <p className="text-xs text-muted-foreground">PDF, Excel</p>
              </div>
              <Download size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted border border-border hover:border-primary/30 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm mb-1">Báo cáo hàng tuần</p>
                <p className="text-xs text-muted-foreground">PDF, Excel</p>
              </div>
              <Download size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted border border-border hover:border-primary/30 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm mb-1">Báo cáo hàng tháng</p>
                <p className="text-xs text-muted-foreground">PDF, Excel, CSV</p>
              </div>
              <Download size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted border border-border hover:border-primary/30 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm mb-1">Báo cáo tuỳ chỉnh</p>
                <p className="text-xs text-muted-foreground">Tạo báo cáo theo nhu cầu</p>
              </div>
              <Download size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
