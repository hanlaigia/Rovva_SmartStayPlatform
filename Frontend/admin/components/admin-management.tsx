'use client'

import { Search, Plus, MoreHorizontal, Eye, Edit2, Shield } from 'lucide-react'

export default function AdminManagement() {
  const admins = [
    { id: 'ADM001', name: 'Nguyễn Admin', email: 'admin@platform.com', role: 'Super Admin', lastActive: '2024-06-12', status: 'active' },
    { id: 'ADM002', name: 'Trần User Manager', email: 'users@platform.com', role: 'User Manager', lastActive: '2024-06-11', status: 'active' },
    { id: 'ADM003', name: 'Lê Finance Officer', email: 'finance@platform.com', role: 'Finance Officer', lastActive: '2024-06-10', status: 'active' },
    { id: 'ADM004', name: 'Phạm Content Moderator', email: 'moderation@platform.com', role: 'Content Moderator', lastActive: '2024-06-09', status: 'active' },
    { id: 'ADM005', name: 'Hoàng Support Officer', email: 'support@platform.com', role: 'Support Officer', lastActive: '2024-06-08', status: 'inactive' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý Admin</h1>
        <p className="text-muted-foreground mt-1">Quản lý tài khoản và phân quyền cho các nhân viên quản trị</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Danh sách Admin</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm">
              <Plus size={18} />
              <span className="hidden md:inline">Tạo tài khoản</span>
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm admin..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold text-foreground text-xs">Tên</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground text-xs">Vai trò</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground text-xs">Trạng thái</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground text-xs">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3 font-medium text-foreground">{admin.name}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs">
                        <Shield size={12} className="text-primary" />
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        admin.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {admin.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                          <Eye size={14} className="text-primary" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Chỉnh sửa">
                          <Edit2 size={14} className="text-primary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <p className="text-muted-foreground">Hiển thị 5 trong 12 admin</p>
            <div className="flex gap-1">
              <button className="px-2 py-1 rounded border border-border text-xs hover:bg-muted transition-colors">Trước</button>
              <button className="px-2 py-1 rounded border border-primary bg-primary text-primary-foreground text-xs">1</button>
              <button className="px-2 py-1 rounded border border-border text-xs hover:bg-muted transition-colors">2</button>
              <button className="px-2 py-1 rounded border border-border text-xs hover:bg-muted transition-colors">Tiếp</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4">Nhật ký hoạt động</h3>
        <div className="space-y-2">
          {[
            { action: 'Nguyễn Admin đăng nhập', time: '5 phút trước' },
            { action: 'Trần User Manager tạo người dùng mới', time: '1 giờ trước' },
            { action: 'Lê Finance Officer xuất báo cáo', time: '2 giờ trước' },
            { action: 'Phạm Content Moderator duyệt nội dung', time: '3 giờ trước' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <p className="text-foreground">{log.action}</p>
              <p className="text-muted-foreground">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
