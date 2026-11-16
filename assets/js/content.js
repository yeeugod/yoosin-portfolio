/* Site content in Korean and English. Project names, brand names and work titles stay as written.
   Facts follow the resume (Jan 2026) and the owner's own account; no years are given where they were not confirmed. */
(function () {
  "use strict";
  const C = {};

  C.cards = [
    { k: "about", color: "#E3DDEE", ink: "#1C1A18",
      title: ["About Me"], ko: "",
      desc: { ko: "SK 아이젠 1기 지원 포트폴리오 · 이유신", en: "Portfolio for SK AIGEN Cohort 1 · Yoosin Lee" } },
    /* V5 reading order after the intro: Make It! → Like this → GROWN → Manual for Manuals → ART & DESIGN.
       title / tall may differ by language ({ ko, en }); sub is the small line above the description
       (Korean mode: a Korean title in bold with the English project name as its sub; English mode keeps the English name first). */
    { k: "makeit", color: "#BFE4D2", ink: "#1C1A18",
      title: { ko: ["메이킷"], en: ["Make It!"] }, sub: null,
      ev: { ko: "시제품 · 직접 해 보고 확인한 한계", en: "Prototype · limits I found by trying it" },
      sum: { ko: "개인 창작자의 제작 질문을 제조업체와 공유할 사양으로 바꾸다", en: "Turning a solo creator's production questions into specs a maker can work from" },
      desc: { ko: "원화를 제품으로, 제작 조건 정리부터 업체 문의·사양 수정까지", en: "A drawing into a product: specs, a maker enquiry and the revision" } },
    { k: "likethis", color: "#F1C6D6", ink: "#1C1A18",
      title: { ko: ["이런 느낌"], en: ["Like this"] }, sub: null,
      ev: { ko: "시제품 · 직접 해 보고 확인한 한계", en: "Prototype · limits I found by trying it" },
      sum: { ko: "문화적 맥락을 알아보고 상대의 경험을 묻는 대화로 이어가다", en: "Recognising cultural context, and carrying the talk on by asking about their experience" },
      desc: { ko: "기본 번역 옆에 문화적 맥락과 이어서 할 말", en: "Cultural context and what to say next, beside the plain translation" } },
    { k: "grown", color: "#F4AE97", ink: "#1C1A18",
      title: { ko: ["공실 상가", "진단 시스템"], en: ["Retail Vacancy", "Diagnosis System"] },
      tall: { ko: ["공실 상가", "진단", "시스템"], en: ["Retail", "Vacancy", "Diagnosis", "System"] },
      sub: { ko: "GROWN RECOVERY SCAN", en: "GROWN RECOVERY SCAN" }, subEn: true,
      ev: { ko: "내부 업무 사용 · 전문가 피드백 · 2026-10", en: "Used for internal work · expert feedback · 2026-10" },
      sum: { ko: "반복 대조를 줄이고 전문가가 확인할 기준을 함께 정하다", en: "Cutting repeated cross-checks, and setting with the expert what a person must still check" },
      desc: { ko: "가상 호실을 골라 예비 판정 예시 보기", en: "Pick a fictional unit and see its preliminary verdict" } },
    { k: "montauk", color: "#A7B6EC", ink: "#1C1A18",
      title: { ko: ["매뉴얼을 위한", "매뉴얼"], en: ["Manual for", "Manuals"] },
      sub: { ko: "MANUAL FOR MANUALS", en: "" }, subEn: true,
      ev: { ko: "시연 단계 · 시카고점 직원 시범 사용 피드백 · 2026-02", en: "Demo stage · trial-use feedback from Chicago store staff · 2026-02" },
      sum: { ko: "직원의 구두 안내 방식을 바탕으로 가이드 제작 절차를 다시 설계하다", en: "Redesigning how guides are made around the way staff explain things out loud" },
      desc: { ko: "직접 만든 조립 가이드에서 사내 가이드 제작 앱까지", en: "From a hand-made assembly guide to an in-house guide-making app" } },
    { k: "art", color: "#ECEDAA", ink: "#1C1A18",
      title: ["ART&", "DESIGN:)"], sub: null,
      desc: { ko: "미술학도의 이런저런 작업물들", en: "Odds and ends from an art student" } }
  ];

  // the line under the name on the opening screen
  C.role = { ko: "산업디자인 전공 · 현장 업무를 직접 관찰하고, AI로 도구를 만들어 써 보고 고칩니다", en: "Industrial design major · I watch work on the floor first-hand, build tools with AI, try them and fix them" };

  C.ui = {
    open: { ko: "열기", en: "Open" },
    close: { ko: "닫기", en: "Close" },
    scroll: { ko: "SCROLL", en: "SCROLL" },
    backToProject: { ko: "프로젝트로 돌아가기", en: "Back to project" },
    home: { ko: "처음으로", en: "Home" },
    prev: { ko: "이전", en: "Previous" },
    next: { ko: "다음", en: "Next" },
    play: { ko: "재생", en: "Play" },
    pause: { ko: "일시정지", en: "Pause" },
    viewLarge: { ko: "크게 보기", en: "View larger" },
    skip: { ko: "본문으로 건너뛰기", en: "Skip to content" }
  };

  /* ───────────── About ───────────── */
  C.about = {
    sub: { ko: "SK 아이젠 1기 지원 포트폴리오 · 이유신", en: "Portfolio for SK AIGEN Cohort 1 · Yoosin Lee" },
    // [text](project) marks a link to that project's detail
    bridge: {
      ko: "드로잉·회화·사진을 거쳐 산업디자인을 전공했고, 학교 디지털 패브리케이션 스튜디오에서 제작 장비의 운영과 교육을 맡았습니다. 아래 작업에서는 [조립 동작을 도해로 설명하고](montauk), [제작 조건을 문의서로 정리하며](makeit), [전문가의 판단이 필요한 지점을 화면으로 구분했습니다](grown).",
      en: "I went through drawing, painting and photography before majoring in industrial design, and ran and taught the fabrication equipment in my school's digital fabrication studio. In the work below, I [explained assembly moves with diagrams](montauk), [organised production terms into a brief](makeit) and [separated, on screen, the points that need an expert's judgement](grown)."
    },
    view: {
      ko: "일을 하다 사람들이 멈칫하는 곳, 설명이 말로만 전해지는 곳에 관심이 있습니다. 그 사이에 빠진 연결을 찾아 물건과 이미지, 그리고 직접 써볼 수 있는 도구로 만듭니다.",
      en: "I pay attention to the moments where people hesitate at work, and to the things that only ever get explained out loud. I look for the link that is missing there, and turn it into an object, an image, or a tool people can actually use."
    },
    timeline: [
      { when: { ko: "2014–2015", en: "2014–2015" }, t: { ko: "여행 대안학교 로드스꼴라", en: "로드스꼴라, an alternative travel school" },
        d: { ko: "2년 동안 이탈리아, 러시아, 중앙아시아, 제주도 등을 다니며 인문학, 철학, 문학, 사회학, 경제학을 배웠습니다.", en: "For two years we travelled through Italy, Russia, Central Asia, Jeju Island and more, studying humanities, philosophy, literature, sociology and economics." } },
      { when: { ko: "2016", en: "2016" }, t: { ko: "DMZ 다큐멘터리 워크숍", en: "DMZ documentary workshop" },
        d: { ko: "로드스꼴라를 마친 뒤 고3 무렵, 카메라를 들고 사람과 상황을 관찰하는 작업에 처음 참여했습니다. 청소년의 눈으로 바라본 사회의 모습을 제 시선으로 담아보고 싶었습니다.", en: "After the travel school, around my final year of high school, I first took part in work that meant observing people and situations through a camera. I wanted to capture, in my own way, how society looked through a teenager's eyes." } },
      { when: { ko: "2017–2019", en: "2017–2019" }, t: { ko: "해병대 연평부대 · 병 1223기", en: "ROK Marine Corps, Yeonpyeong Unit · enlisted class 1223" },
        d: { ko: "연평도에서 21개월 동안 복무했습니다.", en: "Served 21 months on Yeonpyeong Island." } },
      { when: { ko: "2019", en: "2019" }, t: { ko: "유럽 배낭여행", en: "Backpacking through Europe" },
        d: { ko: "3개월 동안 유럽의 미술관과 박물관을 찾아다녔습니다.", en: "Three months of going from one European art museum and museum to the next." } },
      { when: { ko: "2019", en: "2019" }, t: { ko: "고졸 검정고시 및 유학 준비", en: "High-school equivalency exam, preparing to study abroad" },
        d: { ko: "검정고시를 치르고, 같은 해에 유학 준비를 시작했습니다.", en: "I passed the Korean high-school equivalency exam and started preparing to study abroad the same year." } },
      { when: { ko: "2021", en: "2021" }, t: { ko: "프로복싱 라이선스 취득", en: "Professional boxing licence" },
        d: { ko: "프로 선수 자격을 땄습니다.", en: "Earned a licence to box professionally." } },
      { when: { ko: "2021년 가을 입학 · BFA 2025", en: "Entered fall 2021 · BFA 2025" }, t: { ko: "School of the Art Institute of Chicago", en: "School of the Art Institute of Chicago" },
        d: { ko: "드로잉·회화·사진을 경험한 뒤 산업디자인을 전공하고 졸업했습니다(Presidential Scholarship).", en: "After drawing, painting and photography, I majored in industrial design and graduated with a BFA (Presidential Scholarship)." } },
      // from the résumé: 280 Digital Fabrication Studio | 2022 - 2025 · Advanced Instructor · Chicago, IL
      { when: { ko: "2022–2025 · Advanced Instructor", en: "2022–2025 · Advanced Instructor" }, t: { ko: "280 Digital Fabrication Studio", en: "280 Digital Fabrication Studio" },
        d: { ko: "학교 디지털 패브리케이션 스튜디오에서 학생 작업에 쓰이는 레이저 커터와 3D 프린터를 운영하고 관리했습니다. 학생들에게 장비를 안전하게 쓰는 법을 가르치고 기술 문제를 해결하며, 직접 만들어 보며 배우는 작업 환경을 만들었습니다.", en: "At the school's digital fabrication studio I ran and maintained the laser cutters and 3D printers used for student projects, trained students to use the equipment safely, solved technical problems and kept the studio a place for hands-on learning." } },
      // from the résumé: Montauk Sofa | Design Intern · Chicago, IL
      { when: { ko: "2025–2026 · 디자인 인턴", en: "2025–2026 · Design Intern" }, t: { ko: "Montauk Sofa Chicago", en: "Montauk Sofa Chicago" },
        d: { ko: "디자인 팀을 도와 사진 촬영, 벡터 일러스트레이션, AI 보조 렌더링과 배경 정리를 거쳐 제품 이미지를 만들었습니다. 매뉴얼에 들어갈 정면도와 조립 도해를 제작해 연결 부위를 더 알아보기 쉽게 했고, 쇼룸과 마케팅에 쓰일 이미지를 완성했습니다.", en: "Supported the design team with product images made through photography, vector illustration, AI-assisted rendering and background cleanup. I produced the orthographic and assembly drawings for the manuals, made the connection details easier to read, and finished imagery for the showroom and marketing." } },
      // from the résumé: Freelance 3D Visualization Designer · Chicago, IL (SketchUp modelling and generative-AI rendering, as the owner describes it)
      { when: { ko: "2026", en: "2026" }, t: { ko: "인테리어 디자인 프리랜스", en: "Freelance interior design" },
        d: { ko: "SketchUp으로 공간과 가구를 모델링하고 생성형 AI로 렌더링했습니다. 쇼룸, 마케팅, 클라이언트 프레젠테이션에 쓰일 인테리어와 가구 이미지를 만들고, 사실적인 장면과 함께 정면도와 조립 일러스트도 제작했습니다.", en: "I modelled spaces and furniture in SketchUp and rendered them with generative AI, making interior and furniture images for showrooms, marketing and client presentations, along with orthographic views and assembly illustrations." } },
      { when: { ko: "2026–현재", en: "2026–now" }, t: { ko: "IDSA 커뮤니티와 멘토링", en: "IDSA community and mentoring" },
        d: { ko: "학교 IDSA 커뮤니티에 소속되어 졸업 후에도 교수님들과 활동을 이어갔고, Meta 디자이너에게 멘토링을 받으며 디자인을 배웠습니다. 지금도 교수님, 디자이너들과 꾸준히 교류하고 있습니다.", en: "As part of my school's IDSA community I kept working with professors after graduating, and learned design through mentoring from a Meta designer. I still stay in regular touch with professors and designers." } }
    ],
    why: {
      ko: [
        "AI를 쓰면서 가장 설렜던 순간은 전공 밖의 아이디어도 빠르게 화면이나 도구로 만들어, 직접 써보고 고칠 수 있게 됐을 때입니다. 이 포트폴리오의 네 가지 도구도 그 설렘에서 출발했습니다. 만드는 과정에서 서로 흩어져 있다고 생각했던 경험과 미술에서 익힌 감각이 한 작업 안에서 연결되기 시작했습니다.",
        "동시에 AI가 제 작업에서 어떤 역할을 하는지도 분명해졌습니다. 엑셀로 자료를 정리하고 비교할 수 있어도 어떤 질문을 던질지는 사람이 정하듯, AI를 쓸 때도 문제를 알아차리고 해결 방향을 논의한 사람은 저와 동료들이었습니다. AI는 우리가 내린 판단을 실제로 써볼 수 있는 형태로 옮기고, 그 결과를 확인하며 고치는 데 도움을 주었습니다.",
        "아이디어를 도구로 만들고 시험하는 능력은 혼자서도 계속 키울 수 있습니다. 제가 SK AIGEN에서 해보고 싶은 일은 다른 분야의 사람들과 같은 현장을 바라보는 것입니다. 제가 지나쳤던 문제를 동료는 어떻게 발견하는지, 서로 다른 관찰이 모이면 처음의 질문과 해결책이 어떻게 달라지는지 경험하고 싶습니다. 한 번의 협업을 넘어, 분야가 다른 사람들과 꾸준히 관찰하고 함께 문제를 풀어가는 법을 배우고 싶습니다.",
        "그 과정에서 제가 미술을 하며 익힌 감각도 다시 살펴보고 싶습니다. 형태나 이미지, 사람들이 그것을 받아들이는 방식에 주의를 기울여온 경험이 어떤 문제를 더 잘 보이게 하는지, 그 감각이 해결책을 만드는 데 어디까지 쓰일 수 있는지 직접 확인해보고 싶습니다."
      ],
      en: [
        "The moment that excited me most with AI was when ideas outside my major could quickly become a screen or a tool I could use myself and fix. The four tools in this portfolio started from that excitement. While making them, experiences I had thought of as scattered, and the eye I trained in art, began to connect inside one piece of work.",
        "It also made clear what role AI plays in my work. Just as Excel can organise and compare data while a person still decides which questions to ask, the people who noticed the problems and discussed how to solve them were my colleagues and me. AI helped turn the judgements we made into something we could actually try, and helped us check and fix the results.",
        "The ability to turn ideas into tools and test them is something I can keep building on my own. What I want to do at SK AIGEN is look at the same situation together with people from other fields. I want to experience how a colleague finds the problem I walked past, and how the first question and its solution change when different observations come together. Beyond a single collaboration, I want to learn how to keep observing and solving problems with people whose fields differ from mine.",
        "Along the way I want to look again at the sense I built through art. I want to find out for myself which problems become easier to see because I have paid attention to form, to images and to how people take them in — and how far that sense can go in making solutions."
      ]
    },
    // contact: email and LinkedIn from the résumé (Jan 2026); the résumé itself opens as a PDF
    links: [
      { href: "mailto:yeeugod@gmail.com", t: "Email", d: "yeeugod@gmail.com" },
      { href: "https://www.linkedin.com/in/yoosin-lee-893291333/", t: "LinkedIn", ext: true }
    ],
    resume: { href: "assets/docs/Resume_Yoosin_Lee.pdf", t: { ko: "이력서 보기", en: "View Résumé" } }
  };

  /* ───────────── Art & Design ───────────── */
  const g = (img, t, d, opt = {}) => Object.assign({ img, t, d }, opt);
  C.art = {
    lead: { ko: "형태와 재료, 이미지와 공간을 오가며 시도한 작업들입니다.", en: "Work that moves between form and material, image and space." },
    hint: { ko: "이미지를 누르면 크게 볼 수 있고, 같은 작품의 다른 컷으로 넘길 수 있습니다.", en: "Select an image to enlarge it and step through the other views of the same piece." },
    cats: [
      { k: "id", t: { ko: "산업디자인", en: "Industrial Design" }, projects: [
        { t: "Liquid Glass Eyewear", d: { ko: "미래적 아이웨어에 Y3K의 시각 언어를 결합한 제품 렌더링입니다. 녹아 흐르는 듯한 크롬 곡면으로 림과 다리를 한 덩어리로 잇고, 브리지 옆에 카메라 모듈을 넣었습니다. 착용 컷으로 얼굴 위의 비례를, 제품 컷으로 곡면과 디테일을 확인했습니다.", en: "Product renders pairing future-facing eyewear with a Y3K visual language. A chrome surface that looks almost molten runs the rims and temples into one piece, with a camera module set beside the bridge. The worn shots check the proportions on a face; the product shots check the surfaces and details." }, cap: { ko: "착용 컷과 제품 전체 컷을 나란히 두어 얼굴 위 비례와 제품 형태를 비교합니다.", en: "Worn shots next to whole-product shots, to compare the proportions on a face with the product's form." }, show: 4, items: [
          g("eye-worn", { ko: "착용 · 정면", en: "Worn · front" }, null, { w: "w4 mfull", ar: "1494 / 2000", eager: true }),
          g("eye-front", { ko: "제품 전체 · 정면", en: "Whole product · front" }, null, { w: "w8 mfull", ar: "3 / 2", eager: true }),
          g("eye-worn-side", { ko: "착용 · 옆얼굴", en: "Worn · profile" }, null, { w: "w4 mfull", ar: "1494 / 2000" }),
          g("eye-hero", { ko: "제품 전체 · 3/4 각도", en: "Whole product · three-quarter" }, null, { w: "w8 mfull", ar: "3 / 2" }),
          g("eye-detail", { ko: "디테일 · 카메라 모듈", en: "Detail · camera module" }, null, { w: "w4" }),
          g("eye-float", { ko: "제품 전체 · 기울인 구도", en: "Whole product · tilted" }, null, { w: "w4 tall" }),
          g("eye-side", { ko: "측면 · 다리와 렌즈", en: "Side · temple and lens" }, null, { w: "w4 tall" }),
          g("eye-macro", { ko: "재질 · 크롬 곡면 (카메라 모듈 주변)", en: "Material · chrome surface around the camera" }, null, { w: "w4 tall" }),
          g("eye-bridge", { ko: "디테일 · 브리지", en: "Detail · bridge" }, null, { w: "w4 tall" }) ] },
        { t: { ko: "천장형 게임기", en: "Ceiling Game Console" }, d: { ko: "천장에 고정한 막대에 구형 본체가 매달린 게임기 렌더링입니다. 앞면이 열리며 화면과 조이스틱이 드러나는 구조이고, 거실과 창가처럼 서로 다른 공간에 내려온 장면으로 크기와 놓이는 위치를 보여줍니다. 천장에서 내려오는 방식의 구체적인 기구는 렌더에 포함되어 있지 않습니다.", en: "Renders of a game console whose spherical body hangs from a rod fixed to the ceiling. The front opens to reveal a screen and joysticks, and scenes in different rooms show its size and where it sits. The mechanism that lowers it from the ceiling is not part of these renders." }, items: [
          g("ceil-room", { ko: "거실로 내려온 상태", en: "Lowered into the living room" }, null, { w: "w12" }),
          g("ceil-room-2", { ko: "다른 공간에 내려온 상태", en: "Lowered in another room" }, null, { w: "w8" }),
          g("ceil-room-3", { ko: "창가 쪽 구도", en: "By the window" }, null, { w: "w4 tall" }),
          g("ceil-hang", { ko: "구조 · 천장 막대와 본체", en: "Structure · ceiling rod and body" }, null, { w: "w4 tall" }),
          g("ceil-side", { ko: "구조 · 열리는 앞면", en: "Structure · the front opens" }, null, { w: "w4 tall" }),
          g("ceil-screen", { ko: "디테일 · 화면", en: "Detail · screen" }, null, { w: "w4 tall" }),
          g("ceil-open", { ko: "앞면을 연 상태", en: "Front open" }, null, { w: "w6" }),
          g("ceil-closed", { ko: "앞면을 닫은 상태", en: "Front closed" }, null, { w: "w6" }),
          g("ceil-front", { ko: "정면", en: "Front" }, null, { w: "w6" }),
          g("ceil-controls", { ko: "디테일 · 조이스틱과 버튼", en: "Detail · sticks and buttons" }, null, { w: "w6" }) ] },
        { t: "Vape Silencer", d: { ko: "손에 쥐는 납작한 플라스크 형태의 제품입니다. 브리프와 스케치로 사용 장면을 정리하고, CAD와 3D 프린트 시제품으로 손에 쥐는 크기와 캡 구조를 확인한 뒤, 크기 3종과 마감을 렌더와 제품 사진으로 비교했습니다.", en: "A flat, flask-shaped product held in the hand. Briefs and sketches set out how it is used; CAD and 3D-printed prototypes checked the size in the hand and the cap; then three sizes and several finishes were compared in renders and product photographs." }, cap: { ko: "3차 시제품과 크기 3종 비교. 제작한 형태와 크기 대안을 함께 보여줍니다.", en: "The third prototype next to three sizes: the form that was built, and the size options, side by side." }, show: 6, items: [
          g("id-flask-proto", { ko: "3차 작동 시제품 · 사진", en: "Third working prototype · photo" }, null, { w: "w4 tall" }),
          g("flask-dark-trio", { ko: "크기 3종 · 제품 사진", en: "Three sizes · product photo" }, null, { w: "w8" }),
          g("flask-hero", { ko: "제품 사진", en: "Product photograph" }, null, { w: "w8" }),
          g("flask-front", { ko: "정면", en: "Front" }, null, { w: "w4" }),
          g("flask-side", { ko: "측면", en: "Side" }, null, { w: "w4" }),
          g("flask-copper", { ko: "코퍼 캡", en: "Copper cap" }, null, { w: "w4" }),
          g("id-flask-2", { ko: "마감 변형 3종", en: "Three finishes" }, null, { w: "w6" }),
          g("flask-fog-wide", { ko: "연기 연출 · 렌더", en: "With vapour · render" }, null, { w: "w8" }),
          g("flask-hand-1", { ko: "손에 쥔 시제품", en: "Prototype in hand" }, null, { w: "w4 tall" }),
          g("flask-blueprint", { ko: "도면", en: "Technical drawing" }, null, { w: "w6", fit: "contain" }),
          g("flask-hand-2", { ko: "시제품 · 상단 캡", en: "Prototype · top cap" }, null, { w: "w3 tall" }),
          g("flask-copper-2", { ko: "코퍼 바디", en: "Copper body" }, null, { w: "w3 tall" }),
          g("id-flask-sketch", { ko: "형태 탐색 스케치", en: "Form sketches" }, null, { w: "w4", fit: "contain" }),
          g("flask-notes", { ko: "구조 메모 스케치", en: "Structure notes" }, null, { w: "w4", fit: "contain" }),
          g("flask-cad-1", { ko: "CAD 형태 비교", en: "CAD form comparison" }, null, { w: "w4", fit: "contain" }),
          g("flask-brief-1", { ko: "제품 브리프 스케치 1", en: "Product brief sketch 1" }, null, { w: "w3 tall", fit: "contain" }),
          g("flask-brief-2", { ko: "제품 브리프 스케치 2", en: "Product brief sketch 2" }, null, { w: "w3 tall", fit: "contain" }),
          g("flask-story", { ko: "사용 시나리오", en: "Use scenario" }, null, { w: "w6", fit: "contain" }),
          g("id-flask-use", { ko: "사용 순서 도해", en: "Use sequence" }, null, { w: "w4", fit: "contain" }),
          g("flask-exploded", { ko: "분해 · 조립 장면", en: "Taking it apart" }, null, { w: "w4" }),
          g("flask-cad-2", { ko: "CAD 상면", en: "CAD top views" }, null, { w: "w4", fit: "contain" }) ] },
        { t: "Layered Lamp", d: { ko: "얇은 판을 층층이 쌓아 빛을 걸러내는 조명입니다. 종이 스케치에서 원통형과 사각형 구성을 비교했고, 베이스를 가공해 전자부를 넣은 작동 시제품으로 실제 점등 상태를 확인했습니다.", en: "A lamp that filters light through thin stacked layers. Paper sketches compared cylindrical and square versions; a working prototype, with a machined base holding the electronics, checked how it actually looks lit." }, cap: { ko: "형태 스케치에서 작동 시제품으로 옮기고, 실제 점등 상태를 확인한 작업입니다.", en: "From a form sketch to a working prototype, checked lit." }, show: 6, items: [
          g("lamp-paper-1", { ko: "종이 스케치", en: "Paper sketch" }, null, { w: "w4 tall", fit: "contain" }),
          g("lamp-build-3", { ko: "작동 테스트", en: "Working test" }, null, { w: "w4 tall" }),
          g("id-lamp-1", { ko: "점등 · 그러데이션", en: "Lit · gradient" }, null, { w: "w4 tall" }),
          g("lamp-5th", { ko: "점등 · 화이트", en: "Lit · white" }, null, { w: "w3" }),
          g("id-lamp-2", { ko: "제품 사진", en: "Product photograph" }, null, { w: "w3" }),
          g("lamp-2nd", { ko: "위에서 본 모습", en: "From above" }, null, { w: "w3" }),
          g("lamp-dark-wide", { ko: "다크 스튜디오 컷", en: "Dark studio shot" }, null, { w: "w8" }),
          g("lamp-build-1", { ko: "베이스 가공", en: "Machining the base" }, null, { w: "w3" }),
          g("lamp-build-2", { ko: "베이스 내부", en: "Inside the base" }, null, { w: "w3" }),
          g("lamp-build-4", { ko: "손에 든 시제품", en: "Prototype in hand" }, null, { w: "w3" }),
          g("id-lamp-3", { ko: "내부 전자부 구성", en: "Internal electronics" }, null, { w: "w3" }),
          g("id-lamp-sketch", { ko: "구조 스케치", en: "Structure sketch" }, null, { w: "w3", fit: "contain" }),
          g("lamp-paper-2", { ko: "원통형 스케치", en: "Cylinder sketch" }, null, { w: "w3", fit: "contain" }),
          g("lamp-cyl", { ko: "원통형 정리 스케치", en: "Cylinder clean-up" }, null, { w: "w3", fit: "contain" }) ] },
        { t: "Ember Lamp", d: { ko: "검은 셰이드의 세로 슬릿으로 빛이 새어 나오는 조명 렌더링입니다. 슬릿 하나와 두 개, 셰이드와 바디의 색, 켠 상태와 끈 상태를 바꿔 가며 같은 형태가 주는 인상을 비교했습니다.", en: "Renders of a lamp whose light escapes through vertical slits in a black shade. One slit or two, shade and body colours, on and off — the same form compared across each change." }, items: [
          g("ember-0212", { ko: "점등 · 웜 라이트", en: "Lit · warm light" }, null, { w: "w8" }),
          g("ember-0218", { ko: "소등 · 화이트 셰이드", en: "Off · white shade" }, null, { w: "w4 tall" }),
          g("ember-0217", { ko: "점등 · 앰버", en: "Lit · amber" }, null, { w: "w3" }),
          g("ember-0225", { ko: "점등 · 마젠타", en: "Lit · magenta" }, null, { w: "w3" }),
          g("ember-0242", { ko: "투 슬릿 · 점등", en: "Twin slit · lit" }, null, { w: "w3" }),
          g("ember-0251", { ko: "투 슬릿 · 웜 라이트", en: "Twin slit · warm" }, null, { w: "w3" }),
          g("ember-0210", { ko: "오렌지 셰이드", en: "Orange shade" }, null, { w: "w3" }),
          g("ember-0229", { ko: "오렌지 바디", en: "Orange body" }, null, { w: "w3" }),
          g("ember-0241", { ko: "투 슬릿 · 오렌지", en: "Twin slit · orange" }, null, { w: "w3" }),
          g("ember-0244", { ko: "투 슬릿 · 마젠타", en: "Twin slit · magenta" }, null, { w: "w3" }),
          g("ember-0246", { ko: "글로스 블랙", en: "Gloss black" }, null, { w: "w3" }),
          g("ember-0250", { ko: "투 슬릿 · 화이트", en: "Twin slit · white" }, null, { w: "w3" }),
          g("ember-0226", { ko: "그레이 셰이드", en: "Grey shade" }, null, { w: "w3" }),
          g("ember-early", { ko: "초기 렌더", en: "Early render" }, null, { w: "w3" }) ] },
        { t: "Controller Concept", d: { ko: "공구 브랜드의 색과 질감을 빌려 온 게임 컨트롤러 컨셉입니다(브랜드와 공식 관계 없음). 선 렌더로 형태를 진행한 뒤, 접히는 구조와 그립 곡면, 조이스틱 주변 디테일을 스튜디오 렌더로 확인했습니다.", en: "A game controller concept borrowing a tool brand's colours and textures (not affiliated with the brand). The form was developed in line renders, then the folding structure, grip surfaces and stick details were checked in studio renders." }, items: [
          g("id-dewalt-1", { ko: "렌더링", en: "Rendering" }, null, { w: "w6" }),
          g("id-dewalt-2", { ko: "그립 디테일", en: "Grip detail" }, null, { w: "w6" }),
          g("id-dewalt-3", { ko: "정면", en: "Front view" }, null, { w: "w6" }),
          g("ctl-dark", { ko: "다크 스튜디오 컷", en: "Dark studio shot" }, null, { w: "w6" }),
          g("ctl-detail", { ko: "조이스틱 디테일", en: "Stick detail" }, null, { w: "w4" }),
          g("ctl-grip", { ko: "그립 곡면", en: "Grip surface" }, null, { w: "w4" }),
          g("ctl-joint", { ko: "연결부", en: "Joint" }, null, { w: "w4" }),
          g("ctl-studio", { ko: "화이트 스튜디오 컷", en: "White studio shot" }, null, { w: "w6" }),
          g("ctl-fold", { ko: "접힌 상태", en: "Folded" }, null, { w: "w6" }),
          g("ctl-line-1", { ko: "형태 진행 1", en: "Form study 1" }, null, { w: "w4", fit: "contain" }),
          g("ctl-line-2", { ko: "형태 진행 2", en: "Form study 2" }, null, { w: "w4", fit: "contain" }),
          g("ctl-line-3", { ko: "형태 진행 3", en: "Form study 3" }, null, { w: "w4", fit: "contain" }),
          g("id-dewalt-sketch", { ko: "아이디어 스케치", en: "Idea sketches" }, null, { w: "w12", fit: "contain" }) ] },
        { t: "Morning Shower Kit", d: { ko: "아침 샤워에 쓰는 샴푸와 데오드란트를 종이·알약 같은 작은 형태로 바꿔 본 형태 탐구입니다. 아이디어 스케치에서 꺼내 쓰는 순서를 정리하고, 종이 샴푸·알약형 샴푸·데오드란트를 컬러 렌더로 정리했습니다.", en: "A form study that turns morning-shower shampoo and deodorant into small paper and pill-like formats. Idea sketches worked out the order of use, and the paper shampoo, pill shampoo and deodorant were resolved in colour renders." }, items: [
          g("shower-flow", { ko: "사용 흐름", en: "Use flow" }, null, { w: "w6", fit: "contain" }),
          g("shower-paper-flow", { ko: "종이 샴푸 사용 흐름", en: "Paper shampoo flow" }, null, { w: "w6", fit: "contain" }),
          g("shower-deo", { ko: "데오드란트", en: "Deodorant" }, null, { w: "w4", fit: "contain" }),
          g("shower-paper", { ko: "종이 샴푸", en: "Paper shampoo" }, null, { w: "w4", fit: "contain" }),
          g("shower-pill", { ko: "알약형 샴푸", en: "Pill shampoo" }, null, { w: "w4", fit: "contain" }),
          g("shower-paper-1", { ko: "종이 샴푸 · 패키지", en: "Paper shampoo · pack" }, null, { w: "w4", fit: "contain" }),
          g("shower-paper-2", { ko: "종이 샴푸 · 꺼내기", en: "Paper shampoo · dispensing" }, null, { w: "w4", fit: "contain" }),
          g("shower-stand", { ko: "거치대", en: "Stand" }, null, { w: "w4", fit: "contain" }),
          g("shower-deo-sketch", { ko: "데오드란트 스케치", en: "Deodorant sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-paper-sketch", { ko: "종이 샴푸 스케치", en: "Paper shampoo sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-pill-sketch", { ko: "알약형 샴푸 스케치", en: "Pill shampoo sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-1", { ko: "아이디어 스케치", en: "Idea sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-2", { ko: "사용자 메모", en: "User notes" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-3", { ko: "아이디어 스케치", en: "Idea sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-4", { ko: "아이디어 스케치", en: "Idea sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-5", { ko: "아이디어 스케치", en: "Idea sketch" }, null, { w: "w3 tall", fit: "contain" }),
          g("shower-sk-6", { ko: "형태 스케치", en: "Form sketch" }, null, { w: "w4 tall", fit: "contain" }),
          g("shower-sk-7", { ko: "형태 스케치", en: "Form sketch" }, null, { w: "w4 tall", fit: "contain" }),
          g("shower-sk-9", { ko: "형태 스케치", en: "Form sketch" }, null, { w: "w4 tall", fit: "contain" }) ] },
        { t: "Cone Side Table", d: { ko: "조명이 올라간 사이드 테이블 · 렌더", en: "Side table with a lamp · rendering" }, items: [
          g("cone-2", { ko: "정면", en: "Front" }, null, { w: "w6 sq" }),
          g("cone-1", { ko: "다른 각도", en: "Another angle" }, null, { w: "w6 sq" }) ] },
        { t: "Rope Chair", d: { ko: "가구 · 합판과 로프", en: "Furniture · plywood and rope" }, items: [
          g("fu-chair-1", { ko: "완성", en: "Finished chair" }, null, { w: "w6" }),
          g("fu-chair-2", { ko: "로프 직조 과정", en: "Weaving the rope" }, null, { w: "w6" }) ] },
        { t: "Light Studies", d: { ko: "조명 형태를 탐구한 스케치입니다. 캡슐·버섯·반원통 같은 기본 형태와 셰이드 단면을 잉크로 그려, 빛이 퍼지는 모양을 비교했습니다.", en: "Sketches exploring lamp forms. Basic shapes — capsule, mushroom, half cylinder — and shade sections drawn in ink to compare how the light spreads." }, items: [
          g("ls-capsule", { ko: "캡슐형", en: "Capsule" }, null, { w: "w3", fit: "contain" }),
          g("ls-mushroom", { ko: "버섯형", en: "Mushroom" }, null, { w: "w3", fit: "contain" }),
          g("ls-half", { ko: "반원통형", en: "Half cylinder" }, null, { w: "w3", fit: "contain" }),
          g("ls-ink-8", { ko: "세로형 셰이드", en: "Upright shades" }, null, { w: "w3", fit: "contain" }),
          g("ls-ink-1", { ko: "잉크 스케치 · 버섯형", en: "Ink · mushroom" }, null, { w: "w4", fit: "contain" }),
          g("ls-ink-2", { ko: "잉크 스케치 · 버섯형", en: "Ink · mushroom" }, null, { w: "w4", fit: "contain" }),
          g("ls-ink-3", { ko: "잉크 스케치 · 셰이드", en: "Ink · shades" }, null, { w: "w4", fit: "contain" }),
          g("ls-ink-4", { ko: "잉크 스케치 · 반원통형", en: "Ink · half cylinder" }, null, { w: "w3", fit: "contain" }),
          g("ls-ink-5", { ko: "잉크 스케치 · 박스형", en: "Ink · box" }, null, { w: "w3", fit: "contain" }),
          g("ls-ink-6", { ko: "잉크 스케치 · 단면", en: "Ink · sections" }, null, { w: "w3", fit: "contain" }),
          g("ls-ink-7", { ko: "잉크 스케치 · 구조", en: "Ink · structure" }, null, { w: "w3", fit: "contain" }) ] }
      ] },
      { k: "photo", t: { ko: "사진", en: "Photography" }, projects: [
        { t: "playing hide and seek with Trinity.", d: { ko: "사진 연작", en: "Photo series" }, items: [
          g("trinity-1", { ko: "1", en: "1" }, null, { w: "w3 tall" }),
          g("trinity-2", { ko: "2", en: "2" }, null, { w: "w3 tall" }),
          g("trinity-3", { ko: "3", en: "3" }, null, { w: "w3 tall" }),
          g("trinity-4", { ko: "4", en: "4" }, null, { w: "w3 tall" }) ] }
      ] },
      { k: "art", t: { ko: "순수미술", en: "Fine Art" }, projects: [
        { t: "Painting", d: { ko: "회화", en: "Painting" }, items: [
          g("fa-paint-2", { ko: "회화", en: "Painting" }, null, { w: "w4 tall" }),
          g("fa-paint-1", { ko: "회화", en: "Painting" }, null, { w: "w4 tall" }),
          g("fa-paint-3", { ko: "회화", en: "Painting" }, null, { w: "w4 tall" }) ] },
        { t: "Drawing", d: { ko: "연필 드로잉", en: "Pencil drawing" }, items: [ g("fa-draw-2", { ko: "연필 드로잉", en: "Pencil drawing" }, null, { w: "w4 tall" }) ] },
        { t: "Still Life", d: { ko: "색연필 정물", en: "Coloured-pencil still life" }, items: [ g("fa-draw-1", { ko: "색연필 정물", en: "Coloured-pencil still life" }, null, { w: "w4 tall" }) ] },
        { t: "Sculpture", d: { ko: "입체 · 혼합 재료", en: "Mixed-media sculpture" }, items: [ g("fa-sculpt-1", { ko: "입체 · 혼합 재료", en: "Mixed-media sculpture" }, null, { w: "w4 tall" }) ] }
      ] },
      { k: "graphic", t: { ko: "그래픽", en: "Graphic" }, projects: [
        { t: "3D Hangul Type", d: { ko: "3D 타이포그래피", en: "3D typography" }, items: [
          g("gd-type-1", { ko: "3D 타이포그래피", en: "3D typography" }, null, { w: "w6 sq" }),
          g("gd-type-2", { ko: "3D 타이포그래피", en: "3D typography" }, null, { w: "w6 sq" }) ] },
        { t: "Fight Poster", d: { ko: "포스터 · 개인 작업", en: "Poster · personal work" }, items: [ g("gd-poster", { ko: "포스터", en: "Poster" }, null, { w: "w4 tall" }) ] },
        { t: "Gloves", d: { ko: "3D 그래픽", en: "3D graphic" }, items: [ g("gd-gloves", { ko: "3D 그래픽", en: "3D graphic" }, null, { w: "w8" }) ] },
        { t: "Metal Wreath", d: { ko: "3D 그래픽", en: "3D graphic" }, items: [ g("gd-wreath", { ko: "3D 그래픽", en: "3D graphic" }, null, { w: "w6" }) ] },
        { t: "Woodshop Poster", d: { ko: "모집 포스터", en: "Recruiting poster" }, items: [ g("gd-woodshop", { ko: "모집 포스터", en: "Recruiting poster" }, null, { w: "w3 tall", fit: "contain" }) ] }
      ] },
      { k: "interior", t: { ko: "인테리어", en: "Interior" }, projects: [
        { t: "Shower Room", d: { ko: "3D 모델 기반 AI 보조 렌더", en: "AI-assisted render from a 3D model" }, items: [
          g("in-wide", { ko: "와이드 뷰", en: "Wide view" }, null, { w: "w8" }),
          g("in-hall", { ko: "복도 뷰", en: "Corridor view" }, null, { w: "w4 tall" }),
          g("in-sketchup", { ko: "SketchUp 모델 (렌더 전)", en: "SketchUp model, before rendering" }, null, { w: "w6" }),
          g("in-ai", { ko: "샤워 부스 뷰", en: "Shower stall view" }, null, { w: "w6" }) ] },
        { t: "Dining Room", d: { ko: "AI 보조 조명 보정", en: "AI-assisted lighting pass" }, items: [ g("in-dining", { ko: "다이닝 룸", en: "Dining room" }, null, { w: "w6" }) ] }
      ] },
      { k: "film", t: { ko: "단편영상", en: "Short Film" }, projects: [
        { t: "Is Ice A Crystal", d: { ko: "단편영상 · 각본 이유신", en: "Short film · written by Yoosin Lee" }, items: [
          g("ice-poster", { ko: "발췌 클립 · 12초", en: "Excerpt · 12 s" }, null, { w: "w8", video: "ice-clip" }) ] },
        { t: "Behind the Curtain", d: { ko: "단편영상 · 커튼 뒤 실루엣", en: "Short film · a silhouette behind the curtain" }, items: [
          g("img3222-poster", { ko: "클립 · 25초", en: "Clip · 25 s" }, null, { w: "w4 tall", video: "img3222-clip" }) ] }
      ] }
    ]
  };

  /* ───────────── Manual for Manuals ─────────────
     top: what I learned after the handover → the old process · staff feedback · the app's question screen
     story: the guide I made → it depended on one person → the handover → staff feedback → the follow-up tool → demo and the two guides */
  C.montauk = {
    hero: {
      line: { ko: "제작법을 넘긴 뒤에야, 현장에서 왜 쓰기 어려운지 알았습니다.", en: "Only after handing over the method did I see why it was hard to use on the floor." },
      intro: { ko: "몬탁에서 조립 가이드를 만들 때마다 촬영부터 편집까지 같은 작업을 되풀이했고, 그 과정은 제 숙련도에 기대고 있었습니다. 처음에는 제작법을 정리해 넘기면 직원들도 이어갈 수 있다고 생각했습니다. 하지만 직원들은 현장에서는 말로 설명하는 편이 더 빠르다고 했습니다. 그 말을 듣고 직원에게 제 제작 방식을 익히게 하기보다, 평소처럼 설명한 내용을 고객이 다시 볼 수 있는 가이드로 옮기는 방식을 설계했습니다.", en: "Every time I made an assembly guide at Montauk, I repeated the same work from the shoot to the layout, and it depended on my skill. At first I thought that if I wrote the method down and handed it over, staff could carry it on. But staff said that on the floor, explaining out loud was faster. Hearing that, instead of asking staff to learn my way of making guides, I designed a way to turn what they would normally say into a guide customers can read again." }
    },
    lead: {
      made: { t: { ko: "기존 제작 절차", en: "How the guide was made" },
        chain: [{ ko: "쇼룸 휴대폰 촬영", en: "Showroom phone shoot" }, { ko: "AI 보조 배경 정리·도해", en: "AI-assisted cleanup and diagrams" }, { ko: "InDesign 편집", en: "InDesign layout" }],
        cap: { ko: "직접 제작한 고객용 가이드 · 4쪽 (2단계 등쿠션 결합)", en: "The customer guide I made · p.4 (step 2, fitting the backrest)" } },
      feedback: { t: { ko: "직원의 피드백", en: "What staff said" },
        p: { ko: "직원들은 현장에서 말로 설명하는 편이 더 빠르다고 했습니다. 고객에게는 집에서도 다시 펼쳐볼 가이드가 필요했습니다. 그래서 직원이 평소처럼 설명한 내용을 조립 순서와 주의점으로 정리해 가이드 제작에 쓸 수 있도록 입력 방식을 설계했습니다.",
          en: "Staff said explaining out loud on the floor was faster. Customers still needed a guide they could open again at home. So I designed the input so that what staff would normally say is organised into assembly order and cautions, and used to make the guide." } },
      app: { t: { ko: "앱의 질문 화면", en: "The app's question screen" },
        cap: { ko: "Montauk Manual Studio · 직원이 조립 질문에 답하는 단계", en: "Montauk Manual Studio · staff answering an assembly question" },
        alt: { ko: "직원 답변 화면 · 조립할 때 주의할 점에 대한 시연용 음성 답변", en: "Answer screen: a demo voice answer to “What should people watch out for during assembly?”" } }
    },
    story: {
      label: { ko: "직접 만든 가이드에서 후속 도구까지", en: "From the guide I made to the follow-up tool" },
      steps: [
        { k: "made", t: { ko: "직접 제작한 고객용 가이드", en: "The customer guide I made" },
          h: { ko: "그래픽 디자이너로 조립·관리 가이드 제작을 의뢰받았습니다.", en: "I was commissioned, as a graphic designer, to make an assembly and care guide." },
          p: [{ ko: "쇼룸에서 소파를 휴대폰으로 직접 촬영하고, 사진의 배경 정리와 도해 렌더링에 AI 보조를 쓴 뒤, 도해를 정리하고 InDesign으로 편집해 영문·스페인어 8쪽 가이드를 완성했습니다.", en: "I photographed the sofa in the showroom on my phone, used AI assistance to clean up the backgrounds and render the diagrams, then tidied the diagrams and laid out an 8-page English and Spanish guide in InDesign." }],
          ai: { t: { ko: "배경 정리 · 도해 렌더링", en: "Background cleanup · diagram rendering" }, d: { ko: "쇼룸 사진의 배경 정리와 도해 렌더링에 AI 보조를 썼습니다. 촬영, 선 굵기 규칙에 맞춘 도해 정리, InDesign 편집은 직접 했습니다.", en: "AI assistance cleaned up the showroom photos' backgrounds and rendered the diagrams. The shoot, tidying the diagrams to one line-weight rule, and the InDesign layout were mine." } },
          media: [
            { img: "mk-shoot", t: { ko: "쇼룸 휴대폰 촬영", en: "Showroom phone shoot" } },
            { img: "mk-cutout", t: { ko: "배경 정리", en: "Background cleanup" } },
            { img: "mk-o-step2", t: { ko: "2단계 도해", en: "Step-2 diagram" } },
            { img: "mkd-p1", t: { ko: "완성한 가이드 · 표지", en: "The finished guide · cover" }, page: true }
          ] },
        { k: "handover", t: { ko: "제작법 인수인계", en: "Handing over the method" },
          h: { ko: "떠나기 전에 제작법을 넘기려 했다", en: "I tried to hand over the method before leaving" },
          p: [{ ko: "가구가 바뀔 때마다 촬영·배경 정리·도해·편집을 처음부터 되풀이해야 했고, 그 과정은 제 숙련도에 기대고 있었습니다. 제가 떠나면 다음 가이드가 나오기 어렵다는 점이 먼저 보였습니다.", en: "Every new piece meant redoing the shoot, cleanup, diagrams and layout from scratch, and it depended on my skill. I could see that once I left, the next guide would be hard to make." }, { ko: "비자가 끝나 귀국하기 전, 촬영 방법, 필요한 정보, AI 도구 사용법, 편집 프리셋까지 정리한 ‘매뉴얼을 위한 매뉴얼’을 만들어 인수인계했습니다.", en: "Before my visa ended, I wrote a ‘manual for manuals’ — how to shoot, what information is needed, how to use the AI tools, the layout presets — and handed it over." }],
          doc: { file: "assets/docs/Montauk_Assembly_Guide_Production_Handoff.pdf", img: "mt-handoff-p1",
            link: { ko: "인수인계 요약 보기", en: "View the handover summary" }, meta: { ko: "PDF · 2쪽 · 영문", en: "PDF · 2 pages · English" },
            cap: { ko: "실제 제작·인수인계 과정을 바탕으로 포트폴리오용으로 재구성한 요약", en: "A summary reconstructed for this portfolio from the actual production and handover process" } } },
        { k: "feedback", t: { ko: "직원 피드백", en: "Staff feedback" },
          h: { ko: "직원 입장에서는 말로 설명하는 편이 빨랐다", en: "For staff, explaining out loud was faster" },
          p: [{ ko: "고객과 CEO, 매니저는 가이드를 좋게 봤습니다. 다만 직원들은 현장에서 한 번 안내할 때는 말로 설명하는 편이 더 빠르다고 했습니다. 말은 현장에서 빠르지만, 고객이 집에서 다시 볼 수 있는 것은 문서였습니다.", en: "Customers, the CEO and the manager liked the guide. Staff, though, said that for a single walkthrough on the floor, explaining out loud was faster. Talking is fast on the floor, but what a customer can read again at home is a document." }],
          src: "field",
          mine: [{ ko: "직원들은 현장에서 말로 설명하는 편이 빠르다고 했습니다. 그래서 평소처럼 말한 내용을, 고객이 나중에 다시 볼 수 있는 가이드로 정리하는 흐름을 설계했습니다.", en: "Staff said explaining out loud on the floor was faster. So I designed a flow that turns what they would normally say into a guide customers can read again later." }] },
        { k: "tool", t: { ko: "질문·답변 중심의 후속 도구", en: "A follow-up tool built on questions and answers" },
          h: { ko: "직원이 가구를 촬영하고 앱의 질문에 답하면, 그 답이 정리되어 도해와 가이드 제작으로 이어집니다.", en: "Staff photograph the piece and answer the app's questions; the answers are organised and carried on into the diagrams and the guide." },
          flow: [
            { ko: "새 작업 시작", en: "Start a new job" }, { ko: "가구 촬영 또는 사진 선택", en: "Shoot the piece or pick photos" },
            { ko: "질문에 글이나 음성으로 답하기", en: "Answer the questions by text or voice" }, { ko: "조립 순서·부품·주의점 정리", en: "Order, parts and cautions organised" },
            { ko: "가이드 미리보기", en: "Guide preview" }, { ko: "PDF (앱 버전 가이드)", en: "PDF (the app-version guide)" }
          ],
          ai: { t: { ko: "음성 답변 받아쓰기", en: "Transcribing spoken answers" }, d: { ko: "직원의 음성 답변은 브라우저 음성 인식으로 받아씁니다. 사진에서 새 도해를 만드는 생성과 문구 자동 편집은 아직 연결하지 않았습니다.", en: "Staff's spoken answers are transcribed with the browser's speech recognition. Generating new diagrams from photos and editing text automatically are not connected yet." } },
          mine: [
            { ko: "조립·관리·안전 문구와 도해 규칙은 고정하고, 직원은 제품마다 달라지는 정보만 넣도록 나눴습니다.", en: "Assembly, care and safety text and the diagram rules stay fixed; staff only enter what changes from product to product." },
            { ko: "부품과 결합 위치·순서를 실물과 대조해 체크해야 가이드를 출력할 수 있게 했습니다.", en: "The guide can only be output after the parts, joins and order are checked against the real unit." }
          ] },
        { k: "demo", t: { ko: "시연", en: "Demo" },
          h: { ko: "질문 → 답변 → 미리보기", en: "Question → answer → preview" },
          stills: [
            { img: "mt-studio-1", t: { ko: "질문", en: "Question" }, alt: { ko: "질문 화면 · 조립할 때 주의할 점은 무엇인가요?", en: "Question screen: “What should people watch out for during assembly?” — type or answer by voice" } },
            { img: "mt-studio-2", t: { ko: "직원 답변", en: "Staff answer" }, alt: { ko: "직원 답변 화면 · 시연용 음성 답변이 받아써진 상태", en: "Answer screen: a demo voice answer, transcribed — “Forcing the backrest cushion on at an angle can damage it inside; assemble on a rug so the floor isn't scratched.”" } },
            { img: "mt-studio-3", t: { ko: "출력 미리보기", en: "Output preview" }, alt: { ko: "출력 미리보기 화면 · 준비된 예시 출력, 8쪽, 영문·스페인어", en: "Preview screen: prepared example output, 8 pages, English and Spanish" } }
          ],
          stillsCap: { ko: "앱의 질문 → 직원 답변 → 출력 미리보기를 정리한 화면입니다. 음성 답변은 시연용이고, 미리보기는 준비된 앱 버전 예시입니다.", en: "The app's question → the staff answer → the output preview. The voice answer is for the demo; the preview is the prepared app-version example." },
          note: { ko: "사내 도구라 공개 페이지에서는 시연 영상으로 보여드립니다. 영상의 도해와 마지막 PDF는 준비된 앱 버전 가이드이며, 화면에 ‘준비된 예시’로 표시했습니다.", en: "It is an in-house tool, so this public page shows it as a demo recording. The diagrams and the final PDF in the video are the prepared app-version guide, and are marked ‘prepared example’ on screen." } }
      ]
    },
    compare: {
      label: { ko: "두 가이드 비교", en: "The two guides, compared" },
      h: { ko: "같은 소파, 같은 조립 단계", en: "Same sofa, same assembly step" },
      direct: { t: { ko: "직접 제작한 가이드", en: "The guide I made" }, d: { ko: "휴대폰 촬영 · AI 보조 렌더링 · InDesign 편집 · 영문·스페인어 8쪽", en: "Phone shoot · AI-assisted rendering · InDesign · 8 pages, English and Spanish" } },
      app: { t: { ko: "앱 버전 가이드", en: "The app-version guide" }, d: { ko: "Montauk Manual Studio 흐름으로 만든 준비된 예시 · 선 도해와 원형 상세도 · 영문·스페인어 8쪽", en: "Prepared example made through the Montauk Manual Studio flow · line diagrams and a circular detail · 8 pages, English and Spanish" } },
      pages: [
        { n: 1, t: { ko: "표지", en: "Cover" } }, { n: 2, t: { ko: "구성품", en: "Components" } },
        { n: 3, t: { ko: "1단계 · 받침 확인", en: "Step 1 · base" }, step: true }, { n: 4, t: { ko: "2단계 · 등쿠션 결합", en: "Step 2 · backrest" }, step: true },
        { n: 5, t: { ko: "3단계 · 좌석쿠션", en: "Step 3 · seat cushion" }, step: true }, { n: 6, t: { ko: "4단계 · 마무리", en: "Step 4 · finishing" }, step: true },
        { n: 7, t: { ko: "관리 방법", en: "Care" } }, { n: 8, t: { ko: "뒷표지", en: "Back cover" } }
      ],
      cap: { ko: "같은 조립 단계끼리 짝지었습니다. 앱 버전은 도해마다 부품 기호를 달고, 2단계의 결합 부분을 원형 상세도로 확대했습니다.", en: "Pages are paired by assembly step. The app version labels every part in the diagrams and enlarges the step-2 join in a circular detail." }
    },
    close: {
      label: { ko: "확인한 점과 확인할 점", en: "What I learned, and what is left to check" },
      rows: [
        { k: { ko: "인수인계에서 확인한 점", en: "Learned from the handover" }, v: { ko: "고객과 CEO, 매니저는 직접 만든 가이드를 좋게 봤습니다. 직원들은 현장에서 한 번 안내할 때는 말로 설명하는 편이 더 빠르다고 했습니다. 현장에서 들은 피드백입니다.", en: "Customers, the CEO and the manager liked the guide I made. Staff said that for one walkthrough on the floor, explaining out loud was faster — feedback heard on the floor." } },
        { k: { ko: "지금 작동하는 범위", en: "What runs today" }, v: { ko: "새 작업 시작, 사진 촬영·선택, 질문에 글로 답하기, 음성 답변 받아쓰기(지원 브라우저), 답변을 조립 순서·부품·주의점으로 정리, 실물 대조 체크", en: "Starting a job, shooting or picking photos, typed answers, transcribing spoken answers (supported browsers), organising answers into order, parts and cautions, the check against the real unit" } },
        { k: { ko: "준비된 예시", en: "Prepared examples" }, v: { ko: "시연의 도해, 가이드 미리보기와 최종 PDF는 준비된 앱 버전 예시입니다", en: "The demo's diagrams, the guide preview and the final PDF are the prepared app-version example" } },
        { k: { ko: "아직 연결하지 않음", en: "Not connected yet" }, v: { ko: "사진에서 새 도해 자동 생성, 문구 자동 편집", en: "Generating new diagrams from photos, editing text automatically" } },
        { k: { ko: "새 방식에서 확인할 점", en: "Still to check with the new way" }, v: { ko: "후속 앱은 시연까지 만들었고, 직원이 실제로 쓰거나 현장에 정착했는지는 아직 확인하지 않았습니다. 직원과 한 제품의 가이드를 처음부터 끝까지 함께 만들어 보며, 말로 한 설명이 가이드에 충분히 담기는지 확인할 계획입니다.", en: "The follow-up app has been built as far as the demo; whether staff actually use it, or whether it has taken hold on the floor, has not been checked yet. The plan is to make one product's guide end to end with a staff member and see whether what they say is enough to make the guide." } }
      ]
    }
  };

  /* ───────────── GROWN ─────────────
     top: one fictional unit's result, with the further-checks step marked
     story: the brand work → the repeated cross-checking → the proposal → the conditions set with the expert → the result screen → web and mobile demos */
  C.grown = {
    hero: {
      line: { ko: "반복 대조는 줄이고, 전문가가 판단할 지점은 남겼습니다.", en: "Less repeated cross-checking — and the points where an expert decides, kept." },
      intro: { ko: "GROWN의 브랜딩을 맡으면서, 담당자가 회생 전략을 검토하기 전에 여러 자료를 수기로 대조한다는 걸 알게 됐습니다. 초기 진단을 자동화하자고 제안한 뒤, 진단 전문가와 함께 어떤 정보가 필요하고 어디서 계산을 멈춰야 하는지 정리했습니다. 그 결과 화면에는 예비 판정과 함께 근거, 추가로 확인할 자료, 다음 조치가 남도록 설계했습니다.", en: "Working on GROWN's branding, I learned that before reviewing a recovery strategy, staff cross-checked several sources by hand. After I proposed automating the first diagnosis, I worked out with the diagnosis expert what information was needed and where the calculation had to stop. So the result screen keeps, alongside the preliminary verdict, its reasons, the data still to check, and the next action." },
      demoNote: { ko: "회사 관련 사정으로 전체 진단 도구는 시연 영상으로 소개합니다.", en: "For company-related reasons the full diagnosis tool is shown as a demo recording." }
    },
    lead: {
      cap: { ko: "미리 계산한 가상 호실 예시", en: "A fictional unit, calculated in advance" },
      mark: { ko: "추가 확인", en: "Further checks" },
      markNote: { ko: "계산만으로 확정하지 않고, 이 단계에서 자료 보완과 현장·문서 확인을 요구합니다.", en: "The calculation doesn't settle it: this step asks for missing data and site and document checks." },
      scope: [
        { k: { ko: "내가 제안한 범위", en: "What I proposed" }, v: { ko: "엑셀 물건 목록 확인과 초기 대조를 자동화하고, 질문 순서와 결과 화면을 설계했다.", en: "Automate checking the property spreadsheet and the first cross-checks, and design the question order and the result screen." } },
        { k: { ko: "전문가와 정한 기준", en: "The rule set with the expert" }, v: { ko: "자동 계산은 예비 판정까지. 현장·문서 확인이 끝나야 확정할 수 있다.", en: "The calculation goes as far as a preliminary verdict. Only after the site and document checks can it be confirmed." } },
        { k: { ko: "화면에 반영한 방식", en: "How the screen shows it" }, v: { ko: "예비 판정과 근거를 보여주고, ‘추가 확인’에 사람이 확인할 조건을 남겼다.", en: "Show the preliminary verdict and its reasons, and leave what a person must check under ‘Further checks’." } }
      ]
    },
    mobile: {
      left: { ko: "기존 진단 시스템 시연", en: "The diagnosis system, demo" },
      right: { ko: "모바일 앱 시연", en: "The mobile app, demo" },
      lead: { ko: "초기 진단 절차를 웹에서 먼저 구현한 뒤, 같은 흐름을 휴대폰에서도 사용할 수 있도록 모바일 앱으로 확장했습니다.", en: "I built the early diagnosis process on the web first, then extended the same flow into a mobile app so it can be used on a phone too." },
      cap: { ko: "GROWN Rent Scan v0.7.1 · 휴대폰 화면에서 호실 정보를 입력하면 1층 적정 임대가 범위와 근거를 계산하고, 결과를 Recovery Scan 연동 값으로 넘깁니다. 영상의 수치는 앱에 들어 있는 예시(가상) 데이터입니다.", en: "GROWN Rent Scan v0.7.1 · Enter a unit on the phone and it estimates a ground-floor rent range with its reasons, then hands the result to Recovery Scan. Figures in the video come from the app's built-in example (fictional) data." }
    },
    story: {
      label: { ko: "브랜딩에서 진단 화면까지", en: "From branding to the diagnosis screen" },
      steps: [
        { k: "brand", t: { ko: "처음 맡은 일", en: "The job I was given" }, h: { ko: "GROWN의 BI·VI, 명함, 웹사이트", en: "GROWN's identity, business cards and website" },
          p: [{ ko: "공실 상가를 회생시키는 회사의 브랜드를 만들었습니다. 심벌과 로고, 색 체계, 명함, 웹사이트까지 맡았습니다.", en: "I built the brand for a company that brings vacant retail units back to life: symbol and logo, colour system, business cards and the website." }] },
        { k: "noticed", t: { ko: "일하면서 관찰한 장면", en: "What I watched along the way" }, h: { ko: "회생 전략 앞에 놓인 반복 대조 업무", en: "Repeated cross-checking in front of the strategy" },
          p: [{ ko: "브랜드와 사업을 이해하면서 초기 진단 절차를 알게 됐습니다. 회생 전략을 세우기 전에, 고객이 보낸 물건 자료를 담당자가 손으로 확인하고 대조하는 데 시간과 인력이 들고 있었습니다.", en: "Getting to know the brand and the business, I learned the early diagnosis process. Before any recovery strategy, staff spent time checking and cross-matching the property data clients sent, by hand." }] },
        { k: "proposed", t: { ko: "초기 진단 자동화 제안", en: "Proposing to automate the first diagnosis" }, h: { ko: "엑셀 물건 목록에서 시작하는 초기 진단 자동화", en: "Automating the first diagnosis, starting from the spreadsheet" },
          p: [{ ko: "고객이 보내는 엑셀 물건 목록으로 자료 정리와 초기 진단을 자동화하자고 제가 먼저 제안했습니다. 반복 대조를 줄여 담당자가 회생 전략에 집중하도록 하는 것이 목적이었습니다.", en: "I proposed using the spreadsheet clients send to automate the data clean-up and first diagnosis. The aim was to cut repeated cross-checking so staff could focus on the strategy." }],
          mine: [{ ko: "자동화의 대상을 판정 전체가 아니라, 담당자가 손으로 하던 자료 확인과 대조로 잡았습니다.", en: "What to automate was the checking and cross-matching staff did by hand — not the whole verdict." }] },
        { k: "expert", t: { ko: "전문가와 함께 정한 판정 조건", en: "Verdict conditions set with the expert" }, h: { ko: "계산이 멈추는 자리를 함께 정했다", en: "Where the calculation stops, decided together" },
          p: [{ ko: "빠지거나 확인되지 않은 자료가 있으면 계산만으로 판정을 확정할 수 없습니다. 공실 진단 전문가와 진단 질문을 구체화하면서, 자동 계산은 예비 판정까지만 내고, 자료를 보완한 뒤 전문가가 현장·문서를 확인해야 확정 판정으로 기록되도록 했습니다. 결과 화면의 ‘추가 확인’ 단계가 그 결정입니다.", en: "With missing or unconfirmed data, a calculation alone can't settle a verdict. Refining the diagnostic questions with the vacancy-diagnosis expert, we set it so the calculation stops at a preliminary verdict, and only after the data is filled in and the expert checks the site and documents is it recorded as confirmed. The ‘further checks’ step on the result screen is that decision." }],
          collab: { img: "gr-collab", cap: { ko: "협업 과정 재구성 · 공개 데모와 프로젝트 설명을 바탕으로 정리", en: "The collaboration, reconstructed · put together from the public demo and the project notes" },
            alt: { ko: "어디까지 자동화할지 전문가와 함께 정한 과정. 01 내가 제안한 범위: 엑셀 목록에서 초기 진단까지. 02 전문가와 함께 정한 조건: 자동 계산은 예비 판정까지. 03 결과 화면: 가상 호실 201, 확정 전에 더 확인할 자료가 결과에 남습니다.", en: "How far to automate, decided with the expert. 01 What I proposed: from the spreadsheet to a first diagnosis. 02 The condition set with the expert: the calculation stops at a preliminary verdict. 03 The result screen: fictional unit 201, with the data still to check left on the result." } } },
        { k: "result", t: { ko: "결과 화면", en: "The result screen" }, h: { ko: "호실을 고르면, 그 호실의 예비 판정 → 근거 → 추가 확인 → 우선 조치가 이어집니다.", en: "Pick a unit and its preliminary verdict → reasons → further checks → actions first follow." },
          p: [{ ko: "아래 8개 호실은 가상 예시이며, 기존 내부 도구 v1.2의 계산으로 미리 구한 결과입니다. 이 페이지에서는 호실을 골라 결과를 보는 것만 할 수 있습니다.", en: "The 8 units below are fictional, with results calculated in advance by the existing internal tool v1.2. Here you can only pick a unit and read its result." }],
          ai: { t: { ko: "진단 계산과 판정", en: "Diagnosis calculation and verdicts" }, d: { ko: "예비 판정은 기존 내부 도구 v1.2의 엑셀 기반 계산 규칙을 따릅니다. AI가 판정하는 구조가 아니며, 이 페이지는 미리 계산한 결과를 보여주기만 합니다.", en: "The preliminary verdict follows the spreadsheet-based rules of the existing internal tool v1.2. It is not an AI verdict, and this page only shows results calculated in advance." } } },
        { k: "mobile", t: { ko: "웹·모바일 시연", en: "Web and mobile demos" }, h: { ko: "같은 흐름을 휴대폰에서", en: "The same flow, on a phone" } }
      ]
    },
    roles: {
      split: [
        { k: { ko: "저", en: "Me" }, v: { ko: "개선 제안 · 질문·입력 순서 · 결과 화면 설계 · 화면 구현", en: "Proposal · question and input order · result screen design · building the screen" } },
        { k: { ko: "전문가와 함께", en: "With the expert" }, v: { ko: "진단 질문 구체화 · 확정 전 현장·문서 확인 범위", en: "Refining the diagnostic questions · what to check on site and in documents before confirming" } },
        { k: { ko: "기존 도구", en: "Existing tool" }, v: { ko: "내부 도구 v1.2의 엑셀 기반 판정 계산", en: "The spreadsheet-based verdict calculation of internal tool v1.2" } }
      ]
    },
    link: {
      cap101: { ko: "필수 자료가 갖춰져도 확정 전에는 현장·문서 확인이 남습니다. 이 예시에서는 현 조건보다 이익이 나는 조치가 아직 표시되지 않습니다.", en: "Even with the required data in, site and document checks remain before confirmation. In this example, no action yet shows a gain over the current terms." }
    },
    s1: {
      cardCap: { ko: "명함 정보 면 · 가명과 예시 정보로 재구성", en: "Card back · rebuilt with a placeholder name and details" }
    },
    close: {
      label: { ko: "자동 계산과 전문가 확인의 범위", en: "What the calculation does, and what the expert confirms" },
      rows: [
        { k: { ko: "자동 계산이 맡는 범위", en: "The calculation" }, v: { ko: "예비 판정, 회생 가능성 점수(0–100, 확인되지 않은 자료가 있으면 범위로 표시), 24개월 안 임대 가능성(%), 조치 비용을 뺀 경제성 금액. 점수는 비교와 우선순위를 위한 지표이며 임대 확률이 아닙니다", en: "Preliminary verdict, recovery score (0–100, shown as a range while data is unconfirmed), 24-month leasing chance (%), and whether an action still pays after its cost. The score is for comparing and prioritising; it is not a probability" } },
        { k: { ko: "전문가가 확정하는 범위", en: "The expert's confirmation" }, v: { ko: "자료를 보완한 뒤 공실 진단 전문가가 현장과 문서를 확인해야 확정 판정으로 기록합니다", en: "Only after the data is filled in and the vacancy-diagnosis expert checks the site and documents is a verdict recorded as confirmed" } },
        { k: { ko: "이 공개 페이지", en: "This public page" }, v: { ko: "미리 계산한 가상 호실 8개의 결과를 골라 보기만 합니다. 입력·재계산·확정은 하지 않습니다", en: "Only lets you pick and read prepared results for 8 fictional units; no input, recalculation or confirmation" } },
        { k: { ko: "전체 도구 시연", en: "Full-tool demo" }, v: { ko: "현장 필터와 호실 선택, 예비 판정·근거, 빠른 확인 항목 입력에 따른 판정 변화, 우선 조치를 시연 영상으로 보여줍니다. 전체 내부 도구에서는 물건 목록 입력, 자료 보완과 재계산, 전문가 확인 후 확정까지 합니다", en: "The recording shows the site filter and unit choice, preliminary verdict and reasons, the verdict changing as quick answers are entered, and actions first. The full internal tool also takes the unit list, refills data and recalculates, and confirms after the expert check" } },
        { k: { ko: "모바일 앱", en: "Mobile app" }, v: { ko: "Rent Scan v0.7.1 · 휴대폰 화면 시연 영상으로만 공개, 예시(가상) 데이터", en: "Rent Scan v0.7.1 · shown only as a phone-screen demo recording, with example (fictional) data" } },
        { k: { ko: "버전", en: "Version" }, v: { ko: "판정 계산은 기존 내부 도구 v1.2, 판정 명칭은 고객용 설명 자료의 표기를 따릅니다", en: "Calculation from internal tool v1.2; verdict names follow the client-facing material" } }
      ]
    }
  };

  /* ───────────── Make It! ─────────────
     top: the Artist's Original Drawing → the 3D Model Based on the Original Drawing → the question for the maker
     story: why → the limits I met → why creators and makers don't meet → one product, one workspace → v1 · reply · v2 → try it */
  C.makeit = {
    hero: {
      line: { ko: "제 원화를 제품으로 만들려다, 개인 창작자가 제조업체를 만나기까지 어디서 막히는지 알게 됐습니다.", en: "Trying to turn my own drawing into a product, I found where an individual creator gets stuck before ever reaching a maker." },
      intro: { ko: "학생 작가의 작품을 상품으로 만들어보고 싶어 제 원화부터 입체로 옮겨봤습니다. 형태를 만드는 데서 끝나지 않았습니다. 공정과 수량, 예산에 맞는 업체를 찾고, 아직 정하지 못한 사양을 설명하고, 답변을 받아 다시 고쳐야 했습니다. 저처럼 혼자 제작을 시작하는 창작자도 이 과정에서 막힐 수 있다고 보고, 개인 디자이너와 로컬 제조업체가 하나의 문의서를 바탕으로 제작 조건을 함께 맞춰가는 작업 공간을 만들었습니다.", en: "Wanting to turn student artists' work into products, I started by taking my own drawing into 3D. Making the form wasn't the end of it: I had to find a maker that fit the process, quantity and budget, explain specs I hadn't settled yet, and revise after the reply. Seeing that a creator starting production alone could get stuck in the same places, I built a workspace where individual designers and local makers settle the production terms together, around a single brief." },
      app: { ko: "체험해보기", en: "Try it" },
      tryLead: { ko: "예시 프로젝트를 열고, 사양 정리부터 제작 문의서 작성, 업체 비교, 예시 회신에 따른 사양 수정까지 체험해보세요.", en: "Open the sample project and go from organising the specs to writing the build brief, comparing makers, and revising the specs after a sample reply." },
      tryStatus: { ko: "준비된 작가 원화 예시로 진행합니다. 업체·견적·회신은 예시이며 실제로 발송하지 않습니다. 언어 모델은 아직 연결하지 않았고, 서비스는 출시 전입니다.", en: "It runs on the prepared Artist’s Original Drawing example. Makers, quotes and replies are samples and nothing is actually sent. No language model is connected yet, and the service has not launched." }
    },
    lead: {
      drawing: { ko: "작가 원화", en: "Artist’s Original Drawing" },
      model: { ko: "작가 원화를 바탕으로 만든 3D 모델", en: "3D Model Based on the Original Drawing" },
      askT: { ko: "제조업체에 물어볼 질문", en: "The question for the maker" },
      ask: { ko: "가는 가지를 살리려면 최소 두께가 얼마나 필요할까요?", en: "To keep the thin branch, how thick does it need to be at minimum?" },
      briefT: { ko: "제작 문의서", en: "Build brief" },
      v1k: { ko: "v1 · 업체에 묻기", en: "v1 · Asking the maker" }, v1n: { ko: "초기 문의 수량 50개", en: "First enquiry: 50 pcs" },
      v2k: { ko: "v2 · 예시 회신 반영", en: "v2 · With the sample reply" }, v2a: [{ ko: "최소 두께 2 mm", en: "Min. thickness 2 mm" }, { ko: "문의 수량 100개", en: "Quantity 100 pcs" }],
      v2n: { ko: "몰드 비용을 고려한 수량 제안을 반영.", en: "Takes in a quantity suggested with mould cost in mind." },
      line: { ko: "개인 디자이너의 질문이 제조업체와 공유할 수 있는 사양으로 바뀌는 순간.", en: "The moment a solo designer's question becomes a spec a maker can share." },
      sampleNote: { ko: "두께와 수량은 메이킷 안내형 체험의 예시입니다. 실제 제조사 회신이나 생산 결과가 아닙니다.", en: "Thickness and quantity are examples from Make It!'s guided trial, not a real maker's reply or a production result." },
      askCap: { ko: "준비된 예시 문의서의 첫 질문", en: "The first question in the prepared sample brief" },
      mark: { ko: "같은 가는 가지를 가리키려고 원을 표시했습니다.", en: "The circles were added to point at the same thin branch." }
    },
    story: {
      label: { ko: "작가 원화에서 제조업체 연결까지", en: "From the Artist’s Original Drawing to connecting makers" },
      steps: [
        { k: "why", t: { ko: "상품화하고 싶었던 이유", en: "Why I wanted to make products" }, h: { ko: "학생 작가의 작품을 상품으로", en: "Student artists' work, as products" },
          p: [{ ko: "학생 작가들이 작품을 상품으로 만들어 판매하고, 미술 활동을 이어갈 수 있는 수익 경로를 찾고 싶었습니다. 작가 원화는 그 가능성을 제 작품으로 먼저 시험해 본 예입니다.", en: "I wanted student artists to be able to turn their work into products, sell them, and have an income that keeps their art going. The Artist’s Original Drawing is where I tested that with my own work first." }] },
        { k: "limits", t: { ko: "직접 제작하며 만난 제약", en: "The limits I met making it myself" }, h: { ko: "디자인과 제작 준비에 직접 개입해야 했다", en: "I had to step into the design and production prep myself" },
          p: [{ ko: "회화나 추상 조형을 하는 동료들에게는 형태·소재·제작 방식을 함께 설계할 사람이 필요했고, 당시에는 제가 그 역할을 맡아야 했습니다. 학교에서 빠르게 시도할 수 있던 3D 프린팅으로는 원하는 표면 품질과 생산 수량을 맞추기 어려웠습니다.", en: "Friends who paint or make abstract sculpture needed someone to work out form, material and process with them, and at the time that had to be me. The 3D printing I could try quickly at school couldn't reach the surface quality or the quantity we wanted." },
            { ko: "작가 원화의 가는 가지와 감긴 선은 입체로 옮기면 얇은 돌출부가 됩니다.", en: "The thin branches and coiled lines of the Artist’s Original Drawing become thin protrusions in 3D." }],
          ai: { t: { ko: "Tripo AI · 입체 모델링", en: "Tripo AI · 3D modelling" }, d: { ko: "작가 원화를 Tripo AI로 3D 모델로 만들어 입체 형태를 확인했고, 그 모델을 문의서의 첨부 자료로 씁니다.", en: "I turned the Artist’s Original Drawing into a 3D model with Tripo AI to see the form in three dimensions; the model goes with the brief as an attachment." } },
          mine: [{ ko: "‘가는 부분이 버틸 최소 두께’를 문의서의 첫 질문으로 정했습니다.", en: "I made ‘the minimum thickness thin parts can hold’ the brief's first question." }] },
        { k: "hard", t: { ko: "연결이 어려운 이유", en: "Why creators and makers don't meet" }, h: { ko: "조건에 맞는 제조업체를 찾는 일 자체가 어려웠다", en: "Finding a maker that fit was the hard part" },
          p: [{ ko: "생산하려면 공정·수량·예산·일정에 맞는 업체를 찾고 조건을 협의해야 했는데, 개인 창작자에게는 그 일 자체가 가장 큰 벽이었습니다. 크라우드펀딩은 제작비와 수요를 모아 생산으로 이어가기 위해 고려한 경로였으며, 실제 펀딩이나 생산은 진행하지 않았습니다.", en: "Production meant finding a maker that fits the process, quantity, budget and schedule and agreeing terms — for an individual creator, that was the biggest wall. Crowdfunding was a route I considered for gathering production money and demand; no funding or production actually took place." }],
          mine: [{ ko: "수량에 따라 맞는 공정이 달라지기 때문에(소량 3D 프린팅, 중간 수량 실리콘 몰드 캐스팅, 대량 금형 사출) 수량을 업체 비교의 첫 기준으로 두었습니다.", en: "Because the right process depends on quantity (3D printing for a few, silicone-mould casting for a medium run, injection moulding for volume), quantity is the first thing makers are compared on." }] },
        { k: "design", t: { ko: "한 제품 안에서 이어지는 설계", en: "One product, one thread" }, h: { ko: "사양 · 업체 · 회신을 한 제품 안에서 잇는다", en: "Specs, makers and replies, joined inside one product" },
          p: [{ ko: "한 제품 안에서 제작 조건 정리 → 업체 리스트나 내 디자인에 맞는 업체 보기 → 업체에 문의 → 회신 → 사양 수정이 이어지는 작업 공간을 만들었습니다.", en: "I built a workspace where, inside one product, organising the specs → browsing makers or seeing the ones that fit my design → enquiring → the reply → revising the specs all follow on." }],
          items: [
            { t: { ko: "한 제품, 한 작업 공간", en: "One product, one workspace" }, d: { ko: "여러 프로젝트를 나열하지 않고, 한 제품의 제작을 처음부터 이어가는 작업 공간으로 만들었습니다.", en: "Not a list of projects, but one workspace that carries a single product forward." } },
            { t: { ko: "업체는 두 가지로 찾는다", en: "Two ways to find makers" }, d: { ko: "전체 업체 리스트를 둘러보거나, 내 사양에 맞는 순서로 정렬된 업체와 맞는·안 맞는 이유를 볼 수 있습니다.", en: "Browse the full maker list, or see makers ranked against your specs with the reasons each one fits or doesn't." } },
            { t: { ko: "두 역할이 같은 문의서를 본다", en: "Both sides read the same brief" }, d: { ko: "디자이너와 제조업체가 같은 문의서와 수정 이력을 보며 무엇이 바뀌었는지 확인합니다.", en: "Designer and maker read the same brief and revision history and can see what changed." } }
          ],
          ai: { t: { ko: "앱 안에서는 규칙 계산", en: "Inside the app: rules, not a model" }, d: { ko: "언어 모델은 연결하지 않았습니다. 업체 추천은 공정·수량·기간·예산 조건을 비교하는 규칙으로 계산하고, 업체 회신은 준비된 예시입니다.", en: "No language model is connected. Maker matches are calculated by rules that compare process, quantity, lead time and budget; maker replies are prepared samples." } } },
        { k: "brief", t: { ko: "문의서 v1 · 예시 회신 · v2", en: "Brief v1 · sample reply · v2" }, h: { ko: "모르는 조건은 질문으로 남고, 회신이 같은 문의서의 사양을 바꿉니다.", en: "Unknown terms stay as questions, and the reply changes the specs of the same brief." },
          mine: [{ ko: "모르는 사양은 비워 두지 않고 질문으로 남기고, 업체 회신이 같은 문의서의 버전을 올리도록 설계했습니다.", en: "Specs the designer doesn't know are not left blank but kept as questions, and a maker's reply raises the version of the same brief." }] },
        { k: "try", t: { ko: "체험과 시연", en: "Try it, or watch" } }
      ]
    },
    exchange: {
      diffT: { ko: "v1 → v2에서 바뀐 사양", en: "What changed from v1 to v2" },
      diff: [
        { k: { ko: "가는 부분 최소 두께", en: "Min. thickness of thin parts" }, a: { ko: "질문으로 남김", en: "Left as a question" }, b: { ko: "2mm", en: "2 mm" } },
        { k: { ko: "수량", en: "Quantity" }, a: { ko: "50개", en: "50 pcs" }, b: { ko: "100개", en: "100 pcs" } }
      ],
      full: { ko: "전체 문의서 보기 · v1 · 예시 회신 · v2", en: "See the full brief · v1 · sample reply · v2" },
      v1note: { ko: "질문: 가는 부분의 최소 두께", en: "Question: minimum thickness of thin parts" },
      change: { ko: "변경: 최소 두께 2mm 추가 · 수량 50개 → 100개", en: "Changed: minimum thickness 2 mm added · quantity 50 → 100" },
      note: { ko: "준비된 작가 원화 예시의 문의서와 예시 회신입니다. 업체 이름·견적·회신 내용은 예시이며, 실제 업체에 보내거나 받은 기록이 아닙니다.", en: "The brief and sample reply from the prepared Artist’s Original Drawing example. Maker names, quotes and replies are samples, not records of anything sent to or received from a real maker." }
    },
    close: {
      label: { ko: "체험에서 볼 수 있는 것과 다음 확인", en: "What the trial shows, and the next check" },
      rows: [
        { k: { ko: "체험에서 확인할 수 있는 협의 흐름", en: "The negotiation the trial shows" }, v: { ko: "준비된 작가 원화 예시로 제작 조건 정리 → 업체 리스트·맞는 업체 → 업체에 예시 문의 → 예시 회신 → 사양 수정 → 공통 이력까지 이어서 볼 수 있습니다", en: "With the prepared Artist’s Original Drawing example: specs → maker list or best matches → sample enquiry → sample reply → revision → shared history, one after another" } },
        { k: { ko: "예시", en: "Sample" }, v: { ko: "업체, 견적 금액, 회신 내용은 예시입니다", en: "Makers, quote amounts and replies are samples" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "실제 발송, 결제, 업체 계정, 언어 모델 · 실제 생산·판매·펀딩 실적 없음", en: "Real sending, payment, maker accounts, language models · no real production, sales or funding yet" } },
        { k: { ko: "다음 확인", en: "Next check" }, v: { ko: "실제 제조업체가 이 문의서를 받았을 때 어떤 정보로 견적을 내고, 무엇을 다시 묻는지 확인하기", en: "When a real maker receives this brief: which details they quote from, and what they ask again" } }
      ]
    }
  };

  /* ───────────── Like this ─────────────
     top: the cartoon conversation, then plain translation → cultural context → what to ask next
     story: the real conversation → understanding vs. feeling close → why three readings on one screen → try it → early experiments */
  C.likethis = {
    hero: {
      line: { ko: "같은 문장을 이해해도, 같은 마음으로 듣는 건 아니었습니다.", en: "Understanding the same sentence didn't mean hearing it the same way." },
      intro: { ko: "유학 시절 현지 친구와 어린 시절 애니메이션을 이야기했습니다. 저는 뽀로로를, 친구는 사무라이 잭을 떠올렸습니다. 서로 어떤 작품을 봤는지는 말로 설명할 수 있었지만, 그 이야기로 가까워지는 데 더 중요했던 건 방과 후마다 만화를 기다리던 마음을 알아보는 일이었습니다. 그래서 표현의 뜻과 함께 상대에게 그 말이 어떤 기억을 불러오는지 살펴보고, 그 경험에 대해 한 걸음 더 물어볼 수 있는 도구를 만들었습니다.", en: "Studying abroad, I talked with a local friend about childhood cartoons. I thought of Pororo; my friend thought of Samurai Jack. We could explain which shows we had watched, but what brought us closer was recognising the feeling of waiting for a cartoon after school every day. So I built a tool that looks at what an expression means alongside the memory it brings back for the other person, and helps you ask one step further about that experience." },
      app: { ko: "체험해보기", en: "Try it" },
      tryLead: { ko: "예시 문장을 선택하고, 기본 번역과 문화적 맥락, 이어서 할 말을 비교해보세요.", en: "Pick a sample sentence and compare the plain translation, the cultural context and what to say next." },
      tryStatus: { ko: "결과는 직접 작성해 준비한 예시입니다. 자유 입력은 직접 작성한 다섯 표현의 맥락만 보여주며, 문장 전체 번역과 언어 모델은 연결하지 않았습니다. 출시 전입니다.", en: "Results are examples I wrote and prepared. Free input only shows context for five hand-written expressions; whole-sentence translation and language models are not connected. Not launched yet." },
      five: "Samurai Jack, 뽀로로, Saturday morning, This is fine, Bless your heart"
    },
    lead: {
      scene: { ko: "유학 시절 현지 친구와 어린 시절 애니메이션을 이야기했습니다. 저는 뽀로로를, 친구는 사무라이 잭을 떠올렸습니다. 같은 문장을 그대로 옮기는 것과, 그 말에 담긴 기억을 알아보는 것은 달랐습니다.", en: "Studying abroad, I talked with a local friend about childhood cartoons. I thought of Pororo; my friend thought of Samurai Jack. Putting the sentence into other words was one thing; recognising the memory inside it was another." }
    },
    talk: {
      items: [
        { t: "Pororo the Little Penguin", tlang: "en", ko: "뽀롱뽀롱 뽀로로", d: { ko: "2003년 EBS에서 처음 방영된 한국의 미취학 어린이용 3D 애니메이션. 제게 먼저 떠오른 작품입니다.", en: "A Korean 3D series for preschoolers, first aired on EBS in 2003 — the show that came to my mind first." } },
        { t: "Samurai Jack", tlang: "en", ko: "사무라이 잭", d: { ko: "2001년 카툰 네트워크에서 시작한 미국 애니메이션. 친구가 어린 시절 기다리던 작품으로 떠올렸습니다.", en: "An American series that began on Cartoon Network in 2001 — the show my friend remembered waiting for as a child." } }
      ],
      bridge: { ko: "두 작품의 위치는 같지 않습니다. 이어지는 것은 작품이 아니라 ‘매일 기다리던 만화가 있었다’는 경험입니다.", en: "The two shows don't sit in the same place. What connects them is not the show but the experience of having a cartoon you waited for every day." },
      cap: { ko: "실제 대화에서 나온 경험입니다.", en: "From the real conversation." }
    },
    read: {
      src: "Samurai Jack was my whole childhood — I watched it every day after school.",
      srcNote: { ko: "실제 경험을 바탕으로 다시 쓴 예문입니다. 실제 대사를 그대로 옮긴 것은 아닙니다.", en: "A sample sentence rewritten from the real experience; not a word-for-word quote of what was said." },
      label: { ko: "시연에 사용한 예문", en: "The demo sentence" },
      layers: [
        { from: "", t: { ko: "기본 번역", en: "Plain translation" }, head: { ko: "문장의 뜻을 이해한다", en: "You understand the sentence" }, d: { ko: "“사무라이 잭은 내 어린 시절 그 자체였어. 방과 후에 매일 봤거든.”", en: "“Samurai Jack was a big part of growing up for me; I watched it daily after school.”" } },
        { from: "Samurai Jack|every day after school", t: { ko: "문화적 맥락", en: "Cultural context" }, head: { ko: "어떤 기억인지 이해한다", en: "You understand which memory it is" }, d: { ko: "친구에겐 방과 후마다 기다리던 프로그램이었다. 내가 뽀로로를 떠올릴 때의 감정과 닮아 있었다.", en: "For my friend it was the show they waited for after school every day — the same feeling I have when I think of Pororo." } },
        { from: "", t: { ko: "이어서 할 말", en: "What to say next" }, head: { ko: "다음 질문이 달라진다", en: "The next question changes" }, d: { ko: "“나한텐 뽀로로가 그런 만화였어. 넌 사무라이 잭의 어떤 점이 그렇게 좋았어?”", en: "“Pororo was that show for me. What did you love so much about Samurai Jack?”" }, tag: "suggest" }
      ],
      line: { ko: "작품 제목의 뜻을 아는 데서 한 걸음 더 나아가, 친구가 그 기억을 다시 이야기할 수 있게 돕는다.", en: "Going one step past what the title means, so a friend can tell that memory again." }
    },
    story: {
      label: { ko: "실제 대화에서 한 화면의 비교까지", en: "From the real conversation to one screen" },
      steps: [
        { k: "talk", t: { ko: "실제 대화", en: "The real conversation" }, h: { ko: "나는 뽀로로를, 그 친구는 사무라이 잭을 떠올렸다.", en: "I thought of Pororo; my friend thought of Samurai Jack." } },
        { k: "gap", t: { ko: "뜻을 이해하는 것과 가까워지는 것", en: "Understanding vs. feeling close" }, h: { ko: "문장을 이해해도 대화는 이어지지 않았다", en: "Understanding the sentence didn't keep the conversation going" },
          p: [{ ko: "유학하며 학교 안팎에서 일하면서, 문장을 이해해도 상대가 공유하는 문화적 기억이나 정서를 모르면 대화를 이어가기 어렵다는 것을 경험했습니다.", en: "Studying and working on and off campus abroad, I found that even when I understood the sentence, I couldn't keep a conversation going without the cultural memories and feelings the other person shared." },
            { ko: "그 차이를 보여준 장면이 어린 시절 애니메이션 이야기였습니다. 작품은 달랐지만, 매일 기다리던 만화가 있었다는 경험은 통했습니다.", en: "The cartoon conversation showed the gap. The shows were different, but having a cartoon you waited for every day was something we shared." }],
          mine: [{ ko: "국적이나 세대로 사람을 단정하지 않고, ‘그럴 수 있다’는 배경으로만 설명한다는 기준을 정했습니다.", en: "I set a rule never to pin a person down by nationality or generation — only to offer it as possible background." }] },
        { k: "three", t: { ko: "세 가지를 한 화면에 둔 이유", en: "Why three readings on one screen" }, h: { ko: "기본 번역 → 문화적 맥락 → 이어서 물어볼 말", en: "Plain translation → cultural context → what to ask next" },
          p: [{ ko: "번역만으로는 뜻이, 맥락만으로는 배경이 남습니다. 대화를 이어가려면 그다음에 건넬 말까지 함께 보여야 했기 때문에, 세 가지를 한 화면에서 비교하도록 만들었습니다.", en: "A translation leaves you with the meaning, and context with the background. To keep the conversation going you also need what to say next, so the three sit side by side on one screen." }],
          items: [
            { t: { ko: "번역과 맥락을 나란히", en: "Translation and context side by side" }, d: { ko: "기본 번역을 버리지 않고 옆에 두어, 무엇이 더해졌는지 비교할 수 있게 했습니다.", en: "The plain translation stays, so you can see exactly what the context adds." } },
            { t: { ko: "상황에 따라 달라지는 답", en: "Replies that follow the situation" }, d: { ko: "어떤 사이인지, 그 말을 듣기 직전 무슨 일이 있었는지 고르면 이어서 할 말의 말투와 해석이 달라집니다.", en: "Choosing how close you are, and what happened right before, changes the tone and reading of the replies." } },
            { t: { ko: "사람을 국가로 단정하지 않기", en: "Don't reduce people to countries" }, d: { ko: "국가나 세대만으로 개인의 경험을 단정하지 않고, ‘그럴 수 있다’는 배경으로만 설명합니다.", en: "Nationality or generation is offered as possible background, never as a conclusion about a person." } }
          ],
          ai: { t: { ko: "앱 안에서는 직접 쓴 예시", en: "Inside the app: examples I wrote" }, d: { ko: "언어 모델이 작동하지 않습니다. 기본 번역·문화적 맥락·이어서 할 말은 모두 직접 작성한 예시입니다.", en: "No language model runs. The plain translations, cultural context and next lines are all examples I wrote." } },
          mine: [
            { ko: "기본 번역을 지우지 않고 옆에 두어, 맥락 설명이 무엇을 더하는지 비교할 수 있게 했습니다.", en: "The plain translation stays beside the context, so you can see exactly what the context adds." },
            { ko: "어떤 사이인지, 직전에 무슨 일이 있었는지에 따라 이어서 할 말의 말투가 달라지도록 상황 선택을 넣었습니다.", en: "Choosing the relationship and what just happened changes the tone of what to say next." }
          ] },
        { k: "try", t: { ko: "체험과 시연", en: "Try it, or watch" } },
        { k: "early", t: { ko: "초기 표현 실험과 제작 과정", en: "Early experiments and how it was made" }, h: { ko: "자연스러운 영어를 얻으려 GPT를 써보다", en: "Trying GPT for natural English" },
          p: [{ ko: "친구에게 초기 GPT-3를 소개받아, 학교 에세이에서 자연스러운 영어 표현을 얻으려 했습니다. 어색한 관용구와 표현을 어떻게 다룰지 고민했고, TOEFL 라이팅 템플릿처럼 문장을 모듈로 나눠 바꿔보려 했습니다.", en: "A friend introduced me to early GPT-3, and I tried to get natural English for school essays from it. I wondered how to deal with awkward idioms, and tried breaking sentences into modules to swap, like a TOEFL writing template." }],
          ai: { t: { ko: "GPT-3 · 표현 실험", en: "GPT-3 · phrasing experiments" }, d: { ko: "초기 GPT-3를 써보며 자연스러운 영어 표현을 얻으려 했고, 관용구와 어색한 표현을 어떻게 다룰지 고민한 경험에서 이 도구가 시작됐습니다.", en: "The tool began with trying early GPT-3 to get natural English, and thinking about how to handle idioms and awkward phrasing." } } }
      ]
    },
    close: {
      label: { ko: "다음 확인", en: "The next check" },
      q: { ko: "맥락을 알게 되면 상대에게 건네는 다음 말도 달라질까?", en: "Once you know the context, does what you say next change too?" },
      rows: [
        { k: { ko: "지금 체험 범위", en: "What the trial covers" }, v: { ko: "준비된 예시 문장·상황 선택, 기본 번역·문화적 맥락·이어서 할 말 비교, 답변 복사. 자유 입력은 직접 작성한 다섯 표현(Samurai Jack, 뽀로로, Saturday morning, This is fine, Bless your heart)의 맥락만 보여줍니다", en: "Prepared sample lines and situations, plain translation vs. cultural context vs. what to say next, copying a reply. Free input only shows context for the five hand-written expressions (Samurai Jack, Pororo, Saturday morning, This is fine, Bless your heart)" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "문장 전체 번역, 실시간 언어 모델", en: "Whole-sentence translation, live language models" } },
        { k: { ko: "확인 방법 제안", en: "A way to check" }, v: { ko: "같은 예문을 보여주되 한쪽에는 기본 번역만, 다른 쪽에는 문화적 맥락까지 보여준 뒤, 이어서 할 말 후보 중 어떤 답을 고르는지 비교합니다. 상대의 경험을 묻는 질문을 고르는 비율이 달라지는지, 맥락 설명이 지나친 해석으로 이어지지 않는지도 함께 봅니다", en: "Show the same sample sentence with only the plain translation to one group and with the cultural context to another, then compare which reply each picks from the options — whether more people choose a question about the other person's experience, and whether the context leads to over-reading" } }
      ]
    }
  };

  window.CONTENT = C;
})();
