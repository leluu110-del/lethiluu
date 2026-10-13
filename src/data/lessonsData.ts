import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'cell_organism',
    title: 'Cơ Thể Sinh Vật & Tế Bào',
    subtitle: 'Đơn vị cơ bản cấu tạo nên mọi sự sống',
    badge: 'Chủ đề 7 - KHTN 6',
    grade: 'Lớp 6',
    duration: '45 phút',
    color: 'emerald',
    iconName: 'Microscope',
    overview: 'Mọi sinh vật xung quanh chúng ta từ cây cỏ, con cá đến con người đều được cấu tạo từ các viên gạch siêu nhỏ gọi là tế bào. Tế bào thực hiện mọi hoạt động sống như trao đổi chất, lớn lên và sinh sản.',
    localConnection: 'Quan sát các loại thực vật quen thuộc quanh trường TH&THCS Hà Tiên như lá cây hoa phượng, vảy hành tím trong căn bếp gia đình hay cây đước ở đầm Đông Hồ.',
    summaryTakeaway: [
      'Tế bào là đơn vị cấu trúc và chức năng nhỏ nhất của mọi sinh vật sống.',
      'Tế bào thực vật có thêm Thành tế bào (cellulose) và Lục lạp (chứa chất diệp lục để quang hợp).',
      'Sinh vật đơn bào gồm 1 tế bào duy nhất (trùng roi, vi khuẩn); sinh vật đa bào gồm hàng triệu tế bào liên kết.',
      'Trật tự tổ chức cơ thể đa bào: Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.'
    ],
    sections: [
      {
        id: 'cell_structure',
        title: '1. Cấu tạo của một tế bào tiêu biểu',
        content: `Dù có hình dạng khác nhau, phần lớn các tế bào đều gồm 3 thành phần chính:
• **Màng sinh chất (Màng tế bào):** Lớp màng mỏng bao bọc bên ngoài, kiểm soát các chất ra vào tế bào.
• **Chất tế bào (Tế bào chất):** Vùng dịch lỏng chứa các bào quan, nơi diễn ra hầu hết các hoạt động trao đổi chất.
• **Nhân tế bào (hoặc Vùng nhân):** Trung tâm chỉ huy, chứa vật chất di truyền DNA điều khiển mọi hoạt động sống của tế bào.

*Điểm đặc biệt ở tế bào thực vật:*
Có thêm **Thành tế bào** cứng chắc giúp cây đứng vững và **Lục lạp** màu xanh giúp cây hấp thụ ánh sáng mặt trời để tạo ra chất dinh dưỡng qua quang hợp.`,
        keyPoints: [
          '3 thành phần chính: Màng sinh chất, Chất tế bào, Nhân tế bào.',
          'Thực vật có thêm Thành tế bào và Lục lạp.',
          'Động vật không có thành tế bào và không có lục lạp.'
        ],
        illustrationSvgType: 'plant_cell',
        didYouKnow: 'Cơ thể một học sinh lớp 6 có khoảng 30.000 đến 37.000 tỷ tế bào đang hoạt động cùng nhau!',
        interactiveChallenge: {
          question: 'Bộ phận nào của tế bào thực vật giúp cây có màu xanh và thực hiện quang hợp?',
          options: ['Màng sinh chất', 'Nhân tế bào', 'Lục lạp', 'Không bào'],
          correctIndex: 2,
          explanation: 'Chính xác! Lục lạp chứa chất diệp lục giúp hấp thụ ánh sáng mặt trời để tổng hợp chất hữu cơ.'
        }
      },
      {
        id: 'unicellular_multicellular',
        title: '2. Sinh vật đơn bào và Sinh vật đa bào',
        content: `Dựa vào số lượng tế bào cấu tạo nên cơ thể, các nhà khoa học chia sinh vật làm 2 nhóm lớn:
1. **Sinh vật đơn bào:** Cơ thể chỉ cấu tạo từ một tế bào duy nhất nhưng vẫn tự thực hiện trọn vẹn các chức năng sống (ăn uống, hô hấp, vận động, sinh sản). Ví dụ: Trùng roi xanh, Trùng biến hình, Nấm men nở, Vi khuẩn E. coli.
2. **Sinh vật đa bào:** Cơ thể gồm nhiều tế bào phối hợp nhịp nhàng, các tế bào phân hóa thực hiện chức năng chuyên biệt. Ví dụ: Cây phượng vĩ, con cá bống sao ở Hà Tiên, chim bồ câu, con người.`,
        keyPoints: [
          'Đơn bào: 1 tế bào duy nhất (Trùng roi, nấm men, vi khuẩn).',
          'Đa bào: Nhiều tế bào chuyên hóa liên kết thành cơ thể hoàn chỉnh.'
        ],
        illustrationSvgType: 'animal_cell',
        didYouKnow: 'Trùng roi xanh có điểm mắt màu đỏ cảm nhận ánh sáng và roi bơi giúp nó di chuyển về phía có ánh sáng để quang hợp!',
        interactiveChallenge: {
          question: 'Sinh vật nào dưới đây là sinh vật đơn bào?',
          options: ['Cây bàng', 'Con cá rô phi', 'Trùng roi xanh', 'Con chuồn chuồn'],
          correctIndex: 2,
          explanation: 'Chính xác! Trùng roi xanh là sinh vật đơn bào có kích thước hiển vi.'
        }
      },
      {
        id: 'organization_levels',
        title: '3. Các cấp độ tổ chức của cơ thể đa bào',
        content: `Ở sinh vật đa bào, sự tổ chức diễn ra theo một trật tự vô cùng ngăn nắp và tinh vi từ thấp đến cao:
1. **Tế bào:** Đơn vị cơ bản (tế bào cơ, tế bào thần kinh, tế bào biểu bì).
2. **Mô:** Tập hợp các tế bào cùng loại có hình dạng và chức năng tương tự nhau (Mô cơ, Mô biểu bì, Mô dẫn ở thực vật).
3. **Cơ quan:** Nhiều mô kết hợp tạo thành (Dạ dày, Tim, Phổi ở người; Lá, Rễ, Thân ở thực vật).
4. **Hệ cơ quan:** Nhiều cơ quan phối hợp thực hiện chức năng lớn (Hệ tiêu hóa, Hệ tuần hoàn, Hệ hô hấp).
5. **Cơ thể:** Tập hợp toàn bộ các hệ cơ quan tạo nên sinh vật hoàn chỉnh.`,
        keyPoints: [
          'Trật tự: Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.',
          'Lá cây là một cơ quan của thực vật, gồm mô biểu bì, mô giậu, mô xốp và gân lá.'
        ],
        interactiveChallenge: {
          question: 'Theo thứ tự từ nhỏ đến lớn, cấp độ tổ chức nào đứng ngay sau Mô?',
          options: ['Tế bào', 'Cơ quan', 'Hệ cơ quan', 'Cơ thể'],
          correctIndex: 1,
          explanation: 'Đúng rồi! Các mô tập hợp lại sẽ tạo thành Cơ quan (ví dụ dạ dày, tim, lá cây).'
        }
      }
    ]
  },
  {
    id: 'virus',
    title: 'Virus - Kẻ Xâm Nhập Vô Hình',
    subtitle: 'Cấu tạo, cơ chế nhân lên và cách phòng chống',
    badge: 'Chủ đề 8 - KHTN 6',
    grade: 'Lớp 6',
    duration: '40 phút',
    color: 'rose',
    iconName: 'ShieldAlert',
    overview: 'Virus là dạng sống vô cùng đặc biệt. Chúng nhỏ hơn vi khuẩn hàng chục đến hàng trăm lần và chưa có cấu tạo tế bào. Virus không thể tự sinh sản ngoài môi trường mà bắt buộc phải chui vào tế bào vật chủ.',
    localConnection: 'Tại vùng duyên hải biên giới Hà Tiên, việc tiêm chủng phòng bệnh mùa mưa bão (cúm mùa, sốt xuất huyết) bảo vệ sức khỏe cho bà con và học sinh.',
    summaryTakeaway: [
      'Virus chưa có cấu tạo tế bào, kích thước siêu hiển vi (nanomet).',
      'Cấu tạo đơn giản gồm: Lõi acid nucleic (DNA hoặc RNA) + Vỏ protein (capsid).',
      'Sống ký sinh nội bào bắt buộc; chu trình nhân lên làm tổn thương hoặc phá hủy tế bào chủ.',
      'Thuốc kháng sinh chỉ diệt được vi khuẩn, KHÔNG có tác dụng diệt virus. Phòng ngừa bằng Vaccine và giữ vệ sinh cá nhân.'
    ],
    sections: [
      {
        id: 'virus_characteristics',
        title: '1. Virus là gì? Cấu tạo của Virus',
        content: `Các nhà khoa học phát hiện virus có những đặc điểm độc nhất vô nhị:
• **Chưa có cấu tạo tế bào:** Virus không có màng sinh chất, không có chất tế bào hay bào quan như ti thể.
• **Kích thước siêu nhỏ:** Đo bằng nanomet (nm), khoảng 20 - 300 nm, mắt thường và kính hiển vi quang học thông thường không thể nhìn thấy mà phải dùng kính hiển vi điện tử.
• **Cấu tạo vỏ & lõi:**
  1. *Vỏ protein (Capsid):* Bao bọc bên ngoài bảo vệ vật chất di truyền. Một số có thêm lớp vỏ ngoài lipit có gai nhọn (như virus cúm, virus Corona).
  2. *Lõi acid nucleic:* Chứa phân tử DNA hoặc RNA mang thông tin di truyền của virus.
• **Hình thái phong phú:** Dạng hình que (virus khảm thuốc lá), dạng hình khối (Adenovirus), dạng hỗn hợp có đầu và đuôi (thực khuẩn thể Phage).`,
        keyPoints: [
          'Chưa có cấu tạo tế bào.',
          'Gồm 2 thành phần chính: Lõi di truyền (DNA/RNA) + Vỏ protein.',
          'Hình dạng: hình que, hình khối, hỗn hợp.'
        ],
        illustrationSvgType: 'virus_structure',
        didYouKnow: 'Nếu đặt 100.000 con virus xếp nối đuôi nhau, chiều dài của chúng mới chỉ bằng một sợi tóc của em!',
        interactiveChallenge: {
          question: 'Hai thành phần cơ bản nhất luôn có ở mọi loại virus là gì?',
          options: [
            'Màng sinh chất và chất tế bào',
            'Lõi acid nucleic và vỏ protein',
            'Nhân tế bào và lục lạp',
            'Thành cellulose và không bào'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Mọi virus đều cấu tạo từ lõi acid nucleic (DNA/RNA) và lớp vỏ bọc bằng protein.'
        }
      },
      {
        id: 'virus_replication',
        title: '2. Chu trình nhân lên và gây bệnh của Virus',
        content: `Virus không thể tự phân chia ngoài môi trường tự nhiên. Khi ở ngoài cơ thể sinh vật, chúng như những hạt tinh thể vô tri. Nhưng khi gặp vật chủ thích hợp:
1. **Hấp phụ:** Gai glycoprotein của virus gắn khớp vào thụ thể trên màng tế bào chủ.
2. **Xâm nhập:** Virus bơm lõi acid nucleic vào bên trong tế bào chủ.
3. **Sinh tổng hợp:** Lõi của virus cướp quyền điều khiển, bắt tế bào chủ lấy nguyên liệu của chính nó để sao chép hàng ngàn lõi và vỏ virus mới.
4. **Lắp ráp:** Lõi và vỏ mới gắn kết lại thành các hạt virus hoàn chỉnh.
5. **Giải phóng:** Hàng ngàn virus con phá vỡ màng tế bào chủ chui ra ngoài, làm tế bào chủ bị tiêu diệt, sau đó tiếp tục xâm nhập các tế bào lân cận!`,
        keyPoints: [
          '5 giai đoạn: Hấp phụ → Xâm nhập → Sinh tổng hợp → Lắp ráp → Giải phóng.',
          'Tế bào chủ bị phá hủy khi virus thoát ra ngoài.',
          'Sống ký sinh nội bào bắt buộc.'
        ],
        interactiveChallenge: {
          question: 'Vì sao virus được gọi là sinh vật ký sinh nội bào bắt buộc?',
          options: [
            'Vì chúng thích ăn thức ăn trong dạ dày vật chủ',
            'Vì chúng chỉ nhân lên và hoạt động sống được khi ở bên trong tế bào chủ',
            'Vì chúng bơi rất nhanh trong máu',
            'Vì chúng tự quang hợp được trong bóng tối'
          ],
          correctIndex: 1,
          explanation: 'Đúng! Ngoài tế bào chủ, virus không tự trao đổi chất hay sinh sản được nên bắt buộc phải ký sinh bên trong tế bào.'
        }
      },
      {
        id: 'prevention_antibiotics',
        title: '3. Phòng chống bệnh do Virus - Hiểu đúng về Kháng sinh',
        content: `Một sai lầm rất phổ biến là tự ý mua thuốc kháng sinh khi bị cảm cúm hoặc sốt do virus:
• **Kháng sinh (Antibiotics):** Chỉ tấn công thành tế bào và quá trình trao đổi chất của VI KHUẨN. Do virus không có thành tế bào và không có trao đổi chất độc lập, kháng sinh hoàn toàn KHÔNG CÓ TÁC DỤNG với virus! Uống kháng sinh bừa bãi còn gây hại cho gan, thận và làm nhờn thuốc.
• **Cách phòng ngừa virus hiệu quả:**
  - *Tiêm vắc-xin (Vaccine):* Giúp hệ miễn dịch của cơ thể tập dượt tạo kháng thể trước.
  - *Rửa tay thường xuyên bằng xà phòng:* Phá vỡ lớp vỏ lipit ngoài của virus.
  - *Ăn uống đủ chất, rèn luyện thể thao:* Nâng cao sức đề kháng cơ thể.
  - *Đeo khẩu trang nơi đông người, giữ khoảng cách khi có dịch.*`,
        keyPoints: [
          'Thuốc kháng sinh KHÔNG tiêu diệt được virus.',
          'Vắc-xin (Vaccine) là biện pháp phòng bệnh virus chủ động và hiệu quả nhất.',
          'Rửa tay xà phòng ít nhất 30 giây giúp rửa trôi và phá hủy vỏ nhiều loại virus.'
        ],
        didYouKnow: 'Vắc-xin đầu tiên trên thế giới được bác sĩ Edward Jenner tìm ra vào năm 1796 từ virus đậu bò để cứu sống hàng triệu người khỏi bệnh đậu mùa!',
        interactiveChallenge: {
          question: 'Khi bị sốt do virus cúm mùa gây ra, em có nên tự ý uống thuốc kháng sinh không?',
          options: [
            'Nên, vì kháng sinh diệt sạch mọi loại mầm bệnh',
            'Không nên, vì thuốc kháng sinh không có tác dụng tiêu diệt virus',
            'Càng uống nhiều kháng sinh càng nhanh khỏi cúm',
            'Uống thuốc kháng sinh thay cho việc uống nước'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Kháng sinh chỉ diệt vi khuẩn. Khi nhiễm virus, cần nghỉ ngơi, uống đủ nước, hạ sốt theo chỉ dẫn bác sĩ và tiêm vắc-xin phòng ngừa.'
        }
      }
    ]
  },
  {
    id: 'fungi',
    title: 'Thế Giới Loài Nấm',
    subtitle: 'Nấm men, nấm mốc, nấm đảm và vai trò trong đời sống',
    badge: 'Chủ đề 8 - KHTN 6',
    grade: 'Lớp 6',
    duration: '40 phút',
    color: 'amber',
    iconName: 'Sparkles',
    overview: 'Nấm không phải là thực vật, cũng không phải động vật. Chúng tạo thành một giới riêng biệt: Giới Nấm. Nấm có mặt ở khắp mọi nơi, từ ổ bánh mì nở thơm phức đến cây nấm rơm trong bữa cơm gia đình.',
    localConnection: 'Món bánh bò thốt nốt, bánh bao làm từ nấm men nở hay nghề trồng nấm rơm tận dụng rơm rạ sau mùa gặt lúa tại Kiên Giang.',
    summaryTakeaway: [
      'Nấm là sinh vật nhân thực, dị dưỡng (không có lục lạp, không tự quang hợp).',
      'Đại diện: Nấm đơn bào (nấm men), Nấm đa bào dạng sợi (nấm mốc), Nấm đa bào lớn (nấm đảm, nấm túi).',
      'Vai trò: Phân hủy xác sinh vật làm màu mỡ đất, chế biến thực phẩm (bánh mì, bia rượu, làm tương), dược liệu & kháng sinh (Penicillin).',
      'Tác hại: Gây hỏng mốc đồ ăn, nấm gây bệnh da liễu, nấm độc có thể gây tử vong.'
    ],
    sections: [
      {
        id: 'fungi_characteristics',
        title: '1. Đặc điểm cấu tạo của Nấm',
        content: `Nhiều bạn nghĩ nấm mọc dưới đất nên là thực vật, nhưng điều đó KHÔNG ĐÚNG:
• **Nấm không có lục lạp:** Nấm không có màu xanh diệp lục, không quang hợp được mà sống **dị dưỡng** (hấp thu chất dinh dưỡng từ môi trường xung quanh hoặc xác sinh vật khác).
• **Thành tế bào chứa Chitin:** Khác với thực vật có thành cellulose, thành tế bào của nấm được cấu tạo từ chất kitin (chitin) giống như vỏ ngoài của tôm cua!
• **Cấu tạo nấm lớn (Nấm đảm như nấm rơm, nấm hương):**
  - *Mũ nấm:* Phần xòe rộng bên trên.
  - *Phiến nấm (lá tia):* Mặt dưới mũ nấm chứa hàng triệu bào tử để sinh sản.
  - *Cuống nấm (thân nấm):* Nâng đỡ mũ nấm.
  - *Sợi nấm (khuẩn ty):* Mạng lưới sợi nấm đâm sâu vào giá thể (rơm rạ, đất mùn, thân gỗ mục) để hút chất dinh dưỡng.`,
        keyPoints: [
          'Nấm là sinh vật dị dưỡng, không tự quang hợp.',
          'Thành tế bào cấu tạo từ Chitin.',
          'Cấu tạo nấm đảm: Mũ nấm, Phiến nấm chứa bào tử, Cuống nấm, Sợi nấm ngầm.'
        ],
        illustrationSvgType: 'fungi_types',
        didYouKnow: 'Hệ sợi nấm dưới lòng đất có thể dài hàng kilomet, liên kết các rễ cây trong rừng với nhau như một mạng Internet tự nhiên (gọi là mạng nấm Mycorrhiza)!',
        interactiveChallenge: {
          question: 'Vì sao nấm KHÔNG được xếp vào giới Thực vật?',
          options: [
            'Vì nấm sống trên cạn',
            'Vì nấm không có lục lạp và không tự quang hợp được',
            'Vì nấm sinh sản bằng bào tử',
            'Vì nấm có kích thước quá nhỏ'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Nấm không chứa chất diệp lục nên phải sống dị dưỡng, phân hủy chất hữu cơ có sẵn.'
        }
      },
      {
        id: 'fungi_groups',
        title: '2. Các nhóm Nấm quen thuộc',
        content: `Khoa học phân loại nấm thành nhiều nhóm, trong đó lớp 6 học 3 nhóm tiêu biểu:
1. **Nấm men (Nấm đơn bào):**
   - Kích thước hiển vi, hình bầu dục hoặc tròn.
   - Sinh sản chủ yếu bằng cách mọc chồi (nảy chồi).
   - Ứng dụng: Lên men đường tạo khí CO2 giúp bột bánh mì nở phồng xốp; sản xuất rượu vang, bia, cồn sinh học.
2. **Nấm mốc (Nấm đa bào dạng sợi):**
   - Gồm những sợi nấm phân nhánh chằng chịt, sinh sản bằng bào tử phát tán trong không khí.
   - Thường mọc trên cơm nguội, bánh mì thiu, quả cam dập khi ở nơi ẩm ướt.
   - Một số loài có ích như nấm mốc xanh *Penicillium chrysogenum* sản xuất ra thuốc kháng sinh Penicillin cứu sống hàng triệu người.
3. **Nấm đảm & Nấm túi (Nấm ăn & Nấm dược liệu):**
   - Cơ thể lớn nhìn rõ bằng mắt thường: Nấm rơm, Nấm đùi gà, Nấm mộc nhĩ (nấm mèo), Nấm linh chi.`,
        keyPoints: [
          'Nấm men: Đơn bào, nảy chồi, làm bánh mì nở xốp.',
          'Nấm mốc: Sợi mốc, mọc nơi ẩm ấm, sinh bào tử.',
          'Nấm ăn: Cung cấp đạm thực vật thơm ngon và dinh dưỡng cao.'
        ],
        interactiveChallenge: {
          question: 'Trong làm bánh mì, người ta dùng loại nấm nào để bột bánh nở xốp?',
          options: ['Nấm mốc xanh', 'Nấm rơm', 'Nấm men', 'Nấm linh chi'],
          correctIndex: 2,
          explanation: 'Đúng rồi! Nấm men phân giải đường sinh ra khí CO2, các bọt khí này làm bánh mì nở phồng xốp thơm ngon.'
        }
      },
      {
        id: 'fungi_safety',
        title: '3. Nhận biết Nấm độc & An toàn thực phẩm',
        content: `Bên cạnh các loại nấm ăn bổ dưỡng, trong tự nhiên có những loài nấm cực độc:
• **Đặc điểm nấm độc thường gặp:** Mũ nấm sặc sỡ hoặc có đốm vảy trắng nổi, có vòng cuống nấm và bao gốc nấm (như Nấm tán trắng *Amanita verna*, Nấm độc đỏ *Amanita muscaria*).
• **Nguyên tắc vàng:** Tuyệt đối KHÔNG hái và ăn nấm mọc hoang trong rừng, trên bãi cỏ nếu không biết chắc 100%. Không ăn nấm đã bị thiu mốc.
• **Phòng tránh ngộ độc mốc:** Bảo quản thức ăn nơi khô ráo, thoáng mát hoặc trong tủ lạnh. Thực phẩm bị nấm mốc phải bỏ ngay, không nên gọt bỏ phần mốc rồi ăn phần còn lại vì độc tố nấm đã ngấm sâu vào bên trong!`,
        keyPoints: [
          'Không hái và ăn nấm mọc dại không rõ nguồn gốc.',
          'Nấm mốc tiết ra độc tố (như Aflatoxin gây ung thư gan).',
          'Bảo quản thực phẩm nơi khô ráo hoặc ngăn lạnh tủ lạnh.'
        ],
        interactiveChallenge: {
          question: 'Khi thấy bánh mì hoặc cơm nguội bị mọc mốc xanh đen, em nên làm gì?',
          options: [
            'Gọt bỏ chỗ mốc và ăn phần còn lại',
            'Bỏ toàn bộ phần thức ăn bị mốc vì độc tố đã ngấm sâu',
            'Đem phơi nắng rồi ăn tiếp',
            'Rửa nước cho sạch mốc rồi chiên lại'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Sợi nấm mốc ăn sâu vào trong và tiết ra độc tố vi nấm độc hại, không thể loại bỏ bằng việc rửa hay gọt bề mặt.'
        }
      }
    ]
  },
  {
    id: 'biodiversity',
    title: 'Đa Dạng Sinh Học',
    subtitle: 'Kho báu thiên nhiên và sự cân bằng sự sống',
    badge: 'Chủ đề 8 - KHTN 6',
    grade: 'Lớp 6',
    duration: '45 phút',
    color: 'cyan',
    iconName: 'Globe',
    overview: 'Đa dạng sinh học là sự phong phú về các dạng sống trên Trái Đất. Từ những chú chim chao lượn trên núi Đá Dựng, đàn cá bơi lội ở biển Mũi Nai Hà Tiên đến thảm thực vật rừng ngập mặn đầm Đông Hồ, tất cả tạo nên bức tranh thiên nhiên tuyệt mỹ.',
    localConnection: 'Thành phố Hà Tiên nổi tiếng với hệ sinh thái ngập mặn đầm Đông Hồ, rừng núi đá vôi Thạch Động - Đá Dựng và biển đảo Kiên Lương - Phú Quốc giàu tài nguyên sinh học quý giá.',
    summaryTakeaway: [
      'Đa dạng sinh học gồm 3 cấp độ: Đa dạng loài, Đa dạng di truyền (nguồn gen) và Đa dạng hệ sinh thái.',
      'Hệ thống 5 giới sinh vật: Khởi sinh, Nguyên sinh, Nấm, Thực vật, Động vật.',
      'Vai trò: Cung cấp lương thực, thuốc men, bảo vệ đất nước, điều hòa khí hậu.',
      'Bảo vệ đa dạng sinh học là trách nhiệm của mỗi học sinh: không xả rác bừa bãi, trồng cây xanh, không mua bán động vật hoang dã.'
    ],
    sections: [
      {
        id: 'biodiversity_levels',
        title: '1. Đa dạng sinh học là gì? 5 Giới Sinh Vật',
        content: `Đa dạng sinh học phản ánh sự phong phú của thế giới sống qua 3 cấp độ:
• **Đa dạng loài:** Số lượng các loài sinh vật khác nhau cùng sinh sống trong một khu vực.
• **Đa dạng nguồn gen:** Sự khác biệt về gen di truyền giữa các cá thể trong cùng một loài (ví dụ các giống lúa gạo khác nhau).
• **Đa dạng hệ sinh thái:** Các môi trường sống khác nhau như rừng nhiệt đới, sa mạc, rạn san hô, đầm nước lợ...

*Hệ thống phân loại 5 giới của Whittaker:*
1. **Giới Khởi sinh (Monera):** Vi khuẩn, sinh vật nhân sơ đơn bào.
2. **Giới Nguyên sinh (Protista):** Trùng roi, trùng giày, tảo lục (nhân thực, đơn bào hoặc đa bào đơn giản).
3. **Giới Nấm (Fungi):** Nấm men, nấm mốc, nấm đảm (nhân thực, dị dưỡng, thành chitin).
4. **Giới Thực vật (Plantae):** Rêu, dương xỉ, hạt trần, hạt kín (nhân thực, tự dưỡng quang hợp, thành cellulose).
5. **Giới Động vật (Animalia):** Động vật không xương sống và có xương sống (nhân thực, đa bào, dị dưỡng, có khả năng di chuyển).`,
        keyPoints: [
          '3 cấp độ: Loài, Nguồn gen, Hệ sinh thái.',
          '5 giới: Khởi sinh → Nguyên sinh → Nấm → Thực vật → Động vật.'
        ],
        illustrationSvgType: 'food_web',
        didYouKnow: 'Trái Đất hiện có khoảng 8,7 triệu loài sinh vật, nhưng các nhà khoa học mới chỉ đặt tên và nghiên cứu được khoảng 1,5 triệu loài!',
        interactiveChallenge: {
          question: 'Giới nào dưới đây gồm các sinh vật tự dưỡng có khả năng quang hợp nhờ chất diệp lục?',
          options: ['Giới Nấm', 'Giới Động vật', 'Giới Thực vật', 'Giới Khởi sinh'],
          correctIndex: 2,
          explanation: 'Chính xác! Giới Thực vật gồm các sinh vật đa bào nhân thực có lục lạp quang hợp tự tạo chất dinh dưỡng.'
        }
      },
      {
        id: 'local_ecosystems',
        title: '2. Đa dạng sinh học tại Hà Tiên & Kiên Giang',
        content: `Quê hương Hà Tiên là một trong những vùng đất có đa dạng sinh học vô cùng phong phú và độc đáo:
• **Đầm Đông Hồ:** Hệ sinh thái nước lợ nổi tiếng với những cánh rừng dừa nước, cây đước, vẹt, mắm. Đây là nơi đẻ trứng và nuôi dưỡng tôm, cua, cá bống, sò huyết trước khi chúng bơi ra biển lớn.
• **Núi đá vôi Thạch Động - Đá Dựng:** Nơi sinh sống của loài Voọc bạc Đông Dương (voọc mông trắng) quý hiếm có nguy cơ tuyệt chủng, các loài dơi ăn muỗi và thảm thực vật đá vôi chịu hạn.
• **Vùng biển Mũi Nai - Quần đảo Hải Tặc:** Những rạn san hô rực rỡ, cỏ biển - nơi trú ngụ của cá ngựa, rùa biển và hàng trăm loài hải sản có giá trị kinh tế cao.`,
        keyPoints: [
          'Rừng ngập mặn đầm Đông Hồ: Lá phổi xanh chắn sóng gió, bảo vệ đê biển.',
          'Núi đá vôi Hà Tiên: Môi trường sống đặc thù của loài Voọc bạc và dơi quý.',
          'Rạn san hô biển đảo Kiên Giang: Cái nôi nuôi dưỡng nguồn lợi thủy sản.'
        ],
        interactiveChallenge: {
          question: 'Hệ sinh thái rừng ngập mặn đầm Đông Hồ ở Hà Tiên có vai trò quan trọng nào?',
          options: [
            'Làm cạn kiệt nguồn nước ngọt',
            'Chắn gió bão, chống xói lở bờ biển và là nơi sinh sản của nhiều loài thủy hải sản',
            'Gây ô nhiễm môi trường biển',
            'Làm giảm số lượng chim nước'
          ],
          correctIndex: 1,
          explanation: 'Đúng rồi! Rừng ngập mặn vừa chắn sóng giữ đất, vừa là ngôi nhà bình yên cho các loài tôm, cua, cá con phát triển.'
        }
      },
      {
        id: 'protection_action',
        title: '3. Bảo vệ Đa dạng sinh học - Hành động của Học sinh',
        content: `Đa dạng sinh học đang bị suy giảm do cháy rừng, săn bắt bừa bãi, biến đổi khí hậu và rác thải nhựa đại dương. Học sinh TH&THCS Hà Tiên chúng ta có thể làm gì?
1. **Không xả rác bừa bãi ra biển, sông hồ:** Rác thải nhựa khiến rùa biển và cá bị mắc kẹt hoặc nuốt phải.
2. **Tích cực trồng và chăm sóc cây xanh:** Trồng cây ở trường học, gia đình tạo bóng mát và nơi ở cho chim muông.
3. **Nói KHÔNG với động vật hoang dã:** Không tiêu thụ, nuôi nhốt chim cảnh, rùa hay mua các sản phẩm từ thú rừng.
4. **Tuyên truyền cùng người thân:** Nhắc nhở mọi người phân loại rác, sử dụng túi vải thân thiện môi trường thay túi ni-lông.`,
        keyPoints: [
          'Bảo vệ môi trường biển Hà Tiên sạch đẹp, không rác nhựa.',
          'Tham gia Tết trồng cây và bảo vệ cây xanh trường lớp.',
          'Lan tỏa thông điệp yêu thiên nhiên đến bạn bè và gia đình.'
        ],
        interactiveChallenge: {
          question: 'Hành động nào dưới đây của học sinh góp phần bảo vệ đa dạng sinh học?',
          options: [
            'Bắn chim và bắt rùa biển làm thú nuôi',
            'Vứt túi ni-lông xuống bãi biển Mũi Nai',
            'Tham gia dọn sạch bãi biển và trồng cây xanh quanh trường',
            'Bẻ cành cây khi đi tham quan Thạch Động'
          ],
          correctIndex: 2,
          explanation: 'Rất tuyệt vời! Giữ gìn bãi biển sạch đẹp và trồng cây xanh là hành động thiết thực bảo vệ sự sống quanh ta.'
        }
      }
    ]
  }
];
