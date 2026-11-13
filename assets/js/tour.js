/* Guided walk-through for Make It! and Like this.
   “Try it” opens the real app with a step bar: each step puts the app in a prepared state, points at the part to read,
   and says what to look at next. Previous / Next / Start over. Nothing is sent and no language model runs. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const STEPS = {
    makeit: [
      { t: { ko: "예시 제품 프로젝트", en: "The sample product project" }, d: { ko: "A10 아트토이 한 제품의 제작 프로젝트입니다. 헤더에서 제품 이름, 문의서 버전, 진행 상태를 확인하세요. 아래 ‘다음’을 누르면 한 단계씩 이어집니다.", en: "One production project for the A10 art toy. Check the product name, brief version and status in the header. ‘Next’ below walks you through one step at a time." }, hl: ".mx-proj", app: 1 },
      { t: { ko: "제작 조건 정리", en: "Organising the production terms" }, d: { ko: "높이·제작 방식·수량·예산·기간이 업체에 전할 제작 조건이 됩니다. 아직 모르는 최소 두께는 ‘질문 중’으로 남습니다.", en: "Height, process, quantity, budget and timing become the terms a maker reads. The minimum thickness isn't known yet, so it stays ‘Asked’." }, hl: ".mx-spec", app: 2 },
      { t: { ko: "내 디자인에 맞는 업체", en: "Makers that fit my design" }, d: { ko: "수량 50개라면 실리콘 몰드 캐스팅이 맞아, 예시 업체 Cast & Co.가 먼저 옵니다. ‘업체 리스트’로 바꾸면 전체 업체를 볼 수 있습니다.", en: "For 50 pieces, silicone-mould casting fits, so the sample maker Cast & Co. comes first. Switch to ‘All makers’ to browse the full list." }, hl: ".makers", app: 3 },
      { t: { ko: "업체에 문의", en: "Enquiring with the maker" }, d: { ko: "Cast & Co.에 보낸 문의서입니다. 정하지 못한 최소 두께는 질문으로 들어갔습니다. 실제로 발송되지는 않습니다.", en: "The brief sent to Cast & Co. The undecided minimum thickness went in as a question. Nothing is actually sent." }, hl: ".brief", app: 4 },
      { t: { ko: "예시 회신", en: "The sample reply" }, d: { ko: "준비된 예시 회신입니다. 가는 가지를 2mm 이상으로 보강하고, 몰드 비용을 고려해 수량을 100개 이상으로 하자는 두 가지 요청을 확인하세요.", en: "A prepared sample reply. It asks for two things: thicken the thin branches to at least 2 mm, and make 100+ pieces to cover the moulds." }, hl: ".reply", app: 5 },
      { t: { ko: "사양 수정", en: "Revising the specs" }, d: { ko: "요청을 반영하자 문의서가 v2가 되었습니다. ‘현재 사양’에서 최소 두께 2mm와 수량 100개를, ‘수정 이력’에서 두 역할의 기록을 확인하세요.", en: "Applying the requests made the brief v2. See the 2 mm minimum and 100 pieces in ‘Current specs’, and both sides' record in ‘History’." }, hl: ".mx-spec", app: 6 }
    ],
    likethis: [
      { t: { ko: "예시 대화", en: "The sample line" }, d: { ko: "실제 대화를 바탕으로 시연용으로 다시 쓴 예시 문장입니다. 실제 대사를 그대로 옮긴 것은 아닙니다.", en: "A sample sentence rewritten from the real conversation for the demo — not a word-for-word quote." }, hl: ".lx-src", app: 1 },
      { t: { ko: "기본 번역", en: "Plain translation" }, d: { ko: "단어의 뜻은 전해지지만, 작품을 모르면 왜 이 말을 했는지는 비어 있습니다.", en: "The words come across, but if you don't know the show, why it was said is missing." }, hl: ".c-basic", app: 2 },
      { t: { ko: "문화적 맥락", en: "Cultural context" }, d: { ko: "Samurai Jack이 어떤 작품인지, ‘방과 후 매일’이라는 말에 어떤 정서가 담겼는지 설명합니다. 직접 쓴 설명이며 언어 모델이 만든 결과가 아닙니다.", en: "What Samurai Jack is, and the feeling in ‘every day after school’. Hand-written, not produced by a language model." }, hl: ".c-ctx", app: 3 },
      { t: { ko: "한국 문화권과의 비교", en: "A comparison from Korea" }, d: { ko: "한국에서 자랐다면 떠올릴 수 있는 뽀로로와 비교합니다. 두 작품의 위치는 같지 않고, 이어지는 것은 ‘매일 기다리던 만화가 있었다’는 정서입니다.", en: "A comparison with Pororo, which someone from Korea might think of. The two shows don't sit in the same place; what connects them is the feeling of a cartoon you waited for every day." }, hl: ".c-ctx .bridge2", app: 4 },
      { t: { ko: "이어서 할 수 있는 말", en: "What you could say next" }, d: { ko: "대화를 이어가는 답변 제안입니다. 친한 사이라 ‘가볍게’가 먼저 나옵니다. ‘복사’로 문장을 가져갈 수 있습니다.", en: "Replies that keep the conversation going; close friends, so ‘casual’ comes first. ‘Copy’ takes the line with you." }, hl: ".c-rep", app: 5 }
    ]
  };
  const STATUS = { ko: "언어 모델 연결을 진행 중이며, 아직 출시하지 않았습니다.", en: "Language-model connection is in progress; this has not been released yet." };
  const T = { k: null, i: 0, bar: null, c: false, auto: 0, ro: null };
  const appwin = $("#appwin"), scroll = $("#app-scroll");
  function api(k) { return k === "makeit" ? window.MAKEIT : window.LIKETHIS; }
  /* the panel keeps its real height reserved under the app, so it never covers the part it points at */
  const reserve = () => { if (T.bar) scroll.style.paddingBottom = (T.bar.offsetHeight + 28) + "px"; };
  function render(dir) {
    const list = STEPS[T.k], s = list[T.i], last = T.i === list.length - 1;
    if (!T.bar) { T.bar = document.createElement("div"); T.bar.className = "tour tour-" + T.k; T.bar.setAttribute("role", "region"); appwin.appendChild(T.bar);
      if (window.ResizeObserver) { T.ro = new ResizeObserver(reserve); T.ro.observe(T.bar); } }
    T.bar.classList.toggle("collapsed", T.c);
    T.bar.setAttribute("aria-label", L("체험 안내", "Guided walk-through"));
    const next = last ? `<button type="button" class="next" data-tour="restart">${esc(L("처음부터 다시 보기", "Watch it again from the start"))} ↺</button>`
      : `<button type="button" class="next" data-tour="next">${esc(L("다음", "Next"))}<span class="tour-nx">: ${esc(L(list[T.i + 1].t))}</span> →</button>`;
    T.bar.innerHTML = `<div class="tour-in">
      <p class="tour-meta"><span class="tour-n" lang="en">${T.i + 1} / ${list.length}</span><b class="tour-short">${esc(L(s.t))}</b><span class="tour-st">${esc(L({ ko: "준비된 예시", en: "Prepared example" }))} · ${esc(L(STATUS))}</span>
        <button type="button" class="tour-fold" data-tour="fold" aria-expanded="${!T.c}">${esc(T.c ? L("안내 펼치기", "Show guide") : L("안내 접기", "Hide guide"))}</button></p>
      <ol class="tour-dots" aria-hidden="true">${list.map((_, j) => `<li class="${j < T.i ? "done" : j === T.i ? "cur" : ""}"></li>`).join("")}</ol>
      <div class="tour-txt" aria-live="polite"><b>${esc(L(s.t))}</b><span>${esc(L(s.d))}</span></div>
      <div class="tour-ctl"><button type="button" class="tour-sec" data-tour="restart">${esc(L("처음부터", "Start over"))}</button><button type="button" class="tour-sec" data-tour="prev" ${T.i === 0 ? "disabled" : ""}>← ${esc(L("이전", "Back"))}</button>${next}</div></div>`;
    if (dir && !YL.reduceMotion()) $(".tour-txt", T.bar).animate([{ opacity: 0, transform: `translateX(${dir * 8}px)` }, { opacity: 1, transform: "none" }], { duration: 120, easing: "ease-out" });
    reserve();
  }
  // the reader takes over: any wheel, touch or key on the app stops the guided scroll where it is
  const stopAuto = () => { if (Date.now() < T.auto) { T.auto = 0; scroll.scrollTo({ top: scroll.scrollTop, behavior: "auto" }); } };
  ["wheel", "touchstart", "keydown"].forEach((ev) => scroll.addEventListener(ev, stopAuto, { passive: true }));
  function show(i, dir) {
    T.i = Math.max(0, Math.min(STEPS[T.k].length - 1, i));
    const s = STEPS[T.k][T.i];
    api(T.k).tourStep(s.app);
    render(dir);
    // point at the part to read; scroll only when it is not already in view above the panel
    setTimeout(() => {
      $$(".tour-hl").forEach((e) => e.classList.remove("tour-hl"));
      const el = $(`.app-pane.app-${T.k} ${s.hl}`);
      if (!el) return;
      el.classList.add("tour-hl");
      const r = el.getBoundingClientRect(), sr = scroll.getBoundingClientRect(), barH = T.bar ? T.bar.offsetHeight + 14 : 0;
      const top = sr.top + 8, bottom = sr.bottom - barH - 8;
      const visible = r.top >= top && (r.bottom <= bottom || (r.height > bottom - top && r.top < top + (bottom - top) * 0.4));
      if (visible) return;
      const target = scroll.scrollTop + r.top - sr.top - Math.max(16, (sr.height - barH - r.height) / 2);
      const smooth = !YL.reduceMotion();
      T.auto = smooth ? Date.now() + 900 : 0;
      scroll.scrollTo({ top: Math.max(0, target), behavior: smooth ? "smooth" : "auto" });
    }, 20);
  }
  function start(k) { if (!STEPS[k]) return false; T.k = k; T.c = false; appwin.classList.add("touring"); show(0, 0); return true; }
  function stop() { if (T.ro) { T.ro.disconnect(); T.ro = null; } if (T.bar) { T.bar.remove(); T.bar = null; } scroll.style.paddingBottom = ""; T.k = null; appwin.classList.remove("touring"); $$(".tour-hl").forEach((e) => e.classList.remove("tour-hl")); }
  appwin.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tour]"); if (!b || !T.k) return;
    const a = b.dataset.tour;
    if (a === "fold") { T.c = !T.c; render(0); const f = $('[data-tour="fold"]', T.bar); if (f) f.focus({ preventScroll: true }); return; }
    if (a === "next") show(T.i + 1, 1); else if (a === "prev") show(T.i - 1, -1); else if (a === "restart") show(0, -1);
    const n = $('[data-tour="next"]', T.bar) || $('[data-tour="restart"].next', T.bar); if (n) n.focus({ preventScroll: true });
  });
  YL.onLang(() => { if (T.k) show(T.i, 0); });
  window.TOUR = { start, stop, has: (k) => !!STEPS[k], get active() { return T.k; } };
  // a direct link to #/makeit/app or #/likethis/app opened the app before this file loaded
  if (!appwin.hidden && STEPS[appwin.dataset.k]) start(appwin.dataset.k);
})();
