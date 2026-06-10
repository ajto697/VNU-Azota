export interface CompactTestQuestion {
  q: string;
  o: string[];
  c: number;
  e: string;
}

export interface PLDCOfficialExam {
  id: string;
  testId: number;
  title: string;
  description: string;
  questions: CompactTestQuestion[];
}

export const PLDC_EXAMS_PART1: PLDCOfficialExam[] = [
  {
    id: "pldc-exam-t1",
    testId: 1,
    title: "Đề thi Pháp luật đại cương Số 1",
    description: "Đề chuẩn thi thử học kỳ Pháp luật đại cương, rèn luyện 40 câu hỏi nâng cao.",
    questions: [
      {
        q: "Nhà nước là một tổ chức đặc biệt của quyền lực chính trị công cộng, có bộ máy chuyên làm nhiệm vụ cưỡng chế, có lãnh thổ và phân chia dân cư theo lãnh thổ. Định nghĩa này thể hiện đặc trưng cơ bản nào của nhà nước?",
        o: ["Quyền lực công cộng đặc biệt và phân chia dân cư theo lãnh thổ", "Tính giai cấp của nhà nước", "Tính xã hội của nhà nước", "Vai trò kinh tế của nhà nước"],
        c: 0,
        e: "Định nghĩa nêu 2 đặc trưng: quyền lực công cộng và phân chia lãnh thổ. B, C là bản chất, D là vai trò."
      },
      {
        q: "Bản chất của nhà nước thể hiện tập trung nhất ở hai thuộc tính nào?",
        o: ["Tính cưỡng chế và tính tự nguyện", "Tính giai cấp và tính xã hội", "Tính chính trị và tính hành chính", "Tính dân tộc và tính nhân dân"],
        c: 1,
        e: "Bản chất nhà nước gồm tính giai cấp và tính xã hội. C, D không phải."
      },
      {
        q: "Trong nhà nước pháp quyền, quyền lực nhà nước được tổ chức theo nguyên tắc nào để chống lạm quyền?",
        o: ["Tập trung quyền lực vào một cơ quan", "Trao quyền tuyệt đối cho người đứng đầu", "Phân chia và kiểm soát quyền lực giữa các nhánh lập pháp, hành pháp, tư pháp", "Xóa bỏ quyền tư pháp"],
        c: 2,
        e: "Phân quyền là cốt lõi để chống lạm quyền. A, C, D trái bản chất."
      },
      {
        q: "Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam được khẳng định lần đầu tiên trong văn bản nào?",
        o: ["Hiến pháp 1946", "Hiến pháp 1959", "Hiến pháp 1980", "Hiến pháp 2013"],
        c: 3,
        e: "Hiến pháp 2013 lần đầu ghi nhận 'Nhà nước pháp quyền XHCN'."
      },
      {
        q: "Hình thức nhà nước bao gồm những yếu tố nào?",
        o: ["Hình thức chính thể và hình thức cấu trúc nhà nước", "Chế độ chính trị và chế độ kinh tế", "Hình thức chính thể và chế độ chính trị", "Hình thức cấu trúc và chức năng nhà nước"],
        c: 0,
        e: "Hình thức nhà nước gồm hình thức chính thể và cấu trúc."
      },
      {
        q: "Nhà nước đơn nhất là nhà nước có:",
        o: ["Lãnh thổ phân chia thành các bang tự trị", "Lãnh thổ toàn vẹn, thống nhất, có hệ thống cơ quan thống nhất từ trung ương đến địa phương", "Nhiều quốc gia hợp thành", "Hai hệ thống pháp luật song song"],
        c: 1,
        e: "Nhà nước đơn nhất có lãnh thổ thống nhất, một hệ thống cơ quan."
      },
      {
        q: "Pháp luật là gì?",
        o: ["Tập hợp các quy tắc ứng xử trong gia đình", "Các quy định của tổ chức xã hội", "Hệ thống các quy tắc xử sự chung do nhà nước đặt ra hoặc thừa nhận, bảo đảm thực hiện bằng quyền lực nhà nước, nhằm điều chỉnh các quan hệ xã hội", "Những điều răn dạy của tôn giáo"],
        c: 2,
        e: "Định nghĩa chuẩn về pháp luật."
      },
      {
        q: "Chức năng của pháp luật được hiểu là?",
        o: ["Cấu trúc bên trong của pháp luật", "Cách thức ban hành pháp luật", "Hình thức thể hiện pháp luật", "Những phương diện, mặt hoạt động cơ bản của pháp luật, thể hiện vai trò, sứ mệnh của pháp luật đối với xã hội"],
        c: 3,
        e: "Chức năng là những phương diện hoạt động cơ bản của pháp luật."
      },
      {
        q: "Quy phạm pháp luật là gì?",
        o: ["Quy tắc xử sự chung, có tính bắt buộc chung, do nhà nước đặt ra hoặc thừa nhận, nhằm điều chỉnh các quan hệ xã hội", "Những lời khuyên trong cuộc sống", "Các quy định của tổ chức xã hội", "Các nguyên tắc đạo đức"],
        c: 0,
        e: "Quy phạm pháp luật là quy tắc xử sự chung do nhà nước ban hành."
      },
      {
        q: "Cấu trúc của một quy phạm pháp luật gồm những bộ phận nào?",
        o: ["Chủ thể – Khách thể – Nội dung", "Giả định – Quy định – Chế tài", "Điều – Khoản – Điểm", "Phần chung – Phần riêng"],
        c: 1,
        e: "Cấu trúc logic: giả định – quy định – chế tài."
      },
      {
        q: "Sự kiện pháp lý là gì?",
        o: ["Mọi sự kiện xảy ra trong đời sống", "Các văn bản pháp luật", "Những sự kiện, tình huống thực tế mà pháp luật gắn với việc làm phát sinh, thay đổi, chấm dứt quan hệ pháp luật", "Các quyết định hành chính"],
        c: 2,
        e: "Sự kiện pháp lý được pháp luật gắn với hậu quả pháp lý."
      },
      {
        q: "Các hình thức thực hiện pháp luật phổ biến là?",
        o: ["Lập pháp, hành pháp, tư pháp", "Xây dựng, thực thi, bảo vệ", "Nhận biết, thông hiểu, vận dụng", "Tuân thủ, chấp hành, sử dụng, áp dụng"],
        c: 3,
        e: "Bốn hình thức thực hiện pháp luật: tuân thủ, chấp hành, sử dụng, áp dụng."
      },
      {
        q: "Ý thức pháp luật là gì?",
        o: ["Tổng thể những quan điểm, quan niệm, tư tưởng, thái độ, tình cảm, sự đánh giá của con người đối với pháp luật và các hiện tượng pháp lý khác", "Hệ thống các văn bản quy phạm pháp luật", "Các quy tắc đạo đức trong xã hội", "Khả năng nhận thức của con người nói chung"],
        c: 0,
        e: "Ý thức pháp luật gồm tri thức, thái độ, tình cảm về pháp luật."
      },
      {
        q: "Vi phạm pháp luật là gì?",
        o: ["Mọi hành vi không đúng chuẩn mực đạo đức", "Hành vi trái pháp luật, có lỗi, do chủ thể có năng lực trách nhiệm pháp lý thực hiện, xâm hại các quan hệ xã hội được pháp luật bảo vệ", "Hành vi vi phạm nội quy cơ quan", "Hành vi không được số đông đồng tình"],
        c: 1,
        e: "Vi phạm pháp luật có 4 dấu hiệu."
      },
      {
        q: "Các loại trách nhiệm pháp lý bao gồm?",
        o: ["Hình sự, dân sự, hôn nhân", "Hành chính, hình sự, lao động", "Hình sự, hành chính, dân sự, kỷ luật", "Dân sự, hành chính, tố tụng"],
        c: 2,
        e: "4 loại trách nhiệm: hình sự, hành chính, dân sự, kỷ luật."
      },
      {
        q: "Luật Hiến pháp là ngành luật điều chỉnh những quan hệ xã hội cơ bản nào?",
        o: ["Quan hệ mua bán tài sản", "Quan hệ xử lý tội phạm", "Quan hệ lao động giữa người lao động và người sử dụng lao động", "Quan hệ về tổ chức quyền lực nhà nước, chế độ chính trị, kinh tế, văn hóa, xã hội, quyền và nghĩa vụ cơ bản của công dân"],
        c: 3,
        e: "Luật Hiến pháp điều chỉnh các quan hệ cơ bản nhất."
      },
      {
        q: "Phương pháp điều chỉnh đặc trưng của Luật Hành chính là?",
        o: ["Mệnh lệnh – phục tùng", "Bình đẳng, thỏa thuận", "Tranh tụng", "Tự do ý chí"],
        c: 0,
        e: "Hành chính dùng phương pháp mệnh lệnh – phục tùng."
      },
      {
        q: "Đối tượng điều chỉnh của Luật Dân sự là?",
        o: ["Quan hệ công vụ", "Quan hệ tài sản và quan hệ nhân thân phi tài sản giữa các chủ thể bình đẳng", "Quan hệ tội phạm", "Quan hệ quản lý nhà nước"],
        c: 1,
        e: "Dân sự điều chỉnh quan hệ bình đẳng về tài sản và nhân thân."
      },
      {
        q: "Bộ luật Hình sự hiện hành của Việt Nam được ban hành năm nào?",
        o: ["1985", "1999", "2015 (sửa đổi, bổ sung 2017)", "2020"],
        c: 2,
        e: "BLHS 2015 (sửa đổi 2017) là bộ luật hiện hành."
      },
      {
        q: "Nguyên tắc “tranh tụng trong xét xử” được quy định trong văn bản luật nào?",
        o: ["Bộ luật Dân sự", "Bộ luật Hình sự", "Luật Hành chính", "Bộ luật Tố tụng dân sự và Bộ luật Tố tụng hình sự"],
        c: 3,
        e: "Tranh tụng được quy định trong BLTTDS và BLTTHS."
      },
      {
        q: "Tại sao nói Quốc hội là cơ quan đại biểu cao nhất của nhân dân?",
        o: ["Vì Quốc hội do nhân dân trực tiếp bầu ra, đại diện cho ý chí và nguyện vọng của nhân dân", "Vì Quốc hội có quyền lực vô hạn", "Vì Quốc hội không phải chịu trách nhiệm trước ai", "Vì Quốc hội do Chính phủ thành lập"],
        c: 0,
        e: "Quốc hội do dân bầu, đại diện cho dân."
      },
      {
        q: "Vì sao nguyên tắc “tập trung dân chủ” được coi là nguyên tắc cơ bản trong tổ chức bộ máy nhà nước Việt Nam?",
        o: ["Vì nó tập trung mọi quyền lực vào trung ương, không phân cấp", "Vì nó vừa đảm bảo sự lãnh đạo tập trung thống nhất từ trung ương, vừa phát huy tính chủ động, sáng tạo của địa phương, cơ sở", "Vì nó đề cao dân chủ tuyệt đối, không cần kỷ luật", "Vì nó do Đảng quy định, không liên quan đến hiệu quả"],
        c: 1,
        e: "Tập trung dân chủ kết hợp lãnh đạo tập trung và dân chủ."
      },
      {
        q: "Phân biệt quyền lực nhà nước và quyền lực chính trị ở Việt Nam.",
        o: ["Hai khái niệm giống nhau", "Quyền lực chính trị không tồn tại", "Quyền lực nhà nước do nhân dân ủy quyền cho các cơ quan nhà nước thực hiện; quyền lực chính trị thuộc về Đảng Cộng sản với vai trò lãnh đạo", "Quyền lực nhà nước cao hơn quyền lực chính trị"],
        c: 2,
        e: "Quyền lực nhà nước do nhân dân ủy quyền, quyền lực chính trị thuộc Đảng."
      },
      {
        q: "Vì sao Việt Nam không áp dụng mô hình tam quyền phân lập (separation of powers) như Hoa Kỳ?",
        o: ["Vì Việt Nam chưa đủ trình độ", "Vì tam quyền phân lập lạc hậu", "Vì Hiến pháp cấm", "Vì Việt Nam theo chế độ nhất nguyên chính trị, quyền lực nhà nước thuộc về nhân dân, thống nhất dưới sự lãnh đạo của Đảng; phân công, phối hợp, kiểm soát nhưng không tuyệt đối hóa sự đối lập giữa các quyền"],
        c: 3,
        e: "Việt Nam không áp dụng tam quyền phân lập tuyệt đối, mà phân công, phối hợp."
      },
      {
        q: "Tại sao pháp luật cần tính xác định chặt chẽ về mặt hình thức?",
        o: ["Để bảo đảm sự thống nhất, rõ ràng, tránh hiểu sai, tạo điều kiện áp dụng thống nhất", "Để làm đẹp văn bản", "Để khó hiểu", "Để chỉ chuyên gia mới hiểu được"],
        c: 0,
        e: "Tính xác định về hình thức đảm bảo thống nhất, dễ áp dụng."
      },
      {
        q: "Phân biệt văn bản quy phạm pháp luật và văn bản áp dụng pháp luật (cá biệt).",
        o: ["Giống nhau", "Văn bản quy phạm chứa quy tắc chung, áp dụng nhiều lần; văn bản áp dụng giải quyết một trường hợp cụ thể, có giá trị một lần", "Văn bản quy phạm do tòa án ban hành", "Văn bản áp dụng có hiệu lực cao hơn"],
        c: 1,
        e: "Văn bản quy phạm chứa quy tắc chung; văn bản áp dụng giải quyết cá biệt."
      },
      {
        q: "Tại sao Luật Hình sự quy định nguyên tắc “không hồi tố”, trừ trường hợp có lợi cho người phạm tội?",
        o: ["Để khuyến khích tội phạm", "Để làm khó cơ quan tố tụng", "Để bảo đảm quyền con người, tránh bất lợi bất ngờ từ sự thay đổi của pháp luật", "Vì đó là ý thích của nhà làm luật"],
        c: 2,
        e: "Không hồi tố để bảo vệ quyền con người, tránh bất lợi bất ngờ."
      },
      {
        q: "Vì sao năng lực pháp luật và năng lực hành vi có thể tách rời nhau?",
        o: ["Hai năng lực này luôn đi cùng nhau", "Không thể tách rời", "Năng lực hành vi có trước", "Mọi người đều có năng lực pháp luật như nhau, nhưng năng lực hành vi chỉ có khi đủ độ tuổi và nhận thức; người mất năng lực hành vi vẫn có năng lực pháp luật."],
        c: 3,
        e: "Năng lực pháp luật có từ khi sinh; năng lực hành vi phụ thuộc độ tuổi, nhận thức."
      },
      {
        q: "Giải thích tại sao cùng một sự kiện thực tế (mua bán tài sản) có thể làm phát sinh nhiều quan hệ pháp luật khác nhau?",
        o: ["Vì nó tác động đến nhiều ngành luật (dân sự, thuế, hành chính…)", "Vì sự kiện đó phức tạp", "Vì pháp luật quy định tùy tiện", "Vì không có lý do"],
        c: 0,
        e: "Mua bán tài sản phát sinh nhiều quan hệ (dân sự, thuế, đăng ký…)."
      },
      {
        q: "Vì sao có trường hợp hành vi không trái pháp luật nhưng vẫn phải bồi thường thiệt hại (ví dụ: gây thiệt hại do nguồn nguy hiểm cao độ)?",
        o: ["Vì pháp luật sai", "Vì đây là trách nhiệm dân sự không có lỗi, áp dụng cho một số trường hợp đặc biệt nhằm bảo vệ người bị hại, nhưng hành vi đó không phải vi phạm pháp luật (hợp pháp nhưng gây thiệt hại).", "Vì không có lý do", "Vì đó là vi phạm hành chính"],
        c: 1,
        e: "Trách nhiệm dân sự không có lỗi áp dụng cho nguồn nguy hiểm cao độ."
      },
      {
        q: "Vai trò của dư luận xã hội trong việc thực hiện pháp luật là gì?",
        o: ["Quyết định việc xử lý vi phạm", "Thay thế tòa án", "Tạo áp lực tinh thần, góp phần giáo dục, ngăn ngừa vi phạm, nhưng không thể thay thế chế tài nhà nước", "Không có vai trò"],
        c: 2,
        e: "Dư luận xã hội hỗ trợ nhưng không thay thế cưỡng chế nhà nước."
      },
      {
        q: "Mối quan hệ giữa văn hóa pháp luật và vi phạm pháp luật.",
        o: ["Không liên quan", "Văn hóa pháp luật cao làm tăng vi phạm", "Vi phạm là cơ sở của văn hóa pháp luật", "Văn hóa pháp luật thấp là một trong những nguyên nhân dẫn đến vi phạm pháp luật; nâng cao văn hóa pháp luật góp phần phòng ngừa vi phạm"],
        c: 3,
        e: "Văn hóa pháp luật thấp là nguyên nhân dẫn đến vi phạm."
      },
      {
        q: "Phân biệt Luật Hành chính và Luật Dân sự về phương pháp điều chỉnh.",
        o: ["Hành chính dùng phương pháp mệnh lệnh – phục tùng (quyền lực); Dân sự dùng phương pháp bình đẳng, thỏa thuận, tự định đoạt", "Cả hai đều dùng phương pháp bình đẳng", "Hành chính dùng thỏa thuận, Dân sự dùng mệnh lệnh", "Giống nhau"],
        c: 0,
        e: "Hành chính: mệnh lệnh – phục tùng; Dân sự: bình đẳng, thỏa thuận."
      },
      {
        q: "Vì sao Luật Dân sự được coi là “luật chung” của hệ thống luật tư?",
        o: ["Vì nó có hiệu lực cao nhất", "Vì nó quy định các nguyên tắc cơ bản, chế định chung (hợp đồng, sở hữu, thừa kế) áp dụng cho mọi quan hệ dân sự, kinh tế, lao động, hôn nhân… khi luật chuyên ngành không có quy định", "Vì nó do Quốc hội ban hành", "Vì nó dày nhất"],
        c: 1,
        e: "BLDS là luật chung của luật tư, áp dụng khi luật chuyên ngành không quy định."
      },
      {
        q: "Vì sao Luật Hình sự quy định khung hình phạt tù có thời hạn từ 3 năm đến 7 năm là “tội nghiêm trọng” theo phân loại tội phạm?",
        o: ["Vì do nhà làm luật tùy ý", "Vì tù 3-7 năm là trung bình", "Vì Điều 8 BLHS 2015 phân loại: tội ít nghiêm trọng (phạt tù đến 3 năm), tội nghiêm trọng (từ trên 3 đến 7 năm), rất nghiêm trọng (7-15 năm), đặc biệt nghiêm trọng (>15 năm, chung thân, tử hình)", "Vì án phạt tù nào cũng nghiêm trọng"],
        c: 2,
        e: "Phân loại tội phạm theo mức cao nhất của khung hình phạt (Điều 8 BLHS)."
      },
      {
        q: "Vì sao Luật Đất đai quy định đất đai thuộc sở hữu toàn dân do Nhà nước đại diện chủ sở hữu?",
        o: ["Vì đất đai không thể thuộc sở hữu tư nhân", "Vì phong tục", "Vì do lịch sử để lại", "Vì Hiến pháp 2013 quy định đất đai là tài sản công thuộc sở hữu toàn dân, Nhà nước thống nhất quản lý"],
        c: 3,
        e: "Hiến pháp và Luật Đất đai quy định đất đai thuộc sở hữu toàn dân."
      },
      {
        q: "Một công ty ký hợp đồng vận chuyển hàng hóa với một đơn vị vận tải. Hàng hóa bị hư hỏng trên đường vận chuyển do lỗi của bên vận tải. Tranh chấp này thuộc lĩnh vực pháp luật nào?",
        o: ["Luật Dân sự (hợp đồng dịch vụ) hoặc Luật Thương mại (nếu các bên là thương nhân)", "Luật Hành chính", "Luật Lao động", "Luật Hình sự"],
        c: 0,
        e: "Hợp đồng vận chuyển thuộc dân sự hoặc thương mại tùy chủ thể."
      },
      {
        q: "Một người bị khởi tố, điều tra về tội trộm cắp tài sản. Quá trình khởi tố, điều tra, truy tố, xét xử được thực hiện theo quy định của văn bản luật nào?",
        o: ["Bộ luật Hình sự", "Bộ luật Tố tụng hình sự", "Bộ luật Dân sự", "Luật Tố tụng hành chính"],
        c: 1,
        e: "Thủ tục tố tụng hình sự do BLTTHS quy định."
      },
      {
        q: "Một người bị xử phạt vi phạm hành chính vì đăng tin sai sự thật trên mạng xã hội. Người đó cho rằng quyết định xử phạt là trái luật và muốn khởi kiện. Anh ta phải gửi đơn khởi kiện đến cơ quan nào?",
        o: ["Viện kiểm sát", "Chính phủ", "Tòa án nhân dân cấp huyện (tòa hành chính)", "Cơ quan đã ra quyết định xử phạt"],
        c: 2,
        e: "Quyết định xử phạt hành chính là đối tượng khởi kiện hành chính."
      },
      {
        q: "Một người lái xe gây tai nạn làm chết người do sử dụng rượu bia vượt quá nồng độ cho phép. Hành vi này bị xử lý theo ngành luật nào?",
        o: ["Luật Hành chính", "Luật Dân sự", "Luật Lao động", "Luật Hình sự (tội vi phạm quy định về tham gia giao thông đường bộ)"],
        c: 3,
        e: "Sử dụng rượu bia gây tai nạn chết người là tội phạm hình sự."
      }
    ]
  },
  {
    id: "pldc-exam-t2",
    testId: 2,
    title: "Đề thi Pháp luật đại cương Số 2",
    description: "Đề thi thử Pháp luật đại cương Số 2, củng cố 40 câu hỏi chuyên sâu kiểm tra năng lực.",
    questions: [
      {
        q: "Đặc trưng nào sau đây giúp phân biệt nhà nước với các tổ chức xã hội khác?",
        o: ["Nhà nước có quyền thu thuế", "Nhà nước đại diện cho toàn xã hội", "Nhà nước có chủ quyền quốc gia", "Tất cả các đáp án trên"],
        c: 3,
        e: "Cả 3 đặc trưng (thu thuế, đại diện toàn xã hội, chủ quyền) đều phân biệt nhà nước với tổ chức xã hội."
      },
      {
        q: "Theo Hiến pháp 2013, Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước gì?",
        o: ["Nhà nước độc tài vô sản", "Nhà nước liên bang", "Nhà nước cộng hòa dân chủ", "Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân"],
        c: 3,
        e: "Hiến pháp Việt Nam Điều 2 quy định nước ta là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân."
      },
      {
        q: "Nội dung nào sau đây không phải là đặc trưng của nhà nước pháp quyền?",
        o: ["Thừa nhận tính tối cao của pháp luật", "Tôn trọng quyền và tự do của con người", "Độc lập của tư pháp", "Nhà nước đứng trên pháp luật"],
        c: 3,
        e: "Nhà nước pháp quyền không đứng trên pháp luật mà phải tuân theo."
      },
      {
        q: "Quyền lực nhà nước ở Việt Nam là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong việc thực hiện các quyền nào?",
        o: ["Lập pháp, hành pháp, tư pháp", "Lập pháp, hành pháp, giám sát", "Hành pháp, lập pháp, bầu cử", "Lập pháp, tư pháp, công tố"],
        c: 0,
        e: "Khoản 3 Điều 2 Hiến pháp 2013 quy định ba quyền: lập pháp, hành pháp, tư pháp."
      },
      {
        q: "Nhà nước liên bang là nhà nước được cấu thành bởi:",
        o: ["Các đơn vị hành chính – lãnh thổ thông thường", "Các nhà nước thành viên (bang, tiểu bang) có chủ quyền riêng", "Các vùng lãnh thổ phụ thuộc", "Các tổ chức quốc tế"],
        c: 1,
        e: "Nhà nước liên bang cấu thành từ các nhà nước thành viên có chủ quyền và pháp luật riêng."
      },
      {
        q: "Cơ quan hành chính nhà nước cao nhất của Việt Nam là:",
        o: ["Quốc hội", "Tòa án nhân dân tối cao", "Chính phủ", "Chủ tịch nước"],
        c: 2,
        e: "Điều 94 Hiến pháp 2013 khẳng định Chính phủ là cơ quan hành chính nhà nước cao nhất."
      },
      {
        q: "Văn bản quy phạm pháp luật có hiệu lực pháp lý cao nhất ở Việt Nam là?",
        o: ["Luật", "Nghị định", "Thông tư", "Hiến pháp"],
        c: 3,
        e: "Hiến pháp có hiệu lực pháp lý cao nhất, mọi văn bản khác phải tuân thủ Hiến pháp."
      },
      {
        q: "Chức năng giáo dục của pháp luật thể hiện ở việc:",
        o: ["Pháp luật tác động đến ý thức, tình cảm của con người, hình thành thói quen tôn trọng pháp luật", "Pháp luật trừng phạt người vi phạm", "Pháp luật tạo ra khuôn mẫu", "Pháp luật điều chỉnh hành vi"],
        c: 0,
        e: "Giáo dục pháp luật tác động vào ý thức, hình thành thói quen tự giác tuân thủ pháp luật."
      },
      {
        q: "“Chế tài” trong cấu trúc quy phạm pháp luật là?",
        o: ["Phần nêu lên biện pháp tác động mà nhà nước dự kiến áp dụng đối với chủ thể vi phạm", "Phần nêu điều kiện áp dụng", "Phần nêu cách xử sự", "Phần giải thích lý do ban hành"],
        c: 0,
        e: "Chế tài là phần hậu quả bất lợi mà nhà nước áp đặt lên chủ thể vi phạm quy phạm pháp luật."
      },
      {
        q: "Năng lực chủ thể bao gồm những yếu tố nào?",
        o: ["Năng lực pháp luật và năng lực hành vi", "Năng lực nhận thức và năng lực hành động", "Quyền và nghĩa vụ", "Khả năng lao động"],
        c: 0,
        e: "Năng lực chủ thể gồm năng lực pháp luật (khả năng có quyền/nghĩa vụ) và năng lực hành vi (khả năng tự thực hiện)."
      },
      {
        q: "Sự kiện pháp lý được phân thành những loại nào?",
        o: ["Hành vi và sự biến", "Hợp pháp và bất hợp pháp", "Cố ý và vô ý", "Dân sự và hình sự"],
        c: 0,
        e: "Sự kiện pháp lý chia thành hành vi (phụ thuộc vào ý chí) và sự biến (hiện tượng tự nhiên khách quan)."
      },
      {
        q: "Áp dụng pháp luật là hình thức thực hiện pháp luật do?",
        o: ["Mọi chủ thể thực hiện", "Cơ quan nhà nước có thẩm quyền thực hiện, ban hành quyết định cá biệt", "Cá nhân thực hiện quyền của mình", "Tổ chức thực hiện nghĩa vụ"],
        c: 1,
        e: "Áp dụng pháp luật mang tính quyền lực nhà nước, chỉ do cơ quan có thẩm quyền thực hiện."
      },
      {
        q: "Trách nhiệm pháp lý có những đặc điểm gì?",
        o: ["Tự nguyện", "Không bắt buộc", "Là hậu quả của vi phạm pháp luật, do cơ quan nhà nước có thẩm quyền áp dụng, mang tính cưỡng chế nhà nước", "Do các bên thỏa thuận"],
        c: 2,
        e: "Là hậu quả của vi phạm, do nhà nước áp dụng có tính cưỡng chế."
      },
      {
        q: "Trách nhiệm hình sự do ai áp dụng?",
        o: ["Cơ quan điều tra", "Tòa án", "Viện kiểm sát", "Chính phủ"],
        c: 1,
        e: "Chỉ Tòa án nhân danh nhà nước mới có quyền áp dụng trách nhiệm hình sự bằng bản án kết tội."
      },
      {
        q: "Văn hóa pháp luật là gì?",
        o: ["Trình độ hiểu biết và tôn trọng pháp luật, thể hiện trong hành vi và lối sống của con người, cộng đồng", "Hệ thống các văn bản pháp luật", "Các công trình nghiên cứu về pháp luật", "Nghệ thuật xét xử"],
        c: 0,
        e: "Văn hóa pháp luật phản ánh trình độ nhận thức, hiểu biết và ý thức thượng tôn pháp luật."
      },
      {
        q: "Hình thức xử phạt chính trong vi phạm hành chính là?",
        o: ["Tù có thời hạn", "Cải tạo không giam giữ", "Cảnh cáo, phạt tiền", "Tử hình"],
        c: 2,
        e: "Phạt chính hành chính gồm cảnh cáo và phạt tiền. Trục xuất cũng có thể là phạt chính."
      },
      {
        q: "Ngành luật nào quy định về trình tự, thủ tục giải quyết khiếu kiện hành chính?",
        o: ["Luật Hành chính", "Luật Tố tụng hành chính", "Luật Tố tụng dân sự", "Luật Tố tụng hình sự"],
        c: 1,
        e: "Luật Tố tụng hành chính 2015 quy định cụ thể thủ tục khiếu kiện quyết định hành chính, hành vi hành chính."
      },
      {
        q: "Luật Hôn nhân và Gia đình là ngành luật độc lập hay thuộc Luật Dân sự?",
        o: ["Là một phần của Luật Hành chính", "Là một phần của Luật Hình sự", "Là một ngành luật độc lập, có quan hệ chặt chẽ với Luật Dân sự", "Là một phần của Luật Hiến pháp"],
        c: 2,
        e: "Luật Hôn nhân và gia đình là ngành luật độc lập, điều chỉnh quan hệ nhân thân và tài sản gia đình."
      },
      {
        q: "Bộ luật Dân sự 2015 có hiệu lực từ ngày nào?",
        o: ["01/01/2016", "01/01/2017", "01/07/2016", "01/01/2018"],
        c: 1,
        e: "Bộ luật Dân sự 2015 được ban hành năm 2015 và có hiệu lực thi hành từ ngày 01/01/2017."
      },
      {
        q: "Thời hiệu khởi kiện vụ án hành chính là bao lâu?",
        o: ["6 tháng", "1 năm", "2 năm", "3 năm"],
        c: 1,
        e: "Luật Tố tụng hành chính quy định thời hiệu khởi kiện thông thường đối với quyết định hành chính là 1 năm."
      },
      {
        q: "Tại sao Hiến pháp 2013 được coi là bước tiến quan trọng trong xây dựng nhà nước pháp quyền ở Việt Nam?",
        o: ["Vì Hiến pháp 2013 lần đầu tiên ghi nhận “Nhà nước pháp quyền xã hội chủ nghĩa” và dành riêng một chương về quyền con người", "Vì Hiến pháp 2013 dài hơn các bản hiến pháp trước", "Vì Hiến pháp 2013 do Quốc hội khóa mới ban hành", "Vì Hiến pháp 2013 xóa bỏ vai trò lãnh đạo của Đảng"],
        c: 0,
        e: "Điểm đột phá là củng cố vững chắc nền tảng nhà nước pháp quyền và Chương II bảo hiến nhân quyền."
      },
      {
        q: "Vì sao cần có sự phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước trong thực hiện các quyền lập pháp, hành pháp, tư pháp?",
        o: ["Để tránh sự lạm quyền, bảo đảm quyền lực nhà nước được thực hiện có hiệu lực, hiệu quả và dân chủ", "Để tạo sự cạnh tranh giữa các cơ quan", "Để làm suy yếu nhà nước", "Để xóa bỏ quyền lập pháp"],
        c: 0,
        e: "Việc phân công và kiểm soát quyền lực ngăn ngừa tập trung quyền lực dẫn đến độc đoán, chuyên quyền."
      },
      {
        q: "Giải thích tại sao trong nhà nước pháp quyền, tòa án phải độc lập?",
        o: ["Để tòa án thay thế Quốc hội", "Để tòa án không phải tuân theo pháp luật", "Để tòa án có thể xét xử công bằng, không bị chi phối bởi cơ quan hành pháp hay lập pháp, bảo vệ quyền con người", "Để tòa án đứng trên pháp luật"],
        c: 2,
        e: "Độ lập tư pháp là điều kiện sống còn đối với nền công lý vô tư, bảo vệ triệt để quyền con người."
      },
      {
        q: "Tại sao “tính xã hội” của nhà nước ngày càng được đề cao trong các nhà nước hiện đại?",
        o: ["Vì muốn xóa bỏ tính giai cấp", "Vì nhà nước không còn vai trò giai cấp", "Vì nhà nước trở thành tổ chức từ thiện", "Vì nhà nước cần giải quyết các vấn đề chung như bảo vệ môi trường, an sinh xã hội, y tế, giáo dục, mà các lực lượng thị trường không thể làm thay"],
        c: 3,
        e: "Các nhà nước hiện đại tăng cường can thiệp phúc lợi, cung cấp hàng hóa công cộng vì xã hội phát triển phức tạp."
      },
      {
        q: "Vì sao pháp luật cần được công bố công khai?",
        o: ["Để làm hình thức", "Để giấu người dân", "Để chỉ cán bộ biết", "Để mọi người biết và tuân theo, bảo đảm tính dân chủ, tránh tình trạng “luật bí mật”"],
        c: 3,
        e: "Tính công khai đảm bảo nguyên tắc minh bạch, người dân tiếp cận được để thực hiện quyền và nghĩa vụ."
      },
      {
        q: "Giải thích tại sao án lệ ngày càng được coi trọng ở Việt Nam?",
        o: ["Vì án lệ thay thế hoàn toàn luật viết", "Vì luật viết không còn quan trọng", "Vì án lệ bổ sung khoảng trống pháp luật, hướng dẫn áp dụng thống nhất, thể hiện tính sáng tạo của tòa án", "Vì án lệ do Chính phủ ban hành"],
        c: 2,
        e: "Hệ thống pháp luật Việt Nam đang hoàn thiện bằng việc áp dụng án lệ nhằm khắc phục sự lạc hậu nhất thời của luật thành văn."
      },
      {
        q: "Tại sao pháp luật cần phải ổn định nhưng cũng cần được sửa đổi, bổ sung kịp thời?",
        o: ["Chỉ cần ổn định, không cần sửa đổi", "Sửa đổi thường xuyên để linh hoạt", "Không cần ổn định", "Ổn định để đảm bảo niềm tin, tính dự báo; sửa đổi để phù hợp với sự thay đổi của xã hội, khắc phục bất cập"],
        c: 3,
        e: "Pháp luật cần cân bằng tính bền vững (ổn định) và tính cập nhật thực tiễn (sửa đổi)."
      },
      {
        q: "Vì sao có sự kiện pháp lý “hỗn hợp” (vừa hành vi vừa sự biến)?",
        o: ["Vì pháp luật không phân định", "Vì không quan trọng", "Vì có những sự kiện bao gồm cả yếu tố ý chí và yếu tố khách quan (ví dụ: chết do bệnh – sự biến; chết do tự tử – hành vi)", "Vì lý do khác"],
        c: 2,
        e: "Sự kiện hỗn hợp phản ánh thế giới khách quan đan xen tác động chủ quan của con người."
      },
      {
        q: "Vì sao cùng một hành vi có thể vừa là vi phạm hành chính, vừa là vi phạm dân sự?",
        o: ["Vì pháp luật chồng chéo", "Vì một hành vi không thể bị xử lý hai lần", "Vì tùy ý cơ quan", "Vì hành vi có thể vừa xâm phạm trật tự quản lý nhà nước (hành chính) vừa gây thiệt hại tài sản cho người khác (dân sự) – ví dụ: xả thải trái phép"],
        c: 3,
        e: "Một hành vi có thể xâm hại nhiều khách thể độc lập được các ngành luật khác nhau bảo vệ."
      },
      {
        q: "Tại sao có hiện tượng “xử lý hình sự hóa” các quan hệ dân sự, hành chính? Hậu quả ra sao?",
        o: ["Đó là điều tốt", "Không có hậu quả", "Luật cho phép", "Do nhận thức hoặc thực tiễn áp dụng sai; hậu quả gây oan sai, quá tải tư pháp, vi phạm nhân quyền. Cần khắc phục bằng cách phân định rõ ranh giới."],
        c: 3,
        e: "Cần đảm bảo ranh giới rõ ràng của các chế tài xử phạt, không được tùy tiện lạm dụng cưỡng chế nghiêm khắc hình sự đối với tranh chấp kinh tế, dân sự."
      },
      {
        q: "Vì sao cần quy định thời hiệu truy cứu trách nhiệm pháp lý?",
        o: ["Để bỏ qua vi phạm", "Để làm phức tạp", "Để không ai phải chịu trách nhiệm", "Để bảo đảm tính ổn định, tránh truy cứu vô thời hạn, tạo cơ hội cho người vi phạm cải tạo"],
        c: 3,
        e: "Thời hiệu nhằm đảm bảo chứng cứ không bị xói mòn theo thời gian và tránh gieo rắc sự bất ổn tâm lý vô hạn định."
      },
      {
        q: "Vai trò của pháp luật trong việc bảo vệ quyền của nhóm yếu thế (trẻ em, người khuyết tật, phụ nữ) là gì?",
        o: ["Không quan tâm", "Bỏ mặc", "Chỉ bảo vệ người giàu", "Quy định các quyền đặc thù, cấm phân biệt đối xử, hỗ trợ tiếp cận công lý, ưu đãi trong một số lĩnh vực"],
        c: 3,
        e: "Đảm bảo công bằng thực tế bằng cách điều chỉnh bù đắp cho những đối tượng bất lợi thế xã hội tự nhiên."
      },
      {
        q: "Phân biệt “tố tụng dân sự” và “tố tụng hành chính” về đối tượng và quyền khởi kiện.",
        o: ["Giống nhau", "Hành chính do Viện kiểm sát khởi kiện", "Dân sự không có thời hiệu", "Tố tụng dân sự giải quyết tranh chấp giữa các chủ thể bình đẳng; tố tụng hành chính giải quyết khiếu kiện quyết định, hành vi hành chính của cơ quan công quyền. Quyền khởi kiện hành chính giới hạn bởi thời hiệu 1 năm."],
        c: 3,
        e: "Dân sự điều chỉnh quan hệ tư bình đẳng, Hành chính điều chỉnh quan hệ công quyền thống trị hành chính."
      },
      {
        q: "Tại sao Luật Thương mại cho phép áp dụng tập quán thương mại quốc tế nếu các bên thỏa thuận?",
        o: ["Vì luật trong nước không đủ", "Vì bắt buộc", "Vì nước ngoài ép", "Để tạo thuận lợi cho giao thương quốc tế, tôn trọng quyền tự do hợp đồng, phù hợp với thông lệ quốc tế"],
        c: 3,
        e: "Tôn trọng các quy luật của kinh tế toàn cầu, thúc đẩy hội nhập sâu rộng."
      },
      {
        q: "Vì sao Luật Đầu tư quy định danh mục ngành, nghề cấm đầu tư kinh doanh và danh mục ngành, nghề có điều kiện?",
        o: ["Để hạn chế đầu tư", "Để làm khó doanh nghiệp", "Để tăng thu ngân sách", "Để bảo vệ an ninh quốc gia, trật tự an toàn xã hội, đạo đức xã hội, sức khỏe cộng đồng, bảo vệ tài nguyên, môi trường"],
        c: 3,
        e: "Giới hạn tự do kinh doanh ở ranh giới tối thượng: bảo vệ an ninh quốc phòng, sức khỏe xã hội và sinh thái môi trường."
      },
      {
        q: "Một doanh nghiệp bị cạnh tranh không lành mạnh (đối thủ tung tin sai sự thật về sản phẩm). Doanh nghiệp có thể khởi kiện theo ngành luật nào?",
        o: ["Luật Cạnh tranh (xử lý hành vi cạnh tranh không lành mạnh)", "Luật Dân sự (bồi thường thiệt hại do xâm phạm uy tín)", "Luật Hình sự", "Cả A và B, tùy tính chất và yêu cầu"],
        c: 3,
        e: "Được áp dụng đồng thời biện pháp ngăn chặn hành chính từ cơ quan cạnh tranh và kiện đòi bồi thường thiệt hại ngoài hợp đồng tại Tòa dân sự."
      },
      {
        q: "Một hộ gia đình bị cưỡng chế thu hồi đất, nhưng cho rằng việc thu hồi không vì mục đích công cộng. Hộ gia đình có thể kiện ra tòa án nào?",
        o: ["Tòa án dân sự", "Tòa án hành chính (khiếu kiện quyết định thu hồi đất)", "Tòa án hình sự", "Không thể kiện"],
        c: 1,
        e: "Quyết định thu hồi đất của UBND là quyết định hành chính, do đó thuộc thẩm quyền tài phán của Tòa Hành chính."
      },
      {
        q: "Một người lao động ký hợp đồng lao động không xác định thời hạn, sau đó bị đơn phương chấm dứt hợp đồng trái luật. Người lao động có thể yêu cầu gì?",
        o: ["Chỉ được nhận trợ cấp thôi việc", "Chỉ được yêu cầu bồi thường", "Không có quyền gì", "Yêu cầu nhận lại công việc, bồi thường thiệt hại, hoặc chấm dứt và nhận trợ cấp"],
        c: 3,
        e: "Bộ luật Lao động bảo vệ triệt để quyền lợi việc làm, tạo điều kiện cho người lao động được trở lại làm việc và nhận đầy đủ bồi thường mất thu nhập."
      },
      {
        q: "Một người nước ngoài bị tòa án Việt Nam tuyên phạt tù. Theo pháp luật Việt Nam, việc thi hành án đối với người nước ngoài có khác so với công dân Việt Nam không?",
        o: ["Không bị xử lý", "Chỉ bị trục xuất, không bị tù", "Được chuyển về nước ngay", "Về nguyên tắc, người nước ngoài phạm tội trên lãnh thổ Việt Nam bị xử lý theo pháp luật Việt Nam, thi hành án tại Việt Nam (trừ khi có điều ước chuyển giao). Có thể bị trục xuất sau thi hành án."],
        c: 3,
        e: "Nguyên tắc tài phán lãnh thổ chi phối việc thi hành án đối với cá nhân phạm tội tại nước sở tại."
      },
      {
        q: "Tổng kết: Trong bối cảnh xây dựng nhà nước pháp quyền, việc hoàn thiện hệ thống pháp luật các ngành luật cần tập trung vào những yêu cầu gì?",
        o: ["Chỉ cần ban hành nhiều luật.", "Chỉ cần tăng hình phạt.", "Chỉ cần theo kịp nước ngoài.", "Đảm bảo tính thống nhất, đồng bộ, minh bạch, khả thi; bảo vệ quyền con người; phân định rõ thẩm quyền giữa các cơ quan; nâng cao chất lượng lập pháp; phát triển án lệ; hội nhập quốc tế."],
        c: 3,
        e: "Sự hoàn thiện hệ thống pháp luật đòi hỏi tính chất lượng toàn diện của cả lập pháp, tư pháp và thi hành án."
      }
    ]
  },
  {
    id: "pldc-exam-t3",
    testId: 3,
    title: "Đề thi Pháp luật đại cương Số 3",
    description: "Đề thi khảo sát củng cố kiến thức Hiến pháp và cấu trúc Nhà nước pháp quyền xã hội chủ nghĩa.",
    questions: [
      {
        q: "Hình thức cấu trúc của Nhà nước Việt Nam hiện nay là gì?",
        o: ["Nhà nước đơn nhất", "Nhà nước bang", "Liên bang thống nhất", "Nhà nước quân chủ lập hiến"],
        c: 0,
        e: "Việt Nam có cấu trúc nhà nước duy nhất, lãnh thổ thống nhất, một hệ thống pháp luật thống nhất xuyên suốt nên là Nhà nước đơn nhất."
      },
      {
        q: "Theo Hiến pháp 2013, cơ quan nào là cơ quan đại diện cao nhất của nhân dân Việt Nam?",
        o: ["Chính phủ", "Quốc hội", "Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam", "Chủ tịch nước"],
        c: 1,
        e: "Quốc hội do dân trực tiếp bầu ra trên toàn quốc để đại diện tối cao cho ý chí của nhân dân."
      },
      {
        q: "Quyền lực nhà nước ở Việt Nam là thống nhất và tập trung dưới sự lãnh đạo của tổ chức nào?",
        o: ["Quốc hội", "Mặt trận Tổ quốc", "Đảng Cộng sản Việt Nam", "Chính phủ"],
        c: 2,
        e: "Đảng Cộng sản Việt Nam là lực lượng lãnh đạo Nhà nước và xã hội theo Điều 4 Hiến pháp 2013."
      },
      {
        q: "Văn bản pháp luật nào có vị trí tối cao trong hệ thống văn bản quy phạm pháp luật ở nước ta?",
        o: ["Bộ luật Dân sự", "Hiến pháp", "Luật Ban hành văn bản quy phạm pháp luật", "Luật Đất đai"],
        c: 1,
        e: "Hiến pháp là luật mẹ, có hiệu lực pháp lý cao nhất."
      },
      {
        q: "Hệ thống các cơ quan xét xử của nước ta bao gồm các thiết chế nào?",
        o: ["Hệ thống Tòa án nhân dân", "Viện kiểm sát nhân dân", "Cơ quan thi hành án", "Bộ Tư pháp"],
        c: 0,
        e: "Tòa án nhân dân là cơ quan xét xử thực hiện quyền tư pháp."
      },
      {
        q: "Độ tuổi có năng lực hành vi dân sự đầy đủ của công dân theo quy định của Bộ luật Dân sự 2015 là:",
        o: ["Từ đủ 14 tuổi", "Từ đủ 16 tuổi", "Từ đủ 18 tuổi", "Từ đủ 21 tuổi"],
        c: 2,
        e: "Bộ luật Dân sự 2015 Điều 20 quy định người thành niên từ đủ 18 tuổi có năng lực hành vi dân sự đầy đủ."
      },
      {
        q: "Trách nhiệm hành chính áp dụng đối với chủ thể thực hiện hành vi nào?",
        o: ["Vi phạm nội quy lao động", "Gây thiệt hại hợp đồng dân sự", "Hành vi vi phạm hành chính", "Tội phạm đặc biệt nghiêm trọng"],
        c: 2,
        e: "Trách nhiệm hành chính do cơ quan nhà nước áp dụng đối với người vi phạm hành chính."
      },
      {
        q: "Người phạm tội tự thú, thành khẩn khai báo thì được xem là tình tiết gì trong tố tụng hình sự?",
        o: ["Tình tiết giảm nhẹ trách nhiệm hình sự", "Tình tiết tăng nặng", "Tình tiết loại trừ trách nhiệm", "Tình tiết miễn truy tố"],
        c: 0,
        e: "Tự thú và thành khẩn khai báo thuộc nhóm tình tiết giảm nhẹ quy định tại Điều 51 BLHS."
      },
      {
        q: "Phương pháp mệnh lệnh - phục tùng là phương pháp điều chỉnh đặc trưng của ngành luật nào?",
        o: ["Luật Dân sự", "Luật Hành chính", "Luật Hôn nhân và Gia đình", "Luật Doanh nghiệp"],
        c: 1,
        e: "Luật Hành chính sử dụng phương pháp mệnh lệnh - phục tùng phản ánh tính chất quyền lực công của cơ quan quản lý."
      },
      {
        q: "Chức năng bảo vệ của pháp luật thể hiện ở việc:",
        o: ["Định hướng hành vi tích cực", "Xử lý nghiêm minh các hành vi vi phạm pháp luật nhằm bảo vệ trật tự xã hội", "Giáo dục ý thức răn đe", "Cấp phép hoạt động kinh doanh"],
        c: 1,
        e: "Chức năng bảo vệ phản ánh sức mạnh cưỡng chế, trừng phạt và khôi phục các quan hệ bị xâm hại."
      },
      {
        q: "Tập quán pháp được thừa nhận và áp dụng trong trường hợp nào?",
        o: ["Áp dụng thay thế hoàn toàn cho luật thành văn", "Khi pháp luật không có quy định, các bên không có thỏa thuận và tập quán đó không trái với đạo đức, nguyên tắc cơ bản của pháp luật", "Luôn luôn được ưu tiên áp dụng", "Khi được Viện trưởng Viện kiểm sát phê duyệt"],
        c: 1,
        e: "Tập quán chỉ là nguồn bổ trợ khi luật viết bị khuyết và các bên không có thỏa thuận riêng."
      },
      {
        q: "Học thuyết Mác - Lênin lý giải nguồn gốc trực tiếp dẫn dến sự ra đời của nhà nước là do:",
        o: ["Sự phân chia lao động tự nhiên", "Mâu thuẫn giai cấp không thể điều hòa được trong xã hội có tư hữu", "Ý chí thần thánh", "Khát vọng tự do của loài người"],
        c: 1,
        e: "Mâu thuẫn giai cấp đối kháng gay gắt là điều kiện căn bản sinh ra nhà nước để kiểm soát và điều hòa."
      },
      {
        q: "Một người say rượu gây tai nạn phá hỏng tài sản nhà người khác thì:",
        o: ["Được miễn bồi thường vì lúc đó không làm chủ hành vi", "Phải chịu trách nhiệm bồi thường dân sự vì say rượu là lỗi chủ quan của bản thân", "Nhà nước bồi thường thay", "Bị tước quyền công dân ngay lập tức"],
        c: 1,
        e: "Tự mình đưa vào tình trạng say rượu không phải nguyên nhân miễn trừ trách nhiệm pháp lý theo BLDS."
      },
      {
        q: "Khách thể của vi phạm pháp luật được hiểu là:",
        o: ["Tài sản hoặc tính mạng của người bị thiệt hại", "Những quan hệ xã hội được pháp luật bảo vệ nhưng bị hành vi vi phạm xâm hại đến", "Bản thân người bị hại", "Vũ khí và công cụ gây án"],
        c: 1,
        e: "Khách thể là mối quan hệ xã hội tốt đẹp mà pháp luật dựng lên để bảo bọc."
      },
      {
        q: "Hành vi vượt đèn đỏ khi tham gia giao thông là loại vi phạm gì?",
        o: ["Vi phạm kỷ luật", "Vi phạm dân sự", "Vi phạm hành chính", "Vi phạm hình sự"],
        c: 2,
        e: "Lỗi vi phạm luật giao thông đường bộ thông thường, chưa gây tai nạn nghiêm trọng là vi phạm hành chính."
      },
      {
        q: "Cơ quan thường trực thực thi các hoạt động giám sát hằng ngày giữa hai kỳ họp Quốc hội là:",
        o: ["Ủy ban nhân dân cấp tỉnh", "Ủy ban Thường vụ Quốc hội", "Chính phủ", "Viện kiểm sát nhân dân tối cao"],
        c: 1,
        e: "Ủy ban Thường vụ Quốc hội là thiết chế thường trực thực hiện các thẩm quyền giám sát lập pháp."
      },
      {
        q: "Một nhân viên văn phòng đi làm muộn 3 buổi liên tục không có lý do chính đáng sẽ bị xử lý kỷ luật theo quy định của:",
        o: ["Bộ luật Hình sự", "Bộ luật Lao động và nội quy quy chế của doanh nghiệp", "Luật Xử lý vi phạm hành chính", "Bộ luật Dân sự"],
        c: 1,
        e: "Vi phạm nội quy lao động nội bộ thuộc phạm vi điều chỉnh của Luật Lao động và quy chế doanh nghiệp."
      },
      {
        q: "Tội phạm là hành vi nguy hiểm cho xã hội được quy định duy nhất tại văn bản pháp luật nào?",
        o: ["Luật Giao thông đường bộ", "Bộ luật Dân sự", "Bộ luật Hình sự", "Luật Phòng chống ma túy"],
        c: 2,
        e: "Nguyên tắc pháp định hình sự quy định chỉ có hành vi được Bộ luật Hình sự quy định mới bị coi là tội phạm."
      },
      {
        q: "Thời hiệu khởi kiện hợp đồng dân sự thông thường theo quy định của BLDS 2015 là:",
        o: ["1 năm", "2 năm", "3 năm", "5 năm"],
        c: 2,
        e: "BLDS 2015 quy định thời hiệu kiện tranh chấp hợp đồng là 3 năm kể từ ngày phát hiện quyền lợi bị xâm phạm."
      },
      {
        q: "Khi có xung đột pháp luật giữa văn bản của Quốc hội và Nghị định của Chính phủ, văn bản nào được ưu tiên áp dụng?",
        o: ["Văn bản ban hành sau", "Nghị định của Chính phủ", "Văn bản của Quốc hội (Luật)", "Văn bản nào cũng được"],
        c: 2,
        e: "Luật do Quốc hội ban hành có hiệu lực pháp lý cao hơn các văn bản dưới luật như Nghị định."
      },
      {
        q: "Lực lượng nào giữ vai trò nòng cốt trong nhiệm vụ bảo vệ an ninh quốc gia và trật tự an toàn xã hội?",
        o: ["Công an nhân dân", "Mặt trận Tổ quốc", "Đội dân phòng", "Tòa án nhân dân"],
        c: 0,
        e: "Công an nhân dân là lực lượng vũ trang nhân dân giữ vai trò nòng cốt về an ninh trật tự."
      },
      {
        q: "Hình thức kết hôn bắt buộc phải thực hiện thủ tục gì tại cơ quan nhà nước có thẩm quyền?",
        o: ["Tổ chức đám cưới công khai", "Lập văn bản có nhân chứng ký tên", "Đăng ký kết hôn tại UBND cấp xã và được cấp Giấy chứng nhận kết hôn", "Công nhận miệng trước bàn thờ"],
        c: 2,
        e: "Hôn nhân chỉ hợp pháp khi có đăng ký hộ tịch tại cơ quan đại diện nhà nước theo đúng thẩm quyền."
      },
      {
        q: "Năng lực pháp luật dân sự của một cá nhân xuất hiện từ khi nào?",
        o: ["Khi người đó sinh ra", "Khi người đó đủ 18 tuổi", "Khi người đó có tài sản riêng", "Khi người đó biết đọc chữ"],
        c: 0,
        e: "Năng lực pháp luật dân sự có từ khi cá nhân đó chào đời và chỉ chấm dứt khi người đó chết."
      },
      {
        q: "Sự biến pháp lý khác hành vi pháp lý ở điểm cốt lõi nào?",
        o: ["Sự biến do tòa án phán quyết", "Sự biến xảy ra khách quan ngoài ý chí kiểm soát của con người", "Hành vi là hiện tượng tự nhiên", "Không có điểm khác biệt"],
        c: 1,
        e: "Sự biến là hiện tượng thiên nhiên, thời gian, sinh tử... ngoài ý muốn chủ quan nhưng làm phát sinh hậu quả pháp lý."
      },
      {
        q: "Hình phạt tiền trong Bộ luật Hình sự khác biện pháp xử phạt tiền trong vi phạm hành chính ở chỗ:",
        o: ["Hình phạt tiền hình sự do Tòa án áp dụng đi kèm án tích và trong bản án kết tội hình sự", "Xử phạt hành chính nặng hơn", "Hình phạt tiền hình sự do công an xã quyết định", "Không có sự khác nhau nào"],
        c: 0,
        e: "Hình phạt hình sự mang tính nghiêm khắc tối đa của quyền lực nhà nước, chỉ do Tòa án nhân danh nước tuyên phạt."
      },
      {
        q: "Trong quan hệ pháp luật, người giám hộ có quyền:",
        o: ["Tự ý bán hết tài sản của người được giám hộ vì lợi ý cá nhân", "Đại diện thực hiện các giao dịch dân sự nhằm bảo vệ và phục vụ lợi ích hợp pháp của người được giám hộ", "Từ bỏ nghĩa vụ nuôi dưỡng", "Thay đổi quốc tịch của người được giám hộ tự ý"],
        c: 1,
        e: "Người giám hộ có trách nhiệm đại diện pháp lý bảo vệ quyền lợi hợp tinh hợp lý cho người được bảo hộ."
      },
      {
        q: "Một người chưa đủ 14 tuổi gây thiệt hại về tính mạng tài sản thì bồi thường như thế nào?",
        o: ["Bản thân người đó đi tù thay", "Cha mẹ hoặc người giám hộ chăm sóc bồi thường bồi hoàn bằng tài sản của họ", "Không ai phải bồi thường", "Nhà nước chi trả toàn bộ"],
        c: 1,
        e: "Người chưa đủ 14 tuổi chưa có tài sản và năng lực hành vi đầy đủ, cha mẹ chịu trách nhiệm bồi hoàn thay thế."
      },
      {
        q: "Một người có quyền từ chối nhận di sản thừa kế của người chết để lại hay không?",
        o: ["Không được từ chối vì đó là nghĩa vụ gia đình", "Có quyền từ chối, trừ trường hợp từ chối nhằm trốn tránh thực hiện nghĩa vụ tài sản đối với người khác", "Chỉ được từ chối khi tài sản quá nhỏ", "Chỉ con cả mới có quyền này"],
        c: 1,
        e: "Quyền tự định đoạt cho phép từ chối nhận di sản nhưng cấm lợi dụng việc này để trốn nợ, trốn thuế."
      },
      {
        q: "Quy phạm pháp luật chỉ dẫn áp dụng văn bản luật khác khi có xung đột pháp luật gọi là quy phạm gì?",
        o: ["Quy phạm cấm đoán", "Quy phạm cho phép", "Quy phạm xung đột", "Quy phạm bắt buộc"],
        c: 2,
        e: "Quy phạm xung đột dùng để giải quyết chọn lựa luật áp dụng trong các quan hệ tư pháp quốc tế."
      },
      {
        q: "Pháp nhân thương mại có đặc điểm gì nổi bật so với pháp nhân phi thương mại?",
        o: ["Có tài sản riêng độc lập", "Có cơ cấu tổ chức chặt chẽ", "Mục tiêu chính là tìm kiếm lợi tức, lợi nhuận và chia lợi nhuận cho thành viên", "Không cần đăng ký hoạt động"],
        c: 2,
        e: "Mục tiêu tìm kiếm phân chia lợi nhuận là ranh giới cơ bản phân tách pháp nhân thương mại và phi thương mại."
      },
      {
        q: "Nguyên tắc tự do thỏa thuận, tự do định đoạt là nguyên tắc cốt lõi của ngành luật nào?",
        o: ["Luật Hình sự", "Luật Dân sự", "Luật Hành chính", "Luật Tố tụng hình sự"],
        c: 1,
        e: "Luật Dân sự đề cao sự bình đẳng thỏa thuận của các chủ thể tư nhân không mang quyền lực công."
      },
      {
        q: "Cơ quan nào giữ thẩm quyền cao nhất trong việc hướng dẫn áp dụng thống nhất pháp luật trong xét xử trên toàn quốc?",
        o: ["Bộ Tư pháp", "Chính phủ", "Hội đồng Thẩm phán Tòa án nhân dân tối cao", "Viện kiểm sát tối cao"],
        c: 2,
        e: "Hội đồng Thẩm phán TANDTC hướng dẫn áp dụng thống nhất pháp luật thông qua ban hành Nghị quyết và Án lệ."
      },
      {
        q: "Quyền bất khả xâm phạm về thân thể của công dân có nghĩa là:",
        o: ["Không ai có quyền bắt giữ công dân tùy thích nếu không có quyết định của Tòa án, Viện kiểm sát hoặc bắt quả tang", "Công dân có quyền đánh trả mọi người", "Không ai được chạm vào người khác", "Được miễn trừ trách nhiệm hình sự"],
        c: 0,
        e: "Quyền tự do thân thể cốt lõi bảo vệ người dân chống lại sự giam bắt trái phép của các cơ quan công vụ."
      },
      {
        q: "Năng lực hành vi hành chính của cá nhân xuất hiện đầy đủ khi nào?",
        o: ["Đủ 14 tuổi", "Đủ 16 tuổi", "Đủ 18 tuổi", "Đủ 21 tuổi"],
        c: 2,
        e: "Người từ đủ 18 tuổi có năng lực hành vi hành chính đầy đủ để tự chịu trách nhiệm trước mọi xử phạt hành chính của mình."
      },
      {
        q: "Chế tài dân sự hướng tới mục tiêu cơ bản nào?",
        o: ["Trấn áp tinh thần tội phạm", "Khôi phục lại tình trạng tài sản ban đầu và bồi thường bồi hoàn các tổn thất", "Tước đoạt tự do", "Buộc thôi việc cải tạo"],
        c: 1,
        e: "Mục tiêu hàng đầu của dân sự là phục hồi các cân bằng lợi ích kinh tế nhân thân bị phá vỡ."
      },
      {
        q: "Biện pháp cưỡng chế hành chính nào được áp dụng đối với người nghiện ma túy đá nặng?",
        o: ["Phạt tiền thật nặng", "Tù giam có thời hạn", "Đưa vào cơ sở cai nghiện bắt buộc theo quyết định pháp luật", "Trục xuất khỏi địa phương"],
        c: 2,
        e: "Cai nghiện bắt buộc là biện pháp xử lý hành chính đặc thù của Luật Hành chính."
      },
      {
        q: "Nguyên tắc tố tụng “không ai bị coi là có tội cho đến khi có bản án kết tội có hiệu lực của Tòa án” gọi là:",
        o: ["Bình đẳng xét xử", "Tuyệt đối hóa chứng cứ", "Suy đoán vô tội", "Xét xử công khai"],
        c: 2,
        e: "Suy đoán vô tội bảo vệ quyền con người tuyệt đối cho bị can chống lại ép cung oan sai."
      },
      {
        q: "Luật Đất đai 2013 quy định đất đai thuộc sở hữu của ai?",
        o: ["Sở hữu của người khai hoang", "Sở hữu toàn dân do Nhà nước đại diện chủ sở hữu", "Sở hữu tư nhân của hộ gia đình", "Sở hữu của các doanh nghiệp bất động sản"],
        c: 1,
        e: "Khẳng định chế độ sở hữu đất đai toàn dân thống nhất dưới quyền đại diện của Nhà nước."
      },
      {
        q: "A thuê nhà của B làm cửa hàng kinh doanh, A tự ý sửa chữa cấu trúc nhà không hỏi ý kiến B là vi phạm điều gì?",
        o: ["Vi phạm hành chính", "Vi phạm hình sự", "Vi phạm dân sự (vi phạm hợp đồng thuê tài sản)", "Vi phạm kỷ luật"],
        c: 2,
        e: "Hành vi làm hỏng cấu trúc đồ thuê vi phạm trực tiếp nghĩa vụ thuê tài sản của Luật Dân sự."
      },
      {
        q: "Ý thức pháp luật bao gồm hai thành phần cơ bản nào?",
        o: ["Hành vi và kết quả thực hiện", "Hệ tư tưởng pháp luật và tâm lý pháp luật", "Luật viết và luật tập quán", "Tri thức lập pháp và tri thức tư pháp"],
        c: 1,
        e: "Ý thức gồm mặt cảm xúc thái độ (tâm lý pháp luật) và nhận thức sâu sắc (hệ tư tưởng pháp luật)."
      }
    ]
  },
  {
    id: "pldc-exam-t4",
    testId: 4,
    title: "Đề thi Pháp luật đại cương Số 4",
    description: "Đề thi thử ôn tập khảo sát đại cương, rèn luyện 40 câu hỏi chuyên sâu từ Chương 1 đến Chương 6.",
    questions: [
      {
        q: "Bản chất của nhà nước thể hiện qua hai thuộc tính cơ bản là:",
        o: ["Tính giai cấp và tính xã hội", "Tính giai cấp và tính đảng phái", "Tính xã hội và tính dân tộc", "Tính dân tộc và tính nhân dân"],
        c: 0,
        e: "Lý luận Mác - Lênin khẳng định nhà nước có hai bản chất: giai cấp và xã hội. Loại B, C, D vì không phải thuộc tính bản chất phổ quát."
      },
      {
        q: "Trong nhà nước pháp quyền, nguyên tắc “thượng tôn pháp luật” có nghĩa là:",
        o: ["Pháp luật do nhà nước ban hành nên nhà nước có quyền đứng trên pháp luật", "Mọi chủ thể, bao gồm cả nhà nước, đều phải tuân thủ pháp luật", "Chỉ có công dân mới phải tuân theo pháp luật", "Pháp luật chỉ có giá trị khi được nhân dân đồng tình"],
        c: 1,
        e: "Thượng tôn pháp luật ràng buộc mọi chủ thể, đặc biệt là nhà nước. Loại A (trái pháp quyền), C, D (sai bản chất)."
      },
      {
        q: "Hình thức chính thể là:",
        o: ["Cách thức phân chia lãnh thổ quốc gia", "Hệ thống các cơ quan nhà nước từ trung ương đến địa phương", "Cách thức tổ chức, trình tự thành lập các cơ quan hoặc chức danh cao nhất của quyền lực nhà nước, mối quan hệ giữa các cơ quan này với nhau và mức độ tham gia của nhân dân", "Các nguyên tắc tổ chức và hoạt động của bộ máy nhà nước"],
        c: 2,
        e: "Định nghĩa chuẩn về hình thức chính thể. Loại A (cấu trúc), B (bộ máy), D (nguyên tắc)."
      },
      {
        q: "Quốc hội Việt Nam là cơ quan:",
        o: ["Hành pháp cao nhất", "Tư pháp cao nhất", "Kiểm sát cao nhất", "Quyền lực nhà nước cao nhất"],
        c: 3,
        e: "Điều 69 Hiến pháp 2013. Loại A (Chính phủ), B (TANDTC), C (VKSNDTC)."
      },
      {
        q: "Pháp luật có tính quy phạm phổ biến vì:",
        o: ["Pháp luật do nhà nước ban hành, áp dụng nhiều lần, cho mọi đối tượng trong phạm vi lãnh thổ", "Pháp luật chỉ áp dụng một lần", "Pháp luật chỉ áp dụng cho cán bộ, công chức", "Pháp luật không có tính bắt buộc"],
        c: 0,
        e: "Tính quy phạm phổ biến thể hiện ở khuôn mẫu chung, áp dụng lặp đi lặp lại. Loại B, C, D (trái bản chất)."
      },
      {
        q: "Quy phạm pháp luật “Công dân có quyền tự do kinh doanh” thuộc loại quy phạm nào?",
        o: ["Quy phạm cấm đoán", "Quy phạm cho phép (định nghĩa/quyền)", "Quy phạm bắt buộc", "Quy phạm xung đột"],
        c: 1,
        e: "Quy phạm trao quyền (được phép làm). Loại A (cấm), C (bắt buộc), D (chỉ dẫn)."
      },
      {
        q: "Yếu tố “mặt khách quan” của vi phạm pháp luật bao gồm:",
        o: ["Lỗi, động cơ, mục đích", "Chủ thể có năng lực trách nhiệm pháp lý", "Hành vi trái pháp luật, hậu quả, mối quan hệ nhân quả, thời gian, địa điểm, công cụ, phương tiện", "Quan hệ xã hội bị xâm hại"],
        c: 2,
        e: "Mặt khách quan là biểu hiện bên ngoài. Loại A (mặt chủ quan), B (chủ thể), D (khách thể)."
      },
      {
        q: "Trách nhiệm kỷ luật áp dụng đối với:",
        o: ["Mọi công dân", "Cán bộ, công chức, viên chức, người lao động vi phạm nội quy, quy chế của cơ quan, tổ chức", "Chỉ doanh nghiệp", "Chỉ sĩ quan quân đội"],
        c: 1,
        e: "Phát sinh từ quan hệ lao động, công vụ. Loại A, C, D (quá hẹp hoặc sai)."
      },
      {
        q: "Luật nào sau đây quy định về tổ chức và hoạt động của Chính phủ?",
        o: ["Luật Tổ chức Chính phủ", "Luật Tổ chức Quốc hội", "Luật Tổ chức Tòa án nhân dân", "Luật Tổ chức Viện kiểm sát nhân dân"],
        c: 0,
        e: "Loại B, C, D điều chỉnh các cơ quan khác."
      },
      {
        q: "Hợp đồng dân sự vô hiệu có nghĩa là:",
        o: ["Hợp đồng có hiệu lực một phần", "Hợp đồng không có hiệu lực từ thời điểm xác lập, các bên hoàn trả cho nhau những gì đã nhận", "Hợp đồng vẫn có hiệu lực nhưng bị phạt", "Hợp đồng có thể được sửa đổi"],
        c: 1,
        e: "BLDS 2015 quy định vô hiệu không phát sinh quyền nghĩa vụ, khôi phục trạng thái ban đầu. Loại A, C, D."
      },
      {
        q: "Tội phạm do pháp nhân thương mại thực hiện có thể bị áp dụng hình phạt nào sau đây?",
        o: ["Đình chỉ hoạt động có thời hạn", "Tù chung thân", "Tử hình", "Cải tạo không giam giữ"],
        c: 0,
        e: "BLHS 2015 quy định hình phạt đối với pháp nhân. Loại B, C, D (chỉ áp dụng cho cá nhân)."
      },
      {
        q: "Trong tố tụng hình sự, nguyên tắc “suy đoán vô tội” có nghĩa là:",
        o: ["Bị can, bị cáo phải tự chứng minh mình vô tội", "Tòa án có quyền kết tội mà không cần chứng cứ", "Cơ quan điều tra được phép ép cung", "Bị can, bị cáo được coi là không có tội cho đến khi có bản án kết tội có hiệu lực pháp luật"],
        c: 3,
        e: "Điều 13 BLTTHS 2015. Loại A, B, C (sai hoàn toàn)."
      },
      {
        q: "Người từ đủ bao nhiêu tuổi phải chịu trách nhiệm hình sự về mọi tội phạm?",
        o: ["14 tuổi", "15 tuổi", "16 tuổi", "18 tuổi"],
        c: 2,
        e: "Điều 12 BLHS 2015. Loại A (chỉ chịu một số tội), B (không phải mốc), D (thành niên)."
      },
      {
        q: "Văn bản quy phạm pháp luật do Hội đồng nhân dân cấp tỉnh ban hành có tên gọi là:",
        o: ["Quyết định", "Nghị quyết", "Chỉ thị", "Thông tư"],
        c: 1,
        e: "HĐND ban hành nghị quyết. Loại A (UBND), C, D (cơ quan khác)."
      },
      {
        q: "Cơ quan nào có thẩm quyền giải thích Hiến pháp, luật, pháp lệnh ở Việt Nam?",
        o: ["Tòa án nhân dân tối cao", "Chính phủ", "Ủy ban Thường vụ Quốc hội", "Chủ tịch nước"],
        c: 2,
        e: "Điều 74 Hiến pháp 2013. Loại A, B, D (không có thẩm quyền)."
      },
      {
        q: "Hành vi “không cứu giúp người đang ở trong tình trạng nguy hiểm đến tính mạng” trong một số trường hợp có thể bị truy cứu trách nhiệm hình sự. Đây là hình thức thực hiện pháp luật nào đối với người có nghĩa vụ cứu giúp?",
        o: ["Tuân thủ pháp luật", "Chấp hành pháp luật", "Sử dụng pháp luật", "Áp dụng pháp luật"],
        c: 1,
        e: "Nghĩa vụ bắt buộc phải làm (chấp hành). Loại A (không làm điều cấm), C (thực hiện quyền), D (cơ quan nhà nước)."
      },
      {
        q: "Tại sao nhà nước pháp quyền cần có sự kiểm soát quyền lực?",
        o: ["Để ngăn chặn sự lạm quyền, tham nhũng, độc đoán của các cơ quan và người có thẩm quyền", "Để làm yếu bộ máy nhà nước", "Để Quốc hội kiểm soát hoàn toàn", "Để xóa bỏ quyền hành pháp"],
        c: 0,
        e: "Cơ chế phòng ngừa lạm quyền. Loại B, C, D (sai mục đích)."
      },
      {
        q: "Ý thức pháp luật có vai trò như thế nào trong việc xây dựng pháp luật?",
        o: ["Không liên quan", "Làm chậm quá trình", "Chỉ mang tính hình thức", "Là cơ sở lý luận và thực tiễn để các nhà làm luật xác định nhu cầu điều chỉnh, nội dung quy phạm, bảo đảm tính khả thi"],
        c: 3,
        e: "Ý thức pháp luật ảnh hưởng đến chất lượng văn bản. Loại A, B, C."
      },
      {
        q: "Trong trường hợp có sự mâu thuẫn giữa hai văn bản do cùng cơ quan ban hành nhưng khác thời điểm, nguyên tắc nào được ưu tiên?",
        o: ["Văn bản sau (lex posterior)", "Văn bản trước (lex prior)", "Văn bản nào cũng được", "Tòa án tự chọn"],
        c: 0,
        e: "Nguyên tắc luật sau bãi bỏ luật trước. Loại B, C, D."
      },
      {
        q: "Một người bị tạm giữ hành chính, sau đó phát hiện việc tạm giữ là trái pháp luật. Người đó có quyền yêu cầu bồi thường từ Nhà nước không?",
        o: ["Có, theo Luật Trách nhiệm bồi thường của Nhà nước và Hiến pháp 2013", "Không, vì tạm giữ hành chính là hoạt động bình thường", "Chỉ được bồi thường nếu bị kết án oan", "Tùy quyết định của tòa"],
        c: 0,
        e: "Hiến pháp và Luật Trách nhiệm bồi thường quy định bồi thường oan sai. Loại B, C, D."
      },
      {
        q: "Chức năng nào của pháp luật giúp con người biết được hành vi nào được phép, hành vi nào bị cấm?",
        o: ["Chức năng bảo vệ", "Chức năng giáo dục", "Chức năng điều chỉnh (định hướng hành vi)", "Chức năng thông tin"],
        c: 2,
        e: "Chức năng điều chỉnh thiết lập khuôn mẫu. Loại A (xử lý vi phạm), B (tác động ý thức), D (cung cấp tri thức)."
      },
      {
        q: "Phân biệt nhà nước đơn nhất và nhà nước liên bang dựa trên tiêu chí nào là cơ bản nhất?",
        o: ["Số lượng dân cư", "Mức độ tập trung hay phân quyền giữa trung ương và địa phương; sự tồn tại của các thực thể có chủ quyền riêng (bang, tiểu bang)", "Diện tích lãnh thổ", "Trình độ phát triển kinh tế"],
        c: 1,
        e: "Sự khác biệt cốt lõi về cấu trúc và chủ quyền. Loại A, C, D (không phải tiêu chí phân định)."
      },
      {
        q: "Vì sao việc xử lý vi phạm pháp luật phải nhanh chóng, kịp thời?",
        o: ["Để có tính giáo dục, răn đe, không để vi phạm kéo dài, gây bức xúc", "Để cho qua", "Để khỏi mất thời gian", "Để người vi phạm khỏi phải lo"],
        c: 0,
        e: "Nguyên tắc xử lý nhanh chóng bảo đảm hiệu quả. Loại B, C, D."
      },
      {
        q: "Nguyên tắc bình đẳng trước pháp luật được hiểu là:",
        o: ["Mọi người đều có quyền và nghĩa vụ như nhau, không có ngoại lệ", "Mọi công dân đều bình đẳng về quyền và nghĩa vụ, không phân biệt đối xử; trong trường hợp đặc biệt có thể có quy định riêng nhưng phải dựa trên lý do chính đáng", "Chỉ có người giàu mới bình đẳng", "Nhà nước có quyền ưu tiên cho cán bộ"],
        c: 1,
        e: "Bình đẳng không có nghĩa là hoàn toàn giống nhau, có quy định riêng hợp lý. Loại A (cứng nhắc), C, D (sai)."
      },
      {
        q: "Một công dân muốn đóng góp ý kiến vào dự thảo luật. Họ có thể thực hiện quyền này qua kênh nào?",
        o: ["Gửi ý kiến trực tiếp đến cơ quan soạn thảo, tham gia hội thảo lấy ý kiến nhân dân, hoặc qua các tổ chức chính trị – xã hội", "Không có quyền này", "Chỉ có thể biểu tình", "Chỉ qua mạng xã hội"],
        c: 0,
        e: "Hiến pháp và Luật Ban hành văn bản quy định việc lấy ý kiến. Loại B, C, D."
      },
      {
        q: "Hình thức trách nhiệm pháp lý nào sau đây do Tòa án áp dụng?",
        o: ["Trách nhiệm hành chính", "Trách nhiệm dân sự", "Trách nhiệm kỷ luật", "Trách nhiệm hình sự và trách nhiệm dân sự (trong nhiều trường hợp)"],
        c: 3,
        e: "Tòa án tuyên hình phạt và giải quyết dân sự. Loại A (cơ quan hành chính), C (người sử dụng lao động)."
      },
      {
        q: "Tại sao trong Luật Hình sự có quy định về “phòng vệ chính đáng”?",
        o: ["Để khuyến khích bạo lực", "Để công nhận quyền tự vệ của con người, loại trừ tính trái pháp luật của hành vi trong một số trường hợp nhất định", "Để bảo vệ người tấn công", "Để giảm nhẹ trách nhiệm hình sự một cách tùy tiện"],
        c: 1,
        e: "Phòng vệ chính đáng là trường hợp loại trừ TNHS. Loại A, C, D."
      },
      {
        q: "Văn bản nào có hiệu lực pháp lý cao hơn: Luật Doanh nghiệp do Quốc hội ban hành hay Nghị định của Chính phủ quy định chi tiết?",
        o: ["Luật Doanh nghiệp", "Nghị định", "Bằng nhau", "Tùy trường hợp"],
        c: 0,
        e: "Luật có hiệu lực cao hơn nghị định (văn bản dưới luật). Loại B, C, D."
      },
      {
        q: "Quyền khiếu nại của công dân thuộc loại quyền gì?",
        o: ["Quyền chính trị", "Quyền dân sự", "Quyền kinh tế", "Quyền văn hóa"],
        c: 0,
        e: "Quyền khiếu nại, tố cáo thuộc nhóm quyền tham gia quản lý nhà nước - tức quyền chính trị. Loại B, C, D."
      },
      {
        q: "Một người bị phạt tù 5 năm. Sau khi chấp hành được 2 năm, người đó được tha tù trước thời hạn. Quyết định tha tù trước thời hạn do ai ban hành?",
        o: ["Chủ tịch nước", "Tòa án nhân dân", "Chính phủ", "Viện kiểm sát"],
        c: 1,
        e: "Tha tù trước thời hạn do Tòa án quyết định. Loại A (đặc xá), C, D."
      },
      {
        q: "Trong quan hệ lao động, người sử dụng lao động có thể đơn phương chấm dứt hợp đồng lao động khi:",
        o: ["Người lao động bị ốm đau", "Người lao động thường xuyên không hoàn thành công việc theo hợp đồng", "Người lao động nghỉ thai sản", "Bất kỳ lúc nào"],
        c: 1,
        e: "BLLĐ 2019 quy định. Loại A, C (cấm đơn phương), D (sai)."
      },
      {
        q: "Tội phạm được phân loại thành mấy loại theo BLHS 2015?",
        o: ["2 loại", "3 loại", "4 loại", "5 loại"],
        c: 2,
        e: "Điều 8 BLHS 2015 phân loại 4 loại: ít, nghiêm trọng, rất, đặc biệt. Loại A, B, D."
      },
      {
        q: "Giấy phép xây dựng bị thu hồi do vi phạm. Quyết định thu hồi này có thể bị khởi kiện tại tòa án nào?",
        o: ["Tòa án dân sự", "Tòa án hành chính", "Tòa án hình sự", "Tòa án lao động"],
        c: 1,
        e: "Quyết định hành chính cá biệt thuộc đối tượng khởi kiện hành chính. Loại A, C, D."
      },
      {
        q: "Hội đồng nhân dân do ai bầu ra?",
        o: ["Ủy ban nhân dân cùng cấp", "Nhân dân địa phương bầu trực tiếp", "Quốc hội bầu", "Chính phủ bổ nhiệm"],
        c: 1,
        e: "HĐND do nhân dân địa phương bầu. Loại A (UBND do HĐND bầu), C, D."
      },
      {
        q: "Một người bị xử phạt hành chính vì vi phạm giao thông. Hình thức phạt chính áp dụng có thể là:",
        o: ["Cảnh cáo hoặc phạt tiền", "Tịch thu xe", "Tước giấy phép lái xe có thời hạn", "Cải tạo không giam giữ"],
        c: 0,
        e: "Hai hình thức phạt chính: cảnh cáo và phạt tiền. Loại B, C (phạt bổ sung/biện pháp), D (hình sự)."
      },
      {
        q: "Án lệ ở Việt Nam được lựa chọn từ:",
        o: ["Bất kỳ bản án, quyết định nào của tòa án", "Những bản án, quyết định đã có hiệu lực pháp luật, được Hội đồng Thẩm phán TANDTC lựa chọn và Chánh án TANDTC công bố", "Các bản án của tòa án nước ngoài", "Các quyết định của Chính phủ"],
        c: 1,
        e: "Theo Nghị quyết của Hội đồng Thẩm phán TANDTC. Loại A, C, D."
      },
      {
        q: "Trong trường hợp nào Nhà nước có thể trưng dụng tài sản của người dân mà không cần sự đồng ý?",
        o: ["Khi cần xây dựng khu đô thị mới", "Khi có chiến tranh, tình trạng khẩn cấp, phòng chống thiên tai, theo quy định của luật và phải bồi thường", "Khi cần lấy đất cho doanh nghiệp tư nhân", "Bất kỳ lúc nào cũng được"],
        c: 1,
        e: "Trưng dụng chỉ áp dụng trường hợp đặc biệt luật định và phải bồi thường. Loại A, C, D."
      },
      {
        q: "Tại sao pháp luật quy định thủ tục hòa giải bắt buộc trong một số tranh chấp dân sự?",
        o: ["Để tạo cơ hội cho các bên tự giải quyết tranh chấp, giảm tải cho tòa án", "Để kéo dài thời gian", "Để làm giàu cho luật sư", "Để gây khó cho đương sự"],
        c: 0,
        e: "Hòa giải giúp tiết kiệm chi phí, thời gian. Loại B, C, D."
      },
      {
        q: "Chức năng của Viện kiểm sát nhân dân là:",
        o: ["Xét xử", "Thực hành quyền công tố và kiểm sát hoạt động tư pháp", "Quản lý hành chính", "Lập pháp"],
        c: 1,
        e: "Hiến pháp 2013 quy định. Loại A (Tòa án), C (Chính phủ), D (Quốc hội)."
      },
      {
        q: "Một người bị mất năng lực hành vi dân sự do bệnh tâm thần. Giao dịch do người đó xác lập có hiệu lực không?",
        o: ["Có hiệu lực nếu người đó có tài sản", "Luôn có hiệu lực", "Vô hiệu, trừ trường hợp giao dịch nhỏ phục vụ nhu cầu sinh hoạt hàng ngày", "Vô hiệu tuyệt đối, không có ngoại lệ"],
        c: 2,
        e: "BLDS 2015 Điều 128. Loại A, B (sai), D (quá tuyệt đối, có ngoại lệ)."
      }
    ]
  },
  {
    id: "pldc-exam-t5",
    testId: 5,
    title: "Đề thi Pháp luật đại cương Số 5",
    description: "Khảo sát kiến thức chuyên sâu của Chương 1 đến Chương 6, ôn luyện 40 câu hỏi trắc nghiệm kèm giải thích chi tiết.",
    questions: [
      {
        q: "Tính xã hội của nhà nước thể hiện qua việc:",
        o: ["Nhà nước giải quyết những vấn đề chung của toàn xã hội, bảo vệ lợi ích chung", "Nhà nước chỉ bảo vệ lợi ích của giai cấp cầm quyền", "Nhà nước sử dụng bạo lực để trấn áp nhân dân", "Nhà nước do một cá nhân đứng đầu"],
        c: 0,
        e: "Tính xã hội là thực hiện nhiệm vụ vì cộng đồng. Loại B (tính giai cấp), C (phương thức), D (chính thể)."
      },
      {
        q: "Theo Hiến pháp 2013, chủ thể nào nắm giữ quyền lực nhà nước?",
        o: ["Quốc hội", "Nhân dân", "Chính phủ", "Đảng Cộng sản Việt Nam"],
        c: 1,
        e: "Điều 2 Hiến pháp 2013. Tất cả quyền lực nhà nước thuộc về Nhân dân. Loại A, C (cơ quan thực hiện), D (Đảng lãnh đạo)."
      },
      {
        q: "Chính thể cộng hòa đại nghị có đặc điểm:",
        o: ["Tổng thống do dân bầu, nắm quyền hành pháp", "Nguyên thủ quốc gia do nghị viện bầu, chính phủ do thủ tướng đứng đầu và chịu trách nhiệm trước nghị viện", "Quyền lực tập trung vào một người", "Không có nghị viện"],
        c: 1,
        e: "Đặc điểm cộng hòa đại nghị. Loại A (tổng thống), C (chuyên chế), D (sai)."
      },
      {
        q: "Ủy ban nhân dân các cấp là cơ quan:",
        o: ["Quyền lực nhà nước ở địa phương", "Xét xử ở địa phương", "Kiểm sát ở địa phương", "Hành chính nhà nước ở địa phương"],
        c: 3,
        e: "UBND là cơ quan hành chính ở địa phương. Loại A (HĐND), B (Tòa án), C (Viện kiểm sát)."
      },
      {
        q: "Nguồn pháp luật quan trọng nhất ở Việt Nam hiện nay là:",
        o: ["Tập quán pháp", "Án lệ", "Văn bản quy phạm pháp luật (luật viết)", "Điều ước quốc tế"],
        c: 2,
        e: "Hệ thống Civil law coi văn bản quy phạm là nguồn chính. Loại A, B (bổ trợ), D (quan hệ quốc tế)."
      },
      {
        q: "“Không được giết người” là một quy phạm pháp luật thuộc loại:",
        o: ["Quy phạm cho phép", "Quy phạm cấm đoán", "Quy phạm bắt buộc", "Quy phạm xung đột"],
        c: 1,
        e: "Yêu cầu không được thực hiện hành vi. Loại A (cho phép), C (bắt buộc làm), D (chỉ dẫn)."
      },
      {
        q: "Các yếu tố cấu thành quan hệ pháp luật bao gồm:",
        o: ["Giả định, quy định, chế tài", "Chủ thể, khách thể, nội dung (quyền và nghĩa vụ)", "Mặt khách quan, mặt chủ quan, chủ thể, khách thể", "Phần chung, phần riêng"],
        c: 1,
        e: "Ba yếu tố: chủ thể, khách thể, nội dung. Loại A (cấu trúc quy phạm), C (cấu thành vi phạm), D (bố cục)."
      },
      {
        q: "Hành vi nào sau đây không được coi là vi phạm pháp luật?",
        o: ["Hành vi của người dưới 14 tuổi gây thiệt hại", "Hành vi vượt đèn đỏ của người đủ 18 tuổi", "Hành vi xả thải chưa xử lý của doanh nghiệp", "Hành vi cố ý gây thương tích của người 25 tuổi"],
        c: 0,
        e: "Thiếu yếu tố chủ thể (năng lực trách nhiệm pháp lý theo độ tuổi). Loại B, C, D (đủ dấu hiệu)."
      },
      {
        q: "Trách nhiệm dân sự bồi thường thiệt hại ngoài hợp đồng phát sinh khi:",
        o: ["Chỉ cần có thiệt hại", "Chỉ cần có hợp đồng", "Chỉ cần có lỗi", "Có thiệt hại xảy ra, hành vi trái pháp luật, có mối quan hệ nhân quả, có lỗi (trừ một số trường hợp đặc biệt)"],
        c: 3,
        e: "BLDS 2015 quy định 4 điều kiện: Có thiệt hại, Có hành vi trái luật, Có lỗi, Có mối quan hệ nhân quả. Loại A, B, C (thiếu điều kiện)."
      },
      {
        q: "Hình phạt nào sau đây không áp dụng cho người dưới 18 tuổi phạm tội?",
        o: ["Cảnh cáo", "Cải tạo không giam giữ", "Tử hình", "Tù có thời hạn"],
        c: 2,
        e: "BLHS 2015 nghiêm cấm áp dụng tử hình đối với người dưới 18 tuổi. Loại A, B, D."
      },
      {
        q: "Luật Tố tụng hành chính được ban hành năm nào?",
        o: ["2010", "2015", "2011", "2019"],
        c: 1,
        e: "Luật Tố tụng hành chính hiện hành được ban hành năm 2015. Loại A, C, D."
      },
      {
        q: "Quyền tự do kinh doanh của công dân được ghi nhận trong văn bản luật nào?",
        o: ["Hiến pháp và Luật Doanh nghiệp", "Chỉ Luật Doanh nghiệp", "Chỉ Bộ luật Dân sự", "Chỉ Pháp lệnh"],
        c: 0,
        e: "Điều 33 Hiến pháp 2013 và Luật Doanh nghiệp đều bảo vệ quyền này. Loại B, C, D (thiếu)."
      },
      {
        q: "Tranh chấp hợp đồng thương mại giữa hai doanh nghiệp Việt Nam có thể được giải quyết bằng hình thức nào?",
        o: ["Tòa án hoặc Trọng tài thương mại", "Chỉ Tòa án", "Chỉ Trọng tài", "Không thể giải quyết"],
        c: 0,
        e: "Luật Trọng tài và BLTTDS cho phép lựa chọn linh hoạt. Loại B, C (thiếu), D (sai)."
      },
      {
        q: "Nguyên tắc “tập trung dân chủ” trong tổ chức bộ máy nhà nước thể hiện ở:",
        o: ["Tập trung quyền lực vào một người", "Dân chủ vô hạn, không có lãnh đạo tập trung", "Kết hợp hài hòa giữa lãnh đạo tập trung và phát huy dân chủ, phân cấp hợp lý", "Bỏ qua ý kiến của quần chúng"],
        c: 2,
        e: "Kết hợp lãnh đạo tập trung từ trung ương thống nhất và phát huy tự chủ địa phương. Loại A (độc đoán), B (cực đoan), D (phản dân chủ)."
      },
      {
        q: "Tại sao Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam được gọi là nhà nước pháp quyền xã hội chủ nghĩa?",
        o: ["Vì nhà nước sử dụng bạo lực để cai trị", "Vì nhà nước thừa nhận tính tối cao của pháp luật, tôn trọng quyền con người, hoạt động trong khuôn khổ Hiến pháp và pháp luật dưới sự lãnh đạo của Đảng", "Vì nhà nước độc tài", "Vì nhà nước do một cá nhân đứng đầu"],
        c: 1,
        e: "Định nghĩa về nhà nước pháp quyền XHCN thực thi dân chủ. Loại A, C, D (sai bản chất)."
      },
      {
        q: "Văn bản quy phạm pháp luật của Bộ trưởng có tên gọi là:",
        o: ["Nghị định", "Quyết định", "Thông tư", "Chỉ thị"],
        c: 2,
        e: "Luật Ban hành văn bản QPPL quy định Bộ trưởng ban hành thông tư. Loại A (Chính phủ), B (UBND, vụ trưởng...), D."
      },
      {
        q: "Khi phát hiện một quyết định hành chính trái pháp luật, công dân có thể:",
        o: ["Khiếu nại lên cấp trên hoặc khởi kiện ra tòa hành chính", "Làm theo quyết định", "Tự ý không chấp hành", "Báo công an"],
        c: 0,
        e: "Luật Khiếu nại và Luật TTHC quy định quyền khiếu nại, khởi kiện hợp pháp. Loại B, C, D."
      },
      {
        q: "Một người bị tạm giam, sau đó được thả vì không có căn cứ khởi tố. Anh ta có quyền yêu cầu bồi thường thiệt hại từ Nhà nước không?",
        o: ["Có, theo Luật Trách nhiệm bồi thường của Nhà nước", "Không, vì tạm giam đã đúng luật", "Chỉ được bồi thường nếu bị kết án oan", "Tùy quyết định của tòa"],
        c: 0,
        e: "Luật Trách nhiệm bồi thường quy định rõ bồi thường cho người bị giam giữ oan sai. Loại B, C, D."
      },
      {
        q: "Chế tài trong quy phạm pháp luật có thể là:",
        o: ["Chỉ có hình phạt tù", "Chỉ có phạt tiền", "Chỉ có cảnh cáo", "Hình phạt tù (hình sự), phạt tiền (hành chính), bồi thường thiệt hại (dân sự)…"],
        c: 3,
        e: "Chế tài đa dạng tùy ngành luật tương ứng. Loại A, B, C (quá hẹp)."
      },
      {
        q: "Trách nhiệm bồi thường thiệt hại do nguồn nguy hiểm cao độ gây ra là trách nhiệm:",
        o: ["Có lỗi", "Không có lỗi (trách nhiệm khách quan)", "Hình sự", "Hành chính"],
        c: 1,
        e: "BLDS 2015 quy định chủ sở hữu nguồn nguy hiểm cao độ phải bồi thường ngay cả khi không có lỗi. Loại A, C, D."
      },
      {
        q: "Vì sao pháp luật cần có hiệu lực theo thời gian, không gian và đối với người?",
        o: ["Để xác định phạm vi tác động của pháp luật, tránh áp dụng sai, bảo đảm quyền lợi của chủ thể", "Để làm phức tạp", "Để tùy tiện", "Để không ai biết"],
        c: 0,
        e: "Hiệu lực quy định rõ ranh giới thời gian và không gian áp dụng pháp luật. Loại B, C, D."
      },
      {
        q: "Quyết định hành chính cá biệt có đặc điểm gì?",
        o: ["Là quy tắc xử sự chung, áp dụng nhiều lần", "Được ban hành để giải quyết một trường hợp cụ thể, áp dụng một lần", "Có hiệu lực vô thời hạn", "Không thể bị khiếu kiện"],
        c: 1,
        e: "Áp dụng một lần đối với một đối tượng cụ thể. Loại A (văn bản quy phạm), C, D."
      },
      {
        q: "Tại sao người chưa đủ 18 tuổi vẫn có thể thực hiện một số giao dịch dân sự?",
        o: ["Vì họ có năng lực pháp luật", "Vì BLDS cho phép người từ đủ 6 đến dưới 18 tuổi thực hiện giao dịch phục vụ nhu cầu sinh hoạt hàng ngày hoặc được người đại diện đồng ý", "Vì họ có năng lực hành vi đầy đủ", "Vì luật không quy định"],
        c: 1,
        e: "Điều 21 BLDS 2015 quy định rõ quyền tự lập có kiểm soát cho người chưa thành niên. Loại A, C (chưa đầy đủ), D (có quy định)."
      },
      {
        q: "Phân tích sự khác biệt giữa “khiếu nại” và “tố cáo”.",
        o: ["Khiếu nại là phản ánh về quyết định, hành vi của cơ quan, người có thẩm quyền; tố cáo là báo tin về hành vi vi phạm pháp luật của bất kỳ ai", "Giống nhau", "Khiếu nại do cơ quan thực hiện; tố cáo do công dân", "Không có sự khác biệt"],
        c: 0,
        e: "Luật Khiếu nại và Luật Tố cáo định nghĩa khác nhau về mục đích, đối tượng và chủ thể. Loại B, C, D."
      },
      {
        q: "Một người phạm tội nhưng đã tự thú, thành khẩn khai báo, ăn năn hối cải. Đây là tình tiết:",
        o: ["Tăng nặng trách nhiệm hình sự", "Giảm nhẹ trách nhiệm hình sự", "Loại trừ trách nhiệm hình sự", "Không ảnh hưởng"],
        c: 1,
        e: "Điều 51 BLHS 2015 quy định đây là tình tiết giảm nhẹ trách nhiệm hình sự. Loại A, C (không đến mức), D."
      },
      {
        q: "Quyết định xử phạt vi phạm hành chính có thể bị hủy bởi cơ quan nào?",
        o: ["Chính phủ hoặc Tòa án hành chính", "Chỉ Chính phủ", "Chỉ Tòa án dân sự", "Chỉ Viện kiểm sát"],
        c: 0,
        e: "Cấp trên trực tiếp hoặc Tòa án hành chính đều có thẩm quyền tuyên hủy quyết định hành chính sai luật. Loại B, C, D."
      },
      {
        q: "Người từ đủ 14 đến dưới 16 tuổi chỉ phải chịu trách nhiệm hình sự về:",
        o: ["Mọi tội phạm", "Tội phạm ít nghiêm trọng", "Tội phạm rất nghiêm trọng do cố ý và tội phạm đặc biệt nghiêm trọng", "Không phải chịu trách nhiệm hình sự"],
        c: 2,
        e: "Điều 12 BLHS 2015. Giới hạn tuổi chịu TNHS đối với trẻ em rất hẹp. Loại A, B, D."
      },
      {
        q: "Hành vi “cố ý làm trái quy định của pháp luật về quản lý kinh tế, gây thiệt hại cho nhà nước” có thể bị truy cứu trách nhiệm gì?",
        o: ["Hình sự (tội)", "Hành chính", "Dân sự", "Kỷ luật"],
        c: 0,
        e: "BLHS quy định các nhóm tội phạm kinh tế tương ứng. Loại B, C, D (có thể kèm nhưng chính yếu là hình sự)."
      },
      {
        q: "Một doanh nghiệp bị xử phạt hành chính vì vi phạm an toàn thực phẩm. Ngoài phạt tiền, doanh nghiệp còn có thể bị áp dụng biện pháp gì?",
        o: ["Buộc tiêu hủy sản phẩm vi phạm, đình chỉ hoạt động, buộc thu hồi sản phẩm", "Phạt tù", "Tước quyền công dân", "Tịch thu tài sản toàn bộ"],
        c: 0,
        e: "Biện pháp khắc phục hậu quả theo Luật Xử lý vi phạm hành chính. Loại B, C (hình sự), D."
      },
      {
        q: "Tranh chấp lao động cá nhân giữa người lao động và người sử dụng lao động có thể được giải quyết bằng hình thức nào?",
        o: ["Chỉ Tòa án", "Chỉ hòa giải", "Chỉ trọng tài", "Hòa giải viên lao động, Hội đồng trọng tài lao động, Tòa án"],
        c: 3,
        e: "Luật quy định nhiều cấp độ giải quyết tạo điều kiện tối đa cho các bên tự thỏa thuận. Loại A, B, C (thiếu)."
      },
      {
        q: "Quyền bầu cử của công dân thuộc loại quyền gì?",
        o: ["Quyền dân sự", "Quyền chính trị", "Quyền kinh tế", "Quyền văn hóa"],
        c: 1,
        e: "Quyền bầu cử chính là quyền tham gia chính sự quản lý nhà nước - thuộc quyền chính trị. Loại A, C, D."
      },
      {
        q: "Một người bị kết án tù nhưng được hưởng án treo. Điều này có nghĩa là:",
        o: ["Người đó không phải chấp hành hình phạt tù", "Người đó được tạm thời không phải vào trại giam, nhưng nếu vi phạm trong thời gian thử thách sẽ phải chấp hành án tù", "Người đó được miễn hoàn toàn trách nhiệm", "Người đó được giảm án"],
        c: 1,
        e: "Điều 65 BLHS. Án treo là miễn chấp hành hình phạt tù có thử thách dưới sự giám sát địa phương. Loại A, C, D (hiểu sai)."
      },
      {
        q: "Tòa án nhân dân cấp huyện giải quyết những loại việc gì?",
        o: ["Mọi vụ án dân sự, hành chính, hình sự không thuộc thẩm quyền của cấp tỉnh (và không có yếu tố nước ngoài)", "Chỉ vụ án hình sự", "Chỉ vụ án dân sự", "Chỉ vụ án hành chính"],
        c: 0,
        e: "Thẩm quyền phán quyết sơ khởi chung cho tòa cấp huyện. Loại B, C, D (quá hẹp)."
      },
      {
        q: "Văn bản pháp luật nào có hiệu lực cao hơn: Luật hay Pháp lệnh?",
        o: ["Luật", "Pháp lệnh", "Bằng nhau", "Tùy trường hợp"],
        c: 0,
        e: "Luật do Quốc hội (cơ quan quyền lực lập pháp tối cao); Pháp lệnh do Ủy ban Thường vụ Quốc hội ban hành. Loại B, C, D."
      },
      {
        q: "Một người ký hợp đồng vay tiền với lãi suất 25%/năm. Theo quy định của BLDS, mức lãi suất này có hợp pháp không?",
        o: ["Có, nếu các bên thỏa thuận", "Không, vì vượt quá 20%/năm (BLDS 2015 quy định lãi suất không được vượt quá 20%/năm)", "Có, nếu có tài sản bảo đảm", "Không, vì bất kỳ lãi suất nào cũng không được"],
        c: 1,
        e: "Điều 468 BLDS 2015 giới hạn mức trần lãi suất tự thỏa thuận là 20%/năm để chống cho vay nặng lãi. Loại A, C, D."
      },
      {
        q: "Nguyên tắc xét xử sơ thẩm, phúc thẩm (hai cấp xét xử) được quy định trong:",
        o: ["Chỉ trong Luật Tổ chức TAND", "Chỉ trong BLTTDS", "Chỉ trong BLTTHS", "Hiến pháp 2013 và các luật tố tụng"],
        c: 3,
        e: "Hiến pháp Điều 103 và luật tố tụng ghi nhận chế độ hai cấp xét xử bảo vệ tối đa lợi ích nhân dân. Loại A, B, C (thiếu)."
      },
      {
        q: "Một người bị thiệt hại do hành vi xâm phạm danh dự, nhân phẩm trên mạng xã hội. Người đó có thể yêu cầu bồi thường thiệt hại theo văn bản luật nào?",
        o: ["Bộ luật Dân sự (bồi thường thiệt hại ngoài hợp đồng)", "Bộ luật Hình sự", "Luật Hành chính", "Luật Lao động"],
        c: 0,
        e: "Hành vi bồi thường do xúc phạm danh dự nhân thân là thuộc phạm vi điều chỉnh chế tài dân sự. Loại B (hình sự chỉ khởi tố khi đủ cấu thành tội phạm), C, D."
      },
      {
        q: "Tại sao cần có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong thực hiện quyền lập pháp, hành pháp, tư pháp?",
        o: ["Để tránh sự lạm quyền, bảo đảm quyền lực nhà nước được thực hiện có hiệu lực, hiệu quả và dân chủ", "Để tạo sự cạnh tranh giữa các cơ quan", "Để làm suy yếu nhà nước", "Để xóa bỏ quyền lập pháp"],
        c: 0,
        e: "Cơ chế kiềm chế quyền lực chống hành vi lạm quyền, đảm bảo trật tự dân chủ hữu hiệu. Loại B, C, D."
      },
      {
        q: "Trong trường hợp có xung đột lợi ích giữa cá nhân và cộng đồng, nhà nước pháp quyền giải quyết như thế nào?",
        o: ["Luôn ưu tiên cá nhân", "Luôn ưu tiên cộng đồng, nhưng phải có luật định và bồi thường thỏa đáng", "Mặc kệ", "Để thị trường quyết định"],
        c: 1,
        e: "Pháp luật có thể trưng mua hoặc hạn chế quyền sở hữu cá nhân vì mục tiêu công cộng nhưng hiến định phải đền bù hợp lý tối đa. Loại A, C, D."
      },
      {
        q: "Một người bị khởi kiện yêu cầu bồi thường thiệt hại nhưng không có tài sản để bồi thường. Hậu quả pháp lý có thể là:",
        o: ["Thi hành án khi có tài sản sau này, hoặc chịu trách nhiệm hình sự về tội không chấp hành án", "Được miễn hoàn toàn", "Nhà nước bồi thường thay", "Không cần bồi thường"],
        c: 0,
        e: "Nghĩa vụ dân sự không tự biến mất khi chưa thực thi, chủ nợ vẫn có quyền thu hồi tài sản phát sinh sau này. Loại B, C, D."
      }
    ]
  }
];
