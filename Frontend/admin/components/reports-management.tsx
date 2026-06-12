'use client'

import { Download, BarChart3, TrendingUp, PieChart } from 'lucide-react'

export default function ReportsManagement() {
  const reports = [
    {
      title: 'Báo cáo doanh thu',
      period: 'Tháng 6, 2024',
      value: '₫125.3M',
      trend: '+12.5%',
      icon: BarChart3,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Báo cáo booking',
      period: 'Tháng 6, 2024',
      value: '1,234',
      trend: '+8.2%',
      icon: PieChart,
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Báo cáo khách hàng',
      period: 'Tháng 6, 2024',
      value: '12,450',
      trend: '+5.3%',
      icon: TrendingUp,
      color: 'from-teal-400 to-teal-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Báo cáo & Phân tích</h1>
        <p className="text-muted-foreground mt-1">Xem báo cáo chi tiết về hoạt động nền tảng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report, i) => {
          const Icon = report.icon
          return (
            <div key={i} className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{report.title}</p>
                  <p className="text-xs text-muted-foreground">{report.period}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.color} flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">{report.value}</p>
              <p className="text-xs text-emerald-600 font-semibold">{report.trend}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Xuất báo cáo</h3>
        </div>

        <div className="space-y-3">
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
