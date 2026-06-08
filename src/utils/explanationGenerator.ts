/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VNUQuestion, VNU_TOPICS } from '../vnu1001_questions';

export interface DetailedOptionBreakdown {
  letter: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface DetailedExplanationResult {
  correctReason: string;
  optionsList: DetailedOptionBreakdown[];
  eliminationTips: string[];
}

/**
 * Dynamically analyzes a question and drafts a comprehensive Vietnam educational guide,
 * breaking down all 4 answers and providing specific elimination mechanics.
 */
export function getDetailedExplanation(q: VNUQuestion): DetailedExplanationResult {
  const letters = ["A", "B", "C", "D"];
  const correctIdx = q.correctOption;
  const coreExpl = q.explanation || "Theo giáo trình Nhập môn Công nghệ số chuẩn ĐHQG.";

  // 1. Correct option rationale
  let correctReasonText = `Đáp án ${letters[correctIdx]} đúng vì: ${coreExpl} Phương án này thể hiện đúng nguyên lý khoa học máy tính và quy trình kỹ thuật tiêu chuẩn được hướng dẫn trực tiếp trong bài học.`;

  // 2. Options breakdown with context-aware, customized rationale
  const optionsList: DetailedOptionBreakdown[] = q.options.map((opt, idx) => {
    const isCorrect = idx === correctIdx;
    const letter = letters[idx];
    let rationale = "";

    if (isCorrect) {
      rationale = `ĐÁP ÁN CHÍNH XÁC. Khớp hoàn toàn với cơ sở lý thuyết và giải quyết triệt để nhu cầu kỹ thuật/an toàn của đề bài.`;
    } else {
      // Find customized rationale based on keyword analysis of the option text
      const textLower = opt.toLowerCase();
      const qLower = q.questionText.toLowerCase();

      if (textLower.includes("máy sấy") || textLower.includes("sấy tóc") || textLower.includes("hơi nóng")) {
        rationale = `LOẠI TRỪ: Sấy nóng bằng máy sấy tóc cực kỳ nguy hiểm. Nhiệt độ cao có thể làm biến dạng các mối nối, co nhựa, rỉ sét mạch, và luồng gió mạnh sẽ càng đẩy nước thấm sâu hơn vào các khe hẹp của bo mạch chủ.`;
      } else if (textLower.includes("bật nguồn") || textLower.includes("kiểm tra nguồn") || textLower.includes("cắm sạc") || textLower.includes("mở nguồn")) {
        rationale = `LOẠI TRỪ: Đây là sai lầm chết người khi thiết bị dính nước. Việc cấp điện (qua pin hoặc sạc) vào bo mạch đang ẩm sẽ kích hoạt phản ứng đoản mạch điện cực ngay lập tức, phá hoại vĩnh viễn các linh kiện bán dẫn và IC điều khiển.`;
      } else if (textLower.includes("chỉ cần") || textLower.includes("chỉ gồm") || textLower.includes("duy nhất")) {
        rationale = `LOẠI TRỪ (Mẹo nhận diện nhiễu): Lựa chọn mang tính phiến diện và cực đoan. Công nghệ số là một hệ thống phối hợp đa tầng, việc quy nạp chỉ cần duy nhất một yếu tố hoặc một bước đơn lẻ thường là dấu hiệu của đáp án sai lỗi logic.`;
      } else if (textLower.includes("bluetooth") && (qLower.includes("wifi") || qLower.includes("mạng") || qLower.includes("lan"))) {
        rationale = `LOẠI TRỪ: Bluetooth là giao thức kết nối cá nhân không dây cự ly cực ngắn (PAN) với băng thông rất hạn hẹp và độ trễ cao, hoàn toàn không đáp ứng khả năng truyền tải dữ liệu hoặc mở rộng mạng LAN tốc độ cao ổn định.`;
      } else if (textLower.includes("chậu nước") || textLower.includes("đặt chậu")) {
        rationale = `LOẠI TRỪ: Mẹo dân gian phản khoa học, không có bất chấp cơ sở vật lý nào chứng minh việc đặt chậu nước giúp tăng sóng Wi-Fi, thậm chí tăng độ ẩm trong phòng dễ gây rỉ sét cổng kết nối.`;
      } else if (textLower.includes("im lặng") || textLower.includes("nhịn") || textLower.includes("bỏ qua")) {
        rationale = `LOẠI TRỪ: Thể hiện thái độ thụ động, thiếu bảo vệ quyền lợi học tập số chính đáng. Luật bản quyền số và quy chế học đường đòi hỏi sự phản hồi minh bạch, thu thập chứng cứ để tự bảo vệ tác phẩm gốc.`;
      } else if (textLower.includes("bôi nhọ") || textLower.includes("mạng xã hội") || textLower.includes("chia sẻ lên mạng") || textLower.includes("trả đũa")) {
        rationale = `LOẠI TRỪ: Vi phạm quy định đạo đức số và pháp luật mạng (Luật An ninh mạng). Việc tự ý bêu rếu người khác sẽ chuyển từ vị trí nạn nhân thành người vi phạm pháp lý ứng xử trực tuyến.`;
      } else if (textLower.includes("hdd") && (textLower.includes("chậm") || qLower.includes("mượt") || qLower.includes("nhanh"))) {
        rationale = `LOẠI TRỪ: Ổ cứng cơ học HDD sử dụng phiến đĩa quay truyền thống có tốc độ đọc ghi IOPS vô cùng chậm (chỉ khoảng 80-120 MB/s), đóng vai trò "nút cổ chai" làm máy tính cấu hình cao vẫn giật lag nghiêm trọng.`;
      } else if (textLower.includes("không thể") || textLower.includes("không bao giờ") || textLower.includes("không giải quyết")) {
        rationale = `LOẠI TRỪ: Phát ngôn mang tính khẳng định phủ định lỗi thời. Hầu như mọi bài toán công nghiệp hoặc nhu cầu hệ thống đều có giải pháp cài đặt cấu hình hoặc kiến trúc thay thế tối ưu hơn.`;
      } else if (textLower.includes("gửi mail") || textLower.includes("gửi email") || textLower.includes("đính kèm email")) {
        rationale = `LOẠI TRỪ: Giao thức mail bị giới hạn dung lượng đính kèm (thường chỉ 25MB) và thiếu tính năng đồng bộ hóa thời gian thực, phân quyền thư mục trực tiếp, không phù hợp cho hạ tầng lưu trữ làm việc nhóm.`;
      } else if (textLower.includes("máy mới") || textLower.includes("nâng cấp toàn bộ") || textLower.includes("vứt bỏ") || textLower.includes("mua máy")) {
        rationale = `LOẠI TRỪ: Cách tiếp cận lãng phí tiền bạc, thiếu đi tư duy phân tích kỹ thuật và tối ưu bài toán kinh tế phần cứng còn giá trị sử dụng.`;
      } else {
        // Fallback option rationale based on option index to create diversity
        const indexTemplates = [
          `LOẠI TRỪ: Đây là phương án đánh lừa (distractor). Phương án này tuy có vẻ có lý nhưng thực chất lại vi phạm các nguyên lý mạng, thiết kế thuật toán, hoặc tiến trình vận hành an toàn bảo mật chuẩn hệ thống.`,
          `LOẠI TRỪ: Phương án sai về mặt bản chất kỹ thuật. Lựa chọn này sử dụng sai thuật ngữ hoặc không giải quyết được trực tiếp yêu cầu hóc búa của đề bài, có thể dẫn tới tắc nghẽn tài nguyên phần cứng.`,
          `LOẠI TRỪ: Đây là cách giải quyết thụ động hoặc không đồng bộ, dễ tạo ra kẽ hở bảo mật hoặc không tối ưu hóa được hiệu suất tổng thể của thiết bị máy tính văn phòng.`
        ];
        rationale = indexTemplates[(idx + idx * q.questionText.length) % indexTemplates.length];
      }
    }

    return {
      letter,
      text: opt,
      isCorrect,
      rationale
    };
  });

  // Calculate customized elimination tips
  const eliminationTips: string[] = [];

  // Tip 1: Target identifying the topic
  eliminationTips.push(`**Phân tích từ khóa**: Xác định rõ từ khóa chính của câu hỏi liên quan đến kiến thức "${VNU_TOPICS[q.topicId - 1] || 'Công nghệ số'}".`);

  // Tip 2: Look for extreme values or wrong tactics in options and recommend to exclude
  const extremeOption = q.options.find(opt => {
    const l = opt.toLowerCase();
    return l.includes("sấy") || l.includes("bật nguồn") || l.includes("chỉ cần") || l.includes("im lặng") || l.includes("bôi nhọ") || l.includes("mạng xã hội") || l.includes("đặt chậu");
  });

  if (extremeOption) {
    eliminationTips.push(`**Phương pháp loại bỏ nhanh**: Nhận diện ngay và gạch bỏ các phương án phản khoa học hoặc mang tính chất gây hư hỏng trực tiếp như *"${extremeOption}"*.`);
  } else {
    eliminationTips.push(`**Phương pháp loại bỏ nhanh**: Hãy lọc bỏ các phương án dùng các từ tuyệt đối ("luôn luôn", "chỉ có", "không thể") hoặc các phương án có giao thức lỗi thời không phù hợp mạng băng thông rộng.`);
  }

  // Tip 3: Rational comparison
  eliminationTips.push(`**Chốt đáp án chính xác**: So sánh giải pháp mang tính toàn diện, an toàn bảo mật cao và tiết kiệm hiệu năng nhất để chọn đáp án **${letters[correctIdx]}**.`);

  return {
    correctReason: correctReasonText,
    optionsList,
    eliminationTips
  };
}
