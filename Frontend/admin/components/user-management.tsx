'use client'

import { Search, Plus, MoreHorizontal, Eye, Lock, Unlock } from 'lucide-react'

export default function UserManagement() {
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyena@email.com', phone: '0901234567', bookings: 12, status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', email: 'tranb@email.com', phone: '0902345678', bookings: 8, status: 'active', joinDate: '2024-02-20' },
    { id: 3, name: 'Lê Văn C', email: 'levc@email.com', phone: '0903456789', bookings: 0, status: 'inactive', joinDate: '2024-03-10' },
    { id: 4, name: 'Phạm Thị D', email: 'phamd@email.com', phone: '0904567890', bookings: 23, status: 'active', joinDate: '2024-01-05' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoange@email.com', phone: '0905678901', bookings: 5, status: 'blocked', joinDate: '2024-04-01' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-1">Danh sách và quản lý tài khoản người dùng</p>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            <span className="hidden md:inline">Thêm người dùng</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Tên</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">SĐT</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Bookings</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{user.name}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{user.phone}</td>
                  <td className="py-4 px-4 text-sm text-foreground font-semibold">{user.bookings}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : user.status === 'inactive' ? 'Không hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title={user.status === 'active' ? 'Khóa' : 'Mở khóa'}>
                        {user.status === 'active' ? <Lock size={16} className="text-amber-600" /> : <Unlock size={16} className="text-emerald-600" />}
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
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 12,450 người dùng</p>
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
