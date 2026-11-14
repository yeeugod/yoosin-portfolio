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
      desc: { ko: "원화를 제품으로, 제작 조건 정리부터 업체 문의·사양 수정까지", en: "A drawing into a product: specs, a maker enquiry and the revision" } },
    { k: "likethis", color: "#F1C6D6", ink: "#1C1A18",
      title: { ko: ["이런 느낌"], en: ["Like this"] }, sub: null,
      desc: { ko: "기본 번역 옆에 문화적 맥락과 이어서 할 말", en: "Cultural context and what to say next, beside the plain translation" } },
    { k: "grown", color: "#F4AE97", ink: "#1C1A18",
      title: { ko: ["공실 상가", "진단 시스템"], en: ["Retail Vacancy", "Diagnosis System"] },
      tall: { ko: ["공실 상가", "진단", "시스템"], en: ["Retail", "Vacancy", "Diagnosis", "System"] },
      sub: { ko: "GROWN RECOVERY SCAN", en: "GROWN RECOVERY SCAN" }, subEn: true,
      desc: { ko: "가상 호실을 골라 예비 판정 예시 보기", en: "Pick a fictional unit and see its preliminary verdict" } },
    { k: "montauk", color: "#A7B6EC", ink: "#1C1A18",
      title: { ko: ["매뉴얼을 위한", "매뉴얼"], en: ["Manual for", "Manuals"] },
      sub: { ko: "MANUAL FOR MANUALS", en: "" }, subEn: true,
      desc: { ko: "직접 만든 조립 가이드에서 사내 가이드 제작 앱까지", en: "From a hand-made assembly guide to an in-house guide-making app" } },
    { k: "art", color: "#ECEDAA", ink: "#1C1A18",
      title: ["ART&", "DESIGN:)"], sub: null,
      desc: { ko: "미술학도의 이런저런 작업물들", en: "Odds and ends from an art student" } }
  ];

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
        d: { ko: "드로잉·회화·사진을 경험한 뒤 산업디자인을 전공하고 졸업했습니다(Presidential Scholarship). 2022년부터 2025년까지 학교 디지털 패브리케이션 스튜디오에서 레이저 커터와 3D 프린터 운영과 교육을 맡았습니다.", en: "After drawing, painting and photography, I majored in industrial design and graduated with a BFA (Presidential Scholarship). From 2022 to 2025 I ran and taught the laser cutters and 3D printers in the school's digital fabrication studio." } },
      { when: { ko: "2025–2026", en: "2025–2026" }, t: { ko: "졸업 후 디자인 실무 · 몬탁소파 시카고", en: "Design practice after graduating · Montauk Sofa Chicago" },
        d: { ko: "몬탁소파 시카고에서 디자인 인턴으로 일했습니다.", en: "Worked as a design intern at Montauk Sofa in Chicago." } },
      { when: { ko: "2026", en: "2026" }, t: { ko: "프리랜스 인테리어 디자인 렌더링 아티스트", en: "Freelance interior design rendering artist" },
        d: { ko: "인테리어 디자인 렌더링을 프리랜스로 작업했습니다.", en: "Worked freelance on interior design renderings." } },
      { when: { ko: "2026–현재", en: "2026–now" }, t: { ko: "IDSA 커뮤니티와 멘토링", en: "IDSA community and mentoring" },
        d: { ko: "학교 IDSA 커뮤니티에 소속되어 졸업 후에도 교수님들과 활동을 이어갔고, Meta에서 VR 헤드셋을 디자인하는 디자이너에게 멘토링을 받으며 디자인을 배웠습니다. 지금도 교수님, 디자이너들과 꾸준히 교류하고 있습니다.", en: "As part of my school's IDSA community I kept working with professors after graduating, and learned design through mentoring from a designer who designs VR headsets at Meta. I still stay in regular touch with professors and designers." } }
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

  /* ───────────── Every project opens with the same two short notes ─────────────
     ai.process: AI used while planning or making (tool and the job given to it)
     ai.app:     whether a model runs inside the app itself
     ai.mine:    what I observed, the criteria I chose by, and what I checked in the result (work with others is marked as such) */

  /* ───────────── Montauk ─────────────
     the job → why the next decision came → Montauk Manual Studio → the two guides compared, and what runs today → how it went, as one line */
  C.montauk = {
    hero: {
      line: { ko: "몬탁소파 데이베드의 조립·관리 가이드를 직접 만든 뒤, 제가 떠난 후에도 직원이 설명서 제작을 이어갈 수 있도록 사내 도구 Montauk Manual Studio를 만들었습니다.", en: "After making the assembly and care guide for the Montauk Sofa daybed by hand, I built an in-house tool, Montauk Manual Studio, so staff could keep making guides after I left." }
    },
    ai: {
      process: [{ t: { ko: "수작업 가이드의 도해", en: "Diagrams for the hand-made guide" }, d: { ko: "쇼룸에서 찍은 휴대폰 사진의 배경 정리와 도해 렌더링에 AI 보조를 썼습니다. 촬영, 선 굵기 규칙에 맞춘 도해 정리, InDesign 편집은 직접 했습니다.", en: "AI assistance for cleaning up the backgrounds of my showroom phone photos and rendering the diagrams. The shoot, tidying the diagrams to one line-weight rule, and the InDesign layout were mine." } }],
      app: { t: { ko: "사내 앱 안에서", en: "Inside the in-house app" }, d: { ko: "직원의 음성 답변은 브라우저 음성 인식으로 받아씁니다. 사진에서 새 도해를 만드는 생성과 문구 자동 편집은 아직 연결하지 않았고, 시연에서는 준비된 도해와 앱 버전 가이드를 씁니다.", en: "Staff's spoken answers are transcribed with the browser's speech recognition. Generating new diagrams from photos and editing text automatically are not connected yet; the demo uses prepared diagrams and the app-version guide." } },
      mine: [
        { ko: "직원들이 ‘한 번 안내할 때는 말로 하는 편이 빠르다’고 한 점을 보고, 글쓰기 대신 질문에 말하듯 답하는 입력으로 바꿨습니다.", en: "Staff said explaining out loud was faster for a single walkthrough, so input became answering questions as you would speak, not writing." },
        { ko: "조립·관리·안전 문구와 도해 규칙은 고정하고, 직원은 제품마다 달라지는 정보만 넣도록 나눴습니다.", en: "Assembly, care and safety text and the diagram rules stay fixed; staff only enter what changes from product to product." },
        { ko: "부품과 결합 위치·순서를 실물과 대조해 체크해야 가이드를 출력할 수 있게 했습니다.", en: "The guide can only be output after the parts, joins and order are checked against the real unit." }
      ]
    },
    s1: {
      label: { ko: "처음 맡은 일", en: "The job I was given" },
      h: { ko: "그래픽 디자이너로 조립·관리 가이드 제작을 의뢰받았습니다.", en: "I was commissioned, as a graphic designer, to make an assembly and care guide." },
      p: { ko: "쇼룸에서 데이베드를 휴대폰으로 직접 촬영하고, 사진의 배경 정리와 도해 렌더링에 AI 보조를 쓴 뒤, 도해를 정리하고 InDesign으로 편집해 고객용 가이드를 완성했습니다.", en: "I photographed the daybed in the showroom on my phone, used AI assistance to clean up the backgrounds and render the diagrams, then tidied the diagrams and laid out the customer guide in InDesign." },
      roles: [
        { k: { ko: "쇼룸 휴대폰 촬영", en: "Showroom phone shoot" }, v: { ko: "직접", en: "Me" } },
        { k: { ko: "배경 정리 · 도해 렌더링", en: "Background cleanup · diagram rendering" }, v: { ko: "AI 보조", en: "AI-assisted" } },
        { k: { ko: "도해 정리 · InDesign 편집", en: "Diagram tidy-up · InDesign layout" }, v: { ko: "직접", en: "Me" } }
      ],
      phone: { ko: "쇼룸에서 찍은 휴대폰 사진 · 2단계", en: "Showroom phone photo · step 2" },
      page: { ko: "직접 제작한 가이드 · 4쪽 (2단계 등쿠션 결합)", en: "The guide I made · p.4 (step 2, fitting the backrest)" }
    },
    turns: {
      label: { ko: "다음 결정이 생긴 이유", en: "Why each next decision came" },
      list: [
        { t: { ko: "반복되는 제작이 제 손에만 남아 있었다", en: "The repeat work lived only in my hands" },
          p: [{ ko: "가구가 바뀔 때마다 촬영·배경 정리·도해·편집을 처음부터 되풀이해야 했고, 그 과정은 제 숙련도에 기대고 있었습니다. 제가 떠나면 다음 가이드가 나오기 어렵다는 점이 먼저 보였습니다.", en: "Every new piece meant redoing the shoot, cleanup, diagrams and layout from scratch, and it depended on my skill. I could see that once I left, the next guide would be hard to make." }] },
        { t: { ko: "떠나기 전에 제작법을 넘기려 했다", en: "I tried to hand over the method before leaving" },
          p: [{ ko: "비자가 끝나 귀국하기 전, 촬영 방법, 필요한 정보, AI 도구 사용법, 편집 프리셋까지 정리한 ‘매뉴얼을 위한 매뉴얼’을 만들어 인수인계했습니다.", en: "Before my visa ended, I wrote a ‘manual for manuals’ — how to shoot, what information is needed, how to use the AI tools, the layout presets — and handed it over." }] },
        { t: { ko: "직원 입장에서는 말로 설명하는 편이 빨랐다", en: "For staff, explaining out loud was faster" },
          p: [{ ko: "고객과 CEO, 매니저는 가이드를 좋게 봤습니다. 다만 직원들은 현장에서 한 번 안내할 때는 말로 설명하는 편이 더 빠르다고 했습니다.", en: "Customers, the CEO and the manager liked the guide. Staff, though, said that for a single walkthrough on the floor, explaining out loud was faster." }] },
        { t: { ko: "그래도 고객에게 건넬 가이드는 누군가 만들어야 했다", en: "Still, someone had to make the guide customers take home" },
          p: [{ ko: "말은 현장에서 빠르지만, 고객이 집에서 다시 볼 수 있는 것은 문서였습니다. 그래서 직원이 말하듯 답하면 가이드 제작으로 이어지는 도구를 만들기로 했습니다.", en: "Talking is fast on the floor, but what a customer can read again at home is a document. So I set out to build a tool where staff answer as they would speak, and that carries on into making the guide." }] }
      ]
    },
    app: {
      label: { ko: "Montauk Manual Studio · 사내 도구", en: "Montauk Manual Studio · in-house tool" },
      h: { ko: "직원이 가구를 촬영하고 앱의 질문에 답하면, 그 답이 정리되어 도해와 가이드 제작으로 이어집니다.", en: "Staff photograph the piece and answer the app's questions; the answers are organised and carried on into the diagrams and the guide." },
      flow: [
        { ko: "새 작업 시작", en: "Start a new job" },
        { ko: "가구 촬영 또는 사진 선택", en: "Shoot the piece or pick photos" },
        { ko: "질문에 글이나 음성으로 답하기", en: "Answer the questions by text or voice" },
        { ko: "조립 순서·부품·주의점 정리", en: "Order, parts and cautions organised" },
        { ko: "가이드 미리보기", en: "Guide preview" },
        { ko: "PDF (앱 버전 가이드)", en: "PDF (the app-version guide)" }
      ],
      note: { ko: "사내 도구라 공개 페이지에서는 시연 영상으로 보여드립니다. 영상의 도해와 마지막 PDF는 준비된 앱 버전 가이드이며, 화면에 ‘준비된 예시’로 표시했습니다.", en: "It is an in-house tool, so this public page shows it as a demo recording. The diagrams and the final PDF in the video are the prepared app-version guide, and are marked ‘prepared example’ on screen." }
    },
    compare: {
      label: { ko: "두 가이드 비교", en: "The two guides, compared" },
      h: { ko: "같은 데이베드, 같은 8쪽 구성 — 직접 만든 가이드와 앱을 통한 가이드", en: "Same daybed, same eight pages — the guide I made, and the guide made through the app" },
      direct: { t: { ko: "직접 제작한 가이드", en: "The guide I made" }, d: { ko: "휴대폰 촬영 · AI 보조 렌더링 · InDesign 편집 · 영문·스페인어 8쪽", en: "Phone shoot · AI-assisted rendering · InDesign · 8 pages, English and Spanish" } },
      app: { t: { ko: "앱 버전 가이드", en: "The app-version guide" }, d: { ko: "Montauk Manual Studio 흐름의 결과 · 선 도해와 원형 상세도 · 영문·스페인어 8쪽", en: "Output of the Montauk Manual Studio flow · line diagrams and a circular detail · 8 pages, English and Spanish" } },
      pages: [
        { n: 1, t: { ko: "표지", en: "Cover" } }, { n: 2, t: { ko: "구성품", en: "Components" } },
        { n: 3, t: { ko: "1단계 · 받침 확인", en: "Step 1 · base" } }, { n: 4, t: { ko: "2단계 · 등쿠션 결합", en: "Step 2 · backrest" } },
        { n: 5, t: { ko: "3단계 · 좌석쿠션", en: "Step 3 · seat cushion" } }, { n: 6, t: { ko: "4단계 · 마무리", en: "Step 4 · finishing" } },
        { n: 7, t: { ko: "관리 방법", en: "Care" } }, { n: 8, t: { ko: "뒷표지", en: "Back cover" } }
      ],
      cap: { ko: "같은 쪽끼리 짝지었습니다. 앱 버전은 도해마다 부품 기호를 달고, 2단계의 결합 부분을 원형 상세도로 확대했습니다.", en: "Pages are paired by role. The app version labels every part in the diagrams and enlarges the step-2 join in a circular detail." }
    },
    scope: {
      label: { ko: "구현 범위", en: "What runs today" },
      rows: [
        { k: { ko: "실제로 동작", en: "Works" }, v: { ko: "새 작업 시작, 사진 촬영·선택, 질문에 글로 답하기, 음성 답변 받아쓰기(지원 브라우저), 답변을 조립 순서·부품·주의점으로 정리, 실물 대조 체크", en: "Starting a job, shooting or picking photos, typed answers, transcribing spoken answers (supported browsers), organising answers into order, parts and cautions, the check against the real unit" } },
        { k: { ko: "준비된 예시 사용", en: "Prepared examples" }, v: { ko: "데이베드의 도해, 가이드 미리보기와 출력 PDF(앱 버전 가이드)", en: "The daybed's diagrams, the guide preview and the output PDF (the app-version guide)" } },
        { k: { ko: "아직 연결하지 않음", en: "Not connected yet" }, v: { ko: "사진에서 새 도해 자동 생성, 문구 자동 편집", en: "Generating new diagrams from photos, editing text automatically" } },
        { k: { ko: "다음 확인", en: "Next check" }, v: { ko: "직원과 한 제품의 가이드를 처음부터 끝까지 함께 만들어 보기", en: "Make one product's guide end to end with a staff member" } }
      ]
    },
    flow: {
      label: { ko: "추가 작업 자료 · 한 줄로 본 흐름", en: "More material · the whole path in one line" },
      steps: [
        { img: "mk-ph-2", t: { ko: "쇼룸 휴대폰 촬영", en: "Showroom phone shoot" }, d: { ko: "정해진 각도로 단계마다 한 장씩 직접 찍었습니다.", en: "One shot per step from a fixed angle, taken myself." } },
        { img: "mkd-p4", kind: "direct", t: { ko: "직접 제작 가이드", en: "The guide I made" }, d: { ko: "AI 보조 렌더링과 InDesign 편집으로 완성한 8쪽 가이드.", en: "The 8-page guide, finished with AI-assisted rendering and InDesign." } },
        { img: "mkd-p1", t: { ko: "인수인계와 직원 피드백", en: "Handover and staff feedback" }, d: { ko: "가이드와 제작법을 넘겼고, 직원들은 현장에선 말이 더 빠르다고 했습니다.", en: "I handed over the guide and the method; staff said talking was faster on the floor." } },
        { img: "demo-montauk-poster", t: { ko: "사내 앱 제작", en: "Building the in-house app" }, d: { ko: "촬영과 질문 답변에서 가이드로 이어지는 Montauk Manual Studio.", en: "Montauk Manual Studio: from photos and answers to a guide." } },
        { img: "mkf-p4", kind: "app", t: { ko: "앱 버전 가이드", en: "The app-version guide" }, d: { ko: "앱 흐름의 결과로 정리한 8쪽 가이드.", en: "The 8-page guide that comes out of the app flow." } }
      ]
    }
  };

  /* ───────────── GROWN ─────────────
     one vertical story: the brand work → what I noticed → what I proposed → the tool I built; then score and scope */
  C.grown = {
    hero: {
      line: { ko: "GROWN의 브랜딩을 맡아 일하면서 공실 상가의 초기 진단과 반복 대조 업무를 보게 됐고, 엑셀 물건 목록에서 초기 진단을 자동화하자고 제안해 진단 시스템을 만들었고, 같은 흐름을 모바일 앱으로 확장했습니다.", en: "Working on GROWN's branding, I came to see the early diagnosis of vacant retail units and the repeated cross-checking behind it. I proposed automating the first diagnosis from the property spreadsheet, built the diagnosis system, and extended the same flow into a mobile app." },
      demoNote: { ko: "회사 관련 사정으로 전체 진단 도구는 시연 영상으로 소개합니다.", en: "For company-related reasons the full diagnosis tool is shown as a demo recording." }
    },
    mobile: {
      left: { ko: "기존 진단 시스템 시연", en: "The diagnosis system, demo" },
      right: { ko: "모바일 앱 시연", en: "The mobile app, demo" },
      lead: { ko: "초기 진단 절차를 웹에서 먼저 구현한 뒤, 같은 흐름을 휴대폰에서도 사용할 수 있도록 모바일 앱으로 확장했습니다.", en: "I built the early diagnosis process on the web first, then extended the same flow into a mobile app so it can be used on a phone too." },
      cap: { ko: "GROWN Rent Scan v0.7.1 · 휴대폰 화면에서 호실 정보를 입력하면 1층 적정 임대가 범위와 근거를 계산하고, 결과를 Recovery Scan 연동 값으로 넘깁니다. 영상의 수치는 앱에 들어 있는 예시(가상) 데이터입니다.", en: "GROWN Rent Scan v0.7.1 · Enter a unit on the phone and it estimates a ground-floor rent range with its reasons, then hands the result to Recovery Scan. Figures in the video come from the app's built-in example (fictional) data." }
    },
    ai: {
      process: [{ t: { ko: "진단 계산과 판정", en: "Diagnosis calculation and verdicts" }, d: { ko: "예비 판정은 기존 내부 도구 v1.2의 엑셀 기반 계산 규칙을 따릅니다. AI가 판정하는 구조가 아닙니다.", en: "The preliminary verdict follows the spreadsheet-based calculation rules of the existing internal tool v1.2. It is not an AI verdict." } }],
      app: { t: { ko: "이 공개 페이지", en: "This public page" }, d: { ko: "미리 계산해 둔 가상 호실 결과를 보여주기만 합니다. 모델이나 계산이 새로 실행되지 않습니다.", en: "It only shows results calculated in advance for fictional units. No model or calculation runs here." } },
      mine: [
        { ko: "브랜딩 작업 중 담당자가 받은 자료를 손으로 확인하고 대조하는 반복 업무를 관찰했습니다.", en: "During the branding work I watched staff check and cross-match the data they received by hand, over and over." },
        { ko: "엑셀 물건 목록으로 초기 진단을 자동화해 담당자가 회생 전략에 집중하도록 하자고 먼저 제안했습니다.", en: "I proposed automating the first diagnosis from the property spreadsheet so staff could focus on recovery strategy." },
        { ko: "질문·입력 순서와 결과 화면의 순서(예비 판정 → 근거 → 추가 확인 → 우선 조치)를 설계했고, 진단 질문의 구체화와 확정 전 확인 범위는 공실 진단 전문가와 함께 정했습니다(협업).", en: "I designed the question and input order and the result screen (preliminary verdict → reasons → further checks → actions first); the diagnostic questions and what must be checked before confirming were settled with the vacancy-diagnosis expert (collaboration)." }
      ]
    },
    story: {
      label: { ko: "브랜딩에서 자동화 제안까지", en: "From branding to a proposal for automation" },
      steps: [
        { k: "brand", t: { ko: "처음 맡은 일", en: "The job I was given" }, h: { ko: "GROWN의 BI·VI, 명함, 웹사이트", en: "GROWN's identity, business cards and website" },
          p: { ko: "공실 상가를 회생시키는 회사의 브랜드를 만들었습니다. 심벌과 로고, 색 체계, 명함, 웹사이트까지 맡았습니다.", en: "I built the brand for a company that brings vacant retail units back to life: symbol and logo, colour system, business cards and the website." } },
        { k: "noticed", t: { ko: "일하면서 알게 된 것", en: "What I noticed along the way" }, h: { ko: "회생 전략 앞에 놓인 반복 대조 업무", en: "Repeated cross-checking in front of the strategy" },
          p: { ko: "브랜드와 사업을 이해하면서 초기 진단 절차를 알게 됐습니다. 회생 전략을 세우기 전에, 고객이 보낸 물건 자료를 담당자가 손으로 확인하고 대조하는 데 시간과 인력이 들고 있었습니다.", en: "Getting to know the brand and the business, I learned the early diagnosis process. Before any recovery strategy, staff spent time checking and cross-matching the property data clients sent, by hand." } },
        { k: "proposed", t: { ko: "내가 제안한 것", en: "What I proposed" }, h: { ko: "엑셀 물건 목록에서 시작하는 초기 진단 자동화", en: "Automating the first diagnosis, starting from the spreadsheet" },
          p: { ko: "고객이 보내는 엑셀 물건 목록으로 자료 정리와 초기 진단을 자동화하자고 제가 먼저 제안했습니다. 반복 대조를 줄여 담당자가 회생 전략에 집중하도록 하는 것이 목적이었고, 공실 진단 전문가와 함께 구체화했습니다.", en: "I proposed using the spreadsheet clients send to automate the data clean-up and first diagnosis. The aim was to cut repeated cross-checking so staff could focus on the strategy; I worked it out with the vacancy-diagnosis expert." } },
        { k: "tool", t: { ko: "기존 진단 시스템 구현", en: "Building the diagnosis system" }, h: { ko: "계산이 멈추는 자리를 둔 진단 화면", en: "A diagnosis screen with a place where the calculation stops" },
          p: { ko: "빠지거나 확인되지 않은 자료가 있으면 계산만으로 판정을 확정할 수 없습니다. 그래서 자동 계산은 예비 판정까지만 내고, 자료를 보완한 뒤 전문가가 현장·문서를 확인해야 확정 판정으로 기록되도록 했습니다.", en: "With missing or unconfirmed data, a calculation alone can't settle a verdict. So the calculation stops at a preliminary verdict, and only after the data is filled in and the expert checks the site and documents is it recorded as confirmed." } }
,
        { k: "mobile", t: { ko: "모바일 앱으로 확장", en: "Extending it into a mobile app" }, h: { ko: "같은 흐름을 휴대폰에서", en: "The same flow, on a phone" } }
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
      label: { ko: "미리 계산한 가상 호실 예시", en: "Fictional units, calculated in advance" },
      h: { ko: "호실을 고르면, 그 호실의 예비 판정 → 근거 → 추가 확인 → 우선 조치가 이어집니다.", en: "Pick a unit and its preliminary verdict → reasons → further checks → actions first follow." },
      note: { ko: "아래 8개 호실은 가상 예시이며, 기존 내부 도구 v1.2의 계산으로 미리 구한 결과입니다. 이 페이지에서는 호실을 골라 결과를 보는 것만 할 수 있고, 입력·재계산·확정은 전체 내부 도구에서만 합니다.", en: "The 8 units below are fictional, with results calculated in advance by the existing internal tool v1.2. Here you can only pick a unit and read its result; input, recalculation and confirmation happen only in the full internal tool." },
      cap101: { ko: "필수 자료가 갖춰져도 확정 전에는 현장·문서 확인이 남습니다. 이 예시에서는 현 조건보다 이익이 나는 조치가 아직 표시되지 않습니다.", en: "Even with the required data in, site and document checks remain before confirmation. In this example, no action yet shows a gain over the current terms." }
    },
    s1: {
      cardCap: { ko: "명함 정보 면 · 가명과 예시 정보로 재구성", en: "Card back · rebuilt with a placeholder name and details" }
    },
    s4: {
      label: { ko: "점수, 경제성, 판정", en: "Score, economics, verdict" },
      items: [
        { t: { ko: "점수는 비교와 우선순위를 위한 지표", en: "The score is for comparing and prioritising" }, d: { ko: "회생 가능성 점수(0–100)는 권고 조치 이후 24개월 안의 임대 가능성과 실행 여건을 합친 값입니다. 임대 확률이 아니며, 확인되지 않은 자료가 있으면 범위로 보여줍니다.", en: "The recovery score (0–100) combines the chance of leasing within 24 months after the recommended action with how feasible that action is. It is not a probability, and shows as a range while data is unconfirmed." } },
        { t: { ko: "임대 가능성은 따로", en: "Leasing chance, stated on its own" }, d: { ko: "24개월 안 임대 가능성은 점수와 별도의 퍼센트로 보여줍니다.", en: "The chance of leasing within 24 months is shown as its own percentage." } },
        { t: { ko: "경제성은 점수와 따로", en: "Economics shown separately" }, d: { ko: "조치 비용을 빼고도 현 조건보다 이익이 나는지는 점수에 섞지 않고 별도의 금액으로 보여줍니다.", en: "Whether an action still pays after its cost is shown as its own amount, not folded into the score." } },
        { t: { ko: "예비 판정과 확정 판정", en: "Preliminary vs. confirmed" }, d: { ko: "자동 계산은 예비 판정까지입니다. 자료가 보완되고 전문가가 확인한 뒤에야 확정 판정으로 기록합니다.", en: "Automatic calculation stops at a preliminary verdict. It becomes confirmed only after the data is filled in and the expert checks it." } }
      ]
    },
    s5: {
      label: { ko: "전체 내부 도구와 공개 페이지의 범위", en: "The full internal tool vs. this public page" },
      rows: [
        { k: { ko: "전체 내부 도구", en: "Full internal tool" }, v: { ko: "물건 목록 입력, 현장·판정 필터, 자료 보완과 재계산, 전문가 확인 후 확정", en: "Unit list input, site and verdict filters, filling in data and recalculating, confirming after the expert check" } },
        { k: { ko: "시연 영상", en: "Demo recording" }, v: { ko: "현장 필터와 호실 선택, 예비 판정·근거, 빠른 확인 항목 입력에 따른 판정 변화, 우선 조치", en: "Site filter and unit choice, preliminary verdict and reasons, the verdict changing as quick answers are entered, actions first" } },
        { k: { ko: "모바일 앱", en: "Mobile app" }, v: { ko: "Rent Scan v0.7.1 · 휴대폰 화면 시연 영상으로만 공개, 예시(가상) 데이터", en: "Rent Scan v0.7.1 · shown only as a phone-screen demo recording, with example (fictional) data" } },
        { k: { ko: "이 공개 페이지", en: "This public page" }, v: { ko: "미리 계산한 가상 호실 8개의 결과를 골라 보기만 합니다. 입력·재계산·확정은 하지 않습니다", en: "Only lets you pick and read prepared results for 8 fictional units; no input, recalculation or confirmation" } },
        { k: { ko: "버전", en: "Version" }, v: { ko: "판정 계산은 기존 내부 도구 v1.2, 판정 명칭은 고객용 설명 자료의 표기를 따릅니다", en: "Calculation from internal tool v1.2; verdict names follow the client-facing material" } }
      ]
    }
  };

  /* ───────────── Make It! ─────────────
     the purpose first → AI and my judgement → how it started (student artists → A10) → brief and reply → try it → decisions and scope */
  C.makeit = {
    hero: {
      line: { ko: "학생 작가의 작품을 상품으로 만들어 팔 방법을 찾다가, 개인 창작자가 제품 조건에 맞는 제조업체를 찾아 협의하는 일 자체가 어렵다는 것을 알게 됐습니다. 그 발견이 개인 디자이너와 로컬 제조업체를 연결하는 플랫폼, Make It!으로 이어졌습니다.", en: "Looking for a way to turn student artists' work into products to sell, I found that for an individual creator, finding a maker that fits the product and negotiating with them is itself the hard part. That led to Make It!, a platform connecting individual designers with local makers." },
      app: { ko: "체험해보기", en: "Try it" },
      tryLead: { ko: "예시 프로젝트를 열고, 사양 정리부터 제작 문의서 작성, 업체 비교, 예시 회신에 따른 사양 수정까지 체험해보세요.", en: "Open the sample project and go from organising the specs to writing the build brief, comparing makers, and revising the specs after a sample reply." },
      tryStatus: { ko: "준비된 원화 예시로 진행합니다. 업체·견적·회신은 예시이며 실제로 발송하지 않습니다. 언어 모델은 아직 연결하지 않았고, 서비스는 출시 전입니다.", en: "It runs on the prepared drawing example. Makers, quotes and replies are samples and nothing is actually sent. No language model is connected yet, and the service has not launched." }
    },
    ai: {
      process: [{ t: { ko: "Tripo AI · 원화 입체 모델", en: "Tripo AI · a 3D model of the drawing" }, d: { ko: "작가 원화를 Tripo AI로 3D 모델로 만들어 입체 형태를 확인했고, 그 모델을 문의서의 첨부 자료로 씁니다.", en: "I turned the artist's original drawing into a 3D model with Tripo AI to see the form in three dimensions, and the model goes with the brief as an attachment." } }],
      app: { t: { ko: "앱 안에서", en: "Inside the app" }, d: { ko: "언어 모델은 연결하지 않았습니다. 업체 추천은 공정·수량·기간·예산 조건을 비교하는 규칙으로 계산하고, 업체 회신은 준비된 예시입니다.", en: "No language model is connected. Maker matches are calculated by rules that compare process, quantity, lead time and budget; maker replies are prepared samples." } },
      mine: [
        { ko: "원화의 가는 가지와 감긴 선이 입체에서는 얇은 돌출부가 된다는 점을 보고, ‘가는 부분이 버틸 최소 두께’를 문의서의 첫 질문으로 정했습니다.", en: "Seeing that the drawing's thin branches and coiled lines become thin protrusions in 3D, I made ‘the minimum thickness thin parts can hold’ the brief's first question." },
        { ko: "수량에 따라 맞는 공정이 달라지기 때문에(소량 3D 프린팅, 중간 수량 실리콘 몰드 캐스팅, 대량 금형 사출) 수량을 업체 비교의 첫 기준으로 두었습니다.", en: "Because the right process depends on quantity (3D printing for a few, silicone-mould casting for a medium run, injection moulding for volume), quantity is the first thing makers are compared on." },
        { ko: "모르는 사양은 비워 두지 않고 질문으로 남기고, 업체 회신이 같은 문의서의 버전을 올리도록 설계했습니다.", en: "Specs the designer doesn't know are not left blank but kept as questions, and a maker's reply raises the version of the same brief." }
      ]
    },
    turns: {
      label: { ko: "학생 작가의 작품에서 제조업체 연결까지", en: "From student artists' work to connecting makers" },
      list: [
        { t: { ko: "학생 작가의 작품을 상품으로", en: "Student artists' work, as products" },
          p: [{ ko: "학생 작가들이 작품을 상품으로 만들어 판매하고, 미술 활동을 이어갈 수 있는 수익 경로를 찾고 싶었습니다. 원화는 그 가능성을 제 작품으로 먼저 시험해 본 예입니다.", en: "I wanted student artists to be able to turn their work into products, sell them, and have an income that keeps their art going. The drawing is where I tested that with my own work first." }] },
        { t: { ko: "디자인과 제작 준비에 직접 개입해야 했다", en: "I had to step into the design and production prep myself" },
          p: [{ ko: "회화나 추상 조형을 하는 동료들에게는 형태·소재·제작 방식을 함께 설계할 사람이 필요했고, 당시에는 제가 그 역할을 맡아야 했습니다. 학교에서 빠르게 시도할 수 있던 3D 프린팅으로는 원하는 표면 품질과 생산 수량을 맞추기 어려웠습니다.", en: "Friends who paint or make abstract sculpture needed someone to work out form, material and process with them, and at the time that had to be me. The 3D printing I could try quickly at school couldn't reach the surface quality or the quantity we wanted." }] },
        { t: { ko: "조건에 맞는 제조업체를 찾는 일 자체가 어려웠다", en: "Finding a maker that fit was the hard part" },
          p: [{ ko: "생산하려면 공정·수량·예산·일정에 맞는 업체를 찾고 조건을 협의해야 했는데, 개인 창작자에게는 그 일 자체가 가장 큰 벽이었습니다. 크라우드펀딩은 제작비와 수요를 모아 생산으로 이어가기 위해 고려한 경로였으며, 실제 펀딩이나 생산은 진행하지 않았습니다.", en: "Production meant finding a maker that fits the process, quantity, budget and schedule and agreeing terms — for an individual creator, that was the biggest wall. Crowdfunding was a route I considered for gathering production money and demand; no funding or production actually took place." }] },
        { t: { ko: "개인 디자이너와 로컬 제조업체를 잇는 플랫폼", en: "A platform linking individual designers and local makers" },
          p: [{ ko: "그래서 한 제품 안에서 제작 조건 정리 → 업체 리스트나 내 디자인에 맞는 업체 보기 → 업체에 문의 → 회신 → 사양 수정이 이어지는 작업 공간을 만들었습니다.", en: "So I built a workspace where, inside one product, organising the specs → browsing makers or seeing the ones that fit my design → enquiring → the reply → revising the specs all follow on." }] }
      ]
    },
    toy: {
      cap: { ko: "원화는 이 문제를 직접 겪게 된 출발점입니다. 원화의 가는 가지와 감긴 선은 입체로 옮기면 얇은 돌출부가 되어, ‘가는 부분이 버틸 최소 두께’가 문의서의 첫 질문이 되었습니다.", en: "The drawing is where I ran into this problem myself. The drawing's thin branches and coiled lines become thin protrusions in 3D, so ‘the minimum thickness thin parts can hold’ became the brief's first question." }
    },
    exchange: {
      label: { ko: "문의서와 예시 회신", en: "Brief and sample reply" },
      h: { ko: "모르는 조건은 질문으로 남고, 회신이 같은 문의서의 사양을 바꿉니다.", en: "Unknown terms stay as questions, and the reply changes the specs of the same brief." },
      v1note: { ko: "질문: 가는 부분의 최소 두께", en: "Question: minimum thickness of thin parts" },
      change: { ko: "변경: 최소 두께 2mm 추가 · 수량 50개 → 100개", en: "Changed: minimum thickness 2 mm added · quantity 50 → 100" },
      note: { ko: "준비된 원화 예시의 문의서와 예시 회신입니다. 업체 이름·견적·회신 내용은 예시이며, 실제 업체에 보내거나 받은 기록이 아닙니다.", en: "The brief and sample reply from the prepared drawing example. Maker names, quotes and replies are samples, not records of anything sent to or received from a real maker." }
    },
    s3: {
      label: { ko: "디자인 결정", en: "Design decisions" },
      items: [
        { t: { ko: "한 제품, 한 작업 공간", en: "One product, one workspace" }, d: { ko: "여러 프로젝트를 나열하지 않고, 한 제품의 제작을 처음부터 이어가는 작업 공간으로 만들었습니다.", en: "Not a list of projects, but one workspace that carries a single product forward." } },
        { t: { ko: "업체는 두 가지로 찾는다", en: "Two ways to find makers" }, d: { ko: "전체 업체 리스트를 둘러보거나, 내 사양에 맞는 순서로 정렬된 업체와 맞는·안 맞는 이유를 볼 수 있습니다.", en: "Browse the full maker list, or see makers ranked against your specs with the reasons each one fits or doesn't." } },
        { t: { ko: "두 역할이 같은 문의서를 본다", en: "Both sides read the same brief" }, d: { ko: "디자이너와 제조업체가 같은 문의서와 수정 이력을 보며 무엇이 바뀌었는지 확인합니다.", en: "Designer and maker read the same brief and revision history and can see what changed." } }
      ]
    },
    s5: {
      label: { ko: "현재 작동하는 범위", en: "What works today" },
      rows: [
        { k: { ko: "체험", en: "Try it" }, v: { ko: "준비된 원화 예시로 제작 조건 정리 → 업체 리스트·맞는 업체 → 업체에 예시 문의 → 예시 회신 → 사양 수정 → 공통 이력", en: "With the prepared drawing example: specs → maker list or best matches → sample enquiry → sample reply → revision → shared history" } },
        { k: { ko: "예시", en: "Sample" }, v: { ko: "업체, 견적 금액, 회신 내용은 예시입니다", en: "Makers, quote amounts and replies are samples" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "실제 발송, 결제, 업체 계정, 언어 모델 · 실제 생산·판매·펀딩 실적 없음", en: "Real sending, payment, maker accounts, language models · no real production, sales or funding yet" } }
      ]
    }
  };

  /* ───────────── Like this ─────────────
     why: GPT and natural English → understanding sentences isn't enough → the childhood-cartoon conversation → one screen for three readings */
  C.likethis = {
    hero: {
      line: { ko: "유학 시절 현지 친구와 어린 시절 애니메이션을 이야기하며, 문장을 이해해도 상대가 공유한 문화적 기억을 모르면 대화를 이어가기 어렵다는 것을 느꼈습니다. 그래서 기본 번역 옆에 문화적 맥락과 이어서 할 말을 함께 비교하는 도구를 만들고자 했습니다.", en: "Talking with a local friend about childhood cartoons while studying abroad, I felt that even when you understand the sentence, you can't keep the conversation going without the cultural memories the other person shares. So I set out to make a tool that compares the plain translation with the cultural context and what to say next." },
      app: { ko: "체험해보기", en: "Try it" },
      tryLead: { ko: "예시 문장을 선택하고, 기본 번역과 문화적 맥락, 이어서 할 말을 비교해보세요.", en: "Pick a sample sentence and compare the plain translation, the cultural context and what to say next." },
      tryStatus: { ko: "결과는 직접 작성해 준비한 예시입니다. 자유 입력은 직접 작성한 다섯 표현의 맥락만 보여주며, 문장 전체 번역과 언어 모델은 연결하지 않았습니다. 출시 전입니다.", en: "Results are examples I wrote and prepared. Free input only shows context for five hand-written expressions; whole-sentence translation and language models are not connected. Not launched yet." },
      five: "Samurai Jack, 뽀로로, Saturday morning, This is fine, Bless your heart"
    },
    ai: {
      process: [{ t: { ko: "GPT · 출발점", en: "GPT · where it started" }, d: { ko: "초기 GPT-3를 써보며 자연스러운 영어 표현을 얻으려 했고, 관용구와 어색한 표현을 어떻게 다룰지 고민한 경험에서 이 도구가 시작됐습니다.", en: "The tool began with trying early GPT-3 to get natural English, and thinking about how to handle idioms and awkward phrasing." } }],
      app: { t: { ko: "앱 안에서", en: "Inside the app" }, d: { ko: "언어 모델이 작동하지 않습니다. 기본 번역·문화적 맥락·이어서 할 말은 모두 직접 작성한 예시입니다.", en: "No language model runs. The plain translations, cultural context and next lines are all examples I wrote." } },
      mine: [
        { ko: "기본 번역을 지우지 않고 옆에 두어, 맥락 설명이 무엇을 더하는지 비교할 수 있게 했습니다.", en: "The plain translation stays beside the context, so you can see exactly what the context adds." },
        { ko: "어떤 사이인지, 직전에 무슨 일이 있었는지에 따라 이어서 할 말의 말투가 달라지도록 상황 선택을 넣었습니다.", en: "Choosing the relationship and what just happened changes the tone of what to say next." },
        { ko: "국적이나 세대로 사람을 단정하지 않고, ‘그럴 수 있다’는 배경으로만 설명한다는 기준을 정했습니다.", en: "I set a rule never to pin a person down by nationality or generation — only to offer it as possible background." }
      ]
    },
    turns: {
      label: { ko: "왜 문화적 맥락 번역기를 만들었나", en: "Why a cultural-context translator" },
      list: [
        { t: { ko: "자연스러운 영어를 얻으려 GPT를 써보다", en: "Trying GPT for natural English" },
          p: [{ ko: "친구에게 초기 GPT-3를 소개받아, 학교 에세이에서 자연스러운 영어 표현을 얻으려 했습니다. 어색한 관용구와 표현을 어떻게 다룰지 고민했고, TOEFL 라이팅 템플릿처럼 문장을 모듈로 나눠 바꿔보려 했습니다.", en: "A friend introduced me to early GPT-3, and I tried to get natural English for school essays from it. I wondered how to deal with awkward idioms, and tried breaking sentences into modules to swap, like a TOEFL writing template." }] },
        { t: { ko: "문장을 이해해도 대화는 이어지지 않았다", en: "Understanding the sentence didn't keep the conversation going" },
          p: [{ ko: "유학하며 학교 안팎에서 일하면서, 문장을 이해해도 상대가 공유하는 문화적 기억이나 정서를 모르면 대화를 이어가기 어렵다는 것을 경험했습니다.", en: "Studying and working on and off campus abroad, I found that even when I understood the sentence, I couldn't keep a conversation going without the cultural memories and feelings the other person shared." }] },
        { t: { ko: "어린 시절 애니메이션 이야기", en: "The childhood-cartoon conversation" },
          p: [{ ko: "그 차이를 보여준 구체적인 장면이 현지 친구와 어린 시절 애니메이션을 이야기하던 순간이었습니다. 작품은 달랐지만, 매일 기다리던 만화가 있었다는 경험은 통했습니다.", en: "The moment that showed the gap was talking with a local friend about childhood cartoons. The shows were different, but having a cartoon you waited for every day was something we shared." }] },
        { t: { ko: "한 화면에서 세 가지를 비교하는 도구로", en: "A tool that compares three readings on one screen" },
          p: [{ ko: "그래서 기본 번역 → 문화적 맥락 → 이어서 할 말을 한 화면에서 비교하는 도구를 만들고자 했습니다.", en: "So I set out to build a tool that compares the plain translation → cultural context → what to say next, on one screen." }] }
      ]
    },
    talk: {
      label: { ko: "실제 대화", en: "The real conversation" },
      h: { ko: "나는 뽀로로를, 그 친구는 사무라이 잭을 떠올렸다.", en: "I thought of Pororo; my friend thought of Samurai Jack." },
      items: [
        { t: "Pororo the Little Penguin", tlang: "en", ko: "뽀롱뽀롱 뽀로로", d: { ko: "2003년 EBS에서 처음 방영된 한국의 미취학 어린이용 3D 애니메이션. 제게 먼저 떠오른 작품입니다.", en: "A Korean 3D series for preschoolers, first aired on EBS in 2003 — the show that came to my mind first." } },
        { t: "Samurai Jack", tlang: "en", ko: "사무라이 잭", d: { ko: "2001년 카툰 네트워크에서 시작한 미국 애니메이션. 친구가 어린 시절 기다리던 작품으로 떠올렸습니다.", en: "An American series that began on Cartoon Network in 2001 — the show my friend remembered waiting for as a child." } }
      ],
      bridge: { ko: "두 작품의 위치는 같지 않습니다. 이어지는 것은 작품이 아니라 ‘매일 기다리던 만화가 있었다’는 경험입니다.", en: "The two shows don't sit in the same place. What connects them is not the show but the experience of having a cartoon you waited for every day." },
      cap: { ko: "실제 대화에서 나온 경험입니다.", en: "From the real conversation." }
    },
    read: {
      label: { ko: "번역에서 다음 질문까지 · 시연용 예문", en: "From translation to the next question · demo sentence" },
      src: "Samurai Jack was my whole childhood — I watched it every day after school.",
      srcNote: { ko: "실제 대화를 바탕으로 앱에서 비교하기 위해 다시 쓴 예문입니다. 실제 대사를 그대로 옮긴 것은 아닙니다.", en: "Rewritten from the real conversation so the app can compare it; not a word-for-word quote of what was said." },
      layers: [
        { from: "", t: { ko: "기본 번역", en: "Plain translation" }, d: { ko: "사무라이 잭은 내 어린 시절 그 자체였어. 방과 후에 매일 봤거든.", en: "Samurai Jack was a big part of growing up for me; I watched it daily after school." },
          miss: { ko: "어린 시절의 추억이라는 뜻은 전달되지만, 어떤 작품이며 왜 특별한지는 아직 알기 어렵습니다.", en: "That it's a childhood memory comes across, but what the show is and why it mattered is still hard to tell." } },
        { from: "Samurai Jack|every day after school", t: { ko: "문화적 맥락", en: "Cultural context" }, d: { ko: "Samurai Jack은 2001년 카툰 네트워크에서 시작한 미국 애니메이션으로, 대사를 줄이고 화면과 소리로 긴장을 만드는 연출로 기억됩니다.", en: "Samurai Jack is an American series that began on Cartoon Network in 2001, remembered for sparse dialogue and tension built from images and sound." },
          miss: { ko: "‘방과 후 매일’이라는 말은 작품뿐 아니라 하루의 반복된 시간을 떠올리게 합니다. 다만 어떤 의미였는지는 상대에게 더 물어볼 수 있습니다.", en: "‘Every day after school’ brings back not just the show but a repeated time of day. What it meant, though, is something you can ask them." } },
        { from: "", t: { ko: "이어서 할 말", en: "What to say next" }, d: { ko: "What was it about Samurai Jack that hooked you?", en: "What was it about Samurai Jack that hooked you?" }, lang: "en",
          miss: { ko: "단정하지 않고 상대의 경험을 묻는 질문형 답변입니다.", en: "A question that asks about their experience instead of assuming it." } }
      ]
    },
    s3: {
      label: { ko: "해석 원칙", en: "Principles" },
      items: [
        { t: { ko: "번역과 맥락을 나란히", en: "Translation and context side by side" }, d: { ko: "기본 번역을 버리지 않고 옆에 두어, 무엇이 더해졌는지 비교할 수 있게 했습니다.", en: "The plain translation stays, so you can see exactly what the context adds." } },
        { t: { ko: "상황에 따라 달라지는 답", en: "Replies that follow the situation" }, d: { ko: "어떤 사이인지, 그 말을 듣기 직전 무슨 일이 있었는지 고르면 이어서 할 말의 말투와 해석이 달라집니다.", en: "Choosing how close you are, and what happened right before, changes the tone and reading of the replies." } },
        { t: { ko: "사람을 국가로 단정하지 않기", en: "Don't reduce people to countries" }, d: { ko: "국가나 세대만으로 개인의 경험을 단정하지 않고, ‘그럴 수 있다’는 배경으로만 설명합니다.", en: "Nationality or generation is offered as possible background, never as a conclusion about a person." } }
      ]
    },
    s4: {
      label: { ko: "범위와 다음 확인", en: "Scope and next check" },
      rows: [
        { k: { ko: "체험", en: "Try it" }, v: { ko: "준비된 예시 문장·상황 선택, 기본 번역·문화적 맥락·이어서 할 말 비교, 답변 복사", en: "Prepared sample lines and situations, plain translation vs. cultural context vs. what to say next, copying a reply" } },
        { k: { ko: "자유 입력", en: "Free input" }, v: { ko: "직접 작성한 다섯 표현(Samurai Jack, 뽀로로, Saturday morning, This is fine, Bless your heart)이 들어 있으면 그 표현의 맥락만 보여줍니다", en: "If your sentence contains one of the five hand-written expressions (Samurai Jack, Pororo, Saturday morning, This is fine, Bless your heart), only its context is shown" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "문장 전체 번역, 실시간 언어 모델", en: "Whole-sentence translation, live language models" } },
        { k: { ko: "다음 확인", en: "Next check" }, v: { ko: "맥락 설명이 이해를 돕는지, 과도한 해석을 유도하지 않는지 확인하기", en: "Check whether the context helps understanding without leading to over-reading" } }
      ]
    }
  };

  window.CONTENT = C;
})();
