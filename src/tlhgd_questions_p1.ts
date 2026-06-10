/**
 * Educational Psychology Quiz Database
 * Part 1: Chapters 1, 2, and 3 (Questions 1 - 50)
 */

import { VNUQuestion } from "./vnu1001_questions";

export const TLHGD_QUESTIONS_P1: VNUQuestion[] = [
  // --- CHƯƠNG 1 (Q1 - Q25) ---
  {
    id: "tlhgd-q1",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Tâm lý người là gì?",
    options: [
      "Hiện tượng sinh học bẩm sinh",
      "Sự phản ánh hiện thực khách quan vào não người",
      "Hoạt động của hệ thần kinh",
      "Hành vi bên ngoài"
    ],
    correctOption: 1,
    explanation: "Tâm lý người là sự phản ánh hiện thực khách quan vào não người thông qua hoạt động chủ thể."
  },
  {
    id: "tlhgd-q2",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Quan điểm duy vật biện chứng cho rằng nguồn gốc tâm lý người là:",
    options: [
      "Linh hồn",
      "Não bộ",
      "Hiện thực khách quan tác động vào não người",
      "Di truyền"
    ],
    correctOption: 2,
    explanation: "Nguồn gốc tâm lý là hiện thực khách quan tác động vào não người thông qua hoạt động."
  },
  {
    id: "tlhgd-q3",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Ai được coi là người sáng lập tâm lý học khoa học?",
    options: ["Freud", "Pavlov", "W. Wundt", "Skinner"],
    correctOption: 2,
    explanation: "W. Wundt được xem là người sáng lập tâm lý học khoa học/thực nghiệm với phòng thí nghiệm đầu tiên năm 1879."
  },
  {
    id: "tlhgd-q4",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Phương pháp thực nghiệm trong tâm lý học nhằm mục đích gì?",
    options: [
      "Quan sát tự nhiên",
      "Can thiệp có kiểm soát để nghiên cứu hiện tượng tâm lý",
      "Phỏng vấn đối tượng",
      "Thu thập tiểu sử"
    ],
    correctOption: 1,
    explanation: "Thực nghiệm là can thiệp có kiểm soát để chủ động gây ra các hiện tượng nhằm nghiên cứu quy luật tâm lý."
  },
  {
    id: "tlhgd-q5",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Hiện tượng tâm lý người có đặc điểm nào sau đây?",
    options: [
      "Mang tính vật chất",
      "Mang tính chủ quan",
      "Tồn tại độc lập với não",
      "Không thay đổi"
    ],
    correctOption: 1,
    explanation: "Tâm lý mang tính chủ thể/chủ quan, thể hiện ở việc mỗi người phản ánh hiện thực theo cách riêng."
  },
  {
    id: "tlhgd-q6",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Chức năng định hướng của tâm lý thể hiện ở việc:",
    options: [
      "Điều chỉnh hành vi",
      "Phản ánh thế giới",
      "Giúp con người xác định mục đích hoạt động",
      "Điều hòa cảm xúc"
    ],
    correctOption: 2,
    explanation: "Chức năng định hướng giúp con người xác định mục đích, phương hướng cụ thể cho hoạt động."
  },
  {
    id: "tlhgd-q7",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Hiện tượng tâm lý nào sau đây thuộc về quá trình nhận thức?",
    options: ["Ý chí", "Tình cảm", "Tri giác", "Khí chất"],
    correctOption: 2,
    explanation: "Tri giác thuộc quá trình nhận thức cảm tính của con người."
  },
  {
    id: "tlhgd-q8",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Quy luật hình thành tâm lý người chịu sự chi phối mạnh mẽ của:",
    options: [
      "Di truyền",
      "Môi trường xã hội và hoạt động",
      "Tuổi sinh học",
      "Giới tính"
    ],
    correctOption: 1,
    explanation: "Tâm lý người hình thành mạnh mẽ trong môi trường xã hội, thông qua giáo dục và hoạt động của bản thân."
  },
  {
    id: "tlhgd-q9",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Phương pháp phỏng vấn dùng để làm gì?",
    options: [
      "Đo lường trí tuệ",
      "Thu thập thông tin qua trao đổi trực tiếp",
      "Ghi nhận hành vi",
      "Thực nghiệm phòng thí nghiệm"
    ],
    correctOption: 1,
    explanation: "Phỏng vấn là phương pháp trò chuyện trực tiếp để thu thập thông tin về thái độ, tư tưởng và cảm xúc."
  },
  {
    id: "tlhgd-q10",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Phân loại hiện tượng tâm lý theo thời gian tồn tại bao gồm các nhóm nào?",
    options: [
      "Nhận thức – tình cảm – ý chí",
      "Quá trình – trạng thái – thuộc tính",
      "Cá nhân – xã hội",
      "Bẩm sinh – học được"
    ],
    correctOption: 1,
    explanation: "Dựa vào thời gian tồn tại, tâm lý người bao gồm: quá trình tâm lý, trạng thái tâm lý và thuộc tính tâm lý."
  },
  {
    id: "tlhgd-q11",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Nhiệm vụ cơ bản của khoa học tâm lý học là:",
    options: [
      "Mô tả các hiện tượng sinh lý",
      "Giải thích, dự đoán và điều khiển các hiện tượng tâm lý",
      "Nghiên cứu cấu trúc não",
      "Đo lường trí tài năng"
    ],
    correctOption: 1,
    explanation: "Tâm lý học có nhiệm vụ giải thích cơ chế, dự đoán chiều hướng phát triển và điều khiển ứng xử hoặc hiện tượng tâm lý."
  },
  {
    id: "tlhgd-q12",
    topicId: 1,
    difficulty: "van_dung",
    questionText: "Phương pháp điều tra bằng bảng hỏi cho phép nhà nghiên cứu thực hiện hoạt động nào?",
    options: [
      "Can thiệp trực tiếp vào đối tượng",
      "Thu thập thông tin từ số lượng lớn đối tượng",
      "Quan sát hành vi tự nhiên",
      "Nghiên cứu chiều sâu nhân cách cá nhân"
    ],
    correctOption: 1,
    explanation: "Bảng hỏi (survey) rất phù hợp để khảo sát và thu thập dữ liệu nhanh chóng từ số lượng lớn đối tượng."
  },
  {
    id: "tlhgd-q13",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Phương pháp trắc nghiệm (test) tâm lý chủ yếu dùng để làm gì?",
    options: [
      "Nghiên cứu tiểu sử",
      "Đánh giá các đặc điểm tâm lý bằng công cụ chuẩn hóa",
      "Quan sát hành vi tự nhiên",
      "Phỏng vấn tự do không cấu trúc"
    ],
    correctOption: 1,
    explanation: "Trắc nghiệm tâm lý dùng các công cụ đã được tiêu chuẩn hóa để đánh giá định lượng các khía cạnh năng lực hoặc tính cách."
  },
  {
    id: "tlhgd-q14",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Hiện tượng tâm lý người mang bản chất xã hội rõ rệt vì nguyên nhân nào?",
    options: [
      "Do di truyền quyết định hoàn toàn",
      "Hình thành trực tiếp trong đời sống và hoạt động xã hội",
      "Phụ thuộc chặt chẽ vào cấu trúc tế bào não",
      "Do bản năng bẩm sinh chi phối"
    ],
    correctOption: 1,
    explanation: "Tâm lý có bản chất xã hội vì phản ánh các mối quan hệ xã hội, hình thành qua các hoạt động và giao lưu thực tiễn."
  },
  {
    id: "tlhgd-q15",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Chức năng điều chỉnh của tâm lý thể hiện ở khả năng nào?",
    options: [
      "Nhận biết hình dáng sự vật",
      "Điều khiển hành vi cho phù hợp với mục đích đã định",
      "Ghi nhớ thông tin lý thuyết",
      "Tri giác không gian ba chiều"
    ],
    correctOption: 1,
    explanation: "Chức năng điều chỉnh giúp định hướng và điều khiển các hoạt động thực tế để thích ứng hoặc đạt mục tiêu."
  },
  {
    id: "tlhgd-q16",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Ý thức của con người được xem là hình thức nào sau đây?",
    options: [
      "Thấp nhất của tâm lý",
      "Cao nhất của sự phát triển tâm lý người",
      "Tương đương với tâm lý động vật có xương sống",
      "Phản xạ sinh học bẩm sinh"
    ],
    correctOption: 1,
    explanation: "Ý thức là hình thức phản ánh tâm lý cao nhất, giúp con người nhận thức thế giới và tự điều chỉnh bản thân một cách có mục đích."
  },
  {
    id: "tlhgd-q17",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Hiện tượng tâm lý nào sau đây được phân loại vào trạng thái tâm lý?",
    options: ["Tri giác", "Tư duy", "Chú ý", "Năng lực"],
    correctOption: 2,
    explanation: "Chú ý là một trạng thái tâm lý đi kèm, bảo đảm điều kiện tối ưu cho các hoạt động nhận thức diễn ra hiệu quả."
  },
  {
    id: "tlhgd-q18",
    topicId: 1,
    difficulty: "nhan_biet",
    questionText: "Hiện tượng tâm lý nào sau đây được phân loại vào thuộc tính tâm lý nhân cách?",
    options: ["Xúc cảm", "Tình cảm", "Năng lực", "Tri giác"],
    correctOption: 2,
    explanation: "Năng lực là một thuộc tính tâm lý ổn định, bền vững của cá nhân."
  },
  {
    id: "tlhgd-q19",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Quy luật phát triển tâm lý người mang tính 'không đồng đều' có nghĩa là gì?",
    options: [
      "Mọi mặt tâm lý đều phát triển song hành cùng lúc",
      "Các chức năng tâm lý khác nhau phát triển với tốc độ và thời điểm khác nhau",
      "Tâm lý con người hoàn toàn không biến đổi",
      "Chỉ có sự phát triển diễn ra ở giai đoạn trẻ em"
    ],
    correctOption: 1,
    explanation: "Tính không đồng đều thể hiện ở việc các chức năng và cấu trúc tâm lý có nhịp độ phát triển tối ưu tại các thời kỳ khác nhau."
  },
  {
    id: "tlhgd-q20",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Quy luật phát triển lịch sử - xã hội của tâm lý nhấn mạnh vai trò quyết định của yếu tố nào?",
    options: [
      "Yếu tố di truyền bẩm sinh",
      "Hoạt động sinh lý tự phát của cơ thể",
      "Điều kiện sống xã hội và bối cảnh lịch sử",
      "Giới tính sinh học"
    ],
    correctOption: 2,
    explanation: "Bối cảnh xã hội và lịch sử cung cấp hệ thống văn hóa, công cụ để cá nhân chiếm lĩnh và phát triển tâm lý người."
  },
  {
    id: "tlhgd-q21",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Sự phát triển tâm lý của một cá nhân diễn ra mạnh mẽ và thực chất nhất thông qua:",
    options: [
      "Trạng thái nghỉ ngơi tĩnh lặng",
      "Hoạt động thực tiễn và quá trình giao tiếp xã hội",
      "Giấc ngủ ban đêm đầy đủ",
      "Các phản ứng bẩm sinh tự động"
    ],
    correctOption: 1,
    explanation: "Học trò kiến tạo tâm lý và bồi đắp nhân cách chỉ qua tính tích cực hoạt động và giao tiếp tương tác với thế giới xung quanh."
  },
  {
    id: "tlhgd-q22",
    topicId: 1,
    difficulty: "van_dung",
    questionText: "Phương pháp nghiên cứu tiểu sử thường dùng mục đích chủ yếu để làm gì?",
    options: [
      "Nghiên cứu lịch sử hình thành và sự phát triển nhân cách cá nhân",
      "Đo lường dung lượng trí nhớ ngắn hạn",
      "Tập trung thực nghiệm trong phòng thí nghiệm",
      "Quan sát hành vi ứng xử tức thời"
    ],
    correctOption: 0,
    explanation: "Phương pháp tiểu sử giúp phục dựng toàn bộ quá trình phát triển nhân cách lâu dài của đối tượng nghiên cứu."
  },
  {
    id: "tlhgd-q23",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Tính chủ thể của hiện tượng tâm lý người biểu hiện rõ ràng ở khía cạnh nào sau đây?",
    options: [
      "Mọi người phản ánh hiện thực một cách máy móc và thụ động",
      "Mỗi cá nhân chủ động phản ánh và kiến giải thế giới theo lăng kính riêng biệt",
      "Hình ảnh phản ánh giống hệt nhau ở tất cả mọi người",
      "Tâm lý do di truyền quyết định hoàn toàn bền vững"
    ],
    correctOption: 1,
    explanation: "Tính chủ thể có nghĩa là cùng một tác động bên ngoài nhưng mỗi người phản ánh sắc thái và thái độ riêng dựa trên vốn sống của mình."
  },
  {
    id: "tlhgd-q24",
    topicId: 1,
    difficulty: "van_dung",
    questionText: "Trong các phương pháp nghiên cứu, phương pháp nào cho phép nhà khoa học kiểm soát các biến số tốt nhất?",
    options: ["Quan sát", "Phỏng vấn sâu", "Thực nghiệm", "Điều tra khảo sát"],
    correctOption: 2,
    explanation: "Thực nghiệm cho phép nhà nghiên cứu can thiệp chủ động, cô lập và điều chỉnh các biến số độc lập tác động."
  },
  {
    id: "tlhgd-q25",
    topicId: 1,
    difficulty: "thong_hieu",
    questionText: "Quy luật chuyển hóa từ lượng sang chất trong phát triển tâm lý thể hiện ở việc:",
    options: [
      "Tâm lý giữ nguyên trạng thái cố định suốt đời",
      "Sự tích lũy dần dần các thay đổi cục bộ dẫn đến bước nhảy đột biến về tính chất tâm lý mới",
      "Sự thay đổi về số lượng kiến thức ghi nhớ máy móc",
      "Tâm lý chịu sự chi phối hoàn toàn của di truyền sinh học"
    ],
    correctOption: 1,
    explanation: "Sự phát triển tâm lý không phải là sự tăng tiến số lượng phẳng lặng, mà là sự biến đổi đột phá về chất từ tích lũy các thay đổi bên trong."
  },

  // --- CHƯƠNG 2 (Q26 - Q38) ---
  {
    id: "tlhgd-q26",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Đơn vị cấu trúc và chức năng cơ bản nhất cấu thành hệ thần kinh là:",
    options: ["Tế bào liên kết", "Nơron", "Tủy sống", "Bộ não tối cao"],
    correctOption: 1,
    explanation: "Nơron (tế bào thần kinh) đảm bảo tiếp nhận, xử lý và phát tín hiệu luồng xung động thần kinh."
  },
  {
    id: "tlhgd-q27",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Phản xạ không điều kiện có đặc điểm cốt lõi nào sau đây?",
    options: [
      "Do quá trình học tập bền bỉ hình thành",
      "Mang tính chất bẩm sinh, di truyền, bền vững theo loài",
      "Mang tính văn hóa xã hội biến động",
      "Phụ thuộc chặt chẽ vào ngôn ngữ thứ hai"
    ],
    correctOption: 1,
    explanation: "Phản xạ không điều kiện là bẩm sinh, duy trì bản năng sinh học cốt yếu và được truyền lại qua di truyền loài."
  },
  {
    id: "tlhgd-q28",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Phản xạ có điều kiện của con người được hình thành trong suốt quá trình:",
    options: [
      "Di truyền sinh học thụ động",
      "Học tập, rèn luyện cá thể thích ứng với môi trường sống",
      "Sinh trưởng tự phát của cơ thể",
      "Hình thành bẩm sinh từ phôi thai"
    ],
    correctOption: 1,
    explanation: "Phản xạ có điều kiện là những liên hệ thần kinh tạm thời được hình thành thông qua trải nghiệm thực tế đời sống cá nhân."
  },
  {
    id: "tlhgd-q29",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Hoạt động thần kinh cấp cao của con người chủ yếu diễn ra tại bộ phận nào?",
    options: ["Thân não", "Tiểu não", "Vỏ não", "Hành tủy"],
    correctOption: 2,
    explanation: "Vỏ não là trung khu cao cấp nhất đảm nhận việc hình thành và điều hòa các phản xạ có điều kiện và đời sống tâm lý tự ý thức."
  },
  {
    id: "tlhgd-q30",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Quy luật 'lan tỏa' trong hoạt động thần kinh cấp cao được phát biểu là:",
    options: [
      "Xung động thần kinh chỉ tập trung cô lập tại một điểm",
      "Hưng phấn hoặc ức chế phát sinh tại một điểm sẽ lan rộng ra các vùng thần kinh xung quanh",
      "Không thay đổi vị trí tác động",
      "Xảy ra ngẫu nhiên hoàn toàn không thể dự báo"
    ],
    correctOption: 1,
    explanation: "Hưng phấn hoặc ức chế khi mới xuất hiện sẽ lan tỏa sang các vùng thần kinh lân cận trước khi tập trung lại."
  },
  {
    id: "tlhgd-q31",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Quy luật 'tập trung' của hoạt động thần kinh cấp cao thể hiện ở việc:",
    options: [
      "Sự phân tán hưng phấn tràn lan",
      "Hưng phấn hoặc ức chế co cụm, dồn về một trung khu nhất định",
      "Triệt tiêu hoàn toàn khả năng phản xạ",
      "Giảm sút nghiêm trọng sự chú ý tập trung"
    ],
    correctOption: 1,
    explanation: "Sau quá trình lan tỏa, các xung động thần kinh có xu hướng cô cụm lại tại trung khu phát sinh ban đầu để xử lý chuyên sâu."
  },
  {
    id: "tlhgd-q32",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Quy luật 'cảm ứng' trong hoạt động thần kinh cấp cao mô tả điều gì?",
    options: [
      "Hưng phấn luôn duy trì ưu thế tuyệt đối",
      "Hưng phấn và ức chế hoàn toàn độc lập, tách rời",
      "Quá trình hưng phấn ở vùng này kéo theo ức chế ở các vùng xung quanh hoặc ngược lại",
      "Sự suy giảm nhạy bén cảm giác"
    ],
    correctOption: 2,
    explanation: "Cảm ứng tương hỗ thể hiện sự tương tác phủ định lẫn nhau giữa hưng phấn và ức chế giúp hoạt động não bộ diễn ra chọn lọc sắc bén."
  },
  {
    id: "tlhgd-q33",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Cơ sở vật chất sinh lý trực tiếp nhất của tâm lý người là gì?",
    options: [
      "Hệ thống cơ xương khớp",
      "Hệ thống nội tiết sải rộng",
      "Hoạt động của hệ thần kinh, đặc biệt là đại não tối cao",
      "Hệ tuần hoàn máu bền bỉ"
    ],
    correctOption: 2,
    explanation: "Não bộ hoạt động bình thường là cơ quan phản ánh trực tiếp thế giới khách quan thành hình ảnh tâm lý của chủ thể."
  },
  {
    id: "tlhgd-q34",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Đặc điểm nổi bật của hệ thần kinh trẻ em so với người trưởng thành là gì?",
    options: [
      "Quá trình ức chế hoàn toàn trội hơn hưng phấn",
      "Quá trình hưng phấn luôn chiếm ưu thế vượt trội, dẫn tới dễ kích động",
      "Trạng thái thăng bằng tuyệt đối vững bền",
      "Không chịu thay đổi dưới tác động học tập"
    ],
    correctOption: 1,
    explanation: "Trẻ em có hệ thần kinh chưa hoàn thiện, khả năng ức chế còn yếu nên quá trình hưng phấn luôn biểu hiện lấn lướt."
  },
  {
    id: "tlhgd-q35",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Sự phát triển thể chất nổi bật của lứa tuổi thiếu niên (11 - 15 tuổi) mang đặc điểm nào?",
    options: [
      "Phát triển cực kỳ chậm chạp phẳng lặng",
      "Phát triển hài hòa và vô cùng ổn định",
      "Phát triển mạnh mẽ, nhảy vọt nhưng mang tính chất không cân đối",
      "Ngừng hẳn mọi tiến trình dậy thì sinh học"
    ],
    correctOption: 2,
    explanation: "Thời kỳ dậy thì tuổi thiếu niên chứng kiến sự phát triển đột phá chiều cao, hệ xương nhưng không đồng đều giữa hệ tuần hoàn và cơ bắp."
  },
  {
    id: "tlhgd-q36",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Hệ thần kinh trung ương ở con người bao gồm các bộ phận nào?",
    options: [
      "Đại não và hệ dây thần kinh bám dọc",
      "Não bộ nằm trong hộp sọ và tủy sống chạy dọc cột sống",
      "Tủy sống và các hạch thần kinh ngoại biên",
      "Hệ thần kinh giao cảm và phó giao cảm"
    ],
    correctOption: 1,
    explanation: "Hệ thần kinh trung ương gồm não bộ và tủy sống đảm nhiệm điều hòa các phản ứng cốt lõi toàn cơ thể."
  },
  {
    id: "tlhgd-q37",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Vai trò chủ yếu hàng đầu của tiểu não trong hệ thần kinh là gì?",
    options: [
      "Điều khiển và sáng tạo tư duy logic",
      "Điều hóa trương lực cơ và duy trì phối hợp, thăng bằng vận động",
      "Hỗ trợ hình thành nhanh các phản xạ ngôn ngữ",
      "Lưu trữ dài hạn ký ức sự kiện"
    ],
    correctOption: 1,
    explanation: "Tiểu não đóng vai trò điều phối tinh vi tinh chuẩn tốc độ, cường độ lực cơ cho các hành vi vận động tự do."
  },
  {
    id: "tlhgd-q38",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Sự phát triển thể chất của một con người chịu sự tác động tương hỗ mạnh mẽ nhất bởi:",
    options: [
      "Di truyền bẩm sinh từ cha mẹ phối hợp với môi trường sống và dinh dưỡng",
      "Yếu tố giới tính sinh học đơn độc",
      "Năng lực trí tuệ bẩm sinh",
      "Trạng thái tự ý thức rèn luyện"
    ],
    correctOption: 0,
    explanation: "Di truyền vẽ ra giới hạn ranh giới tiềm năng vật chất, trong khi môi trường sống và chế độ vận động thực tế biến tiềm năng thành hiện thực."
  },

  // --- CHƯƠNG 3 (Q39 - Q50) ---
  {
    id: "tlhgd-q39",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Phản xạ nào sau đây được phân loại vào phản xạ không điều kiện?",
    options: [
      "Nhìn thấy biển báo giao thông dừng xe lại",
      "Đi xe đạp thăng bằng qua hẻm hẹp",
      "Tiết nước bọt tự động khi thức ăn chạm trực tiếp vào lưỡi",
      "Giải toán nhanh bằng công thức tích phân"
    ],
    correctOption: 2,
    explanation: "Tiết nước bọt khi lưỡi tiếp xúc vật chất là phản xạ bản năng sinh học bẩm sinh không cần qua rèn luyện."
  },
  {
    id: "tlhgd-q40",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Điểm đặc trưng cốt yếu của phản xạ có điều kiện là gì?",
    options: [
      "Bền vững tuyệt đối suốt đời không thay đổi",
      "Tồn tại cố định độc lập hoàn toàn với hoạt động cơ thể",
      "Dễ bị ức chế, lu mờ dần rồi biến mất nếu không được củng cố thường xuyên",
      "Không chịu ảnh hưởng bởi các yếu tố môi trường"
    ],
    correctOption: 2,
    explanation: "Nếu kích thích có điều kiện không được đi kèm phối hợp thường xuyên với kích thích không điều kiện, cung phản xạ sẽ dập tắt."
  },
  {
    id: "tlhgd-q41",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Ở lứa lứa tuổi người trưởng thành, tiến trình phát triển và hoàn thiện thể chất có xu hướng chung là:",
    options: [
      "Tăng trưởng tột bậc liên tục không giới hạn",
      "Suy giảm đột ngột toàn diện hệ thống",
      "Duy trì trạng thái ổn định tương đối",
      "Hoàn toàn biến mất không tồn tại biến đổi"
    ],
    correctOption: 2,
    explanation: "Người trưởng thành đạt độ chín sinh học cao, cấu trúc xương và chức năng các hệ thống đi vào pha ổn định tương đối."
  },
  {
    id: "tlhgd-q42",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Quy luật phát triển sinh lý nào ảnh hưởng trực tiếp cơ bản đến quá trình phát triển tâm lý học sinh?",
    options: [
      "Quy luật ngẫu nhiên phát sinh",
      "Quy luật đồng đều tuyệt đối giữa các cơ quan",
      "Quy luật phát triển không đồng đều của các hệ thống sinh lý",
      "Quy luật tĩnh hoàn toàn tĩnh tại"
    ],
    correctOption: 2,
    explanation: "Do vỏ não, hệ xương, hệ tuần hoàn dậy thì phát dục không đồng đều, trẻ phát sinh các biến đổi xáo trộn tâm lý phức tạp cần thấu cảm nâng đỡ."
  },
  {
    id: "tlhgd-q43",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Đặc điểm cơ bản nhất tạo nên sự khác biệt giữa hoạt động thần kinh cấp cao ở người so với động vật là:",
    options: [
      "Sự xuất hiện của cung phản xạ đơn giản",
      "Có hệ thần kinh sinh học đồng nhất",
      "Sự xuất hiện của hệ thống tín hiệu thứ hai - ngôn ngữ và chữ viết",
      "Khả năng cảm giác thụ động với thức ăn"
    ],
    correctOption: 2,
    explanation: "Con người sử dụng hệ thống ngôn ngữ làm phương tiện biểu đạt trừu tượng hóa, tư duy khái quát vượt tầm thế giới cảm quan trực tiếp."
  },
  {
    id: "tlhgd-q44",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Thuật ngữ 'Hệ thống tín hiệu thứ nhất' trong tâm lý khoa học ám chỉ:",
    options: [
      "Các khái niệm khoa học trừu tượng",
      "Chữ viết và ngôn ngữ giao tiếp phức tạp",
      "Các kích thích trực tiếp và hình ảnh thế giới khách quan tác động trực tiếp",
      "Bản năng di truyền tự vệ"
    ],
    correctOption: 2,
    explanation: "Hệ thống tín hiệu thứ nhất là các kích thích vật lý, quang học, âm thanh cụ thể từ tự nhiên sờ nắn tri giác trực tiếp được."
  },
  {
    id: "tlhgd-q45",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Thuật ngữ 'Hệ thống tín hiệu thứ hai' là đặc trưng của con người, chủ yếu bao gồm:",
    options: [
      "Hành vi cử chỉ phản ứng tự vệ",
      "Hình ảnh thế giới lướt nhanh qua",
      "Hệ thống ngôn ngữ truyền thông tin trực tiếp hoặc gián tiếp đầy ý nghĩa",
      "Các kích thích sinh học bẩm sinh"
    ],
    correctOption: 2,
    explanation: "Hệ thống tín hiệu thứ hai là ngôn ngữ (tiếng nói, chữ viết) thay thế cho các tín hiệu trực tiếp, đóng vai trò công cụ tư duy khái quát."
  },
  {
    id: "tlhgd-q46",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Hoạt động chủ đạo chi phối trực tiếp nhất sự hình thành tâm lý học sinh tiểu học là:",
    options: ["Vui chơi tự phát", "Hoạt động lao động gia đình", "Hoạt động học tập trong nhà trường", "Giao tiếp nhóm bạn bí mật"],
    correctOption: 2,
    explanation: "Học tập trở thành hoạt động chủ đạo, chuyển tư duy trực quan cụ thể sang tư duy logic khái quát của học sinh tiểu học."
  },
  {
    id: "tlhgd-q47",
    topicId: 2,
    difficulty: "nhan_biet",
    questionText: "Theo quan điểm tâm lý học hoạt động, Hoạt động được định nghĩa là:",
    options: [
      "Hành vi phản ứng bẩm sinh tự phát của cơ thể",
      "Quá trình con người thực hiện tác động chủ động vào thế giới nhằm biến đổi và thỏa mãn nhu cầu",
      "Trạng thái tâm lý thụ động đứng nhìn",
      "Chuỗi phản xạ sinh học không điều kiện"
    ],
    correctOption: 1,
    explanation: "Hoạt động là quá trình chủ thể tương tác bằng công cụ với đối tượng khách thể để biến đổi khách thể và hoàn thiện chính mình."
  },
  {
    id: "tlhgd-q48",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Cấu trúc vĩ mô chung đầy đủ của một Hoạt động hoàn chỉnh bao gồm các thành phần:",
    options: [
      "Nhu cầu – động cơ – mục đích – hành động – thao tác",
      "Ý thức – phản ứng hành vi – cảm xúc đồng hành",
      "Chủ thể – khách thể tác động đơn thuần",
      "Nhận thức – cảm xúc – ý chí quyết tâm"
    ],
    correctOption: 0,
    explanation: "Hoạt động bao gồm các cấp độ tương ứng biện chứng: Hoạt động (Động cơ), Hành động (Mục đích) và Thao tác (Điều kiện thực hiện)."
  },
  {
    id: "tlhgd-q49",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Động cơ của hoạt động được định nghĩa bản chất là:",
    options: [
      "Kết quả cuối cùng đạt được sau hoạt động",
      "Nguyên nhân tâm lý sâu xa thúc đẩy thúc bách con người hành động để chiếm lĩnh đối tượng thỏa mãn nhu cầu",
      "Phương tiện kỹ thuật dùng để thực hiện công việc",
      "Điều kiện khách quan xung quanh hoạt động"
    ],
    correctOption: 1,
    explanation: "Động cơ là khách thể của nhu cầu, cái thúc đẩy trực tiếp chủ thể dấn thân vào hành vi hoạt động cụ thể."
  },
  {
    id: "tlhgd-q50",
    topicId: 2,
    difficulty: "thong_hieu",
    questionText: "Điểm phân biệt bản chất căn bản nhất giữa Hành động và Hoạt động là:",
    options: [
      "Hành động chịu sự chi phối của bản năng bẩm sinh",
      "Hành động hướng tới việc hoàn thành một Mục đích bộ phận rõ rệt",
      "Hành động hoàn toàn không có sự tham gia của ý thức",
      "Hành động không phụ thuộc vào phương tiện thực hiện"
    ],
    correctOption: 1,
    explanation: "Hành động là thành phần cấu thành hoạt động, có mục đích cụ thể có thể ý thức và kiểm soát được trực tiếp."
  }
];
