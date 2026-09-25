/**
 * Tina Soft Permission Hub - Core Library (lib.js)
 * Chứa Cây thư mục dữ liệu Data_cay_thu_muc (353 chức năng), DataStore, Quy tắc tổng hợp PQCN & Bảo mật Password thanhta92.
 */

// 1. Mật khẩu bảo mật
const SECURITY_PASSWORD = 'thanhta92';
const DATA_USER_PASSWORD = '877598';

// 2. Dữ liệu Danh mục gốc Khoa phòng - Chức danh - Vị trí (Từ file Data_khoaphong.docx)
const DEFAULT_KHOA_PHONG_ROWS = [
  {"dept": "KHTH", "title": "BS", "position": "Quản lý"},
  {"dept": "KHTH", "title": "Hành chính", "position": "Nhân viên"},
  {"dept": "QLCL", "title": "Hành chính", "position": "Nhân viên"},
  {"dept": "QLCL", "title": "Nhân viên", "position": "Nhân viên"},
  {"dept": "NCKH", "title": "Hành chính", "position": "Quản lý"},
  {"dept": "NCKH", "title": "Hành chính", "position": "Nhân viên"},
  {"dept": "Tiepdon", "title": "Hành chính", "position": "Quản lý"},
  {"dept": "Tiepdon", "title": "Hành chính", "position": "Nhân viên"},
  {"dept": "TCKT_KTVP", "title": "Hành chính", "position": "Nhân viên"},
  {"dept": "Khoa Dược – Nhà thuốc", "title": "Dược sĩ", "position": "Quản lý"},
  {"dept": "Khoa Dược – Nhà thuốc", "title": "Dược sĩ", "position": "Nhân viên"},
  {"dept": "Chẩn đoán hình ảnh", "title": "BS", "position": "Quản lý"},
  {"dept": "Chẩn đoán hình ảnh", "title": "BS", "position": "Nhân viên"},
  {"dept": "Chẩn đoán hình ảnh", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "Chẩn đoán hình ảnh", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "Chẩn đoán hình ảnh", "title": "TK y khoa", "position": "Nhân viên"},
  {"dept": "Chẩn đoán hình ảnh", "title": "Kỹ thuật y", "position": "Nhân viên"},
  {"dept": "Khoa Khám bệnh", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "Khoa Khám bệnh", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "Khoa Khám bệnh", "title": "NHS", "position": "Quản lý"},
  {"dept": "Khoa Khám bệnh", "title": "NHS", "position": "Nhân viên"},
  {"dept": "Khoa Khám bệnh", "title": "TK y khoa", "position": "Nhân viên"},
  {"dept": "Khoa Khám bệnh", "title": "BS", "position": "Quản lý"},
  {"dept": "Khoa Khám bệnh", "title": "BS", "position": "Nhân viên"},
  {"dept": "PKNhi", "title": "BS", "position": "Quản lý"},
  {"dept": "PKNhi", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "PKNhi", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "PKNhi", "title": "TK y khoa", "position": "Nhân viên"},
  {"dept": "ĐNSS", "title": "BS", "position": "Quản lý"},
  {"dept": "ĐNSS", "title": "BS", "position": "Nhân viên"},
  {"dept": "ĐNSS", "title": "NHS", "position": "Quản lý"},
  {"dept": "ĐNSS", "title": "NHS", "position": "Nhân viên"},
  {"dept": "ĐNSS", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "ĐNSS", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "VLTL", "title": "KTV", "position": "Nhân viên"},
  {"dept": "Cấp cứu - HSCD", "title": "BS", "position": "Quản lý"},
  {"dept": "Cấp cứu - HSCD", "title": "BS", "position": "Nhân viên"},
  {"dept": "Cấp cứu - HSCD", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "Cấp cứu - HSCD", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "Cấp cứu - HSCD", "title": "NHS", "position": "Nhân viên"},
  {"dept": "Cấp cứu - HSCD", "title": "Hộ lý", "position": "Nhân viên"},
  {"dept": "IVF", "title": "NHS", "position": "Quản lý"},
  {"dept": "IVF", "title": "NHS", "position": "Nhân viên"},
  {"dept": "IVF", "title": "QM", "position": "Nhân viên"},
  {"dept": "IVF", "title": "TK y khoa", "position": "Nhân viên"},
  {"dept": "IVF", "title": "Hộ lý", "position": "Nhân viên"},
  {"dept": "IVF", "title": "CCS", "position": "Nhân viên"},
  {"dept": "IVF", "title": "Di truyền", "position": "Nhân viên"},
  {"dept": "IVF", "title": "BS", "position": "Quản lý"},
  {"dept": "IVF", "title": "BS", "position": "Nhân viên"},
  {"dept": "IVF", "title": "OM", "position": "Nhân viên"},
  {"dept": "IVF", "title": "KTV", "position": "Nhân viên"},
  {"dept": "IVF", "title": "CVPH", "position": "Quản lý"},
  {"dept": "IVF", "title": "CVPH", "position": "Nhân viên"},
  {"dept": "Ngoại-GMHS", "title": "BS", "position": "Quản lý"},
  {"dept": "Ngoại-GMHS", "title": "NHS", "position": "Quản lý"},
  {"dept": "Ngoại-GMHS", "title": "NHS", "position": "Nhân viên"},
  {"dept": "Ngoại-GMHS", "title": "Điều dưỡng", "position": "Quản lý"},
  {"dept": "Ngoại-GMHS", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "Ngoại-GMHS", "title": "TK y khoa", "position": "Nhân viên"},
  {"dept": "Ngoại-GMHS", "title": "Kỹ thuật y", "position": "Nhân viên"},
  {"dept": "Ngoại-GMHS", "title": "Hộ lý", "position": "Nhân viên"},
  {"dept": "Xét Nghiệm", "title": "BS", "position": "Quản lý"},
  {"dept": "Xét Nghiệm", "title": "KTV", "position": "Quản lý"},
  {"dept": "Xét Nghiệm", "title": "KTV", "position": "Nhân viên"},
  {"dept": "Xét Nghiệm", "title": "Kỹ thuật y", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "BS SPK", "position": "Quản lý"},
  {"dept": "Phụ sản-KHHGĐ", "title": "BS SPK", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "NHS", "position": "Quản lý"},
  {"dept": "Phụ sản-KHHGĐ", "title": "NHS", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "Điều dưỡng", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "Hộ lý", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "Nhân viên thanh trùng", "position": "Nhân viên"},
  {"dept": "Phụ sản-KHHGĐ", "title": "Giám sát buồng phòng", "position": "Nhân viên"},
  {"dept": "Marcom", "title": "Hành chính", "position": "Quản lý"},
  {"dept": "Marcom", "title": "Hành chính", "position": "Nhân viên"}
];

function getUserDataRows() {
  try {
    const raw = localStorage.getItem('tina_custom_user_rows_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Lỗi đọc custom user rows:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_KHOA_PHONG_ROWS));
}

function saveUserDataRows(rows) {
  try {
    localStorage.setItem('tina_custom_user_rows_v1', JSON.stringify(rows));
  } catch (e) {
    console.error('Lỗi ghi custom user rows:', e);
  }
}

function buildHierarchyFromRows(rows) {
  const hierarchy = {};
  rows.forEach(r => {
    const d = (r.dept || '').trim();
    const t = (r.title || '').trim();
    const p = (r.position || '').trim();
    if (!d || !t || !p) return;
    if (!hierarchy[d]) hierarchy[d] = {};
    if (!hierarchy[d][t]) hierarchy[d][t] = [];
    if (!hierarchy[d][t].includes(p)) hierarchy[d][t].push(p);
  });
  return hierarchy;
}

let KHOA_PHONG_HIERARCHY = buildHierarchyFromRows(getUserDataRows());
let KHOA_PHONG_LIST = Object.keys(KHOA_PHONG_HIERARCHY);

function refreshGlobalUserData() {
  KHOA_PHONG_HIERARCHY = buildHierarchyFromRows(getUserDataRows());
  KHOA_PHONG_LIST = Object.keys(KHOA_PHONG_HIERARCHY);
}

const CHUC_DANH_LIST = [
  "BS",
  "BS SPK",
  "CCS",
  "CVPH",
  "Di truyền",
  "Dược sĩ",
  "Giám sát buồng phòng",
  "Hành chính",
  "Hộ lý",
  "KTV",
  "Kỹ thuật y",
  "NHS",
  "Nhân viên",
  "Nhân viên thanh trùng",
  "OM",
  "QM",
  "TK y khoa",
  "Điều dưỡng"
];

const VI_TRI_LIST = [
  "Quản lý",
  "Nhân viên"
];

const CHUC_VU_LIST = VI_TRI_LIST;

// 3. Cây Dữ Liệu Chức Năng (Từ file Data_cay_thu_muc.xlsx)
const TREE_DATA = [
  {
    "id": "item_2",
    "stt": "2",
    "name": "📁 Khám bệnh",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_3",
    "stt": "3",
    "name": "📄 Đăng ký khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_4",
    "stt": "4",
    "name": "📄 Đăng ký khám bệnh 2",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_5",
    "stt": "5",
    "name": "📄 Phiếu khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_6",
    "stt": "6",
    "name": "📄 Phiếu sàng lọc trước sinh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_7",
    "stt": "7",
    "name": "📄 Thông tin khám thai",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_8",
    "stt": "8",
    "name": "📄 Chuyển phòng khám",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_9",
    "stt": "9",
    "name": "📄 Phiếu thanh toán dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_10",
    "stt": "10",
    "name": "📄 Danh sách đăng ký khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_11",
    "stt": "11",
    "name": "📄 Danh sách khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_12",
    "stt": "12",
    "name": "📄 Danh sách bệnh nhân hẹn tái khám",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_13",
    "stt": "13",
    "name": "📄 Thống kê khám thai",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_14",
    "stt": "14",
    "name": "📄 Danh sách bệnh nhân hẹn tái khám PK Nhi",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_15",
    "stt": "15",
    "name": "📄 Tìm kiếm thông tin người bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_16",
    "stt": "16",
    "name": "📄 Tìm kiếm thông tin người cho trứng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_17",
    "stt": "17",
    "name": "📄 Thông tin đăng ký khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_18",
    "stt": "18",
    "name": "📄 Danh sách đã in chi phí khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_19",
    "stt": "19",
    "name": "📄 Sổ khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_20",
    "stt": "20",
    "name": "📄 Báo cáo phòng tiếp bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_21",
    "stt": "21",
    "name": "📄 Báo cáo số liệu khám bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_22",
    "stt": "22",
    "name": "📄 Sửa đối tượng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_23",
    "stt": "23",
    "name": "📄 Truy vấn thông tin",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_24",
    "stt": "24",
    "name": "📄 Tình hình bệnh tật tại phòng khám theo đối tượng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_25",
    "stt": "25",
    "name": "📁 Báo cáo chỉ định - viện phí - CLS",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_26",
    "stt": "26",
    "name": "📄 Đối chiếu",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_27",
    "stt": "27",
    "name": "📄 Danh sách chỉ định",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_28",
    "stt": "28",
    "name": "📄 Danh sách được chỉ định chưa thực hiện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_29",
    "stt": "29",
    "name": "📄 Danh sách đã nộp tiền nhưng chưa thực hiện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_30",
    "stt": "30",
    "name": "📄 Danh sách đã thực hiện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_31",
    "stt": "31",
    "name": "📄 Tập vật lý trị liệu nhi",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_32",
    "stt": "32",
    "name": "📄 Đơn thuốc quốc gia",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_33",
    "stt": "33",
    "name": "📁 IVF",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_34",
    "stt": "34",
    "name": "📄 Hồ sơ Hiếm Muộn",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_35",
    "stt": "35",
    "name": "📄 Dữ liệu IVF",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_36",
    "stt": "36",
    "name": "📄 Thông tin khám thai IVF",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_37",
    "stt": "37",
    "name": "📄 In nhãn IVF",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_38",
    "stt": "38",
    "name": "📄 Dữ liệu Nam khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_39",
    "stt": "39",
    "name": "📄 Gia hạn phôi",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_40",
    "stt": "40",
    "name": "📄 Thám sát",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_41",
    "stt": "41",
    "name": "📄 Tinh trùng trữ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_42",
    "stt": "42",
    "name": "📄 Phẫu thuật điều trị",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_43",
    "stt": "43",
    "name": "📄 Tính giờ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_44",
    "stt": "44",
    "name": "📄 Xem thông tin phiếu nang noãn",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_45",
    "stt": "45",
    "name": "📄 Phiếu lấy mẫu sinh thiết",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_46",
    "stt": "46",
    "name": "📄 Phiếu nhập KQ sinh thiết",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_47",
    "stt": "47",
    "name": "📄 Bệnh án Nam Khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_48",
    "stt": "48",
    "name": "📄 Sperm Survival Test",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_49",
    "stt": "49",
    "name": "📄 Danh sách nghiên cứu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_50",
    "stt": "50",
    "name": "📁 NHTT",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_51",
    "stt": "51",
    "name": "📄 Phòng nam khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_52",
    "stt": "52",
    "name": "📄 Phòng xét nghiệm",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_53",
    "stt": "53",
    "name": "📄 Phòng NHS - IVF",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_54",
    "stt": "54",
    "name": "📄 Phòng Labo",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_55",
    "stt": "55",
    "name": "📁 Phòng lưu",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_56",
    "stt": "56",
    "name": "📄 Nhập phòng lưu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_57",
    "stt": "57",
    "name": "📄 Sửa đối tượng các dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_58",
    "stt": "58",
    "name": "📄 Phiếu thanh toán dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_59",
    "stt": "59",
    "name": "📄 In giấy ra viện",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_60",
    "stt": "60",
    "name": "📄 Danh sách người bệnh vào phòng lưu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_61",
    "stt": "61",
    "name": "📄 Danh sách người bệnh ra phòng lưu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_62",
    "stt": "62",
    "name": "📄 Danh sách người bệnh đang nằm phòng lưu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_63",
    "stt": "63",
    "name": "📄 Tổng hợp tình hình người bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_64",
    "stt": "64",
    "name": "📄 Sổ khám bệnh (phòng lưu)",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_65",
    "stt": "65",
    "name": "📄 In phiếu công khai sử dụng thuốc dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_66",
    "stt": "66",
    "name": "📄 Phiếu tổng hợp chi phí cấp cứu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_67",
    "stt": "67",
    "name": "📁 Nội trú",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_68",
    "stt": "68",
    "name": "📄 Nhập viện",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_69",
    "stt": "69",
    "name": "📄 Nhập khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_70",
    "stt": "70",
    "name": "📁 Phẫu thuật, thủ thuật",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_71",
    "stt": "71",
    "name": "📄 Nhập phẫu thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_72",
    "stt": "72",
    "name": "📄 Nhập thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_73",
    "stt": "73",
    "name": "📄 Lịch phẫu thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_74",
    "stt": "74",
    "name": "📄 Tường trình phẫu thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_75",
    "stt": "75",
    "name": "📄 Danh sách phẫu thuật, thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_76",
    "stt": "76",
    "name": "📄 Truy vấn thông tin",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_77",
    "stt": "77",
    "name": "📄 Chi công bác sĩ PTTT",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_78",
    "stt": "78",
    "name": "📄 Chuyển phòng giường",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_79",
    "stt": "79",
    "name": "📄 Xuất khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_80",
    "stt": "80",
    "name": "📄 Xuất viện",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_81",
    "stt": "81",
    "name": "📁 Thuốc, Vật tư y tế, Tài sản",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_82",
    "stt": "82",
    "name": "📄 Dự trù thuốc, Vật tư y tế theo người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_83",
    "stt": "83",
    "name": "📄 Phiếu xuất cơ số tủ trực theo người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_84",
    "stt": "84",
    "name": "📄 Phiếu xuất cơ số tủ trực theo khoa/phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_85",
    "stt": "85",
    "name": "📄 Phiếu hoàn trả thuốc, Vật tư y tế theo người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_86",
    "stt": "86",
    "name": "📄 Dự trù lĩnh hao phí theo khoa/phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_87",
    "stt": "87",
    "name": "📄 Dự trù lĩnh VTHH theo khoa/phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_88",
    "stt": "88",
    "name": "📄 Phiếu hoàn trả thuốc, Vật tư y tế thừa theo khoa/phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_89",
    "stt": "89",
    "name": "📄 Phiếu ra lẻ thuốc",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_90",
    "stt": "90",
    "name": "📄 Phiếu xuất (đơn thuốc)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_91",
    "stt": "91",
    "name": "📄 Phiếu dự trù tài sản",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_92",
    "stt": "92",
    "name": "📄 Phiếu hoàn trả tài sản",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_93",
    "stt": "93",
    "name": "📄 Phiếu dự trù cơ số tủ trực theo khoa phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_94",
    "stt": "94",
    "name": "📄 Xem thẻ kho của tủ trực",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_95",
    "stt": "95",
    "name": "📄 Nhập xuất tồn tủ trực",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_96",
    "stt": "96",
    "name": "📄 Theo dõi tủ trực",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_97",
    "stt": "97",
    "name": "📄 Xem cơ số tủ trực hiện tại",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_98",
    "stt": "98",
    "name": "📄 Xem cơ số tủ trực từ ngày ... đến ngày",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_99",
    "stt": "99",
    "name": "📄 Xem tài sản tại khoa",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_100",
    "stt": "100",
    "name": "📄 Báo cáo sử dụng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_101",
    "stt": "101",
    "name": "📄 Phiếu tổng hợp y lệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_102",
    "stt": "102",
    "name": "📄 In phiếu lĩnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_103",
    "stt": "103",
    "name": "📄 In phiếu xuất",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_104",
    "stt": "104",
    "name": "📄 In phiếu công khai sử dụng thuốc dịch vụ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_105",
    "stt": "105",
    "name": "📄 Danh sách các phiếu đã dự trù",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_106",
    "stt": "106",
    "name": "📄 Thông tin chuyển thuốc",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_107",
    "stt": "107",
    "name": "📁 Dinh dưỡng",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_108",
    "stt": "108",
    "name": "📄 Phiếu báo ăn",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_109",
    "stt": "109",
    "name": "📄 In phiếu báo ăn",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_110",
    "stt": "110",
    "name": "📄 Phiếu chấm ăn hàng ngày để thanh toán ra viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_111",
    "stt": "111",
    "name": "📄 Phòng giường",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_112",
    "stt": "112",
    "name": "📄 Đơn thuốc",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_113",
    "stt": "113",
    "name": "📄 Chỉ định dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_114",
    "stt": "114",
    "name": "📄 Viện phí tại khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_115",
    "stt": "115",
    "name": "📄 Chỉ định đi khám",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_116",
    "stt": "116",
    "name": "📄 Khám tiền mê",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_117",
    "stt": "117",
    "name": "📄 Phiếu thanh toán ra viện",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_118",
    "stt": "118",
    "name": "📄 Phiếu tổng hợp chi phí",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_119",
    "stt": "119",
    "name": "📄 Danh sách chỉ định viện phí",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_120",
    "stt": "120",
    "name": "📁 In giấy",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_121",
    "stt": "121",
    "name": "📄 In giấy ra viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_122",
    "stt": "122",
    "name": "📄 In giấy chuyển viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_123",
    "stt": "123",
    "name": "📄 In giấy nghỉ BHXH",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_124",
    "stt": "124",
    "name": "📄 In giấy chứng sinh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_125",
    "stt": "125",
    "name": "📄 Tóm tắt bệnh án",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_126",
    "stt": "126",
    "name": "📄 Phiếu đánh giá dinh dưỡng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_127",
    "stt": "127",
    "name": "📄 Phiếu sanh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_128",
    "stt": "128",
    "name": "📄 Biên bản kiểm thảo tử vong",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_129",
    "stt": "129",
    "name": "📄 Sửa đối tượng các dịch vụ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_130",
    "stt": "130",
    "name": "📄 Dấu sinh tồn",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_131",
    "stt": "131",
    "name": "📁 Chi phí điều trị",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_132",
    "stt": "132",
    "name": "📄 Công nợ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_133",
    "stt": "133",
    "name": "📄 Bảng thanh toán chi phí điều trị nội trú",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_134",
    "stt": "134",
    "name": "📄 Bảng tổng hợp chi phí điều trị nội trú",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_135",
    "stt": "135",
    "name": "📄 Bảng thanh toán chi phí KCB ngoại trú",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_136",
    "stt": "136",
    "name": "📄 Bảng tổng hợp chi phí KCB ngoại trú",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_137",
    "stt": "137",
    "name": "📄 Chi phí điều trị theo người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_138",
    "stt": "138",
    "name": "📄 Chi phí số ngày điều trị theo chẩn đoán",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_139",
    "stt": "139",
    "name": "📁 Dược lâm sàng",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_140",
    "stt": "140",
    "name": "📄 Sử dụng thuốc trước sau mổ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_141",
    "stt": "141",
    "name": "📄 Danh sách người bệnh sử dụng 1 loại thuốc",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_142",
    "stt": "142",
    "name": "📄 Danh sách người bệnh sử dụng thuốc vật tư",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_143",
    "stt": "143",
    "name": "📄 Tổng hợp người bệnh thuốc",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_144",
    "stt": "144",
    "name": "📄 Hoạt động dưỡng nhi",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_145",
    "stt": "145",
    "name": "📄 Xem chi tiết thuốc theo y lệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_146",
    "stt": "146",
    "name": "📄 In kết quả XN",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_147",
    "stt": "147",
    "name": "📄 Gửi tin nhắn kết quả cận lâm sàng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_148",
    "stt": "148",
    "name": "📁 Nhập tổng hợp",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_149",
    "stt": "149",
    "name": "📁 Vụ điều trị",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_150",
    "stt": "150",
    "name": "📄 Biểu 01-CVCC",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_151",
    "stt": "151",
    "name": "📄 Biểu 02-KB",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_152",
    "stt": "152",
    "name": "📄 Biểu 03.1-ĐT",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_153",
    "stt": "153",
    "name": "📄 Biểu 04-PT/TT",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_154",
    "stt": "154",
    "name": "📄 Biểu 05-SKSS",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_155",
    "stt": "155",
    "name": "📄 Biểu 06-CLS",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_156",
    "stt": "156",
    "name": "📄 Biểu 07-DBV",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_157",
    "stt": "157",
    "name": "📄 Biểu 08-TTB",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_158",
    "stt": "158",
    "name": "📄 Biểu 09.1-CĐT",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_159",
    "stt": "159",
    "name": "📄 Biểu 09.2-NCKH",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_160",
    "stt": "160",
    "name": "📄 Biểu 10.1-TC",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_161",
    "stt": "161",
    "name": "📄 Biểu 10.2.1-TCTVP/BH",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_162",
    "stt": "162",
    "name": "📄 Biểu 10.2.2-TCC",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_163",
    "stt": "163",
    "name": "📄 Biểu 10.3-TC/KT",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_164",
    "stt": "164",
    "name": "📄 Biểu 11-BTTV",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_165",
    "stt": "165",
    "name": "📁 Vụ kế hoạch",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_166",
    "stt": "166",
    "name": "📄 Biểu 01 - Dân số, đơn vị hành chính, trạm y tế xã",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_167",
    "stt": "167",
    "name": "📄 Biểu 02 - Thông tin về sinh, tử",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_168",
    "stt": "168",
    "name": "📄 Biểu 03 - Tình hình thu, chi ngân sách ngành y tế địa phương",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_169",
    "stt": "169",
    "name": "📄 Biểu 04 - Tình hình thu, chi ngân sách của tuyến xã",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_170",
    "stt": "170",
    "name": "📄 Biểu 05 - Tình hình cơ sở y tế và giường bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_171",
    "stt": "171",
    "name": "📄 Biểu 06 - Tình hình nhân lực y tế toàn huyện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_172",
    "stt": "172",
    "name": "📄 Biểu 07 - Tình hình sản xuất kinh doanh dược của huyện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_173",
    "stt": "173",
    "name": "📄 Biểu 08 - Tình hình trang thiết bị y tế của địa phương",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_174",
    "stt": "174",
    "name": "📁 Báo cáo",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_175",
    "stt": "175",
    "name": "📁 Vụ điều trị",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_176",
    "stt": "176",
    "name": "📄 Tình hình cán bộ, công chức, viên chức (Biểu 01-CCVC)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_177",
    "stt": "177",
    "name": "📄 Hoạt động khám bệnh (Biểu 02-KB)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_178",
    "stt": "178",
    "name": "📄 Hoạt động điều trị (Biểu 03.1-ĐT)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_179",
    "stt": "179",
    "name": "📄 Hoạt động phẫu thuật, thủ thuật (Biểu 04-PT/TT)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_180",
    "stt": "180",
    "name": "📄 Hoạt động sức khỏe sinh sản (Biểu 05-SKSS)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_181",
    "stt": "181",
    "name": "📄 Hoạt động cận lâm sàng (Biểu 06-CLS)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_182",
    "stt": "182",
    "name": "📄 Dược bệnh viện (Biểu 07-DBV)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_183",
    "stt": "183",
    "name": "📄 Trang thiết bị y tế (Biểu 08-TTB)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_184",
    "stt": "184",
    "name": "📄 Hoạt động chỉ đạo tuyến (Biểu 09.1-CĐT)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_185",
    "stt": "185",
    "name": "📄 Hoạt động nghiên cứu khoa học (Biểu 09.2-NCKH)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_186",
    "stt": "186",
    "name": "📄 Hoạt động tài chính (Biểu 10.1-TC)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_187",
    "stt": "187",
    "name": "📄 HĐTC - Chi tiết về thu viện phí,Bảo hiểm (Biểu 10.2.1-TCTVP/BH)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_188",
    "stt": "188",
    "name": "📄 HĐTC - Chi tiết về các khoản chi (Biểu 10.2.2-TCC)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_189",
    "stt": "189",
    "name": "📄 HĐTC - Các khoản không thu được (Biểu 10.3-TC/KT)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_190",
    "stt": "190",
    "name": "📄 Tình hình bệnh tật, tử vong tại bệnh viện (Biểu 11-BTTV)",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_191",
    "stt": "191",
    "name": "📄 -",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_192",
    "stt": "192",
    "name": "📄 In trang bìa báo cáo",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_193",
    "stt": "193",
    "name": "📁 Vụ kế hoạch",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_194",
    "stt": "194",
    "name": "📄 Biểu 01 - Dân số, đơn vị hành chính, trạm y tế xã",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_195",
    "stt": "195",
    "name": "📄 Biểu 02 - Thông tin về sinh, tử",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_196",
    "stt": "196",
    "name": "📄 Biểu 03 - Tình hình thu, chi ngân sách ngành y tế địa phương",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_197",
    "stt": "197",
    "name": "📄 Biểu 04 - Tình hình thu, chi ngân sách của tuyến xã",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_198",
    "stt": "198",
    "name": "📄 Biểu 05 - Tình hình cơ sở y tế và giường bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_199",
    "stt": "199",
    "name": "📄 Biểu 06 - Tình hình nhân lực y tế toàn huyện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_200",
    "stt": "200",
    "name": "📄 Biểu 07 - Tình hình sản xuất kinh doanh dược của huyện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_201",
    "stt": "201",
    "name": "📄 Biểu 08 - Tình hình trang thiết bị y tế của địa phương",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_202",
    "stt": "202",
    "name": "📄 Biểu 09 - Chăm sóc sức khỏe trẻ em",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_203",
    "stt": "203",
    "name": "📄 Biểu 10 - Tình hình chăm sóc sức khỏe bà mẹ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_204",
    "stt": "204",
    "name": "📄 Biểu 11 - Thực hiện công tác kế hoạch hóa gia đình",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_205",
    "stt": "205",
    "name": "📄 Biểu 12.1 - Công tác khám chữa bệnh và dịch vụ y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_206",
    "stt": "206",
    "name": "📄 Biểu 12.2 - Công tác khám chữa bệnh và dịch vụ y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_207",
    "stt": "207",
    "name": "📄 Biểu 12.3 - Công tác khám chữa bệnh và dịch vụ y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_208",
    "stt": "208",
    "name": "📄 Biểu 12.4 - Công tác khám chữa bệnh và dịch vụ y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_209",
    "stt": "209",
    "name": "📄 Biểu 13.1 - Thực hiện công tác phòng bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_210",
    "stt": "210",
    "name": "📄 Biểu 13.2 - Thực hiện công tác phòng bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_211",
    "stt": "211",
    "name": "📄 Biểu 13.3 - Thực hiện công tác phòng bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_212",
    "stt": "212",
    "name": "📄 Biểu 14.1 - Các bệnh lây và bệnh quan trọng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_213",
    "stt": "213",
    "name": "📄 Biểu 14.2 - Các bệnh lây và bệnh quan trọng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_214",
    "stt": "214",
    "name": "📄 Biểu 14.3 - Các bệnh lây và bệnh quan trọng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_215",
    "stt": "215",
    "name": "📄 Biểu 14.4 - Các bệnh lây và bệnh quan trọng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_216",
    "stt": "216",
    "name": "📄 Biểu 14.5 - Báo cáo thống kê tai nạn, thương tích",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_217",
    "stt": "217",
    "name": "📄 Biểu 15 - Tình hình bệnh tật, tử vong tại bệnh viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_218",
    "stt": "218",
    "name": "📄 -",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_219",
    "stt": "219",
    "name": "📄 In trang bìa báo cáo",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_220",
    "stt": "220",
    "name": "📁 Báo cáo tiêm thuốc",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_221",
    "stt": "221",
    "name": "📄 Tiêm thuốc HTSS",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_222",
    "stt": "222",
    "name": "📁 Thống kê danh sách người bệnh",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_223",
    "stt": "223",
    "name": "📄 Hiện diện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_224",
    "stt": "224",
    "name": "📄 Nhập viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_225",
    "stt": "225",
    "name": "📄 Nhập khoa",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_226",
    "stt": "226",
    "name": "📄 Xuất khoa",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_227",
    "stt": "227",
    "name": "📄 Xuất viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_228",
    "stt": "228",
    "name": "📄 Cơ quan y tế chuyển đến",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_229",
    "stt": "229",
    "name": "📄 Chuyển viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_230",
    "stt": "230",
    "name": "📄 Tử vong",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_231",
    "stt": "231",
    "name": "📄 Trẻ sơ sinh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_232",
    "stt": "232",
    "name": "📄 Tai nạn thương tích",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_233",
    "stt": "233",
    "name": "📄 Phỏng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_234",
    "stt": "234",
    "name": "📄 Phẫu thuật - thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_235",
    "stt": "235",
    "name": "📄 Nhập xuất viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_236",
    "stt": "236",
    "name": "📄 Nhập xuất khoa",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_237",
    "stt": "237",
    "name": "📄 Nhập xuất khoa theo số lưu trữ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_238",
    "stt": "238",
    "name": "📄 Sổ vào viện - ra viện - chuyển viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_239",
    "stt": "239",
    "name": "📄 Sổ lưu trữ hồ sơ bệnh án",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_240",
    "stt": "240",
    "name": "📄 Doanh thu bác sĩ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_241",
    "stt": "241",
    "name": "📄 Danh sách bệnh nhân hẹn tái khám Khoa Nhi",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_242",
    "stt": "242",
    "name": "📄 Báo cáo mãn kinh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_243",
    "stt": "243",
    "name": "📄 Báo cáo tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_244",
    "stt": "244",
    "name": "📄 Danh sách gửi SMS",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_245",
    "stt": "245",
    "name": "📁 Truy vấn thông tin",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_246",
    "stt": "246",
    "name": "📄 Hồ sơ bệnh án",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_247",
    "stt": "247",
    "name": "📄 Biểu thống kê",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_248",
    "stt": "248",
    "name": "📁 Bệnh nhiễm",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_249",
    "stt": "249",
    "name": "📄 Danh sách người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_250",
    "stt": "250",
    "name": "📄 Tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_251",
    "stt": "251",
    "name": "📄 Danh sách theo loại",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_252",
    "stt": "252",
    "name": "📁 Bệnh sốt xuất huyết",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_253",
    "stt": "253",
    "name": "📄 Danh sách người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_254",
    "stt": "254",
    "name": "📄 Tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_255",
    "stt": "255",
    "name": "📁 Bệnh viêm phổi",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_256",
    "stt": "256",
    "name": "📄 Danh sách người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_257",
    "stt": "257",
    "name": "📄 Tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_258",
    "stt": "258",
    "name": "📁 Bệnh lây các bệnh quan trọng",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_259",
    "stt": "259",
    "name": "📄 Danh sách bệnh nhân",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_260",
    "stt": "260",
    "name": "📄 Tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_261",
    "stt": "261",
    "name": "📁 ARI",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_262",
    "stt": "262",
    "name": "📄 Danh sách người bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_263",
    "stt": "263",
    "name": "📄 Tổng hợp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_264",
    "stt": "264",
    "name": "📄 Tổng hợp tình hình người bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_265",
    "stt": "265",
    "name": "📄 Thống kê điều trị nội trú",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_266",
    "stt": "266",
    "name": "📄 Thống kê số liệu theo biểu đồ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_267",
    "stt": "267",
    "name": "📄 Tổng hợp theo mã ICD10",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_268",
    "stt": "268",
    "name": "📄 Tổng hợp theo mã Phẫu thuật - thủ thuật",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_269",
    "stt": "269",
    "name": "📄 Tổng hợp theo ngày điều trị",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_270",
    "stt": "270",
    "name": "📄 Tổng hợp tình trạng ra viện",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_271",
    "stt": "271",
    "name": "📄 Tình hình mắc bệnh theo địa phương",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_272",
    "stt": "272",
    "name": "📄 So sánh tình hình mắc bệnh theo năm",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_273",
    "stt": "273",
    "name": "📄 Tình hình bệnh tật, tử vong tại khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_274",
    "stt": "274",
    "name": "📄 Hoạt động phẫu thuật, thủ thuật theo khoa",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_275",
    "stt": "275",
    "name": "📄 Số bệnh án đã nhập kho",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_276",
    "stt": "276",
    "name": "📄 Thống kê số liệu theo bản đồ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_277",
    "stt": "277",
    "name": "📄 Báo cáo tiền sử bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_278",
    "stt": "278",
    "name": "📄 Báo cáo đặc thù",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_279",
    "stt": "279",
    "name": "📁 Tiện ích",
    "isFolder": true,
    "depth": 0
  },
  {
    "id": "item_280",
    "stt": "280",
    "name": "📁 Danh mục",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_281",
    "stt": "281",
    "name": "📄 ICD10",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_282",
    "stt": "282",
    "name": "📄 Phẫu thuật, thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_283",
    "stt": "283",
    "name": "📄 Bệnh viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_284",
    "stt": "284",
    "name": "📄 Tỉnh/Thành phố",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_285",
    "stt": "285",
    "name": "📄 Quận/Huyện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_286",
    "stt": "286",
    "name": "📄 Phường xã",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_287",
    "stt": "287",
    "name": "📄 Danh mục theo qui định Vụ Điều Trị",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_288",
    "stt": "288",
    "name": "📄 Biểu mẫu báo cáo",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_289",
    "stt": "289",
    "name": "📄 Danh mục ICD 9 CM",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_290",
    "stt": "290",
    "name": "📄 Khai báo ICD10",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_291",
    "stt": "291",
    "name": "📄 Khai báo phẫu thuật - thủ thuật",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_292",
    "stt": "292",
    "name": "📄 Khai báo cơ quan y tế chuyển đến",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_293",
    "stt": "293",
    "name": "📄 Khai báo nơi đăng ký KCB",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_294",
    "stt": "294",
    "name": "📄 Khai báo khoa",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_295",
    "stt": "295",
    "name": "📄 Khai báo phòng khám",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_296",
    "stt": "296",
    "name": "📄 Khai báo viết tắt",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_297",
    "stt": "297",
    "name": "📄 Khai báo phương pháp vô cảm",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_298",
    "stt": "298",
    "name": "📄 Khai báo nhóm máu",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_299",
    "stt": "299",
    "name": "📄 Khai báo nghề nghiệp",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_300",
    "stt": "300",
    "name": "📄 Khai báo bệnh án sử dụng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_301",
    "stt": "301",
    "name": "📄 Khai báo xử trí khám bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_302",
    "stt": "302",
    "name": "📄 Khai báo đối tượng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_303",
    "stt": "303",
    "name": "📄 Khai báo nhân viên",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_304",
    "stt": "304",
    "name": "📄 Cơ sở y tế, Trạm y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_305",
    "stt": "305",
    "name": "📄 Cơ sở sản xuất kinh doanh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_306",
    "stt": "306",
    "name": "📄 Danh mục thuốc",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_307",
    "stt": "307",
    "name": "📄 Danh mục cách dùng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_308",
    "stt": "308",
    "name": "📄 Danh mục ký giấy ra viện",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_309",
    "stt": "309",
    "name": "📄 Khai báo phòng mỗ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_310",
    "stt": "310",
    "name": "📄 Khai báo đơn thuốc theo bác sỹ  tên bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_311",
    "stt": "311",
    "name": "📄 Danh mục thông tin sản khoa/sơ sinh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_312",
    "stt": "312",
    "name": "📄 Danh mục số thẻ bảo hiểm y tế",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_313",
    "stt": "313",
    "name": "📄 Kết xuất số liệu nộp Sở, Bộ Y tế",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_314",
    "stt": "314",
    "name": "📄 Xem hồ sơ bệnh án",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_315",
    "stt": "315",
    "name": "📄 Thông tin SmartCard",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_316",
    "stt": "316",
    "name": "📄 Hệ thống tin nhắn",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_317",
    "stt": "317",
    "name": "📄 Khai báo thông số hệ thống",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_318",
    "stt": "318",
    "name": "📄 Khai báo thông số máy TINASOFT",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_319",
    "stt": "319",
    "name": "📄 Phân quyền sử dụng theo bệnh viện sử dụng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_320",
    "stt": "320",
    "name": "📄 Phân quyền sử dụng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_321",
    "stt": "321",
    "name": "📄 Sửa mã thẻ  giá trị sử dụng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_322",
    "stt": "322",
    "name": "📄 Sửa số lưu trữ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_323",
    "stt": "323",
    "name": "📄 Sửa mã người bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_324",
    "stt": "324",
    "name": "📄 Sửa thông tin hành chính người bệnh",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_325",
    "stt": "325",
    "name": "📄 Sửa số liệu tỉnh/thành,quận/huyện,phường xã ...",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_326",
    "stt": "326",
    "name": "📄 Xóa thông tin nhập sai từ hồ sơ bệnh án",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_327",
    "stt": "327",
    "name": "📄 Hủy bỏ số liệu chuyển xuống viện phí",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_328",
    "stt": "328",
    "name": "📄 Chỉnh sửa ngày nhập sai từ hồ sơ bệnh án",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_329",
    "stt": "329",
    "name": "📄 Thay đổi mật khẩu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_330",
    "stt": "330",
    "name": "📄 Thay đổi mật khẩu bác sỹ",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_331",
    "stt": "331",
    "name": "📄 Truy vấn thông tin theo người dùng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_332",
    "stt": "332",
    "name": "📄 Quản lý cơ sở dữ liệu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_333",
    "stt": "333",
    "name": "📄 Sao lưu số liệu",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_334",
    "stt": "334",
    "name": "📄 Tạo lại số liệu tháng năm",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_335",
    "stt": "335",
    "name": "📄 Nhật ký người dùng",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_336",
    "stt": "336",
    "name": "📄 Chỉnh sửa ICD10",
    "isFolder": false,
    "depth": 1
  },
  {
    "id": "item_337",
    "stt": "337",
    "name": "📁 Khác",
    "isFolder": true,
    "depth": 1
  },
  {
    "id": "item_338",
    "stt": "338",
    "name": "📄 Loại phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_339",
    "stt": "339",
    "name": "📄 Phòng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_340",
    "stt": "340",
    "name": "📄 Giường",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_341",
    "stt": "341",
    "name": "📄 Kết xuất thông tin lỗi của hệ thống",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_342",
    "stt": "342",
    "name": "📄 Gửi thông tin qua mạng nội bộ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_343",
    "stt": "343",
    "name": "📄 Hình nền",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_344",
    "stt": "344",
    "name": "📄 Thông báo qua mạng nội bộ",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_345",
    "stt": "345",
    "name": "📄 Cập nhật ICD10",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_346",
    "stt": "346",
    "name": "📄 Phân loại triệu chứng lâm sàng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_347",
    "stt": "347",
    "name": "📄 Triệu chứng lâm sàng",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_348",
    "stt": "348",
    "name": "📄 Danh mục",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_349",
    "stt": "349",
    "name": "📄 Danh mục đơn vị đăng ký khám sức khỏe",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_350",
    "stt": "350",
    "name": "📄 Giá trị mặc nhiên khám sức khỏe",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_351",
    "stt": "351",
    "name": "📄 Danh mục theo dõi tiền sử bệnh",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_352",
    "stt": "352",
    "name": "📄 Chuyển danh mục số thẻ bảo hiểm",
    "isFolder": false,
    "depth": 2
  },
  {
    "id": "item_353",
    "stt": "353",
    "name": "📄 Log Off trinasoft",
    "isFolder": false,
    "depth": 1
  }
];

// 4. Lớp Quản Lý Lưu Trữ (TinaDataStore)
class TinaDataStore {
  static STORAGE_KEY = 'tina_pqcn_evaluations_v5';

  static getEvaluations() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        const defaultRecords = this.getInitialSeedData();
        this.saveEvaluations(defaultRecords);
        return defaultRecords;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Lỗi LocalStorage:', e);
      return [];
    }
  }

  static saveEvaluations(records) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Lỗi ghi LocalStorage:', e);
    }
  }

  static saveOrUpdateEvaluation(record) {
    const records = this.getEvaluations();
    const existingIndex = records.findIndex(r => r.id === record.id);
    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.unshift(record);
    }
    this.saveEvaluations(records);
    return record;
  }

  static addEvaluation(record) {
    return this.saveOrUpdateEvaluation(record);
  }

  static deleteEvaluation(id) {
    let records = this.getEvaluations();
    records = records.filter(r => r.id !== id);
    this.saveEvaluations(records);
  }

  static clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // 5. Quy Tắc Tổng Hợp Kết Quả (Rule PQCN Aggregation)
  static getAggregatedResults(filteredRecords = null) {
    const records = filteredRecords || this.getEvaluations();
    const combinations = {};

    records.forEach(rec => {
      const comboKey = rec.department + ' || ' + rec.position + ' || ' + rec.title;
      if (!combinations[comboKey]) {
        combinations[comboKey] = {
          department: rec.department,
          position: rec.position,
          title: rec.title,
          evalCount: 0,
          lastUpdated: rec.createdAt,
          perms: {}
        };
      }

      combinations[comboKey].evalCount += 1;
      if (rec.createdAt > combinations[comboKey].lastUpdated) {
        combinations[comboKey].lastUpdated = rec.createdAt;
      }

      // Logic OR tổng hợp từng ô tích chọn
      Object.keys(rec.perms || {}).forEach(itemId => {
        if (!combinations[comboKey].perms[itemId]) {
          combinations[comboKey].perms[itemId] = { xem: false, nhap: false, xuat: false };
        }
        const p = rec.perms[itemId];
        if (p.xem) combinations[comboKey].perms[itemId].xem = true;
        if (p.nhap) combinations[comboKey].perms[itemId].nhap = true;
        if (p.xuat) combinations[comboKey].perms[itemId].xuat = true;
      });
    });

    return Object.values(combinations);
  }

  static getInitialSeedData() {
    return [];
  }
}

// 6. Tiện ích Toast Notification
class ToastManager {
  static show(message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'warning') iconClass = 'fa-exclamation-triangle';
    if (type === 'error') iconClass = 'fa-times-circle';

    toast.innerHTML = `
      <div class="toast-icon"><i class="fas ${iconClass}"></i></div>
      <div class="toast-body">
        ${title ? `<h4 class="toast-title">${title}</h4>` : ''}
        <p class="toast-msg">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

// 7. Tiện ích Modal Dialog
class ModalManager {
  static open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Xóa thông báo lỗi trước đó nếu có
      const errMsgs = modal.querySelectorAll('[id$="-error"], [id$="-error-msg"]');
      errMsgs.forEach(el => el.style.display = 'none');

      // Tự động focus vào ô nhập mật khẩu hoặc input đầu tiên
      const focusTarget = () => {
        const input = modal.querySelector('input[type="password"], input[type="text"]:not([readonly]):not([disabled]), input:not([type="hidden"]):not([readonly]):not([disabled]), select:not([disabled]), textarea:not([disabled])');
        if (input) {
          input.focus();
          if (typeof input.select === 'function') {
            input.select();
          }
        }
      };

      focusTarget();
      requestAnimationFrame(focusTarget);
      setTimeout(focusTarget, 50);
      setTimeout(focusTarget, 150);
    }
  }

  static close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// 8. Tiện ích Xuất CSV / JSON / Excel Đa Sheet
class Exporter {
  static colToLetter(colIndex) {
    let temp = '';
    let letter = '';
    while (colIndex > 0) {
      temp = (colIndex - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      colIndex = Math.floor((colIndex - temp - 1) / 26);
    }
    return letter;
  }

  // 1. Định dạng ô phân quyền theo phong cách nút Pill & thêm Data Validation Dropdown
  static applyPillCell(cell, type, isActive) {
    cell.alignment = { horizontal: 'center', vertical: 'middle' };

    if (type === 'xem') {
      cell.dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Xem, —"']
      };
      if (isActive) {
        cell.value = 'Xem';
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF15803D' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF86EFAC' } },
          bottom: { style: 'thin', color: { argb: 'FF86EFAC' } },
          left: { style: 'thin', color: { argb: 'FF86EFAC' } },
          right: { style: 'thin', color: { argb: 'FF86EFAC' } }
        };
      } else {
        cell.value = '—';
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FFCBD5E1' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      }
    } else if (type === 'nhap') {
      cell.dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Nhập, —"']
      };
      if (isActive) {
        cell.value = 'Nhập';
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFB45309' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFFCD34D' } },
          bottom: { style: 'thin', color: { argb: 'FFFCD34D' } },
          left: { style: 'thin', color: { argb: 'FFFCD34D' } },
          right: { style: 'thin', color: { argb: 'FFFCD34D' } }
        };
      } else {
        cell.value = '—';
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FFCBD5E1' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      }
    } else if (type === 'xuat') {
      cell.dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Xuất báo cáo, —"']
      };
      if (isActive) {
        cell.value = 'Xuất báo cáo';
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFB91C1C' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFFCA5A5' } },
          bottom: { style: 'thin', color: { argb: 'FFFCA5A5' } },
          left: { style: 'thin', color: { argb: 'FFFCA5A5' } },
          right: { style: 'thin', color: { argb: 'FFFCA5A5' } }
        };
      } else {
        cell.value = '—';
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FFCBD5E1' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      }
    }
  }

  // 2. Tô màu tên chức năng theo thứ tự ưu tiên: 1. Xuất báo cáo (Đỏ) -> 2. Nhập (Vàng) -> 3. Xem (Xanh lá)
  static applyFunctionNameCell(cell, hasXuat, hasNhap, hasXem) {
    cell.alignment = { vertical: 'middle' };
    if (hasXuat) {
      cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFDC2626' } };
    } else if (hasNhap) {
      cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFD97706' } };
    } else if (hasXem) {
      cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF16A34A' } };
    } else {
      cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF0F172A' } };
    }
  }

  // 3. Tự động áp dụng Định dạng có điều kiện (Conditional Formatting) trong Excel để khi chọn thì nút sáng lên
  static applyWorksheetConditionalFormatting(ws, totalRows, numCombos) {
    if (!ws || typeof ws.addConditionalFormatting !== 'function' || numCombos <= 0) return;

    try {
      const maxColIndex = 2 + numCombos * 3;
      const lastColLetter = this.colToLetter(maxColIndex);

      // Quy tắc cho các ô phân quyền C3:XX354
      ws.addConditionalFormatting({
        ref: `C3:${lastColLetter}${totalRows}`,
        rules: [
          {
            type: 'cellIs',
            operator: 'equal',
            formulae: ['"Xem"'],
            style: {
              fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFDCFCE7' }, fgColor: { argb: 'FFDCFCE7' } },
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF15803D' } },
              border: {
                top: { style: 'thin', color: { argb: 'FF86EFAC' } },
                bottom: { style: 'thin', color: { argb: 'FF86EFAC' } },
                left: { style: 'thin', color: { argb: 'FF86EFAC' } },
                right: { style: 'thin', color: { argb: 'FF86EFAC' } }
              }
            }
          },
          {
            type: 'cellIs',
            operator: 'equal',
            formulae: ['"Nhập"'],
            style: {
              fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFEF3C7' }, fgColor: { argb: 'FFFEF3C7' } },
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFB45309' } },
              border: {
                top: { style: 'thin', color: { argb: 'FFFCD34D' } },
                bottom: { style: 'thin', color: { argb: 'FFFCD34D' } },
                left: { style: 'thin', color: { argb: 'FFFCD34D' } },
                right: { style: 'thin', color: { argb: 'FFFCD34D' } }
              }
            }
          },
          {
            type: 'cellIs',
            operator: 'equal',
            formulae: ['"Xuất báo cáo"'],
            style: {
              fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFEE2E2' }, fgColor: { argb: 'FFFEE2E2' } },
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFB91C1C' } },
              border: {
                top: { style: 'thin', color: { argb: 'FFFCA5A5' } },
                bottom: { style: 'thin', color: { argb: 'FFFCA5A5' } },
                left: { style: 'thin', color: { argb: 'FFFCA5A5' } },
                right: { style: 'thin', color: { argb: 'FFFCA5A5' } }
              }
            }
          },
          {
            type: 'cellIs',
            operator: 'equal',
            formulae: ['"—"'],
            style: {
              fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFFFFF' }, fgColor: { argb: 'FFFFFFFF' } },
              font: { name: 'Segoe UI', size: 9.5, color: { argb: 'FFCBD5E1' } },
              border: {
                top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
              }
            }
          }
        ]
      });

      // Quy tắc đổi màu tự động cho Tên Chức Năng (Cột B)
      const xemCols = [];
      const nhapCols = [];
      const xuatCols = [];

      for (let i = 0; i < numCombos; i++) {
        xemCols.push('$' + this.colToLetter(3 + i * 3) + '3');
        nhapCols.push('$' + this.colToLetter(3 + i * 3 + 1) + '3');
        xuatCols.push('$' + this.colToLetter(3 + i * 3 + 2) + '3');
      }

      ws.addConditionalFormatting({
        ref: `B3:B${totalRows}`,
        rules: [
          {
            type: 'expression',
            formulae: [`OR(${xuatCols.map(c => `${c}="Xuất báo cáo"`).join(',')})`],
            style: {
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFDC2626' } }
            }
          },
          {
            type: 'expression',
            formulae: [`OR(${nhapCols.map(c => `${c}="Nhập"`).join(',')})`],
            style: {
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFD97706' } }
            }
          },
          {
            type: 'expression',
            formulae: [`OR(${xemCols.map(c => `${c}="Xem"`).join(',')})`],
            style: {
              font: { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF16A34A' } }
            }
          }
        ]
      });
    } catch (e) {
      console.warn('Lỗi thiết lập Conditional Formatting:', e);
    }
  }

  static exportJSON(data, filename = 'Tina_Soft_Phan_Quyen_PQCN.json') {
    const str = JSON.stringify(data, null, 2);
    const blob = new Blob([str], { type: 'application/json' });
    this.download(blob, filename);
  }

  static exportAggregatedCSV(aggregatedList, filename = 'Data_Tong_Hop_Phan_Quyen_Tina.csv') {
    const headers = ['STT', 'Tên Chức Năng', 'Khoa Phòng / Đơn Vị', 'Vị Trí', 'Chức Vụ', 'Số Lượt Đánh Giá', 'Xem (View)', 'Nhập Liệu (Input)', 'Xuất Báo Cáo (Export)'];
    const rows = [];

    aggregatedList.forEach(item => {
      TREE_DATA.forEach(node => {
        if (!node.isFolder) {
          const p = (item.perms && item.perms[node.id]) ? item.perms[node.id] : { xem: false, nhap: false, xuat: false };
          rows.push([
            '"' + node.stt + '"',
            '"' + node.name.replaceAll('"', '""') + '"',
            '"' + item.department + '"',
            '"' + item.position + '"',
            '"' + item.title + '"',
            '"' + item.evalCount + '"',
            '"' + (p.xem ? 'Xem' : '') + '"',
            '"' + (p.nhap ? 'Nhập' : '') + '"',
            '"' + (p.xuat ? 'Xuất báo cáo' : '') + '"'
          ]);
        }
      });
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'application/json' });
    this.download(blob, filename);
  }

  /**
   * FILE 1: Xuất file Excel ma trận nhiều Sheet theo KHOA/PHÒNG (Dữ liệu tổng hợp PQCN)
   * Tên file mặc định: Phan_quyen_theo_khoa_phong.xlsx
   */
  static async exportDeptExcel(filename = 'Phan_quyen_theo_khoa_phong.xlsx') {
    if (typeof ExcelJS === 'undefined') {
      ToastManager.show('Thư viện ExcelJS đang được tải. Đang tải định dạng CSV dự phòng...', 'warning');
      this.exportAggregatedCSV(TinaDataStore.getAggregatedResults());
      return false;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Tina Soft Hub';
      workbook.created = new Date();

      const aggregatedResults = TinaDataStore.getAggregatedResults();

      // Gom nhóm các tổ hợp theo Khoa/Phòng
      const deptsMap = {};

      // Tạo các khoa từ danh mục chuẩn trước
      KHOA_PHONG_LIST.forEach(dept => {
        deptsMap[dept] = [];
      });

      // Bổ sung các tổ hợp thực tế từ kết quả đánh giá
      aggregatedResults.forEach(item => {
        if (!deptsMap[item.department]) {
          deptsMap[item.department] = [];
        }
        const exists = deptsMap[item.department].some(c => c.position === item.position && c.title === item.title);
        if (!exists) {
          deptsMap[item.department].push(item);
        } else {
          const idx = deptsMap[item.department].findIndex(c => c.position === item.position && c.title === item.title);
          deptsMap[item.department][idx] = item;
        }
      });

      const deptNames = Object.keys(deptsMap);

      deptNames.forEach(deptName => {
        let combos = deptsMap[deptName] || [];

        // Nếu khoa này chưa có đánh giá nào, khởi tạo danh sách tổ hợp chuẩn để sẵn sàng biểu mẫu
        if (combos.length === 0) {
          VI_TRI_LIST.forEach(pos => {
            CHUC_VU_LIST.forEach(title => {
              combos.push({
                department: deptName,
                position: pos,
                title: title,
                evalCount: 0,
                perms: {}
              });
            });
          });
        }

        // Tên Sheet hợp lệ trong Excel: tối đa 31 ký tự, không chứa ký tự cấm: \ / ? * : [ ]
        let safeSheetName = deptName
          .replace(/[\/\\?*:[\]]/g, '_')
          .substring(0, 31);

        let sheetName = safeSheetName;
        let counter = 1;
        while (workbook.getWorksheet(sheetName)) {
          sheetName = safeSheetName.substring(0, 27) + `_${counter}`;
          counter++;
        }

        const ws = workbook.addWorksheet(sheetName, {
          views: [{ showGridLines: true, state: 'frozen', xSplit: 2, ySplit: 2 }]
        });

        // 1. Cấu hình độ rộng các cột
        const colConfigs = [
          { key: 'stt', width: 8 },
          { key: 'name', width: 48 }
        ];

        combos.forEach((c, idx) => {
          colConfigs.push({ key: `c_${idx}_xem`, width: 11 });
          colConfigs.push({ key: `c_${idx}_nhap`, width: 13 });
          colConfigs.push({ key: `c_${idx}_xuat`, width: 15 });
        });
        ws.columns = colConfigs;

        // 2. Dòng 1: Header cấp 1 (Tên tổ hợp gộp 3 ô ngang)
        ws.mergeCells('A1:B1');
        const cellA1 = ws.getCell('A1');
        cellA1.value = deptName.toUpperCase();
        cellA1.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FF1E293B' } };
        cellA1.alignment = { horizontal: 'center', vertical: 'middle' };
        cellA1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };

        combos.forEach((c, idx) => {
          const startCol = 3 + idx * 3;
          const endCol = startCol + 2;
          ws.mergeCells(1, startCol, 1, endCol);

          const cellCombo = ws.getCell(1, startCol);
          cellCombo.value = `${c.department}\n${c.position} - ${c.title}`;
          cellCombo.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0F172A' } };
          cellCombo.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cellCombo.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        });
        ws.getRow(1).height = 42;

        // 3. Dòng 2: Header cấp 2 (STT, Tên chức năng / Phân cấp, Xem, Nhập liệu, Xuất báo cáo)
        const row2 = ws.getRow(2);
        row2.height = 26;

        const cellA2 = ws.getCell('A2');
        cellA2.value = 'STT';
        cellA2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cellA2.alignment = { horizontal: 'center', vertical: 'middle' };
        cellA2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

        const cellB2 = ws.getCell('B2');
        cellB2.value = 'Tên chức năng / Phân cấp';
        cellB2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cellB2.alignment = { horizontal: 'left', vertical: 'middle' };
        cellB2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

        combos.forEach((c, idx) => {
          const startCol = 3 + idx * 3;

          const cellXem = ws.getCell(2, startCol);
          cellXem.value = 'Xem';
          cellXem.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellXem.alignment = { horizontal: 'center', vertical: 'middle' };
          cellXem.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

          const cellNhap = ws.getCell(2, startCol + 1);
          cellNhap.value = 'Nhập liệu';
          cellNhap.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellNhap.alignment = { horizontal: 'center', vertical: 'middle' };
          cellNhap.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

          const cellXuat = ws.getCell(2, startCol + 2);
          cellXuat.value = 'Xuất báo cáo';
          cellXuat.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellXuat.alignment = { horizontal: 'center', vertical: 'middle' };
          cellXuat.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
        });

        // 4. Data Rows (Toàn bộ 353 chức năng TREE_DATA)
        TREE_DATA.forEach(node => {
          const rowData = [];
          rowData[1] = node.stt;
          const indent = '    '.repeat(node.depth || 0);
          rowData[2] = indent + node.name;

          combos.forEach((c, idx) => {
            const startCol = 3 + idx * 3;
            if (node.isFolder) {
              rowData[startCol] = '';
              rowData[startCol + 1] = '';
              rowData[startCol + 2] = '';
            } else {
              const p = (c.perms && c.perms[node.id]) ? c.perms[node.id] : { xem: false, nhap: false, xuat: false };
              rowData[startCol] = p.xem ? 'Xem' : '—';
              rowData[startCol + 1] = p.nhap ? 'Nhập' : '—';
              rowData[startCol + 2] = p.xuat ? 'Xuất báo cáo' : '—';
            }
          });

          const addedRow = ws.addRow(rowData);
          addedRow.height = node.isFolder ? 22 : 21;

          if (node.isFolder) {
            addedRow.eachCell({ includeEmpty: true }, (cell) => {
              cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E293B' } };
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
              cell.border = {
                top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
              };
            });
          } else {
            addedRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
            addedRow.getCell(1).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF64748B' } };
            addedRow.getCell(1).border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };

            let hasXuat = false;
            let hasNhap = false;
            let hasXem = false;

            combos.forEach(c => {
              const p = (c.perms && c.perms[node.id]) ? c.perms[node.id] : { xem: false, nhap: false, xuat: false };
              if (p.xuat) hasXuat = true;
              if (p.nhap) hasNhap = true;
              if (p.xem) hasXem = true;
            });

            const cell2 = addedRow.getCell(2);
            Exporter.applyFunctionNameCell(cell2, hasXuat, hasNhap, hasXem);
            cell2.border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };

            combos.forEach((c, idx) => {
              const startCol = 3 + idx * 3;
              const p = (c.perms && c.perms[node.id]) ? c.perms[node.id] : { xem: false, nhap: false, xuat: false };
              Exporter.applyPillCell(addedRow.getCell(startCol), 'xem', !!p.xem);
              Exporter.applyPillCell(addedRow.getCell(startCol + 1), 'nhap', !!p.nhap);
              Exporter.applyPillCell(addedRow.getCell(startCol + 2), 'xuat', !!p.xuat);
            });
          }
        });

        // 5. Đường kẻ viền Headers
        [1, 2].forEach(rowNum => {
          ws.getRow(rowNum).eachCell({ includeEmpty: true }, cell => {
            cell.border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };
          });
        });

        // 6. Áp dụng Conditional Formatting động cho toàn bộ bảng tính
        Exporter.applyWorksheetConditionalFormatting(ws, TREE_DATA.length + 2, combos.length);
      });

      // 7. Xuất ra file Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      this.download(blob, filename);
      return true;
    } catch (err) {
      console.error('Lỗi khi xuất file Excel theo khoa phòng:', err);
      ToastManager.show('Lỗi khi xuất file Excel: ' + err.message, 'error');
      return false;
    }
  }

  // Giữ alias tương thích
  static async exportMatrixExcel(filename = 'Phan_quyen_theo_khoa_phong.xlsx') {
    return this.exportDeptExcel(filename);
  }

  /**
   * FILE 2: Xuất file Excel ghi nhận từng lượt theo CÁ NHÂN
   * Tên file mặc định: Phan_quyen_theo_ca_nhan.xlsx
   * - Mỗi Sheet là 1 Khoa/Phòng
   * - Mỗi tổ hợp (Khoa - Vị trí - Chức vụ - Người thực hiện) chiếm 1 cụm gồm 3 cột (Xem | Nhập liệu | Xuất báo cáo)
   * - Sắp xếp: Cùng tổ hợp (Khoa - Vị trí - Chức vụ) thì xếp liền kề nhau
   *   VD: Khoa Sản - BS - Nhân viên - BS Tá xếp gần Khoa Sản - BS - Nhân viên - BS An
   */
  static async exportPersonalExcel(filename = 'Phan_quyen_theo_ca_nhan.xlsx') {
    if (typeof ExcelJS === 'undefined') {
      ToastManager.show('Thư viện ExcelJS đang được tải. Vui lòng thử lại sau giây lát...', 'warning');
      return false;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Tina Soft Hub';
      workbook.created = new Date();

      const allEvaluations = TinaDataStore.getEvaluations();
      if (!allEvaluations || allEvaluations.length === 0) {
        ToastManager.show('Chưa có dữ liệu đánh giá cá nhân nào trong hệ thống!', 'warning', 'Chưa Có Dữ Liệu');
        return false;
      }

      // Gom nhóm các lượt đánh giá theo Khoa/Phòng
      const deptsMap = {};
      KHOA_PHONG_LIST.forEach(dept => {
        deptsMap[dept] = [];
      });

      allEvaluations.forEach(rec => {
        const dept = rec.department || 'Khác';
        if (!deptsMap[dept]) {
          deptsMap[dept] = [];
        }
        deptsMap[dept].push(rec);
      });

      const deptNames = Object.keys(deptsMap);

      deptNames.forEach(deptName => {
        const records = deptsMap[deptName] || [];
        if (records.length === 0) return; // Bỏ qua khoa chưa có lượt đánh giá nào

        // QUY TẮC SẮP XẾP CỘT: Cùng tổ hợp Khoa - Vị trí - Chức vụ thì xếp gần nhau
        records.sort((a, b) => {
          const posCompare = (a.position || '').localeCompare(b.position || '', 'vi');
          if (posCompare !== 0) return posCompare;
          const titleCompare = (a.title || '').localeCompare(b.title || '', 'vi');
          if (titleCompare !== 0) return titleCompare;
          const evalCompare = (a.evaluator || '').localeCompare(b.evaluator || '', 'vi');
          if (evalCompare !== 0) return evalCompare;
          return (a.createdAt || '').localeCompare(b.createdAt || '');
        });

        // Tên sheet an toàn
        let safeSheetName = deptName
          .replace(/[\/\\?*:[\]]/g, '_')
          .substring(0, 31);

        let sheetName = safeSheetName;
        let counter = 1;
        while (workbook.getWorksheet(sheetName)) {
          sheetName = safeSheetName.substring(0, 27) + `_${counter}`;
          counter++;
        }

        const ws = workbook.addWorksheet(sheetName, {
          views: [{ showGridLines: true, state: 'frozen', xSplit: 2, ySplit: 2 }]
        });

        // 1. Cấu hình Cột
        const colConfigs = [
          { key: 'stt', width: 8 },
          { key: 'name', width: 48 }
        ];

        records.forEach((r, idx) => {
          colConfigs.push({ key: `r_${idx}_xem`, width: 11 });
          colConfigs.push({ key: `r_${idx}_nhap`, width: 13 });
          colConfigs.push({ key: `r_${idx}_xuat`, width: 15 });
        });
        ws.columns = colConfigs;

        // 2. Dòng 1: Header cấp 1 (Khoa - Vị trí - Chức vụ - Người thực hiện)
        ws.mergeCells('A1:B1');
        const cellA1 = ws.getCell('A1');
        cellA1.value = deptName.toUpperCase();
        cellA1.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FF1E293B' } };
        cellA1.alignment = { horizontal: 'center', vertical: 'middle' };
        cellA1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };

        records.forEach((r, idx) => {
          const startCol = 3 + idx * 3;
          const endCol = startCol + 2;
          ws.mergeCells(1, startCol, 1, endCol);

          const cellHeader = ws.getCell(1, startCol);
          cellHeader.value = `${r.department}\n${r.position} - ${r.title}\n${r.evaluator || 'N/A'}`;
          cellHeader.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0F172A' } };
          cellHeader.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cellHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        });
        ws.getRow(1).height = 46;

        // 3. Dòng 2: Header cấp 2 (STT, Tên chức năng / Phân cấp, Xem, Nhập liệu, Xuất báo cáo)
        const row2 = ws.getRow(2);
        row2.height = 26;

        const cellA2 = ws.getCell('A2');
        cellA2.value = 'STT';
        cellA2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cellA2.alignment = { horizontal: 'center', vertical: 'middle' };
        cellA2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

        const cellB2 = ws.getCell('B2');
        cellB2.value = 'Tên chức năng / Phân cấp';
        cellB2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cellB2.alignment = { horizontal: 'left', vertical: 'middle' };
        cellB2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

        records.forEach((r, idx) => {
          const startCol = 3 + idx * 3;

          const cellXem = ws.getCell(2, startCol);
          cellXem.value = 'Xem';
          cellXem.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellXem.alignment = { horizontal: 'center', vertical: 'middle' };
          cellXem.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

          const cellNhap = ws.getCell(2, startCol + 1);
          cellNhap.value = 'Nhập liệu';
          cellNhap.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellNhap.alignment = { horizontal: 'center', vertical: 'middle' };
          cellNhap.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

          const cellXuat = ws.getCell(2, startCol + 2);
          cellXuat.value = 'Xuất báo cáo';
          cellXuat.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
          cellXuat.alignment = { horizontal: 'center', vertical: 'middle' };
          cellXuat.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
        });

        // 4. Data Rows (Toàn bộ 353 chức năng TREE_DATA)
        TREE_DATA.forEach(node => {
          const rowData = [];
          rowData[1] = node.stt;
          const indent = '    '.repeat(node.depth || 0);
          rowData[2] = indent + node.name;

          records.forEach((r, idx) => {
            const startCol = 3 + idx * 3;
            if (node.isFolder) {
              rowData[startCol] = '';
              rowData[startCol + 1] = '';
              rowData[startCol + 2] = '';
            } else {
              const p = (r.perms && r.perms[node.id]) ? r.perms[node.id] : { xem: false, nhap: false, xuat: false };
              rowData[startCol] = p.xem ? 'Xem' : '—';
              rowData[startCol + 1] = p.nhap ? 'Nhập' : '—';
              rowData[startCol + 2] = p.xuat ? 'Xuất báo cáo' : '—';
            }
          });

          const addedRow = ws.addRow(rowData);
          addedRow.height = node.isFolder ? 22 : 21;

          if (node.isFolder) {
            addedRow.eachCell({ includeEmpty: true }, (cell) => {
              cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E293B' } };
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
              cell.border = {
                top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
                right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
              };
            });
          } else {
            addedRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
            addedRow.getCell(1).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF64748B' } };
            addedRow.getCell(1).border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };

            let hasXuat = false;
            let hasNhap = false;
            let hasXem = false;

            records.forEach(r => {
              const p = (r.perms && r.perms[node.id]) ? r.perms[node.id] : { xem: false, nhap: false, xuat: false };
              if (p.xuat) hasXuat = true;
              if (p.nhap) hasNhap = true;
              if (p.xem) hasXem = true;
            });

            const cell2 = addedRow.getCell(2);
            Exporter.applyFunctionNameCell(cell2, hasXuat, hasNhap, hasXem);
            cell2.border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };

            records.forEach((r, idx) => {
              const startCol = 3 + idx * 3;
              const p = (r.perms && r.perms[node.id]) ? r.perms[node.id] : { xem: false, nhap: false, xuat: false };
              Exporter.applyPillCell(addedRow.getCell(startCol), 'xem', !!p.xem);
              Exporter.applyPillCell(addedRow.getCell(startCol + 1), 'nhap', !!p.nhap);
              Exporter.applyPillCell(addedRow.getCell(startCol + 2), 'xuat', !!p.xuat);
            });
          }
        });

        // 5. Viền Borders Headers
        [1, 2].forEach(rowNum => {
          ws.getRow(rowNum).eachCell({ includeEmpty: true }, cell => {
            cell.border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };
          });
        });

        // 6. Áp dụng Conditional Formatting động
        Exporter.applyWorksheetConditionalFormatting(ws, TREE_DATA.length + 2, records.length);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      this.download(blob, filename);
      return true;
    } catch (err) {
      console.error('Lỗi khi xuất file Excel theo cá nhân:', err);
      ToastManager.show('Lỗi khi xuất file Excel: ' + err.message, 'error');
      return false;
    }
  }

  /**
   * Xuất file Excel cho DUY NHẤT 1 lượt đánh giá theo Mã Đánh Giá (ID)
   */
  static async exportSingleEvaluationExcel(evalId) {
    if (typeof ExcelJS === 'undefined') {
      ToastManager.show('Thư viện ExcelJS đang được tải. Vui lòng thử lại...', 'warning');
      return false;
    }

    const allEvaluations = TinaDataStore.getEvaluations();
    const rec = allEvaluations.find(r => r.id === evalId);
    if (!rec) {
      ToastManager.show(`Không tìm thấy dữ liệu lượt đánh giá [${evalId}]!`, 'error');
      return false;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Tina Soft Hub';
      workbook.created = new Date();

      let sheetName = (rec.department || 'Phan_Quyen')
        .replace(/[\/\\?*:[\]]/g, '_')
        .substring(0, 31);

      const ws = workbook.addWorksheet(sheetName, {
        views: [{ showGridLines: true, state: 'frozen', xSplit: 2, ySplit: 2 }]
      });

      ws.columns = [
        { key: 'stt', width: 8 },
        { key: 'name', width: 48 },
        { key: 'xem', width: 12 },
        { key: 'nhap', width: 14 },
        { key: 'xuat', width: 16 }
      ];

      // Row 1
      ws.mergeCells('A1:B1');
      const cellA1 = ws.getCell('A1');
      cellA1.value = (rec.department || 'ĐƠN VỊ').toUpperCase();
      cellA1.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FF1E293B' } };
      cellA1.alignment = { horizontal: 'center', vertical: 'middle' };
      cellA1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };

      ws.mergeCells('C1:E1');
      const cellHeader = ws.getCell('C1');
      cellHeader.value = `${rec.department}\n${rec.position} - ${rec.title}\n${rec.evaluator || 'N/A'} (${rec.id})`;
      cellHeader.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0F172A' } };
      cellHeader.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cellHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
      ws.getRow(1).height = 46;

      // Row 2
      const row2 = ws.getRow(2);
      row2.height = 26;

      const cellA2 = ws.getCell('A2');
      cellA2.value = 'STT';
      cellA2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cellA2.alignment = { horizontal: 'center', vertical: 'middle' };
      cellA2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

      const cellB2 = ws.getCell('B2');
      cellB2.value = 'Tên chức năng / Phân cấp';
      cellB2.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cellB2.alignment = { horizontal: 'left', vertical: 'middle' };
      cellB2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };

      ['Xem', 'Nhập liệu', 'Xuất báo cáo'].forEach((colTitle, i) => {
        const cell = ws.getCell(2, 3 + i);
        cell.value = colTitle;
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
      });

      // Data Rows
      TREE_DATA.forEach(node => {
        const rowData = [];
        rowData[1] = node.stt;
        const indent = '    '.repeat(node.depth || 0);
        rowData[2] = indent + node.name;

        if (node.isFolder) {
          rowData[3] = '';
          rowData[4] = '';
          rowData[5] = '';
        } else {
          const p = (rec.perms && rec.perms[node.id]) ? rec.perms[node.id] : { xem: false, nhap: false, xuat: false };
          rowData[3] = p.xem ? 'Xem' : '—';
          rowData[4] = p.nhap ? 'Nhập' : '—';
          rowData[5] = p.xuat ? 'Xuất báo cáo' : '—';
        }

        const addedRow = ws.addRow(rowData);
        addedRow.height = node.isFolder ? 22 : 21;

        if (node.isFolder) {
          addedRow.eachCell({ includeEmpty: true }, (cell) => {
            cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E293B' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
            cell.border = {
              top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
              right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
            };
          });
        } else {
          addedRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
          addedRow.getCell(1).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF64748B' } };
          addedRow.getCell(1).border = {
            top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
          };

          const p = (rec.perms && rec.perms[node.id]) ? rec.perms[node.id] : { xem: false, nhap: false, xuat: false };
          const cell2 = addedRow.getCell(2);
          Exporter.applyFunctionNameCell(cell2, !!p.xuat, !!p.nhap, !!p.xem);
          cell2.border = {
            top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
          };

          Exporter.applyPillCell(addedRow.getCell(3), 'xem', !!p.xem);
          Exporter.applyPillCell(addedRow.getCell(4), 'nhap', !!p.nhap);
          Exporter.applyPillCell(addedRow.getCell(5), 'xuat', !!p.xuat);
        }
      });

      // Borders Headers
      [1, 2].forEach(rowNum => {
        ws.getRow(rowNum).eachCell({ includeEmpty: true }, cell => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
          };
        });
      });

      // Áp dụng Conditional Formatting động
      Exporter.applyWorksheetConditionalFormatting(ws, TREE_DATA.length + 2, 1);

      const cleanEvaluator = (rec.evaluator || 'Ca_nhan').replace(/[\s\/\\?*:[\]]/g, '_');
      const filename = `Phan_quyen_${rec.id}_${cleanEvaluator}.xlsx`;

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      this.download(blob, filename);
      return true;
    } catch (err) {
      console.error('Lỗi khi xuất file Excel cho cá nhân:', err);
      ToastManager.show('Lỗi khi xuất file Excel: ' + err.message, 'error');
      return false;
    }
  }

  static download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

