// Mock Database for dynamic details view and CRUD simulation
const mockDatabase = {
  user: {
    u1: { name: 'Nguyễn Văn A', email: 'nguyena@email.com', phone: '0901234567', bookings: 12, status: 'active', joinDate: '2024-01-15', address: '123 Lê Lợi, Bến Thành, Quận 1, TP. HCM', gender: 'Nam', dob: '1995-08-20' },
    u2: { name: 'Trần Thị B', email: 'tranb@email.com', phone: '0902345678', bookings: 8, status: 'active', joinDate: '2024-02-20', address: '456 Nguyễn Huệ, Quận 1, TP. HCM', gender: 'Nữ', dob: '1997-04-12' },
    u3: { name: 'Lê Văn C', email: 'levc@email.com', phone: '0903456789', bookings: 0, status: 'inactive', joinDate: '2024-03-10', address: '789 Trần Hưng Đạo, Quận 5, TP. HCM', gender: 'Nam', dob: '1990-11-05' },
    u4: { name: 'Phạm Thị D', email: 'phamd@email.com', phone: '0904567890', bookings: 23, status: 'active', joinDate: '2024-01-05', address: '101 Hai Bà Trưng, Quận 3, TP. HCM', gender: 'Nữ', dob: '1988-12-30' },
    u5: { name: 'Hoàng Văn E', email: 'hoange@email.com', phone: '0905678901', bookings: 5, status: 'blocked', joinDate: '2024-04-01', address: '202 Điện Biên Phủ, Bình Thạnh, TP. HCM', gender: 'Nam', dob: '1993-01-25' }
  },
  host: {
    h1: { name: 'Minh Resort', owner: 'Trần Minh Quân', rooms: 45, revenue: '₫2.3M', rating: '4.8 ⭐', status: 'approved', joined: '2023-11-10', address: 'Phú Quốc, Kiên Giang', email: 'owner.minhresort@email.com' },
    h2: { name: 'Beach Paradise', owner: 'Ngô Thị Lan', rooms: 32, revenue: '₫1.8M', rating: '4.6 ⭐', status: 'approved', joined: '2024-01-15', address: 'Mũi Né, Phan Thiết', email: 'ngolan.beach@email.com' },
    h3: { name: 'City Hotel', owner: 'Võ Văn Tuấn', rooms: 28, revenue: '₫1.2M', rating: 'Chưa có', status: 'pending', joined: '2024-05-20', address: 'Quận 1, TP. Hồ Chí Minh', email: 'tuanvo.cityhotel@email.com' },
    h4: { name: 'Mountain Stay', owner: 'Bùi Thanh Hương', rooms: 15, revenue: '₫850K', rating: '4.9 ⭐', status: 'approved', joined: '2023-08-05', address: 'Sapa, Lào Cai', email: 'huongbui.mountain@email.com' },
    h5: { name: 'Luxury Suites', owner: 'Trường Thái Nguyên', rooms: 60, revenue: '₫3.5M', rating: 'Chưa có', status: 'rejected', joined: '2024-02-18', address: 'Đà Nẵng', email: 'truong.luxurysuites@email.com' }
  },
  room: {
    r1: { name: 'Phòng Deluxe', hotel: 'Minh Resort', capacity: '2 người', price: '₫1.5M', available: '8 phòng', status: 'active', rating: '4.8 ⭐', size: '35m²', amenities: 'Wifi, Điều hòa, Bồn tắm, View biển, Bữa sáng miễn phí' },
    r2: { name: 'Phòng Suite', hotel: 'Beach Paradise', capacity: '4 người', price: '₫2.8M', available: '3 phòng', status: 'active', rating: '4.7 ⭐', size: '55m²', amenities: 'Wifi, Điều hòa, Phòng khách, Ban công, Mini bar, Bể bơi riêng' },
    r3: { name: 'Phòng Standard', hotel: 'City Hotel', capacity: '2 người', price: '₫800K', available: '12 phòng', status: 'pending', rating: 'Chưa đánh giá', size: '24m²', amenities: 'Wifi, Điều hòa, Tivi, Máy sấy tóc' },
    r4: { name: 'Phòng VIP', hotel: 'Mountain Stay', capacity: '6 người', price: '₫4.2M', available: '1 phòng', status: 'active', rating: '5.0 ⭐', size: '80m²', amenities: 'Wifi, Điều hòa, Lò sưởi, View núi, Bếp nấu ăn, Jacuzzi' },
    r5: { name: 'Phòng Luxury', hotel: 'Luxury Suites', capacity: '3 người', price: '₫3.5M', available: 'Hết phòng', status: 'inactive', rating: '4.9 ⭐', size: '45m²', amenities: 'Wifi, Điều hòa, Phòng tắm kính, View thành phố' }
  },
  booking: {
    bk1: { id: 'BK001', guest: 'Nguyễn Văn A', hotel: 'Minh Resort', checkIn: '2024-06-15', checkOut: '2024-06-17', amount: '₫3M', status: 'confirmed', created: '2024-06-01', phone: '0901234567', paymentMethod: 'Thẻ tín dụng' },
    bk2: { id: 'BK002', guest: 'Trần Thị B', hotel: 'Beach Paradise', checkIn: '2024-06-16', checkOut: '2024-06-18', amount: '₫5.6M', status: 'confirmed', created: '2024-06-02', phone: '0902345678', paymentMethod: 'Ví điện tử' },
    bk3: { id: 'BK003', guest: 'Lê Văn C', hotel: 'City Hotel', checkIn: '2024-06-20', checkOut: '2024-06-22', amount: '₫1.6M', status: 'pending', created: '2024-06-11', phone: '0903456789', paymentMethod: 'Chuyển khoản' },
    bk4: { id: 'BK004', guest: 'Phạm Thị D', hotel: 'Mountain Stay', checkIn: '2024-06-14', checkOut: '2024-06-16', amount: '₫8.4M', status: 'completed', created: '2024-05-28', phone: '0904567890', paymentMethod: 'Thẻ tín dụng' },
    bk5: { id: 'BK005', guest: 'Hoàng Văn E', hotel: 'Luxury Suites', checkIn: '2024-06-10', checkOut: '2024-06-12', amount: '₫7M', status: 'cancelled', created: '2024-05-25', phone: '0905678901', paymentMethod: 'Ví điện tử' }
  },
  dispute: {
    ds1: { id: 'DS001', booking: 'BK001', complainant: 'Nguyễn Văn A', reason: 'Phòng không như mô tả', filed: '2024-06-10', status: 'pending', details: 'Khách hàng phản ánh phòng Deluxe thực tế bị hỏng máy lạnh và không có bồn tắm như trong phần mô tả dịch vụ của Host.', logs: [] },
    ds2: { id: 'DS002', booking: 'BK002', complainant: 'Trần Thị B', reason: 'Dịch vụ không đạt chất lượng', filed: '2024-06-08', status: 'under-review', details: 'Khách hàng phản ánh nhân viên resort có thái độ thô lỗ và từ chối hỗ trợ vận chuyển hành lý.', logs: [{ sender: 'Host', message: 'Chúng tôi đã xin lỗi khách hàng và đề xuất giảm giá 10% cho lần đặt tiếp theo.' }] },
    ds3: { id: 'DS003', booking: 'BK003', complainant: 'Host', reason: 'Khách hủy không báo trước', filed: '2024-06-05', status: 'resolved', details: 'Host báo cáo khách đặt phòng nhưng không đến nhận phòng (Không xuất hiện) và yêu cầu phạt hủy phòng theo chính sách.', logs: [{ sender: 'Admin', message: 'Đã giải quyết: Khấu trừ 100% tiền cọc và chuyển khoản cho Host.' }] },
    ds4: { id: 'DS004', booking: 'BK004', complainant: 'Lê Văn C', reason: 'Trang thiết bị phòng hư hỏng', filed: '2024-06-12', status: 'pending', details: 'Host báo cáo khách làm vỡ tivi thông minh trong phòng Suite và yêu cầu bồi thường 15 triệu đồng.', logs: [] },
    ds5: { id: 'DS005', booking: 'BK005', complainant: 'Phạm Thị D', reason: 'Không nhận được tiền hoàn trả', filed: '2024-06-01', status: 'resolved', details: 'Khách hàng thắc mắc yêu cầu hoàn tiền đã được duyệt từ 28/05 nhưng tới nay tài khoản ngân hàng vẫn chưa nhận được.', logs: [{ sender: 'Admin', message: 'Cổng thanh toán báo giao dịch thành công. Lỗi do ngân hàng xử lý chậm. Khách đã xác nhận nhận tiền.' }] }
  },
  payment: {
    tx1: { id: 'TXN001', booking: 'BK001', amount: '₫3M', type: 'Booking Payment', date: '2024-06-10', status: 'completed', gateway: 'VNPay', code: 'VNP98234892' },
    tx2: { id: 'TXN002', booking: 'BK002', amount: '₫5.6M', type: 'Booking Payment', date: '2024-06-09', status: 'completed', gateway: 'Momo', code: 'MOM89234723' },
    tx3: { id: 'TXN003', booking: 'BK003', amount: '₫1.6M', type: 'Refund', date: '2024-06-08', status: 'pending', gateway: 'Chuyển khoản ngân hàng', code: 'REF20349823' },
    tx4: { id: 'TXN004', booking: 'BK004', amount: '₫8.4M', type: 'Host Payout', date: '2024-06-07', status: 'completed', gateway: 'Vietcombank', code: 'PAY72348923' },
    tx5: { id: 'TXN005', booking: 'BK005', amount: '₫7M', type: 'Refund', date: '2024-06-06', status: 'completed', gateway: 'VNPay', code: 'REF12093847' }
  },
  admin: {
    ad1: { id: 'ADM001', name: 'Nguyễn Admin', email: 'admin@gmail.com', role: 'Super Admin', status: 'active', joined: '2023-01-01', lastLogin: '2024-06-12 15:30' },
    ad2: { id: 'ADM002', name: 'Trần User Manager', email: 'users@platform.com', role: 'User Manager', status: 'active', joined: '2023-06-15', lastLogin: '2024-06-11 09:15' },
    ad3: { id: 'ADM003', name: 'Lê Finance Officer', email: 'finance@platform.com', role: 'Finance Officer', status: 'active', joined: '2023-09-01', lastLogin: '2024-06-10 17:40' },
    ad4: { id: 'ADM004', name: 'Phạm Content Moderator', email: 'moderation@platform.com', role: 'Content Moderator', status: 'active', joined: '2024-01-10', lastLogin: '2024-06-09 14:20' },
    ad5: { id: 'ADM005', name: 'Hoàng Support Officer', email: 'support@platform.com', role: 'Support Officer', status: 'inactive', joined: '2024-03-01', lastLogin: '2024-06-08 11:05' }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Auth Guard: Check if admin is logged in
  if (localStorage.getItem('admin_logged_in') !== 'true') {
    window.location.href = 'Login.html';
    return;
  }

  initSidebar();
  initTabs();
  initLogout();
  updateAdminProfile();
  initDashboardFilter();

  // Show welcome toast if redirected from Login
  const showWelcome = localStorage.getItem('show_welcome_toast');
  if (showWelcome) {
    setTimeout(() => {
      showToast(`Chào mừng ${localStorage.getItem('admin_name') || 'Quản trị viên'} quay trở lại!`, 'success');
      localStorage.removeItem('show_welcome_toast');
    }, 800);
  }
});

/* DASHBOARD DATE FILTER */
const DASHBOARD_MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

function initDashboardFilter() {
  const filterType = document.getElementById('dashboard-filter-type');
  const filterMonth = document.getElementById('dashboard-filter-month');
  const filterMonthYear = document.getElementById('dashboard-filter-month-year');
  const filterYear = document.getElementById('dashboard-filter-year');

  if (!filterType) return;

  const now = new Date();
  const currentYear = now.getFullYear();

  for (let y = currentYear; y >= currentYear - 5; y--) {
    filterMonthYear.innerHTML += `<option value="${y}">${y}</option>`;
    filterYear.innerHTML += `<option value="${y}">${y}</option>`;
  }

  DASHBOARD_MONTH_NAMES.forEach((name, i) => {
    filterMonth.innerHTML += `<option value="${i + 1}">${name}</option>`;
  });

  filterMonth.value = String(now.getMonth() + 1);
  filterMonthYear.value = String(currentYear);
  filterYear.value = String(currentYear);

  function onTypeChange() {
    const isMonth = filterType.value === 'month';
    filterMonth.classList.toggle('dashboard-filter-hidden', !isMonth);
    filterMonthYear.classList.toggle('dashboard-filter-hidden', !isMonth);
    filterYear.classList.toggle('dashboard-filter-hidden', isMonth);
    applyDashboardFilter();
  }

  filterType.addEventListener('change', onTypeChange);
  [filterMonth, filterMonthYear, filterYear].forEach(el => {
    el.addEventListener('change', applyDashboardFilter);
  });

  onTypeChange();
}

function dashboardSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededValue(seed, min, max) {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(min + frac * (max - min + 1));
}

function formatRevenue(amount) {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B ₫`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M ₫`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K ₫`;
  return `${amount} ₫`;
}

function formatNumber(n) {
  return n.toLocaleString('vi-VN');
}

function setStatChange(el, percent) {
  if (!el) return;
  const isPositive = percent >= 0;
  el.classList.remove('positive', 'negative');
  el.classList.add(isPositive ? 'positive' : 'negative');
  const arrow = isPositive
    ? '<polyline points="18 15 12 9 6 15"></polyline>'
    : '<polyline points="6 9 12 15 18 9"></polyline>';
  el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${arrow}</svg>
    ${isPositive ? '+' : ''}${percent.toFixed(1)}%
  `;
}

function applyDashboardFilter() {
  const type = document.getElementById('dashboard-filter-type').value;
  const bookingsLabel = document.getElementById('dash-label-bookings');
  let seedKey = '';

  if (type === 'month') {
    const month = document.getElementById('dashboard-filter-month').value;
    const year = document.getElementById('dashboard-filter-month-year').value;
    seedKey = `month-${year}-${month}`;
    if (bookingsLabel) bookingsLabel.textContent = 'Booking trong tháng';
  } else {
    const year = document.getElementById('dashboard-filter-year').value;
    seedKey = `year-${year}`;
    if (bookingsLabel) bookingsLabel.textContent = 'Booking trong năm';
  }

  const base = dashboardSeed(seedKey);
  const multiplier = type === 'month' ? 28 : 365;

  const revenue = seededValue(base + 1, 800_000, 4_500_000) * multiplier;
  const bookings = seededValue(base + 2, 12, 85) * (type === 'year' ? 12 : 1);
  const users = seededValue(base + 3, 200, 1500) * (type === 'year' ? 8 : 3);
  const hosts = seededValue(base + 4, 15, 120) * (type === 'year' ? 6 : 1);
  const disputes = seededValue(base + 5, 1, 25) * (type === 'year' ? 4 : 1);
  const completion = (seededValue(base + 6, 880, 990) / 10).toFixed(1);

  document.getElementById('dash-stat-revenue').textContent = formatRevenue(revenue);
  document.getElementById('dash-stat-bookings').textContent = formatNumber(bookings);
  document.getElementById('dash-stat-users').textContent = formatNumber(users);
  document.getElementById('dash-stat-hosts').textContent = formatNumber(hosts);
  document.getElementById('dash-stat-disputes').textContent = formatNumber(disputes);
  document.getElementById('dash-stat-completion').textContent = `${completion}%`;

  setStatChange(document.getElementById('dash-change-revenue'), (seededValue(base + 10, -5, 20) / 10));
  setStatChange(document.getElementById('dash-change-bookings'), (seededValue(base + 11, -3, 15) / 10));
  setStatChange(document.getElementById('dash-change-users'), (seededValue(base + 12, 0, 12) / 10));
  setStatChange(document.getElementById('dash-change-hosts'), (seededValue(base + 13, 0, 8) / 10));
  setStatChange(document.getElementById('dash-change-disputes'), -(seededValue(base + 14, 0, 8) / 10));
  setStatChange(document.getElementById('dash-change-completion'), (seededValue(base + 15, 0, 10) / 10));
}

function updateAdminProfile() {
  const adminName = localStorage.getItem('admin_name') || 'Admin';
  const avatarEl = document.querySelector('.user-profile .user-avatar');
  if (avatarEl) {
    const words = adminName.trim().split(/\s+/);
    let initials = 'AD';
    if (words.length >= 2) {
      initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1) {
      initials = words[0].substring(0, 2).toUpperCase();
    }
    avatarEl.textContent = initials;
    avatarEl.title = `${adminName} (${localStorage.getItem('admin_role') || 'Admin'})`;
  }
}

/* 1. SIDEBAR TOGGLE & RESPONSIVENESS */
const SIDEBAR_MOBILE_BREAKPOINT = 768;

function isMobileSidebarLayout() {
  return window.innerWidth <= SIDEBAR_MOBILE_BREAKPOINT;
}

function applySidebarLayout() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;

  sidebar.classList.remove('mobile-open');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('sidebar-open');

  if (isMobileSidebarLayout()) {
    sidebar.classList.add('collapsed');
  }
}

function initSidebar() {
  const toggleBtn = document.getElementById('toggle-sidebar');
  const sidebar = document.getElementById('sidebar');

  applySidebarLayout();

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (!isMobileSidebarLayout()) {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  window.addEventListener('resize', applySidebarLayout);
}

/* 2. TAB VIEW NAVIGATION */
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const viewContainers = document.querySelectorAll('.view-container');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-target');
      
      // Update nav active status
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Update view container active status
      viewContainers.forEach(view => {
        view.classList.remove('active');
        if (view.getAttribute('id') === `view-${targetView}`) {
          view.classList.add('active');
        }
      });

      if (isMobileSidebarLayout()) {
        applySidebarLayout();
      }
    });
  });
}

/* 3. REAL-TIME SEARCH FILTER FOR ANY TABLE */
function filterTable(tableId, query) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const cleanQuery = query.toLowerCase().trim();

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let rowContainsQuery = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j].innerText.toLowerCase().includes(cleanQuery)) {
        rowContainsQuery = true;
        break;
      }
    }

    if (rowContainsQuery) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

/* 4. FILTER TABLE BY SELECT OPTION (STATUS) */
function filterTableByStatus(tableId, status) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const cleanStatus = status.toLowerCase().trim();

  for (let i = 0; i < rows.length; i++) {
    const statusCell = rows[i].cells[rows[i].cells.length - 2]; // status badge is usually 2nd to last column
    
    if (!cleanStatus || statusCell.innerText.toLowerCase().includes(cleanStatus)) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

/* 5. TOAST NOTIFICATIONS */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Icon based on type
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--info)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;

  container.appendChild(toast);

  // Auto remove after 4s
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* 6. MODAL HELPERS */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

/* 7. DETAIL VIEW RENDERERS */
function viewDetails(entity, id) {
  const data = mockDatabase[entity]?.[id];
  if (!data) return;

  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');

  // Clear previous buttons
  modalFooter.innerHTML = `<button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>`;

  if (entity === 'user') {
    modalTitle.innerText = `Thông tin người dùng: ${data.name}`;
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Họ và Tên</span><span class="detail-value">${data.name}</span></div>
        <div class="detail-item"><span class="detail-label">Email</span><span class="detail-value">${data.email}</span></div>
        <div class="detail-item"><span class="detail-label">Số điện thoại</span><span class="detail-value">${data.phone}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày sinh</span><span class="detail-value">${data.dob || '-'}</span></div>
        <div class="detail-item"><span class="detail-label">Giới tính</span><span class="detail-value">${data.gender || '-'}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày tham gia</span><span class="detail-value">${data.joinDate}</span></div>
        <div class="detail-item" style="grid-column: span 2;"><span class="detail-label">Địa chỉ</span><span class="detail-value">${data.address}</span></div>
        <div class="detail-item"><span class="detail-label">Số booking đặt</span><span class="detail-value">${data.bookings} đơn đặt</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
      </div>
    `;
  } else if (entity === 'room') {
    modalTitle.innerText = `Thông tin chi tiết: ${data.name}`;
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Tên phòng</span><span class="detail-value">${data.name}</span></div>
        <div class="detail-item"><span class="detail-label">Thuộc khách sạn</span><span class="detail-value">${data.hotel}</span></div>
        <div class="detail-item"><span class="detail-label">Sức chứa</span><span class="detail-value">${data.capacity}</span></div>
        <div class="detail-item"><span class="detail-label">Kích thước</span><span class="detail-value">${data.size}</span></div>
        <div class="detail-item"><span class="detail-label">Giá mỗi đêm</span><span class="detail-value">${data.price}</span></div>
        <div class="detail-item"><span class="detail-label">Tình trạng trống</span><span class="detail-value">${data.available}</span></div>
        <div class="detail-item"><span class="detail-label">Đánh giá khách hàng</span><span class="detail-value">${data.rating}</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
        <div class="detail-item" style="grid-column: span 2;"><span class="detail-label">Tiện ích phòng</span><span class="detail-value">${data.amenities}</span></div>
      </div>
    `;
  } else if (entity === 'booking') {
    modalTitle.innerText = `Thông tin đặt phòng: ${data.id}`;
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Mã đặt phòng</span><span class="detail-value">${data.id}</span></div>
        <div class="detail-item"><span class="detail-label">Tên khách hàng</span><span class="detail-value">${data.guest}</span></div>
        <div class="detail-item"><span class="detail-label">Khách sạn/Resort</span><span class="detail-value">${data.hotel}</span></div>
        <div class="detail-item"><span class="detail-label">Số điện thoại liên lạc</span><span class="detail-value">${data.phone || '-'}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày nhận phòng</span><span class="detail-value">${data.checkIn}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày trả phòng</span><span class="detail-value">${data.checkOut}</span></div>
        <div class="detail-item"><span class="detail-label">Tổng thanh toán</span><span class="detail-value">${data.amount}</span></div>
        <div class="detail-item"><span class="detail-label">Phương thức thanh toán</span><span class="detail-value">${data.paymentMethod || '-'}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày đặt đơn</span><span class="detail-value">${data.created}</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái booking</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
      </div>
    `;
  } else if (entity === 'dispute') {
    modalTitle.innerText = `Tranh chấp: ${data.id}`;
    
    let logsHtml = '';
    if (data.logs && data.logs.length > 0) {
      logsHtml = `
        <div class="detail-item" style="grid-column: span 2; margin-top: 12px;">
          <span class="detail-label">Lịch sử hội thoại giải quyết</span>
          <div class="list-container" style="margin-top: 8px;">
            ${data.logs.map(log => `
              <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:10px; background-color: var(--bg-hover);">
                <div class="list-item-text" style="font-weight:600; color:var(--primary);">${log.sender}:</div>
                <div class="list-item-subtext" style="color:var(--text-primary); font-size:0.85rem;">${log.message}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Mã tranh chấp</span><span class="detail-value">${data.id}</span></div>
        <div class="detail-item"><span class="detail-label">Mã đặt phòng</span><span class="detail-value">${data.booking}</span></div>
        <div class="detail-item"><span class="detail-label">Người gửi khiếu nại</span><span class="detail-value">${data.complainant}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày lập hồ sơ</span><span class="detail-value">${data.filed}</span></div>
        <div class="detail-item" style="grid-column: span 2;"><span class="detail-label">Lý do tranh chấp</span><span class="detail-value">${data.reason}</span></div>
        <div class="detail-item" style="grid-column: span 2;"><span class="detail-label">Chi tiết nội dung khiếu nại</span><span class="detail-value">${data.details}</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
        ${logsHtml}
      </div>
    `;

    if (data.status !== 'resolved') {
      modalFooter.innerHTML = `
        <button class="btn btn-primary" onclick="resolveDispute('${data.id}')">Giải quyết ngay</button>
        <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
      `;
    }
  } else if (entity === 'payment') {
    modalTitle.innerText = `Giao dịch: ${data.id}`;
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Mã giao dịch</span><span class="detail-value">${data.id}</span></div>
        <div class="detail-item"><span class="detail-label">Mã booking</span><span class="detail-value">${data.booking}</span></div>
        <div class="detail-item"><span class="detail-label">Số tiền</span><span class="detail-value">${data.amount}</span></div>
        <div class="detail-item"><span class="detail-label">Loại giao dịch</span><span class="detail-value">${data.type}</span></div>
        <div class="detail-item"><span class="detail-label">Cổng thanh toán</span><span class="detail-value">${data.gateway}</span></div>
        <div class="detail-item"><span class="detail-label">Mã giao dịch tham chiếu</span><span class="detail-value">${data.code}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày thực hiện</span><span class="detail-value">${data.date}</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
      </div>
    `;
  } else if (entity === 'admin') {
    modalTitle.innerText = `Tài khoản admin: ${data.name}`;
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Mã tài khoản</span><span class="detail-value">${data.id}</span></div>
        <div class="detail-item"><span class="detail-label">Tên nhân viên</span><span class="detail-value">${data.name}</span></div>
        <div class="detail-item"><span class="detail-label">Email công việc</span><span class="detail-value">${data.email}</span></div>
        <div class="detail-item"><span class="detail-label">Vai trò / Phân quyền</span><span class="detail-value">${data.role}</span></div>
        <div class="detail-item"><span class="detail-label">Ngày tạo tài khoản</span><span class="detail-value">${data.joined}</span></div>
        <div class="detail-item"><span class="detail-label">Hoạt động lần cuối</span><span class="detail-value">${data.lastLogin}</span></div>
        <div class="detail-item"><span class="detail-label">Trạng thái</span><span class="detail-value">${getStatusBadge(data.status)}</span></div>
      </div>
    `;
  }

  openModal('detail-modal');
}

/* Helper to map status to badges */
function getStatusBadge(status) {
  if (status === 'active' || status === 'approved' || status === 'confirmed' || status === 'completed') {
    return `<span class="badge badge-success">${status === 'active' ? 'Hoạt động' : status === 'approved' ? 'Duyệt' : status === 'confirmed' ? 'Xác nhận' : 'Hoàn thành'}</span>`;
  } else if (status === 'pending' || status === 'under-review') {
    return `<span class="badge badge-warning">${status === 'pending' ? 'Chờ duyệt / xử lý' : 'Đang xem xét'}</span>`;
  } else {
    return `<span class="badge badge-danger">${status === 'blocked' ? 'Bị khóa' : status === 'rejected' ? 'Từ chối' : 'Đã hủy'}</span>`;
  }
}

/* 8. ACTIONS LOGIC (UPDATE STATUSES DYNAMICALLY) */
function toggleUserStatus(id, newStatus) {
  const user = mockDatabase.user[id];
  if (!user) return;

  // Toggle status
  user.status = newStatus;

  // Update table badge and icon
  const row = document.querySelector(`#users-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[4];
    const actionCell = row.cells[5];

    if (newStatus === 'blocked') {
      badgeCell.innerHTML = `<span class="badge badge-danger">Bị khóa</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn-icon" title="Chi tiết" onclick="viewDetails('user', '${id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="btn-icon" title="Mở khóa" onclick="toggleUserStatus('${id}', 'active')">
            <svg class="unlock-icon text-success" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
          </button>
        </div>
      `;
      showToast(`Đã khóa tài khoản người dùng ${user.name}!`, 'warning');
    } else {
      badgeCell.innerHTML = `<span class="badge badge-success">Hoạt động</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn-icon" title="Chi tiết" onclick="viewDetails('user', '${id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="btn-icon" title="Khóa" onclick="toggleUserStatus('${id}', 'blocked')">
            <svg class="lock-icon text-danger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </button>
        </div>
      `;
      showToast(`Đã mở khóa tài khoản người dùng ${user.name}!`, 'success');
    }
  }
}

function changeHostStatus(id, newStatus) {
  const host = mockDatabase.host[id];
  if (!host) return;

  host.status = newStatus;
  
  const row = document.querySelector(`#hosts-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[5];
    const actionCell = row.cells[6];

    if (newStatus === 'approved') {
      badgeCell.innerHTML = `<span class="badge badge-success">Duyệt</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn btn-secondary btn-icon" title="Từ chối" onclick="changeHostStatus('${id}', 'rejected')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </button>
        </div>
      `;
      showToast(`Đã chấp thuận hoạt động cho chủ nhà ${host.name}!`, 'success');
    } else {
      badgeCell.innerHTML = `<span class="badge badge-danger">Từ chối</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn btn-secondary btn-icon" title="Duyệt lại" onclick="changeHostStatus('${id}', 'approved')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
          </button>
        </div>
      `;
      showToast(`Đã từ chối quyền hoạt động cho chủ nhà ${host.name}!`, 'warning');
    }
  }
}

function changeBookingStatus(id, newStatus) {
  const booking = mockDatabase.booking[id];
  if (!booking) return;

  booking.status = newStatus;
  const row = document.querySelector(`#bookings-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[6];
    const actionCell = row.cells[7];

    if (newStatus === 'confirmed') {
      badgeCell.innerHTML = `<span class="badge badge-success">Xác nhận</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn-icon" title="Chi tiết" onclick="viewDetails('booking', '${id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="btn-icon text-danger" title="Hủy" onclick="changeBookingStatus('${id}', 'cancelled')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </button>
        </div>
      `;
      showToast(`Đã duyệt xác nhận booking mã ${id}!`, 'success');
    } else {
      badgeCell.innerHTML = `<span class="badge badge-danger">Đã hủy</span>`;
      actionCell.innerHTML = `
        <div class="flex-align-center">
          <button class="btn-icon" title="Chi tiết" onclick="viewDetails('booking', '${id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      `;
      showToast(`Đã huỷ booking mã ${id}!`, 'warning');
    }
  }
}

function resolveDispute(id) {
  const dispute = mockDatabase.dispute[id];
  if (!dispute) return;

  dispute.status = 'resolved';
  dispute.logs.push({ sender: 'Admin', message: 'Đã giải quyết tranh chấp thông qua hệ thống.' });

  const row = document.querySelector(`#disputes-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[5];
    badgeCell.innerHTML = `<span class="badge badge-success">Đã giải quyết</span>`;
  }

  closeModal('detail-modal');
  showToast(`Tranh chấp ${id} đã được đánh dấu là Đã Giải Quyết!`, 'success');
}

function openCommentModal(id) {
  const dispute = mockDatabase.dispute[id];
  if (!dispute) return;

  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');

  modalTitle.innerText = `Trao đổi giải quyết: ${id}`;
  modalBody.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <p style="font-size:0.9rem; color:var(--text-secondary);">Nhập nội dung trao đổi hoặc ghi chú cho tranh chấp này:</p>
      <div class="form-group">
        <label class="form-label">Người gửi</label>
        <select class="form-input" id="dispute-comment-sender">
          <option value="Admin">Admin</option>
          <option value="Host">Host</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Nội dung ghi chú</label>
        <textarea class="form-input" id="dispute-comment-text" rows="4" placeholder="Nhập ghi chú phản hồi..."></textarea>
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    <button class="btn btn-primary" onclick="submitComment('${id}')">Lưu phản hồi</button>
    <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
  `;

  openModal('detail-modal');
}

function submitComment(id) {
  const dispute = mockDatabase.dispute[id];
  const sender = document.getElementById('dispute-comment-sender').value;
  const message = document.getElementById('dispute-comment-text').value.trim();

  if (!message) {
    alert('Vui lòng nhập nội dung!');
    return;
  }

  dispute.logs.push({ sender, message });
  closeModal('detail-modal');
  showToast('Đã lưu phản hồi vào lịch sử tranh chấp!', 'success');
}

function reprocessPayment(id) {
  const payment = mockDatabase.payment[id];
  if (!payment) return;

  payment.status = 'completed';
  const row = document.querySelector(`#payments-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[5];
    const actionCell = row.cells[6];

    badgeCell.innerHTML = `<span class="badge badge-success">Hoàn thành</span>`;
    actionCell.innerHTML = `
      <div class="flex-align-center">
        <button class="btn-icon" title="Chi tiết" onclick="viewDetails('payment', '${id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
      </div>
    `;
    showToast(`Giao dịch ${id} đã được xử lý thành công!`, 'success');
  }
}

function togglePromoSwitch(id, isChecked) {
  const promo = mockDatabase.promotion[id];
  if (!promo) return;

  promo.status = isChecked ? 'active' : 'inactive';
  
  const row = document.querySelector(`#promotions-table tr[data-id="${id}"]`);
  if (row) {
    const badgeCell = row.cells[6];
    if (isChecked) {
      badgeCell.innerHTML = `<span class="badge badge-success">Hoạt động</span>`;
      showToast(`Đã kích hoạt chương trình khuyến mãi ${promo.name}!`, 'success');
    } else {
      badgeCell.innerHTML = `<span class="badge badge-danger">Không hoạt động</span>`;
      showToast(`Đã tạm dừng chương trình khuyến mãi ${promo.name}!`, 'warning');
    }
  }
}

/* 9. TRIGGER MOCK REPORTS DOWNLOAD */
function triggerReportExport(type) {
  showToast(`Hệ thống đang trích xuất dữ liệu Báo cáo ${type}...`, 'info');
  setTimeout(() => {
    showToast(`Tải xuống báo cáo ${type} thành công (Định dạng PDF/Excel)!`, 'success');
  }, 1500);
}

/* 10. DYNAMIC MODALS FOR ADDING ITEMS */
function openAddModal(entity) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');

  if (entity === 'user') {
    modalTitle.innerText = 'Thêm Người Dùng Mới';
    modalBody.innerHTML = `
      <form id="add-user-form">
        <div class="form-group">
          <label class="form-label">Họ và Tên</label>
          <input type="text" class="form-input" id="new-user-name" required placeholder="Nguyễn Văn A">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="new-user-email" required placeholder="example@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">Số điện thoại</label>
          <input type="text" class="form-input" id="new-user-phone" required placeholder="090xxxxxxxx">
        </div>
        <div class="form-group">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-input" id="new-user-address" required placeholder="Quận 1, TP. HCM">
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddUser()">Thêm mới</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  } else if (entity === 'host') {
    modalTitle.innerText = 'Đăng Ký Host Mới';
    modalBody.innerHTML = `
      <form id="add-host-form">
        <div class="form-group">
          <label class="form-label">Tên Khách Sạn / Cơ Sở Lưu Trú</label>
          <input type="text" class="form-input" id="new-host-name" required placeholder="Golden Villa Resort">
        </div>
        <div class="form-group">
          <label class="form-label">Tên Chủ Sở Hữu</label>
          <input type="text" class="form-input" id="new-host-owner" required placeholder="Phan Văn B">
        </div>
        <div class="form-group">
          <label class="form-label">Tổng số phòng</label>
          <input type="number" class="form-input" id="new-host-rooms" required placeholder="20">
        </div>
        <div class="form-group">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-input" id="new-host-address" required placeholder="Vũng Tàu, Bà Rịa - Vũng Tàu">
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddHost()">Đăng ký</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  } else if (entity === 'room') {
    modalTitle.innerText = 'Thêm Căn Hộ / Phòng Mới';
    modalBody.innerHTML = `
      <form id="add-room-form">
        <div class="form-group">
          <label class="form-label">Tên phòng</label>
          <input type="text" class="form-input" id="new-room-name" required placeholder="Phòng President Suite">
        </div>
        <div class="form-group">
          <label class="form-label">Khách sạn</label>
          <input type="text" class="form-input" id="new-room-hotel" required placeholder="Minh Resort">
        </div>
        <div class="form-group">
          <label class="form-label">Sức chứa tối đa</label>
          <input type="text" class="form-input" id="new-room-capacity" required placeholder="4 người">
        </div>
        <div class="form-group">
          <label class="form-label">Giá mỗi đêm</label>
          <input type="text" class="form-input" id="new-room-price" required placeholder="₫3.5M">
        </div>
        <div class="form-group">
          <label class="form-label">Số phòng trống</label>
          <input type="text" class="form-input" id="new-room-available" required placeholder="5 phòng">
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddRoom()">Thêm phòng</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  } else if (entity === 'booking') {
    modalTitle.innerText = 'Thêm Booking Thủ Công';
    modalBody.innerHTML = `
      <form id="add-booking-form">
        <div class="form-group">
          <label class="form-label">Họ Tên Khách Hàng</label>
          <input type="text" class="form-input" id="new-booking-guest" required placeholder="Vũ Ngọc Khánh">
        </div>
        <div class="form-group">
          <label class="form-label">Resort / Khách sạn</label>
          <input type="text" class="form-input" id="new-booking-hotel" required placeholder="Beach Paradise">
        </div>
        <div class="form-group">
          <label class="form-label">Check-in</label>
          <input type="date" class="form-input" id="new-booking-checkin" required>
        </div>
        <div class="form-group">
          <label class="form-label">Check-out</label>
          <input type="date" class="form-input" id="new-booking-checkout" required>
        </div>
        <div class="form-group">
          <label class="form-label">Tổng chi phí</label>
          <input type="text" class="form-input" id="new-booking-amount" required placeholder="₫4.8M">
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddBooking()">Tạo đơn</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  } else if (entity === 'promotion') {
    modalTitle.innerText = 'Tạo Chương Trình Khuyến Mãi Mới';
    modalBody.innerHTML = `
      <form id="add-promo-form">
        <div class="form-group">
          <label class="form-label">Tên khuyến mãi</label>
          <input type="text" class="form-input" id="new-promo-name" required placeholder="Khuyến Mãi Lễ Quốc Khánh">
        </div>
        <div class="form-group">
          <label class="form-label">Loại ưu đãi</label>
          <select class="form-input" id="new-promo-type">
            <option value="Voucher">Voucher giảm giá</option>
            <option value="Flash Sale">Sự kiện Flash Sale</option>
            <option value="Promo">Promo Code</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Tỷ lệ giảm giá</label>
          <input type="text" class="form-input" id="new-promo-discount" required placeholder="10%">
        </div>
        <div class="form-group">
          <label class="form-label">Hiệu lực từ ngày</label>
          <input type="date" class="form-input" id="new-promo-from" required>
        </div>
        <div class="form-group">
          <label class="form-label">Đến hết ngày</label>
          <input type="date" class="form-input" id="new-promo-to" required>
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddPromo()">Phát hành</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  } else if (entity === 'admin') {
    modalTitle.innerText = 'Cấp Tài Khoản Admin Mới';
    modalBody.innerHTML = `
      <form id="add-admin-form">
        <div class="form-group">
          <label class="form-label">Họ tên nhân viên</label>
          <input type="text" class="form-input" id="new-admin-name" required placeholder="Vũ Hoài Nam">
        </div>
        <div class="form-group">
          <label class="form-label">Email công việc</label>
          <input type="email" class="form-input" id="new-admin-email" required placeholder="namvu@platform.com">
        </div>
        <div class="form-group">
          <label class="form-label">Vai trò</label>
          <select class="form-input" id="new-admin-role">
            <option value="Super Admin">Super Admin</option>
            <option value="User Manager">User Manager</option>
            <option value="Finance Officer">Finance Officer</option>
            <option value="Content Moderator">Content Moderator</option>
            <option value="Support Officer">Support Officer</option>
          </select>
        </div>
      </form>
    `;
    modalFooter.innerHTML = `
      <button class="btn btn-primary" onclick="submitAddAdmin()">Tạo ngay</button>
      <button class="btn btn-secondary" onclick="closeModal('detail-modal')">Đóng</button>
    `;
  }

  openModal('detail-modal');
}

/* SUBMIT CRUD HANDLERS */
function submitAddUser() {
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  const phone = document.getElementById('new-user-phone').value.trim();
  const address = document.getElementById('new-user-address').value.trim();

  if (!name || !email || !phone || !address) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const newId = 'u' + (Object.keys(mockDatabase.user).length + 1);
  const userObj = {
    name, email, phone, address, bookings: 0, status: 'active', joinDate: new Date().toISOString().split('T')[0]
  };

  mockDatabase.user[newId] = userObj;

  // Append row dynamically to table
  const tbody = document.getElementById('users-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-bold">${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td class="cell-bold">0</td>
    <td><span class="badge badge-success">Hoạt động</span></td>
    <td>
      <div class="flex-align-center">
        <button class="btn-icon" title="Chi tiết" onclick="viewDetails('user', '${newId}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button class="btn-icon" title="Khóa" onclick="toggleUserStatus('${newId}', 'blocked')">
          <svg class="lock-icon text-danger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã thêm thành công người dùng ${name}!`, 'success');
}

function submitAddHost() {
  const name = document.getElementById('new-host-name').value.trim();
  const owner = document.getElementById('new-host-owner').value.trim();
  const rooms = document.getElementById('new-host-rooms').value;
  const address = document.getElementById('new-host-address').value.trim();

  if (!name || !owner || !rooms || !address) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const newId = 'h' + (Object.keys(mockDatabase.host).length + 1);
  const hostObj = {
    name, owner, rooms: parseInt(rooms), revenue: '₫0', rating: 'Chưa có', status: 'pending', joined: new Date().toISOString().split('T')[0], address, email: 'owner.' + newId + '@email.com'
  };

  mockDatabase.host[newId] = hostObj;

  const tbody = document.getElementById('hosts-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-bold flex-align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M9 22V12h6v10"></path></svg>
      ${name}
    </td>
    <td>${owner}</td>
    <td class="cell-bold">${rooms}</td>
    <td class="cell-highlight">₫0</td>
    <td class="cell-bold">-</td>
    <td><span class="badge badge-warning">Chờ duyệt</span></td>
    <td>
      <div class="flex-align-center">
        <button class="btn btn-secondary btn-icon" title="Duyệt" onclick="changeHostStatus('${newId}', 'approved')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
        </button>
        <button class="btn btn-secondary btn-icon" title="Từ chối" onclick="changeHostStatus('${newId}', 'rejected')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-danger"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã ghi nhận đơn đăng ký Host cho ${name}!`, 'info');
}

function submitAddRoom() {
  const name = document.getElementById('new-room-name').value.trim();
  const hotel = document.getElementById('new-room-hotel').value.trim();
  const capacity = document.getElementById('new-room-capacity').value.trim();
  const price = document.getElementById('new-room-price').value.trim();
  const available = document.getElementById('new-room-available').value.trim();

  if (!name || !hotel || !capacity || !price || !available) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const newId = 'r' + (Object.keys(mockDatabase.room).length + 1);
  const roomObj = {
    name, hotel, capacity, price, available, status: 'active', rating: 'Chưa có', size: '30m²', amenities: 'Wifi, Điều hòa, Smart TV'
  };

  mockDatabase.room[newId] = roomObj;

  const tbody = document.getElementById('rooms-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-bold">${name}</td>
    <td>${hotel}</td>
    <td>${capacity}</td>
    <td class="cell-highlight">${price}</td>
    <td class="cell-bold text-success" style="color:var(--success);">${available}</td>
    <td><span class="badge badge-success">Hoạt động</span></td>
    <td>
      <div class="flex-align-center">
        <button class="btn-icon" title="Chi tiết" onclick="viewDetails('room', '${newId}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button class="btn-icon" title="Chỉnh sửa" onclick="editDetails('room', '${newId}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã thêm mới phòng ${name} vào hệ thống!`, 'success');
}

function submitAddBooking() {
  const guest = document.getElementById('new-booking-guest').value.trim();
  const hotel = document.getElementById('new-booking-hotel').value.trim();
  const checkIn = document.getElementById('new-booking-checkin').value;
  const checkOut = document.getElementById('new-booking-checkout').value;
  const amount = document.getElementById('new-booking-amount').value.trim();

  if (!guest || !hotel || !checkIn || !checkOut || !amount) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const num = Object.keys(mockDatabase.booking).length + 1;
  const newId = 'BK00' + num;
  const bookingObj = {
    id: newId, guest, hotel, checkIn, checkOut, amount, status: 'confirmed', created: new Date().toISOString().split('T')[0], phone: '0901234567', paymentMethod: 'Thẻ tín dụng'
  };

  mockDatabase.booking[newId] = bookingObj;

  const tbody = document.getElementById('bookings-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-highlight">${newId}</td>
    <td class="cell-bold">${guest}</td>
    <td>${hotel}</td>
    <td>${checkIn}</td>
    <td>${checkOut}</td>
    <td class="cell-bold">${amount}</td>
    <td><span class="badge badge-success">Xác nhận</span></td>
    <td>
      <div class="flex-align-center">
        <button class="btn-icon" title="Chi tiết" onclick="viewDetails('booking', '${newId}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button class="btn-icon text-danger" title="Hủy" onclick="changeBookingStatus('${newId}', 'cancelled')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã tạo thành công đơn đặt phòng mã ${newId}!`, 'success');
}

function submitAddPromo() {
  const name = document.getElementById('new-promo-name').value.trim();
  const type = document.getElementById('new-promo-type').value;
  const discount = document.getElementById('new-promo-discount').value.trim();
  const validFrom = document.getElementById('new-promo-from').value;
  const validTo = document.getElementById('new-promo-to').value;

  if (!name || !discount || !validFrom || !validTo) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const newId = 'p' + (Object.keys(mockDatabase.promotion).length + 1);
  const promoObj = {
    id: newId, name, type, discount, validFrom, validTo, used: 0, status: 'active'
  };

  mockDatabase.promotion[newId] = promoObj;

  const tbody = document.getElementById('promotions-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-bold">${name}</td>
    <td><span class="badge" style="background-color:var(--bg-muted); color:var(--text-primary)">${type}</span></td>
    <td class="cell-highlight">${discount}</td>
    <td>${validFrom}</td>
    <td>${validTo}</td>
    <td class="cell-bold">0</td>
    <td><span class="badge badge-success">Hoạt động</span></td>
    <td>
      <label class="switch">
        <input type="checkbox" checked onchange="togglePromoSwitch('${newId}', this.checked)">
        <span class="slider"></span>
      </label>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã phát hành thành công chương trình ${name}!`, 'success');
}

function submitAddAdmin() {
  const name = document.getElementById('new-admin-name').value.trim();
  const email = document.getElementById('new-admin-email').value.trim();
  const role = document.getElementById('new-admin-role').value;

  if (!name || !email || !role) {
    alert('Vui lòng điền đủ thông tin!');
    return;
  }

  const num = Object.keys(mockDatabase.admin).length + 1;
  const newId = 'ADM00' + num;
  const adminObj = {
    id: newId, name, email, role, status: 'active', joined: new Date().toISOString().split('T')[0], lastLogin: 'Chưa hoạt động'
  };

  mockDatabase.admin[newId] = adminObj;

  const tbody = document.getElementById('admins-table').getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', newId);
  tr.innerHTML = `
    <td class="cell-bold">${name}</td>
    <td>
      <span class="badge" style="background-color:var(--bg-muted); color:var(--primary); font-size:0.7rem; display:inline-flex; align-items:center; gap:3px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        ${role}
      </span>
    </td>
    <td><span class="badge badge-success">Hoạt động</span></td>
    <td>
      <div class="flex-align-center">
        <button class="btn-icon" title="Chi tiết" onclick="viewDetails('admin', '${newId}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);

  closeModal('detail-modal');
  showToast(`Đã tạo tài khoản quản trị cho ${name}!`, 'success');
}

/* 11. LOGOUT SIMULATOR */
function initLogout() {
  const logoutBtn = document.getElementById('logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?');
      if (confirmLogout) {
        showToast('Đang đăng xuất...', 'warning');
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_email');
        localStorage.removeItem('admin_name');
        localStorage.removeItem('admin_role');
        setTimeout(() => {
          window.location.href = 'Login.html';
        }, 1000);
      }
    });
  }
}
