/**
 * Rovva Client - Mock authentication (localStorage)
 */
const RovvaAuth = (() => {
  const SESSION_KEY = 'rovva_logged_in';
  const USER_KEY = 'rovva_user';
  const USERS_KEY = 'rovva_users';

  const DEFAULT_USERS = {
    'minh@gmail.com': { password: '123', name: 'Minh' },
    'giahan@gmail.com': { password: '123', name: 'Lại Gia Hân' }
  };

  function getUsers() {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (_) { /* ignore */ }
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    return { ...DEFAULT_USERS };
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function isLoggedIn() {
    return localStorage.getItem(SESSION_KEY) === 'true';
  }

  function getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function login(email, password) {
    const users = getUsers();
    const key = email.trim().toLowerCase();
    const user = users[key];

    if (!user || user.password !== password) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác.' };
    }

    const session = { email: key, name: user.name };
    localStorage.setItem(SESSION_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  function register(name, email, password) {
    const users = getUsers();
    const key = email.trim().toLowerCase();

    if (!name.trim() || !key || !password) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin.' };
    }

    if (users[key]) {
      return { success: false, message: 'Email đã được sử dụng.' };
    }

    users[key] = { password, name: name.trim() };
    saveUsers(users);
    return login(key, password);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      window.location.href = resolvePath('DangNhap.html?redirect=' + encodeURIComponent(currentPage));
      return false;
    }
    return true;
  }

  function redirectIfLoggedIn(target) {
    if (isLoggedIn()) {
      window.location.href = resolvePath(target || 'TrangChu_DaDangNhap.html');
      return true;
    }
    return false;
  }

  function resolvePath(filename) {
    const inComponents = window.location.pathname.includes('/components/');
    if (inComponents && !filename.startsWith('../') && !filename.startsWith('http')) {
      return '../' + filename;
    }
    return filename;
  }

  return {
    isLoggedIn,
    getUser,
    login,
    register,
    logout,
    requireAuth,
    redirectIfLoggedIn,
    resolvePath,
    DEFAULT_USERS
  };
})();

if (typeof window !== 'undefined') {
  window.RovvaAuth = RovvaAuth;
}
