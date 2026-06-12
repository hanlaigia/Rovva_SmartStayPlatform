'use client'

import { Search, Eye, Download, RefreshCw } from 'lucide-react'

export default function PaymentManagement() {
  const transactions = [
    { id: 'TXN001', booking: 'BK001', amount: '₫3M', type: 'Booking Payment', date: '2024-06-10', status: 'completed' },
    { id: 'TXN002', booking: 'BK002', amount: '₫5.6M', type: 'Booking Payment', date: '2024-06-09', status: 'completed' },
    { id: 'TXN003', booking: 'BK003', amount: '₫1.6M', type: 'Refund', date: '2024-06-08', status: 'pending' },
    { id: 'TXN004', booking: 'BK004', amount: '₫8.4M', type: 'Host Payout', date: '2024-06-07', status: 'completed' },
    { id: 'TXN005', booking: 'BK005', amount: '₫7M', type: 'Refund', date: '2024-06-06', status: 'completed' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý thanh toán</h1>
        <p className="text-muted-foreground mt-1">Theo dõi giao dịch và quản lý thanh toán</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng giao dịch', value: '₫125.3M', color: 'bg-blue-100' },
          { label: 'Đã xử lý', value: '₫118.5M', color: 'bg-emerald-100' },
          { label: 'Đang chờ xử lý', value: '₫6.8M', color: 'bg-amber-100' },
          { label: 'Hoàn tiền', value: '₫45.2M', color: 'bg-red-100' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-lg p-4 border border-border`}>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium">
            <Download size={20} />
            <span className="hidden md:inline">Xuất báo cáo</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">ID Giao dịch</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Booking</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Số tiền</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Loại</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Ngày</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-semibold text-primary">{txn.id}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{txn.booking}</td>
                  <td className="py-4 px-4 text-sm font-bold text-foreground">{txn.amount}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{txn.type}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {txn.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Chi tiết">
                        <Eye size={16} className="text-primary" />
                      </button>
                      {txn.status === 'pending' && (
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Xử lý lại">
                          <RefreshCw size={16} className="text-primary" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiển thị 5 trong 8,234 giao dịch</p>
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
