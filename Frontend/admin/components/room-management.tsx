'use client'

import { Search, Plus, MoreHorizontal, Eye, Edit2 } from 'lucide-react'

export default function RoomManagement() {
  const rooms = [
    { id: 1, name: 'Phòng Deluxe', hotel: 'Minh Resort', capacity: 2, price: '₫1.5M', available: 8, status: 'active', rating: 4.8 },
    { id: 2, name: 'Phòng Suite', hotel: 'Beach Paradise', capacity: 4, price: '₫2.8M', available: 3, status: 'active', rating: 4.7 },
    { id: 3, name: 'Phòng Standard', hotel: 'City Hotel', capacity: 2, price: '₫800K', available: 12, status: 'pending', rating: 0 },
    { id: 4, name: 'Phòng VIP', hotel: 'Mountain Stay', capacity: 6, price: '₫4.2M', available: 1, status: 'active', rating: 5.0 },
    { id: 5, name: 'Phòng Luxury', hotel: 'Luxury Suites', capacity: 3, price: '₫3.5M', available: 0, status: 'inactive', rating: 4.9 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý phòng & khách sạn</h1>
        <p className="text-muted-foreground mt-1">Quản lý danh sách phòng và thông tin chi tiết</p>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            <span className="hidden md:inline">Thêm phòng</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Tên phòng</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Khách sạn</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Sức chứa</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Giá/đêm</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Còn trống</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{room.name}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{room.hotel}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{room.capacity} người</td>
                  <td className="py-4 px-4 text-sm text-primary font-semibold">{room.price}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`font-semibold ${room.available > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {room.available} phòng
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      room.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      room.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {room.status === 'active' ? 'Hoạt động' : room.status === 'pending' ? 'Chờ duyệt' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit2 size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MoreHorizontal size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 2,450 phòng</p>
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
