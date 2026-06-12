'use client'

import { Search, Plus, MoreHorizontal, Eye, Edit2, ToggleLeft } from 'lucide-react'

export default function PromotionManagement() {
  const promotions = [
    { id: 'PRO001', name: 'Summer Sale 2024', type: 'Voucher', discount: '15%', validFrom: '2024-06-01', validTo: '2024-06-30', used: 342, status: 'active' },
    { id: 'PRO002', name: 'Flash Sale - Weekend', type: 'Flash Sale', discount: '20%', validFrom: '2024-06-14', validTo: '2024-06-16', used: 89, status: 'active' },
    { id: 'PRO003', name: 'First Booking Offer', type: 'Voucher', discount: '10%', validFrom: '2024-05-01', validTo: '2024-12-31', used: 1203, status: 'active' },
    { id: 'PRO004', name: 'Group Booking Deal', type: 'Promo', discount: '25%', validFrom: '2024-06-15', validTo: '2024-07-15', used: 0, status: 'pending' },
    { id: 'PRO005', name: 'Spring Special', type: 'Flash Sale', discount: '30%', validFrom: '2024-03-01', validTo: '2024-05-31', used: 567, status: 'inactive' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý khuyến mãi</h1>
        <p className="text-muted-foreground mt-1">Tạo và quản lý các chương trình khuyến mãi và voucher</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Tổng khuyến mãi', value: '12', color: 'bg-blue-100' },
          { label: 'Đang hoạt động', value: '8', color: 'bg-emerald-100' },
          { label: 'Tổng voucher được dùng', value: '2,201', color: 'bg-cyan-100' },
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
              placeholder="Tìm kiếm khuyến mãi..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={20} />
            <span className="hidden md:inline">Tạo khuyến mãi</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Tên khuyến mãi</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Loại</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Giảm giá</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Từ ngày</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Đến ngày</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Sử dụng</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{promo.name}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded-full bg-muted text-xs font-semibold">{promo.type}</span>
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-primary">{promo.discount}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{promo.validFrom}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{promo.validTo}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-foreground">{promo.used}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      promo.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      promo.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {promo.status === 'active' ? 'Hoạt động' : promo.status === 'pending' ? 'Chờ duyệt' : 'Không hoạt động'}
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
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Bật/Tắt">
                        <ToggleLeft size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 12 khuyến mãi</p>
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
