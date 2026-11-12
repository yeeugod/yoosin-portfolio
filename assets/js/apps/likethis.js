/* Like this — one sentence in, plain translation and cultural context side by side, replies to copy.
   The result language is chosen separately from the site language. Context is hand-written for prepared expressions;
   no language model or live translation is connected. Example sentences are written for the demo, not quotes. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const KEY = "yl.likethis.v1";

  const X = [
    { id: "samurai", keys: ["samurai jack", "사무라이 잭"], srcLang: "en", who: "them",
      tag: { ko: "어린 시절 애니메이션 · 브라질 친구", en: "Childhood cartoons · a Brazilian friend" },
      text: "Samurai Jack was my whole childhood — I watched it every day after school.",
      basic: { ko: "사무라이 잭은 내 어린 시절 그 자체였어. 방과 후에 매일 봤거든.", en: "Samurai Jack was a big part of growing up for me; I watched it daily after school." },
      context: { ko: "사무라이 잭은 2001년 카툰 네트워크에서 시작한 미국 애니메이션입니다. 대사가 적고 화면과 소리로 긴장을 만드는 연출로 기억됩니다. ‘방과 후에 매일’이라는 말은 작품만이 아니라, 학교가 끝나고 TV 앞에 앉던 하루의 리듬까지 함께 떠올리게 합니다.", en: "Samurai Jack is an American series that began on Cartoon Network in 2001, remembered for sparse dialogue and tension built from images and sound. ‘Every day after school’ brings back not just the show but the rhythm of the day — school ends, you sit down in front of the TV." },
      feeling: { ko: "향수와 애정. 자랑보다는 ‘나를 만든 것 하나’를 꺼내 보이는 말에 가깝습니다.", en: "Nostalgia and affection — less a boast than showing you one of the things that made them." },
      bridge: { ko: "한국에서 자랐다면 어린 시절 매일 기다리던 만화가 떠오를 수 있습니다(예: 뽀로로). 두 작품의 문화적 위치는 같지 않습니다. 뽀로로는 미취학 어린이를 위한 한국 작품이고, 사무라이 잭은 그보다 큰 아이들이 보던 미국 작품입니다. 이어지는 것은 작품이 아니라 ‘매일 기다리던 만화가 있었다’는 정서입니다. 브라질에서 자랐다고 모두 이 작품을 봤다고 단정하지는 마세요.", en: "Someone who grew up in Korea may think of a cartoon they waited for every day (Pororo, for example). The two shows do not sit in the same cultural place: Pororo is a Korean show for preschoolers, Samurai Jack an American show watched by older kids. What connects them is not the show but the feeling of having a cartoon you waited for every day. Don't assume everyone from Brazil watched it, though." },
      rep: { casual: "No way — for me it was Pororo. Different show, same after-school ritual.", polite: "That sounds like a great memory. I grew up with a Korean show called Pororo — what did you love about Samurai Jack?", ask: "What was it about Samurai Jack that hooked you?" } },
    { id: "pororo", keys: ["뽀로로", "pororo"], srcLang: "ko", who: "me",
      tag: { ko: "어린 시절 애니메이션 · 내가 하려는 말", en: "Childhood cartoons · something I want to say" },
      text: "어릴 때는 뽀로로 없으면 하루가 안 갔어.",
      basic: { ko: "어릴 때 뽀로로를 매일 볼 만큼 좋아했다는 뜻입니다.", en: "When I was little, a day didn't feel complete without Pororo." },
      context: { ko: "뽀로로(뽀롱뽀롱 뽀로로)는 2003년 EBS에서 처음 방영된 한국의 3D 애니메이션입니다. 미취학 어린이를 위한 작품으로, 아이들 사이 인기가 높아 ‘뽀통령’이라는 별명이 붙었습니다.", en: "Pororo the Little Penguin is a Korean 3D animated series that first aired on EBS in 2003. Made for preschoolers, it was so popular with kids that it got the nickname ‘President Pororo.’" },
      feeling: { ko: "가벼운 향수. 한국에서 자란 사람끼리는 설명 없이 웃게 되는 이름입니다.", en: "Light nostalgia — between people who grew up in Korea, the name gets a smile with no explanation." },
      bridge: { ko: "듣는 사람이 한국에서 자라지 않았다면 작품을 모를 수 있습니다. 한 줄 설명을 붙이고, 상대의 어린 시절 작품을 물으면 대화가 이어집니다.", en: "If the listener didn't grow up in Korea, they may not know the show. Add a one-line explanation and ask about theirs, and the conversation keeps going." },
      rep: { casual: "It's a Korean cartoon about a little penguin — kids loved it so much they called him ‘President Pororo.’", polite: "Pororo is a Korean preschool show from 2003 about a small penguin and his friends. What did you grow up watching?", ask: "Did you have a show like that — one you just couldn't miss?" } },
    { id: "saturday", keys: ["saturday morning"], srcLang: "en", who: "them",
      tag: { ko: "어린 시절의 추억", en: "Childhood memories" },
      text: "This is giving me major Saturday morning cartoons vibes.",
      basic: { ko: "이거 완전 토요일 아침 만화 느낌이야.", en: "This feels a lot like the cartoons we watched on Saturday mornings." },
      context: { ko: "미국에서는 오랫동안 지상파 방송이 토요일 오전에 어린이 만화를 몰아서 편성했습니다. 그래서 이 말은 특정 작품보다 ‘학교 안 가는 날 아침, 시리얼을 먹으며 만화를 보던 시간’을 가리킵니다.", en: "For decades, US broadcast TV packed children's cartoons into Saturday mornings. So the phrase points less to a specific show than to ‘no-school mornings, cereal, cartoons.’" },
      feeling: { ko: "편안한 그리움, 또는 색감이나 분위기가 옛 만화 같다는 가벼운 칭찬.", en: "A cosy kind of longing — or light praise that the colours or mood feel like old cartoons." },
      bridge: { ko: "한국이라면 일요일 아침이나 저녁 만화 시간을 기다리던 기억이 비슷한 자리에 있습니다. 요일과 방송 환경, 본 작품은 다를 수 있습니다.", en: "In Korea, waiting for Sunday-morning or early-evening cartoon slots sits in a similar place — though the day, the channels and the shows differ." },
      rep: { casual: "Ha, I get it — we had our own version of that on weekend mornings in Korea.", polite: "That sounds like a warm memory. I grew up with something similar on weekend mornings.", ask: "What did you used to watch on those mornings?" } },
    { id: "fine", keys: ["this is fine"], srcLang: "en", who: "them",
      tag: { ko: "밈과 유머", en: "Memes and humour" },
      text: "Deadline's tomorrow and nothing works. This is fine.",
      basic: { ko: "마감이 내일인데 되는 게 하나도 없네. 괜찮아.", en: "The deadline is tomorrow, nothing works, and I'm (not) fine." },
      context: { ko: "‘This is fine’은 KC Green의 웹코믹(2013)에서 나온 밈입니다. 불타는 방 안에서 개가 커피를 들고 태연하게 말하는 장면으로, 상황이 엉망인데 괜찮은 척할 때 씁니다.", en: "‘This is fine’ comes from a 2013 KC Green web comic: a dog sipping coffee in a burning room. People use it when things are a mess and they're pretending otherwise." },
      feeling: { ko: "자조적인 농담. 가까운 사이라면 ‘좀 도와줘’라는 신호가 섞여 있을 수 있습니다.", en: "Self-mocking humour — between friends it may also be a quiet ‘help me out.’" },
      bridge: { ko: "한국어의 “나는 괜찮아(안 괜찮음)”처럼 말과 속마음이 반대인 농담과 비슷합니다. 다만 영어권에서는 그 ‘불타는 방의 개’ 그림을 함께 떠올립니다.", en: "Close to saying ‘I'm totally fine’ while meaning the opposite — but English speakers also picture that dog in the burning room." },
      rep: { casual: "Ha, the room is fully on fire, huh? Want a hand?", polite: "That sounds stressful. Is there anything I can take off your plate?", ask: "On a scale of fine to ‘this is fine’, where are we?" } },
    { id: "bless", keys: ["bless your heart"], srcLang: "en", who: "them", sit: true,
      tag: { ko: "상황에 따라 뜻이 갈리는 말", en: "Meaning depends on the moment" },
      text: "Oh, bless your heart.",
      basic: { ko: "아이고, 저런.", en: "Oh, you poor thing." },
      context: { ko: "미국 남부에서 많이 쓰는 표현입니다. 진심 어린 위로일 때도 있지만, 말투와 상황에 따라 ‘참 딱하네’라는 은근한 낮춤이 되기도 합니다.", en: "A phrase strongly associated with the US South. It can be sincere sympathy, or — depending on tone and moment — a gentle put-down." },
      feeling: { trouble: { ko: "이 상황에서는 진심 어린 위로일 가능성이 큽니다.", en: "In this moment it's most likely sincere sympathy." }, mistake: { ko: "이 상황에서는 살짝 놀리거나 얕보는 뜻일 가능성이 있습니다.", en: "In this moment it may be light teasing or condescension." } },
      bridge: { ko: "한국어의 “아이고, 그러셨어요~”도 말투에 따라 걱정이 되기도 하고 비꼼이 되기도 합니다. 지역이나 사람만으로 의도를 단정할 수는 없습니다.", en: "Like a drawn-out Korean ‘aigo, is that so~’, tone decides whether it's care or sarcasm. Region or person alone can't tell you the intent." },
      rep: { casual: "Thanks — I'll take that as the nice version!", polite: "Thank you, that's kind of you to say.", ask: "I've heard that phrase can mean a few things — which one was this?" } }
  ];
  const TONES = [["casual", { ko: "가볍게", en: "Casual" }], ["polite", { ko: "정중하게", en: "Polite" }], ["ask", { ko: "되묻기", en: "Ask back" }]];

  const fresh = () => ({ ex: "samurai", text: X[0].text, out: "ko", rel: "close", sit: "trouble", shown: false, tone: null });
  let S = Object.assign(fresh(), YL.store.sget(KEY, {}));
  if (!YL.store.sget(KEY, null)) S.out = YL.lang === "en" ? "en" : "ko";
  const save = () => YL.store.sset(KEY, S);
  const find = (txt) => { const t = (txt || "").toLowerCase(); return X.find((x) => x.keys.some((k) => t.includes(k.toLowerCase()))); };
  const O = (o) => o == null ? "" : typeof o === "string" ? o : (o[S.out] != null ? o[S.out] : o.ko); // text in the result language

  let pane, scroller, prev = {};
  function render() {
    const x = find(S.text);
    const tone = S.tone || (S.rel === "close" ? "casual" : "polite");
    const order = [tone, ...TONES.map((t) => t[0]).filter((t) => t !== tone)];
    const srcName = x ? (x.srcLang === "en" ? "English" : "한국어") : (/[가-힣]/.test(S.text) ? "한국어" : "English");
    const seg = (name, cur, opts, legend) => `<fieldset class="lx-seg"><legend>${esc(L(legend))}</legend>${opts.map(([v, t]) => `<label><input type="radio" name="${name}" value="${v}" data-k="${name}" ${cur === v ? "checked" : ""}><span>${esc(L(t))}</span></label>`).join("")}</fieldset>`;
    pane.innerHTML = `<div class="lx">
      <section class="lx-io" data-anchor="lt-1">
        <div class="lx-langs"><span class="lx-from" data-watch="lt-src">${esc(srcName)}</span><span class="lx-arrow" aria-hidden="true">→</span>
          <fieldset class="lx-to"><legend class="sr-only">${esc(L("결과 언어", "Result language"))}</legend>${[["ko", "한국어"], ["en", "English"]].map(([v, t]) => `<label><input type="radio" name="out" value="${v}" data-k="out" ${S.out === v ? "checked" : ""}><span lang="${v}">${t}</span></label>`).join("")}</fieldset>
          <small>${esc(L("결과 언어는 사이트 언어와 따로 정합니다", "Result language is set apart from the site language"))}</small></div>
        <div class="lx-src"><label for="lt-text" class="sr-only">${esc(L("문장", "Sentence"))}</label><textarea id="lt-text" data-k="text" rows="3" maxlength="280" spellcheck="false" placeholder="${esc(L("들은 말이나 하려는 말을 한 문장 넣어 보세요", "Type a sentence you heard or want to say"))}">${esc(S.text)}</textarea>
          <div class="lx-srcfoot"><div class="lx-ctx">${seg("rel", S.rel, [["close", { ko: "친한 친구", en: "Close friend" }], ["new", { ko: "알게 된 지 얼마 안 됨", en: "Just met" }]], { ko: "어떤 사이인가요?", en: "How close are you?" })}
            ${x && x.sit ? seg("sit", S.sit, [["trouble", { ko: "내가 힘든 일을 이야기함", en: "I'd shared something hard" }], ["mistake", { ko: "내가 실수했음", en: "I'd made a slip" }]], { ko: "그 말을 듣기 직전", en: "Right before it was said" }) : ""}</div>
            <div class="lx-go"><span class="lx-cnt" aria-hidden="true">${S.text.length} / 280</span><button type="button" class="lx-run" data-act="show"><span>${esc(S.shown ? L("다시 읽기", "Read again") : L("맥락 읽기", "Read the context"))}</span><span aria-hidden="true">→</span></button></div></div></div>
        <div class="lx-samples"><p>${esc(L("예시 문장", "Sample lines"))}</p><div class="lx-chips" role="group" aria-label="${esc(L("예시 문장", "Sample lines"))}">${X.map((e) => `<button type="button" data-ex="${e.id}" aria-pressed="${x === e && S.text === e.text}"><b>${esc(L(e.tag))}</b><span lang="${e.srcLang}">${esc(e.text.length > 46 ? e.text.slice(0, 44) + "…" : e.text)}</span></button>`).join("")}</div>
          <small>${esc(L("예시 문장은 이 도구를 위해 쓴 문장이며, 실제 대화의 인용이 아닙니다.", "Sample lines were written for this tool; they are not quotes from a real conversation."))}</small></div></section>
      ${S.shown ? results(x, order) : `<section class="lx-cmp lx-wait" data-anchor="lt-3" aria-hidden="true"><div class="lx-cols">${[{ ko: "기본 번역", en: "Plain translation" }, { ko: "문화적 설명", en: "Cultural context" }, { ko: "답변 제안", en: "Suggested replies" }].map((t, i) => `<div class="lx-c"><h4><b>${i + 1}</b>${esc(L(t))}</h4><i></i><i></i><i></i></div>`).join("")}</div></section>`}</div>`;
    prev = YL.flashChanged(pane, prev);
  }
  function results(x, order) {
    if (!S.text.trim()) return `<section class="lx-cmp" data-anchor="lt-3"><p class="err" role="alert">${esc(L("문장을 입력해 주세요.", "Please enter a sentence."))}</p></section>`;
    if (!x) return `<section class="lx-cmp" data-anchor="lt-3"><h3 class="lx-h">${esc(L("기본 번역과 문화적 설명", "Translation and context"))}</h3>
      <div class="lt-none" role="status"><b>${esc(L("준비된 표현이 아닙니다", "Not a prepared expression"))}</b><p>${esc(L("이 도구의 맥락 설명은 준비된 표현에 대해 직접 쓴 내용입니다. 실시간 번역이나 언어 모델은 연결되어 있지 않아, 이 문장의 번역과 설명은 만들지 않습니다.", "Context in this tool is hand-written for prepared expressions. No live translation or language model is connected, so no translation or context is produced for this sentence."))}</p>
      <p>${esc(L("준비된 표현: ", "Prepared expressions: "))}${X.map((e) => `<button type="button" class="linkbtn" data-ex="${e.id}">${esc(e.keys[0])}</button>`).join(" · ")}</p></div></section>`;
    const same = x.srcLang === S.out;
    const exact = S.text.trim() === x.text;
    const basicHtml = exact ? `<p class="big" data-watch="lt-basic">${esc(O(x.basic))}</p>
          <p class="muted">${esc(S.out === "ko" ? "단어의 뜻은 전해지지만, 왜 이 말을 했는지는 비어 있습니다." : "The words come across; why they were said does not.")}</p>`
      : `<p class="big" data-watch="lt-basic" lang="${x.srcLang}">“${esc(x.keys[0])}”</p><p class="muted">${esc(S.out === "ko" ? "입력한 문장에서 준비된 표현을 찾았습니다. 문장 전체의 번역은 만들지 않고, 이 표현의 맥락만 설명합니다." : "A prepared expression was found in your sentence. The whole sentence is not translated; only this expression is explained.")}</p>`;
    const feeling = x.sit ? x.feeling[S.sit] : x.feeling;
    const H = (ko, en) => S.out === "ko" ? ko : en;
    return `<section class="lx-cmp" data-anchor="lt-3"><h3 class="lx-h" tabindex="-1">${esc(H("한 문장을 세 가지로 읽기", "One sentence, three readings"))}<span lang="${x.srcLang}">“${esc(exact ? x.text : x.keys[0])}”</span></h3>
        <div class="lx-cols" lang="${S.out}">
          <article class="lx-c c-basic"><h4><b>1</b>${esc(!exact ? H("찾은 표현", "Expression found") : same ? H("쉬운 말로", "In plain words") : H("기본 번역", "Plain translation"))}</h4>${basicHtml}</article>
          <article class="lx-c c-ctx"><h4><b>2</b>${esc(H("문화적 설명", "Cultural context"))}</h4><p data-watch="lt-ctx">${esc(O(x.context))}</p><p class="feel" data-watch="lt-feel"><b>${esc(H("정서", "Feeling"))}</b>${esc(O(feeling))}</p><p class="bridge2"><b>${esc(H("이어지는 지점", "Common ground"))}</b>${esc(O(x.bridge))}</p></article>
          <article class="lx-c c-rep" data-anchor="lt-4"><h4><b>3</b>${esc(H("답변 제안", "Suggested replies"))}</h4>
            <p class="muted">${esc(x.who === "me" ? H("내 말에 덧붙일 문장 · 영어 대화 기준", "To add to what you said · in English") : H("상대에게 답할 문장 · 영어 대화 기준", "To answer with · in English"))}. ${esc(S.rel === "close" ? H("친한 사이라 ‘가볍게’가 먼저입니다.", "Close friends: casual first.") : H("처음 만난 사이라 ‘정중하게’가 먼저입니다.", "New acquaintance: polite first."))}</p>
            <ol class="reps">${order.map((t, i) => `<li class="${i === 0 ? "top" : ""}" data-watch="rep-${i}"><span class="tn">${esc(O(TONES.find((z) => z[0] === t)[1]))}</span><p lang="en">${esc(x.rep[t])}</p><button type="button" class="lx-copy" data-copy="${t}" aria-label="${esc(L("복사: ", "Copy: ") + x.rep[t])}">${esc(L("복사", "Copy"))}</button></li>`).join("")}</ol></article></div></section>`;
  }
  function rr() { const f = YL.captureFocus(), a = YL.captureAnchor(scroller); render(); YL.restoreAnchor(scroller, a); YL.restoreFocus(f); }
  function onClick(e) {
    const b = e.target.closest("[data-ex]");
    if (b) { const x = X.find((z) => z.id === b.dataset.ex); S.ex = x.id; S.text = x.text; S.tone = null; save(); rr(); if (S.shown) { const r = $(".lx-cols", pane); if (r && !YL.reduceMotion()) r.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 220 }); } return; }
    const a = e.target.closest("[data-act]");
    if (a && a.dataset.act === "show") {
      if (!S.text.trim()) { const t = $("#lt-text", pane); t.setAttribute("aria-invalid", "true"); t.focus(); YL.toast(L("문장을 입력해 주세요", "Please enter a sentence"), "err"); return; }
      S.shown = true; save(); render();
      const r = $(".lx-cmp", pane); if (r) {
        if (!YL.reduceMotion()) $$(".lx-c", r).forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 360, delay: i * 90, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
        r.scrollIntoView({ block: "start", behavior: YL.reduceMotion() ? "auto" : "smooth" }); const h = $(".lx-h", r) || r; h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      return;
    }
    const c = e.target.closest("[data-copy]");
    if (c) { const x = find(S.text); if (x) YL.copyText(x.rep[c.dataset.copy], c); }
  }
  let typing = 0;
  function onInput(e) {
    if (e.target.dataset.k === "text") {
      S.text = e.target.value; e.target.removeAttribute("aria-invalid"); save();
      const cnt = $(".lx-cnt", pane); if (cnt) cnt.textContent = `${S.text.length} / 280`;
      clearTimeout(typing); typing = setTimeout(() => { if (S.shown) rr(); else { // keep chips in sync without stealing focus
        $$(".lx-chips [data-ex]", pane).forEach((b) => b.setAttribute("aria-pressed", String(X.find((z) => z.id === b.dataset.ex).text === S.text))); } }, 350);
    }
  }
  function onChange(e) {
    const k = e.target.dataset.k; if (!k || k === "text") return;
    S[k] = e.target.value; if (k === "rel") S.tone = null; save(); rr();
  }

  /* guided walk-through on the prepared Samurai Jack line (hand-written context; no language model is connected) */
  function tourStep(n) {
    const keepOut = S.out;
    S = fresh(); S.out = keepOut || (YL.lang === "en" ? "en" : "ko"); S.rel = "close";
    S.shown = n >= 2;
    save(); render(); if (scroller) scroller.scrollTop = 0;
  }
  window.LIKETHIS = {
    tourStep,
    heroExample() {
      const x = X[0], lg = YL.lang;
      return { srcLang: x.srcLang, text: x.text, note: { ko: "예시 문장 · 실제 대화 인용 아님", en: "Sample line · not a quote" },
        basic: { ko: x.basic.ko, en: x.basic.en }, context: { ko: x.context.ko, en: x.context.en }, reply: x.rep.casual };
    }
  };
  window.APPS = window.APPS || {};
  window.APPS.likethis = {
    title: { ko: "맥락 번역", en: "Context translator" },
    brand: `<span class="ltb-q" aria-hidden="true">“</span><span class="ltb-name">Like this</span>`,
    mount(el, ctx) { pane = el; scroller = ctx.scroller; el.addEventListener("click", onClick); el.addEventListener("input", onInput); el.addEventListener("change", onChange); render(); },
    show() { render(); },
    relang() { render(); }
  };
})();
