'use client'

import { Search, Plus, MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function BookingManagement() {
  const bookings = [
    { id: 'BK001', guest: 'Nguyễn Văn A', hotel: 'Minh Resort', checkIn: '2024-06-15', checkOut: '2024-06-17', amount: '₫3M', status: 'confirmed' },
    { id: 'BK002', guest: 'Trần Thị B', hotel: 'Beach Paradise', checkIn: '2024-06-16', checkOut: '2024-06-18', amount: '₫5.6M', status: 'confirmed' },
    { id: 'BK003', guest: 'Lê Văn C', hotel: 'City Hotel', checkIn: '2024-06-20', checkOut: '2024-06-22', amount: '₫1.6M', status: 'pending' },
    { id: 'BK004', guest: 'Phạm Thị D', hotel: 'Mountain Stay', checkIn: '2024-06-14', checkOut: '2024-06-16', amount: '₫8.4M', status: 'completed' },
    { id: 'BK005', guest: 'Hoàng Văn E', hotel: 'Luxury Suites', checkIn: '2024-06-10', checkOut: '2024-06-12', amount: '₫7M', status: 'cancelled' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý booking</h1>
        <p className="text-muted-foreground mt-1">Theo dõi và quản lý các đơn đặt phòng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng booking', value: '1,234', color: 'bg-blue-100' },
          { label: 'Chờ xác nhận', value: '45', color: 'bg-amber-100' },
          { label: 'Đã hoàn thành', value: '892', color: 'bg-emerald-100' },
          { label: 'Đã hủy', value: '67', color: 'bg-red-100' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-lg p-4 border border-border`}>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm booking..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            <span className="hidden md:inline">Booking mới</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">ID Booking</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Khách hàng</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Khách sạn</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Check-in</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Check-out</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Giá trị</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-semibold text-primary">{booking.id}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{booking.guest}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{booking.hotel}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{booking.checkIn}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{booking.checkOut}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary">{booking.amount}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status === 'confirmed' ? 'Xác nhận' : booking.status === 'pending' ? 'Chờ xác nhận' : booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-emerald-600" title="Xác nhận">
                        <CheckCircle size={16} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-red-600" title="Hủy">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 1,234 booking</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50">Trước</button>
            <button className="px-3 py-2 rounded-lg border border-primary bg-primary text-primary-foreground text-sm font-medium">1</button>
            <button className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">2</button>
            <button className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  )
}
