'use client'

import { Search, AlertCircle, Eye, MessageSquare } from 'lucide-react'

export default function DisputeManagement() {
  const disputes = [
    { id: 'DS001', booking: 'BK001', complainant: 'Nguyễn Văn A', reason: 'Phòng không như mô tả', filed: '2024-06-10', status: 'pending' },
    { id: 'DS002', booking: 'BK002', complainant: 'Trần Thị B', reason: 'Dịch vụ không đạt chất lượng', filed: '2024-06-08', status: 'under-review' },
    { id: 'DS003', booking: 'BK003', complainant: 'Host', reason: 'Khách hủy không báo', filed: '2024-06-05', status: 'resolved' },
    { id: 'DS004', booking: 'BK004', complainant: 'Lê Văn C', reason: 'Trang thiết bị hư hỏng', filed: '2024-06-12', status: 'pending' },
    { id: 'DS005', booking: 'BK005', complainant: 'Phạm Thị D', reason: 'Không nhận được hoàn tiền', filed: '2024-06-01', status: 'resolved' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý tranh chấp</h1>
        <p className="text-muted-foreground mt-1">Xử lý và giải quyết các tranh chấp giữa người dùng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Tổng tranh chấp', value: '24', color: 'from-blue-100 to-blue-200' },
          { label: 'Chưa xử lý', value: '8', color: 'from-amber-100 to-amber-200' },
          { label: 'Đã giải quyết', value: '16', color: 'from-emerald-100 to-emerald-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 border border-border`}>
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
              placeholder="Tìm kiếm tranh chấp..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả trạng thái</option>
            <option>Chưa xử lý</option>
            <option>Đang xem xét</option>
            <option>Đã giải quyết</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">ID Tranh chấp</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Booking</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Người khiếu nại</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Lý do</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Ngày tạo</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-semibold text-primary flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-600" />
                    {dispute.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{dispute.booking}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{dispute.complainant}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{dispute.reason}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{dispute.filed}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      dispute.status === 'pending' ? 'bg-red-100 text-red-700' :
                      dispute.status === 'under-review' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {dispute.status === 'pending' ? 'Chưa xử lý' : dispute.status === 'under-review' ? 'Đang xem xét' : 'Đã giải quyết'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Bình luận">
                        <MessageSquare size={16} className="text-primary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 24 tranh chấp</p>
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
