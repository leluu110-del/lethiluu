import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- CHỦ ĐỀ 1: CƠ THỂ SINH VẬT & TẾ BÀO ---
  {
    id: 1,
    topicId: 'cell_organism',
    question: 'Đơn vị cơ bản cấu tạo nên mọi cơ thể sống từ đơn giản đến phức tạp là gì?',
    options: ['Mô', 'Cơ quan', 'Tế bào', 'Hệ cơ quan'],
    correctIndex: 2,
    explanation: 'Mọi sinh vật đều được cấu tạo từ một hoặc nhiều tế bào. Do đó, tế bào là đơn vị cấu trúc và chức năng cơ bản của sự sống.',
    difficulty: 'easy',
  },
  {
    id: 2,
    topicId: 'cell_organism',
    question: 'Bào quan nào chỉ có ở tế bào thực vật mà không có ở tế bào động vật?',
    options: ['Màng sinh chất', 'Nhân tế bào', 'Lục lạp và Thành tế bào', 'Chất tế bào'],
    correctIndex: 2,
    explanation: 'Tế bào thực vật có thêm thành tế bào (bằng cellulose) giúp cây cứng cáp và lục lạp chứa diệp lục để quang hợp. Tế bào động vật không có hai thành phần này.',
    difficulty: 'medium',
  },
  {
    id: 3,
    topicId: 'cell_organism',
    question: 'Sinh vật nào dưới đây là sinh vật đơn bào?',
    options: ['Cây hoa phượng vĩ', 'Con chim bồ câu', 'Trùng roi xanh', 'Cây cà chua'],
    correctIndex: 2,
    explanation: 'Trùng roi xanh có cơ thể chỉ gồm 1 tế bào duy nhất nhưng thực hiện được đầy đủ các chức năng sống.',
    difficulty: 'easy',
  },
  {
    id: 4,
    topicId: 'cell_organism',
    question: 'Trật tự đúng của các cấp tổ chức trong cơ thể đa bào từ nhỏ đến lớn là:',
    options: [
      'Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể',
      'Mô → Tế bào → Cơ quan → Hệ cơ quan → Cơ thể',
      'Tế bào → Cơ quan → Mô → Hệ cơ quan → Cơ thể',
      'Cơ thể → Hệ cơ quan → Cơ quan → Mô → Tế bào'
    ],
    correctIndex: 0,
    explanation: 'Trật tự đúng từ bé đến lớn: Tế bào kết hợp thành Mô, nhiều Mô thành Cơ quan, các Cơ quan tạo thành Hệ cơ quan, và kết hợp thành Cơ thể hoàn chỉnh.',
    difficulty: 'medium',
  },
  {
    id: 5,
    topicId: 'cell_organism',
    question: 'Khi làm tiêu bản tế bào biểu bì vảy hành, tại sao ta cần nhỏ thêm một giọt dung dịch Lugol (hoặc iốt loãng)?',
    options: [
      'Để tế bào to hơn gấp 10 lần',
      'Để nhuộm màu nhân tế bào và các bào quan giúp nhìn rõ dưới kính hiển vi',
      'Để tế bào không bị bay hơi nước',
      'Để diệt vi khuẩn bám trên củ hành'
    ],
    correctIndex: 1,
    explanation: 'Dung dịch nhuộm Lugol giúp nhân tế bào và các cấu trúc bắt màu đậm hơn, phân biệt rõ ràng so với chất tế bào trong suốt.',
    difficulty: 'hard',
  },
  {
    id: 6,
    topicId: 'cell_organism',
    question: 'Thành phần nào của tế bào đóng vai trò là "trung tâm điều khiển" chứa vật chất di truyền?',
    options: ['Màng tế bào', 'Nhân tế bào', 'Lục lạp', 'Không bào'],
    correctIndex: 1,
    explanation: 'Nhân tế bào chứa DNA (vật chất di truyền), điều khiển mọi hoạt động sống và phân chia của tế bào.',
    difficulty: 'easy',
  },
  {
    id: 7,
    topicId: 'cell_organism',
    question: 'Ở thực vật, lá cây là một:',
    options: ['Tế bào', 'Mô', 'Cơ quan', 'Hệ cơ quan'],
    correctIndex: 2,
    explanation: 'Lá cây là một cơ quan dinh dưỡng của thực vật, được cấu tạo từ nhiều mô như mô biểu bì, mô giậu, mô xốp và mô dẫn.',
    difficulty: 'medium',
  },
  {
    id: 8,
    topicId: 'cell_organism',
    question: 'Nếu độ phóng đại của thị kính là 10x và vật kính là 40x thì độ phóng đại tổng cộng của kính hiển vi là:',
    options: ['50 lần', '400 lần', '40 lần', '140 lần'],
    correctIndex: 1,
    explanation: 'Độ phóng đại tổng cộng = Độ phóng đại thị kính × Độ phóng đại vật kính = 10 × 40 = 400 lần.',
    difficulty: 'medium',
  },

  // --- CHỦ ĐỀ 2: VIRUS ---
  {
    id: 9,
    topicId: 'virus',
    question: 'Đặc điểm nào dưới đây phân biệt rõ nhất giữa Virus và Vi khuẩn?',
    options: [
      'Virus có kích thước lớn hơn vi khuẩn',
      'Virus chưa có cấu tạo tế bào, còn vi khuẩn đã có cấu tạo tế bào',
      'Virus có khả năng tự quang hợp',
      'Virus sống tự do ngoài môi trường nước'
    ],
    correctIndex: 1,
    explanation: 'Virus chưa có cấu tạo tế bào (chỉ gồm vỏ protein và lõi acid nucleic), trong khi vi khuẩn là sinh vật đơn bào nhân sơ hoàn chỉnh.',
    difficulty: 'easy',
  },
  {
    id: 10,
    topicId: 'virus',
    question: 'Cấu tạo cơ bản của mọi loại virus gồm 2 thành phần chính là:',
    options: [
      'Màng tế bào và chất tế bào',
      'Lõi acid nucleic (DNA hoặc RNA) và vỏ protein (capsid)',
      'Nhân tế bào và không bào',
      'Thành tế bào và lục lạp'
    ],
    correctIndex: 1,
    explanation: 'Mọi virus đều có lõi chứa vật chất di truyền (DNA hoặc RNA) và lớp vỏ bao bọc bằng protein.',
    difficulty: 'easy',
  },
  {
    id: 11,
    topicId: 'virus',
    question: 'Tại sao thuốc kháng sinh KHÔNG tiêu diệt được virus?',
    options: [
      'Vì virus bơi quá nhanh trong mạch máu',
      'Vì kháng sinh chỉ tấn công thành tế bào và chuyển hóa của vi khuẩn, trong khi virus không có cấu tạo tế bào',
      'Vì virus có vỏ giáp bằng sắt',
      'Vì kháng sinh bị phân hủy ngay khi gặp virus'
    ],
    correctIndex: 1,
    explanation: 'Kháng sinh đặc trị vi khuẩn bằng cách ức chế tổng hợp thành tế bào hoặc ức chế enzyme vi khuẩn. Do virus không có các cấu trúc tế bào này nên kháng sinh hoàn toàn vô hiệu lực.',
    difficulty: 'hard',
  },
  {
    id: 12,
    topicId: 'virus',
    question: 'Giai đoạn nào trong chu trình nhân lên của virus mà virus gắn vào thụ thể trên bề mặt tế bào chủ?',
    options: ['Sinh tổng hợp', 'Hấp phụ', 'Lắp ráp', 'Giải phóng'],
    correctIndex: 1,
    explanation: 'Giai đoạn Hấp phụ: Gai glycoprotein của virus nhận diện và liên kết đặc hiệu với thụ thể trên màng tế bào chủ.',
    difficulty: 'medium',
  },
  {
    id: 13,
    topicId: 'virus',
    question: 'Biện pháp nào sau đây là cách phòng ngừa chủ động và hiệu quả nhất đối với các bệnh do virus?',
    options: [
      'Uống thuốc kháng sinh liều cao hàng ngày',
      'Tiêm vắc-xin (vaccine) phòng bệnh theo đúng lịch tiêm chủng',
      'Không tắm giặt',
      'Chỉ ăn thức ăn ngọt'
    ],
    correctIndex: 1,
    explanation: 'Vắc-xin giúp hệ miễn dịch nhận biết kháng nguyên và sản sinh sẵn kháng thể bảo vệ cơ thể khi virus thật xâm nhập.',
    difficulty: 'easy',
  },
  {
    id: 14,
    topicId: 'virus',
    question: 'Bệnh nào sau đây ở người do VIRUS gây ra?',
    options: ['Bệnh lao phổi', 'Bệnh tả', 'Bệnh Cúm mùa và Sởi', 'Bệnh uốn ván'],
    correctIndex: 2,
    explanation: 'Cúm mùa và Sởi do virus gây ra. Bệnh lao phổi, tả, uốn ván do vi khuẩn gây ra.',
    difficulty: 'medium',
  },
  {
    id: 15,
    topicId: 'virus',
    question: 'Tại sao việc rửa tay bằng xà phòng dưới vòi nước chảy ít nhất 30 giây giúp phòng chống virus?',
    options: [
      'Vì bọt xà phòng làm tăng nhiệt độ bàn tay lên 100°C',
      'Vì các phân tử xà phòng phá vỡ lớp vỏ lipid và protein của virus, đồng thời nước cuốn trôi chúng đi',
      'Vì xà phòng cung cấp thức ăn cho virus',
      'Vì virus rất sợ màu sắc của xà phòng'
    ],
    correctIndex: 1,
    explanation: 'Phân tử xà phòng có đuôi kỵ nước phá vỡ màng lipid của virus (như virus cúm, SARS-CoV-2), làm virus bất hoạt và bị rửa trôi.',
    difficulty: 'medium',
  },

  // --- CHỦ ĐỀ 3: NẤM ---
  {
    id: 16,
    topicId: 'fungi',
    question: 'Nấm là sinh vật dinh dưỡng theo hình thức nào?',
    options: [
      'Tự dưỡng quang hợp nhờ chất diệp lục',
      'Dị dưỡng (hấp thụ chất hữu cơ có sẵn)',
      'Hóa tự dưỡng',
      'Không cần hấp thu chất dinh dưỡng'
    ],
    correctIndex: 1,
    explanation: 'Tế bào nấm không có lục lạp nên không quang hợp được. Nấm sống dị dưỡng bằng cách hoại sinh (phân hủy xác sinh vật) hoặc ký sinh.',
    difficulty: 'easy',
  },
  {
    id: 17,
    topicId: 'fungi',
    question: 'Loại nấm đơn bào nào thường được dùng trong làm bánh mì và nấu rượu bia?',
    options: ['Nấm rơm', 'Nấm linh chi', 'Nấm men', 'Nấm mốc chân đen'],
    correctIndex: 2,
    explanation: 'Nấm men là sinh vật đơn bào, có khả năng lên men đường sinh ra khí CO2 (giúp nở bột bánh mì) và cồn ethanol.',
    difficulty: 'easy',
  },
  {
    id: 18,
    topicId: 'fungi',
    question: 'Bộ phận nào của nấm đảm (như cây nấm rơm) có nhiệm vụ sản sinh và phát tán bào tử?',
    options: ['Cuống nấm', 'Sợi nấm dưới đất', 'Phiến nấm (ở mặt dưới mũ nấm)', 'Bao gốc'],
    correctIndex: 2,
    explanation: 'Mặt dưới mũ nấm có các phiến nấm (lá tia) mang hàng triệu túi bào tử đảm bảo sinh sản duy trì nòi giống.',
    difficulty: 'medium',
  },
  {
    id: 19,
    topicId: 'fungi',
    question: 'Nhà khoa học Alexander Fleming đã tình cờ phát hiện ra thuốc kháng sinh Penicillin đầu tiên từ loại nấm nào?',
    options: ['Nấm men bánh mì', 'Nấm mốc xanh (Penicillium)', 'Nấm mộc nhĩ', 'Nấm hương'],
    correctIndex: 1,
    explanation: 'Nấm mốc xanh Penicillium tiết ra chất kháng sinh ức chế sự sinh trưởng của vi khuẩn, mở ra kỷ nguyên kháng sinh cứu sống hàng triệu sinh mạng.',
    difficulty: 'medium',
  },
  {
    id: 20,
    topicId: 'fungi',
    question: 'Khi phát hiện một cây nấm mọc hoang dại trong rừng có màu sắc rất sặc sỡ, có vòng cổ và bao gốc, em nên làm gì?',
    options: [
      'Hái về nấu canh ngay vì nấm rừng rất bổ',
      'Tuyệt đối không hái và không ăn vì có nguy cơ cao là nấm độc nguy hiểm chết người',
      'Nếm thử một miếng nhỏ xem có ngọt không',
      'Đem phơi khô để ngâm nước uống'
    ],
    correctIndex: 1,
    explanation: 'Nấm tán trắng và nấm độc đỏ thường có bao gốc và vòng cổ, chứa độc tố cực mạnh gây tổn thương gan thận dẫn đến tử vong. Tuyệt đối không hái ăn nấm hoang dại!',
    difficulty: 'easy',
  },
  {
    id: 21,
    topicId: 'fungi',
    question: 'Thành tế bào của nấm được cấu tạo chủ yếu từ chất gì?',
    options: ['Cellulose (như thực vật)', 'Chitin (kitin)', 'Peptidoglycan (như vi khuẩn)', 'Không có thành tế bào'],
    correctIndex: 1,
    explanation: 'Thành tế bào nấm cấu tạo từ Chitin, đây là chất cứng cũng tạo nên vỏ ngoài của tôm cua và côn trùng.',
    difficulty: 'hard',
  },
  {
    id: 22,
    topicId: 'fungi',
    question: 'Điều kiện môi trường nào thuận lợi nhất cho nấm mốc phát triển nhanh trên thực phẩm?',
    options: [
      'Nhiệt độ rất lạnh dưới 0°C và khô ráo',
      'Nhiệt độ ấm áp (25°C - 35°C) và độ ẩm cao',
      'Ánh nắng mặt trời gay gắt chiếu liên tục',
      'Môi trường chân không hoàn toàn'
    ],
    correctIndex: 1,
    explanation: 'Nấm mốc phát triển mạnh nhất trong điều kiện ấm áp và ẩm ướt (như khí hậu nhiệt đới ẩm gió mùa của Việt Nam).',
    difficulty: 'medium',
  },

  // --- CHỦ ĐỀ 4: ĐA DẠNG SINH HỌC ---
  {
    id: 23,
    topicId: 'biodiversity',
    question: 'Đa dạng sinh học bao gồm 3 cấp độ chính là:',
    options: [
      'Đa dạng cá thể, đa dạng kích thước và đa dạng màu sắc',
      'Đa dạng loài, đa dạng nguồn gen (di truyền) và đa dạng hệ sinh thái',
      'Đa dạng tuổi thọ, đa dạng thức ăn và đa dạng nơi ở',
      'Đa dạng lục địa, đa dạng đại dương và đa dạng bầu trời'
    ],
    correctIndex: 1,
    explanation: 'Đa dạng sinh học được đo lường qua 3 cấp độ: Đa dạng loài (số loài), Đa dạng gen (sự phong phú vật chất di truyền) và Đa dạng các hệ sinh thái.',
    difficulty: 'easy',
  },
  {
    id: 24,
    topicId: 'biodiversity',
    question: 'Theo hệ thống phân loại 5 giới của Whittaker, 5 giới sinh vật gồm có:',
    options: [
      'Khởi sinh, Nguyên sinh, Nấm, Thực vật, Động vật',
      'Vi khuẩn, Virus, Côn trùng, Chim, Thú',
      'Thực vật, Động vật, Con người, Đất, Nước',
      'Biển, Rừng ngập mặn, Đồng ruộng, Đồi núi, Đô thị'
    ],
    correctIndex: 0,
    explanation: '5 giới sinh vật gồm: Khởi sinh (Monera), Nguyên sinh (Protista), Nấm (Fungi), Thực vật (Plantae), Động vật (Animalia).',
    difficulty: 'medium',
  },
  {
    id: 25,
    topicId: 'biodiversity',
    question: 'Rừng ngập mặn đầm Đông Hồ ở thành phố Hà Tiên mang lại lợi ích sinh thái nào sau đây?',
    options: [
      'Làm ô nhiễm nguồn nước lợ',
      'Chắn gió bão, giữ đất chống xói lở và là bãi đẻ ươm giống cho tôm cua cá',
      'Phá hủy môi trường sống của các loài chim di cư',
      'Làm biến mất rạn san hô ngoài biển'
    ],
    correctIndex: 1,
    explanation: 'Rừng ngập mặn là bức tường xanh chắn sóng bảo vệ bờ biển Hà Tiên, đồng thời là vườn ươm tự nhiên nuôi dưỡng tôm cá con trước khi ra biển khơi.',
    difficulty: 'medium',
  },
  {
    id: 26,
    topicId: 'biodiversity',
    question: 'Loài linh trưởng quý hiếm có nguy cơ tuyệt chủng đang được bảo tồn tại các khối núi đá vôi ở Hà Tiên - Kiên Lương là:',
    options: ['Khỉ đột châu Phi', 'Voọc bạc Đông Dương (Voọc mông trắng)', 'Gấu Bắc cực', 'Hươu cao cổ'],
    correctIndex: 1,
    explanation: 'Voọc bạc Đông Dương (Trachypithecus germaini) là loài động vật quý hiếm trong Sách Đỏ, sinh sống tại các vách đá vôi Thạch Động - Bãi Ớt thuộc Kiên Giang.',
    difficulty: 'hard',
  },
  {
    id: 27,
    topicId: 'biodiversity',
    question: 'Nguyên nhân chủ yếu dẫn đến sự suy giảm nghiêm trọng đa dạng sinh học hiện nay là:',
    options: [
      'Các loài sinh vật tự nhiên sinh sản quá nhiều',
      'Hoạt động của con người: phá rừng, săn bắt bừa bãi, ô nhiễm môi trường và biến đổi khí hậu',
      'Mặt trời chiếu sáng quá mức',
      'Mưa nhiều vào mùa hạ'
    ],
    correctIndex: 1,
    explanation: 'Tác động tiêu cực của con người (chặt phá rừng ngập mặn, săn bắt động vật hoang dã, xả rác nhựa ra biển) là nguyên nhân hàng đầu làm suy giảm đa dạng sinh học.',
    difficulty: 'easy',
  },
  {
    id: 28,
    topicId: 'biodiversity',
    question: 'Học sinh lớp 6 trường TH&THCS Hà Tiên có thể làm gì để chung tay bảo vệ đa dạng sinh học biển quê hương?',
    options: [
      'Mua bán các chuỗi san hô và rùa biển nhồi bông làm đồ lưu niệm',
      'Tham gia chiến dịch làm sạch bãi biển Mũi Nai, không vứt rác nhựa và trồng cây xanh',
      'Đánh bắt cá con trong đầm Đông Hồ bằng lưới mắt nhỏ',
      'Chặt phá cây đước ven đường để làm củi'
    ],
    correctIndex: 1,
    explanation: 'Giữ cho bãi biển sạch không rác thải nhựa và trồng thêm cây xanh là hành động thiết thực, vừa sức của học sinh để bảo vệ môi trường sống sinh vật.',
    difficulty: 'easy',
  },

  // --- CÂU HỎI TỔNG HỢP VẬN DỤNG CAO ---
  {
    id: 29,
    topicId: 'all',
    question: 'Điểm GIỐNG NHAU cơ bản giữa tế bào thực vật và tế bào động vật là gì?',
    options: [
      'Đều có thành tế bào bằng cellulose',
      'Đều có màng sinh chất, chất tế bào và nhân tế bào chứa vật chất di truyền',
      'Đều có lục lạp để tự quang hợp',
      'Đều có hình hộp chữ nhật cố định'
    ],
    correctIndex: 1,
    explanation: 'Cả tế bào động vật và thực vật đều là tế bào nhân thực, có 3 thành phần chung cốt lõi: Màng sinh chất, Chất tế bào và Nhân.',
    difficulty: 'medium',
  },
  {
    id: 30,
    topicId: 'all',
    question: 'Vì sao trong tủ lạnh thức ăn để được lâu hơn mà ít bị nấm mốc và vi khuẩn làm thiu hỏng?',
    options: [
      'Vì nhiệt độ thấp trong tủ lạnh tiêu diệt vĩnh viễn 100% mọi vi sinh vật',
      'Vì nhiệt độ thấp ức chế sự sinh trưởng và trao đổi chất của vi khuẩn và nấm mốc',
      'Vì trong tủ lạnh có chứa khí diệt khuẩn đặc biệt',
      'Vì thức ăn trong tủ lạnh bị biến đổi thành chất khác'
    ],
    correctIndex: 1,
    explanation: 'Nhiệt độ thấp (4°C) làm chậm lại phản ứng trao đổi chất và phân chia của vi sinh vật, chứ không tiêu diệt hoàn toàn vi sinh vật.',
    difficulty: 'medium',
  }
];
