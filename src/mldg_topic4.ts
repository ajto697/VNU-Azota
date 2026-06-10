export const MLDG_TOPIC_4_RAW = [
  // A. NHẬN BIẾT (1-30)
  {
    q: "Trong lý thuyết trắc nghiệm cổ điển (CTT), công thức tính độ khó (P) của một câu hỏi trắc nghiệm là gì (với R là số thí sinh trả lời đúng, N là tổng số thí sinh)?",
    o: ["P = N / R", "P = R / N", "P = R * N", "P = (R - N) / N"],
    c: 1,
    e: "✅ Định nghĩa độ khó P trong CTT là tỷ số giữa số thí sinh làm đúng (R) và tổng số thí sinh dự thi (N).",
    d: "nb"
  },
  {
    q: "Một câu hỏi trắc nghiệm có dải độ khó P = 0.15. Nhận định nào sau đây là chính xác nhất?",
    o: [
      "Câu hỏi rất khó, chỉ có 15% thí sinh trả lời đúng câu hỏi này.",
      "Câu hỏi rất dễ, 85% thí sinh trả lời đúng câu hỏi này.",
      "Câu hỏi có độ khó vừa phải, phân hóa lý tưởng.",
      "Câu hỏi bị lỗi in ấn đề thi nhầm chỗ đáp án."
    ],
    c: 0,
    e: "✅ P nhỏ gần 0 tức là câu hỏi rất khó, đa số học viên bị vấp ngã sai lầm.",
    d: "nb"
  },
  {
    q: "Đối với bài thi tham chiếu nhóm chuẩn (Norm-referenced test), độ khó các câu hỏi nên phân bố chủ yếu ở khoảng nào?",
    o: ["Từ 0.0 đến 0.2", "Từ 0.8 đến 1.0", "Từ 0.3 đến 0.7", "Bằng đúng giá trị tuyệt đối 1.0"],
    c: 2,
    e: "✅ Nhóm chuẩn thi xếp hạng cần các câu hỏi có dải độ khó quanh mức trung vị 0.5 (khoảng từ 0.3 đến 0.7) để giãn cách dải điểm tối đa.",
    d: "nb"
  },
  {
    q: "Trong công thức tính hệ số tương quan điểm hai phím (Point-biserial), đại lượng 'Mp' đại diện cho yếu tố nào?",
    o: [
      "Điểm trung bình của nhóm thí sinh trả lời sai đáp án đó.",
      "Điểm trung bình của toàn bài thi.",
      "Điểm trung bình của nhóm thí sinh trả lời đúng đáp án đó.",
      "Độ lệch chuẩn điểm số của bài kiểm tra."
    ],
    c: 2,
    e: "✅ Mp (Mean of p group) là điểm trung bình bài làm của nhóm những học sinh làm đúng câu đó.",
    d: "nb"
  },
  {
    q: "Độ phân biệt (Discrimination index - D) của câu hỏi được tính bằng công thức nào (với P_H là độ khó nhóm trên, P_L là độ khó nhóm dưới)?",
    o: ["D = P_H + P_L", "D = P_H * P_L", "D = P_L - P_H", "D = P_H - P_L"],
    c: 3,
    e: "✅ D = P_H - P_L. Phản ánh thuộc tính phân biệt: nhóm thông minh đạt đúng nhiều vượt bậc nhóm yếu kém.",
    d: "nb"
  },
  {
    q: "Tính toán chỉ số phân biệt D, Kelley (1939) khuyên nên phân chia tỷ lệ nhóm trên và nhóm dưới thế nào?",
    o: ["10% trên và 10% dưới.", "27% trên và 27% dưới đạt chuẩn tối ưu thống kê.", "50% trên và 50% dưới.", "33% trên và 33% dưới."],
    c: 1,
    e: "✅ Quy luật Kelley khẳng định tỷ lệ 27% ở mỗi đầu nhóm thắt chặt sự phân biệt đối lập tốt nhất, giảm nhiễu.",
    d: "nb"
  },
  {
    q: "Phân tích câu hỏi kiểm tra: độ phân biệt D = -0.20. Chỉ số âm này cảnh báo thảm họa gì?",
    o: [
      "Câu hỏi phân biệt xuất sắc vượt vĩ tuyến.",
      "Câu hỏi bình thường không có vấn đề gì.",
      "Học sinh yếu làm đúng nhiều hơn học sinh giỏi (phân biệt ngược), chứng tỏ câu hỏi bị lỗi bẫy sư phạm.",
      "Câu hỏi có độ khó cực dễ bẩm sinh."
    ],
    c: 2,
    e: "✅ D âm = Phân biệt ngược. Người học giỏi lại sai nhiều hơn người kém → đề thi có lỗi gài bẫy lừa lọc.",
    d: "nb"
  },
  {
    q: "Theo tiêu chuẩn đánh giá độ phân biệt (Bảng 4.3), câu hỏi kiểm tra có D = 0.15 nằm ở ranh giới nào?",
    o: ["Tốt", "Khá", "Cần sửa chữa hoặc loại bỏ nếu không thuộc chuẩn lõi.", "Loại bỏ ngay lập tức."],
    c: 2,
    e: "✅ D nằm trong dải 0.15 - 0.19 thuộc nhóm 'Marginal' (Ranh giới), cần sửa chữa nhiễu hoặc loại.",
    d: "nb"
  },
  {
    q: "Tính nhất quán, ổn định của kết quả KTĐG qua các lần đo khác nhau mô tả khái niệm nào?",
    o: ["Độ giá trị (Validity).", "Độ tin cậy (Reliability).", "Độ phân biệt câu hỏi.", "Độ bao phủ nội dung."],
    c: 1,
    e: "✅ Nhất quán, ổn định, chống nhiễu ngẫu nhiên là bản chất chuẩn mực của Độ tin cậy (Reliability).",
    d: "nb"
  },
  {
    q: "Hệ thống các phương pháp đo lường độ tin cậy cơ bản trong CTT KHÔNG bao gồm phép đo nào?",
    o: [
      "Phương pháp Thử nghiệm - Thử nghiệm lại (Test-retest).",
      "Phương pháp Biên soạn hai đề song song (Equivalent forms).",
      "Phương pháp Chia đôi bài thi (Split-half).",
      "Phương pháp Phân tích phương sai tối đa (Max-variance)."
    ],
    c: 3,
    e: "✅ Max-variance không phải là phương pháp ước tính độ tin cậy cơ bản trong giáo trình.",
    d: "nb"
  },
  {
    q: "Thực hành phương pháp Chia đôi bài thi (Split-half), quy chuẩn kinh điển để chia hai nửa tương đương là gì?",
    o: [
      "Chia nửa đầu và nửa cuối bài.",
      "Chia các câu chẵn thành 1 nửa, các câu lẻ thành 1 nửa để đảm bảo đồng đều đặc tính kỹ thuật.",
      "Chia ngẫu nhiên máy tính.",
      "Chia câu cực dễ vào một nửa, câu cực khó một nửa."
    ],
    c: 1,
    e: "✅ Chẵn - Lẻ (Odd-Even) phân đều dải khó tăng tính tương đương tối đa cho hai nửa bài thi.",
    d: "nb"
  },
  {
    q: "Chia đôi r và tính tương tương quan r của nửa đề xong, làm cách nào phóng đại để tính tin cậy toàn bộ đề gốc?",
    o: [
      "Sử dụng công thức hiệu chỉnh Spearman-Brown.",
      "Sử dụng công thức Kuder-Richardson.",
      "Dùng hệ số Point-biserial.",
      "Áp dụng phân phối r bình phương."
    ],
    c: 0,
    e: "✅ Công thức Spearman-Brown dùng để hiệu chỉnh kéo giãn tin cậy từ nửa bài lên cả bài có chiều dài n=2.",
    d: "nb"
  },
  {
    q: "Hệ số tin cậy hay dùng nhất cho các bài kiểm tra tự luận dải điểm rộng (Rubric có nhiều nấc) là gì?",
    o: ["Kuder-Richardson 20 (KR-20).", "Point-biserial rpbi.", "Hệ số Cronbach's Alpha.", "Hệ số tương quan Spearman r."],
    c: 2,
    e: "✅ Cronbach's Alpha dùng cho thang đo đa mức điểm (Multi-point), trong khi KR-20 giới hạn cho nhị phân (1/0).",
    d: "nb"
  },
  {
    q: "Thước đo mức độ trúng đích, đo đúng dòng phẩm chất/năng lực cần đo trả lời đặc tính nào?",
    o: ["Độ tin cậy.", "Độ giá trị (Validity).", "Độ khó bẩm sinh.", "Độ dài đề thi."],
    c: 1,
    e: "✅ Đo đúng cái cần đo chính là bản chất tối thượng của Độ giá trị (Validity).",
    d: "nb"
  },
  {
    q: "Xét xem đề thi có đại diện đầy đủ dòng nội dung tri thức và dải nhận thức của sách giáo khoa sờ chuẩn ở khía cạnh:",
    o: ["Độ giá trị cấu trúc.", "Độ giá trị đồng thời.", "Độ giá trị nội dung (Content validity).", "Độ giá trị dự báo."],
    c: 2,
    e: "✅ Đại diện bao quát dải kiến thức chương học môn học = Độ giá trị nội dung (Content validity).",
    d: "nb"
  },
  {
    q: "Dùng kết quả bài thi đại học hôm nay để tiên đoán học thuật thành bại của sinh viên sau 4 năm học đo lường:",
    o: ["Độ giá trị nội dung.", "Độ giá trị cấu trúc.", "Độ giá trị đồng thời.", "Độ giá trị dự đoán (Predictive validity)."],
    c: 3,
    e: "✅ Tiên báo, dự trắc kết quả ở tương lai chính là bản chất của độ giá trị dự đoán.",
    d: "nb"
  },
  {
    q: "Mối quan hệ toán học chặt chẽ giữa độ giá trị tối đa (V_max) và độ tin cậy (R) biểu thị qua:",
    o: ["V_max = R", "V_max = R bình phương", "V_max = căn bậc hai của R (sqrt(R))", "R = V_max * 100"],
    c: 2,
    e: "✅ Giáo trình ghi nhận công thức kinh điển V_max = sqrt(R). Tin cậy khóa trần giá trị tối đa đạt được.",
    d: "nb"
  },
  {
    q: "Lý thuyết phản hồi câu hỏi hiện đại IRT giải cứu ách tắc lớn nhất nào của CTT cổ điển?",
    o: [
      "IRT tính toán nhanh gọn thủ công.",
      "Sự phụ thuộc nặng nề của đặc tính câu hỏi vào mẫu thí sinh lựa chọn, mang lại tính bất biến (Invariance) năng lực.",
      "IRT không cần dùng tới mẫu thí sinh.",
      "Giúp đề thi luôn dễ cho học sinh đạt điểm cao."
    ],
    c: 1,
    e: "✅ Tính bất biến (Invariance) của IRT đảm bảo đặc tính đề (b, a) không bị lệch lẹo khi mang cho các nhóm thí sinh khác nhau thi.",
    d: "nb"
  },
  {
    q: "Trong mô hình Rasch danh tiếng (mô hình 1 tham số), tham số duy nhất của câu hỏi là gì?",
    o: ["Độ phân biệt (a).", "Hệ số đoán mò (c).", "Độ khó câu kiểm (b).", "Độ tin cậy tổng thể (r)."],
    c: 2,
    e: "✅ Mô hình Rasch (1PL) cố định độ dốc a=1, c=0, chỉ cho phép biến đổi tham số độ khó b.",
    d: "nb"
  },
  {
    q: "Hàm cong biểu diễn sự tương tác giữa trục ngang Năng lực (theta) và trục dọc Xác suất đúng câu hỏi trong IRT gọi là:",
    o: ["Bản ma trận trọng số đề.", "Đồ thị dải điểm số Gauss.", "Đường đặc trưng câu hỏi (ICC - Item Characteristic Curve).", "Hàm sai số đo lường chuẩn."],
    c: 2,
    e: "✅ ICC trực quan hóa xác suất làm đúng dựa trên thực tài năng lực học viên, linh hồn của IRT.",
    d: "nb"
  },

  // B. THÔNG HIỂU (21-50)
  {
    q: "Tại sao chỉ số phân biệt D bằng 0 chứng tỏ câu hỏi trắc nghiệm đó hoàn toàn vô giá trị trong đề thi nhóm chuẩn?",
    o: [
      "Vì câu hỏi đó quá dài in ấn tốn giấy.",
      "Vì tỷ lệ làm đúng ở nhóm giỏi và nhóm yếu bằng nhau, nghĩa là câu hỏi không thể phân loại được trình độ người thi.",
      "Do câu hỏi đó không chứa các thuật ngữ toán học.",
      "Vì nó làm suy giảm tuyệt đối dải điểm số giáo viên chấm."
    ],
    c: 1,
    e: "✅ D = P_H - P_L = 0 -> Giỏi và Dốt có tỷ lệ đúng y chang nhau -> đề mất lực phân hạng.",
    d: "th"
  },
  {
    q: "Phân tích câu hỏi: độ giá trị cấu trúc D = 0.52 (rpbi=0.45), nhưng độ khó P = (P_H+P_L)/2 = 0.95. Nhận định?",
    o: [
      "Câu hỏi đạt chất lượng hoàn hảo cho thi tuyển ĐH.",
      "Câu hỏi quá dễ, ai cũng làm đúng nên dù thuật ngữ phân biệt tốt trên lý thuyết vẫn không có đất phát huy thực tế bối cảnh dải điểm sụt hèn dồn.",
      "Bản chất câu hỏi bị sai đáp án kỹ thuật.",
      "Câu hỏi phù hợp phân tầng học sinh xuất sắc cực cực độ."
    ],
    c: 1,
    e: "✅ P=0.95 là quá dễ. Ai cũng đúng ngon lành thì không mang giá trị thanh lọc học thuật nữa.",
    d: "th"
  },
  {
    q: "Tại sao phương pháp Thử nghiệm - Thử nghiệm lại (Test-retest) cách nhau quá ngắn (ví dụ 1 ngày) lại cho kết quả tin cậy cao ảo tưởng?",
    o: [
      "Do người học thông minh đột xuất sau 1 ngày gặm bài.",
      "Mối đe dọa của hiệu ứng ghi nhớ và luyện tập: trò nhớ nguyên đáp án lần trước, lặp lại hành vi tĩnh chứ không đo năng lực ổn định thực chất.",
      "Do giáo viên chấm bài nhẹ tay hơn ở lần 2.",
      "Vì đề thi lần hai được in ấn rõ nét hơn lần một mượt."
    ],
    c: 1,
    e: "✅ Khoảng cách quá ngắn -> nhớ bài nháp lần trước -> tương quan chầm sập gần r=1.0 ảo tưởng.",
    d: "th"
  },
  {
    q: "Tại sao việc mài sắc, nâng cao số lượng câu hỏi trong dải thi giúp triệt tiêu sai số ngẫu nhiên nâng cao độ tin cậy?",
    o: [
      "Học sinh lướt mệt mỏi sẽ làm bài liều lĩnh hơn.",
      "Rải đều dải câu giúp luật số lớn vận hành, các sai lệch ngẫu nhiên do may rủi tự trung hòa triệt tiêu chéo, điểm tiệm cận điểm thực.",
      "Đề dài thì học sinh không thể quay cóp bài của bạn học.",
      "Do phần mềm khảo thí tự động quy định số lượng dòng câu."
    ],
    c: 1,
    e: "✅ Càng nhiều câu, may rủi ngẫu nhiên càng bị triệt tiêu, tấm gương rọi ranh giới điểm số vững chắc.",
    d: "th"
  },
  {
    q: "Sự phân tách tinh tế dải Đo lường nội dung và Đo lường cấu trúc tâm lý giúp ích gì cho triết lý sư phạm?",
    o: [
      "Nội dung kiểm soát dải lượng thông tin; cấu trúc chứng minh xem cái thông tin đó có hình thành năng cơ tư duy đích thực (như phê phán, sáng tạo) trong não bộ trò.",
      "Nội dung dành cho khối phổ thông, Cấu trúc dùng khối đại học.",
      "Để bài thi tự luận luôn đạt thang chuẩn mực ISO.",
      "Không mang lại bất kỳ cải tiến suy nghĩ thực tế nào."
    ],
    c: 0,
    e: "✅ Đo nội dung: thuộc công thức chưa? Đo cấu trúc: biết dùng công thức đó phản biện thông tin sai lệch chưa?",
    d: "th"
  },
  {
    q: "Tại sao các câu hỏi trắc nghiệm rác (rpbi âm hoặc D âm) khi lọt vào đề thi sẽ làm hỏng độ tin cậy Alpha toàn bài?",
    o: [
      "Làm đề thi bị rút ngắn phân bố thời gian làm bài.",
      "Tông giật ngược tương quan nội tại chéo dòng, đưa nhiễu ngẫu nhiên lỏng lẻo phá hoại kết cấu nhất quán của thước đo lý thuyết.",
      "Do máy tính chấm tự động sẽ báo lỗi kỹ thuật.",
      "Bắt buộc người chấm phải sửa đổi đáp án bằng tay."
    ],
    c: 1,
    e: "✅ rpbi âm = lệch gu đồng lõa. Loại bỏ câu rpbi âm lập tức tăng Alpha toàn vĩ tuyến.",
    d: "th"
  },
  {
    q: "Hiểu thế nào về mối ràng buộc V_max = sqrt(R) một cách cụ thể nhất trong thực hành đo?",
    o: [
      "Chỉ cần R đạt chuẩn thì tự động V đạt tối đa.",
      "Nếu bài thi đo bét nhè không ổn định (tin cậy R cực thấp), rủi ro sai số phá nát ngắm mục tiêu đo (giá trị V sập sàn). Đo chuẩn mượt thì phải ổn định mượt trước.",
      "Độ tin cậy R và độ giá trị V có liên can tuyến tính 1:1.",
      "R luôn là bình phương của độ giá trị tối đa đạt."
    ],
    c: 1,
    e: "✅ Không tin cậy thì không thể có giá trị. Muốn trúng tâm bia bắn (giá trị) thì súng bắn phải gom đạn ổn định (tin cậy) trước.",
    d: "th"
  },
  {
    q: "Tại sao mỏ vàng ngân hàng câu hỏi thích ứng máy tính (CAT) bắt buộc phải dùng động cơ IRT thay cho CTT?",
    o: [
      "Do CTT không tích hợp được với mã code lập trình Windows.",
      "Vì IRT cung cấp dải tham số b (bất biến) độc lập mẫu, cho phép máy tính gắp nhả câu hỏi phù hợp nhất với năng lực động của trò lập tức.",
      "Để học sinh yếu kém không thể hack được ngân hàng đề.",
      "Vì phần cứng máy tính hiện đại chỉ tương thích với mô hình IRT."
    ],
    c: 1,
    e: "✅ CAT cần bóc tách độ khó câu khỏi quần thể người thi để gắp nhả thích ứng (adaptive) thông minh.",
    d: "th"
  },
  {
    q: "Tham số a (chỉ độ phân biệt) của đường ICC thể hiện điều gì qua góc dốc hình học?",
    o: [
      "Góc dốc thoải phẳng chứng tỏ câu phân biệt cực tốt dải rộng.",
      "Độ dốc đứng tiệm cận vô cực thể hiện câu có tính thanh lọc, nhạy bén phân cực năng lực cực sắc nét quanh vị trí độ khó b.",
      "Chiếm vị trí dịch trái phải của đường hình chuông.",
      "Xác suất đoán mò của các thí sinh lười học bài bầm dập."
    ],
    c: 1,
    e: "✅ Tham số a là hệ dốc dốc của đường ICC. Càng dựng đứng dốc đứng = phân cực giỏi/kém càng sắc như dao cạo.",
    d: "th"
  },
  {
    q: "Tính bất biến (invariance) trong IRT mang ý nghĩa khoa học cách mạng giải thoát khảo thí thế nào?",
    o: [
      "Năng lực người học không đổi suốt cả thế kỷ học tập.",
      "Đặc tính kỹ thuật câu hỏi (b, a) giữ nguyên không đổi bất biến dù mang thi thử ở quần thể sinh viên giỏi hay yếu. Thước đo đạt độ chuẩn hóa vĩnh cửu.",
      "Độ tin cậy toàn bài luôn bằng hằng số 1.00 mượt.",
      "Giáo án giảng dạy của giáo viên không cần sửa đổi hàng năm."
    ],
    c: 1,
    e: "✅ Invariance: thước gỗ đo độ cao của bạn không bị co ngắn lại khi mang lên núi hay xuống biển đo.",
    d: "th"
  },

  // C. VẬN DỤNG (51-80)
  {
    q: "Cho thi thử nửa đề gom các câu số lẻ và nửa chẵn môn Toán lớp 9. Tính tương quan r giữa hai nửa đạt r=0.75. Hiệu chỉnh Spearman-Brown tính độ tin cậy?",
    o: ["R = 0.75", "R = 0.86", "R = 0.90", "R = 0.80"],
    c: 1,
    e: "✅ R = 2r / (1+r) = 2*0.75 / 1.75 = 1.5 / 1.75 = 0.857 ≈ 0.86. Độ tin cậy toàn bài rất tốt.",
    d: "vd"
  },
  {
    q: "Đề thi Olympic Sinh học cho top 5 học sinh giỏi nhất. Câu số 20 có P=0.98 và D=0.01. Bạn quyết định kỹ thuật gì?",
    o: [
      "Nên nâng thời gian sạc chấm điểm câu này tối đa.",
      "Hủy bỏ khỏi ngân hàng đề Olympic ngay vì quá dễ dãi, móm mém phân hóa rác rưởi kỹ thuật.",
      "Giữ nguyên vì đây lý tưởng cho chọn HSG quốc gia.",
      "Tự động cộng 1 điểm cho toàn bộ thí sinh phòng thi."
    ],
    c: 1,
    e: "✅ Điểm P=0.98 là đề tuyển Olympic thì vô vị, ai giỏi ai dại đều đúng hết → loại bỏ.",
    d: "vd"
  },
  {
    q: "Một câu hỏi trắc nghiệm môn Địa lý có tương quan phím rpbi = -0.42 với tổng điểm toàn bài. Chỉ số âm sâu sắc cảnh báo lỗi gì?",
    o: [
      "Đề thi đạt độ dốc phân hóa hoàn hảo sấm sét.",
      "Người học giỏi lại chọn SAI câu này trầm trọng, có nguy cơ đáp án bị gắn lệch phím đúng (lỗi chìa khóa đáp án), cần điều chỉnh ngay lập tức.",
      "Học sinh yếu của lớp học lười biếng đột xuất.",
      "Hệ thống máy chấm thi tự động cần được sạc lại pin."
    ],
    c: 1,
    e: "✅ rpbi âm lớn chứng tỏ học sinh giỏi chọn sai sạch. 99% lỗi do giáo viên ghi nhầm chìa khóa đáp án (ví dụ đúng là A ghi nhầm là B).",
    d: "vd"
  },
  {
    q: "Điểm thi của sinh viên A đa trường là 80 điểm. Sai số đo lường chuẩn SEM = 2.0. Đếm dải điểm thực T chuẩn 95% tin cậy?",
    o: ["78 đến 82 điểm.", "76 đến 84 điểm.", "74 đến 86 điểm.", "80 điểm tuyệt đối cực khít."],
    c: 1,
    e: "✅ Khoảng 95% tương ứng ±2 SEM = [80 - 2*2, 80 + 2*2] = [76, 84]. Rộng hơn dải 68% (±1 SEM).",
    d: "vd"
  },
  {
    q: "Kỳ thi cấp chứng chỉ hành nghề Y (Đạt/Không đạt). Spec quy mô lớn đề xuất phân dải câu hỏi độ khó tập trung thế nào?",
    o: [
      "Cho thật nhiều câu P=0.50 để phân hạng rực rỡ dải.",
      "Phân tầng, tập trung dày đặc xung quanh ranh giới dải điểm cắt đạt chuẩn tối thiểu để giảm thiểu sai số phán quyết nhầm lẫn Đạt/Rớt.",
      "Toàn bộ câu có chỉ số P > 0.90 để ai cũng đỗ đạt.",
      "Toàn bộ câu cực kỳ hóc búa để loại bỏ 95% thí sinh."
    ],
    c: 1,
    e: "✅ Thi Đạt/Rớt cận chuẩn: Cần câu nhạy bén quanh ngưỡng đạt (cut-off) để phán quyết công bằng.",
    d: "vd"
  },
  {
    q: "Trong mô hình trắc nghiệm 3 tham số IRT, tham số c = 0.20 của câu hỏi trắc nghiệm 5 phương án biểu thị:",
    o: [
      "Xác suất thí sinh mù tịt năng lực vẫn có 20% cơ hội đúng hoàn toàn do đoán mò ngẫu nhiên.",
      "Đề thi đạt độ tin cậy r=0.20.",
      "Có 20% học sinh giỏi bỏ trống câu này mệt mỏi.",
      "Độ dốc của dải ICC là góc 20 độ hình học."
    ],
    c: 0,
    e: "✅ Tham số c (guessing) thể hiện xác suất 'mút ngón tay' chọn bừa của người không học vẫn có 20% cơ hội chạm trúng đáp án chuẩn.",
    d: "vd"
  },
  {
    q: "Đồ thị ICC của mô hình Rasch có điểm uốn độc đáo rực rỡ tại vị trí năng lực theta = dải độ khó b. Xác suất đúng tại đây?",
    o: ["25%", "50%", "75%", "100%"],
    c: 1,
    e: "✅ Định nghĩa: Khi thực lực theta vừa bằng đúng độ khó câu b, xác suất trò làm đúng câu đó là 50/50 (0.50).",
    d: "vd"
  },
  {
    q: "Hai đề mẫu Sử. Đề A có độ tin cậy r=0.90; Đề B có r=0.60. Nếu cùng dùng tuyển sinh Đại học, đề nào hạn chế rủi ro tốt hơn?",
    o: [
      "Đề B mượt mà hơn vì dễ đạt điểm cao.",
      "Đề A công bằng mượt mà vượt bậc: sai số SEM nhỏ bé hẹp hòi, điểm số rọi trúng năng lực thật, ít rủi ro may rủi may mắn dính rùa.",
      "Cả hai giống nhau vì hệ số lệch ĐLC bằng nhau.",
      "Đề B hạn chế tốt hơn vì dễ kiểm soát gian lận."
    ],
    c: 1,
    e: "✅ r=0.90 -> SEM bé tẹo -> điểm thi cực gần điểm thật -> không sợ may mắn đoán mò lật ngược kết quả thi đua.",
    d: "vd"
  },
  {
    q: "Bộ môn đo lường rà soát dải câu hỏi môn Triết học, tính được tương đồng nội tại Cronbach's Alpha = 0.35. Đánh giá kỹ thuật đề?",
    o: [
      "Đề thi đạt chất lượng mượt.",
      "Các câu trong bài không cùng đo chung một cấu trúc tri thức, bị phân tán loạn mạch chéo dòng hỏng hóc, thiết kế đề không đồng nhất mục tiêu.",
      "Học sinh lười học bài Triết học dồi dào.",
      "Do phần mềm Excel bị lỗi thuật toán tính."
    ],
    c: 1,
    e: "✅ Alpha nghèo hèn < 0.70 dứt khoát chứng minh các câu hỏi trong đề 'ông nói gà, bà nói vịt', không đo chung một năng lực cốt lõi.",
    d: "vd"
  },
  {
    q: "Trắc nghiệm thích ứng máy nghe CAT (Adaptive Testing) dựa trên IRT vận hành theo cơ chế ưu việt nào sau đây?",
    o: [
      "Phát đề ngẫu nhiên máy tính.",
      "Dựa vào năng lực động ước tính liên tục: nếu trò đúng → nhảy câu khó hơn (b lớn); nếu sai → lùi câu dễ hơn (b nhỏ) để rà đúng dải năng lực thật cực nhanh với số câu tối thiểu.",
      "Chỉ cho phép làm câu khó nhất phòng học.",
      "Bắt buộc học sinh phải làm theo thứ tự tuyến tính."
    ],
    c: 1,
    e: "✅ Thuật toán gắp câu CAT rà năng lực sống động, co dải sai số ước lượng thần tốc, tiết kiệm thời gian.",
    d: "vd"
  },

  // D. VẬN DỤNG CAO (81-100)
  {
    q: "Bài thi chuẩn hóa có R = 0.70. Sau khi loại bỏ một câu hỏi có tương quan câu-hiệu chỉnh thấp, độ tin cậy (Alpha) của bài thi giảm xuống 0.65. Hiện tượng này xảy ra khi nào?",
    o: [
      "Câu hỏi đó có độ phân biệt âm.",
      "Câu hỏi đó quá dễ.",
      "Câu hỏi đó tuy tương quan thấp nhưng lại đang đo một khía cạnh quan trọng của cấu trúc năng lực mà các câu khác chưa đo tới.",
      "Câu hỏi đó có độ giá trị cao."
    ],
    c: 2,
    e: "✅ Đa chiều hóa cần thiết: Loại bỏ mảng nội dung duy nhất độc lập làm sụt sập tính toàn vẹn của cấu trúc đo, kéo Alpha lùi.",
    d: "vdc"
  },
  {
    q: "Sự khác biệt cơ bản giữa độ giá trị nội dung và độ giá trị cấu trúc trong việc xây dựng đề thi năng lực là gì?",
    o: [
      "Nội dung dựa vào bản đặc tả, cấu trúc dựa vào lý thuyết tâm lý học và phân tích nhân tố thống kê thực chứng.",
      "Nội dung dựa vào sinh viên, cấu trúc dựa vào giáo viên.",
      "Nội dung dùng cho đại học, cấu trúc dùng cho phổ thông.",
      "Không có mối liên hệ hay khác biệt thực tế nào."
    ],
    c: 0,
    e: "✅ Nội dung: chuyên gia duyệt lưới thô (Spec). Cấu trúc: chạy toán ma trận xoáy nhân tố (Factor Loading) để nặn cấu trúc óc trò.",
    d: "vdc"
  },
  {
    q: "Trong lý thuyết trắc nghiệm cổ điển, điểm số quan sát được (X) của một thí sinh được cấu thành bởi hai thành phần nào?",
    o: [
      "Điểm thực (T) và Sai số ngẫu nhiên (E) trong mô hình tuyến tính X = T + E.",
      "Điểm tối đa và điểm tối thiểu.",
      "Độ khó P và độ phân biệt D.",
      "Độ tin cậy R và độ giá trị V."
    ],
    c: 0,
    e: "✅ Mô hình điểm thực nền móng CTT: Điểm thi X = Giá trị thực tài T + Nhận nhiễu ngẫu nhiên E.",
    d: "vdc"
  },
  {
    q: "Phương pháp tính độ tin cậy 'Các dạng bài tương đương' (Equivalent forms) đòi hỏi điều kiện nghiêm ngặt gì?",
    o: [
      "Phải cho học sinh thi cùng 1 đề hai lần sát nhau.",
      "Phải biên soạn hai bộ đề hoàn toàn độc lập khác nhau về mặt câu từ chữ nghĩa nhưng đồng dạng mượt mà về Spec, thời lượng, b và a.",
      "Phải chia đôi đề thi thành nửa chẵn nửa lẻ.",
      "Chỉ được thiết kế dạng thi trắc nghiệm khách quan."
    ],
    c: 1,
    e: "✅ Đồng dạng Spec (Parallel forms): 2 thước đo khác song song nhưng cùng vạch chuẩn vạn năng.",
    d: "vdc"
  },
  {
    q: "Sai số đo lường ngẫu nhiên (E) trong mô hình X = T + E giả định đặc tính toán học gì?",
    o: [
      "E luôn là một số dương biến thiên.",
      "E tỷ lệ thuận đồng biến cực độ với điểm thực T.",
      "E là biến ngẫu nhiên thuần túy, có dải trung bình kỳ vọng bằng 0, không tương quan liên hệ với năng lực thực tài T.",
      "E phụ thuộc tỷ lệ nghịch với số lượng câu khảo."
    ],
    c: 2,
    e: "✅ Thuyết CTT giả định may mắn và bết xui gộp lại triệt tiêu về 0, không thèm tương quan với thực tài T.",
    d: "vdc"
  },
  {
    q: "Độ giá trị tiêu chuẩn (Criterion-related validity) được chia thành hai loại là gì?",
    o: [
      "Nội dung và cấu trúc.",
      "Đồng thời (Concurrent) và dự báo (Predictive) phân loại dựa trên dải mốc thời gian kiểm chứng mốc tiêu chuẩn.",
      "Mặt (Face) và nội dung (Content).",
      "Hội tụ (Convergent) và phân biệt (Discriminant)."
    ],
    c: 1,
    e: "✅ Tiêu chuẩn: So với chuẩn hiện tại = Đồng thời; so với kết quả tương lai xa = Dự đoán.",
    d: "vdc"
  },
  {
    q: "Hệ số tương quan điểm hai phím (Point-biserial) dùng đo lường chuyên biệt cho dải dữ liệu mối quan hệ nào?",
    o: [
      "Tương quan hai biến định danh vô định chéo.",
      "Tương quan giữa 1 biến định lượng liên tục và 1 biến nhị phân nhị cực (đúng=1, sai=0 của từng câu hỏi).",
      "Tương quan dải điểm số tự luận GV chấm.",
      "Tương quan dải độ khó và độ phân biệt chéo."
    ],
    c: 1,
    e: "✅ Point-biserial đo tương quan giữa nhị phân cực (câu đúng/sai) và tổng điểm liên tục. Thước đo mài sắc của CTT.",
    d: "vdc"
  },
  {
    q: "Ước lượng độ tin cậy cho bài thi tốc độ (Speeded test - thi xem ai làm chạy nhanh dứt điểm) có nguy hiểm gì nếu dùng Split-half?",
    o: [
      "Làm hệ số sụt giảm bết bát nặng nề.",
      "Đẻ ra độ tin cậy ảo tưởng cực cao vượt vĩ tuyến (do phần cuối bỏ trắng đều điểm 0-0 tạo tương quan nhân tạo của hai nửa).",
      "Không đo lường được dải phân hóa điểm số.",
      "Phá hỏng độ giá trị cấu trúc môn học của đề."
    ],
    c: 1,
    e: "✅ Thi tốc độ: Nửa sau chưa kịp chạm bút đều bị 0 điểm. Khi chia đôi chẵn lẻ, mảng 0-0 tương khớp ảo đẩy tương quan vọt.",
    d: "vdc"
  },
  {
    q: "Hai dải con mồi: độ giá trị hội tụ (Convergent) và độ giá trị phân biệt (Discriminant) nhằm chứng minh:",
    o: ["Độ giá trị nội dung dải đặc tả.", "Độ giá trị cấu trúc sâu thẳm của bài đo (Construct validity).", "Độ giá trị dự báo năng lực tương lai.", "Độ giá trị mặt cảm tính bề mặt."],
    c: 1,
    e: "✅ Chứng minh cấu trúc: Đo chung đặc tính thì phải hút nhau (Hội tụ), đo đặc tính khác xa thì phải đẩy nhau (Phân biệt).",
    d: "vdc"
  },
  {
    q: "Tại sao trong IRT, việc ước lượng dải Theta (năng lực) đòi hỏi chạy mô hình MLE phức tạp hơn CTT cộng dồn?",
    o: [
      "Vì CTT không đo được năng lực học sinh mượt.",
      "Vì IRT xem xét trọng số đóng góp thông tin của từng câu, tính toán xác suất tích hợp động theo đường ICC, cần MLE xoáy vòng lặp hội tụ võ tuyến.",
      "Do IRT sử dụng hệ số nhị phân đơn giản quá.",
      "Vì dải điểm số của IRT luôn nằm trong khoảng 0-100."
    ],
    c: 1,
    e: "✅ MLE (Maximum Likelihood Estimation) dò năng lực động để tìm mốc theta khớp xác suất ICC, cần máy tính giải toán phi tuyến tính.",
    d: "vdc"
  },
  {
    q: "Đóng gói dải ngân hàng đề thi CAT của bạn. Thí sinh trả lời chuẩn xác câu 1, bước nhảy sư phạm tiếp theo của máy tính là gì?",
    o: [
      "Ra ngay câu hỏi dễ hơn để gỡ áp lực phòng thi.",
      "Lựa chọn câu có mức độ khó (b) nhích cao hơn dải năng lực hiện có để mài sắc co hẹp dải sai số SE.",
      "Ra câu hỏi ngẫu nhiên trong dải kho đề.",
      "Cố định câu hỏi có chỉ số phân biệt bằng không."
    ],
    c: 1,
    e: "✅ Đúng -> Nâng chuẩn khó b -> Mài tiếp. Sai -> Hạ b -> Rà tiếp. Chu trình CAT thông minh hoàn hảo.",
    d: "vdc"
  },
  {
    q: "Hàm tin tức câu IIF (Item Information Function) trong IRT cung cấp dải thông tin giá trị gì?",
    o: [
      "Tên người ra đề và xuất xứ câu hỏi.",
      "Độ tinh thông, tính chính xác (triệt tiêu dải sai số SE) của phép đo năng lực tương ứng tại từng điểm dải năng lực theta.",
      "Số phần trăm học viên làm đúng câu khảo thí.",
      "Xác suất lười đoán mò của các thí sinh thi."
    ],
    c: 1,
    e: "✅ Thông tin IIF càng cao = sai số SE ước lượng theta tại mốc đó càng bé. Đỉnh của IIF đạt tại theta = b.",
    d: "vdc"
  },
  {
    q: "Thực hành dải đo lường, bạn đạt độ tin cậy Alpha toàn bài r=0.96, nhưng rà soát bộc lộ dải Alpha if deleted của câu 1 đạt 0.99. Hành vi chỉ đạo kỹ thuật chuẩn là:",
    o: [
      "Giữ nguyên câu 1 vì Alpha bài đã quá cao rực rỡ.",
      "Hủy hoặc biên sửa sâu sắc câu 1 lập tức, vì loại bỏ nó giúp tăng độ nhất quán toàn đề lên vượt vĩ tuyến (câu 1 dính rpbi âm/ nhiễu cấu trúc).",
      "Tăng thời gian làm bài phòng thi lên mượt.",
      "Không can thiệp vì tốn kém bồi đắp ngân hàng."
    ],
    c: 1,
    e: "✅ Alpha bài tăng lên khi loại câu 1 -> câu 1 là tác nhân gây nhiễu, nghịch pha cấu trúc toàn bài -> loại bỏ/sửa.",
    d: "vdc"
  },
  {
    q: "Để chứng minh độ giá trị cấu trúc sâu của bài đo năng lực đọc vị Anh văn, bạn thiết kế phép đo phân tích nào?",
    o: [
      "Sử dụng chuyên gia rà nội dung mặt sách.",
      "Thực chứng chạy rà tương quan dải thông qua Phân tích nhân tố (Factor Analysis) kiểm chứng tính một chiều và hệ số tải lượng.",
      "Chỉ cần đo tương quan điểm thi với điểm Sử.",
      "Dùng hệ số tin cậy Spearman-Brown chia đôi."
    ],
    c: 1,
    e: "✅ Kiểm rà cấu trúc (construct) bắt buộc chạy phân tích nhân tố FA xem các câu hỏi có hội tụ tải trọng mượt lên đúng nhân tố lý thuyết.",
    d: "vdc"
  },
  {
    q: "Một bài thi Sử có phương sai dải điểm sụt hẹp quá mức (hầu như toàn bộ HS đạt 8 điểm). Rủi ro toán học gì xảy ra khi tính Alpha?",
    o: [
      "Alpha tự động tăng vọt lên mức tối đa 1.0.",
      "Alpha sụt sập xuống mốc thấp bết bát bất thường, do phương sai tổng số quá nhỏ bé làm sụt sập mẫu số ước lượng toán tin cậy.",
      "Đề thi đạt độ giá trị dự đoán cực rực rỡ.",
      "Không ảnh hưởng gì tới thuật toán tính tin cậy."
    ],
    c: 1,
    e: "✅ Công thức tính Alpha/KR-20 chứa mẫu số phương sai tổng Sx^2. Điểm dồn bạt phẳng -> Sx^2 bé tẹo -> R sụt ảo.",
    d: "vdc"
  },
  {
    q: "Trong CAT thích ứng, sai số chuẩn SE(theta) của ước lượng năng lực đạt mốc hẹp nhất ở vùng nào?",
    o: [
      "Vùng năng lực cực cao hoặc cực thấp dải chót.",
      "Vùng năng lực theta tiệm cận trùng khít với dải độ khó b của câu hỏi thiết kế (nơi thông tin IIF đạt đỉnh).",
      "Cố định bằng nhau phẳng lỳ suốt cả dải trục ngang.",
      "Dao động vô định ngẫu nhiên không tính toán được."
    ],
    c: 1,
    e: "✅ Khoảng theta trùng độ b = thông tin đạt cực đại -> sai số chuẩn SE đạt cực tiểu (ước lượng thấu sút nhất).",
    d: "vdc"
  },
  // Bổ sung các câu từ 57 đến 100 đạt chuẩn chẵn 100 câu
  {
    q: "Đại lượng 'Hệ số tương quan điểm hai chuỗi' (point-biserial correlation, rpbi) của một câu hỏi trắc nghiệm phản ánh điều gì?",
    o: [
      "Độ dễ của câu hỏi đối với học sinh trung bình.",
      "Mức độ liên kết giữa câu trả lời câu đó (đúng/sai) với tổng điểm của toàn bộ bài thi để phản ánh độ phân biệt câu hỏi.",
      "Thời gian làm bài thi trung bình của học sinh.",
      "Tỷ lệ đoán mò ngã ngửa lý thuyết."
    ],
    c: 1,
    e: "✅ rpbi là chỉ số tuyệt vời đo lường độ phân biệt (discrimination) của câu hỏi trong CTT: câu hỏi tốt phải giữ mối tương quan thuận mạnh mẽ với toàn bài.",
    d: "th"
  },
  {
    q: "Theo lý thuyết trắc nghiệm cổ điển (CTT), sai số đo lường tiêu chuẩn (SEM) được tính dựa trên những đại lượng nào?",
    o: [
      "Độ phân biệt của câu hỏi và số lượng phương án nhiễu.",
      "Độ lệch chuẩn của điểm số quan sát và độ tin cậy của bài kiểm tra.",
      "Thời gian làm bài thi và độ khó trung bình.",
      "Học phí và cơ sở vật chất của cơ sở giáo dục."
    ],
    c: 1,
    e: "✅ Công thức SEM = SD * sqrt(1 - r). SEM phụ thuộc vào độ lệch chuẩn (SD) và độ tin cậy của bài thi (r).",
    d: "nb"
  },
  {
    q: "Một câu hỏi MCQ có hệ số phân biệt D đạt giá trị bằng -0.25 (D = -0.25). Giáo viên nên xử lý câu hỏi này như thế nào?",
    o: [
      "Giữ nguyên trong ngân hàng đề thi vì độ khó rất tốt.",
      "Loại bỏ hoặc hiệu chỉnh sâu sắc câu hỏi vì câu hỏi này đang thúc đẩy học sinh yếu làm Đúng nhiều hơn học sinh giỏi.",
      "Tăng số lượng phương án lựa chọn từ 4 lên 5.",
      "Nhân đôi số lượng điểm cho câu này."
    ],
    c: 1,
    e: "✅ Hệ số phân biệt âm cực kỳ nguy hiểm, chứng tỏ câu hỏi có lỗi lớn về đáp án hoặc gây bẫy học sinh giỏi trầm trọng.",
    d: "vd"
  },
  {
    q: "Trong mô hình IRT 2 tham số (2PL), xác suất trả lời đúng câu hỏi phụ thuộc vào những thuộc tính nào của câu hỏi đó?",
    o: [
      "Chỉ phụ thuộc duy nhất vào độ khó b.",
      "Phụ thuộc vào độ khó b và độ phân biệt a của câu hỏi.",
      "Phụ thuộc vào độ khó b, độ phân biệt a và hệ số đoán mò c.",
      "Phụ thuộc vào số lượng chữ viết trong câu."
    ],
    c: 1,
    e: "✅ Mô hình 2PL kiểm soát đồng thời hai tham số: độ khó b và độ phân biệt a của từng câu hỏi học thuật.",
    d: "nb"
  },
  {
    q: "Đường cong đặc trưng câu hỏi (Item Characteristic Curve - ICC) trong IRT biểu diễn mối quan hệ giữa:",
    o: [
      "Số lượng câu hỏi và thời gian làm bài.",
      "Năng lực của thí sinh (theta) và xác suất trả lời đúng câu hỏi đó.",
      "Độ khó câu hỏi và độ tin cậy toàn bài.",
      "Phương sai điểm và sai số chuẩn của phép đo."
    ],
    c: 1,
    e: "✅ Trục hoành là năng lực theta, trục tung là xác suất đúng P(theta). Đường cong ICC phác họa sự biến thiên sắc sảo này.",
    d: "th"
  },
  {
    q: "Khi phân tích kết quả bài thi cuối kỳ môn Vật lý, GV nhận thấy độ tin cậy toàn bài đạt r = 0.55. GV nên làm gì để tăng độ tin cậy này lên mức chấp nhận được?",
    o: [
      "Cắt bớt số lượng câu hỏi trong đề thi.",
      "Bổ sung thêm các câu hỏi chất lượng, có độ phân biệt tốt bám sát Bản đặc tả đề thi.",
      "Cho học sinh điểm tối đa ở một số câu ngẫu nhiên.",
      "Giữ nguyên cấu trúc nhưng nâng điểm hệ số thi."
    ],
    c: 1,
    e: "✅ Theo công thức Spearman-Brown, tăng chiều dài bài thi bằng các câu hỏi tương đồng chất lượng sẽ bồi đắp độ tin cậy rực rỡ hơn.",
    d: "vd"
  },
  {
    q: "Tham số c trong mô hình IRT 3 tham số (3PL) được định nghĩa là:",
    o: [
      "Tham số độ khó tối đa của câu hỏi.",
      "Tham số đoán mò (pseudo-chance parameter), phản ánh xác suất trả lời đúng của người có năng lực vô cùng thấp.",
      "Tham số phân biệt tuyệt đối.",
      "Hệ số tương quan điểm hai chuỗi."
    ],
    c: 1,
    e: "✅ Tham số c thể hiện xác suất người học dốt đoán mò vẫn trúng đáp án đúng câu hỏi trắc nghiệm.",
    d: "nb"
  },
  {
    q: "Trắc nghiệm thích ứng máy tính (CAT) vận hành dựa trên nguyên lý cơ bản nào?",
    o: [
      "Giáo viên trực tuyến chấm điểm từng câu theo thời gian thực.",
      "Chọn lọc câu hỏi tiếp theo dựa trên năng lực ước lượng từ những câu trả lời trước đó của học sinh.",
      "Mỗi học sinh làm một đề thi hoàn toàn ngẫu nhiên do máy chọn.",
      "Hệ thống tự động cho điểm học sinh trung bình mà không qua thi."
    ],
    c: 1,
    e: "✅ CAT tối ưu hóa phép đo: học sinh làm đúng -> nâng độ khó câu tiếp; làm sai -> hạ độ khó để định vị chuẩn theta.",
    d: "vd"
  },
  {
    q: "Nếu một câu hỏi có độ khó CTT là P = 0.95, câu hỏi này thuộc loại nào?",
    o: [
      "Cực kỳ khó.",
      "Rất dễ (95% học sinh làm đúng).",
      "Có độ khó vừa phải hoàn hảo.",
      "Bị lỗi không có phương án đúng."
    ],
    c: 1,
    e: "✅ Trong CTT, P là tỷ lệ làm đúng. P càng gần 1 câu hỏi càng dễ; P = 0.95 là câu hỏi siêu dễ.",
    d: "nb"
  },
  {
    q: "Chỉ số độ giá trị tiêu chí (criterion-related validity) được phân chia thành những loại nào?",
    o: [
      "Độ giá trị nội dung và độ giá trị diện mạo.",
      "Độ giá trị đồng thời (concurrent validity) và độ giá trị dự báo (predictive validity).",
      "Độ giá trị cấu trúc và phân tích nhân tố.",
      "Độ tin cậy Alpha và độ tin cậy chia đôi."
    ],
    c: 1,
    e: "✅ Độ giá trị tiêu chí đánh giá mối tương quan với một thước đo chuẩn mực khác, gồm đồng thời và dự báo tương lai.",
    d: "nb"
  },
  {
    q: "Trong phân tích câu hỏi trắc nghiệm, nếu một phương án nhiễu (distractor) có tỷ lệ học sinh khá giỏi chọn nhiều hơn học sinh yếu kém thì phương án nhiễu này:",
    o: [
      "Đang vận hành rất tốt và giữ độ phân biệt cao.",
      "Là phương án lỗi, hướng sai lệch học sinh giỏi (chứa đựng lỗi bẫy học thuật hoặc mập mờ đáp án).",
      "Cần giữ nguyên vì giúp nâng cao độ khó toàn bài.",
      "Phản ánh năng lực bách khoa của thí sinh."
    ],
    c: 1,
    e: "✅ Nhiễu chỉ được phép hấp dẫn người kém. Nếu thu hút người giỏi, chứng tỏ câu hỏi bị lỗi bẫy không đáng có.",
    d: "vdc"
  },
  {
    q: "Độ giá trị nội dung (content validity) của bài thi thường được xác định thông qua phương pháp nào?",
    o: [
      "Chạy thống kê hồi quy phức tạp bằng phần mềm SPSS.",
      "Đánh giá định tính từ hội đồng chuyên gia bám sát cấu trúc của Bản đặc tả đề thi.",
      "Đo lường hệ số Alpha sau khi thi thử.",
      "Tính toán hệ số phân biệt của từng câu hỏi."
    ],
    c: 1,
    e: "✅ Độ giá trị nội dung đo lường năng lực đại diện của câu hỏi học thuật đối với vùng tri thức, do chuyên gia thẩm định.",
    d: "th"
  },
  {
    q: "Theo công thức Spearman-Brown, nếu tăng gấp đôi số lượng câu hỏi chất lượng tương đương trong bài thi, độ tin cậy r' có xu hướng thay đổi thế nào?",
    o: [
      "Chắc chắn giảm đi một nửa.",
      "Tăng lên nhưng sẽ tiệm cận trần tối đa là 1.0.",
      "Không có bất kỳ sự thay đổi biến động nào.",
      "Tự động sụt giảm về giá trị bằng không."
    ],
    c: 1,
    e: "✅ Tăng chiều dài bài thi giúp triệt tiêu sai số ngẫu nhiên, nâng độ tin cậy tiệm cận về 1.0.",
    d: "th"
  },
  {
    q: "Khái niệm 'Tính độc lập cục bộ' (Local Independence) trong lý thuyết IRT được hiểu như thế nào?",
    o: [
      "Học sinh không được phép trao đổi bài trong phòng thi.",
      "Xác suất trả lời đúng một câu hỏi hoàn toàn không phụ thuộc vào câu trả lời của câu hỏi khác, khi đã kiểm soát năng lực theta.",
      "Mỗi tỉnh thành được tự chủ ra đề kiểm tra riêng lẻ.",
      "Độ khó của câu hỏi không đổi theo thời gian."
    ],
    c: 1,
    e: "✅ Tính độc lập cục bộ đảm bảo rằng năng lực theta là nhân tố duy nhất giải thích sự tương tác giữa thí sinh và câu hỏi.",
    d: "th"
  },
  {
    q: "Đặc thù lớn nhất của lý thuyết phản hồi câu hỏi (IRT) so với lý thuyết cổ điển (CTT) về mặt ước lượng năng lực là:",
    o: [
      "IRT chấm điểm nhanh chóng và khách quan hơn.",
      "Ước lượng năng lực người học không bị phụ thuộc vào đề khó hay dễ, và thuộc tính câu hỏi độc lập với mẫu thí sinh.",
      "IRT rẻ tiền hơn nhiều về chi phí triển khai hệ thống.",
      "IRT không yêu cầu giả định một chiều."
    ],
    c: 1,
    e: "✅ Ưu điểm đột phá của IRT là tính bất biến (invariance) của tham số câu hỏi và năng lực, bạt phẳng giới hạn mẫu của CTT.",
    d: "vd"
  },
  {
    q: "Trong Classical Test Theory (CTT), điểm thực (True Score) được định nghĩa lý thuyết là gì?",
    o: [
      "Điểm số hoàn hảo không bao giờ chứa đựng sai số ngẫu nhiên nếu thi vô hạn lần.",
      "Điểm số quan sát mà học sinh đạt được ngay trong phòng thi thực tế.",
      "Ý kiến chấm điểm công tâm của chuyên gia chấm thi.",
      "Điểm số học kỳ ghi trong sổ học bạ."
    ],
    c: 0,
    e: "✅ Điểm thực là kỳ vọng toán học (điểm trung bình) của phân phối điểm số quan sát khi thí sinh thực hiện làm bài vô hạn lần.",
    d: "th"
  },
  {
    q: "Tại sao việc công bố kết quả bài kiểm tra kèm theo 'Khoảng tin cậy' (Confidence Interval) lại nhân văn và khoa học hơn điểm số thô đơn độc?",
    o: [
      "Để giúp học sinh có thể tự do chọn lựa điểm mong muốn.",
      "Vì nó thừa nhận điểm số quan sát luôn chứa đựng sai số (E), giúp định hình khoảng dao động thực sự của năng lực học sinh.",
      "Để nhà trường dễ dàng giải trình trước dư luận xã hội.",
      "Vì khoảng tin cậy giúp nâng cao độ khó đề thi sụt sập."
    ],
    c: 1,
    e: "✅ Điểm quan sát X mang tính thời điểm. Khoảng tin cậy dựa trên SEM bảo hộ độ an toàn học thuật tránh quy chụp phiến diện học lực học sinh.",
    d: "vdc"
  },
  {
    q: "Hệ số Kuder-Richardson 20 (KR-20) khác biệt gì so với hệ số Cronbach's Alpha?",
    o: [
      "KR-20 đo lường độ giá trị cấu trúc sâu.",
      "KR-20 là trường hợp đặc biệt của Alpha được dùng riêng cho các câu hỏi chấm điểm nhị phân (Đúng = 1, Sai = 0).",
      "KR-20 có giá trị biến thiên từ -1 đến 0.",
      "KR-20 không chịu ảnh hưởng bởi độ dài bài thi."
    ],
    c: 1,
    e: "✅ Khi bài thi chỉ có dạng nhị phân 1/0, công thức Cronbach's Alpha thu gọn về thuật toán KR-20 hoàn chỉnh.",
    d: "nb"
  },
  {
    q: "Một bài thi đạt độ tin cậy r = 0.90. Sai số đo lường chuẩn SEM sẽ có xu hướng thế nào nếu độ lệch chuẩn SD của bài thi tăng lên?",
    o: [
      "SEM tự động sụt giảm về bằng không.",
      "SEM sẽ tăng lên tương ứng.",
      "SEM giữ nguyên không đổi.",
      "SEM biến thiên hỗn loạn phi tuyến."
    ],
    c: 1,
    e: "✅ SEM = SD * sqrt(1 - r). Khi SD tăng lên (phân tán điểm số rộng), khoảng sai số tuyệt đối SEM sẽ giãn nở theo.",
    d: "vd"
  },
  {
    q: "Khái niệm 'Hàm thông tin câu hỏi' (Item Information Function - IIF) trong IRT cho biết điều gì?",
    o: [
      "Số lượng chữ cái của câu hỏi cung cấp thông tin.",
      "Mức độ chính xác (đóng góp bồi đắp thông tin) của câu hỏi đó trong việc ước lượng năng lực theta tại từng mốc tương thích.",
      "Danh sách các tài liệu học tập bổ trợ.",
      "Tỷ lệ thí sinh đoán mò thành công câu hỏi."
    ],
    c: 1,
    e: "✅ IIF đo lường giá trị khoa học của câu hỏi. IIF càng lớn tại mốc theta nào chứng tỏ câu hỏi đo lường cực tốt tại dải năng lực đó.",
    d: "th"
  },
  {
    q: "Đo lường 'Độ tin cậy liên giám khảo' (Inter-rater reliability) thường sử dụng chỉ số thống nhất nào đối với dải chấm tự luận nhị phân hoặc phân loại?",
    o: [
      "Hệ số tương quan Pearson.",
      "Hệ số Cohen's Kappa hoặc tương quan nội lớp ICC.",
      "Độ giá trị cấu trúc FA.",
      "Tham số toán học Rasch model."
    ],
    c: 1,
    e: "✅ Cohen's Kappa triệt tiêu yếu tố ngẫu nhiên đồng thuận, là chỉ số kinh điển đo lường độ nhất quán giữa hai giám khảo chấm độc lập.",
    d: "th"
  },
  {
    q: "Tại sao giáo viên cần tránh biên soạn câu hỏi quá dễ (P > 0.90) hoặc quá khó (P < 0.10) cho một bài thi tuyển chọn học bổng học sinh giỏi?",
    o: [
      "Vì học sinh giỏi sẽ không thèm làm bài thi.",
      "Vì những câu này cung cấp rực rỡ dải điểm bạt phẳng.",
      "Vì những câu hỏi này có độ phân biệt (discrimination) sụt sập xuống gần 0, không thể phân loại được năng lực học sinh tốt/kém.",
      "Vì quy định hành chính cấm ra đề thi khó."
    ],
    c: 2,
    e: "✅ Câu quá dễ ai cũng đúng, câu quá khó ai cũng sai -> độ phân biệt bằng 0 -> không giúp tuyển lọc sàng tài được.",
    d: "vdc"
  },
  {
    q: "Khi kiểm tra độ giá trị đồng thời (concurrent validity), giáo viên so sánh kết quả của bài thi tự thiết kế với:",
    o: [
      "Kết quả học tập môn học khác ở học kỳ trước.",
      "Một bài thi chuẩn hóa có uy tín cao (golden standard) được học sinh thực hiện trong cùng khoảng thời gian.",
      "Điểm số trung bình toàn khóa học của năm sau.",
      "Thái độ cảm nhận của học sinh đối với giáo viên."
    ],
    c: 1,
    e: "✅ Đồng thời tức là đối chiếu trực tiếp thời gian thực với công cụ chuẩn mực đã được chứng minh giá trị.",
    d: "vd"
  },
  {
    q: "Độ giá trị nội dung (content validity) của một đề kiểm tra 1 tiết học được củng cố vững chắc nhất thông qua công tác chuẩn bị nào?",
    o: [
      "Mời giáo viên dạy giỏi nhất lớp chấm bài thi luận cực đoan.",
      "Thiết lập Bản đặc tả đề thi (TOS) khớp chuẩn tỷ trọng của dải chuẩn đầu ra tương thích.",
      "Hỏi ý kiến mức độ thích học của học sinh.",
      "Tổ chức cho học sinh thi thử trắc nghiệm 3 lần."
    ],
    c: 1,
    e: "✅ TOS là bản khế ước bảo đảm độ bao phủ chuẩn mực, không thừa thiếu hay lệch trọng tâm kiến thức học phần.",
    d: "vd"
  },
  {
    q: "Điểm số T-score có điểm trung bình và độ lệch chuẩn quy ước tương ứng là bao nhiêu?",
    o: [
      "Mean = 0, SD = 1",
      "Mean = 50, SD = 10",
      "Mean = 500, SD = 100",
      "Mean = 100, SD = 15"
    ],
    c: 1,
    e: "✅ Kiểm tra điểm số T-score quy chuẩn hóa: Mean = 50 và SD = 10, bạt phẳng vệt âm của Z-score.",
    d: "nb"
  },
  {
    q: "Khi chuyển đổi điểm số quan sát thành phân phối chuẩn hóa Z-score, giá trị Z âm (Z < 0) mang ý nghĩa sư phạm gì?",
    o: [
      "Hệ thống chấm thi bị tính nhầm điểm số.",
      "Điểm số của thí sinh nằm dưới mức trung bình của toàn mẫu tham chiếu.",
      "Học sinh có thái độ học tập tiêu cực bết.",
      "Đề thi bị lỗi giá trị nghiêm trọng."
    ],
    c: 1,
    e: "✅ Z-score đo khoảng cách lệch chuẩn so với giá trị trung bình. Z < 0 chứng minh điểm thí sinh nằm thấp hơn mức trung vị.",
    d: "th"
  },
  {
    q: "Một bài thi đạt độ tin cậy tuyệt hảo r = 1.00. Sai số đo lường chuẩn SEM tương ứng bằng giá trị nào?",
    o: [
      "SEM = 1.00",
      "SEM = 0.00",
      "SEM = không xác định",
      "SEM = SD"
    ],
    c: 1,
    e: "✅ Khi r = 1.00 -> SEM = SD * sqrt(1 - 1) = 0. Phép đo hoàn hảo không hề chứa đựng sai số ngẫu nhiên.",
    d: "th"
  },
  {
    q: "Trong mô hình phổ quát Rasch (1PL), tham số nào sau đây được giả định là hằng số cố định bằng nhau cho tất cả các câu hỏi?",
    o: [
      "Tham số độ khó b.",
      "Tham số độ phân biệt a.",
      "Tham số đoán mò c.",
      "Năng lực theta học sinh."
    ],
    c: 1,
    e: "✅ Mô hình Rasch (1PL) quy định độ phân biệt a của mọi câu hỏi là hằng số bất biến (thường quy chuẩn bằng 1.0).",
    d: "th"
  },
  {
    q: "Thuộc tính 'Độ giá trị dự báo' (predictive validity) bộc lộ sức mạnh rõ nét nhất ở tình huống nào sau đây?",
    o: [
      "Kết quả kiểm tra giữa kỳ tương quan với điểm thi học kỳ.",
      "Điểm kỳ thi đánh giá năng lực Đại học tương quan thuận cao với điểm học tập GPA sau 4 năm học Đại học.",
      "Học sinh cảm thấy đề cương ôn tập thi rất mượt.",
      "Hội đồng khảo thí duyệt đề ôn thi tốt nghiệp."
    ],
    c: 1,
    e: "✅ Dự báo đo lường năng lực chuẩn xác: kết quả phép đo hiện tại báo cáo đúng thành công tương lai thực chất.",
    d: "vdc"
  },
  {
    q: "GV muốn phát hiện xem bài trắc nghiệm có xu hướng thiên vị cho một nhóm thí sinh (như phân biệt giới tính) hay không sẽ ứng dụng phân tích kỹ thuật nào trong IRT?",
    o: [
      "Phân tích nhân tố khảo sát dải cấu trúc.",
      "Phân tích chức năng câu hỏi dị biệt (Differential Item Functioning - DIF).",
      "Đo lường hệ số tin cậy liên chấm rater.",
      "Tính hệ số Spearman-Brown chia đôi."
    ],
    c: 1,
    e: "✅ DIF phát hiện dấu vết thiên vị: hai thí sinh cùng theta năng lực nhưng khác giới/vùng miền lại có xác suất làm đúng câu hỏi khác biệt.",
    d: "vdc"
  },
  {
    q: "Độ giá trị diện mạo (face validity) của một bài kiểm tra có nhược điểm lớn nhất là gì?",
    o: [
      "Cần chạy thuật toán nhân tố vô cùng đắt đỏ.",
      "Mang tính chủ quan cao, chỉ dựa trên ấn tượng cảm tính ban đầu của người nhìn chứ không mang minh chứng thực nghiệm vững vàng.",
      "Làm giảm hệ số tin cậy Alpha bài thi.",
      "Khó giải thích công bố trước học sinh."
    ],
    c: 1,
    e: "✅ Face validity chỉ xem đề thi trông có đúng chuẩn không, dễ gây lầm tưởng ngộ nhận nếu thiếu kiểm rà thực tế.",
    d: "th"
  },
  {
    q: "Trong CTT, độ phân biệt D của câu hỏi được tính bằng phương pháp so sánh nhóm cực đoan như thế nào?",
    o: [
      "Lấy trung bình điểm nhóm giỏi cộng trung bình nhóm kém.",
      "Lấy tỷ lệ làm đúng của nhóm giỏi (27% top đầu) trừ đi tỷ lệ làm đúng của nhóm kém (27% đáy).",
      "Lấy điểm số tối đa chia điểm tối thiểu.",
      "Lấy số câu hỏi làm đúng trừ số câu làm sai."
    ],
    c: 1,
    e: "✅ Công thức tính D cổ điển: D = P(High) - P(Low). D > 0.30 được đánh giá là câu hỏi phân loại lý tưởng sư phạm.",
    d: "th"
  },
  {
    q: "Tại sao nói 'Độ tin cậy là điều kiện cần nhưng chưa đủ của độ giá trị'?",
    o: [
      "Vì bài thi có độ tin cậy cao chắc chắn tuyệt đối đạt độ giá trị.",
      "Một cái cân hỏng luôn cân lệch thêm 5kg (luôn ổn định tin cậy r=1.0) nhưng hoàn toàn không cân đúng trọng lượng thực (không có độ giá trị).",
      "Vì độ giá trị dễ tính toán hơn độ tin cậy.",
      "Do quy định khảo thí quốc tế quy ước."
    ],
    c: 1,
    e: "✅ Tin cậy chỉ là sự nhất quán, ổn định dải đo. Giá trị là tính chính xác, thực chất đo lường đúng mục tiêu.",
    d: "vdc"
  },
  {
    q: "Điểm chuẩn (Cut-score) phục vụ cho việc phân loại học lực trong kỳ kiểm tra chuẩn hóa được xác định bằng phương pháp khoa học nào sau đây?",
    o: [
      "Giáo viên tự chọn một mức điểm tròn trịa dễ chấm.",
      "Ứng dụng các quy trình chuẩn hóa từ các chuyên gia như Phương pháp Angoff hoặc phương pháp Bookmark.",
      "Lấy dải điểm trung vị của lớp thi chia đôi.",
      "Chọn mức điểm sao cho tỷ lệ đỗ là đúng 80%."
    ],
    c: 1,
    e: "✅ Phương pháp Angoff hay Bookmark là các kỹ thuật chuẩn hóa kinh điển quốc tế giúp thiết lập cut-score công tâm thực nghiệm.",
    d: "vd"
  },
  {
    q: "Trong lý thuyết trắc nghiệm cổ điển, sai số phi hệ thống (unsystematic error) có tính chất đặc trưng nào?",
    o: [
      "Luôn làm tăng vọt điểm của tất cả học sinh.",
      "Dao động ngẫu nhiên, hoàn toàn không liên quan mật thiết với năng lực thực tế của người học, triệt tiêu khi thi vô cực lần.",
      "Cố định tăng thêm 1 điểm cho mọi thí sinh.",
      "Không chịu ảnh hưởng bởi sức khỏe học sinh."
    ],
    c: 1,
    e: "✅ Sai số phi hệ thống mang tính ngẫu nhiên, vô thức (mệt mỏi, thời tiết, lỗi in ấn) sụt rà ngẫu nhiên.",
    d: "nb"
  },
  {
    q: "Phát biểu nào sau đây đúng nhất về chỉ số 'Độ lệch chuẩn' (SD) của một phân phối điểm thi?",
    o: [
      "SD càng lớn chứng tỏ dải điểm học sinh càng đồng đều, thuần nhất.",
      "SD càng lớn chứng tỏ phổ điểm càng phân tán dải rộng, bộc lộ sự khác biệt năng lực đa dạng giữa các thí sinh.",
      "SD luôn có giá trị thay đổi biến thiên từ -1 đến 1.",
      "SD bằng 0 chứng tỏ bài thi đạt độ tin cậy cao."
    ],
    c: 1,
    e: "✅ SD đo mức độ phân tán. SD lớn chứng tỏ dải năng lực học sinh phân hóa sắc nét sư phạm.",
    d: "th"
  },
  {
    q: "Nếu chạy tương quan giữa điểm thi giữa kỳ và điểm thi cuối kỳ thu được hệ số r = 0.85, mối tương quan này được đánh giá thế nào?",
    o: [
      "Rần yếu.",
      "Tương quan thuận chiều mạnh mẽ (điểm cao giữa kỳ thường gắn liền với cuối kỳ rực rỡ).",
      "Tương quan nghịch đảo nghiêm trọng.",
      "Không có ý nghĩa thống kê thực nghiệm."
    ],
    c: 1,
    e: "✅ Pearson r = 0.85 biểu thị liên kết chặt chẽ, chứng tỏ phong độ học tập ổn định của học viên dải học.",
    d: "nb"
  },
  {
    q: "Mục đích cốt lõi của việc chuyển đổi điểm số thô thành thứ bậc phân trăm (Percentile) là gì?",
    o: [
      "Nâng điểm học sinh lên cho đẹp học bạ.",
      "Xác định vị trí tương đối của thí sinh so với mẫu tham chiếu (thí sinh vượt qua bao nhiêu phần trăm mẫu).",
      "Triệt tiêu hoàn toàn sai số đo lường.",
      "Phục vụ cho các bài thi chấm Rubric."
    ],
    c: 1,
    e: "✅ Percentile giúp định vị thứ bậc vĩ mô: Thí sinh đạt Percentile 90 nghĩa là làm bài tốt hơn 90% thí sinh tham gia kỳ thi.",
    d: "th"
  },
  {
    q: "Trong khảo thí cổ điển, hệ số phân biệt rpbi của câu hỏi có mối quan hệ nghịch chiều dứt khoát với thuộc tính nào?",
    o: [
      "Độ lệch chuẩn SD toàn bài.",
      "Không tương quan dứt khoát theo chiều nghịch.",
      "Thời lượng làm bài thi phòng thi.",
      "Độ giá trị cấu trúc sâu sắc."
    ],
    c: 1,
    e: "✅ rpbi độc lập thuật toán, không cố định tuyến tính nghịch chiều dứt khoát với đại lượng nào được liệt kê mập mờ.",
    d: "vd"
  },
  {
    q: "Phép đo lường thái độ hài lòng của sinh viên đối với dịch vụ đào tạo sử dụng thang đo Likert 5 mức độ thuộc loại thang đo nào?",
    o: [
      "Thang đo danh nghĩa (Nominal Scale).",
      "Thang đo thứ bậc (Ordinal Scale).",
      "Thang đo khoảng (Interval Scale).",
      "Thang đo tỷ lệ (Ratio Scale)."
    ],
    c: 1,
    e: "✅ Thang đo thái độ dạng Likert là thang thứ bậc (Ordinal): các mức độ được sắp xếp tăng dần từ Ghét đến Thích, khoảng cách không bằng phẳng tuyệt đối vật lý.",
    d: "nb"
  },
  {
    q: "Trong mô hình IRT 3 tham số, nếu độ giá trị phân biệt a của một câu hỏi cực kỳ thấp (a tiệm cận bằng 0), đường cong ICC sẽ:",
    o: [
      "Dốc đứng lên thẳng đứng.",
      "Dẹt phẳng lỳ thành một đường ngang mệt mỏi.",
      "Hình chữ S hoàn hảo sắc nét.",
      "Dao động gãy khúc liên tục."
    ],
    c: 1,
    e: "✅ Tham số a quyết định độ dốc (slope) tại điểm b. a = 0 đường cong phẳng lỳ chứng tỏ câu hỏi mất trắng năng lực phân loại.",
    d: "vd"
  },
  {
    q: "Khái niệm 'Chuẩn hóa đề thi' (Test Standardization) bao gồm những tiêu chuẩn đồng quy phạm nào sau đây?",
    o: [
      "Thí sinh học trường nào thì được ưu tiên đề thi trường đó.",
      "Đồng nhất tuyệt đối về cấu trúc đề, quy chế phòng thi, thời gian làm bài kịch khung, quy chuẩn chấm điểm và quy đổi thứ bậc.",
      "Bắt buộc thi bằng hình thức thi trực tuyến trên máy tính.",
      "Chỉ cho thi tự luận và cấm hoàn toàn trắc nghiệm MCQ."
    ],
    c: 1,
    e: "✅ Chuẩn hóa bảo vệ công bằng vĩ mô, bạt phẳng mọi nhiễu bối cảnh khách quan phòng thí.",
    d: "th"
  },
  {
    q: "Điểm số Z-score bằng bao nhiêu tương ứng với điểm thô trùng khít 100% với điểm trung bình cộng toàn phân phối?",
    o: [
      "Z = 1.0",
      "Z = 0.0",
      "Z = -1.0",
      "Z = 50.0"
    ],
    c: 1,
    e: "✅ Z = (X - Mean) / SD. Khi điểm X = Mean -> tử số bằng 0 -> Z = 0.0.",
    d: "nb"
  },
  {
    q: "Mục tiêu tối thượng của việc giải trình sư phạm, phân tích phân phối lỗi và phản hồi kết quả thi (Closing the loop) là gì?",
    o: [
      "Đạt điểm cao nhất để trường báo cáo thành tích liên khối.",
      "Cải tiến liên tục quy trình dạy và học, hiệu chỉnh dải tài liệu bổ trợ bám khít lỗ hổng tri thức học viên gặt hái sau thi.",
      "Lọc sạch những thí sinh yếu kém khỏi lớp học.",
      "Nâng chất lượng cơ sở vật chất dịch vụ khuôn viên trường học."
    ],
    c: 1,
    e: "✅ Khảo thí sinh ra không phải để dán nhãn trừng trị mà để dẫn đường bồi đắp chất lượng thực học tốt hơn.",
    d: "vdc"
  }
];

