/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Compiled question database for VNU1001 - Introduction to Digital Literacy
 */

import { TOPIC_2_RAW } from "./vnu1001_topic2";
import { TOPIC_3_RAW } from "./vnu1001_topic3";
import { TOPIC_4_RAW } from "./vnu1001_topic4";
import { TOPIC_5_RAW } from "./vnu1001_topic5";
import { TOPIC_6_RAW } from "./vnu1001_topic6";

export interface VNUQuestion {
  id: string;
  topicId: number; // 1 to 6
  difficulty: 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';
  questionText: string;
  options: string[];
  correctOption: number; // 0-3
  explanation: string;
}

// Highly compact representation to fit optimal token limits
interface CompactQ {
  q: string;
  o: string[];
  c: number;
  e?: string;
  d?: string; // difficulty mapped
}

const TOPIC_1_RAW: CompactQ[] = [
  // A. NHẬN BIẾT (1-40)
  {
    q: "Dữ liệu (Data) là gì?",
    o: ["Thông tin đã được xử lý", "Các sự kiện, số liệu, ký hiệu thô chưa có ngữ cảnh", "Tri thức được tích lũy từ kinh nghiệm", "Kết quả của phân tích thống kê"],
    c: 1, e: "Dữ liệu thô, chưa có ngữ cảnh.", d: "nb"
  },
  {
    q: "Thông tin (Information) là gì?",
    o: ["Dữ liệu thô chưa xử lý", "Dữ liệu đã được xử lý, tổ chức và đặt trong ngữ cảnh cụ thể", "Sự hiểu biết sâu sắc có được từ trải nghiệm", "Tập hợp các quy tắc logic"],
    c: 1, e: "Thông tin là dữ liệu đã xử lý có nghĩa.", d: "nb"
  },
  {
    q: "Thành phần phần cứng nào được tối ưu hóa chuyên biệt để tăng tốc tác vụ AI?",
    o: ["HDD", "CPU", "NPU (Neural Processing Unit)", "RAM"],
    c: 2, e: "Neural Processing Unit cho AI.", d: "nb"
  },
  {
    q: "NPU thường được tích hợp trong loại sản phẩm nào?",
    o: ["Ổ cứng di động", "CPU hiện đại (Intel Core Ultra, AMD Ryzen AI)", "Bàn phím cơ", "Màn hình LCD"],
    c: 1, e: "CPU máy tính thế hệ mới.", d: "nb"
  },
  {
    q: "Khi máy tính thiếu RAM, hệ điều hành thực hiện cơ chế nào?",
    o: ["Tăng xung nhịp CPU", "Chuyển dữ liệu ít dùng từ RAM sang ổ cứng (swap file)", "Tự động xóa file tạm", "Ngắt kết nối mạng"],
    c: 1, e: "Sử dụng bộ nhớ ảo (swap) trên ổ cứng.", d: "nb"
  },
  {
    q: "Chuẩn RAM phổ biến nhất trên máy tính hiện nay (2025) là?",
    o: ["DDR3", "DDR4", "DDR5", "SDRAM"],
    c: 2, e: "DDR5 là chuẩn bộ nhớ nhanh và mới nhất.", d: "nb"
  },
  {
    q: "Loại ổ cứng nào có tốc độ đọc/ghi nhanh nhất hiện nay?",
    o: ["HDD 7200 RPM", "HDD 5400 RPM", "SSD SATA", "SSD NVMe"],
    c: 3, e: "SSD giao thức NVMe kết nối trực tiếp qua PCIe.", d: "nb"
  },
  {
    q: "Giao thức kết nối nào cho phép truyền dữ liệu tốc độ cao qua cổng USB‑C, có biểu tượng tia sét?",
    o: ["USB 2.0", "USB 3.2", "Thunderbolt", "HDMI"],
    c: 2, e: "Thunderbolt hỗ trợ tốc độ cực cao.", d: "nb"
  },
  {
    q: "Thiết bị nào sau đây là thiết bị đầu vào?",
    o: ["Màn hình", "Máy in", "Bàn phím", "Loa"],
    c: 2, e: "Bàn phím đưa ký tự vào máy.", d: "nb"
  },
  {
    q: "Thiết bị nào sau đây là thiết bị đầu ra?",
    o: ["Chuột", "Webcam", "Máy quét", "Màn hình"],
    c: 3, e: "Màn hình kết xuất kết quả hiển thị.", d: "nb"
  },
  {
    q: "Hệ điều hành nào sau đây không phải của Microsoft?",
    o: ["Windows 11", "Windows Server 2025", "macOS Sequoia", "MS‑DOS"],
    c: 2, e: "macOS của Apple.", d: "nb"
  },
  {
    q: "Hệ điều hành mã nguồn mở phổ biến trong giới lập trình viên là?",
    o: ["Windows", "macOS", "Linux (Ubuntu, Fedora)", "Chrome OS"],
    c: 2, e: "Linux là hệ điều hành mã nguồn mở.", d: "nb"
  },
  {
    q: "Giao diện người dùng đồ họa (GUI) sử dụng thành phần nào để tương tác?",
    o: ["Dòng lệnh", "Biểu tượng, cửa sổ, chuột", "Mã lệnh văn bản", "Công tắc vật lý"],
    c: 1, e: "GUI dùng hình ảnh sinh động tương tác.", d: "nb"
  },
  {
    q: "Để quản lý tệp tin và thư mục trên Windows, người dùng dùng ứng dụng nào?",
    o: ["Finder", "File Explorer", "Files (Nautilus)", "Terminal"],
    c: 1, e: "File Explorer quản lý tệp trên Windows.", d: "nb"
  },
  {
    q: "Định dạng tệp văn bản thuần túy, không định dạng, mở được trên mọi thiết bị là?",
    o: [".docx", ".pdf", ".txt", ".rtf"],
    c: 2, e: ".txt chỉ chứa văn bản thô.", d: "nb"
  },
  {
    q: "Định dạng tệp bảng tính của Microsoft Excel là?",
    o: [".docx", ".xlsx", ".pptx", ".accdb"],
    c: 1, e: "XLSX của Microsoft Excel.", d: "nb"
  },
  {
    q: "Định dạng tệp trình chiếu của Microsoft PowerPoint là?",
    o: [".xlsx", ".docx", ".pptx", ".pdf"],
    c: 2, e: "PPTX đại diện cho slide trình chiếu.", d: "nb"
  },
  {
    q: "Định dạng ảnh nén phổ biến, hỗ trợ nền trong suốt là?",
    o: [".jpg", ".bmp", ".png", ".gif"],
    c: 2, e: ".png hỗ trợ kênh alpha trong suốt.", d: "nb"
  },
  {
    q: "Định dạng video phổ biến nhất trên web và thiết bị di động là?",
    o: [".avi", ".mov", ".mp4", ".wmv"],
    c: 2, e: "MP4 là tiêu chuẩn nén video đa nền tảng.", d: "nb"
  },
  {
    q: "Định dạng âm thanh nén phổ biến cho nhạc số là?",
    o: [".wav", ".flac", ".mp3", ".aiff"],
    c: 2, e: "MP3 là định dạng nhạc nén rất phổ biến.", d: "nb"
  },
  {
    q: "Công nghệ kết nối không dây nào có phạm vi ngắn (vài cm) dùng để thanh toán không chạm?",
    o: ["Wi-Fi", "Bluetooth", "NFC", "Zigbee"],
    c: 2, e: "Near Field Communication (NFC).", d: "nb"
  },
  {
    q: "Phiên bản Wi-Fi mới nhất (2025) được chứng nhận là?",
    o: ["Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7"],
    c: 3, e: "Wi-Fi 7 (802.11be) là công nghệ mới nhất.", d: "nb"
  },
  {
    q: "Bluetooth phiên bản nào cải thiện độ ổn định và hiệu quả năng lượng cho tai nghe TWS?",
    o: ["Bluetooth 4.0", "Bluetooth 5.0", "Bluetooth 5.4", "Bluetooth 6.0"],
    c: 2, e: "Phiên bản Bluetooth 5.4 tối ưu định dạng thông minh âm thanh.", d: "nb"
  },
  {
    q: "Thiết bị ngoại vi nào giúp số hóa tài liệu giấy thành file PDF?",
    o: ["Webcam", "Máy in", "Máy quét (Scanner)", "Micro"],
    c: 2, e: "Máy quét/Scanner quét tài liệu giấy.", d: "nb"
  },
  {
    q: "Khi cần sao lưu dữ liệu quan trọng, thiết bị lưu trữ ngoài nào được khuyến nghị vì tốc độ cao?",
    o: ["USB 2.0", "Ổ cứng HDD di động", "Ổ cứng SSD di động", "Thẻ nhớ microSD class 10"],
    c: 2, e: "SSD di động cho tốc độ sấm sét, không sợ va đập.", d: "nb"
  },
  {
    q: "Phần mềm nào là bộ ứng dụng văn phòng miễn phí, mã nguồn mở?",
    o: ["Microsoft Office", "Google Workspace", "LibreOffice", "Apple iWork"],
    c: 2, e: "LibreOffice hoàn toàn miễn phí & mở.", d: "nb"
  },
  {
    q: "Trình duyệt web nào được phát triển bởi Google?",
    o: ["Firefox", "Safari", "Chrome", "Edge"],
    c: 2, e: "Google Chrome.", d: "nb"
  },
  {
    q: "Trình duyệt web mặc định trên thiết bị Apple là?",
    o: ["Chrome", "Firefox", "Safari", "Edge"],
    c: 2, e: "Safari được tích hợp sẵn trên iOS và macOS.", d: "nb"
  },
  {
    q: "Cổng kết nối HDMI dùng để?",
    o: ["Kết nối mạng", "Kết nối chuột", "Truyền tín hiệu âm thanh và hình ảnh", "Sạc pin"],
    c: 2, e: "HDMI kết nối xuất âm thanh hình ảnh độ nét cao.", d: "nb"
  },
  {
    q: "Loại máy tính nào có tính di động cao nhất?",
    o: ["Desktop", "Laptop", "Tablet", "Smartphone"],
    c: 3, e: "Điện thoại bỏ vừa ví/túi quần duy trì kết nối định vị.", d: "nb"
  },
  {
    q: "Thiết bị nào thường dùng màn hình mực điện tử (E‑ink) để đọc sách?",
    o: ["iPad", "Kindle", "Laptop", "Đồng hồ thông minh"],
    c: 1, e: "Kindle e-ink mô phỏng trang sách giấy chân thực.", d: "nb"
  },
  {
    q: "Đồng hồ thông minh (Smartwatch) thường có chức năng gì ngoài xem giờ?",
    o: ["Đo nhịp tim, theo dõi sức khỏe", "In tài liệu", "Quay phim chuyên nghiệp", "Kết nối HDMI"],
    c: 0, e: "Hỗ trợ định vị đếm bước chân đo nhịp tim.", d: "nb"
  },
  {
    q: "Giao thức mạng nào cho phép các thiết bị trong cùng một ngôi nhà kết nối với nhau?",
    o: ["WAN", "LAN", "Internet", "VPN"],
    c: 1, e: "Local Area Network (LAN) kết nối gia đình.", d: "nb"
  },
  {
    q: "Mạng diện rộng (WAN) khác LAN ở điểm chính nào?",
    o: ["Tốc độ nhanh hơn", "Phạm vi địa lý rộng hơn", "Chỉ dùng cáp quang", "Không có bảo mật"],
    c: 1, e: "WAN là Wide Area Network vượt qua ranh giới địa lý quốc gia.", d: "nb"
  },
  {
    q: "Để kết nối laptop với mạng có dây, cần cổng?",
    o: ["USB", "RJ45 (Ethernet)", "HDMI", "Audio jack"],
    c: 1, e: "Cổng RJ45 kết nối trực tiếp dây mạng LAN.", d: "nb"
  },
  {
    q: "Phần mềm nào giúp quản lý mật khẩu an toàn?",
    o: ["Notepad", "Bitwarden, LastPass", "Paint", "Calculator"],
    c: 1, e: "Sử dụng password manager chuyên nghiệp mã hóa đám mây.", d: "nb"
  },
  {
    q: "Xác thực hai yếu tố (2FA) thường sử dụng yếu tố thứ hai là gì?",
    o: ["Mật khẩu", "Mã OTP gửi qua SMS hoặc ứng dụng", "Địa chỉ IP", "Tên đăng nhập"],
    c: 1, e: "Mã OTP OTP tạo mã sử dụng một lần tăng cường kép.", d: "nb"
  },
  {
    q: "Khi kết nối Wi-Fi công cộng, nguy cơ lớn nhất là gì?",
    o: ["Pin nhanh hết", "Dữ liệu có thể bị đánh cắp qua mạng không mã hóa", "Tốc độ quá nhanh", "Màn hình bị cháy"],
    c: 1, e: "Mạng công cộng không mật khẩu dễ bị tin tặc nghe trộm.", d: "nb"
  },
  {
    q: "Để bảo vệ dữ liệu khi dùng Wi-Fi công cộng, nên sử dụng?",
    o: ["Trình duyệt Chrome", "VPN (Virtual Private Network)", "Phần mềm diệt virus", "Ổ cứng ngoài"],
    c: 1, e: "VPN mã hóa toàn bộ dữ liệu đi ra.", d: "nb"
  },
  {
    q: "Phần mềm diệt virus có chức năng chính là?",
    o: ["Tăng tốc máy tính", "Phát hiện và loại bỏ mã độc", "Soạn thảo văn bản", "Chỉnh sửa ảnh"],
    c: 1, e: "Antivirus cô lập và tiêu diệt tệp tin chứa mã độc.", d: "nb"
  },

  // B. THÔNG HIỂU (41-70)
  {
    q: "Tại sao máy tính cần cả RAM và ổ cứng?",
    o: ["RAM lưu trữ vĩnh viễn, ổ cứng lưu tạm", "RAM giữ dữ liệu đang xử lý để CPU truy cập nhanh, ổ cứng lưu lâu dài", "Cả hai đều làm nhiệm vụ như nhau", "Ổ cứng thay thế RAM khi hết"],
    c: 1, e: "RAM nhanh hơn ổ cứng nhưng bay hơi dữ liệu khi tắt nguồn.", d: "th"
  },
  {
    q: "Tại sao laptop có hiệu năng kém hơn desktop cùng cấu hình?",
    o: ["Vì laptop dùng CPU yếu hơn", "Vì giới hạn về tản nhiệt và công suất", "Vì laptop không có RAM", "Vì laptop dùng pin"],
    c: 1, e: "Môi trường nhỏ hẹp khiến laptop tự giảm xung để làm mát.", d: "th"
  },
  {
    q: "Vì sao SSD NVMe nhanh hơn SSD SATA?",
    o: ["NVMe dùng giao tiếp PCIe trực tiếp với CPU", "SATA bị giới hạn bởi cáp đồng", "NVMe có dung lượng lớn hơn", "SATA không hỗ trợ Windows"],
    c: 0, e: "PCIe mang băng thông băng tải gấp hàng chục lần SATA.", d: "th"
  },
  {
    q: "Giải thích tại sao nên tắt máy tính đúng cách thay vì rút điện trực tiếp?",
    o: ["Tránh hỏng ổ cứng và mất dữ liệu đang lưu", "Tiết kiệm điện", "Tăng tốc khởi động lần sau", "Tránh bị hack"],
    c: 0, e: "Đảm bảo các quy trình ghi đĩa và hoạt động hệ thống dừng an toàn.", d: "th"
  },
  {
    q: "Tại sao NPU giúp chạy AI hiệu quả hơn CPU?",
    o: ["Vì NPU có thể thực hiện hàng triệu phép tính ma trận song song với năng lượng thấp", "Vì NPU chạy ở tần số cao hơn", "Vì NPU có nhiều nhân hơn CPU", "Vì NPU dùng bộ nhớ riêng"],
    c: 0, e: "Cơ chế tính toán song song rẽ nhánh ma trận AI tối ưu năng lượng.", d: "th"
  },
  {
    q: "Tại sao máy tính chạy chậm khi mở nhiều tab trình duyệt?",
    o: ["Do CPU quá nóng", "Do mỗi tab chiếm một phần RAM, khi RAM đầy phải dùng swap chậm", "Do ổ cứng bị phân mảnh", "Do virus tấn công"],
    c: 1, e: "Khi RAM bị lấp đầy hoàn toàn, ổ cứng phải can thiệp làm trì trệ luồng.", d: "th"
  },
  {
    q: "Lợi ích chính của việc cập nhật hệ điều hành thường xuyên?",
    o: ["Có giao diện mới đẹp hơn", "Vá các lỗ hổng bảo mật và cải thiện hiệu năng", "Tăng dung lượng ổ cứng", "Giảm tiêu thụ điện"],
    c: 1, e: "Nhận các bản vá bảo mật giảm rủi ro zero-day vô hình.", d: "th"
  },
  {
    q: "Sự khác biệt giữa USB 2.0 và USB 3.0 là gì?",
    o: ["USB 3.0 có tốc độ nhanh hơn và thường có màu xanh bên trong", "USB 2.0 có thể sạc nhanh hơn", "USB 3.0 chỉ dùng cho chuột", "Không có khác biệt"],
    c: 0, e: "USB 3.0 tăng cổng sạc và dải băng thông vượt trội.", d: "th"
  },
  {
    q: "Tại sao màn hình cảm ứng trên điện thoại phản ứng nhanh hơn trên một số laptop?",
    o: ["Vì điện thoại dùng công nghệ điện dung nhạy hơn", "Vì laptop màn hình lớn hơn", "Vì điện thoại có pin tốt hơn", "Vì laptop dùng CPU yếu"],
    c: 0, e: "Cảm ứng điện dung lọc điện tích đầu ngón tay nhạy cực đại.", d: "th"
  },
  {
    q: "Khi nào nên sử dụng kết nối Ethernet thay vì Wi-Fi?",
    o: ["Khi cần độ ổn định cao, giảm độ trễ (chơi game, họp trực tuyến quan trọng)", "Khi cần di chuyển nhiều", "Khi không có ổ cắm điện", "Khi muốn tiết kiệm pin"],
    c: 0, e: "Cáp đồng trực tiếp chống nhiễu sóng từ môi trường tốt nhất.", d: "th"
  },
  {
    q: "Vì sao tản nhiệt quan trọng với máy tính?",
    o: ["Nhiệt độ cao làm giảm tuổi thọ và hiệu năng linh kiện", "Để máy nhẹ hơn", "Để tiết kiệm điện", "Để tăng dung lượng RAM"],
    c: 0, e: "Bảo vệ chip bán dẫn không bị quá nhiệt phá hỏng cấu trúc silicon.", d: "th"
  },
  {
    q: "Sự khác biệt giữa chip Intel Core i5 và i7 cùng thế hệ?",
    o: ["i7 thường có nhiều nhân, luồng hơn và cache lớn hơn", "i5 nhanh hơn i7", "i7 dùng cho đồ họa, i5 cho văn phòng", "Không khác biệt"],
    c: 0, e: "Cache cao và chu trình xử lý đa nhân của i7 mạnh mẽ vượt bậc.", d: "th"
  },
  {
    q: "Tại sao laptop gaming thường nặng hơn laptop văn phòng?",
    o: ["Vì có tản nhiệt lớn hơn, pin dung lượng cao, card rời", "Vì màn hình nhỏ hơn", "Vì dùng CPU yếu", "Vì không có bàn phím"],
    c: 0, e: "Hệ thống ống đồng tản nhiệt kép và bộ quạt kép chiếm trọng lượng lớn.", d: "th"
  },
  {
    q: "Ý nghĩa của chỉ số '3000:1' trên màn hình là gì?",
    o: ["Độ phân giải", "Tương phản (contrast ratio)", "Tần số quét", "Kích thước màn hình"],
    c: 1, e: "Biểu hiện độ chênh lệch ánh sáng cực đại giữa màu sáng nhất và tối nhất.", d: "th"
  },
  {
    q: "Tại sao một số laptop có thể gập làm đôi (2‑in‑1)?",
    o: ["Để dùng như máy tính bảng, tận dụng màn hình cảm ứng", "Để tiết kiệm pin", "Để chống nước", "Để tăng RAM"],
    c: 0, e: "Bản lề 360 độ quay để lật tối đa thiết kế sử dụng.", d: "th"
  },
  {
    q: "Vai trò của bo mạch chủ (mainboard) là gì?",
    o: ["Kết nối tất cả các thành phần phần cứng với nhau", "Lưu trữ dữ liệu lâu dài", "Xử lý đồ họa", "Cấp nguồn cho toàn bộ hệ thống"],
    c: 0, e: "Xương sống định tuyến tín hiệu cho toàn thể linh kiện phụ trợ.", d: "th"
  },
  {
    q: "Tại sao cần có cả RAM và bộ nhớ đệm (cache) trong CPU?",
    o: ["Cache nhanh hơn RAM nhưng dung lượng nhỏ, lưu dữ liệu thường dùng", "Cache lưu trữ vĩnh viễn", "RAM nhanh hơn cache", "Chúng giống hệt nhau"],
    c: 0, e: "Cache là bộ nhớ mượt và gia tốc siêu tốc nằm ngay sát nhân CPU.", d: "th"
  },
  {
    q: "Khi nào nên dùng máy tính bảng thay vì laptop?",
    o: ["Khi chỉ cần đọc sách, xem video, ghi chú đơn giản", "Khi cần chạy phần mềm nặng", "Khi cần bàn phím vật lý cố định", "Khi cần kết nối nhiều màn hình"],
    c: 0, e: "Gọn gàng tối giản, thời lượng dùng pin lâu phù hợp giải trí nhanh.", d: "th"
  },
  {
    q: "Giải thích lý do tại sao máy tính có thể chạy được cả ứng dụng 32-bit và 64-bit?",
    o: ["Nhờ hệ điều hành hỗ trợ môi trường tương thích (WoW64)", "Vì CPU 64-bit chạy được lệnh 32-bit", "Cả A và B", "Không thể chạy được"],
    c: 2, e: "Hỗ trợ phần cứng tương thích ngược và bộ thư viện dịch hệ điều hành.", d: "th"
  },
  {
    q: "Tại sao USB‑C đang dần thay thế các cổng khác?",
    o: ["Vì nhỏ gọn, có thể truyền dữ liệu, video, sạc cùng lúc", "Vì chỉ sạc được điện thoại", "Vì tốc độ chậm hơn USB‑A", "Vì không tương thích ngược"],
    c: 0, e: "USB Type-C hỗ trợ truyền tải vạn năng gọn nhẹ.", d: "th"
  },
  {
    q: "Sự khác biệt giữa RAM ECC và RAM thường?",
    o: ["ECC có khả năng tự phát hiện và sửa lỗi bit, dùng trong server", "ECC nhanh hơn", "ECC rẻ hơn", "Không khác biệt"],
    c: 0, e: "Sửa lỗi dữ liệu ngẫu nhiên Error-Correcting Code chống sập máy chủ.", d: "th"
  },
  {
    q: "Vì sao màn hình OLED cho màu đen sâu hơn màn hình LCD?",
    o: ["Vì mỗi pixel OLED tự phát sáng, có thể tắt hoàn toàn", "Vì OLED có độ phân giải cao hơn", "Vì LCD dùng đèn nền", "Vì OLED rẻ hơn"],
    c: 0, e: "OLED không dùng hệ thống đèn nền rọi sáng chèn màu.", d: "th"
  },
  {
    q: "Tại sao laptop mỏng nhẹ thường không có cổng RJ45?",
    o: ["Để tiết kiệm không gian, thay bằng adapter USB‑Ethernet", "Vì không cần mạng có dây", "Vì không hỗ trợ mạng", "Vì chỉ dùng Wi-Fi"],
    c: 0, e: "Thân máy mỏng hơn cả đầu cắm vuông RJ45.", d: "th"
  },
  {
    q: "Vai trò của CMOS battery trên mainboard?",
    o: ["Lưu cài đặt BIOS/UEFI và duy trì đồng hồ khi tắt nguồn", "Cấp nguồn cho CPU", "Tăng tốc khởi động", "Lưu dữ liệu người dùng"],
    c: 0, e: "Đảm bảo nguồn điện nhỏ sạc giữ chip lưu trữ thời gian thực.", d: "th"
  },
  {
    q: "Tại sao nên sử dụng mật khẩu dài trên 12 ký tự?",
    o: ["Vì thời gian brute‑force tăng theo cấp số nhân", "Vì hệ điều hành yêu cầu", "Vì dễ nhớ hơn", "Vì không thể bị lộ"],
    c: 0, e: "Độ muối bảo mật phức tạp làm tê liệt các hệ thống phá khóa siêu tốc.", d: "th"
  },
  {
    q: "Lợi ích của việc sử dụng đám mây (cloud storage) thay vì ổ cứng ngoài?",
    o: ["Truy cập mọi lúc mọi nơi, tự động đồng bộ", "Bảo mật tuyệt đối", "Miễn phí hoàn toàn", "Không cần mạng"],
    c: 0, e: "An tâm tuyệt đối khi bị hỏng hóc hoặc mất mát thiết bị vật lý.", d: "th"
  },
  {
    q: "Tại sao một số laptop có thể sạc qua cổng USB‑C?",
    o: ["Vì USB‑C hỗ trợ USB Power Delivery (PD)", "Vì có pin đặc biệt", "Vì dùng dây sạc riêng", "Vì không cần nguồn"],
    c: 0, e: "Hỗ trợ sạc đa nguồn thông minh chuẩn PD công suất lớn.", d: "th"
  },
  {
    q: "Sự khác biệt giữa UEFI và BIOS?",
    o: ["UEFI hiện đại hơn, hỗ trợ ổ cứng lớn hơn 2TB, giao diện đồ họa", "BIOS nhanh hơn", "UEFI không có bảo mật", "BIOS dùng cho Windows mới"],
    c: 0, e: "Giao thức hiện đại nạp nhanh và khởi động mượt hơn.", d: "th"
  },
  {
    q: "Vì sao máy tính cần được vệ sinh bụi định kỳ?",
    o: ["Bụi làm tắc tản nhiệt, gây nóng và giảm tuổi thọ", "Để máy đẹp hơn", "Để tăng dung lượng RAM", "Để tránh sét đánh"],
    c: 0, e: "Lớp bụi cản không khí lưu thông gây hầm nóng giữ nhiệt phá hủy vi mạch.", d: "th"
  },
  {
    q: "Tại sao card đồ họa rời (discrete GPU) cần có quạt riêng?",
    o: ["Vì GPU tạo nhiều nhiệt khi xử lý đồ họa nặng", "Vì GPU không có tản nhiệt", "Để tạo tiếng ồn", "Để tiết kiệm điện"],
    c: 0, e: "Mức điện bóng bán dẫn tiêu thụ của GPU rời rất cao.", d: "th"
  },

  // C. VẬN DỤNG (71-90)
  {
    q: "Bạn là sinh viên năm nhất, cần mua máy tính để học lập trình, sử dụng máy ảo, thiết kế đồ họa nhẹ. Ngân sách 15 triệu. Nên chọn cấu hình nào?",
    o: ["Intel Celeron, 4GB RAM, HDD 500GB", "Intel Core i5, 16GB RAM, SSD 512GB, không card rời", "Intel Core i7, 32GB RAM, SSD 1TB, RTX 4060 (không đủ tiền)", "Tablet Android 8GB RAM"],
    c: 1, e: "Intel Core i5, 16GB RAM, SSD là phương án kinh tế hiệu năng cao hàng đầu.", d: "vd"
  },
  {
    q: "Laptop của bạn chỉ có 8GB RAM nhưng cần chạy nhiều tab Chrome và phần mềm SPSS. Làm thế nào để cải thiện bài học?",
    o: ["Nâng cấp lên 16GB RAM nếu được", "Giảm số tab, tắt ứng dụng không cần", "Tăng dung lượng swap file trên SSD", "Tất cả các phương án trên"],
    c: 3, e: "Tất cả biện pháp tối ưu phối kết hợp cải thiện dung lượng tệp ảo và tiết giảm.", d: "vd"
  },
  {
    q: "Bạn cần truyền file 200GB từ laptop sang máy tính bàn. Cách nhanh nhất là?",
    o: ["Qua Bluetooth", "Qua USB 2.0", "Dùng ổ cứng SSD di động USB 3.2 Gen 2", "Gửi qua email"],
    c: 2, e: "SSD di động mang tốc độ vượt bậc so với các giải pháp khác.", d: "vd"
  },
  {
    q: "Trong phòng họp, máy chiếu chỉ có cổng VGA, laptop chỉ có HDMI. Cần gì?",
    o: ["Adapter HDMI to VGA", "Cáp HDMI to HDMI", "Dùng Wi-Fi chiếu màn hình", "Mua máy chiếu mới"],
    c: 0, e: "Dùng adapter chuyển mạch thông minh tín hiệu HDMI số sang VGA tương tự.", d: "vd"
  },
  {
    q: "Bạn quên sạc laptop, pin còn 10% nhưng cần hoàn thành bài tập trong 2 giờ. Hành động tối ưu?",
    o: ["Bật chế độ tiết kiệm pin, giảm độ sáng màn hình, tắt Wi-Fi nếu không cần", "Mở tất cả ứng dụng để làm nhanh", "Cắm sạc dù không có ổ cắm", "Khởi động lại máy"],
    c: 0, e: "Giảm phụ tải tiêu hao linh kiện tối đa kéo dài thời lượng pin.", d: "vd"
  },
  {
    q: "Bạn muốn mua một ổ cứng di động 1TB để sao lưu. Nên chọn HDD hay SSD?",
    o: ["HDD rẻ hơn, đủ dùng nếu không cần tốc độ cao", "SSD nhanh hơn, bền hơn, nhưng đắt hơn", "Còn phụ thuộc vào ngân sách và nhu cầu", "Tất cả đều đúng"],
    c: 3, e: "Lựa chọn kinh tế ổ đĩa cơ HDD hoặc đầu tư bền chắc bằng SSD.", d: "vd"
  },
  {
    q: "Khi cài Windows mới, bạn nên backup những gì trước?",
    o: ["Dữ liệu trong thư mục Documents, Desktop, Downloads", "File cài đặt phần mềm", "Ổ cứng toàn bộ nếu có thể", "Cả A và C"],
    c: 3, e: "Bảo đảm trích lục đầy đủ dữ liệu người dùng lẫn hệ thống cục bộ.", d: "vd"
  },
  {
    q: "Bạn vô tình xóa một file quan trọng khỏi Recycle Bin. Cách nào có thể khôi phục?",
    o: ["Dùng phần mềm khôi phục dữ liệu như Recuva", "Không thể khôi phục", "Chờ Windows tự phục hồi", "Cài lại hệ điều hành"],
    c: 0, e: "Đĩa cứng chưa ghi đè hoàn toàn, phần mềm phục hồi vẫn quét được block.", d: "vd"
  },
  {
    q: "Bạn nhận được email từ 'giảng viên' yêu cầu cung cấp mật khẩu tài khoản trường để xác thực. Hành động nào đúng?",
    o: ["Lập tức cung cấp vì đó là giảng viên", "Không cung cấp, kiểm tra lại địa chỉ email và liên hệ trực tiếp giảng viên", "Gửi mật khẩu qua tin nhắn", "Bỏ qua vì không quan trọng"],
    c: 1, e: "Cảnh giác cao độ với tất cả email lừa đảo mạo danh cấu trúc phishing.", d: "vd"
  },
  {
    q: "Bạn muốn kết nối laptop với TV để xem phim. Các phương án khả thi?",
    o: ["HDMI", "Chromecast (Wi-Fi)", "Miracast (không dây)", "Tất cả các phương án"],
    c: 3, e: "Có thể truyền tải bằng vô số cách có dây lẫn giao tiếp không dây lực lượng.", d: "vd"
  },
  {
    q: "Trong khi học trực tuyến, micro của bạn bị nhiễu tiếng ồn. Giải pháp nhanh nhất?",
    o: ["Tắt micro khi không nói", "Dùng phần mềm lọc tiếng ồn (Krisp, RTX Voice)", "Mua micro mới", "Cả A và B"],
    c: 3, e: "Giải quyết can thiệp từ hành vi đến phần mềm chống nhiễu.", d: "vd"
  },
  {
    q: "Máy tính báo lỗi 'Boot device not found'. Nguyên nhân có thể?",
    o: ["Ổ cứng hỏng hoặc không được nhận", "Hệ điều hành bị hỏng bootloader", "Cáp ổ cứng lỏng", "Tất cả các nguyên nhân trên"],
    c: 3, e: "Xem xét tổng hợp từ hư hại bo mạch, dây cáp đến phần mềm khởi động.", d: "vd"
  },
  {
    q: "Bạn cần mua một chiếc laptop cho mẹ chỉ để lướt web, xem phim, nghe nhạc. Nên chọn?",
    o: ["Laptop gaming cao cấp", "Chromebook hoặc laptop tầm trung cấu hình thấp", "Máy trạm đồ họa", "Máy chủ"],
    c: 1, e: "Kế hoạch mua sắm tiết kiệm, tối ưu cho nhu cầu cơ bản nhất.", d: "vd"
  },
  {
    q: "Khi cắm USB vào máy tính, Windows yêu cầu format trước khi dùng. Điều đó có nghĩa?",
    o: ["USB bị hỏng vật lý", "USB chưa được định dạng hệ thống tệp (FAT32/NTFS)", "USB có virus", "USB quá chậm"],
    c: 1, e: "Hệ thống tệp (File system) lạ hoặc bị mất cấu trúc định hình đầu.", d: "vd"
  },
  {
    q: "Bạn muốn tăng tốc laptop cũ chỉ có HDD. Nâng cấp nào hiệu quả nhất?",
    o: ["Thay HDD bằng SSD", "Thêm RAM", "Thay CPU", "Cài lại Windows"],
    c: 0, e: "SSD cải thiện tốc độ ghi vọt hẳn tăng thời gian phản hồi máy.", d: "vd"
  },
  {
    q: "Laptop của bạn bị rơi nước. Hành động đầu tiên?",
    o: ["Bật nguồn kiểm tra", "Sấy bằng máy sấy tóc", "Tắt nguồn ngay, tháo pin, để khô tự nhiên ít nhất 24h", "Cắm sạc"],
    c: 2, e: "Ngắt cấp điện lập tức để tránh đoản mạch chập chip.", d: "vd"
  },
  {
    q: "Bạn muốn chia sẻ một thư mục trên mạng LAN để các máy khác đọc. Cần làm gì?",
    o: ["Bật File and Printer Sharing, phân quyền thư mục", "Gửi file qua email", "Copy ra USB", "Dùng Bluetooth"],
    c: 0, e: "Dùng tính năng mạng chia sẻ thư viện dùng chung nội bộ.", d: "vd"
  },
  {
    q: "Bạn quên mật khẩu đăng nhập Windows. Cách nào có thể lấy lại?",
    o: ["Dùng đĩa reset mật khẩu hoặc tài khoản Microsoft để khôi phục", "Cài lại Windows", "Mua máy mới", "Gọi cứu hộ"],
    c: 0, e: "Nhờ giải pháp khôi phục tài khoản mây hoặc ổ đĩa cứu hộ.", d: "vd"
  },
  {
    q: "Bạn cần kiểm tra xem máy tính có bao nhiêu khe RAM còn trống. Làm thế nào?",
    o: ["Mở Task Manager → Performance → Memory", "Dùng CPU‑Z hoặc mở nắp laptop", "Cả A và B đều có thể", "Không thể kiểm tra"],
    c: 2, e: "Thông tin hiển thị qua Windows Task Manager hoặc xem vật lý.", d: "vd"
  },
  {
    q: "Tại sao máy tính chạy Windows lâu ngày thường chậm dần?",
    o: ["Do nhiều phần mềm khởi động cùng Windows, file tạm tích tụ", "Do CPU bị lão hóa", "Do ổ cứng đầy không có chỗ", "Cả A và C"],
    c: 3, e: "Quá nhiều rác rưởi bộ đệm và dịch vụ chạy ngầm chiếm tài nguyên.", d: "vd"
  },

  // D. VẬN DỤNG CAO (91-100)
  {
    q: "Bạn có một máy tính để bàn cũ (2015) với ổ HDD, 4GB RAM DDR3, CPU Intel Core i3. Làm thế nào để tái sử dụng máy này chạy mượt cho học tập văn phòng?",
    o: ["Nâng cấp lên SSD, thêm RAM lên 8GB, cài Windows 10/11 bản nhẹ hoặc Linux", "Vứt bỏ mua mới", "Ép xung CPU", "Gắn thêm card đồ họa rời"],
    c: 0, e: "Sự phối hợp tăng RAM và ổ cứng thể rắn giúp hồi sinh ngoạn mục PC cũ.", d: "vdc"
  },
  {
    q: "Bạn thiết kế một hệ thống máy tính cho phòng lab AI. Ngân sách lớn. Cấu hình nào tối ưu nhất cho training deep learning?",
    o: ["CPU i9, 64GB RAM, 2x GPU NVIDIA RTX 4090, SSD NVMe 2TB, nguồn 1500W", "MacBook Pro M3 Max", "Laptop gaming RTX 4060", "Raspberry Pi cluster"],
    c: 0, e: "Dual GPU cực khủng tối ưu hàng ngàn nhân CUDA và nhân Tensor để học mô hình deep learning.", d: "vdc"
  },
  {
    q: "Bạn đang ở nước ngoài, laptop hỏng nguồn. Ổ cứng bên trong còn dữ liệu quan trọng. Làm thế nào để lấy dữ liệu?",
    o: ["Tháo ổ cứng ra, dùng cáp adapter USB to SATA/NVMe để kết nối với máy khác", "Cắm sạc lại", "Dùng Bluetooth", "Không thể lấy được"],
    c: 0, e: "Rút ổ cứng cắm làm ổ đĩa di động là phương án tối ưu.", d: "vdc"
  },
  {
    q: "Bạn cần cài hai hệ điều hành Windows và Linux trên cùng một máy. Phương án nào an toàn, chuyên nghiệp?",
    o: ["Cài Windows trước, thu nhỏ phân vùng, cài Linux vào phân vùng trống, dùng GRUB bootloader", "Cài Linux trước, cài Windows sau, sẽ tự động dual boot", "Dùng máy ảo", "Cả A và C đều đúng, tùy nhu cầu"],
    c: 3, e: "Có thể tạo cấu hình song song chính thống dual boot hoặc chạy máy ảo hoàn hảo.", d: "vdc"
  },
  {
    q: "Máy tính báo lỗi 'CPU fan error' và tắt sau vài giây. Nguyên nhân và cách xử lý?",
    o: ["Quạt CPU hỏng hoặc cắm sai chân, cần thay hoặc cắm lại", "Nhiệt độ CPU quá cao do tản nhiệt kém", "Cả A và B", "Lỗi mainboard"],
    c: 2, e: "Hệ thống tự ngắt xung chống hỏng hóc nhiệt năng chết dở silicon.", d: "vdc"
  },
  {
    q: "Bạn muốn xây dựng một máy tính mini để chạy server gia đình (file, media, web). Nên chọn nền tảng nào?",
    o: ["Raspberry Pi 5", "Intel NUC", "Máy tính cũ nâng cấp", "Tất cả đều khả thi, tùy ngân sách"],
    c: 3, e: "Bất kỳ phần cứng nào khả dụng đều có thể cấu hình sưởi ấm lưu trữ.", d: "vdc"
  },
  {
    q: "Bạn có ổ cứng SSD NVMe 1TB muốn chia làm 2 ổ C (300GB) và D (700GB). Làm thế nào?",
    o: ["Dùng Disk Management trong Windows, shrink volume C, tạo phân vùng mới", "Dùng lệnh diskpart", "Cài lại Windows", "Cả A và B"],
    c: 3, e: "Sử dụng trực tiếp các ứng dụng định dạng phân chia ổ của Windows.", d: "vdc"
  },
  {
    q: "Khi cắm USB 3.0 vào cổng USB 3.0 nhưng tốc độ chỉ đạt 40MB/s thay vì 400MB/s. Nguyên nhân?",
    o: ["USB không phải chuẩn 3.0 thật", "Driver USB chưa cài", "Ổ đích là HDD chậm", "Tất cả các nguyên nhân trên"],
    c: 3, e: "Ách tắc sụt giảm có thể phát sinh ở phần cứng đích hoặc thiếu tệp chuẩn driver.", d: "vdc"
  },
  {
    q: "Bạn muốn mua laptop để lập trình và chạy Docker, Kubernetes cục bộ. Yêu cầu tối thiểu?",
    o: ["16GB RAM, CPU 4 nhân, SSD 256GB", "8GB RAM", "2GB RAM", "HDD 1TB"],
    c: 0, e: "Docker ngốn ngầm RAM rất nặng cho các container mô phỏng.", d: "vdc"
  },
  {
    q: "Bạn vô tình cài phần mềm giả mạo dẫn đến mất toàn bộ file Word. Trước khi nhờ chuyên gia, bạn nên làm gì ngay?",
    o: ["Tắt máy ngay lập tức để tránh ghi đè dữ liệu", "Mở Word và thử lưu lại", "Cài lại Windows", "Format ổ cứng"],
    c: 0, e: "Tránh việc ổ đĩa liên tục ghi chép tệp mới đè lên vị trí tệp cũ vừa phục hồi.", d: "vdc"
  }
];

const TOPICS = [
  "MÁY TÍNH VÀ CÁC THIẾT BỊ NGOẠI VI",
  "KHAI THÁC DỮ LIỆU VÀ THÔNG TIN",
  "TỔNG QUAN VỀ TRÍ TUỆ NHÂN TẠO (AI)",
  "GIAO TIẾP VÀ HỢP TÁC TRONG MÔI TRƯỜNG SỐ",
  "SÁNG TẠO NỘI DUNG SỐ",
  "AN TOÀN VÀ LIÊM CHÍNH HỌC THUẬT TRONG MÔI TRƯỜNG SỐ"
];

// Generates high quality contextual questions deterministically
function generateTopicQuestions(topicId: number): VNUQuestion[] {
  let rawList: CompactQ[] = [];
  if (topicId === 1) {
    rawList = TOPIC_1_RAW;
  } else if (topicId === 2) {
    rawList = TOPIC_2_RAW;
  } else if (topicId === 3) {
    rawList = TOPIC_3_RAW;
  } else if (topicId === 4) {
    rawList = TOPIC_4_RAW;
  } else if (topicId === 5) {
    rawList = TOPIC_5_RAW;
  } else if (topicId === 6) {
    rawList = TOPIC_6_RAW;
  }

  return rawList.map((raw, idx) => ({
    id: `topic-${topicId}-q-${idx + 1}`,
    topicId,
    difficulty: raw.d === 'nb' ? 'nhan_biet' : raw.d === 'th' ? 'thong_hieu' : raw.d === 'vd' ? 'van_dung' : 'van_dung_cao',
    questionText: raw.q,
    options: raw.o,
    correctOption: raw.c,
    explanation: raw.e || "Đáp án chính xác được chứng minh qua tài liệu giảng dạy."
  }));
}

// Memory caching for the 6 topics questions database to guarantee exact 600 questions
let CACHED_DATABASE: VNUQuestion[] | null = null;

export function getFullVNU1001Database(): VNUQuestion[] {
  if (CACHED_DATABASE) return CACHED_DATABASE;

  const full: VNUQuestion[] = [];
  for (let tid = 1; tid <= 6; tid++) {
    full.push(...generateTopicQuestions(tid));
  }
  CACHED_DATABASE = full;
  return full;
}

export const VNU_TOPICS = TOPICS;
