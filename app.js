/**
 * Tina Soft Permission Hub - Main Application Logic (app.js)
 * Tối ưu hóa hiệu năng cao: Event Delegation, Search Debounce, Safe Storage, Zero Regression.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 0. Utilities & Safe Storage Helper
  // ==========================================================================
  const SafeStorage = {
    get(key, fallback = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn(`SafeStorage.get error for [${key}]:`, e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`SafeStorage.set error for [${key}]:`, e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`SafeStorage.remove error for [${key}]:`, e);
      }
    }
  };

  const debounce = (fn, delay = 100) => {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // ==========================================================================
  // 1. Cached DOM Elements
  // ==========================================================================
  const DOM = {
    themeToggleBtn: document.getElementById('btn-theme-toggle'),
    securityBadge: document.getElementById('security-status-badge'),
    loginScreen: document.getElementById('login-screen'),
    mainAppScreen: document.getElementById('main-app-screen'),
    formLogin: document.getElementById('form-login'),
    loginDept: document.getElementById('login-dept'),
    loginPosition: document.getElementById('login-position'),
    loginTitle: document.getElementById('login-title'),
    loginEvaluator: document.getElementById('login-evaluator'),
    loginErrorAlert: document.getElementById('login-error-alert'),
    comboHeader: document.getElementById('header-combo-info'),
    activeText: document.getElementById('active-combo-text'),
    btnLogout: document.getElementById('btn-logout'),
    saveBtnContainer: document.getElementById('tab-eval-save-container'),
    btnSaveEval: document.getElementById('btn-save-evaluation'),
    btnSaveInline: document.getElementById('btn-save-inline'),
    treeTableBody: document.getElementById('tree-table-body'),
    searchTreeKeyword: document.getElementById('search-tree-keyword'),
    summaryTableHead: document.getElementById('summary-table-head'),
    summaryTableBody: document.getElementById('summary-table-body'),
    filterSummaryCombo: document.getElementById('filter-summary-combo'),
    unevaluatedDeptsBox: document.getElementById('unevaluated-depts-box'),
    tabSummaryTitle: document.getElementById('tab-summary-title'),
    historyTableBody: document.getElementById('history-table-body'),
    historyCountBadge: document.getElementById('history-count-badge'),
    inputSecurityPassword: document.getElementById('input-security-password'),
    passwordErrorMsg: document.getElementById('password-error-msg'),
    summaryLockedPanel: document.getElementById('summary-locked-panel'),
    summaryUnlockedPanel: document.getElementById('summary-unlocked-panel'),
    historyLockedPanel: document.getElementById('history-locked-panel'),
    historyUnlockedPanel: document.getElementById('history-unlocked-panel')
  };

  // ==========================================================================
  // 2. Application State
  // ==========================================================================
  const appState = {
    theme: localStorage.getItem('tina_theme') || 'dark',
    isLoggedIn: false,
    currentDept: '',
    currentPos: '',
    currentTitle: '',
    currentEvaluator: '',
    activeTab: 'tab-eval',
    isUnlocked: false,
    pendingTab: null,
    currentSessionEvalId: null,
    evaluations: TinaDataStore.getEvaluations(),
    currentPerms: {}, // { item_id: { xem: bool, nhap: bool, xuat: bool } }
    collapsedFolders: new Set(),
    treeKeyword: ''
  };

  function updateThemeIcon() {
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.innerHTML = appState.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  }

  // Khởi tạo giao diện theme
  document.documentElement.setAttribute('data-theme', appState.theme);
  updateThemeIcon();

  // Theme toggle listener
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener('click', () => {
      appState.theme = appState.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', appState.theme);
      localStorage.setItem('tina_theme', appState.theme);
      updateThemeIcon();
      ToastManager.show('Đã chuyển sang giao diện ' + (appState.theme === 'dark' ? 'Dark Mode' : 'Light Mode'), 'info');
    });
  }

  // ==========================================================================
  // 3. Dropdowns Đăng Nhập & Phiên Làm Việc
  // ==========================================================================
  function initLoginDropdowns() {
    const { loginDept, loginPosition, loginTitle } = DOM;
    if (!loginDept || !loginPosition || !loginTitle) return;

    // 1. Nạp danh sách Khoa phòng - Bộ phận
    loginDept.innerHTML = '<option value="">-- Chọn Khoa phòng - Bộ phận --</option>' +
      KHOA_PHONG_LIST.map(d => `<option value="${d}">${d}</option>`).join('');

    function updatePositions(selectedDept) {
      if (selectedDept && KHOA_PHONG_HIERARCHY[selectedDept]) {
        const availableTitles = Object.keys(KHOA_PHONG_HIERARCHY[selectedDept]);
        loginPosition.innerHTML = '<option value="">-- Chọn Chức danh --</option>' +
          availableTitles.map(p => `<option value="${p}">${p}</option>`).join('');
      } else {
        loginPosition.innerHTML = '<option value="">-- Chọn Chức danh --</option>' +
          CHUC_DANH_LIST.map(p => `<option value="${p}">${p}</option>`).join('');
      }
      updateTitles(selectedDept, loginPosition.value);
    }

    function updateTitles(selectedDept, selectedPos) {
      if (selectedDept && selectedPos && KHOA_PHONG_HIERARCHY[selectedDept] && KHOA_PHONG_HIERARCHY[selectedDept][selectedPos]) {
        const availableTitles = KHOA_PHONG_HIERARCHY[selectedDept][selectedPos];
        loginTitle.innerHTML = '<option value="">-- Chọn Vị trí --</option>' +
          availableTitles.map(t => `<option value="${t}">${t}</option>`).join('');
        if (availableTitles.length === 1) {
          loginTitle.value = availableTitles[0];
        }
      } else {
        loginTitle.innerHTML = '<option value="">-- Chọn Vị trí --</option>' +
          VI_TRI_LIST.map(t => `<option value="${t}">${t}</option>`).join('');
      }
    }

    updatePositions('');

    loginDept.onchange = () => {
      updatePositions(loginDept.value);
    };

    loginPosition.onchange = () => {
      updateTitles(loginDept.value, loginPosition.value);
    };
  }

  // Đảm bảo xoá mọi session/draft cũ để mỗi lần truy cập link luôn ở giao diện login mặc định
  SafeStorage.remove('tina_auth_session');
  SafeStorage.remove('tina_login_draft');

  // Khởi tạo Login & Giao diện ban đầu
  initLoginDropdowns();
  initTabs();
  refreshAllData();

  // Xử lý Form Đăng Nhập
  if (DOM.formLogin) {
    DOM.formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const dept = DOM.loginDept.value;
      const pos = DOM.loginPosition.value;
      const title = DOM.loginTitle.value;
      const evaluator = DOM.loginEvaluator.value.trim();

      if (!dept || !pos || !title || !evaluator) {
        if (DOM.loginErrorAlert) DOM.loginErrorAlert.style.display = 'flex';
        return;
      }

      // Mỗi lần đăng nhập là một đợt đánh giá mới của người dùng:
      // - Cột "Chức năng yêu cầu" (bên trái) luôn reset trống trơn để người này tự do tích chọn
      // - Cột "Chức năng đã yêu cầu" (bên phải) sẽ tự động hiển thị tổng hợp (OR) các quyền đã tích của tất cả các đợt trước đó
      appState.currentSessionEvalId = null;
      appState.currentPerms = {};

      appState.isLoggedIn = true;
      appState.currentDept = dept;
      appState.currentPos = pos;
      appState.currentTitle = title;
      appState.currentEvaluator = evaluator;

      if (DOM.loginScreen) DOM.loginScreen.style.display = 'none';
      if (DOM.mainAppScreen) DOM.mainAppScreen.style.display = 'block';

      if (DOM.activeText) {
        DOM.activeText.textContent = `[${dept}] - [${pos}] - [${title}]`;
      }
      if (DOM.comboHeader) DOM.comboHeader.style.display = 'inline-flex';

      switchTab('tab-eval');
      renderTreeTable();

      ToastManager.show(`Đăng nhập thành công tổ hợp [${dept}] - [${pos}] - [${title}]`, 'success', 'Đăng Nhập Thành Công');
    });
  }

  // Nút Đăng Xuất
  DOM.btnLogout?.addEventListener('click', () => {
    appState.isLoggedIn = false;
    appState.currentDept = '';
    appState.currentPos = '';
    appState.currentTitle = '';
    appState.currentEvaluator = '';
    appState.currentSessionEvalId = null;
    appState.currentPerms = {};

    switchTab('tab-eval');
    SafeStorage.remove('tina_auth_session');
    SafeStorage.remove('tina_login_draft');

    if (DOM.formLogin) DOM.formLogin.reset();
    if (DOM.loginDept) DOM.loginDept.value = '';
    if (DOM.loginPosition) DOM.loginPosition.value = '';
    if (DOM.loginTitle) DOM.loginTitle.value = '';
    if (DOM.loginEvaluator) DOM.loginEvaluator.value = '';
    if (DOM.loginErrorAlert) DOM.loginErrorAlert.style.display = 'none';

    if (DOM.mainAppScreen) DOM.mainAppScreen.style.display = 'none';
    if (DOM.loginScreen) DOM.loginScreen.style.display = 'flex';
    if (DOM.comboHeader) DOM.comboHeader.style.display = 'none';

    renderTreeTable();
    updateEvalCountBadge();

    ToastManager.show('Đã thoát khỏi tổ hợp làm việc', 'info');
  });

  // ==========================================================================
  // 4. Navigation Tabs & Mật Khẩu
  // ==========================================================================
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        if (!targetTab) return;

        if ((targetTab === 'tab-summary' || targetTab === 'tab-history') && !appState.isUnlocked) {
          appState.pendingTab = targetTab;
          if (DOM.inputSecurityPassword) DOM.inputSecurityPassword.value = '';
          ModalManager.open('modal-password');
          return;
        }

        switchTab(targetTab);
      });
    });
  }

  function updateEvalCountBadge() {
    let count = 0;
    Object.values(appState.currentPerms).forEach(p => {
      if (p && (p.xem || p.nhap || p.xuat)) count++;
    });
    if (DOM.btnSaveEval) {
      DOM.btnSaveEval.innerHTML = count > 0 
        ? `<i class="fas fa-save"></i> LƯU (${count})` 
        : `<i class="fas fa-save"></i> LƯU`;
    }
    if (DOM.btnSaveInline) {
      DOM.btnSaveInline.innerHTML = count > 0 
        ? `<i class="fas fa-save"></i> <span>LƯU (${count})</span>` 
        : `<i class="fas fa-save"></i> <span>LƯU</span>`;
    }
  }

  function switchTab(targetTab) {
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    const btn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
    const content = document.getElementById(targetTab);

    if (btn) btn.classList.add('active');
    if (content) content.classList.add('active');
    appState.activeTab = targetTab;

    // Nút LƯU Desktop Toolbar (Chỉ hiển thị ở Tab Đánh giá khi đã đăng nhập)
    const isEvalTab = (targetTab === 'tab-eval' && appState.isLoggedIn);
    if (DOM.saveBtnContainer) {
      DOM.saveBtnContainer.style.display = isEvalTab ? 'flex' : 'none';
    }

    if (targetTab === 'tab-summary' && appState.isUnlocked) {
      renderAggregatedSummaryTable();
    } else if (targetTab === 'tab-history' && appState.isUnlocked) {
      renderHistoryTable();
    }
  }

  // Khóa Mật Khẩu Prompt Listeners
  document.getElementById('btn-prompt-password')?.addEventListener('click', () => {
    appState.pendingTab = 'tab-summary';
    if (DOM.inputSecurityPassword) DOM.inputSecurityPassword.value = '';
    ModalManager.open('modal-password');
  });

  document.getElementById('btn-prompt-password-history')?.addEventListener('click', () => {
    appState.pendingTab = 'tab-history';
    if (DOM.inputSecurityPassword) DOM.inputSecurityPassword.value = '';
    ModalManager.open('modal-password');
  });

  function verifyPassword() {
    const input = DOM.inputSecurityPassword;
    const errMsg = DOM.passwordErrorMsg;
    if (!input) return;

    if (input.value.trim() === SECURITY_PASSWORD) {
      appState.isUnlocked = true;
      ModalManager.close('modal-password');
      input.value = '';
      if (errMsg) errMsg.style.display = 'none';

      if (DOM.summaryLockedPanel) DOM.summaryLockedPanel.style.display = 'none';
      if (DOM.summaryUnlockedPanel) DOM.summaryUnlockedPanel.style.display = 'block';

      if (DOM.historyLockedPanel) DOM.historyLockedPanel.style.display = 'none';
      if (DOM.historyUnlockedPanel) DOM.historyUnlockedPanel.style.display = 'block';

      if (DOM.securityBadge) {
        DOM.securityBadge.className = 'badge badge-approved';
        DOM.securityBadge.innerHTML = '<i class="fas fa-shield-check"></i> Đã Mở Khóa';
      }

      ToastManager.show('Xác thực quản trị thành công!', 'success', 'Bảo Mật');

      if (appState.pendingTab) {
        switchTab(appState.pendingTab);
        appState.pendingTab = null;
      }
    } else {
      if (errMsg) errMsg.style.display = 'block';
      input.focus();
      input.select();
    }
  }

  document.getElementById('btn-submit-password')?.addEventListener('click', verifyPassword);
  DOM.inputSecurityPassword?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verifyPassword();
  });

  function relockData() {
    appState.isUnlocked = false;
    if (DOM.summaryLockedPanel) DOM.summaryLockedPanel.style.display = 'block';
    if (DOM.summaryUnlockedPanel) DOM.summaryUnlockedPanel.style.display = 'none';

    if (DOM.historyLockedPanel) DOM.historyLockedPanel.style.display = 'block';
    if (DOM.historyUnlockedPanel) DOM.historyUnlockedPanel.style.display = 'none';

    if (DOM.securityBadge) {
      DOM.securityBadge.className = 'badge badge-rejected';
      DOM.securityBadge.innerHTML = '<i class="fas fa-shield-halved"></i> Khóa Bảo Mật';
    }

    switchTab('tab-eval');
    ToastManager.show('Đã khóa lại khu vực dữ liệu tổng hợp & lịch sử', 'info');
  }

  document.getElementById('btn-relock-data')?.addEventListener('click', relockData);
  document.querySelectorAll('.btn-relock-data-all').forEach(b => b.addEventListener('click', relockData));

  // ==========================================================================
  // 5. Render Cây Thư Mục Chức Năng (Tối Ưu Event Delegation & Mobile Card View)
  // ==========================================================================
  function renderTreeTable() {
    const tbody = DOM.treeTableBody;
    if (!tbody) return;

    const keyword = (appState.treeKeyword || '').toLowerCase().trim();
    const activeComboResults = TinaDataStore.getAggregatedResults();
    const currentComboAgg = activeComboResults.find(r => 
      r.department === appState.currentDept &&
      r.position === appState.currentPos &&
      r.title === appState.currentTitle
    );

    let html = '';
    const collapsedDepths = [];

    TREE_DATA.forEach(node => {
      while (collapsedDepths.length > 0 && collapsedDepths[collapsedDepths.length - 1] >= node.depth) {
        collapsedDepths.pop();
      }

      if (!keyword && collapsedDepths.length > 0) {
        return;
      }

      if (keyword && !node.name.toLowerCase().includes(keyword) && !node.stt.includes(keyword)) {
        return;
      }

      const p = appState.currentPerms[node.id] || { xem: false, nhap: false, xuat: false };
      const refP = (currentComboAgg && currentComboAgg.perms && currentComboAgg.perms[node.id]) ? currentComboAgg.perms[node.id] : { xem: false, nhap: false, xuat: false };

      if (node.isFolder) {
        const isCollapsed = appState.collapsedFolders.has(node.id);
        if (isCollapsed) {
          collapsedDepths.push(node.depth);
        }

        html += `
          <tr class="row-folder" data-id="${node.id}">
            <td class="td-stt" style="text-align: center; color: var(--text-muted); font-weight: 700;">${node.stt}</td>
            <td colspan="3" class="td-folder-content">
              <div class="folder-title-row" style="padding-left: ${node.depth * 20}px; display: flex; align-items: center; gap: 8px;">
                <button type="button" class="btn-toggle-folder" data-id="${node.id}" title="${isCollapsed ? 'Mở rộng thư mục' : 'Thu gọn thư mục'}">
                  <i class="fas fa-chevron-${isCollapsed ? 'right' : 'down'}"></i>
                </button>
                <i class="fas fa-folder${isCollapsed ? '' : '-open'} folder-icon" style="color: #f59e0b;"></i>
                <span class="folder-title-clickable" data-id="${node.id}" style="cursor: pointer; font-weight: 700; color: var(--text-main);">
                  ${node.name}
                </span>
              </div>
            </td>
          </tr>
        `;
      } else {
        let highlightClass = '';
        if (p.xuat) {
          highlightClass = 'item-highlight-xuat';
        } else if (p.nhap) {
          highlightClass = 'item-highlight-nhap';
        } else if (p.xem) {
          highlightClass = 'item-highlight-xem';
        }

        const hasRef = (refP.xem || refP.nhap || refP.xuat);

        html += `
          <tr class="row-item" data-id="${node.id}">
            <td class="td-stt" style="text-align: center; color: var(--text-muted); font-size: 12.5px;">${node.stt}</td>
            <td class="td-name">
              <div class="node-title-container" style="padding-left: ${node.depth * 20 + 24}px; display: flex; align-items: center; gap: 8px;">
                <span class="mobile-stt-badge">${node.stt}</span>
                <i class="fas fa-file-lines item-icon" style="color: var(--text-muted); font-size: 13px;"></i>
                <span class="node-title-text ${highlightClass}" style="font-size: 13px;">
                  ${node.name}
                </span>
              </div>
            </td>
            <td class="td-perm-interactive" style="text-align: center; border-left: 2px solid #2563eb;">
              <div class="mobile-perm-label"><i class="fas fa-hand-pointer"></i> Chọn quyền yêu cầu:</div>
              <div class="perm-pill-group">
                <button type="button" class="btn-perm-pill btn-perm-xem ${p.xem ? 'active' : ''}" data-id="${node.id}" data-action="xem" title="Đánh giá quyền Xem">
                  <i class="fas fa-eye pill-icon"></i> Xem
                </button>
                <button type="button" class="btn-perm-pill btn-perm-nhap ${p.nhap ? 'active' : ''}" data-id="${node.id}" data-action="nhap" title="Đánh giá quyền Nhập">
                  <i class="fas fa-pen-to-square pill-icon"></i> Nhập
                </button>
                <button type="button" class="btn-perm-pill btn-perm-xuat ${p.xuat ? 'active' : ''}" data-id="${node.id}" data-action="xuat" title="Đánh giá quyền Xuất báo cáo">
                  <i class="fas fa-file-export pill-icon"></i> Xuất báo cáo
                </button>
              </div>
            </td>
            <td class="td-perm-reference ${hasRef ? 'has-ref' : ''}" style="text-align: center; border-left: 2px solid #2563eb; border-right: 2px solid #2563eb;">
              <div class="mobile-ref-label"><i class="fas fa-clock-rotate-left"></i> Đã yêu cầu:</div>
              <div class="perm-pill-group ref-group">
                <span class="ref-perm-pill ref-perm-xem ${refP.xem ? 'active' : 'inactive'}" title="${refP.xem ? 'Tổ hợp này đã yêu cầu quyền Xem' : 'Chưa yêu cầu'}">Xem</span>
                <span class="ref-perm-pill ref-perm-nhap ${refP.nhap ? 'active' : 'inactive'}" title="${refP.nhap ? 'Tổ hợp này đã yêu cầu quyền Nhập' : 'Chưa yêu cầu'}">Nhập</span>
                <span class="ref-perm-pill ref-perm-xuat ${refP.xuat ? 'active' : 'inactive'}" title="${refP.xuat ? 'Tổ hợp này đã yêu cầu quyền Xuất báo cáo' : 'Chưa yêu cầu'}">Xuất báo cáo</span>
              </div>
            </td>
          </tr>
        `;
      }
    });

    tbody.innerHTML = html;
    updateEvalCountBadge();
  }

  // Khởi tạo Event Delegation duy nhất cho Tree Table (Tăng tốc độ & tối ưu bộ nhớ)
  if (DOM.treeTableBody) {
    DOM.treeTableBody.addEventListener('click', (e) => {
      // 1. Click Folder Toggle / Title
      const folderBtn = e.target.closest('.btn-toggle-folder, .folder-title-clickable');
      if (folderBtn) {
        const folderId = folderBtn.getAttribute('data-id');
        if (folderId) {
          if (appState.collapsedFolders.has(folderId)) {
            appState.collapsedFolders.delete(folderId);
          } else {
            appState.collapsedFolders.add(folderId);
          }
          renderTreeTable();
        }
        return;
      }

      // 2. Click Perm Pill (Xem / Nhập / Xuất)
      const pillBtn = e.target.closest('.btn-perm-pill');
      if (pillBtn) {
        e.stopPropagation();
        const id = pillBtn.getAttribute('data-id');
        const act = pillBtn.getAttribute('data-action');
        if (!id || !act) return;

        if (!appState.currentPerms[id]) {
          appState.currentPerms[id] = { xem: false, nhap: false, xuat: false };
        }

        const newVal = !appState.currentPerms[id][act];
        appState.currentPerms[id][act] = newVal;

        if (newVal) {
          pillBtn.classList.add('active');
        } else {
          pillBtn.classList.remove('active');
        }

        // Cập nhật đổi màu chữ trực tiếp cho dòng hiện tại theo thứ tự ưu tiên:
        const row = pillBtn.closest('tr');
        if (row) {
          const titleSpan = row.querySelector('.node-title-text');
          if (titleSpan) {
            titleSpan.classList.remove('item-highlight-xuat', 'item-highlight-nhap', 'item-highlight-xem');
            const permState = appState.currentPerms[id];
            if (permState && permState.xuat) {
              titleSpan.classList.add('item-highlight-xuat');
            } else if (permState && permState.nhap) {
              titleSpan.classList.add('item-highlight-nhap');
            } else if (permState && permState.xem) {
              titleSpan.classList.add('item-highlight-xem');
            }
          }
        }

        updateEvalCountBadge();
      }
    });
  }

  // Debounced search cho tree
  if (DOM.searchTreeKeyword) {
    DOM.searchTreeKeyword.addEventListener('input', debounce((e) => {
      appState.treeKeyword = e.target.value;
      renderTreeTable();
    }, 100));
  }

  document.getElementById('btn-expand-all')?.addEventListener('click', () => {
    appState.collapsedFolders.clear();
    renderTreeTable();
    ToastManager.show('Đã mở toàn bộ thư mục cây chức năng', 'info');
  });

  document.getElementById('btn-collapse-all')?.addEventListener('click', () => {
    TREE_DATA.forEach(n => {
      if (n.isFolder) appState.collapsedFolders.add(n.id);
    });
    renderTreeTable();
    ToastManager.show('Đã thu gọn toàn bộ thư mục', 'info');
  });

  document.getElementById('btn-clear-eval-perms')?.addEventListener('click', () => {
    appState.currentPerms = {};
    renderTreeTable();
    updateEvalCountBadge();
    ToastManager.show('Đã xoá toàn bộ tích chọn trên form', 'info');
  });

  // ==========================================================================
  // 6. Xử Lý Nút LƯU DỮ LIỆU ĐÁNH GIÁ (Desktop & Mobile)
  // ==========================================================================
  function handleSaveEvaluation() {
    if (!appState.isLoggedIn) {
      ToastManager.show('Vui lòng đăng nhập chọn tổ hợp trước khi Lưu!', 'warning');
      return;
    }

    let checkCount = 0;
    const permsValues = Object.values(appState.currentPerms);
    for (let i = 0; i < permsValues.length; i++) {
      const p = permsValues[i];
      if (p.xem || p.nhap || p.xuat) {
        checkCount++;
        break;
      }
    }

    if (checkCount === 0) {
      ToastManager.show('Vui lòng tích chọn ít nhất 1 quyền Xem/Nhập/Xuất trên cây chức năng trước khi Lưu!', 'warning', 'Chưa Chọn Quyền');
      return;
    }

    const isUpdate = !!appState.currentSessionEvalId;
    if (!appState.currentSessionEvalId) {
      const allEvals = TinaDataStore.getEvaluations() || [];
      let newId = '';
      do {
        newId = `EVAL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      } while (allEvals.some(e => e.id === newId));
      appState.currentSessionEvalId = newId;
    }

    const currentEvalId = appState.currentSessionEvalId;

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const localCreatedAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const newEval = {
      id: currentEvalId,
      department: appState.currentDept,
      position: appState.currentPos,
      title: appState.currentTitle,
      evaluator: appState.currentEvaluator,
      createdAt: localCreatedAt,
      perms: JSON.parse(JSON.stringify(appState.currentPerms))
    };

    TinaDataStore.saveOrUpdateEvaluation(newEval);
    refreshAllData();

    if (isUpdate) {
      ToastManager.show(`Đã cập nhật dữ liệu cho đợt đánh giá [${currentEvalId}]`, 'success', 'Cập Nhật Thành Công');
    } else {
      ToastManager.show(`Đã lưu thành công đợt đánh giá mới [${currentEvalId}] cho [${appState.currentDept} - ${appState.currentPos} - ${appState.currentTitle}]`, 'success', 'Lưu Thành Công');
    }

    renderTreeTable();
  }

  DOM.btnSaveEval?.addEventListener('click', handleSaveEvaluation);
  DOM.btnSaveInline?.addEventListener('click', handleSaveEvaluation);

  // ==========================================================================
  // 7. TAB 2: Render Dữ Liệu Tổng Hợp Matrix (Rule PQCN & Lọc Theo Khoa Phòng)
  // ==========================================================================
  function renderAggregatedSummaryTable() {
    const thead = DOM.summaryTableHead;
    const tbody = DOM.summaryTableBody;
    const selectDeptFilter = DOM.filterSummaryCombo;
    if (!thead || !tbody) return;

    const aggregated = TinaDataStore.getAggregatedResults();

    // Nạp danh sách các Khoa phòng có dữ liệu đánh giá
    if (selectDeptFilter) {
      const currentVal = selectDeptFilter.value;
      const deptCounts = {};
      aggregated.forEach(item => {
        const d = item.department || 'Khác';
        deptCounts[d] = (deptCounts[d] || 0) + 1;
      });

      const depts = Object.keys(deptCounts).sort();
      let filterHtml = `<option value="">-- Xem tất cả các Khoa phòng (${aggregated.length} tổ hợp) --</option>`;
      depts.forEach(d => {
        filterHtml += `<option value="${d}">Khoa phòng: [${d}] (${deptCounts[d]} tổ hợp)</option>`;
      });

      selectDeptFilter.innerHTML = filterHtml;
      if (currentVal && depts.includes(currentVal)) {
        selectDeptFilter.value = currentVal;
      }
    }

    const selectedDept = selectDeptFilter ? selectDeptFilter.value : '';
    const activeList = selectedDept ? aggregated.filter(item => item.department === selectedDept) : aggregated;

    if (activeList.length === 0) {
      thead.innerHTML = `
        <th class="sticky-col-stt" style="width: 50px;">STT</th>
        <th class="sticky-col-name" style="width: 320px;">DANH SÁCH CÁC CHỨC NĂNG TRÊN TINASOFT</th>
      `;
      tbody.innerHTML = `
        <tr>
          <td colspan="2" style="text-align: center; padding: 40px; color: var(--text-muted);">
            <i class="fas fa-folder-open" style="font-size: 32px; margin-bottom: 12px; display: block;"></i>
            ${selectedDept ? `Chưa có dữ liệu đánh giá nào cho Khoa phòng [${selectedDept}].` : 'Chưa có lượt đánh giá nào được ghi nhận.'}
          </td>
        </tr>
      `;
      return;
    }

    let headHtml = `
      <th class="sticky-col-stt" style="width: 50px; text-align: center;">STT</th>
      <th class="sticky-col-name" style="width: 320px; min-width: 320px;">DANH SÁCH CÁC CHỨC NĂNG TRÊN TINASOFT</th>
    `;

    activeList.forEach(item => {
      headHtml += `
        <th style="text-align: center; min-width: 200px; padding: 8px 10px; vertical-align: middle;">
          <div style="font-weight: 800; color: #2563eb; font-size: 13px;">[${item.department}]</div>
          <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin: 2px 0;">${item.position} • ${item.title}</div>
          <div style="font-size: 11px; color: var(--text-muted);">(${item.evalCount} lượt đánh giá)</div>
        </th>
      `;
    });
    thead.innerHTML = headHtml;

    let bodyHtml = '';
    const emptyRowDashes = activeList.map(() => `<td style="text-align: center; color: var(--border-color); font-size: 12px;">—</td>`).join('');

    TREE_DATA.forEach(node => {
      if (node.isFolder) {
        bodyHtml += `
          <tr class="row-folder" style="font-weight: 700; background: var(--bg-surface-elevated);">
            <td class="sticky-col-stt" style="text-align: center; color: var(--text-muted); font-size: 12.5px;">${node.stt}</td>
            <td class="sticky-col-name">
              <div style="padding-left: ${node.depth * 18}px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-folder-open folder-icon" style="color: #f59e0b;"></i>
                <span style="font-weight: 700; color: var(--text-main);">${node.name}</span>
              </div>
            </td>
            ${emptyRowDashes}
          </tr>
        `;
      } else {
        bodyHtml += `
          <tr class="row-item">
            <td class="sticky-col-stt" style="text-align: center; color: var(--text-muted); font-size: 12.5px;">${node.stt}</td>
            <td class="sticky-col-name">
              <div style="padding-left: ${node.depth * 18 + 16}px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-file-lines" style="color: var(--text-muted); font-size: 12px;"></i>
                <span style="font-size: 12.5px; color: var(--text-main);">${node.name}</span>
              </div>
            </td>
            ${activeList.map(item => {
              const p = (item.perms && item.perms[node.id]) ? item.perms[node.id] : { xem: false, nhap: false, xuat: false };
              return `
                <td style="text-align: center; padding: 4px 6px;">
                  <div style="display: inline-flex; gap: 4px;">
                    <span class="badge ${p.xem ? 'badge-approved' : ''}" style="opacity: ${p.xem ? '1' : '0.2'}; font-size: 10px; padding: 2px 6px;">Xem</span>
                    <span class="badge ${p.nhap ? 'badge-pending' : ''}" style="opacity: ${p.nhap ? '1' : '0.2'}; font-size: 10px; padding: 2px 6px;">Nhập</span>
                    <span class="badge ${p.xuat ? 'badge-rejected' : ''}" style="opacity: ${p.xuat ? '1' : '0.2'}; font-size: 10px; padding: 2px 6px;">Xuất báo cáo</span>
                  </div>
                </td>
              `;
            }).join('')}
          </tr>
        `;
      }
    });

    tbody.innerHTML = bodyHtml;
  }

  DOM.filterSummaryCombo?.addEventListener('change', renderAggregatedSummaryTable);

  // Drag to Scroll cho bảng Tổng Hợp Matrix
  function initSummaryDragToScroll() {
    const wrapper = document.querySelector('.summary-table-wrapper');
    if (!wrapper) return;

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;
    let hasMoved = false;

    wrapper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (['BUTTON', 'INPUT', 'SELECT', 'A', 'TEXTAREA'].includes(e.target.tagName)) return;

      isDown = true;
      hasMoved = false;
      wrapper.classList.add('is-dragging');
      startX = e.pageX - wrapper.offsetLeft;
      startY = e.pageY - wrapper.offsetTop;
      scrollLeft = wrapper.scrollLeft;
      scrollTop = wrapper.scrollTop;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX - wrapper.offsetLeft;
      const y = e.pageY - wrapper.offsetTop;
      const walkX = (x - startX) * 1.3;
      const walkY = (y - startY) * 1.0;
      
      if (Math.abs(walkX) > 3 || Math.abs(walkY) > 3) {
        hasMoved = true;
      }

      wrapper.scrollLeft = scrollLeft - walkX;
      wrapper.scrollTop = scrollTop - walkY;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        wrapper.classList.remove('is-dragging');
      }
    });

    wrapper.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);
  }

  initSummaryDragToScroll();

  // Excel Handlers
  const handleExportDeptExcel = async () => {
    ToastManager.show('Đang tạo file Excel phân quyền theo Khoa / Phòng...', 'info');
    const ok = await Exporter.exportDeptExcel('Phan_quyen_theo_khoa_phong.xlsx');
    if (ok) {
      ToastManager.show('Đã xuất thành công: Phan_quyen_theo_khoa_phong.xlsx', 'success', 'Xuất File 1 Thành Công');
    }
  };

  const handleExportPersonalExcel = async () => {
    ToastManager.show('Đang tạo file Excel ghi nhận theo Cá Nhân...', 'info');
    const ok = await Exporter.exportPersonalExcel('Phan_quyen_theo_ca_nhan.xlsx');
    if (ok) {
      ToastManager.show('Đã xuất thành công: Phan_quyen_theo_ca_nhan.xlsx', 'success', 'Xuất File 2 Thành Công');
    }
  };

  document.getElementById('btn-export-dept')?.addEventListener('click', handleExportDeptExcel);
  document.getElementById('btn-export-aggregated-excel')?.addEventListener('click', handleExportDeptExcel);
  document.getElementById('btn-export-personal')?.addEventListener('click', handleExportPersonalExcel);
  document.getElementById('btn-export-history-excel')?.addEventListener('click', handleExportPersonalExcel);

  // ==========================================================================
  // 8. TAB 3: Render Lịch Sử Đánh Giá & Thống Kê (Event Delegation)
  // ==========================================================================
  function refreshAllData() {
    appState.evaluations = TinaDataStore.getEvaluations();
    if (DOM.historyCountBadge) DOM.historyCountBadge.textContent = appState.evaluations.length;
    updateDeptEvaluationStats();
    renderHistoryTable();
  }

  function updateDeptEvaluationStats() {
    const allRows = getUserDataRows();
    const allDepts = [...new Set(allRows.map(r => (r.dept || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'vi'));
    const totalDeptsCount = allDepts.length;

    const evaluations = appState.evaluations || TinaDataStore.getEvaluations();
    const evaluatedDeptsSet = new Set(evaluations.map(e => (e.department || '').trim()).filter(Boolean));

    const evaluatedDepts = allDepts.filter(d => evaluatedDeptsSet.has(d));
    const evaluatedCount = evaluatedDepts.length;
    const unevaluatedDepts = allDepts.filter(d => !evaluatedDeptsSet.has(d));

    // 1. Cập nhật nhãn nút Tab 2
    if (DOM.tabSummaryTitle) {
      DOM.tabSummaryTitle.textContent = `Tổng hợp dữ liệu (${evaluatedCount}/${totalDeptsCount} khoa phòng đã đánh giá)`;
    }

    // 2. Cập nhật Box Khoa phòng chưa đánh giá trong Tab 2
    const box = DOM.unevaluatedDeptsBox;
    if (box) {
      if (unevaluatedDepts.length === 0) {
        box.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 6px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; color: #10b981; font-weight: 700; font-size: 12.5px;">
            <i class="fas fa-check-circle"></i>
            <span>Đã đánh giá 100% (${totalDeptsCount}/${totalDeptsCount} Khoa phòng)</span>
          </div>
        `;
      } else {
        box.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 13.5px; font-weight: 700; color: #f59e0b; white-space: nowrap;">
              Khoa phòng chưa đánh giá
            </label>
            <select id="select-unevaluated-dept-list" class="form-control form-control-sm unevaluated-select-control" style="min-width: 330px; max-width: 460px; font-weight: 700; font-size: 13px; height: 35px; cursor: pointer; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
              <option value="" style="font-weight: 700;">-- Bấm vào đây để xem ${unevaluatedDepts.length} khoa phòng chưa ghi nhận data --</option>
              ${unevaluatedDepts.map((d, i) => `<option value="${d}">${i + 1}. [${d}] (Chưa ghi nhận data)</option>`).join('')}
            </select>
          </div>
        `;

        const selectUneval = document.getElementById('select-unevaluated-dept-list');
        if (selectUneval) {
          selectUneval.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val) {
              ToastManager.show(`Khoa phòng [${val}] hiện chưa có dữ liệu đánh giá thu thập nào trong hệ thống!`, 'warning', 'Chưa Có Dữ Liệu');
            }
          });
        }
      }
    }
  }

  function renderHistoryTable() {
    const tbody = DOM.historyTableBody;
    if (!tbody) return;

    if (appState.evaluations.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">
            <i class="fas fa-folder-open" style="font-size: 32px; margin-bottom: 12px; display:block;"></i>
            Chưa có lượt đánh giá thu thập nào được ghi nhận.
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    appState.evaluations.forEach(r => {
      html += `
        <tr>
          <td style="text-align: center;">
            <button class="btn-link-eval btn-download-single" data-id="${r.id}" style="background: var(--primary-light); border: 1px solid var(--border-color); color: var(--primary); font-weight: 700; font-family: inherit; font-size: 12.5px; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;" title="Nhấn để tải file Excel riêng cho lượt đánh giá ${r.id}">
              <i class="fas fa-file-excel" style="color: #10b981;"></i> <span>${r.id}</span>
            </button>
          </td>
          <td style="text-align: center;">${r.department}</td>
          <td style="text-align: center;">${r.position}</td>
          <td style="text-align: center;">${r.title}</td>
          <td style="text-align: center; font-weight: 600;">${r.evaluator}</td>
          <td style="text-align: center; font-size: 13px; color: var(--text-muted);">${r.createdAt}</td>
          <td style="text-align: center;">
            <div style="display: inline-flex; gap: 6px; justify-content: center;">
              <button class="btn btn-secondary btn-sm btn-download-single" data-id="${r.id}" style="padding: 4px 10px; font-size: 12px; color: #10b981;" title="Xuất file Excel của lượt này">
                <i class="fas fa-download"></i> Tải Excel
              </button>
              <button class="btn btn-secondary btn-sm btn-del-eval" data-id="${r.id}" style="padding: 4px 10px; font-size: 12px; color: var(--status-danger);" title="Xóa lượt này">
                <i class="fas fa-trash-alt"></i> Xóa
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // Event Delegation cho History Table
  if (DOM.historyTableBody) {
    DOM.historyTableBody.addEventListener('click', async (e) => {
      // 1. Download Single Eval
      const dlBtn = e.target.closest('.btn-download-single');
      if (dlBtn) {
        e.stopPropagation();
        const id = dlBtn.getAttribute('data-id');
        if (id) {
          ToastManager.show(`Đang khởi tạo file Excel cho lượt đánh giá [${id}]...`, 'info');
          const ok = await Exporter.exportSingleEvaluationExcel(id);
          if (ok) {
            ToastManager.show(`Đã tải về file Excel cho lượt đánh giá ${id}!`, 'success', 'Tải File Thành Công');
          }
        }
        return;
      }

      // 2. Delete Single Eval
      const delBtn = e.target.closest('.btn-del-eval');
      if (delBtn) {
        e.stopPropagation();
        const id = delBtn.getAttribute('data-id');
        if (id && confirm(`Bạn có chắc chắn muốn xóa lượt đánh giá [${id}]?`)) {
          TinaDataStore.deleteEvaluation(id);
          refreshAllData();
          ToastManager.show(`Đã xóa lượt đánh giá ${id}`, 'info');
        }
      }
    });
  }

  document.getElementById('btn-clear-all-evals')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử đánh giá thu thập?')) {
      TinaDataStore.clearAll();
      refreshAllData();
      ToastManager.show('Đã xóa toàn bộ dữ liệu lịch sử đánh giá!', 'info');
    }
  });

  // ==========================================================================
  // 8.5. ĐỒNG BỘ TRỰC TIẾP GIỮA IPHONE & MÁY TÍNH (IMPORT / EXPORT BACKUP)
  // ==========================================================================
  function initSyncHistoryModal() {
    const btnOpen = document.getElementById('btn-sync-history-modal');
    const badgeCount = document.getElementById('sync-export-count');
    const btnCopy = document.getElementById('btn-copy-history-json');
    const btnDownload = document.getElementById('btn-download-history-json');
    const textareaImport = document.getElementById('textarea-import-history-json');
    const inputFile = document.getElementById('input-file-history-json');
    const btnSubmitImport = document.getElementById('btn-submit-import-history');

    function refreshModalData() {
      const evals = TinaDataStore.getEvaluations() || [];
      if (badgeCount) badgeCount.textContent = evals.length;
      if (textareaImport) textareaImport.value = '';
    }

    btnOpen?.addEventListener('click', () => {
      refreshModalData();
      ModalManager.open('modal-sync-history');
    });

    // 1. Sao chép mã JSON vào clipboard
    btnCopy?.addEventListener('click', () => {
      const evals = TinaDataStore.getEvaluations() || [];
      if (evals.length === 0) {
        ToastManager.show('Chưa có dữ liệu đánh giá nào trên máy này để sao chép!', 'warning');
        return;
      }
      const jsonStr = JSON.stringify(evals);
      navigator.clipboard.writeText(jsonStr).then(() => {
        ToastManager.show(`Đã sao chép toàn bộ ${evals.length} bản ghi! Bạn có thể gửi/dán sang thiết bị khác.`, 'success', 'Sao Chép Thành Công');
      }).catch(() => {
        if (textareaImport) {
          textareaImport.value = jsonStr;
          textareaImport.select();
          document.execCommand('copy');
          ToastManager.show(`Đã sao chép ${evals.length} bản ghi!`, 'success');
        }
      });
    });

    // 2. Tải file .json
    btnDownload?.addEventListener('click', () => {
      const evals = TinaDataStore.getEvaluations() || [];
      if (evals.length === 0) {
        ToastManager.show('Chưa có dữ liệu đánh giá nào trên máy này để tải file!', 'warning');
        return;
      }
      const blob = new Blob([JSON.stringify(evals, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tina_evaluations_backup_${evals.length}_items.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      ToastManager.show(`Đã tải về file sao lưu gồm ${evals.length} bản ghi!`, 'success');
    });

    // 3. Đọc từ file tải lên
    inputFile?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (textareaImport) textareaImport.value = event.target.result;
        ToastManager.show(`Đã nạp nội dung file ${file.name}! Bấm "Nạp & Gộp Dữ Liệu" để áp dụng.`, 'info');
      };
      reader.readAsText(file);
    });

    // 4. Nạp & Gộp dữ liệu
    btnSubmitImport?.addEventListener('click', () => {
      const text = textareaImport?.value.trim();
      if (!text) {
        ToastManager.show('Vui lòng dán mã dữ liệu hoặc chọn file .json trước khi nạp!', 'warning');
        return;
      }

      try {
        let imported = JSON.parse(text);
        if (!Array.isArray(imported)) {
          if (imported && typeof imported === 'object') {
            imported = Object.values(imported);
          } else {
            throw new Error('Định dạng dữ liệu không hợp lệ!');
          }
        }

        const validItems = imported.filter(item => item && item.id && item.department);
        if (validItems.length === 0) {
          ToastManager.show('Không tìm thấy bản ghi đánh giá hợp lệ nào trong dữ liệu nạp vào!', 'error');
          return;
        }

        // Gộp vào TinaDataStore
        validItems.forEach(item => {
          TinaDataStore.saveOrUpdateEvaluation(item);
        });

        // Đẩy lên Cloud nếu có kết nối
        if (window.TinaFirebase && typeof window.TinaFirebase.pushAllLocalToCloud === 'function') {
          window.TinaFirebase.pushAllLocalToCloud();
        }

        refreshAllData();
        refreshModalData();
        ModalManager.close('modal-sync-history');

        const totalNow = (TinaDataStore.getEvaluations() || []).length;
        ToastManager.show(`Đã nạp & gộp thành công ${validItems.length} bản ghi! Tổng cộng hiện có ${totalNow} đánh giá.`, 'success', 'Nạp Dữ Liệu Thành Công');
      } catch (err) {
        console.error('Lỗi phân tích JSON:', err);
        ToastManager.show('Mã dữ liệu dán vào bị sai định dạng JSON!', 'error', 'Lỗi Dữ Liệu');
      }
    });
  }

  // ==========================================================================
  // 9. QUẢN LÝ DATA USER (MẬT KHẨU 877598 - THÊM, SỬA, XÓA KHOA PHÒNG/CHỨC DANH/VỊ TRÍ)
  // ==========================================================================
  function initDataUserManagement() {
    let localDataUserRows = getUserDataRows();
    let editIndex = -1;

    document.querySelectorAll('.btn-open-data-user-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputPw = document.getElementById('input-data-user-password');
        const errPw = document.getElementById('data-user-password-error');
        if (inputPw) inputPw.value = '';
        if (errPw) errPw.style.display = 'none';
        ModalManager.open('modal-data-user-password');
        setTimeout(() => inputPw?.focus(), 150);
      });
    });

    function verifyDataUserPassword() {
      const inputPw = document.getElementById('input-data-user-password');
      const errPw = document.getElementById('data-user-password-error');
      if (!inputPw) return;

      if (inputPw.value.trim() === DATA_USER_PASSWORD) {
        if (errPw) errPw.style.display = 'none';
        ModalManager.close('modal-data-user-password');
        
        localDataUserRows = getUserDataRows();
        resetCrudForm();
        renderDataUserDatalists();
        renderDataUserTable();
        ModalManager.open('modal-data-user-manager');
      } else {
        if (errPw) errPw.style.display = 'block';
        inputPw.focus();
        inputPw.select();
      }
    }

    document.getElementById('btn-submit-data-user-password')?.addEventListener('click', verifyDataUserPassword);
    document.getElementById('input-data-user-password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyDataUserPassword();
    });

    function renderDataUserDatalists() {
      const depts = [...new Set(localDataUserRows.map(r => r.dept).filter(Boolean))].sort();
      const titles = [...new Set(localDataUserRows.map(r => r.title).filter(Boolean))].sort();

      const dlDept = document.getElementById('list-existing-depts');
      const dlTitle = document.getElementById('list-existing-titles');
      if (dlDept) dlDept.innerHTML = depts.map(d => `<option value="${d}">`).join('');
      if (dlTitle) dlTitle.innerHTML = titles.map(t => `<option value="${t}">`).join('');
    }

    function resetCrudForm() {
      editIndex = -1;
      const form = document.getElementById('form-data-user-crud');
      if (form) form.reset();
      const hiddenIdx = document.getElementById('edit-data-user-index');
      if (hiddenIdx) hiddenIdx.value = '-1';
      const formTitle = document.getElementById('data-user-form-title');
      if (formTitle) formTitle.innerHTML = '<i class="fas fa-plus-circle" style="color: var(--status-success);"></i> Thêm Tổ Hợp User Mới';
      const btnLabel = document.getElementById('btn-submit-data-user-label');
      if (btnLabel) btnLabel.textContent = 'Thêm';
      const btnRow = document.getElementById('btn-submit-data-user-row');
      if (btnRow) btnRow.className = 'btn btn-primary btn-sm';
      const btnCancel = document.getElementById('btn-cancel-edit-data-user');
      if (btnCancel) btnCancel.style.display = 'none';
    }

    document.getElementById('btn-cancel-edit-data-user')?.addEventListener('click', resetCrudForm);

    function renderDataUserTable() {
      const tbody = document.getElementById('data-user-table-body');
      const badge = document.getElementById('data-user-count-badge');
      if (!tbody) return;

      const keyword = (document.getElementById('search-data-user-keyword')?.value || '').toLowerCase().trim();
      let html = '';
      let matchCount = 0;

      localDataUserRows.forEach((row, idx) => {
        if (keyword) {
          const textMatch = (row.dept || '').toLowerCase().includes(keyword) ||
                            (row.title || '').toLowerCase().includes(keyword) ||
                            (row.position || '').toLowerCase().includes(keyword);
          if (!textMatch) return;
        }

        matchCount++;
        html += `
          <tr>
            <td style="text-align: center; color: var(--text-muted); font-size: 12px;">${idx + 1}</td>
            <td style="font-weight: 600; color: var(--text-main);">${row.dept}</td>
            <td><span style="background: rgba(37,99,235,0.08); color: #2563eb; font-weight: 600; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${row.title}</span></td>
            <td style="text-align: center;"><span style="background: ${row.position === 'Quản lý' ? '#fef3c7' : '#f1f5f9'}; color: ${row.position === 'Quản lý' ? '#b45309' : '#475569'}; font-weight: 600; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${row.position}</span></td>
            <td style="text-align: center;">
              <div style="display: inline-flex; gap: 6px;">
                <button type="button" class="btn btn-secondary btn-sm btn-edit-user-row" data-index="${idx}" style="padding: 2px 8px; font-size: 11.5px; color: var(--primary);" title="Sửa tổ hợp này">
                  <i class="fas fa-edit"></i> Sửa
                </button>
                <button type="button" class="btn btn-secondary btn-sm btn-delete-user-row" data-index="${idx}" style="padding: 2px 8px; font-size: 11.5px; color: var(--status-danger);" title="Xóa tổ hợp này">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      if (matchCount === 0) {
        html = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">Không tìm thấy tổ hợp nào phù hợp.</td></tr>`;
      }

      tbody.innerHTML = html;
      if (badge) badge.textContent = `${localDataUserRows.length} tổ hợp`;
    }

    // Event Delegation cho Data User Table
    const dataUserTableBody = document.getElementById('data-user-table-body');
    if (dataUserTableBody) {
      dataUserTableBody.addEventListener('click', (e) => {
        // Edit Row
        const editBtn = e.target.closest('.btn-edit-user-row');
        if (editBtn) {
          const idx = parseInt(editBtn.getAttribute('data-index'), 10);
          const item = localDataUserRows[idx];
          if (!item) return;

          editIndex = idx;
          const hiddenIdx = document.getElementById('edit-data-user-index');
          if (hiddenIdx) hiddenIdx.value = idx;
          const crudDept = document.getElementById('crud-dept');
          const crudTitle = document.getElementById('crud-title');
          const crudPos = document.getElementById('crud-pos');
          if (crudDept) crudDept.value = item.dept;
          if (crudTitle) crudTitle.value = item.title;
          if (crudPos) crudPos.value = item.position;

          const formTitle = document.getElementById('data-user-form-title');
          if (formTitle) formTitle.innerHTML = `<i class="fas fa-edit" style="color: #2563eb;"></i> Chỉnh Sửa Tổ Hợp (Dòng ${idx + 1})`;
          const btnLabel = document.getElementById('btn-submit-data-user-label');
          if (btnLabel) btnLabel.textContent = 'Lưu sửa';
          const btnRow = document.getElementById('btn-submit-data-user-row');
          if (btnRow) btnRow.className = 'btn btn-success btn-sm';
          const btnCancel = document.getElementById('btn-cancel-edit-data-user');
          if (btnCancel) btnCancel.style.display = 'inline-block';
          
          crudDept?.focus();
          return;
        }

        // Delete Row
        const delBtn = e.target.closest('.btn-delete-user-row');
        if (delBtn) {
          const idx = parseInt(delBtn.getAttribute('data-index'), 10);
          const item = localDataUserRows[idx];
          if (!item) return;

          if (confirm(`Bạn có chắc chắn muốn xóa tổ hợp [${item.dept} - ${item.title} - ${item.position}]?`)) {
            localDataUserRows.splice(idx, 1);
            if (editIndex === idx) resetCrudForm();
            renderDataUserDatalists();
            renderDataUserTable();
            ToastManager.show(`Đã xóa tổ hợp [${item.dept} - ${item.title}]`, 'info');
          }
        }
      });
    }

    document.getElementById('search-data-user-keyword')?.addEventListener('input', debounce(() => {
      renderDataUserTable();
    }, 120));

    document.getElementById('form-data-user-crud')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const dept = document.getElementById('crud-dept').value.trim();
      const title = document.getElementById('crud-title').value.trim();
      const pos = document.getElementById('crud-pos').value.trim();

      if (!dept || !title || !pos) {
        ToastManager.show('Vui lòng điền đầy đủ Khoa phòng, Chức danh và Vị trí!', 'warning');
        return;
      }

      if (editIndex >= 0 && editIndex < localDataUserRows.length) {
        localDataUserRows[editIndex] = { dept, title, position: pos };
        ToastManager.show(`Đã cập nhật dòng ${editIndex + 1}: [${dept} - ${title} - ${pos}]`, 'success');
        resetCrudForm();
      } else {
        const isDuplicate = localDataUserRows.some(r => r.dept === dept && r.title === title && r.position === pos);
        if (isDuplicate) {
          ToastManager.show(`Tổ hợp [${dept} - ${title} - ${pos}] đã tồn tại trong danh sách!`, 'warning');
          return;
        }
        localDataUserRows.unshift({ dept, title, position: pos });
        ToastManager.show(`Đã thêm tổ hợp mới: [${dept} - ${title} - ${pos}]`, 'success');
        resetCrudForm();
      }

      renderDataUserDatalists();
      renderDataUserTable();
    });

    document.getElementById('btn-reset-data-user-default')?.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn khôi phục lại danh sách 76 tổ hợp gốc từ file Data_khoaphong.docx?')) {
        localDataUserRows = JSON.parse(JSON.stringify(DEFAULT_KHOA_PHONG_ROWS));
        resetCrudForm();
        renderDataUserDatalists();
        renderDataUserTable();
        ToastManager.show('Đã khôi phục 76 tổ hợp gốc', 'info');
      }
    });

    document.getElementById('btn-save-apply-data-user')?.addEventListener('click', () => {
      if (localDataUserRows.length === 0) {
        ToastManager.show('Danh mục không được để trống!', 'warning');
        return;
      }

      saveUserDataRows(localDataUserRows);
      refreshGlobalUserData();
      initLoginDropdowns();
      refreshAllData();
      ModalManager.close('modal-data-user-manager');

      ToastManager.show(`Đã cập nhật thành công ${localDataUserRows.length} tổ hợp Data user vào hệ thống! Dữ liệu đánh giá của các user đã lưu trước đó không bị ảnh hưởng.`, 'success', 'Cập Nhật Thành Công');
    });
  }

  // ==========================================================================
  // 10. FIREBASE REALTIME CLOUD SYNC CONTROLLER
  // ==========================================================================
  function initCloudSyncController() {
    // 1. Khởi tạo kết nối Firebase
    if (window.TinaFirebase && typeof window.TinaFirebase.init === 'function') {
      window.TinaFirebase.init();
    }

    // 2. Lắng nghe dữ liệu đồng bộ từ Cloud gửi về
    window.addEventListener('tina-data-synced', (e) => {
      console.log('[App] Nhận dữ liệu đồng bộ từ Cloud:', e.detail);
      
      // Cập nhật lại kho dữ liệu
      appState.evaluations = TinaDataStore.getEvaluations();
      refreshAllData();

      // Nếu đang mở bảng tổng hợp, cập nhật lại
      if (typeof renderSummaryTables === 'function' && appState.isUnlocked) {
        renderSummaryTables();
      }

      // Nếu đang trong phiên đánh giá của một tổ hợp, cập nhật lại ma trận
      if (appState.isLoggedIn) {
        renderTreeTable();
      }

      // Nếu có cập nhật danh sách tổ hợp người dùng
      if (e.detail && e.detail.type === 'user_rows') {
        initLoginDropdowns();
      }

      ToastManager.show('Dữ liệu đã được tự động đồng bộ từ Cloud Realtime!', 'info', 'Đồng Bộ Đám Mây');
    });

    // 3. Mở Modal Cấu hình Cloud khi click vào Badge hoặc Nút Cloud trên Header
    const openCloudConfigModal = () => {
      if (!window.TinaFirebase) return;
      const cfg = window.TinaFirebase.getConfig();

      const inputUrl = document.getElementById('cfg-firebase-db-url');
      const inputProj = document.getElementById('cfg-firebase-project-id');
      const inputKey = document.getElementById('cfg-firebase-api-key');

      if (inputUrl) inputUrl.value = cfg.databaseURL || '';
      if (inputProj) inputProj.value = cfg.projectId || '';
      if (inputKey) inputKey.value = cfg.apiKey || '';

      ModalManager.open('modal-cloud-sync');
    };

    document.getElementById('cloud-sync-status')?.addEventListener('click', openCloudConfigModal);
    document.getElementById('btn-cloud-config')?.addEventListener('click', openCloudConfigModal);

    // 4. Nút Lưu Cấu hình Cloud
    document.getElementById('btn-cloud-save-config')?.addEventListener('click', () => {
      if (!window.TinaFirebase) return;

      const databaseURL = (document.getElementById('cfg-firebase-db-url')?.value || '').trim();
      const projectId = (document.getElementById('cfg-firebase-project-id')?.value || '').trim();
      const apiKey = (document.getElementById('cfg-firebase-api-key')?.value || '').trim();

      if (!databaseURL && !projectId) {
        ToastManager.show('Vui lòng nhập Database URL hoặc Project ID của Firebase!', 'warning');
        return;
      }

      const newCfg = {
        databaseURL,
        projectId,
        apiKey
      };

      window.TinaFirebase.saveConfig(newCfg);
      ToastManager.show('Đang kết nối lại với Firebase Database...', 'info');
      
      window.TinaFirebase.init();
      ModalManager.close('modal-cloud-sync');
    });

    // 5. Nút Khôi phục cấu hình mặc định
    document.getElementById('btn-cloud-reset-default')?.addEventListener('click', () => {
      if (confirm('Bạn có muốn đặt lại cấu hình Firebase Cloud mặc định của hệ thống?')) {
        localStorage.removeItem('tina_firebase_config_v1');
        if (window.TinaFirebase) {
          const cfg = window.TinaFirebase.getConfig();
          const inputUrl = document.getElementById('cfg-firebase-db-url');
          const inputProj = document.getElementById('cfg-firebase-project-id');
          const inputKey = document.getElementById('cfg-firebase-api-key');
          if (inputUrl) inputUrl.value = cfg.databaseURL || '';
          if (inputProj) inputProj.value = cfg.projectId || '';
          if (inputKey) inputKey.value = cfg.apiKey || '';
          window.TinaFirebase.init();
        }
        ToastManager.show('Đã khôi phục cấu hình Firebase mặc định', 'info');
      }
    });

    // 6. Nút Tải dữ liệu từ Cloud về
    document.getElementById('btn-cloud-pull')?.addEventListener('click', async () => {
      if (!window.TinaFirebase) return;
      ToastManager.show('Đang tải dữ liệu từ Cloud...', 'info');
      const ok = await window.TinaFirebase.pullAllFromCloud();
      if (ok) {
        ToastManager.show('Tải dữ liệu từ Cloud thành công!', 'success');
      } else {
        ToastManager.show('Không thể tải dữ liệu từ Cloud. Vui lòng kiểm tra kết nối mạng!', 'danger');
      }
    });

    // 7. Nút Đẩy dữ liệu máy lên Cloud
    document.getElementById('btn-cloud-push')?.addEventListener('click', async () => {
      if (!window.TinaFirebase) return;
      ToastManager.show('Đang đẩy dữ liệu máy lên Cloud...', 'info');
      const ok = await window.TinaFirebase.pushAllLocalToCloud();
      if (ok) {
        ToastManager.show('Đã đẩy toàn bộ dữ liệu lên Cloud thành công!', 'success');
      } else {
        ToastManager.show('Không thể đẩy dữ liệu lên Cloud. Vui lòng kiểm tra kết nối!', 'danger');
      }
    });
  }

  initSyncHistoryModal();
  initDataUserManagement();
  initCloudSyncController();

});

