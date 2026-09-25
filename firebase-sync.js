/**
 * Tina Soft Permission Hub - Firebase Realtime Cloud Sync Module (firebase-sync.js)
 * Đồng bộ dữ liệu 2 chiều thời gian thực giữa Web và Điện thoại (Multi-device Realtime Sync)
 */

(function (window) {
  'use strict';

  const DEFAULT_FIREBASE_CONFIG_KEY = 'tina_firebase_config_v2';

  // Cấu hình Firebase Realtime Database chính thức của dự án
  const DEFAULT_CONFIG = {
    apiKey: "",
    authDomain: "",
    databaseURL: "https://tina-phanquyen-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tina-phanquyen",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  const TinaFirebase = {
    app: null,
    db: null,
    isConnected: false,
    isSyncing: false,
    listenersAttached: false,

    // Lấy config đã lưu hoặc config mặc định
    getConfig() {
      try {
        const saved = localStorage.getItem(DEFAULT_FIREBASE_CONFIG_KEY);
        if (saved) {
          return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn('Lỗi đọc Firebase config:', e);
      }
      return { ...DEFAULT_CONFIG };
    },

    // Lưu config mới vào LocalStorage
    saveConfig(cfg) {
      try {
        localStorage.setItem(DEFAULT_FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
        return true;
      } catch (e) {
        console.error('Lỗi lưu Firebase config:', e);
        return false;
      }
    },

    // Kiểm tra config có hợp lệ không
    hasValidConfig() {
      const cfg = this.getConfig();
      return !!(cfg && (cfg.databaseURL || cfg.projectId || cfg.apiKey));
    },

    // Khởi tạo Firebase SDK & Kết nối
    init() {
      const cfg = this.getConfig();

      // Kiểm tra thư viện Firebase SDK đã tải chưa
      if (typeof firebase === 'undefined') {
        console.warn('[CloudSync] Firebase SDK chưa được tải.');
        this.updateUIStatus('offline', 'Chưa tải SDK');
        return false;
      }

      if (!cfg.databaseURL && !cfg.projectId) {
        console.info('[CloudSync] Chưa có cấu hình Firebase Database URL.');
        this.updateUIStatus('unconfigured', 'Chưa cấu hình Cloud');
        return false;
      }

      try {
        // Tránh khởi tạo nhiều lần
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(cfg);
        } else {
          this.app = firebase.app();
        }

        this.db = firebase.database();
        this.updateUIStatus('connecting', 'Đang kết nối...');

        this.attachRealtimeListeners();

        // Giám sát kết nối mạng đến Firebase
        const connectedRef = this.db.ref('.info/connected');
        connectedRef.on('value', (snap) => {
          if (snap.val() === true) {
            this.isConnected = true;
            console.log('[CloudSync] Đã kết nối Firebase Realtime Database thành công!');
            this.updateUIStatus('online', 'Cloud Realtime');
            // Đồng bộ dữ liệu lần đầu
            this.pullAllFromCloud();
          } else {
            this.isConnected = false;
            console.log('[CloudSync] Mất kết nối Firebase hoặc đang ngoại tuyến.');
            this.updateUIStatus('offline', 'Ngoại tuyến');
          }
        });

        return true;
      } catch (err) {
        console.error('[CloudSync] Lỗi khởi tạo Firebase:', err);
        this.updateUIStatus('error', 'Lỗi kết nối Cloud');
        return false;
      }
    },

    // Cập nhật trạng thái hiển thị trên giao diện (Header badge & modal)
    updateUIStatus(status, text) {
      const badge = document.getElementById('cloud-sync-status');
      if (badge) {
        badge.className = `cloud-sync-badge status-${status}`;
        badge.innerHTML = `<span class="sync-dot"></span> <span class="sync-text">${text}</span>`;
        badge.setAttribute('data-status', status);
      }

      const modalStatus = document.getElementById('cloud-modal-status-text');
      if (modalStatus) {
        modalStatus.textContent = text;
      }
    },

    // Lắng nghe thay đổi thời gian thực từ Cloud
    attachRealtimeListeners() {
      if (this.listenersAttached || !this.db) return;
      this.listenersAttached = true;

      // 1. Lắng nghe thay đổi bảng đánh giá (Evaluations)
      const evalsRef = this.db.ref('tina_evaluations');
      evalsRef.on('value', (snapshot) => {
        const cloudData = snapshot.val();
        const list = cloudData ? (Array.isArray(cloudData) ? cloudData : Object.values(cloudData)) : [];
        this.mergeEvaluationsFromCloud(list);
      }, (error) => {
        console.warn('[CloudSync] Lỗi lắng nghe evaluations:', error);
      });

      // 2. Lắng nghe thay đổi danh sách tổ hợp người dùng (Custom User Rows)
      const rowsRef = this.db.ref('tina_custom_user_rows');
      rowsRef.on('value', (snapshot) => {
        const cloudRows = snapshot.val();
        if (cloudRows && Array.isArray(cloudRows) && cloudRows.length > 0) {
          this.mergeUserRowsFromCloud(cloudRows);
        } else {
          const localRows = typeof getUserDataRows === 'function' ? getUserDataRows() : [];
          if (localRows && localRows.length > 0 && this.db) {
            this.db.ref('tina_custom_user_rows').set(localRows).catch(() => {});
          }
        }
      }, (error) => {
        console.warn('[CloudSync] Lỗi lắng nghe custom_user_rows:', error);
      });
    },

    // Gộp dữ liệu đánh giá từ Cloud vào Local
    mergeEvaluationsFromCloud(cloudList) {
      const cleanList = Array.isArray(cloudList) ? cloudList.filter(item => item && item.id) : [];
      cleanList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

      // Lưu danh sách chuẩn từ Cloud vào LocalStorage
      TinaDataStore.saveEvaluations(cleanList);

      // Bắn sự kiện thông báo cho App cập nhật UI
      window.dispatchEvent(new CustomEvent('tina-data-synced', {
        detail: { type: 'evaluations', count: cleanList.length }
      }));
    },

    // Gộp danh sách người dùng tùy chỉnh từ Cloud vào Local
    mergeUserRowsFromCloud(cloudRows) {
      if (!Array.isArray(cloudRows) || cloudRows.length === 0) return;
      const localRows = getUserDataRows();
      
      // So sánh nếu có sự khác biệt thì cập nhật
      if (JSON.stringify(localRows) !== JSON.stringify(cloudRows)) {
        saveUserDataRows(cloudRows);
        if (typeof refreshGlobalUserData === 'function') {
          refreshGlobalUserData();
        }
        window.dispatchEvent(new CustomEvent('tina-data-synced', {
          detail: { type: 'user_rows', count: cloudRows.length }
        }));
      }
    },

    // Lưu hoặc Cập nhật 1 bản ghi đánh giá lên Cloud
    async saveEvaluation(record) {
      if (!this.db || !record || !record.id) return false;
      try {
        const cleanRecord = JSON.parse(JSON.stringify(record));
        await this.db.ref(`tina_evaluations/${cleanRecord.id}`).set(cleanRecord);
        console.log('[CloudSync] Đã lưu đánh giá lên Cloud:', cleanRecord.id);
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi lưu đánh giá lên Cloud:', e);
        return false;
      }
    },

    // Xóa 1 bản ghi đánh giá trên Cloud
    async deleteEvaluation(id) {
      if (!this.db || !id) return false;
      try {
        await this.db.ref(`tina_evaluations/${id}`).remove();
        console.log('[CloudSync] Đã xóa đánh giá trên Cloud:', id);
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi xóa đánh giá trên Cloud:', e);
        return false;
      }
    },

    // Xóa tất cả đánh giá trên Cloud
    async clearAllEvaluations() {
      if (!this.db) return false;
      try {
        await this.db.ref('tina_evaluations').remove();
        console.log('[CloudSync] Đã xóa toàn bộ đánh giá trên Cloud');
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi xóa toàn bộ trên Cloud:', e);
        return false;
      }
    },

    // Lưu danh sách người dùng tùy chỉnh lên Cloud
    async saveCustomUserRows(rows) {
      if (!this.db || !Array.isArray(rows)) return false;
      try {
        await this.db.ref('tina_custom_user_rows').set(rows);
        console.log('[CloudSync] Đã lưu custom user rows lên Cloud');
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi lưu user rows lên Cloud:', e);
        return false;
      }
    },

    // Đẩy TOÀN BỘ dữ liệu từ Local lên Cloud (Thủ công / Khởi tạo)
    async pushAllLocalToCloud() {
      if (!this.db) {
        alert('Chưa kết nối được Firebase Cloud Database. Vui lòng kiểm tra lại cấu hình!');
        return false;
      }

      this.isSyncing = true;
      this.updateUIStatus('syncing', 'Đang tải lên...');

      try {
        const evals = TinaDataStore.getEvaluations() || [];
        const userRows = getUserDataRows() || [];

        // Đẩy evaluations theo map ID
        const evalsMap = {};
        evals.forEach(item => {
          if (item && item.id) evalsMap[item.id] = item;
        });

        await this.db.ref('tina_evaluations').update(evalsMap);
        if (userRows.length > 0) {
          await this.db.ref('tina_custom_user_rows').set(userRows);
        }

        this.updateUIStatus('online', 'Cloud Realtime');
        this.isSyncing = false;
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi pushAllLocalToCloud:', e);
        this.updateUIStatus('error', 'Lỗi đồng bộ');
        this.isSyncing = false;
        return false;
      }
    },

    // Kéo TOÀN BỘ dữ liệu từ Cloud về Local (Thủ công)
    async pullAllFromCloud() {
      if (!this.db) return false;

      this.isSyncing = true;
      this.updateUIStatus('syncing', 'Đang tải về...');

      try {
        const snapEvals = await this.db.ref('tina_evaluations').once('value');
        const cloudData = snapEvals.val();
        const list = cloudData ? (Array.isArray(cloudData) ? cloudData : Object.values(cloudData)) : [];
        this.mergeEvaluationsFromCloud(list);

        const snapRows = await this.db.ref('tina_custom_user_rows').once('value');
        const cloudRows = snapRows.val();
        if (cloudRows && Array.isArray(cloudRows)) {
          this.mergeUserRowsFromCloud(cloudRows);
        }

        this.updateUIStatus('online', 'Cloud Realtime');
        this.isSyncing = false;
        return true;
      } catch (e) {
        console.error('[CloudSync] Lỗi pullAllFromCloud:', e);
        this.updateUIStatus('error', 'Lỗi tải dữ liệu');
        this.isSyncing = false;
        return false;
      }
    }
  };

  // Expose ra window toàn cục
  window.TinaFirebase = TinaFirebase;

})(window);
