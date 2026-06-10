/**
 * Educational Psychology Quiz Database
 * Part 4: Chapters 8, 9, 10, 11 and School Counseling (Questions 151 - 200)
 */

import { VNUQuestion } from "./vnu1001_questions";

export const TLHGD_QUESTIONS_P4: VNUQuestion[] = [
  // --- CHƯƠNG 8 TIẾP (Q151 - Q160) ---
  {
    id: "tlhgd-q151",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Tại sao trẻ em bước vào lớp 1 thường trải qua hiện tượng xáo trộn tâm lý 'sốc transition' học đường?",
    options: [
      "Do chương trình toán lớp 1 quá khó khăn khốc liệt",
      "Do sự thay đổi đột ngột về hoạt động chủ đạo từ 'Vui chơi là chính' ở mầm non sang 'Học tập là nghĩa vụ kỷ luật khắt khe' ở tiểu học",
      "Do các bạn xung quanh không chịu nói chuyện",
      "Do thời tiết thay đổi bất thường thời kỳ mùa thu"
    ],
    correctOption: 1,
    explanation: "Sự thay đổi hoạt động chủ đạo đòi hỏi trẻ phải gò mình vào kỷ luật ngồi yên nghe giảng 45 phút, gây căng thẳng thần kinh nếu chưa chuẩn bị tâm lý."
  },
  {
    id: "tlhgd-q152",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Chức năng, mục tiêu ưu tiên hàng đầu của Hoạt động giảng dạy và Giáo dục trong nhà trường hiện đại là:",
    options: [
      "Luyện tập kỹ năng làm bài kiểm tra trắc nghiệm nhanh",
      "Truyền đạt hệ thống tri thức, kỹ năng khoa học nền tảng, đồng thời bồi đắp bồi dưỡng thế giới quan đạo đức nhân cách toàn diện cho người học",
      "Xếp hạng sàng lọc phân loại học sinh để thưởng phạt",
      "Duy trì trật tự tĩnh lặng an ninh học đường"
    ],
    correctOption: 1,
    explanation: "Dạy chữ đi đôi với dạy người; kiến tạo năng lực bên cạnh định hình bản sắc nhân văn, đạo nghĩa cho thế hệ tương lai học tập."
  },
  {
    id: "tlhgd-q153",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Hoạt động dạy (teaching activity) của người giáo viên chuẩn mực được định nghĩa là:",
    options: [
      "Sự áp đặt kiến thức bắt chép lại nguyên văn",
      "Hoạt động tổ chức, điều khiển, giàn giáo định hướng và hướng đạo giúp người học tự lực, chủ động chiếm lĩnh tri thức phát triển toàn diện bản thân",
      "Sự kiểm tra chấm điểm trừng phạt khuyết điểm",
      "Công việc trình bày bài thuyết trình trơn tru trên bảng"
    ],
    correctOption: 1,
    explanation: "Dạy học xuất sắc là thiết kế bối cảnh, dắt dắt thắp sáng trí tò mò để học sinh tự mình leo núi tri thức bằng chính đôi chân tự học."
  },
  {
    id: "tlhgd-q154",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Mức độ cao nhất khẳng định học sinh thực sự hiểu sâu và chiếm lĩnh thành công bài học trên lớp là:",
    options: [
      "Em có khả năng viết lại y hệt khái niệm sách giáo khoa",
      "Học sinh có khả năng vận dụng tri thức linh hoạt, sáng tạo để giải quyết các tình huống thực tế hay bài toán phức hợp mới mẻ",
      "Học sinh im lặng lắng nghe không hỏi lại câu nào",
      "Học sinh nhớ rõ số trang sách nói về nội dung đó"
    ],
    correctOption: 1,
    explanation: "Vận dụng sáng tạo (application and creation) là đỉnh cao của thang đo nhận thức Bloom, chứng minh tri thức đã hóa năng lực thực sầm."
  },
  {
    id: "tlhgd-q155",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Phong cách giảng dạy 'Dân chủ' (democratic) của nhà sư phạm mẫu mực thể hiện ở:",
    options: [
      "Để học sinh tự làm tự chơi thoải mái không can thiệp",
      "Sự tôn trọng nhân cách học trò, khuyến khích phản biện thảo luận đa chiều, cùng bàn bạc dân chủ và đồng cảm thấu hiểu nâng đỡ nỗ lực cá nhân trẻ",
      "Yêu cầu học sinh biểu quyết đồng ý theo ý thầy 100%",
      "Chỉ trò chuyện với học sinh chăm ngoan xuất sắc học giỏi"
    ],
    correctOption: 1,
    explanation: "Phong cách dân chủ kiến tạo bầu không khí học đường an toàn, tích cực, kích phát tư duy phản biện sáng tạo của học sinh bay cao."
  },
  {
    id: "tlhgd-q156",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Phong cách giảng dạy 'Độc đoán' (authoritarian) của giáo viên dẫn đến hậu quả tiêu cực nào trong lớp học học?",
    options: [
      "Học sinh quá linh hoạt năng động nghịch ngợm",
      "Thủ tiêu hoàn toàn tính chủ động tự giác của học trò, triệt tiêu tư duy sáng tạo độc lập, gây bầu không khí sợ hãi, căng thẳng ngầm",
      "Hiệu quả học tập sụt giảm không đáng kể",
      "Giáo viên quá mệt mỏi vì phải giải thích nhiều"
    ],
    correctOption: 1,
    explanation: "Sự sợ hãi bóp nghẹt các liên neuron sáng tạo; học trò trở nên thụ động rụt rè, chỉ làm theo chỉ đạo cơ học để né hình phạt."
  },
  {
    id: "tlhgd-q157",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Phong cách giảng dạy 'Tự do' (laissez-faire / buông thả) của giáo viên thường đưa lớp học rơi vào trạng thái:",
    options: [
      "Nghiêm túc, kỷ luật sắt đá",
      "Sự hỗn loạn mất kỷ luật, trật tự giáo dục sa sút, học sinh thờ ơ bơ vơ và hiệu suất học tập suy giảm nghiêm trọng",
      "Phát triển rực rỡ năng lực tự học của học sinh",
      "Mọi quyết định đều thống nhất cao độ nhanh chóng"
    ],
    correctOption: 1,
    explanation: "Tự do buông thả bỏ mặc trẻ tự bơi mà thiếu đi sự định hướng, nâng đỡ sư phạm khoa học của thầy cô giáo tạo nên sự hỗn loạn thụ động."
  },
  {
    id: "tlhgd-q158",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Để thiết lập mối quan hệ sư phạm mẫu mực thân thiện, ấm áp tình thầy trò, trước tiên giáo viên cần tự rèn luyện điều gì?",
    options: [
      "Tập trung đầu tư trang phục thời trang sành điệu",
      "Đạt chuẩn mực về tấm gương đạo đức công vụ nhà giáo, lối sống mẫu mực văn minh và trái tim tận tụy hy sinh thầm lặng vì học trò",
      "Mua sẵn nhiều quà bánh vật chất để tặng học sinh hằng tuần",
      "Hạn chế giao tiếp mặt đối mặt với học sinh ngoài hành lang"
    ],
    correctOption: 1,
    explanation: "Thầy cô giáo làm nghề bằng tấm gương nhân cách tự thân; bản sắc đạo đức văn hóa chuẩn mực chính là thỏi nam châm thu phục trái tim trẻ."
  },
  {
    id: "tlhgd-q159",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Thuật ngữ nguồn gốc 'Sư phạm' (Pedagogy) thực chất ám chỉ hoạt động bản chất nào?",
    options: [
      "Công việc thi cử chấm điểm sát sao",
      "Hành trình dẫn dắt, uốn nắn, chăm sóc và dạy dỗ trẻ em nên người tử tế hữu ích xã hội",
      "Nghệ thuật trình diễn lời nói hùng hồn trước đám đông",
      "Hoạt động nghiên cứu cấu trúc phân tử sinh học"
    ],
    correctOption: 1,
    explanation: "Sư phạm nguyên bản cổ xưa là 'người dẫn dắt trẻ thơ' tiến bước vào ánh sáng tri thức văn minh nhân loại một cách nhân văn."
  },
  {
    id: "tlhgd-q160",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Bản chất lao động sư phạm của giáo viên mang tính độc đáo, sáng tạo liên tục vì nguyên nhân cốt yếu nào?",
    options: [
      "Phải sử dụng quá nhiều giáo cụ đắt tiền",
      "Đối tượng lao động trực tiếp là nhân cách con người - vốn vô cùng năng động, biến đổi linh hoạt và mang cá tính độc nhất vô nhị",
      "Chương trình sách giáo khoa thay đổi hằng năm",
      "Phải làm việc trong phòng máy tính hiện đại triền miên"
    ],
    correctOption: 1,
    explanation: "Không có công thức chung vạn năng áp dụng cho mọi đứa trẻ; mỗi giờ lên lớp đòi hỏi thầy nhạy sắc thích ứng điều khiển cảm tử cho phù hợp."
  },

  // --- CHƯƠNG 9. HOẠT ĐỘNG DẠY (Q161 - Q180) ---
  {
    id: "tlhgd-q161",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Uy tín sư phạm chân chính (authentic prestige) của người giáo viên được xây dựng vững chãi trên hai cột trụ cốt lõi là:",
    options: [
      "Tính nghiêm khắc trừng phạt nặng nề và thế lực gia đình",
      "Phẩm chất đạo đức lối sống sáng ngời mẫu mực phối hợp với vốn tri thức uyên bác và nghệ thuật tay nghề sư phạm điêu luyện",
      "Văn bằng học vị tiến sĩ giáo dục học",
      "Sự khéo léo lấy lòng phụ huynh học sinh"
    ],
    correctOption: 1,
    explanation: "Uy tín thực sự toát ra từ trí tuệ sáng láng, sự công tâm bao dung, năng lực dạy học tài hoa khiến học trò nể phục yêu mến từ tâm."
  },
  {
    id: "tlhgd-q162",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Hiện tượng 'uy tín giả' của giáo viên thường nảy sinh từ việc lạm dụng biện pháp nào?",
    options: [
      "Tổ chức đối thoại dân chủ với học trò",
      "Lạm dụng uy quyền luật lệ hành lực đe dọa, la mắng ép buộc học sinh sợ hãi cúi đầu vâng lời máy móc",
      "Nhiệt tình giúp đỡ học sinh nghèo khó vượt lên học giỏi",
      "Dạy bài giảng quá hấp dẫn cuốn hút người nghe"
    ],
    correctOption: 1,
    explanation: "Uy thế giả dựa trên nỗi sợ hãi; khi không có mặt giáo viên giám sát, học trò sẽ phá vỡ kỷ luật và chống đối ngầm dữ dội."
  },
  {
    id: "tlhgd-q163",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Năng lực sư phạm 'Khéo léo ứng xử sư phạm' (pedagogical tact) đòi hỏi giáo viên phải:",
    options: [
      "Phớt lờ bỏ qua mọi lỗi lầm ứng xử vô lễ của trẻ",
      "Linh hoạt, tinh tường, tế nhị giải quyết nhanh chóng, êm thấm các mâu thuẫn bất ngờ nảy sinh mà vẫn giữ nghiêm kỷ nẹp, không tổn thương lòng tự trọng trẻ",
      "Quát mắng đuổi cổ ra khỏi lớp ngay học sinh vi phạm nội quy",
      "Lập tức mời phụ huynh lên viết bản cam kết kỷ luật khẩn cấp"
    ],
    correctOption: 1,
    explanation: "Sự khéo léo thể hiện ở khả năng kiềm chế giận dữ, hài hước đúng lúc, phê bình tế nhị kín đáo để học trò nhận lỗi lòng biết ơn sâu sắc."
  },
  {
    id: "tlhgd-q164",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Năng lực thiết kế và chuẩn bị bài giảng (lesson planning) đòi hỏi giáo viên đạt kỹ năng nào?",
    options: [
      "Sao chép nguyên văn giáo án mẫu trên mạng internet",
      "Dự báo chính xác nhịp điệu nhận thức học trò, cấu trúc dòng tri thức khoa học mạch lạc, phong phú hóa các hoạt động tự học kích hoạt trẻ chủ động dấn thân",
      "Lựa chọn các bài toán khó nhất thế giới thách đố học sinh",
      "Viết giáo án thật dài nhiều mặt chữ chữ thắm thiết"
    ],
    correctOption: 1,
    explanation: "Giáo án xuất sắc là bản thiết kế kịch bản sư phạm sống động, lường trước các khó khăn lầm lẫn của trẻ để giàn giáo dắt dắt tháo gỡ."
  },
  {
    id: "tlhgd-q165",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Năng lực 'Ngôn ngữ sư phạm' đòi hỏi thầy cô giáo khi đứng lớp giảng dạy là:",
    options: [
      "Sử dụng thật nhiều từ địa phương hay từ lóng sành điệu",
      "Phát âm tròn vành rõ chữ, từ vựng súc tích mạch lạc, giàu nhạc tính truyền cảm và sưởi ấm xúc cảm khích lệ học sinh",
      "Nói thật nhanh liến thoắng không dừng nghỉ phút nào",
      "Nói lí nhí chỉ đủ cho bản thân và giáo viên nghe"
    ],
    correctOption: 1,
    explanation: "Ngôn từ của thầy là dòng chảy tư duy trực tiếp bồi bổ trí tuệ trẻ; ngôn ngữ rạch ròi giúp học sinh thấu đạt bài nhanh, giảm sương mù nhận thức."
  },
  {
    id: "tlhgd-q166",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Phẩm chất 'Nhân ái sư phạm' (pedagogical love) của nhà giáo dục thể hiện đỉnh cao ở:",
    options: [
      "Sự nuông chiều mọi ý muốn sở thích bất kể đúng sai của học trò",
      "Sự yêu thương bao dung vô điều kiện tất thảy mọi đứa trẻ, đặt niềm tin bất diệt vào khả năng tiến bộ của học sinh yếu kém, khó khăn nhất",
      "Chỉ ưu ái nâng điểm động viên cho học sinh gia thế tốt",
      "Khen ngợi tung hô thành tích học thuật xuất sắc triền miên"
    ],
    correctOption: 1,
    explanation: "Nhân ái sư phạm cứu vớt những tâm hồn bơ vơ lạc lối; tình yêu thương biến những đứa trẻ nổi loạn ngỗ ngược quay đầu hướng thiện."
  },
  {
    id: "tlhgd-q167",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Cuộc khủng hoảng tâm lý chuyển tiếp ở lứa tuổi học sinh trung học cơ sở (11 - 15 tuổi) nổi bật với mâu thuẫn sâu sắc nào?",
    options: [
      "Muốn ăn nhiều đồ ngọt béo bổ bẩm sinh",
      "Nhu cầu khẳng định bản thân đã là người lớn, tự lập quyết định đời mình nhưng kinh nghiệm sống, trí tuệ thực tế còn non nớt chưa chín chắn",
      "Năng lực học tập sụt giảm thê thảm đột ngột",
      "Sự mâu thuẫn gay gắt giữa chiều cao và cân nặng sinh học"
    ],
    correctOption: 1,
    explanation: "Các em ghét bị ra lệnh dặn dò như con nít, khao khát tự chủ quyền riêng tư nhưng lại thiếu nền tảng bản lĩnh thực tế để tự chịu trách nhiệm."
  },
  {
    id: "tlhgd-q168",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Hiện tượng bùng nổ nhu cầu 'Tự ý thức' (self-consciousness) diễn ra mạnh mẽ khốc liệt nhất ở lứa tuổi nào?",
    options: ["Trẻ sơ sinh mầm non", "Học sinh tiểu học chăm ngoan", "Học sinh trung học cơ sở (thiếu niên tuổi dậy thì)", "Người già trưởng thành điềm tĩnh"],
    correctOption: 2,
    explanation: "Thiếu niên bắt đầu săm soi soi gương hàng giờ, phân tích nội tâm thái độ của mình, quan tâm sâu sắc mọi người nghĩ gì về mình."
  },
  {
    id: "tlhgd-q169",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Để uốn nắn hành vi nổi loạn bướng bỉnh của thiếu niên dậy thì, cha mẹ và giáo viên nên lựa chọn ứng xử sư phạm nào?",
    options: [
      "Tăng cường đòn roi bạo lực bầm dập để chế ngự nổi loạn",
      "Khép kín các em trong phòng cấm giao tiếp bạn bè",
      "Đối xử bình đẳng tôn trọng, lắng nghe góc nhìn của em, làm bạn đồng hành dẫn dắt chia sẻ gỡ rối thay vì cấm đoán áp đặt",
      "Thờ ơ bỏ mặc trẻ tự sinh tự diệt tự lớn khôn"
    ],
    correctOption: 2,
    explanation: "Ứng xử sư phạm ngang hàng, coi em như 'người lớn tập sự' giúp xoa dịu cái đầu nóng, kéo trẻ về phía đối thoại văn minh, tích cực."
  },
  {
    id: "tlhgd-q170",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Sự phát triển mối quan hệ bạn bè của lứa tuổi thiếu niên mang tính chất đặc thù nào sau đây?",
    options: [
      "Chỉ là bạn chơi cùng ngẫu nhiên chốc lát rồi quên",
      "Hình thành các mối tình bạn tri kỷ thâm giao sâu sắc, đòi hỏi lòng trung thành tuyệt đối, chia sẻ chung các bí mật thầm kín đời tư",
      "Tránh né tuyệt đối giao tiếp với bạn khác giới cùng lớp",
      "Hoàn toàn lệ thuộc một chiều vào sự sắp đặt kết bạn của bố mẹ"
    ],
    correctOption: 1,
    explanation: "Tập thể bạn bè là thánh đường tâm lý của thiếu niên; các em học cách dung hòa, bảo vệ bí mật nhóm để xác lập bản sắc."
  },
  {
    id: "tlhgd-q171",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Đời sống tâm lý của học sinh trung học phổ thông (thanh niên) hướng mạnh vào hoạt động cốt lõi nào?",
    options: [
      "Vui chơi đồ chơi chuyển động giả lập",
      "Tự định vị tương lai cuộc đời, xây dựng thế giới quan khoa học, lý tưởng nhân sinh kiên định sống",
      "Sự lệ thuộc tuyệt đối vào chỉ bảo của giáo viên",
      "Sự thu mình né tránh hoàn toàn xã hội"
    ],
    correctOption: 1,
    explanation: "Thanh niên bắt đầu tư duy nghiêm túc về: 'Tôi là ai?', 'Tôi đóng góp gì cho cuộc đời này?', lo nghĩ về chọn ngành học, chọn nghề tương lai."
  },
  {
    id: "tlhgd-q172",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Công tác chọn nghề, phân luồng hướng nghiệp cho học sinh cuối cấp THPT cần dựa trên sự giao thoa khoa học của:",
    options: [
      "Sự áp đặt trọn vẹn theo mong ước sở thích làm giàu của cha mẹ",
      "Đam mê sở thích tự thân + Năng lực cá tính phù hợp + Nhu cầu nguồn nhân lực thực tế của thị trường kinh tế xã hội",
      "Lựa chọn đại ngẫu nhiên theo trào lưu số đông bạn bè rủ rê",
      "Việc bốc thăm may mắn ngẫu nhiên chọn trường"
    ],
    correctOption: 1,
    explanation: "Định vị nghề đúng đắn nằm ở điểm giao thoa: cái mình thích, cái mình làm tốt nhất và cái xã hội đang cần sầm uất trả công."
  },
  {
    id: "tlhgd-q173",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Hội chứng stress, lo âu, trầm cảm tăng cao ở học sinh THPT cuối cấp thường bắt nguồn từ áp lực nào?",
    options: [
      "Sức khỏe vật chất suy kiệt bẩm sinh",
      "Kỳ vọng thành tích đè nặng từ cha mẹ gia đình và nỗi sợ hãi thất bại trượt đại học của bản thân",
      "Môi trường học tập quá rộng rãi thoải mái giải trí",
      "Chế độ dinh dưỡng không đầy đủ dưỡng chất"
    ],
    correctOption: 1,
    explanation: "Học sinh bị đun nóng dưới các lò luyện thi khắc nghiệt; căng thẳng dồn nén lâu ngày tàn phá hệ thần kinh cảm xúc của các em."
  },
  {
    id: "tlhgd-q174",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Hoạt động 'Tham vấn tâm lý học đường' (school counseling) chân chính trong trường học có vai trò chủ yếu để:",
    options: [
      "Điều tra, lập danh sách xử phạt học sinh vi phạm kỷ luật",
      "Hỗ trợ, đồng hành lắng nghe không phán xét, định hướng gỡ rối khủng hoảng cảm xúc, trầm cảm học tập, bạo lực bạn học tinh thần",
      "Dạy bổ túc nâng cao kiến thức toán học khó",
      "Thay mặt ban giám hiệu giáo huấn uốn nắn kỷ luật sắt"
    ],
    correctOption: 1,
    explanation: "Nhà tham vấn là người bạn tin cậy, thắp sáng nhận thức giúp học trò tự nhìn nhận vấn đề và tự tìm ra giải pháp tháo gỡ an toàn."
  },
  {
    id: "tlhgd-q175",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi phát hiện một học sinh trong lớp chủ nhiệm có biểu hiện bị cô lập, bắt nạt tinh thần trên mạng xã hội, giáo viên nên làm gì?",
    options: [
      "Lên tiếng phê bình học sinh bị bắt nạt vì yếu đuối trước toàn lớp",
      "Chủ động cô lập cách ly che chở bảo vệ nạn nhân, bảo mật thông tin, lắng nghe thấu cảm động viên tâm lý sụp đổ và xử lý văn minh nhóm bắt nạt",
      "Bỏ qua xem như chuyện trêu chọc trẻ con tự giải quyết ngoài trường",
      "Đuổi học ngay lập tức tất cả các bên liên quan để giữ sạch lớp"
    ],
    correctOption: 1,
    explanation: "Can thiệp sớm cứu mạng học sinh khỏi trầm cảm nguy hiểm; đồng thời giáo dục nhóm bắt nạt nhận ra độ độc hại của hành vi phá hoại nhân cách."
  },
  {
    id: "tlhgd-q176",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Biện pháp kỷ luật tích cực (positive discipline) cấm ngặt hành vi nào sau đây từ phía nhà sư phạm?",
    options: [
      "Khen ngợi nỗ lực tiến bộ của học trò cá biệt",
      "Nhục mạ danh dự nhân phẩm, công kích bêu xấu khuyết điểm cá nhân trước bàn dân thiên hạ, bạo hành thể xác học sinh",
      "Giảm bớt khối lượng bài tập về nhà khắt khe",
      "Tổ chức cho học sinh dọn dẹp vệ sinh khuôn viên lớp"
    ],
    correctOption: 1,
    explanation: "Mọi hình thức nhục mạ xúc phạm vật lý hay tinh thần đều phản sư phạm sâu sắc, gieo mầm u uất thù hận cản trở giáo dục nhân văn."
  },
  {
    id: "tlhgd-q177",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Để kích phát học tập sâu sắc và rèn luyện 'Tư duy phản biện' (critical thinking) của học sinh, giáo viên nên ứng dụng:",
    options: [
      "Cách dạy học một chiều: thầy đọc lý thuyết suông trò ghi nhớ tuyệt đối",
      "Hoan nghênh các nghi vấn tranh biện lịch thiệp mới mẻ của học sinh, tổ chức các cuộc thảo luận bảo vệ luận điểm khoa học có dữ liệu rõ ràng",
      "Trừ điểm học sinh có ý kiến trái chiều với bài viết mẫu",
      "Bắt học sinh chép thuộc lòng các lời giải chuẩn cấu trúc mẫu"
    ],
    correctOption: 1,
    explanation: "Va đập tư tưởng khoa học giúp mài sắc tư duy bão não; học sinh học cách lập luận dựa trên bằng chứng minh tri thức thấu suốt."
  },
  {
    id: "tlhgd-q178",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Chuẩn mực 'Đạo đức nghề nghiệp' cao quý nhất của người thầy giáo Việt Nam là gì?",
    options: [
      "Khả năng mở thêm nhiều lớp dạy thêm để tối đa thu nhập cá nhân",
      "Lòng trung thành tuyệt đối với sự nghiệp giáo dục, tận tụy dốc lòng yêu thương học sinh và tinh thần không ngừng tự học tự bồi dưỡng nâng tầm",
      "Sự vâng phục vô điều kiện mọi mệnh lệnh hành chính mờ nhạt",
      "Nhận thật nhiều quà cáp biếu xén hằng năm từ phụ huynh"
    ],
    correctOption: 1,
    explanation: "Nghề dạy học là nghề cao quý dùng trái tim thắp sáng tâm hồn; đạo đức lương tâm người thầy là ngọn hải đăng soi đường cho học trò."
  },
  {
    id: "tlhgd-q179",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Thầy cô giáo vĩ đại từng nói: 'Muốn cải cải tạo thế giới, trước tiên hãy giáo dục trẻ em thật chu đáo'. Câu nói nhấn mạnh:",
    options: [
      "Vấn đề kinh tế tài chính học đường",
      "Sứ mệnh vĩ đại kiến tạo tương lai dân tộc xã hội thông qua sự nghiệp trồng người mẫu mực của ngành sư phạm",
      "Tính chất nhàn hạ dễ dàng của nghề dạy học",
      "Vai trò tuyệt đối của việc kiểm soát hành vi bẩm sinh"
    ],
    correctOption: 1,
    explanation: "Mỗi đứa trẻ hôm nay là công dân kiến thiết xã hội ngày mai; gieo mầm nhân văn chân ái hôm nay gặt hái tương lai văn minh phồn thịnh."
  },
  {
    id: "tlhgd-q180",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi dạy hòa nhập cho học sinh có khiếm khuyết thể chất hoặc trí lực nhẹ trong lớp phổ thông, giáo viên cần:",
    options: [
      "Bắt trẻ khuyết tật phải chạy theo tiến độ chương trình phẳng của các bạn bình thường",
      "Kiến tạo bầu không khí ấm áp thương yêu đoàn kết không phân biệt đối xử, thiết kế lộ trình sải bước nhỏ cá biệt hóa nâng đỡ bé từng độ tiến bộ",
      "Khuyên phụ huynh đưa em sang trường đặc biệt cách ly rạch ròi",
      "Thờ ơ xem như học viên dự thính không thuộc trách nhiệm quản lý"
    ],
    correctOption: 1,
    explanation: "Giảng dạy hòa nhập (inclusive education) bồi đắp lòng trắc ẩn tôn trọng đa dạng cho học sinh bình thường, thắp sáng hi vọng cho trẻ khó khăn."
  }
,
  {
    id: "tlhgd-q181",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Điểm cốt lõi trong lý thuyết Vùng phát triển gần (ZPD) của Vygotsky khi ứng dụng vào giảng dạy dạy học học là gì?",
    options: [
          "Chỉ giao những nhiệm vụ cực kỳ dễ dàng để học sinh tự làm tự chơi giải trí",
          "Thiết lập nhiệm vụ học tập có độ khó cao hơn trình độ hiện tại của học sinh nhưng em có thể hoàn thành nhờ sự giàn giáo nâng đỡ chỉ dẫn của giáo viên hay bạn có năng lực tốt hơn",
          "Giao các bài tập hóc búa vượt ngoài mọi tầm hiểu biết tiềm năng để rèn luyện sự chịu đựng",
          "Bắt học sinh học thuộc lòng các cuốn sách giáo khoa đại học khi đang học mầm non"
    ],
    correctOption: 1,
    explanation: "ZPD nhấn mạnh việc dạy học đi trước đón đầu sự phát triển, giàn giáo hỗ trợ kịp thời để học sinh tự mình bứt phá vươn tới tầm cao mới."
  },
  {
    id: "tlhgd-q182",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Theo thuyết phát triển nhận thức của Jean Piaget, lứa tuổi học sinh tiểu học (7 - 11 tuổi) đang nằm ở giai đoạn nhận thức nào?",
    options: [
          "Giai đoạn giác động cảm giác cảm thô sơ",
          "Giai đoạn tiền thao tác ký hiệu hóa",
          "Giai đoạn thao tác cụ thể (concrete operations), trẻ có khả năng tư duy logic nhưng phải gắn sát với vật thể vật chất cụ thể",
          "Giai đoạn thao tác chính thức trừu tượng hoàn mỹ"
    ],
    correctOption: 2,
    explanation: "Học sinh tiểu học bắt đầu có tư duy bảo toàn và logic, nhưng tư duy này vẫn cần điểm tựa từ các hình ảnh trực quan hoặc đối tượng thực tế cụ thể."
  },
  {
    id: "tlhgd-q183",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi giảng dạy một khái niệm vật lý trừu tượng như 'lực hút trái đất' cho học sinh tiểu học, phương án sư phạm nào là tối ưu theo Piaget?",
    options: [
          "Bắt trẻ học thuộc lòng định nghĩa chương toán lý sáo rỗng",
          "Cho trẻ thả rơi tự do các vật nặng nhẹ khác nhau trong lớp học và quan sát trực tiếp hiện tượng trước khi đúc rút lý thuyết",
          "Yêu cầu tự học lý thuyết trực tuyến không cần thí nghiệm",
          "Giảng bài liên tục 45 phút bằng các công thức toán học vi phân"
    ],
    correctOption: 1,
    explanation: "Sự tiếp cận trực quan sinh động thông qua hành động trực tiếp giúp học sinh tiểu học chuyển hóa hình ảnh cụ thể thành khái niệm nhận thức vững bền."
  },
  {
    id: "tlhgd-q184",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Động cơ học tập bên trong (intrinsic motivation) của một học sinh bộc lộ rõ nét nhất khi em:",
    options: [
          "Nỗ lực học tập dốc lòng vì say mê khám phá tri thức, thấy bản thân tiến bộ và thỏa mãn tò mò nhận thức",
          "Cố gắng học giỏi để được bố mẹ mua tặng xe máy hay thưởng tiền mặt đờ đẫn",
          "Học để tránh bị thầy cô trách phạt, la mắng nhục mạ trước cả lớp",
          "Học giỏi để khoe mẽ thành tích lấn lướt bạn bè xung quanh"
    ],
    correctOption: 0,
    explanation: "Động cơ bên trong bắt nguồn từ nhu cầu tự thân, đem lại cảm giác say sưa tự nhiên không chịu sự ép uổng hay dụ dỗ bằng phần thưởng vật chất."
  },
  {
    id: "tlhgd-q185",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Lý thuyết 'Học tập xã hội' (Social Learning Theory) của Albert Bandura nhấn mạnh vai trò của cơ chế nào trong sự học?",
    options: [
          "Sự rèn luyện cơ học lặp đi lặp lại không tư duy",
          "Khả năng quan sát, bắt chước hành vi của người khác (mô hình hóa - modeling) trong môi trường sống",
          "Sự thay đổi cấu trúc hormone sinh học đột ngột",
          "Học tập thụ động thông qua việc bị trừng phạt cơ thể"
    ],
    correctOption: 1,
    explanation: "Học sinh học được rất nhiều hành vi ứng xử, lời nói, thái độ thông qua việc âm thầm quan sát và bắt chước các hình mẫu xung quanh (như thầy cô, cha mẹ)."
  },
  {
    id: "tlhgd-q186",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Khái niệm 'Giàn giáo nhận thức' (Scaffolding) trong dạy học hiện đại được hiểu là:",
    options: [
          "Sự kiểm tra chấm điểm khắt khe liên tục để ép học sinh chăm học",
          "Sự hỗ trợ tạm thời, linh hoạt của người dạy giúp người học hoàn thành các nhiệm vụ khó khăn, và rút dần sự hỗ trợ khi học sinh tự chủ hoàn toàn",
          "Bắt học sinh sao chép nguyên văn các lời giải mẫu trên bảng",
          "Việc lắp đặt các thiết bị cơ sở vật chất vật lý an toàn trong lớp học"
    ],
    correctOption: 1,
    explanation: "Giàn giáo nhận thức giúp học sinh vượt qua rào cản thách thức ban đầu trong ZPD, thắp sáng khả năng tự lực giải quyết vấn đề sau đó."
  },
  {
    id: "tlhgd-q187",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Để thiết kế một bài giảng sinh động kích hoạt tối đa sự tham gia của người học, giáo viên nên thực thi bước nào đầu tiên?",
    options: [
          "Yêu cầu học sinh mở sách đọc đồng thanh định nghĩa bách khoa",
          "Gieo mâu thuẫn nhận thức bằng một tình huống thực tiễn nghịch lý gợi trí tò mò khám phá giải pháp của học sinh",
          "Đe dọa sẽ kiểm tra 15 phút thình lình vào cuối tiết học",
          "Đọc chép chậm rãi lý thuyết giáo trình dày cộp cho an toàn"
    ],
    correctOption: 1,
    explanation: "Mâu thuẫn nhận thức đánh động trí tò mò, thúc đẩy dòng chảy hưng phấn muốn lật tìm chân lý, duy trì chú ý có chủ định bền bỉ suốt tiết học."
  },
  {
    id: "tlhgd-q188",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Đối với học sinh cuối cấp THPT đứng trước ngưỡng cửa chọn ngành chọn nghề, phẩm chất nhà giáo đức tài thể hiện qua việc:",
    options: [
          "Ép buộc học sinh chọn trường theo sở thích cá nhân của giáo viên để lấy thành tích",
          "Hỗ trợ học sinh phân tích thấu đáo năng lực cá nhân, đam mê thực tại và dự báo thị trường nghề nghiệp khách quan để các em tự định đoạt",
          "Bỏ mặc học sinh tự xoay xở bơ vơ không can thiệp",
          "Khuyên các em chọn những ngành kiếm tiền nhanh nhất bằng mọi giá"
    ],
    correctOption: 1,
    explanation: "Người thầy giỏi đóng vai trò cố vấn thông thái tôn trọng quyền tự chủ của học sinh, dắt lối định hướng hướng đi cho tương lai các em dựa trên cơ sở khoa học."
  },
  {
    id: "tlhgd-q189",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi học sinh trong lớp bộc lộ thái độ chống đối chán học vì thấy kiến thức môn học quá mệt mỏi xa vời thực tế, cách ứng xử sư phạm của thầy cô là:",
    options: [
          "Ghi sổ đầu bài trừng phạt nặng nề và đuổi học sinh ra khỏi lớp",
          "Lắng nghe chân thành, kết nối khéo léo bài học với các ứng dụng thực tiễn sáp sườn đời sống thường nhật đem lại giá trị hữu ích thấy ngay",
          "Thờ ơ tiếp tục đọc chép cho hết giờ lên lớp",
          "Mắng mỏ xúc phạm học sinh trước tập thể lớp học nhằm lập trật tự"
    ],
    correctOption: 1,
    explanation: "Kết nối tri thức với thực tiễn là phương thuốc tối thượng đánh thức động cơ học tập nội tại; học sinh chỉ say học khi thấy bài học có ý nghĩa với cuộc sống của mình."
  },
  {
    id: "tlhgd-q190",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Khái niệm 'Kỳ vọng Sư phạm' (Hiệu ứng Pygmalion) trong lớp học chứng minh quy luật tâm lý nào sau đây?",
    options: [
          "Sự kỳ vọng cao và lòng tin tưởng chân thành của giáo viên vào học sinh sẽ thắp sáng ý chí giúp em tiến bộ vượt bậc thực tế",
          "Sự kiểm soát hành vi nghiêm ngặt tuyệt đối sẽ khiến học sinh bớt nghịch ngợm",
          "Sự thờ ơ của giáo viên sẽ kích thích tính tự lực của trẻ",
          "Điểm số cao là công cụ duy nhất tạo dựng sự thành công cho lớp học"
    ],
    correctOption: 0,
    explanation: "Hiệu ứng Pygmalion chứng minh học sinh có xu hướng cư xử và nỗ lực đạt tới kỳ vọng yêu thương, tin tưởng mà người thầy dành gửi cho mình."
  },
  {
    id: "tlhgd-q191",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Lớp học được xem là một hệ thống xã hội thu nhỏ chịu sự chi phối mạnh mẽ bởi:",
    options: [
          "Bầu không khí tâm lý xã hội học đường và chất lượng mối quan hệ tương tác thầy - trò, trò - trò",
          "Số lượng bàn ghế sắp xếp trong phòng học",
          "Độ dày của các cuốn sách giáo lý đạo đức",
          "Sự tách biệt tuyệt đối của từng cá nhân học sinh"
    ],
    correctOption: 0,
    explanation: "Bầu không khí tâm lý ấm áp, đoàn kết hỗ trợ lẫn nhau bôi trơn cho sự tiếp thu kiến thức và định hình nhân cách lành mạnh cho trẻ."
  },
  {
    id: "tlhgd-q192",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Bầu không khí tâm lý lớp học 'tích cực, an toàn' (positive classroom climate) mang lại giá trị vĩ mô cốt lõi nào?",
    options: [
          "Học sinh được vui chơi tự do và không chịu bất kỳ khuôn khổ kỷ luật nào",
          "Giảm thiểu nỗi sợ hãi sai lầm, khơi thông dòng năng lượng sáng tạo phản biện, kích hoạt ý chí nỗ lực dấn thân của học sinh",
          "Giáo viên không cần chuẩn bị nội dung bài giảng lên lớp",
          "Tạo điều kiện để học sinh khá giỏi kỳ thị học sinh yếu kém"
    ],
    correctOption: 1,
    explanation: "Cảm giác an toàn tâm lý giải phóng trẻ khỏi các ức chế thần kinh phòng thủ sợ hãi, khơi mạch cho tư duy sáng tạo tỏa rạng."
  },
  {
    id: "tlhgd-q193",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi xảy ra hiểu lầm sâu sắc dẫn tới tranh cãi nảy lửa cạn tình giữa hai học sinh trong lớp học chủ nhiệm, giáo viên nên:",
    options: [
          "Đuổi cả hai em ra khỏi lớp lập tức để giữ gìn trật tự chung",
          "Làm trung gian hòa giải ôn hòa, cho mỗi em cơ hội trình bày góc nhìn riêng biệt trong sự lắng nghe tôn trọng lẫn nhau, hướng dẫn tự gỡ rối",
          "Bắt buộc hai em phải xin lỗi nhau giả tạo trước lớp",
          "Phạt điểm kiểm tra của cả hai em thật nặng nề để cảnh cáo"
    ],
    correctOption: 1,
    explanation: "Hòa giải xung đột là bài học kỹ năng sống đắt giá; giúp học sinh thấu hiểu góc nhìn đối tác để bồi bồi đắp lòng trắc ẩn tôn trọng."
  },
  {
    id: "tlhgd-q194",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Nhân tố xã hội tiên phong, đặt nền móng đầu tiên chịu trách nhiệm hình thành nhân cách đạo đức ban đầu cho trẻ nhỏ là đóng góp của:",
    options: [
          "Trường đại học chuyên nghiệp",
          "Gia đình và phong cách giáo dục nuôi dưỡng của cha mẹ",
          "Các trò chơi trực tuyến trên internet",
          "Các phương tiện truyền thông công cộng"
    ],
    correctOption: 1,
    explanation: "Gia đình gieo những mầm nhân văn chân ái đầu tiên dệt nên bộ khung nhân cách khởi thủy cho đứa trẻ trước khi hòa nhập môi trường học đường."
  },
  {
    id: "tlhgd-q195",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Phong cách giáo dục gia đình 'Uy quyền áp đặt' (authoritarian parenting) thường dắt díu trẻ đến xu hướng tâm lý:",
    options: [
          "Cực kỳ tự tin và có năng lực giao tiếp xã hội xuất chúng",
          "Sợ hãi rụt rè, thiếu tự chủ, dễ nảy sinh tâm lý chống đối ngầm giấu kín hoặc bùng nổ bạo lực khi thoát khỏi tầm kiểm soát",
          "Có năng lực sáng tạo vượt bậc không giới hạn",
          "Vô cùng hiếu thảo tôn trọng lẽ phải tự nguyện"
    ],
    correctOption: 1,
    explanation: "Sự ngột ngạt của kỷ luật sắt và thiếu thốn tình thương bóp nghẹt tính tự lập cá nhân; trẻ dồn tích uất ức dẫn tới bất ổn tâm lý thầm lặng."
  },
  {
    id: "tlhgd-q196",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Để thiết kế một mối liên kết chặt chẽ keo sơn hiệu quả nhất giữa Gia đình và Nhà trường trong việc uốn nắn học sinh cá biệt, giáo viên cần:",
    options: [
          "Liên tục gọi điện trách móc mắng mỏ mắng dằn hắt phụ huynh mỗi khi con họ phạm lỗi",
          "Chủ động đối thoại tích cực, lắng nghe hoàn cảnh gia đình của trẻ, cùng thống nhất kế hoạch giàn giáo nâng đỡ em tiến bộ từng bước",
          "Yêu cầu phụ huynh ký cam kết chịu hoàn toàn trách nhiệm và đuổi học nếu tái phạm",
          "Che giấu mọi khuyết điểm của em để tránh phụ huynh phiền lòng"
    ],
    correctOption: 1,
    explanation: "Mối quan hệ đồng hành sư phạm tôn trọng giữa gia đình và thầy cô tạo lập tấm lưới an toàn vững chãi chở che hỗ trợ em vượt qua khủng hoảng."
  },
  {
    id: "tlhgd-q197",
    topicId: 5,
    difficulty: "nhan_biet",
    questionText: "Khái niệm 'Tham vấn học đường' (School Counseling) hiện đại đóng vai trò đặc thù gì?",
    options: [
          "Là nơi trừng phạt răn đe học sinh vi phạm nội quy nặng nề",
          "Là dịch vụ hỗ trợ tâm lý chuyên nghiệp gỡ rối khó khăn cảm xúc, định hướng học tập và giải phóng các căng thẳng trầm cảm học đường của học sinh",
          "Phòng chức năng để dạy thêm các môn học văn hóa nâng cao",
          "Nơi rà soát hồ sơ hành chính học bạ của toàn trường"
    ],
    correctOption: 1,
    explanation: "Tham vấn học đường như một bệnh viện bỏ túi xoa dịu các vết rách tổn thương tinh thần, nâng tầm sức khỏe tâm thần học đường tối ưu."
  },
  {
    id: "tlhgd-q198",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Khi tiến hành tham vấn tâm lý cho một học sinh đang chịu trầm cảm vì áp lực thi cử kiệt sức, nguyên tắc tối thượng nhà tham vấn phải tuân thủ là:",
    options: [
          "Công khai tên tuổi và cuộc trò chuyện lên bảng tin trường để cảnh tỉnh các học sinh khác",
          "Tôn trọng tuyệt đối quyền bảo mật thông tin cá nhân của học sinh và lắng nghe thấu cảm chân thành không phán xét",
          "La rầy phê bình em quá yếu đuối thiếu kiên cường",
          "Phải báo cáo tường nhận mọi lời lẽ của em lên ban giám hiệu"
    ],
    correctOption: 1,
    explanation: "Nguyên tắc bảo mật thông tin (confidentiality) và thái độ chấp nhận vô điều kiện xây dựng niềm tin sắt son để trẻ dám mở lòng gỡ gỡ rối."
  },
  {
    id: "tlhgd-q199",
    topicId: 5,
    difficulty: "van_dung",
    questionText: "Khi phát hiện một học sinh trong lớp học có các dấu hiệu tự hủy hoại bản thân hoặc có ý nghĩ tiêu cực hiểm nguy về tính mạng, giáo viên cần:",
    options: [
          "Xem là chuyện trẻ con dỗi dỗi vô lý rồi phớt lờ bỏ qua",
          "Bảo vệ an toàn thể chất cho em lập tức, kết nối chuyên gia tâm lý học đường tham vấn khẩn cấp và đồng hành sát sao cùng gia đình em",
          "Mắng mỏ nhắc nhở em trước lớp để em bỏ ý nghĩ dại dột",
          "Đuổi học em ra khỏi trường ngay để tránh rắc rối hành chính"
    ],
    correctOption: 1,
    explanation: "Sự can thiệp kịp thời chuyên nghiệp cứu sinh một cuộc đời; dốc tình thương yêu bảo bọc kết sức mạnh liên ngành chở che nâng đỡ con."
  },
  {
    id: "tlhgd-q200",
    topicId: 5,
    difficulty: "thong_hieu",
    questionText: "Mục tiêu tối thượng, nhân văn cao đẹp nhất của công tác Giáo dục trong thời đại chuyển đổi số văn minh ngày nay là:",
    options: [
          "Chỉ đào tạo ra những thế hệ ghi nhớ thông tin máy móc như robot cứu trợ",
          "Khơi dậy lòng nhân ái, mài sắc trí tuệ tự chủ, bồi đắp tư cách đạo đức và năng lực tự học làm chủ cuộc đời dấn thân cống hiến giá trị cao đẹp",
          "Biến học đường thành một công xưởng sàng lọc gắt gao",
          "Hạn chế tối đa các hoạt động tương tác vật lý trực tiếp xã hội"
    ],
    correctOption: 1,
    explanation: "Dạy học nâng tầm giá trị cá nhân; kiến tạo những cá rạng rỡ có trái tim nóng sòng phẳng và khối óc sáng hiến dâng hương sắc rực rỡ cho đời."
  }
];
