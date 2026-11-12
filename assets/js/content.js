/* Site content in Korean and English. Project names, brand names and work titles stay as written.
   Facts follow the resume (Jan 2026) and the owner's own account; no years are given where they were not confirmed. */
(function () {
  "use strict";
  const C = {};

  C.cards = [
    { k: "about", color: "#E9E4F2", ink: "#1C1A18",
      title: ["About Me"], ko: "",
      desc: { ko: "SK 아이젠 1기 지원 포트폴리오", en: "Portfolio for SK AIGEN Cohort 1" } },
    { k: "art", color: "#E6F34B", ink: "#1C1A18",
      title: ["ART&", "DESIGN:)"], ko: "",
      desc: { ko: "미술학도의 이런저런 작업물들", en: "Odds and ends from an art student" } },
    { k: "montauk", color: "#2745F5", ink: "#FFFFFF",
      title: ["Manual for", "Manuals"], ko: "매뉴얼을 위한 매뉴얼",
      desc: { ko: "단순한 디자인 외주에서 앱 개발까지", en: "From a simple design commission to building an app" } },
    { k: "grown", color: "#FF4D23", ink: "#1C1A18",
      title: ["GROWN", "Recovery Scan"], tall: ["GROWN", "Recovery", "Scan"], ko: "공실 상가 진단 시스템",
      desc: { ko: "브랜딩 디자인에서 비즈니스 시스테마이징까지", en: "From brand design to systematising the business" } },
    { k: "makeit", color: "#A9E7CE", ink: "#1C1A18",
      title: ["Make It!"], ko: "메이크잇",
      desc: { ko: "아트토이에서 제조 연결까지 · 제작 문의서", en: "From art toy to factory, one build brief" } },
    { k: "likethis", color: "#F3B5CF", ink: "#1C1A18",
      title: ["Like this"], ko: "이런느낌",
      desc: { ko: "번역 옆에 문화적 맥락을 함께", en: "Cultural context next to the translation" } }
  ];

  C.ui = {
    open: { ko: "열기", en: "Open" },
    close: { ko: "닫기", en: "Close" },
    scroll: { ko: "스크롤해서 둘러보기", en: "Scroll to explore" },
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
    sub: { ko: "SK 아이젠 1기 지원 포트폴리오", en: "Portfolio for SK AIGEN Cohort 1" },
    view: {
      ko: "일을 하다 사람들이 멈칫하는 곳, 설명이 말로만 전해지는 곳에 관심이 있습니다. 그 사이에 빠진 연결을 찾아 물건과 이미지, 그리고 직접 써볼 수 있는 도구로 만듭니다.",
      en: "I pay attention to the moments where people hesitate at work, and to the things that only ever get explained out loud. I look for the link that is missing there, and turn it into an object, an image, or a tool people can actually use."
    },
    timeline: [
      { when: { ko: "2014–2015", en: "2014–2015" }, t: { ko: "여행 대안학교 로드스쿨러", en: "Road Schooler, an alternative travel school" },
        d: { ko: "2년 동안 이탈리아, 러시아, 중앙아시아, 제주도 등을 다니며 인문학, 철학, 문학, 사회학, 경제학을 배웠습니다.", en: "For two years we travelled through Italy, Russia, Central Asia, Jeju Island and more, studying humanities, philosophy, literature, sociology and economics." } },
      { when: { ko: "2016", en: "2016" }, t: { ko: "DMZ 다큐멘터리 워크숍", en: "DMZ documentary workshop" },
        d: { ko: "로드스쿨러를 마친 뒤 고3 무렵, 카메라를 들고 사람과 상황을 관찰하는 작업에 처음 참여했습니다. 청소년의 눈으로 바라본 사회의 모습을 제 시선으로 담아보고 싶었습니다.", en: "After Road Schooler, around my final year of high school, I first took part in work that meant observing people and situations through a camera. I wanted to capture, in my own way, how society looked through a teenager's eyes." } },
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
    links: [
      { href: "https://www.linkedin.com/in/yoosin-lee-893291333/", t: "LinkedIn" },
      { href: "https://www.yoosinlee.xyz", t: "yoosinlee.xyz" }
    ]
  };

  /* ───────────── Art & Design ───────────── */
  const g = (img, t, d, opt = {}) => Object.assign({ img, t, d }, opt);
  C.art = {
    lead: { ko: "형태와 재료, 이미지와 공간을 오가며 시도한 작업들입니다.", en: "Work that moves between form and material, image and space." },
    hint: { ko: "이미지를 누르면 크게 볼 수 있고, 같은 작품의 다른 컷으로 넘길 수 있습니다.", en: "Select an image to enlarge it and step through the other views of the same piece." },
    cats: [
      { k: "id", t: { ko: "산업디자인", en: "Industrial Design" }, projects: [
        { t: "Liquid Glass Eyewear", d: { ko: "미래적 아이웨어에 Y3K의 시각 언어를 결합한 제품 렌더링입니다. 녹아 흐르는 듯한 크롬 곡면으로 림과 다리를 한 덩어리로 잇고, 브리지 옆에 카메라 모듈을 넣었습니다. 착용 컷으로 얼굴 위의 비례를, 제품 컷으로 곡면과 디테일을 확인했습니다.", en: "Product renders pairing future-facing eyewear with a Y3K visual language. A chrome surface that looks almost molten runs the rims and temples into one piece, with a camera module set beside the bridge. The worn shots check the proportions on a face; the product shots check the surfaces and details." }, items: [
          // the two worn shots get the most room: full gallery width, side by side, never cropped
          g("eye-worn", { ko: "착용 · 정면", en: "Worn · front" }, null, { w: "w6", ar: "1494 / 2000", eager: true }),
          g("eye-worn-side", { ko: "착용 · 옆얼굴", en: "Worn · profile" }, null, { w: "w6", ar: "1494 / 2000", eager: true }),
          g("eye-hero", { ko: "제품 전체 · 3/4 각도", en: "Whole product · three-quarter" }, null, { w: "w8" }),
          g("eye-float", { ko: "제품 전체 · 기울인 구도", en: "Whole product · tilted" }, null, { w: "w4 tall" }),
          g("eye-front", { ko: "제품 전체 · 정면", en: "Whole product · front" }, null, { w: "w8" }),
          g("eye-detail", { ko: "디테일 · 카메라 모듈", en: "Detail · camera module" }, null, { w: "w4 tall" }),
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
        { t: "Vape Silencer", d: { ko: "손에 쥐는 납작한 플라스크 형태의 제품입니다. 브리프와 스케치로 사용 장면을 정리하고, CAD와 3D 프린트 시제품으로 손에 쥐는 크기와 캡 구조를 확인한 뒤, 크기 3종과 마감을 렌더와 제품 사진으로 비교했습니다.", en: "A flat, flask-shaped product held in the hand. Briefs and sketches set out how it is used; CAD and 3D-printed prototypes checked the size in the hand and the cap; then three sizes and several finishes were compared in renders and product photographs." }, items: [
          g("flask-hero", { ko: "제품 사진", en: "Product photograph" }, null, { w: "w8" }),
          g("id-flask-proto", { ko: "3차 작동 시제품", en: "Third working prototype" }, null, { w: "w4 tall" }),
          g("flask-front", { ko: "정면", en: "Front" }, null, { w: "w4" }),
          g("flask-side", { ko: "측면", en: "Side" }, null, { w: "w4" }),
          g("flask-copper", { ko: "코퍼 캡", en: "Copper cap" }, null, { w: "w4" }),
          g("flask-dark-trio", { ko: "크기 3종", en: "Three sizes" }, null, { w: "w6" }),
          g("id-flask-2", { ko: "마감 변형 3종", en: "Three finishes" }, null, { w: "w6" }),
          g("flask-fog-wide", { ko: "연기 연출 렌더", en: "Render with vapour" }, null, { w: "w8" }),
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
        { t: "Layered Lamp", d: { ko: "얇은 판을 층층이 쌓아 빛을 걸러내는 조명입니다. 종이 스케치에서 원통형과 사각형 구성을 비교했고, 베이스를 가공해 전자부를 넣은 작동 시제품으로 실제 점등 상태를 확인했습니다.", en: "A lamp that filters light through thin stacked layers. Paper sketches compared cylindrical and square versions; a working prototype, with a machined base holding the electronics, checked how it actually looks lit." }, items: [
          g("id-lamp-1", { ko: "점등 · 그러데이션", en: "Lit · gradient" }, null, { w: "w3" }),
          g("lamp-5th", { ko: "점등 · 화이트", en: "Lit · white" }, null, { w: "w3" }),
          g("id-lamp-2", { ko: "제품 사진", en: "Product photograph" }, null, { w: "w3" }),
          g("lamp-2nd", { ko: "위에서 본 모습", en: "From above" }, null, { w: "w3" }),
          g("lamp-dark-wide", { ko: "다크 스튜디오 컷", en: "Dark studio shot" }, null, { w: "w8" }),
          g("lamp-build-3", { ko: "작동 테스트", en: "Working test" }, null, { w: "w4 tall" }),
          g("lamp-build-1", { ko: "베이스 가공", en: "Machining the base" }, null, { w: "w3" }),
          g("lamp-build-2", { ko: "베이스 내부", en: "Inside the base" }, null, { w: "w3" }),
          g("lamp-build-4", { ko: "손에 든 시제품", en: "Prototype in hand" }, null, { w: "w3" }),
          g("id-lamp-3", { ko: "내부 전자부 구성", en: "Internal electronics" }, null, { w: "w3" }),
          g("id-lamp-sketch", { ko: "구조 스케치", en: "Structure sketch" }, null, { w: "w3", fit: "contain" }),
          g("lamp-paper-1", { ko: "종이 스케치", en: "Paper sketch" }, null, { w: "w3", fit: "contain" }),
          g("lamp-paper-2", { ko: "원통형 스케치", en: "Cylinder sketch" }, null, { w: "w3", fit: "contain" }),
          g("lamp-cyl", { ko: "원통형 정리 스케치", en: "Cylinder clean-up" }, null, { w: "w3", fit: "contain" }) ] },
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

  /* ───────────── Montauk ─────────────
     commission → repeat work that depended on me → handover manual → staff prefer talking → a tool you feed with photos
     → the diagram-generation wall → prepared diagrams + staff confirmation */
  C.montauk = {
    hero: {
      line: { ko: "설명서 제작 의뢰에서 시작해, 직원이 휴대폰으로 이어 만드는 제작 도구까지.", en: "From a commission to make a guide to a tool staff use on a phone to keep making them." },
      app: { ko: "Montauk Manual Studio 열기", en: "Open Montauk Manual Studio" },
      appNote: { ko: "사진 선택, 제품 정보, 도해 확인을 거쳐 7쪽 PDF 가이드를 만듭니다.", en: "Pick photos, add product details, check the diagrams, and get a 7-page PDF guide." }
    },
    album: {
      label: { ko: "핸드폰 앨범에서 어셈블리 가이드까지", en: "From the phone album to the assembly guide" },
      h: { ko: "쇼룸에서 찍은 사진이 일러스트레이션 가이드로 정리되기까지.", en: "How photos taken in the showroom became an illustrated guide." },
      steps: [
        { ph: "mk-ph-1", pg: "mkf-p3", t: { ko: "1단계 · 받침과 지지대", en: "Step 1 · base and rods" } },
        { ph: "mk-ph-2", pg: "mkf-p4", t: { ko: "2단계 · 등쿠션 결합", en: "Step 2 · fitting the backrest" } },
        { ph: "mk-ph-3", pg: "mkf-p5", t: { ko: "3단계 · 좌석쿠션", en: "Step 3 · seat cushion" } },
        { ph: "mk-ph-4", pg: "mkf-p6", t: { ko: "4단계 · 완성", en: "Step 4 · finished" } }
      ],
      phone: { ko: "휴대폰 원본 사진", en: "Phone photo" }, guide: { ko: "최종 어셈블리 가이드", en: "Final assembly guide" },
      note: { ko: "위는 쇼룸에서 휴대폰으로 찍은 원본 사진, 아래는 이를 바탕으로 직접 정리한 최종 어셈블리 가이드입니다. 이 가이드는 앱이 자동으로 만든 결과물이 아닙니다. 누르면 크게 볼 수 있습니다.", en: "Top: the original phone photos taken in the showroom. Bottom: the final assembly guide I drew up from them by hand — it was not generated by the app. Select any image to enlarge it." }
    },
    s1: {
      label: { ko: "처음 맡은 일", en: "The job I was given" },
      h: { ko: "그래픽 디자이너로 조립·관리 설명서 제작을 의뢰받았습니다.", en: "I was commissioned, as a graphic designer, to make assembly and care guides." },
      p: { ko: ["몬탁소파의 여러 가구에 고객에게 건넬 Assembly Guide를 만들었습니다. 데이베드의 경우 제품을 직접 촬영하고, 배경을 정리하고, AI 보조로 도해를 그린 뒤 InDesign으로 영문·스페인어 8쪽 가이드를 완성했습니다."],
           en: ["I made Assembly Guides for several Montauk Sofa pieces to hand to customers. For the daybed I photographed the product myself, cleaned up the backgrounds, drew the diagrams with AI assistance and laid out an 8-page guide in English and Spanish in InDesign."] },
      pagesCap: { ko: "최종 어셈블리 가이드 · 영문·스페인어 8쪽 · 누르면 크게 보기", en: "Final assembly guide · 8 pages, English and Spanish · select to enlarge" }
    },
    s2: {
      label: { ko: "사진에서 도해까지", en: "From photo to diagram" },
      h: { ko: "같은 제품, 같은 각도로 세 단계를 거칩니다.", en: "Same product, same angle, three steps." },
      steps: [
        { img: "mk-shoot", t: { ko: "촬영", en: "Shoot" }, d: { ko: "쇼룸에서 정해진 각도로 제품을 촬영했습니다. 모든 단계를 같은 카메라 각도로 맞췄습니다.", en: "I shot the product in the showroom from a fixed angle, and kept that angle for every step." } },
        { img: "mk-cutout", t: { ko: "배경 정리", en: "Clean the background" }, d: { ko: "배경과 반사를 지우고 제품 형태만 남겼습니다.", en: "Background and reflections removed, leaving only the product's form." } },
        { img: "mk-o-step2", t: { ko: "도해", en: "Diagram" }, d: { ko: "AI 보조로 선을 정리하고, 한 가지 선 굵기 규칙으로 조립 단계별 도해를 다시 그렸습니다.", en: "Lines cleaned up with AI assistance, then each assembly step redrawn to a single line-weight rule." } }
      ]
    },
    turns: {
      label: { ko: "다음 결정이 생긴 이유", en: "Why each next decision came" },
      list: [
        { t: { ko: "반복되는 제작이 제 손에만 남아 있었다", en: "The repeat work lived only in my hands" },
          p: [{ ko: "의뢰 범위는 설명서 제작이었습니다. 그런데 가구가 바뀔 때마다 촬영·배경 정리·도해·편집을 처음부터 되풀이해야 했고, 그 과정은 제 숙련도에 기대고 있었습니다.", en: "The commission was to make guides. But every new piece of furniture meant redoing the shoot, cleanup, diagrams and layout from scratch — and that process depended on my skill." },
              { ko: "따로 요청받은 일은 아니었지만, 제가 떠나면 다음 가이드가 나오기 어렵다는 점이 먼저 보였습니다.", en: "No one had asked about it, but I could see that once I left, the next guide would be hard to make." }] },
        { t: { ko: "떠나기 전에 제작법을 넘기다", en: "Handing over the method before leaving" },
          p: [{ ko: "비자가 끝나 귀국하기 전, 직원이 Adobe Creative Suite에 익숙하지 않아도 제작을 이어갈 수 있게 하자고 상사를 설득했습니다.", en: "Before my visa ended and I returned to Korea, I persuaded my manager that staff should be able to continue the work even without knowing Adobe Creative Suite." },
              { ko: "촬영 방법, 필요한 정보, AI 도구 사용법, 편집 프리셋까지 정리한 ‘매뉴얼을 위한 매뉴얼’을 만들어 인수인계했습니다.", en: "I wrote a ‘manual for manuals’ — how to shoot, what information was needed, how to use the AI tools, the layout presets — and handed it over." }] },
        { t: { ko: "현장에서는 말이 더 빨랐다", en: "On the floor, talking was faster" },
          p: [{ ko: "고객과 CEO, 매니저는 가이드를 좋게 봤습니다. 직원들은 한 번 안내할 때는 말로 설명하는 편이 더 편하다고 했습니다. 구두 설명은 그 자리에서 빠르고, 문서 가이드는 고객에게 건네 다시 볼 수 있는 자료로 남습니다.", en: "Customers, the CEO and the manager liked the guides. Staff said that for a single walkthrough, explaining out loud was easier. Talking is fast in the moment; a written guide is something a customer can take home and read again." },
              { ko: "둘 다 쓰임이 있었습니다. 다만 제작법을 정리한 뒤에도, 가이드 한 권을 만드는 데 드는 수고는 그대로 남아 있었습니다.", en: "Both had their place. But even with the method written down, the effort of making each guide was still there." }] },
        { t: { ko: "사진을 넣는 제작 도구로 바꾸다", en: "Turning it into a tool you feed with photos" },
          p: [{ ko: "그래서 직원이 휴대폰으로 사진과 제품 정보를 넣으면 설명서가 나오는 Montauk Manual Studio를 만들기 시작했습니다. 가장 큰 벽은 촬영한 사진을 그 제품에 맞는 새 조립 도해로 바꾸는 일이었습니다. 생성형 AI를 연결하는 방법, 생성할 때마다 드는 비용, 앱으로 구현하는 난도를 따져보며 후속 시도를 이어가고 있습니다.", en: "So I started building Montauk Manual Studio: staff add photos and product details on a phone and a guide comes out. The biggest wall was turning a photo into a new assembly diagram that fits that product. I'm continuing to try, weighing how to connect generative AI, what each generation costs, and how hard it is to build into an app." },
              { ko: "지금 해결한 범위는 이렇습니다. 데이베드는 준비된 제품별 도해와 원본 안내 문구에 직원이 넣은 사진과 정보를 더해 7쪽 PDF로 출력합니다. 도해가 없는 다른 가구는 사진·부품·순서를 직접 입력해 화면용 가이드를 만듭니다. 아무 사진에서나 새 도해를 만드는 기능은 아직 연결되어 있지 않습니다.", en: "What works today: for the daybed, the prepared diagrams and original guide text are combined with the staff's photos and details into a 7-page PDF. Other furniture without diagrams gets an on-screen guide from photos, parts and order entered by hand. Generating a new diagram from any photo is not connected yet." }] }
      ]
    },
    s4: {
      label: { ko: "디자인 결정", en: "Design decisions" },
      items: [
        { t: { ko: "가장 헷갈리는 동작을 도해의 중심에", en: "Put the most confusing move at the centre" }, d: { ko: "말로만 전해지던 결합 요령, 등쿠션의 구멍과 지지대를 맞추는 장면을 가장 크게 그렸습니다.", en: "The part that only ever got explained out loud — lining the grommets up with the rods — became the largest drawing." } },
        { t: { ko: "한 각도, 한 선 굵기", en: "One angle, one line weight" }, d: { ko: "모든 단계를 같은 카메라 각도와 같은 선 굵기 규칙으로 맞춰, 페이지를 넘겨도 제품이 같은 자리에 보이게 했습니다.", en: "Every step uses the same camera angle and line rule, so the product stays in place as pages turn." } },
        { t: { ko: "고정할 것과 입력할 것을 나누기", en: "Separate what is fixed from what is entered" }, d: { ko: "조립·관리·안전 문구는 원본 그대로 고정하고, 직원은 사진과 제품 정보만 넣도록 도구를 설계했습니다.", en: "Assembly, care and safety text stays exactly as in the original; staff only add photos and product details." } },
        { t: { ko: "제품별 도해와 직원 확인", en: "Per-product diagrams, confirmed by staff" }, d: { ko: "도해는 그 제품에 준비된 것만 연결합니다. 결합 위치와 순서는 직원이 실물과 대조해 체크하도록 해, 잘못된 조립 안내가 고객에게 나가지 않게 했습니다.", en: "Only the diagrams prepared for that product are linked. Staff tick off the joining points and order against the real unit, so a wrong instruction doesn't reach a customer." } }
      ]
    },
    s5: {
      label: { ko: "두 문서 넘겨보기", en: "Page through both" },
      outCap: { ko: "Manual Studio가 실제로 만든 PDF 7쪽 · 예시 사진으로 작성 · 누르면 크게 보기", en: "The 7-page PDF Manual Studio actually produced · made with the example photos · select to enlarge" }
    },
    s6: {
      label: { ko: "현재 작동하는 범위", en: "What works today" },
      rows: [
        { k: { ko: "작동", en: "Works" }, v: { ko: "촬영 안내, 사진 선택, 정보 입력, 부품·순서 확인, 원본 문구를 유지한 7쪽 PDF 생성 (Montauk Daybed)", en: "Shot guide, photo picking, details, parts and order check, 7-page PDF that keeps the original text (Montauk Daybed)" } },
        { k: { ko: "화면 가이드", en: "On-screen guide" }, v: { ko: "도해가 준비되지 않은 다른 가구는 사진·부품·순서로 화면용 가이드를 만듭니다", en: "Other furniture without prepared diagrams gets an on-screen guide from photos, parts and order" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "사진에서 새 도해 생성(생성형 AI 연동은 비용과 구현 난도를 검토하며 후속 시도 중), 문구 생성", en: "New diagrams from photos (generative AI is still being tried, weighing cost and build effort), text generation" } },
        { k: { ko: "다음 확인", en: "Next check" }, v: { ko: "직원과 한 제품의 가이드를 처음부터 끝까지 함께 만들어 보기", en: "Make one product's guide end to end with a staff member" } }
      ]
    }
  };

  /* ───────────── GROWN ─────────────
     brand work → manual cross-checking seen → proposal to automate the preliminary diagnosis → unconfirmed data → confirmation step */
  C.grown = {
    hero: {
      line: { ko: "브랜딩을 하며 본 수기 대조 절차를, 엑셀 목록에서 호실별 예비 판정까지 이어지는 진단 화면으로 옮겼습니다.", en: "I took the manual cross-checking I saw while doing GROWN's branding, and turned it into a screen that goes from a spreadsheet to a preliminary verdict for each unit." },
      sub: "C.P.V.A.S",
      app: { ko: "진단 화면 열기", en: "Open the diagnosis" },
      appNote: { ko: "예시 물건 목록에서 현장과 호실을 고르고, 예비 판정·근거·필요한 자료·다음 조치를 한 화면에서 봅니다.", en: "Pick a site and unit from a sample list, and read the preliminary verdict, reasons, missing data and next step on one screen." }
    },
    link: {
      label: { ko: "목록의 한 행이 판정이 되기까지", en: "From one row to a verdict" },
      h: { ko: "엑셀의 한 행을 고르면, 그 호실의 판정과 근거가 함께 바뀝니다.", en: "Pick a row from the spreadsheet and that unit's verdict and reasons change with it." },
      note: { ko: "시연 영상 속 진단 화면과 같은 v1.2 계산으로 바로 계산한 결과입니다. 현장과 수치는 가상 예시입니다.", en: "Calculated live with the same v1.2 engine as the diagnosis screen in the demo. Sites and figures are fictional samples." }
    },
    s1: {
      cardCap: { ko: "명함 정보 면 · 가명과 예시 정보로 재구성", en: "Card back · rebuilt with a placeholder name and details" }
    },
    turns: {
      label: { ko: "브랜딩에서 업무 개선 제안으로", en: "From branding to a proposal for the work itself" },
      list: [
        { t: { ko: "브랜드를 만들다 진단 절차를 보다", en: "Seeing the diagnosis process while building the brand" },
          p: [{ ko: "GROWN의 BI·VI, 명함, 웹사이트를 제작하면서 사업과 진단 절차를 알게 됐습니다. GROWN의 핵심 서비스는 공실 상가의 회생입니다.", en: "Making GROWN's identity, business cards and website, I came to know the business and its diagnosis process. GROWN's core service is bringing vacant retail units back to life." },
              { ko: "그런데 회생 전략을 세우기 전에, 받은 자료를 담당자가 손으로 확인하고 대조하는 데 시간과 인력이 들고 있었습니다.", en: "But before any recovery strategy, staff spent time checking and cross-matching the data they received by hand." }] },
        { t: { ko: "엑셀 한 장에서 예비 진단을 시작하자고 제안하다", en: "Proposing to start from one spreadsheet" },
          p: [{ ko: "고객이 보내는 엑셀 물건 목록을 받아 자료 정리와 예비 진단을 자동화하자고 제가 먼저 제안했고, 공실 진단 전문가와 함께 구체화했습니다.", en: "I proposed taking the spreadsheet of units a client sends and automating the data clean-up and preliminary diagnosis, and worked it out together with the vacancy-diagnosis expert." },
              { ko: "목적은 반복 확인을 줄여, 담당자가 회생 전략에 집중하도록 돕는 것이었습니다.", en: "The aim was to cut repeated checking so staff could focus on the recovery strategy." }] },
        { t: { ko: "확인되지 않은 자료 앞에 멈추는 자리를 두다", en: "A place to stop when data isn't confirmed" },
          p: [{ ko: "목록에 빠지거나 확인되지 않은 자료가 있으면 계산 결과만으로 판정을 확정하기 어렵습니다. 그래서 전문가와 진단 질문과 입력 순서를 정리하고, 자동 계산은 예비 판정까지만 내도록 했습니다.", en: "When data is missing or unconfirmed, a calculation alone can't settle a verdict. So with the expert I organised the diagnostic questions and input order, and the automatic calculation stops at a preliminary verdict." },
              { ko: "사용자가 필요한 자료를 보완하면 다시 계산하고, 전문가가 현장·문서를 확인한 뒤에야 확정 판정으로 기록합니다.", en: "When the user fills in what's needed it recalculates, and only after the expert checks the site and documents is it recorded as a confirmed verdict." }] }
      ]
    },
    s2: {
      label: { ko: "내가 맡은 세 가지", en: "The three things I did" },
      items: [
        { t: { ko: "진단 질문과 입력 순서 설계", en: "Diagnostic questions and input order" }, d: { ko: "전문가와 진단 질문을 정리하고 입력 순서를 설계했습니다. 일부 자료가 부족해도 예비 검토를 시작할 수 있게 하고, 확인되지 않은 항목은 결과에서 다시 볼 수 있게 했습니다.", en: "With the expert I organised the questions and designed the input order, so a preliminary review can start with some data missing, and unconfirmed items come back in the result." } },
        { t: { ko: "호실별 결과의 정보 위계", en: "Information hierarchy of a unit result" }, d: { ko: "예비 판정 → 근거 → 필요한 자료 → 우선 조치가 순서대로 읽히도록 결과를 설계했습니다.", en: "I designed the result to read in order: preliminary verdict → reasons → data needed → actions to take first." } },
        { t: { ko: "체험 화면 구현", en: "The working screen" }, d: { ko: "기존 진단 도구(v1.2)의 계산을 바탕으로, 현장·호실 목록에서 호실별 결과까지 보는 화면을 구현했습니다.", en: "On top of the existing diagnosis tool's (v1.2) calculation, I built the screen that goes from the site and unit list to each unit's result." } }
      ]
    },
    s4: {
      label: { ko: "점수, 경제성, 판정", en: "Score, economics, verdict" },
      items: [
        { t: { ko: "점수는 비교와 우선순위를 위한 지표", en: "The score is for comparing and prioritising" }, d: { ko: "회생 가능성 점수(0–100)는 권고 조치 이후 24개월 안의 임대 가능성과 실행 여건을 합친 값입니다. 임대 확률이 아니며, 확인되지 않은 자료가 있으면 범위로 보여줍니다.", en: "The recovery score (0–100) combines the chance of leasing within 24 months after the recommended action with how feasible that action is. It is not a probability, and shows as a range while data is unconfirmed." } },
        { t: { ko: "임대 가능성은 따로", en: "Leasing chance, stated on its own" }, d: { ko: "24개월 안 임대 가능성은 점수와 별도의 퍼센트로 보여줍니다. 점수가 높다고 임대 확률이 그만큼 높다는 뜻은 아닙니다.", en: "The chance of leasing within 24 months is shown as its own percentage. A high score does not mean an equally high probability of leasing." } },
        { t: { ko: "경제성은 점수와 따로", en: "Economics shown separately" }, d: { ko: "조치 비용을 빼고도 현 조건보다 이익이 나는지는 점수에 섞지 않고 별도의 금액으로 보여줍니다.", en: "Whether an action still pays after its cost is shown as its own amount, not folded into the score." } },
        { t: { ko: "예비 판정과 확정 판정", en: "Preliminary vs. confirmed" }, d: { ko: "자동 계산은 예비 판정까지입니다. 필요한 자료가 들어오고 전문가가 확인한 뒤에야 확정 판정으로 기록합니다.", en: "Automatic calculation stops at a preliminary verdict. It becomes confirmed only after the required data arrives and the expert checks it." } }
      ]
    },
    s5: {
      label: { ko: "현재 작동하는 범위", en: "What works today" },
      rows: [
        { k: { ko: "작동", en: "Works" }, v: { ko: "물건 목록 붙여넣기(엑셀 복사, CSV) · 현장·판정 필터 · 호실별 예비 판정·근거·필요한 자료·우선 조치 · 확인 항목 입력 시 재계산 · 현장 요약", en: "Paste a unit list (from Excel or CSV) · site and verdict filters · per-unit preliminary verdict, reasons, data needed and actions · recalculation as answers come in · site overview" } },
        { k: { ko: "버전", en: "Version" }, v: { ko: "판정 계산은 기존 내부 도구 v1.2와 같습니다. 판정 명칭은 고객용 설명 자료의 표기(우선 임대 추진 후보 · 회생 전략 검토 대상 · 정밀 확인 필요 · 추가 조치 비권고 · 판정보류)를 따릅니다", en: "The calculation is the same as internal tool v1.2. Verdict names follow the client-facing material (lease-first candidate · recovery strategy review · needs a closer check · no further action advised · on hold)" } },
        { k: { ko: "체험 범위", en: "Demo scope" }, v: { ko: "현장·호실·금액은 모두 가상의 예시입니다. 전문가 확인은 체험 화면에서 체크로 표시하는 데 그칩니다", en: "All sites, units and amounts are fictional. Expert confirmation is only marked with a check on screen" } }
      ]
    }
  };

  /* ───────────── Make It! ─────────────
     selling student artwork as products → A10 as a test → school 3D printing limits → finding makers and money
     → designers and local makers working on one brief */
  C.makeit = {
    hero: {
      line: { ko: "학생 작가의 작품을 상품으로 만들고 싶던 데서 시작해, 디자이너와 로컬 제조업체가 같은 문의서로 제작을 논의하는 작업 공간까지.", en: "It started with wanting student artwork to become products, and became a workspace where a designer and a local maker work out production on one shared brief." },
      app: { ko: "체험해보기", en: "Try it" },
      appNote: { ko: "준비된 예시를 따라 주요 흐름을 체험할 수 있습니다.", en: "Follow a prepared example through the main flow." }
    },
    exchange: {
      label: { ko: "문의서와 회신", en: "Brief and reply" },
      h: { ko: "아이디어가 소재·마감·수량 같은 생산 조건이 되고, 회신이 같은 프로젝트의 사양을 바꿉니다.", en: "An idea becomes production terms — material, finish, quantity — and a reply changes the specs of the same project." },
      note: { ko: "앱에서 실제로 만들어지는 문의서와 회신입니다. 업체 이름·견적·회신 내용은 예시입니다.", en: "The brief and reply as the app produces them. Maker names, quotes and replies are samples." }
    },
    turns: {
      label: { ko: "한 피규어에서 사람과 제작처를 잇기까지", en: "From one figure to connecting people and makers" },
      list: [
        { t: { ko: "작품을 상품으로, 작가가 작업을 이어가게", en: "Artwork into products, so artists can keep working" },
          p: [{ ko: "학생 작가들이 작품을 상품으로 만들어 판매하고, 미술 활동을 이어갈 수 있는 수익 경로를 만들어보고 싶었습니다. A10은 그 가능성을 제 작품으로 먼저 시험해 본 예입니다.", en: "I wanted student artists to be able to turn their work into products, sell them, and have an income that keeps their art going. A10 is where I tested that with my own work first." }] },
        { t: { ko: "학교 3D 프린터로는 닿지 않던 마감과 수량", en: "A finish and run size school printers couldn't reach" },
          p: [{ ko: "저는 Blender를 쓸 수 있었지만, 당시 실물 형태를 디지털로 옮기려면 직접 스캔하는 과정이 필요했습니다. 회화나 추상 조형을 하는 동료들에게는 작품을 어떤 제품으로 만들지부터 형태·소재·제작 방식을 함께 설계할 사람이 필요했고, 당시에는 제가 그 역할을 맡아야 했습니다.", en: "I could use Blender, but back then getting a physical form into digital meant scanning it myself. Friends who paint or make abstract sculpture needed someone to work out, with them, what product their work could become — form, material, process. At the time, that someone had to be me." },
              { ko: "학교에서 빠르게 시도할 수 있던 3D 프린팅으로는 원하는 마감과 생산 수량을 맞추기 어려웠습니다. 생산하려면 공정·수량·예산·일정에 맞는 업체를 찾고 제작비를 마련해야 했습니다. 크라우드펀딩은 시제품을 공개해 수요를 확인하고 생산비를 마련하는 단계로 보았습니다.", en: "The 3D printing I could try quickly at school couldn't reach the finish or quantity I wanted. Production meant finding a maker that fit the process, quantity, budget and schedule, and raising the money. I saw crowdfunding as the step where a prototype is shown, demand is confirmed, and production money is raised." }] },
        { t: { ko: "자기 이름으로 제품을 내려는 디자이너들의 문제로", en: "A problem for every designer launching under their own name" },
          p: [{ ko: "이 벽은 저만의 것이 아니었습니다. 학생·신입·프리랜스·현업 산업디자이너도 자기 이름으로 제품을 내놓으려 할 때 같은 문제를 만납니다. 그래서 개인 디자이너와 로컬 제조업체가 직접 만나 사양을 보완하고 제작을 논의하는 협업 공간으로 방향을 잡았습니다.", en: "The wall wasn't only mine. Student, junior, freelance and working industrial designers hit the same problem when they try to put out a product under their own name. So the direction became a shared space where an individual designer and a local maker meet directly, fill in the specs, and discuss production." },
              { ko: "지금 보여드리는 것은 A10 한 제품으로 그 흐름을 끝까지 이어본 작업 공간입니다. 실제 생산·판매·펀딩으로는 아직 이어지지 않았습니다.", en: "What you can try here is that flow carried through end to end for one product, A10. It has not gone into real production, sales or funding yet." }] }
      ]
    },
    s3: {
      label: { ko: "디자인 결정", en: "Design decisions" },
      items: [
        { t: { ko: "한 제품, 한 작업 공간", en: "One product, one workspace" }, d: { ko: "여러 프로젝트를 나열하지 않고, 한 제품의 제작을 처음부터 이어가는 작업 공간으로 만들었습니다.", en: "Not a list of projects, but one workspace that carries a single product forward." } },
        { t: { ko: "모르는 사양은 질문으로", en: "Unknown specs become questions" }, d: { ko: "디자이너가 모르는 항목은 비워두지 않고, 업체에 물어볼 질문으로 문의서에 남깁니다.", en: "Specs the designer doesn't know are not left blank; they go into the brief as questions for the maker." } },
        { t: { ko: "두 역할이 같은 문의서를 본다", en: "Both sides read the same brief" }, d: { ko: "디자이너와 제조업체가 같은 문의서와 같은 수정 이력을 보도록 해, 말이 엇갈리는 지점을 줄였습니다.", en: "Designer and maker see the same brief and the same revision history, so fewer things get lost between them." } }
      ]
    },
    s5: {
      label: { ko: "현재 작동하는 범위", en: "What works today" },
      rows: [
        { k: { ko: "작동", en: "Works" }, v: { ko: "사양 입력과 질문 정리, 문의서 생성·복사, 조건에 맞는 업체 후보와 추천 이유, 역할 전환, 보완 요청·예시 견적 회신, 사양 수정과 두 역할 공통 수정 이력", en: "Spec input and questions, brief generation and copy, maker matches with reasons, role switch, change requests and sample quotes, spec revision with a shared history" } },
        { k: { ko: "예시", en: "Sample" }, v: { ko: "업체, 견적 금액, 회신 내용은 예시입니다", en: "Makers, quote amounts and replies are samples" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "실제 발송, 결제, 업체 계정 · 실제 생산·판매·펀딩 실적 없음", en: "Real sending, payment, maker accounts · no real production, sales or funding yet" } }
      ]
    }
  };

  /* ───────────── Like this ─────────────
     GPT-3 for essays → awkward idioms → a modular rewrite idea that stalled → culture behind expressions → Pororo and Samurai Jack */
  C.likethis = {
    hero: {
      line: { ko: "어색한 표현을 고치려던 데서 시작해, 한 문장의 기본 번역·문화적 맥락·이어서 할 말을 나란히 보여주는 도구로.", en: "It began as fixing awkward phrasing, and became a tool that shows one sentence's plain translation, cultural context and what to say next, side by side." },
      app: { ko: "체험해보기", en: "Try it" },
      appNote: { ko: "준비된 예시를 따라 주요 흐름을 체험할 수 있습니다.", en: "Follow a prepared example through the main flow." }
    },
    read: {
      label: { ko: "한 문장을 네 겹으로", en: "One sentence, four layers" },
      h: { ko: "기본 번역만으로는 작품을 모르는 사람이 무엇을 놓치는지, 같은 문장으로 보여줍니다.", en: "With the same sentence: what someone who doesn't know the show misses with a plain translation alone." },
      src: "Samurai Jack was my whole childhood — I watched it every day after school.",
      srcNote: { ko: "앱의 예시 문장 · 이 도구를 위해 쓴 문장이며 실제 대화의 직접 인용이 아닙니다", en: "Sample line from the app · written for this tool, not a direct quote of a real conversation" },
      layers: [
        { from: "", t: { ko: "기본 번역", en: "Plain translation" }, d: { ko: "사무라이 잭은 내 어린 시절 그 자체였어. 방과 후에 매일 봤거든.", en: "Samurai Jack was a big part of growing up for me; I watched it daily after school." },
          miss: { ko: "작품을 모르면 고유명사와 ‘매일 봤다’는 사실만 남습니다.", en: "If you don't know the show, all that's left is a name and ‘watched it daily’." } },
        { from: "Samurai Jack", t: { ko: "Samurai Jack이 무엇인지", en: "What Samurai Jack is" }, d: { ko: "2001년 카툰 네트워크에서 시작한 미국 애니메이션입니다. 먼 미래로 보내진 사무라이가 원래 시대로 돌아가려는 이야기로, 대사를 줄이고 화면과 소리로 긴장을 만드는 연출로 기억됩니다.", en: "An American series that began on Cartoon Network in 2001: a samurai flung into the far future, trying to get back to his own time — remembered for sparse dialogue and tension built from images and sound." } },
        { from: "every day after school", t: { ko: "‘방과 후 매일’에 담긴 정서", en: "The feeling in ‘every day after school’" }, d: { ko: "작품만이 아니라, 학교가 끝나고 TV 앞에 앉던 하루의 리듬까지 떠올리게 합니다. 자랑보다는 ‘나를 만든 것 하나’를 꺼내 보이는 말에 가깝습니다.", en: "It brings back not just the show but the rhythm of the day — school ends, you sit down in front of the TV. Less a boast than showing one of the things that made you." } },
        { from: "", t: { ko: "이어서 할 말", en: "What you could say next" }, d: { ko: "No way — for me it was Pororo. Different show, same after-school ritual.", en: "No way — for me it was Pororo. Different show, same after-school ritual." }, lang: "en",
          miss: { ko: "뽀로로는 제가 떠올린 경험입니다. 상대의 국가나 세대만으로 그 사람의 경험을 단정하지 않습니다.", en: "Pororo is what I thought of. A country or generation alone doesn't decide what someone experienced." } }
      ]
    },
    turns: {
      label: { ko: "표현 교정에서 문화적 맥락으로", en: "From fixing phrasing to cultural context" },
      list: [
        { t: { ko: "에세이를 도와줄 줄 알았던 GPT-3", en: "GPT-3, which I thought would help with essays" },
          p: [{ ko: "초기 GPT-3를 인도계 친구에게 소개받았습니다. 처음에는 학교 에세이를 쓰는 데 써볼 수 있겠다고 생각했습니다.", en: "An Indian-American friend introduced me to early GPT-3. At first I thought I could use it for writing school essays." }] },
        { t: { ko: "관용구를 모듈처럼 바꾸려다 멈추다", en: "Trying to swap idioms like modules, and stalling" },
          p: [{ ko: "결과물에서 어색한 관용구와 표현이 눈에 띄었습니다. TOEFL 라이팅 템플릿처럼 문장을 모듈로 나눠 바꿔보려 했지만, 당시에는 어디서부터 구현할지 막막했습니다. 도구가 발전하면서 직접 시도할 수 있게 됐습니다.", en: "Awkward idioms and phrasing stood out in what it wrote. I tried to break sentences into modules and swap them, like a TOEFL writing template, but back then I didn't know where to start building it. As the tools improved, I could finally try it myself." }] },
        { t: { ko: "자연스러운 문장으로도 닿지 않던 것", en: "What natural phrasing still couldn't reach" },
          p: [{ ko: "유학하며 학교 안팎에서 일하면서, 표현이 자연스러워도 상대가 당연하게 여기는 문화적 배경을 모르면 관계나 대화를 이어가기 어렵다는 것을 느꼈습니다. 방향은 표현을 고치는 것에서, 상대의 경험을 이해하도록 돕는 것으로 넓어졌습니다.", en: "Studying and working on and off campus abroad, I felt that even with natural phrasing, if you don't know the cultural background the other person takes for granted, it's hard to keep a relationship or conversation going. The direction widened from fixing phrasing to helping you understand the other person's experience." }] },
        { t: { ko: "뽀로로와 사무라이 잭", en: "Pororo and Samurai Jack" },
          p: [{ ko: "브라질 친구와 어린 시절 애니메이션 이야기를 했을 때, 저는 뽀로로를, 친구는 사무라이 잭을 떠올렸습니다. 작품은 달랐지만 ‘매일 기다리던 만화가 있었다’는 경험은 같았습니다. 그 지점에 닿으려면 단어의 뜻보다 그 작품이 각자에게 어떤 시간이었는지를 알아야 했습니다.", en: "Talking with a Brazilian friend about cartoons from childhood, I thought of Pororo and my friend thought of Samurai Jack. Different shows, but the same experience of a cartoon you waited for every day. To reach that, the meaning of the words wasn't enough — you had to know what that show had been to each person." },
              { ko: "앱의 영어 예시 문장은 이 대화를 바탕으로 쓴 것이며, 실제 대사를 그대로 옮긴 것은 아닙니다.", en: "The English sample lines in the app were written from this conversation; they are not word-for-word quotes." }] }
      ]
    },
    s2: {
      label: { ko: "두 작품의 맥락", en: "Two contexts" },
      items: [
        { t: "Pororo the Little Penguin", ko: "뽀롱뽀롱 뽀로로",
          d: { ko: "2003년 EBS에서 처음 방영된 한국의 3D 애니메이션입니다. 미취학 어린이를 위한 작품으로, 아이들 사이 인기가 높아 ‘뽀통령’이라는 별명이 붙었습니다. 제게는 이 대화에서 먼저 떠오른 작품입니다.", en: "A Korean 3D animated series that first aired on EBS in 2003. Made for preschoolers, it was so popular it earned the nickname ‘President Pororo.’ For me, it was the show that came to mind first in that conversation." } },
        { t: "Samurai Jack", ko: "사무라이 잭",
          d: { ko: "2001년 카툰 네트워크에서 시작한 미국 애니메이션입니다. 대사를 줄이고 화면과 소리로 긴장을 만드는 연출로 기억됩니다. 친구에게는 방과 후 TV 앞의 시간과 이어진 작품이었습니다.", en: "An American series that began on Cartoon Network in 2001, remembered for sparse dialogue and tension built from images and sound. For my friend, it belonged to after-school hours in front of the TV." } }
      ],
      bridge: { ko: "이어지는 지점: 작품도 나라도 다르지만, ‘매일 기다리던 만화가 있었다’는 경험은 같습니다. 대화는 그 경험에서 이어갈 수 있습니다.", en: "Where they meet: different shows, different countries, but the same experience of a cartoon you waited for every day. That is where the conversation can continue." }
    },
    s3: {
      label: { ko: "디자인 결정", en: "Design decisions" },
      items: [
        { t: { ko: "번역과 맥락을 나란히", en: "Translation and context side by side" }, d: { ko: "기본 번역을 버리지 않고 옆에 두어, 무엇이 더해졌는지 비교할 수 있게 했습니다.", en: "The plain translation stays, so you can see exactly what the context adds." } },
        { t: { ko: "상황에 따라 달라지는 답", en: "Replies that follow the situation" }, d: { ko: "어떤 사이인지, 그 말을 듣기 직전 무슨 일이 있었는지 고르면 이어서 할 말의 말투와 해석이 달라집니다.", en: "Choosing how close you are, and what happened right before, changes the tone and reading of the suggested replies." } },
        { t: { ko: "사람을 국가로 단정하지 않기", en: "Don't reduce people to countries" }, d: { ko: "국가나 세대만으로 개인의 경험을 단정하지 않고, ‘그럴 수 있다’는 배경으로만 설명합니다.", en: "Nationality or generation is offered as possible background, never as a conclusion about a person." } }
      ]
    },
    s4: {
      label: { ko: "현재 작동하는 범위", en: "What works today" },
      rows: [
        { k: { ko: "작동", en: "Works" }, v: { ko: "예시 문장 선택, 상황 선택, 기본 번역·문화적 설명·답변 제안 비교, 답변 복사", en: "Sample lines, situation choice, plain translation vs. context vs. replies, copying a reply" } },
        { k: { ko: "자유 입력", en: "Free input" }, v: { ko: "맥락 설명은 준비된 다섯 표현(Samurai Jack, 뽀로로, Saturday morning, This is fine, Bless your heart)에 대해 직접 쓴 내용입니다. 입력한 문장에 이 표현이 들어 있으면 그 표현의 맥락만 보여주고, 문장 전체를 번역하지는 않습니다", en: "Context is hand-written for five prepared expressions (Samurai Jack, Pororo, Saturday morning, This is fine, Bless your heart). If your sentence contains one, only that expression's context is shown; the whole sentence is not translated" } },
        { k: { ko: "결과 언어", en: "Result language" }, v: { ko: "결과는 한국어·영어 중에서 고르며, 사이트 표시 언어와 따로 저장됩니다", en: "Results come in Korean or English, chosen and saved separately from the site language" } },
        { k: { ko: "연결하지 않음", en: "Not connected" }, v: { ko: "언어 모델과 실시간 번역", en: "Language models and live translation" } }
      ]
    }
  };

  window.CONTENT = C;
})();
