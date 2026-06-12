'use client'

import { Search, Plus, MoreHorizontal, CheckCircle, XCircle, Building2 } from 'lucide-react'

export default function HostManagement() {
  const hosts = [
    { id: 1, name: 'Minh Resort', owner: 'Trần Minh Quân', rooms: 45, revenue: '₫2.3M', status: 'approved', rating: 4.8 },
    { id: 2, name: 'Beach Paradise', owner: 'Ngô Thị Lan', rooms: 32, revenue: '₫1.8M', status: 'approved', rating: 4.6 },
    { id: 3, name: 'City Hotel', owner: 'Võ Văn Tuấn', rooms: 28, revenue: '₫1.2M', status: 'pending', rating: 0 },
    { id: 4, name: 'Mountain Stay', owner: 'Bùi Thanh Hương', rooms: 15, revenue: '₫850K', status: 'approved', rating: 4.9 },
    { id: 5, name: 'Luxury Suites', owner: 'Trường Thái Nguyên', rooms: 60, revenue: '₫3.5M', status: 'rejected', rating: 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý Host</h1>
        <p className="text-muted-foreground mt-1">Quản lý đơn đăng ký và duyệt các chủ nhà</p>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm host..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            <span className="hidden md:inline">Thêm Host</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Tên khách sạn</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Chủ sở hữu</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Phòng</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Doanh thu</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Đánh giá</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map((host) => (
                <tr key={host.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground flex items-center gap-2">
                    <Building2 size={16} className="text-primary" />
                    {host.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{host.owner}</td>
                  <td className="py-4 px-4 text-sm text-foreground font-semibold">{host.rooms}</td>
                  <td className="py-4 px-4 text-sm text-primary font-semibold">{host.revenue}</td>
                  <td className="py-4 px-4 text-sm">
                    {host.rating ? <span className="font-semibold text-foreground">{host.rating} ⭐</span> : <span className="text-muted-foreground">-</span>}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                      host.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      host.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {host.status === 'approved' && <CheckCircle size={14} />}
                      {host.status === 'pending' && '⏳'}
                      {host.status === 'rejected' && <XCircle size={14} />}
                      {host.status === 'approved' ? 'Duyệt' : host.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary" title="Duyệt">
                        <CheckCircle size={16} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-red-600" title="Từ chối">
                        <XCircle size={16} />
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
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 856 Host</p>
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
