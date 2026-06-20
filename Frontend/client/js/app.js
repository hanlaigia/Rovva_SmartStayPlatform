/**
 * Rovva Client - Responsive scaling, navigation & page wiring
 */
(function () {
  const DESIGN_WIDTH = 1440;

  const AUTH_REQUIRED = [
    'TrangChu_DaDangNhap.html',
    'TaiKhoan_ThongTinCaNhan.html'
  ];

  const GUEST_ONLY = ['DangNhap.html', 'DangKy.html'];

  /* ── Responsive scaling ── */
  function initResponsive() {
    const page = document.querySelector('[class*="page-"]');
    if (!page || page.dataset.scaled) return;
    page.dataset.scaled = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'page-scaler';
    page.parentNode.insertBefore(wrapper, page);
    wrapper.appendChild(page);

    function resize() {
      const scale = window.innerWidth / DESIGN_WIDTH;
      page.style.transform = 'scale(' + scale + ')';
      page.style.transformOrigin = 'top center';
      wrapper.style.height = page.offsetHeight * scale + 'px';
    }

    window.addEventListener('resize', resize);
    if (document.readyState === 'complete') resize();
    else window.addEventListener('load', resize);
    resize();
  }

  /* ── Helpers ── */
  function path(file) {
    return RovvaAuth.resolvePath(file);
  }

  function homePage() {
    return RovvaAuth.isLoggedIn() ? 'TrangChu_DaDangNhap.html' : 'TrangKhach.html';
  }

  function exactText(el) {
    return (el.textContent || '').trim();
  }

  function findAllByExactText(text) {
    const results = [];
    document.querySelectorAll('div, span').forEach(function (el) {
      if (el.children.length === 0 && exactText(el) === text) {
        results.push(el);
      } else if (el.children.length > 0 && exactText(el) === text && !el.querySelector('div, span')) {
        results.push(el);
      }
    });
    return results;
  }

  function makeClickable(el, handler) {
    if (!el || el.dataset.rovvaLink) return;
    el.dataset.rovvaLink = '1';
    el.classList.add('rovva-link');
    el.addEventListener('click', handler);
  }

  function navigate(file) {
    window.location.href = path(file);
  }

  function showToast(msg) {
    var existing = document.querySelector('.rovva-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'rovva-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3500);
  }

  /* ── Auth guards ── */
  function initAuthGuards() {
    var page = window.location.pathname.split('/').pop() || 'index.html';

    if (AUTH_REQUIRED.indexOf(page) !== -1 && !RovvaAuth.requireAuth()) return;

    if (GUEST_ONLY.indexOf(page) !== -1) {
      RovvaAuth.redirectIfLoggedIn();
    }
  }

  /* ── Login page ── */
  function initLoginPage() {
    if (!window.location.pathname.includes('DangNhap')) return;

    var card = document.querySelector('.c-7');
    if (!card) return;

    var hint = document.createElement('div');
    hint.className = 'rovva-demo-hint';
    hint.innerHTML = '<strong>Tài khoản demo:</strong><br>minh@gmail.com / 123 (Minh)<br>giahan@gmail.com / 123 (Lại Gia Hân)';
    document.body.appendChild(hint);

    var errorEl = document.createElement('div');
    errorEl.id = 'login-error';
    errorEl.className = 'rovva-login-error';
    errorEl.style.cssText = 'position:absolute;left:24px;top:12px;right:24px;z-index:10;';
    card.appendChild(errorEl);

    var placeholders = card.querySelectorAll('.c-19 .c-21');
    var emailInput, passInput;

    if (placeholders.length >= 2) {
      emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.className = 'rovva-input';
      emailInput.placeholder = 'minh@gmail.com';
      emailInput.value = 'minh@gmail.com';
      emailInput.autocomplete = 'email';

      passInput = document.createElement('input');
      passInput.type = 'password';
      passInput.className = 'rovva-input';
      passInput.placeholder = '••••••••';
      passInput.value = '123';
      passInput.autocomplete = 'current-password';

      placeholders[0].replaceWith(emailInput);
      placeholders[1].replaceWith(passInput);
    }

    function doLogin() {
      var result = RovvaAuth.login(emailInput.value, passInput.value);
      if (result.success) {
        errorEl.style.display = 'none';
        showToast('Đăng nhập thành công! Chào mừng ' + result.user.name + '!');
        var params = new URLSearchParams(window.location.search);
        var redirect = params.get('redirect');
        setTimeout(function () { navigate(redirect || 'TrangChu_DaDangNhap.html'); }, 800);
      } else {
        errorEl.textContent = result.message;
        errorEl.style.display = 'block';
      }
    }

    var loginBtns = findAllByExactText('Đăng Nhập');
    loginBtns.forEach(function (btn) {
      var container = btn.closest('.c-36') || btn.parentElement;
      makeClickable(container || btn, doLogin);
    });

    if (emailInput && passInput) {
      passInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
      });
    }
  }

  /* ── Register page ── */
  function initRegisterPage() {
    if (!window.location.pathname.includes('DangKy')) return;

    ['.c-114', '.c-136'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        var container = btn.closest('.c-36, .c-37, .c-38') || btn.parentElement;
        makeClickable(container || btn, function () {
          showToast('Đăng ký thành công! Vui lòng đăng nhập.');
          navigate('DangNhap.html');
        });
      });
    });
  }

  /* ── Navigation wiring ── */
  function initNavigation() {
    var linkMap = {
      'Trang chủ': function () { navigate(homePage()); },
      'Đăng nhập': function () { navigate('DangNhap.html'); },
      'Đăng ký ngay': function () { navigate('DangKy.html'); },
      'Đăng nhập ngay': function () { navigate('DangNhap.html'); },
      'Đăng Nhập Và Nhận Tất Cả': function () { navigate('DangNhap.html'); },
      'Tìm kiếm': function () { navigate('TongLuuTru.html'); },
      'Xem chi tiết': function (e) {
        var el = this;
        var style = window.getComputedStyle(el);
        var isSmallLink = el.classList.contains('c-173') || style.backgroundColor === 'rgba(0, 0, 0, 0)' || style.backgroundColor === 'transparent';
        if (window.location.pathname.includes('ChiTietCoSoLuuTru') && isSmallLink) {
          showModal(RovvaAuth.resolvePath('components/popup_xemchitietphong.html'));
        } else if (window.location.pathname.includes('ChiTietCoSoLuuTru')) {
          navigate('DatPhong_ThanhToan_TrangThai1.html');
        } else {
          var parentCard = el.closest('.c-43, .c-79, .c-141, .c-166');
          var titleEl = parentCard ? parentCard.querySelector('.c-52, .c-87, .c-145') : null;
          var titleText = titleEl ? titleEl.textContent : '';
          var dest = 'ChiTietCoSoLuuTru_Hotel.html';
          if (titleText.toLowerCase().includes('căn hộ') || titleText.toLowerCase().includes('loft') || titleText.toLowerCase().includes('cabin')) {
            dest = 'ChiTietCoSoLuuTru_CanHo.html';
          }
          navigate(dest);
        }
      },
      'Đặt phòng ngay': function () { navigate('DatPhong_ThanhToan_TrangThai1.html'); },
      'Xác nhận & Thanh toán': function () { navigate('DatPhong_ThanhToan_TrangThai2.html'); },
      'Xem chi tiết đơn đặt phòng': function () { navigate('DatPhong_ThanhToan_TrangThai2.html'); },
      'Quay lại Trang chủ': function () { navigate(homePage()); },
      'Đà Lạt': function () { navigate('TongLuuTru.html'); },
      'Đà Nẵng': function () { navigate('TongLuuTru.html'); },
      'Vũng Tàu': function () { navigate('TongLuuTru.html'); },
      'Sapa': function () { navigate('TongLuuTru.html'); },
      'Ưu đãi': function () {
        var promoSec = document.querySelector('.c-81, .c-84, .c-51');
        if (promoSec) {
          promoSec.scrollIntoView({ behavior: 'smooth' });
        } else {
          showToast('Không tìm thấy chương trình ưu đãi hiện tại.');
        }
      },
      'Trở thành Host': function () {
        showToast('Tính năng đăng ký Host đang được bảo trì. Vui lòng liên hệ Hotline: 1900 2005.');
      },
      'Hỗ trợ': function () {
        showModal(RovvaAuth.resolvePath('components/popup_rovva_ai.html'));
      },
      'Chính sách': function () {
        showToast('Chính sách hoạt động của Rovva có hiệu lực từ ngày 01/01/2026.');
      }
    };

    Object.keys(linkMap).forEach(function (text) {
      findAllByExactText(text).forEach(function (el) {
        makeClickable(el, linkMap[text]);
      });
    });

    findAllByExactText('Đăng ký').forEach(function (el) {
      if (exactText(el) === 'Đăng ký') {
        makeClickable(el, function () { navigate('DangKy.html'); });
      }
    });

    findAllByExactText('Quay lại').forEach(function (el) {
      makeClickable(el, function () {
        if (window.location.pathname.includes('TrangThai2')) {
          navigate('DatPhong_ThanhToan_TrangThai1.html');
        } else if (window.location.pathname.includes('TrangThai1')) {
          navigate('ChiTietCoSoLuuTru_Hotel.html');
        } else {
          navigate(homePage());
        }
      });
    });

    findAllByExactText('Đăng xuất').forEach(function (el) {
      makeClickable(el, function () {
        showModal(RovvaAuth.resolvePath('components/popup_xacnhandangxuat.html'));
      });
    });

    findAllByExactText('Chuyến đi của tôi').forEach(function (el) {
      makeClickable(el, function () { showToast('Bạn chưa có chuyến đi nào sắp diễn ra.'); });
    });
    findAllByExactText('Ví xu').forEach(function (el) {
      makeClickable(el, function () { showToast('Ví xu hiện tại của bạn: 150 xu'); });
    });
    findAllByExactText('Hạng thành viên').forEach(function (el) {
      makeClickable(el, function () { showToast('Hạng thành viên: VÀNG (Ưu đãi 10%)'); });
    });
    findAllByExactText('Danh sách yêu thích').forEach(function (el) {
      makeClickable(el, function () { showToast('Danh sách yêu thích trống.'); });
    });
    findAllByExactText('Đánh giá của tôi').forEach(function (el) {
      makeClickable(el, function () { showToast('Bạn chưa thực hiện đánh giá nào.'); });
    });
    findAllByExactText('Bảo mật và Tài Khoản').forEach(function (el) {
      makeClickable(el, function () { showToast('Tính năng bảo mật tài khoản đang được nâng cấp.'); });
    });

    document.querySelectorAll('img[src*="Logo"]').forEach(function (img) {
      makeClickable(img, function () { navigate(homePage()); });
    });

    // Floating chatbot button click
    var chatbotBtns = document.querySelectorAll('.c-194, .c-195, .c-196, .c-197, .c-202, .c-203, .c-204, .c-205');
    chatbotBtns.forEach(function (btn) {
      makeClickable(btn, function () {
        showModal(RovvaAuth.resolvePath('components/popup_rovva_ai.html'));
      });
    });

    if (window.location.pathname.includes('TongLuuTru')) {
      document.querySelectorAll('[class*="c-"]').forEach(function (el) {
        var t = exactText(el);
        if (t.indexOf('Khách sạn') !== -1 || t.indexOf('Resort') !== -1 || t.indexOf('Homestay') !== -1) {
          if (el.children.length === 0) {
            makeClickable(el, function () { navigate('ChiTietCoSoLuuTru_Hotel.html'); });
          }
        }
      });
    }

    if (window.location.pathname.includes('TrangKhach')) {
      document.querySelectorAll('.c-2, .c-3, .c-4, .c-5').forEach(function (el) {
        var t = exactText(el);
        if (t === 'Đà Lạt' || t.indexOf('Tuyen Lam') !== -1) {
          makeClickable(el, function () { navigate('TongLuuTru.html'); });
        }
      });
    }

    if (window.location.pathname.includes('TrangThai2')) {
      document.querySelectorAll('div, span').forEach(function (el) {
        if (exactText(el).indexOf('Hoàn tất') !== -1 || exactText(el).indexOf('Thanh toán ngay') !== -1) {
          makeClickable(el, function () { navigate('DatPhong_ThanhToan_TrangThai3.html'); });
        }
      });
    }

    if (RovvaAuth.isLoggedIn()) {
      var user = RovvaAuth.getUser();
      if (user) {
        document.querySelectorAll('div, span').forEach(function (el) {
          if (exactText(el) === 'Minh' || exactText(el) === 'Lại Gia Hân') {
            var parent = el.closest('.c-36, .c-37, .c-38, .c-39, .c-40');
            if (parent || el.parentElement) {
              makeClickable(el.parentElement, function () {
                navigate('TaiKhoan_ThongTinCaNhan.html');
              });
            }
          }
        });
      }
    }
  }

  /* ── Personalize logged-in pages ── */
  function personalizePages() {
    if (!RovvaAuth.isLoggedIn()) return;
    var user = RovvaAuth.getUser();
    if (!user) return;

    if (window.location.pathname.includes('TrangChu_DaDangNhap')) {
      findAllByExactText('Chào mừng trở lại, Minh!').forEach(function (el) {
        el.textContent = 'Chào mừng trở lại, ' + user.name + '!';
      });
    }
  }

  /* ── Icon replacement logic using Lucide ── */
  function initIcons() {
    if (typeof lucide === 'undefined') {
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = function () {
        applyIcons();
      };
      document.head.appendChild(script);
    } else {
      applyIcons();
    }

    function applyIcons() {
      var candidates = document.querySelectorAll('div, span');
      candidates.forEach(function (el) {
        if (el.textContent.trim() !== '' || el.querySelectorAll('img, input, button, a').length > 0) return;
        
        var hasClassPattern = false;
        el.classList.forEach(function(cls) {
          if (/^c-\d+$/.test(cls)) hasClassPattern = true;
        });
        if (!hasClassPattern) return;

        var rect = el.getBoundingClientRect();
        var w = rect.width || el.offsetWidth;
        var h = rect.height || el.offsetHeight;
        
        var style = window.getComputedStyle(el);
        var styleW = parseFloat(style.width);
        var styleH = parseFloat(style.height);
        
        var width = w || styleW || 0;
        var height = h || styleH || 0;

        if (width < 5 || width > 45 || height < 4 || height > 45) return;
        if (width <= 2 && height <= 2) return;

        var iconName = determineIcon(el, width, height);
        if (!iconName) return;

        var bg = style.backgroundColor;
        var color = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' ? bg : '#0058BE';

        el.classList.add('rovva-icon-svg');
        el.style.backgroundColor = 'transparent';
        el.style.backgroundImage = 'none';
        el.style.borderColor = 'transparent';
        el.style.color = color;
        
        if (iconName === 'star' || iconName === 'heart') {
          if (iconName === 'star' || el.closest('.c-46') === null) {
            el.classList.add('fill-svg');
          }
        }

        el.setAttribute('data-lucide', iconName);
      });

      lucide.createIcons();
    }

    function determineIcon(el, w, h) {
      if (el.classList.contains('c-73')) return 'chevron-left';
      if (el.classList.contains('c-74')) return 'chevron-right';

      var parent = el.parentElement;
      var grand = parent ? parent.parentElement : null;
      var contextText = '';
      
      if (parent) contextText += parent.textContent + ' ';
      if (grand) contextText += grand.textContent + ' ';
      
      if (el.nextSibling) contextText += el.nextSibling.textContent + ' ';
      if (el.previousSibling) contextText += el.previousSibling.textContent + ' ';
      
      contextText = contextText.toLowerCase();

      if (contextText.indexOf('địa điểm') !== -1 || contextText.indexOf('đi đâu') !== -1 || contextText.indexOf('vị trí') !== -1) {
        return 'map-pin';
      }
      if (contextText.indexOf('ngày') !== -1 || contextText.indexOf('check-in') !== -1 || contextText.indexOf('check-out') !== -1) {
        return 'calendar';
      }
      if (contextText.indexOf('số người') !== -1 || contextText.indexOf('thêm khách') !== -1 || contextText.indexOf('khách hàng') !== -1) {
        return 'users';
      }
      if (contextText.indexOf('họ và tên') !== -1 || contextText.indexOf('chủ tài khoản') !== -1) {
        return 'user';
      }
      if (contextText.indexOf('tìm kiếm') !== -1) {
        return 'search';
      }
      if (/\b[4-5]\.[0-9]\b/.test(contextText) || contextText.indexOf('đánh giá') !== -1) {
        return 'star';
      }
      if (el.closest('.c-46') || el.closest('.c-81') || contextText.indexOf('yêu thích') !== -1) {
        return 'heart';
      }

      if (contextText.indexOf('wi-fi') !== -1 || contextText.indexOf('wifi') !== -1) return 'wifi';
      if (contextText.indexOf('pool') !== -1 || contextText.indexOf('hồ bơi') !== -1) return 'waves';
      if (contextText.indexOf('gym') !== -1 || contextText.indexOf('phòng tập') !== -1) return 'dumbbell';
      if (contextText.indexOf('balcony') !== -1 || contextText.indexOf('ban công') !== -1) return 'door-open';
      if (contextText.indexOf('breakfast') !== -1 || contextText.indexOf('bữa sáng') !== -1) return 'coffee';
      if (contextText.indexOf('ac') !== -1 || contextText.indexOf('điều hòa') !== -1) return 'wind';
      if (contextText.indexOf('kitchen') !== -1 || contextText.indexOf('bếp') !== -1) return 'utensils';

      if (contextText.indexOf('báo cháy') !== -1 || contextText.indexOf('khói') !== -1) return 'flame';
      if (contextText.indexOf('bình chữa cháy') !== -1) return 'shield-alert';
      if (contextText.indexOf('vệ sinh') !== -1) return 'sparkles';
      if (contextText.indexOf('camera') !== -1) return 'video';
      if (contextText.indexOf('không hút thuốc') !== -1) return 'ban';
      if (contextText.indexOf('không tổ chức') !== -1) return 'party-popper';

      if (contextText.indexOf('tài khoản') !== -1) return 'user';
      if (contextText.indexOf('chuyến đi') !== -1) return 'briefcase';
      if (contextText.indexOf('ví xu') !== -1) return 'coins';
      if (contextText.indexOf('hạng thành viên') !== -1) return 'award';
      if (contextText.indexOf('bảo mật') !== -1) return 'shield';
      if (contextText.indexOf('đăng xuất') !== -1) return 'log-out';

      if (contextText.indexOf('hotline') !== -1) return 'phone';
      if (contextText.indexOf('email') !== -1) return 'mail';
      if (contextText.indexOf('liên hệ') !== -1) return 'map-pin';

      if (w > 12 && h < 6) return 'chevron-down';

      if (contextText.indexOf('thông tin khách hàng') !== -1) return 'user';
      if (contextText.indexOf('ghi chú') !== -1) return 'file-text';
      if (contextText.indexOf('dịch vụ') !== -1) return 'bell';
      if (contextText.indexOf('thanh toán') !== -1) return 'credit-card';

      if (Math.abs(w - h) < 5) {
        return 'help-circle';
      }
      return null;
    }
  }

  /* ── Pre-fill checkout fields ── */
  function initCheckoutPage() {
    if (!window.location.pathname.includes('DatPhong_ThanhToan_TrangThai1')) return;
    
    var containers = document.querySelectorAll('.c-43');
    if (containers.length >= 3) {
      var user = RovvaAuth.getUser();
      
      var nameVal = user ? user.name : 'Nguyễn Văn A';
      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'rovva-input';
      nameInput.value = nameVal;
      containers[0].innerHTML = '';
      containers[0].appendChild(nameInput);
      
      var emailVal = user ? user.email : 'example@gmail.com';
      var emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.className = 'rovva-input';
      emailInput.value = emailVal;
      containers[1].innerHTML = '';
      containers[1].appendChild(emailInput);
      
      var phoneVal = user ? '0912345678' : '+84 123 456 789';
      var phoneInput = document.createElement('input');
      phoneInput.type = 'tel';
      phoneInput.className = 'rovva-input';
      phoneInput.value = phoneVal;
      containers[2].innerHTML = '';
      containers[2].appendChild(phoneInput);
    }
  }

  /* ── Card clicks wiring ── */
  function initCardClicks() {
    var listingTitles = [
      'Ocean View Luxury Suite',
      'Urban Chic Loft',
      'Forest Retreat Cabin',
      'The Grand Boutique Hotel',
      'Pullman Vũng Tàu',
      "Căn hộ THE SONG VŨNG TÀU - TRINH'S  HOUSE"
    ];

    function getListingDestination(name) {
      var n = name.toLowerCase();
      if (n.includes('suite') || n.includes('hotel') || n.includes('boutique') || n.includes('khách sạn') || n.includes('resort') || n.includes('pullman')) {
        return 'ChiTietCoSoLuuTru_Hotel.html';
      }
      if (n.includes('loft') || n.includes('cabin') || n.includes('căn hộ') || n.includes('apartment') || n.includes('homestay') || n.includes('house') || n.includes('retreat')) {
        return 'ChiTietCoSoLuuTru_CanHo.html';
      }
      return 'ChiTietCoSoLuuTru_Hotel.html';
    }

    listingTitles.forEach(function (title) {
      findAllByExactText(title).forEach(function (titleEl) {
        var dest = getListingDestination(title);
        makeClickable(titleEl, function () { navigate(dest); });
        
        var parentCard = titleEl.closest('.c-43, .c-79, .c-141, .c-166, .c-42') || titleEl.parentElement.parentElement.parentElement;
        if (parentCard) {
          var img = parentCard.querySelector('img');
          if (img) {
            makeClickable(img, function () { navigate(dest); });
          }
        }
      });
    });

    if (window.location.pathname.includes('TongLuuTru')) {
      document.querySelectorAll('.c-145').forEach(function (titleEl) {
        var text = exactText(titleEl);
        if (!text) return;
        var dest = getListingDestination(text);
        makeClickable(titleEl, function () { navigate(dest); });
        
        var parentCard = titleEl.closest('.c-141') || titleEl.closest('.c-166') || titleEl.parentElement.parentElement.parentElement;
        if (parentCard) {
          var img = parentCard.querySelector('img');
          if (img) {
            makeClickable(img, function () { navigate(dest); });
          }
        }
      });
    }
  }

  /* ── Interactive Payment features ── */
  function initPaymentPage() {
    if (!window.location.pathname.includes('TrangThai2')) return;

    var timerEl = null;
    document.querySelectorAll('div, span').forEach(function (el) {
      if (exactText(el).indexOf('Vui lòng thanh toán trong:') !== -1) {
        timerEl = el;
      }
    });

    if (timerEl) {
      var secondsLeft = 15 * 60;
      var interval = setInterval(function () {
        if (secondsLeft <= 0) {
          clearInterval(interval);
          timerEl.innerHTML = 'Giao dịch đã hết hạn!<br/>Vui lòng đặt phòng lại.';
          timerEl.style.color = '#ef4444';
          return;
        }
        secondsLeft--;
        var mins = Math.floor(secondsLeft / 60);
        var secs = secondsLeft % 60;
        var formattedMins = mins < 10 ? '0' + mins : mins;
        var formattedSecs = secs < 10 ? '0' + secs : secs;
        timerEl.innerHTML = 'Vui lòng thanh toán trong:<br/>' + formattedMins + ':' + formattedSecs;
      }, 1000);
    }

    document.querySelectorAll('div, span').forEach(function (el) {
      var text = exactText(el);
      if (text === 'Copy') {
        makeClickable(el, function () {
          var parentRow = el.closest('.c-83, .c-91, .c-98, .c-105, .c-80, .c-90, .c-95') || el.parentElement;
          var valueToCopy = '';
          if (parentRow) {
            var texts = [];
            parentRow.querySelectorAll('div, span').forEach(function (child) {
              var childText = exactText(child);
              if (childText && childText !== 'Copy' && childText.indexOf('Sao chép') === -1) {
                texts.push(childText);
              }
            });
            valueToCopy = texts.join(' ');
          }
          if (!valueToCopy) {
            valueToCopy = parentRow ? parentRow.textContent.replace('Copy', '').trim() : '';
          }
          
          if (valueToCopy) {
            navigator.clipboard.writeText(valueToCopy).then(function () {
              showToast('Đã sao chép: ' + valueToCopy);
            }).catch(function () {
              var tempInput = document.createElement('input');
              tempInput.value = valueToCopy;
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand('copy');
              tempInput.remove();
              showToast('Đã sao chép: ' + valueToCopy);
            });
          }
        });
      }
    });

    document.querySelectorAll('div, span').forEach(function (el) {
      if (exactText(el) === 'Tôi đã chuyển khoản') {
        var container = el.closest('.c-55') || el.parentElement;
        makeClickable(container || el, function () {
          showModal(RovvaAuth.resolvePath('components/popup_dangxacnhanthanhtoan.html'));
        });
      }
    });
  }

  /* ── Modal overlay helper ── */
  function showModal(url) {
    var modal = document.querySelector('.rovva-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.className = 'rovva-modal';
    
    var container = document.createElement('div');
    container.className = 'rovva-modal-container';
    
    var closeBtn = document.createElement('button');
    closeBtn.className = 'rovva-modal-close-btn';
    closeBtn.innerHTML = '&times;';
    
    function closeModal() {
      modal.style.opacity = '0';
      container.style.transform = 'scale(0.9)';
      setTimeout(function() { modal.remove(); }, 300);
    }
    
    closeBtn.onclick = closeModal;
    modal.onclick = function(e) {
      if (e.target === modal) closeModal();
    };

    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = 'width:100%;height:100%;border:none;';
    
    container.appendChild(closeBtn);
    container.appendChild(iframe);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    setTimeout(function() {
      modal.style.opacity = '1';
      container.style.transform = 'scale(1)';
    }, 10);
  }

  function closeModal() {
    var modal = document.querySelector('.rovva-modal');
    if (modal) {
      var container = modal.querySelector('.rovva-modal-container');
      modal.style.opacity = '0';
      if (container) container.style.transform = 'scale(0.9)';
      setTimeout(function() { modal.remove(); }, 300);
    }
  }

  /* ── Dropdown overlay helper ── */
  function showDropdown(avatarEl, url) {
    var dropdown = document.querySelector('.rovva-dropdown-overlay');
    if (dropdown) {
      dropdown.remove();
      return;
    }

    var rect = avatarEl.getBoundingClientRect();
    
    dropdown = document.createElement('div');
    dropdown.className = 'rovva-dropdown-overlay';
    dropdown.style.top = (rect.bottom + window.scrollY + 8) + 'px';
    dropdown.style.right = (window.innerWidth - (rect.right + window.scrollX)) + 'px';
    
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = 'width:100%;height:100%;border:none;';
    dropdown.appendChild(iframe);
    
    document.body.appendChild(dropdown);
    
    setTimeout(function() {
      dropdown.style.opacity = '1';
      dropdown.style.transform = 'translateY(0)';
    }, 10);
    
    function closeDropdown(e) {
      if (!dropdown.contains(e.target) && !avatarEl.contains(e.target)) {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(function() { dropdown.remove(); }, 250);
        document.removeEventListener('click', closeDropdown);
      }
    }
    
    setTimeout(function() {
      document.addEventListener('click', closeDropdown);
    }, 50);
  }

  /* ── Iframe popup action mappings ── */
  function initPopupActions() {
    var path = window.location.pathname;
    
    if (path.includes('popup_xacnhandangxuat')) {
      var logoutBtn = findAllByExactText('Đăng xuất');
      if (logoutBtn.length === 0) logoutBtn = findAllByExactText('Đăng xuất ');
      
      logoutBtn.forEach(function (btn) {
        var container = btn.closest('.c-12') || btn.parentElement;
        makeClickable(container || btn, function () {
          if (window.parent && window.parent.RovvaAuth) {
            window.parent.RovvaAuth.logout();
            window.parent.showModal(window.parent.RovvaAuth.resolvePath('components/popup_dadangxuat.html'));
            setTimeout(function () {
              window.parent.location.href = window.parent.RovvaAuth.resolvePath('TrangKhach.html');
            }, 1500);
          } else {
            RovvaAuth.logout();
            navigate('TrangKhach.html');
          }
        });
      });

      findAllByExactText('Hủy').forEach(function (btn) {
        var container = btn.closest('.c-14') || btn.parentElement;
        makeClickable(container || btn, function () {
          if (window.parent && window.parent.closeModal) {
            window.parent.closeModal();
          }
        });
      });
    }

    if (path.includes('popup_dangxacnhanthanhtoan')) {
      setTimeout(function () {
        if (window.parent) {
          window.parent.location.href = window.parent.RovvaAuth.resolvePath('DatPhong_ThanhToan_TrangThai3.html');
        }
      }, 3000);
    }

    if (path.includes('popup_xemchitietphong')) {
      findAllByExactText('Đặt phòng ngay').forEach(function (btn) {
        var container = btn.closest('.c-70') || btn.parentElement;
        makeClickable(container || btn, function () {
          if (window.parent) {
            window.parent.location.href = window.parent.RovvaAuth.resolvePath('DatPhong_ThanhToan_TrangThai1.html');
          }
        });
      });
      
      var xBtn = document.querySelector('.c-7, .c-6');
      if (xBtn) {
        makeClickable(xBtn, function () {
          if (window.parent && window.parent.closeModal) {
            window.parent.closeModal();
          }
        });
      }
    }

    if (path.includes('popup_thongtincanhan')) {
      function parentToast(msg) {
        if (window.parent && window.parent.showToast) {
          window.parent.showToast(msg);
        } else {
          showToast(msg);
        }
      }
      
      var user = RovvaAuth.getUser();
      if (user) {
        var nameEl = document.querySelector('.c-4');
        if (nameEl) nameEl.textContent = user.name;
        var tierEl = document.querySelector('.c-9');
        if (tierEl) tierEl.textContent = user.name === 'Minh' ? 'THÀNH VIÊN BẠC' : 'THÀNH VIÊN VÀNG';
      }

      findAllByExactText('Tài khoản').forEach(function (btn) {
        makeClickable(btn, function () {
          if (window.parent) {
            window.parent.location.href = window.parent.RovvaAuth.resolvePath('TaiKhoan_ThongTinCaNhan.html');
          }
        });
      });

      findAllByExactText('Chuyến đi của tôi').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Bạn chưa có chuyến đi nào sắp diễn ra.');
        });
      });

      findAllByExactText('Ví xu').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Ví xu hiện tại của bạn: 150 xu');
        });
      });

      findAllByExactText('Hạng thành viên').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Hạng thành viên: VÀNG (Ưu đãi 10%)');
        });
      });

      findAllByExactText('Danh sách yêu thích').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Danh sách yêu thích trống.');
        });
      });

      findAllByExactText('Đánh giá của tôi').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Bạn chưa thực hiện đánh giá nào.');
        });
      });

      findAllByExactText('Bảo mật và Tài Khoản').forEach(function (btn) {
        makeClickable(btn, function () {
          parentToast('Tính năng bảo mật tài khoản đang được nâng cấp.');
        });
      });

      findAllByExactText('Đăng xuất').forEach(function (btn) {
        makeClickable(btn.closest('.c-36') || btn, function () {
          if (window.parent && window.parent.RovvaAuth) {
            window.parent.RovvaAuth.logout();
            window.parent.showModal(window.parent.RovvaAuth.resolvePath('components/popup_dadangxuat.html'));
            setTimeout(function () {
              window.parent.location.href = window.parent.RovvaAuth.resolvePath('TrangKhach.html');
            }, 1500);
          } else {
            RovvaAuth.logout();
            navigate('TrangKhach.html');
          }
        });
      });
    }
  }

  /* ── Header auth state sync ── */
  function syncHeaderState() {
    var loggedIn = RovvaAuth.isLoggedIn();
    var user = RovvaAuth.getUser();

    if (loggedIn && user) {
      var loginBtn = null;
      var registerBtn = null;
      
      document.querySelectorAll('div, span').forEach(function (el) {
        var txt = exactText(el);
        if (txt === 'Đăng nhập') {
          if (el.closest('.c-2, .c-6, .c-170, .c-190') || el.parentElement.classList.contains('c-18') || el.parentElement.classList.contains('c-192') || el.parentElement.classList.contains('c-14')) {
            loginBtn = el.closest('.c-18, .c-192, .c-14') || el;
          }
        }
        if (txt === 'Đăng ký') {
          if (el.closest('.c-2, .c-6, .c-170, .c-190') || el.parentElement.classList.contains('c-19') || el.parentElement.classList.contains('c-193') || el.parentElement.classList.contains('c-15')) {
            registerBtn = el.closest('.c-19, .c-193, .c-15') || el;
          }
        }
      });

      if (loginBtn || registerBtn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        var header = document.querySelector('.c-2, .c-6, .c-170, .c-190');
        if (header && !document.querySelector('.rovva-header-avatar')) {
          var avatarContainer = document.createElement('div');
          avatarContainer.className = 'rovva-header-avatar';
          
          avatarContainer.style.cssText = 'position:absolute;right:80px;top:22px;height:40px;display:flex;align-items:center;gap:10px;cursor:pointer;z-index:999;';
          
          var nameSpan = document.createElement('span');
          nameSpan.textContent = user.name;
          nameSpan.style.cssText = 'color:#0F294D;font-weight:600;font-size:16px;';
          
          var avatarImg = document.createElement('img');
          avatarImg.src = RovvaAuth.resolvePath('../Pictures/Hinh_avata.jpg');
          avatarImg.style.cssText = 'width:40px;height:40px;border-radius:50%;object-fit:cover;box-shadow:0 2px 6px rgba(0,88,190,0.2);';
          
          avatarContainer.appendChild(nameSpan);
          avatarContainer.appendChild(avatarImg);
          header.appendChild(avatarContainer);

          makeClickable(avatarContainer, function () {
            showDropdown(avatarContainer, RovvaAuth.resolvePath('components/popup_thongtincanhan.html'));
          });
        }
      }
      
      var existingAvatar = document.querySelector('.c-197, .c-198');
      if (existingAvatar) {
        makeClickable(existingAvatar, function () {
          showDropdown(existingAvatar, RovvaAuth.resolvePath('components/popup_thongtincanhan.html'));
        });
      }
    }
  }

  // Expose helpers globally
  window.showModal = showModal;
  window.closeModal = closeModal;
  window.showDropdown = showDropdown;
  window.showToast = showToast;
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.location.pathname.includes('DangNhap')) {
      document.querySelectorAll('.rovva-demo-hint').forEach(function (el) { el.remove(); });
    }
    initAuthGuards();
    initResponsive();
    initLoginPage();
    initRegisterPage();
    initNavigation();
    personalizePages();
    initIcons();
    initCheckoutPage();
    initCardClicks();
    initPaymentPage();
    initPopupActions();
    syncHeaderState();
  });
})();
