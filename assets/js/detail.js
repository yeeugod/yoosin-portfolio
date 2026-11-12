/* Project detail bodies. Each project reads as: the job → what I noticed → first attempt → the wall → what changed → what works now.
   Every case has its own evidence block and its own motion; nothing shares one reveal effect. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const C = window.CONTENT, M = window.MEDIA;
  const pad = (n) => String(n).padStart(2, "0");
  const label = (n, t) => `<p class="label"><b>${typeof n === "number" ? pad(n) : esc(n)}</b>${esc(L(t))}</p>`;
  const fig = (name, cap, o = {}) => `<figure class="fig ${o.cls || ""}" ${o.anchor ? `data-anchor="${o.anchor}"` : ""}>
      <div class="ph ${o.ph || ""}" style="--ar:${o.ar || M.ratio(name)}">${o.video ? M.video(o.video, name, L(cap), o) : M.img(name, L(cap), o)}</div>
      ${cap ? `<figcaption class="cap">${esc(L(cap))}</figcaption>` : ""}</figure>`;
  /* app projects open with a recording of the real app; the launch button sits right under it.
     The recording shows its poster and a play button; it never starts by itself. */
  /* Montauk and GROWN: a muted demo that plays while on screen, no way to run the app.
     Make It! and Like this: the recording waits for a tap; “Try it” opens a guided walk-through of the real app. */
  const DEMO_ONLY = new Set(["montauk", "grown"]);
  const demo = (k, h) => {
    const name = { montauk: "Manual Studio", grown: "GROWN Recovery Scan", makeit: "Make It!", likethis: "Like this" }[k];
    const en = YL.lang === "en" ? "-en" : "", auto = DEMO_ONLY.has(k);
    const ctl = (a, t) => `<button type="button" data-demo="${a}" aria-label="${esc(L(t))}"><span class="di di-${a}" aria-hidden="true"></span><span class="dt">${esc(L(t))}</span></button>`;
    return `<div class="demo ${k === "montauk" ? "phone" : ""} ${auto ? "auto" : ""}" data-anchor="${k}-demo">
      <div class="demo-v"><video class="demo-video" muted playsinline webkit-playsinline preload="none" poster="assets/img/demo-${k}${en}-poster.jpg" data-src="assets/video/demo-${k}${en}.mp4" aria-label="${esc(L({ ko: `${name} 구동 시연 영상`, en: `${name} — demo recording of the app in use` }))}"></video>
        <button type="button" class="demo-pp" data-demo="toggle" aria-pressed="false"><span class="demo-pp-i" aria-hidden="true"></span><span class="demo-pp-t">${esc(L("구동 영상 재생", "Play the recording"))}</span></button>
        <div class="demo-bar">${ctl("toggle", { ko: "일시정지", en: "Pause" })}${ctl("replay", { ko: "다시 보기", en: "Replay" })}${ctl("fs", { ko: "전체 화면", en: "Full screen" })}</div></div>
      ${auto ? `<p class="demo-note">${esc(L("회사 관련 사정으로 직접 실행 대신 구동 시연 영상을 제공합니다.", "For company-related reasons, a demo recording is provided instead of running the app directly."))}</p>`
        : `<div class="demo-go"><button type="button" class="btn" data-open-app><span>${esc(L(h.app))}</span><span class="arr" aria-hidden="true">→</span></button>
        <p>${esc(L(h.appNote))}<small>${esc(L("언어 모델 연결을 진행 중이며, 아직 출시하지 않았습니다.", "Language-model connection is in progress; this has not been released yet."))}</small></p></div>`}</div>`;
  };
  const rows = (list) => `<ul class="rows">${list.map((r) => `<li><b>${esc(L(r.k))}</b><span>${esc(L(r.v))}</span></li>`).join("")}</ul>`;
  const items = (list, n) => `<ol class="list" style="--n:${n || list.length}">${list.map((x) => `<li><h3>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`;
  const sec = (id, inner, cls = "") => `<section class="sec ${cls}" data-anchor="${id}"><div class="in">${inner}</div></section>`;
  /* turning points: titles carry the event, paragraphs carry the reasoning; the line between them draws as you read */
  const turns = (T, v) => `<ol class="turns v-${v}" data-turns style="--n:${T.list.length}"><span class="tline" aria-hidden="true"><i></i></span>
      ${T.list.map((x, i) => `<li class="turn" data-anchor="turn-${v}-${i}"><span class="tdot" aria-hidden="true"></span>
        <h3><i>${pad(i + 1)}</i>${esc(L(x.t))}</h3><div class="tp">${x.p.map((p) => `<p>${esc(L(p))}</p>`).join("")}</div></li>`).join("")}</ol>`;
  /* sets of pages that open in the enlarged view */
  const SETS = {
    guide: () => [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ img: "mkf-p" + n, t: { ko: `최종 어셈블리 가이드 ${n}쪽`, en: `Final assembly guide p.${n}` } })),
    // phone photo and its guide page, step by step
    album: () => C.montauk.album.steps.flatMap((s) => [{ img: s.ph, t: { ko: `${s.t.ko} · ${C.montauk.album.phone.ko}`, en: `${s.t.en} · ${C.montauk.album.phone.en}` } }, { img: s.pg, t: { ko: `${s.t.ko} · ${C.montauk.album.guide.ko}`, en: `${s.t.en} · ${C.montauk.album.guide.en}` } }])
  };
  const zoom = (set, i, inner, labelText) => `<button type="button" class="zoom" data-zoom="${set}|${i}" aria-label="${esc(labelText + " — " + L(C.ui.viewLarge))}">${inner}</button>`;
  const pages = (set, n, prefix, aria) => `<div class="pages" tabindex="0" role="region" aria-label="${esc(aria)}">${Array.from({ length: n }, (_, i) => `<figure>${zoom(set, i, `<span class="ph fig" style="position:relative;display:block">${M.img(prefix + (i + 1), `${aria} p.${i + 1}`, { sizes: "230px" })}</span>`, `${aria} p.${i + 1}`)}<figcaption>p.${i + 1}</figcaption></figure>`).join("")}</div>`;

  /* ───── About ───── */
  function about() {
    const A = C.about;
    return sec("a-head", `<div class="about-head"><div><p class="nm" lang="en">Yoosin Lee</p><p class="rl">${esc(L(A.sub))}</p></div>
        <div><p class="tg" lang="en">Design the missing link.</p><p class="lead">${esc(L(A.view))}</p></div></div>`, "hero")
      + sec("a-tl", `${label(1, { ko: "지나온 길", en: "The path so far" })}
        <ol class="tl" id="tl">${A.timeline.map((x, i) => `<li data-anchor="tl-${i}"><h3><small>${esc(L(x.when)) || "&nbsp;"}</small>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`)
      + sec("a-why", `${label(2, { ko: "Why SK AIGEN", en: "Why SK AIGEN" })}<div class="why">${A.why[YL.lang].map((p, i) => `<p data-anchor="why-${i}">${esc(p)}</p>`).join("")}</div>`)
      + sec("a-links", `${label(3, { ko: "연락", en: "Contact" })}<div class="links">${A.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.t)} <span aria-hidden="true">↗</span><span class="sr-only">${esc(L("(새 창)", "(opens in a new tab)"))}</span></a>`).join("")}</div>`);
  }

  /* ───── Art & Design ───── */
  function art() {
    const A = C.art;
    const nav = `<nav class="cats" aria-label="${esc(L("분야", "Fields"))}">${A.cats.map((c, i) => `<a href="#cat-${c.k}" data-cat="${c.k}" aria-current="${i === 0}">${esc(L(c.t))}</a>`).join("")}</nav>`;
    let first = true;
    const tile = (c, { p, pi, it, ii }, multi) => {
      const eager = (first && ii === 0) || it.eager; if (first && ii === 0) first = false;
      const cls = `tile ${it.w || ""} ${it.fit === "contain" ? "contain" : ""} ${it.video ? "video" : ""} ${it.ar ? "ar" : ""}`; const st = it.ar ? ` style="--tar:${it.ar}"` : "";
      const alt = `${L(p.t)} — ${L(it.t)}`;
      // inside a project the heading already names it, so the caption only says what this view shows
      const meta = multi ? `<span class="meta">${esc(L(it.t))}</span>` : `<span class="meta"><b ${typeof p.t === "string" ? 'lang="en"' : ""}>${esc(L(p.t))}</b>${esc(L(p.d))}</span>`;
      if (it.video) return `<div class="${cls}" data-anchor="t-${it.img}"><div class="tw">${M.video(it.video, it.img, alt, { sizes: "(max-width:760px) 100vw, 60vw" })}</div>${meta}</div>`;
      return `<button type="button" class="${cls}"${st} data-lb="${c.k}|${pi}|${ii}" aria-label="${esc(alt + " — " + L(C.ui.viewLarge))}"><span class="tw">${M.img(it.img, alt, { eager, sizes: it.ar ? "(max-width:760px) 100vw, 50vw" : it.w && /w(8|12)/.test(it.w) ? "(max-width:760px) 100vw, 70vw" : "(max-width:760px) 50vw, 34vw" })}</span>${meta}</button>`;
    };
    const body = A.cats.map((c) => { const n = c.projects.reduce((a, p) => a + p.items.filter((x) => !x.video).length, 0), nv = c.projects.reduce((a, p) => a + p.items.filter((x) => x.video).length, 0);
      return `<div class="cat-h" id="cat-${c.k}" data-anchor="cat-${c.k}"><h3>${esc(L(c.t))}</h3><span>${esc(nv ? L(`영상 ${nv}편`, `${nv} film${nv > 1 ? "s" : ""}`) : L(`이미지 ${n}장`, `${n} images`))}</span></div>
      ${groups(c).map((grp) => {
        // a project opens with its representative views; the rest wait behind “More process and views”
        const show = grp.multi ? (grp.p.show || 6) : grp.list.length, main = grp.list.slice(0, show), rest = grp.list.slice(show);
        return `<div class="proj" data-anchor="p-${c.k}-${grp.i}">${grp.multi ? `<div class="proj-h"><h4 ${typeof grp.p.t === "string" ? 'lang="en"' : ""}>${esc(L(grp.p.t))}</h4><p>${esc(L(grp.p.d))}</p></div>` : ""}
          <div class="gal ${grp.multi ? "" : "singles"}">${main.map((x) => tile(c, x, grp.multi)).join("")}</div>
          ${rest.length ? `<div class="more-wrap" hidden id="more-${c.k}-${grp.i}"><div class="gal">${rest.map((x) => tile(c, x, grp.multi)).join("")}</div></div>
            <button type="button" class="more-btn" data-more="more-${c.k}-${grp.i}" aria-expanded="false" aria-controls="more-${c.k}-${grp.i}"><span class="mb-t">${esc(L(`과정과 다른 컷 보기 (${rest.length})`, `More process and views (${rest.length})`))}</span><span class="mb-c" hidden>${esc(L("접기", "Show less"))}</span><i aria-hidden="true">+</i></button>` : ""}</div>`;
      }).join("")}`; }).join("");
    /* projects with several views get their own heading; single pieces share one grid */
    function groups(c) {
      const out = []; let single = null;
      c.projects.forEach((p, pi) => {
        const list = p.items.map((it, ii) => ({ p, pi, it, ii }));
        if (p.items.length > 1) { single = null; out.push({ multi: true, p, i: pi, list }); }
        else { if (!single) { single = { multi: false, i: pi, list: [] }; out.push(single); } single.list.push(...list); }
      });
      return out;
    }
    return sec("art", `<p class="lead" style="margin:0">${esc(L(A.lead))}</p><p class="cap" style="margin:4px 0 0">${esc(L(A.hint))}</p>${nav}${body}`, "hero art-hero");
  }

  /* ───── Montauk: commission → handover → feedback → tool; the same step compared, original vs output ───── */
  function montauk() {
    const D = C.montauk, h = D.hero, A = D.album;
    const hero = sec("m-hero", `<p class="hero-line">${esc(L(h.line))}</p>${demo("montauk", h)}`, "hero");
    // why each decision came: right under the demo and its note
    const t = sec("m-turns", `${label(1, D.turns.label)}${turns(D.turns, "zig")}`, "tight");
    // phone photo → hand-made illustrated guide, step by step
    const album = sec("m-album", `${label(2, A.label)}<h2 class="h2" style="margin-bottom:24px">${esc(L(A.h))}</h2>
      <div class="album" data-cmp style="--n:${A.steps.length}">

        ${A.steps.map((s, i) => `<figure class="album-s"><figcaption>${esc(L(s.t))}</figcaption>
          ${zoom("album", i * 2, `<span class="ph phone">${M.img(s.ph, `${L(s.t)} · ${L(A.phone)}`, { sizes: "(max-width:760px) 50vw, 24vw" })}<b class="chip">${esc(L(A.phone))}</b></span>`, `${L(s.t)} · ${L(A.phone)}`)}
          <span class="album-ln" aria-hidden="true"><i></i></span>
          ${zoom("album", i * 2 + 1, `<span class="ph page">${M.img(s.pg, `${L(s.t)} · ${L(A.guide)}`, { sizes: "(max-width:760px) 50vw, 24vw" })}<b class="chip">${esc(L(A.guide))}</b></span>`, `${L(s.t)} · ${L(A.guide)}`)}</figure>`).join("")}
      </div><p class="cap">${esc(L(A.note))}</p>`);
    const s1 = sec("m-1", `${label(3, D.s1.label)}<div class="duo"><h2 class="h2">${esc(L(D.s1.h))}</h2><div>${L(D.s1.p).map((p) => `<p class="p">${esc(p)}</p>`).join("")}</div></div>
      <div style="margin-top:32px">${pages("guide", 8, "mkf-p", L("최종 어셈블리 가이드", "Final assembly guide"))}</div><p class="cap">${esc(L(D.s1.pagesCap))}</p>`);
    const s2 = sec("m-2", `${label(4, D.s2.label)}<h2 class="h2" style="margin-bottom:28px">${esc(L(D.s2.h))}</h2>
      <div class="seq" id="seq">${D.s2.steps.map((s, i) => `<div class="step" data-anchor="m-2-${i}"><div class="ph fig" style="position:relative;aspect-ratio:4/3;--ar:4/3">${M.img(s.img, L(s.t), { sizes: "(max-width:760px) 100vw, 33vw" })}</div>
        <div class="bar"><i></i></div><h3><i>${pad(i + 1)}</i>${esc(L(s.t))}</h3><p>${esc(L(s.d))}</p></div>`).join("")}</div>`);
    const s4 = sec("m-4", `${label(5, D.s4.label)}${items(D.s4.items, 4)}`);
    const s6 = sec("m-6", `${label(6, D.s6.label)}${rows(D.s6.rows)}`);
    return hero + t + album + s1 + s2 + s4 + s6;
  }

  /* ───── GROWN: brand work → proposal → a stop for unconfirmed data; one spreadsheet row linked to its verdict ───── */
  function grown() {
    const D = C.grown, h = D.hero;
    const hero = sec("g-hero", `<p class="hero-line">${esc(L(h.line))}</p>${demo("grown", h)}
      <p class="cap">${esc(L("보조 명칭 C.P.V.A.S · 화면의 현장과 수치는 모두 가상 예시입니다.", "Also known as C.P.V.A.S · every site and figure on screen is a fictional sample."))}</p>`, "hero");
    const link = sec("g-link", `${label(1, D.link.label)}<h2 class="h2" style="margin-bottom:24px">${esc(L(D.link.h))}</h2>${grownLink()}<p class="cap">${esc(L(D.link.note))}</p>`);
    const t = sec("g-turns", `${label(2, D.turns.label)}${turns(D.turns, "cols")}`);
    const vi = sec("g-vi", `${label(3, { ko: "처음 맡은 브랜드 작업", en: "The brand work I started with" })}
      <div class="vi">
        ${fig("gr-vi-1", { ko: "GROWN 심벌", en: "GROWN symbol" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-2", { ko: "가로형 로고", en: "Horizontal logo" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-3", { ko: "명함 · 색상 체계", en: "Business cards · colour system" }, { cls: "s4", ar: "16 / 9" })}
        ${fig("gr-card-logo", { ko: "명함 로고 면", en: "Card front" }, { cls: "s4", ar: "16 / 9" })}
        <figure class="fig s4"><div class="ph" style="--ar:16/9"><div class="card-re" aria-hidden="true"><span class="lg">GROWN</span><span><span class="nmx">홍 길 동</span><span class="rlx">Founder &amp; CEO</span></span><span class="ad">010-0000-0000<br>서울 ○○구 ○○로 00<br>name@example.com</span></div></div><figcaption class="cap">${esc(L(D.s1.cardCap))}</figcaption></figure>
      </div>`);
    const s2 = sec("g-2", `${label(4, D.s2.label)}${items(D.s2.items, 3)}`);
    const s4 = sec("g-4", `${label(5, D.s4.label)}${items(D.s4.items, 4)}`);
    const s5 = sec("g-5", `${label(6, D.s5.label)}${rows(D.s5.rows)}`);
    return hero + link + t + vi + s2 + s4 + s5;
  }
  function grownLink(sel) {
    const G = window.GROWN_SAMPLE; if (!G) return ""; // precomputed results; the engine is not shipped
    const list = G.rows, cur = sel || "B1|201";
    return `<div class="glink" data-glink>
      <div class="gx" role="group" aria-label="${esc(L("예시 물건 목록", "Sample unit list"))}">
        <div class="gx-h" aria-hidden="true"><span>${esc(L("현장", "Site"))}</span><span>${esc(L("호실", "Unit"))}</span><span>${esc(L("면적", "Area"))}</span><span>${esc(L("월 임대료", "Rent"))}</span><span>${esc(L("공실", "Vacant"))}</span></div>
        ${list.map((r) => `<button type="button" class="gx-r" data-row="${r.key}" aria-pressed="${r.key === cur}"><span>${esc(L(r.site))}</span><span lang="en">${esc(r.id)}</span><span lang="en">${r.area}㎡</span><span lang="en">${esc(L(r.rent))}</span><span lang="en">${r.vac == null ? "—" : r.vac + L("개월", " mo")}</span></button>`).join("")}
      </div>
      <div class="gr" aria-live="polite">${grownResult(cur)}</div></div>`;
  }
  function grownResult(key) {
    const r = window.GROWN_SAMPLE && window.GROWN_SAMPLE.reads[key]; if (!r) return "";
    return `<div class="gr-in" style="--c:${r.color}">
      <p class="gr-unit"><b lang="en">${esc(r.id)}</b>${esc(L(r.site))}</p>
      <ol class="gr-steps">
        <li class="gr-v"><span>${esc(L("예비 판정", "Preliminary verdict"))}</span><b>${esc(L(r.verdict))}</b><em lang="en">${esc(L("점수 ", "Score "))}${esc(r.score)}${r.p24 != null ? ` · ${esc(L("24개월 내 임대 가능성 ", "24-month leasing chance "))}${r.p24}%` : ""}</em></li>
        <li><span>${esc(L("근거", "Reasons"))}</span><p>${esc(L(r.reason))}</p></li>
        <li><span>${esc(L("필요한 자료", "Data needed"))}</span><p>${esc(L(r.need))}</p></li>
        <li><span>${esc(L("우선 조치", "Actions first"))}</span><p>${esc(L(r.action))}</p></li>
      </ol>
      <p class="gr-stage"><i class="on">${esc(L("자동 계산 · 예비", "Auto · preliminary"))}</i><i>${esc(L("사용자 자료 보완 → 재계산", "User fills data → recalculates"))}</i><i>${esc(L("전문가 확인 → 확정", "Expert check → confirmed"))}</i></p></div>`;
  }

  /* ───── Make It!: A10 first, then the brief, the maker's reply and the revised specs ───── */
  function makeit() {
    const D = C.makeit, h = D.hero;
    const hero = sec("k-hero", `<p class="hero-line">${esc(L(h.line))}</p>${demo("makeit", h)}`, "hero");
    /* A10 art toy: the drawing next to the model it became (a separate piece of work from the app) */
    const toy = sec("k-toy", `${label("3D", { ko: "A10 아트토이", en: "A10 art toy" })}
      <div class="duo"><h2 class="h2">${esc(L("원화의 선을 입체로 옮기기", "Taking the drawing's lines into 3D"))}</h2>
        <p class="lead" style="margin-top:0">${esc(L("연필로 그린 A10 원화를 Tripo AI로 입체 모델로 옮겼습니다. 가는 가지, 눈, 감긴 줄이 어떤 덩어리가 되었는지 직접 돌려 보며 비교해 보세요. 이 모델이 Make It!에서 제작 문의서를 쓰게 된 출발점입니다.", "I turned the pencil drawing A10 into a 3D model with Tripo AI. Turn it yourself and compare how the thin branches, the eye and the coiled lines became volumes. This model is where the Make It! build brief started."))}</p></div>
      <div class="toy" data-toy>
        <figure class="toy-art"><div class="ph" style="--ar:${M.ratio("a10")}">${M.img("a10", L("A10 원화 · 연필 드로잉", "A10 · pencil drawing"), { sizes: "(max-width:760px) 100vw, 45vw" })}</div><figcaption class="cap">${esc(L("A10 · 원화", "A10 · original drawing"))}</figcaption></figure>
        <figure class="toy-3d">${window.VIEWER3D ? window.VIEWER3D.markup({ src: "assets/model/a10-arttoy.glb", video: "assets/video/a10-rotation.mp4", poster: "assets/img/a10-rotation-poster.jpg", alt: L("A10 아트토이 3D 모델의 대표 장면", "A10 art toy 3D model, representative frame") }) : ""}
          <figcaption class="cap">${esc(L("A10 아트토이 · Tripo AI 3D 모델 · 직접 돌려 보기", "A10 art toy · Tripo AI 3D model · turn it yourself"))}</figcaption></figure></div>`);
    const ex = sec("k-ex", `${label(1, D.exchange.label)}<h2 class="h2" style="margin-bottom:24px">${esc(L(D.exchange.h))}</h2>${exchange()}<p class="cap">${esc(L(D.exchange.note))}</p>`);
    const t = sec("k-turns", `${label(2, D.turns.label)}${turns(D.turns, "chain")}`);
    const s3 = sec("k-3", `${label(3, D.s3.label)}${items(D.s3.items, 3)}`);
    const s5 = sec("k-5", `${label(4, D.s5.label)}${rows(D.s5.rows)}`);
    return hero + toy + ex + t + s3 + s5;
  }
  function exchange() {
    const X = window.MAKEIT && window.MAKEIT.sample(YL.lang); if (!X) return "";
    const mark = (txt, changed) => esc(txt).split("\n").map((ln) => changed.some((c) => ln.includes(c)) ? `<mark>${ln}</mark>` : ln).join("\n");
    return `<div class="xch" data-xch>
      <article class="xch-c"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("제작 문의서", "Build brief"))} v1</span></header><pre>${esc(X.v1)}</pre></article>
      <span class="xch-l" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c xch-r"><header><b lang="en">${esc(X.maker)}</b><span>${esc(L("예시 회신 · 사양 보완 요청", "Sample reply · change request"))}</span></header>
        <ul>${X.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul><p class="xch-msg">“${esc(X.msg)}”</p></article>
      <span class="xch-l back" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("요청 반영", "Revised"))} · v2</span></header><pre>${mark(X.v2, X.changed)}</pre></article>
    </div>`;
  }

  /* ───── Like this: the unfamiliar phrases first, then where each layer comes from ───── */
  function likethis() {
    const D = C.likethis, h = D.hero, R = D.read;
    const hero = sec("l-hero", `<p class="hero-line">${esc(L(h.line))}</p>${demo("likethis", h)}`, "hero");
    let src = esc(R.src);
    R.layers.forEach((l, i) => { if (l.from) src = src.replace(esc(l.from), `<mark data-from="${i}">${esc(l.from)}</mark>`); });
    const read = sec("l-read", `${label(1, R.label)}<h2 class="h2" style="margin-bottom:24px">${esc(L(R.h))}</h2>
      <div class="lread" data-lread><p class="lread-src" lang="en">“${src}”</p><p class="cap">${esc(L(R.srcNote))}</p>
        <ol class="lread-l">${R.layers.map((l, i) => `<li data-layer="${i}" ${l.from ? `data-src="${i}" tabindex="0"` : ""}><h3><i>${i + 1}</i>${esc(L(l.t))}${l.from ? `<span lang="en">“${esc(l.from)}”</span>` : ""}</h3><p ${l.lang ? `lang="${l.lang}" class="q"` : ""}>${esc(L(l.d))}</p>${l.miss ? `<p class="miss">${esc(L(l.miss))}</p>` : ""}</li>`).join("")}</ol></div>`);
    const t = sec("l-turns", `${label(2, D.turns.label)}${turns(D.turns, "talk")}`);
    const s2 = sec("l-2", `${label(3, D.s2.label)}<div class="pair">${D.s2.items.map((x) => `<div><h3 lang="en">${esc(x.t)}</h3><span lang="ko">${esc(x.ko)}</span><p class="p" style="margin:0">${esc(L(x.d))}</p></div>`).join("")}</div>
      <p class="bridge">${esc(L(D.s2.bridge))}</p>`);
    const s3 = sec("l-3", `${label(4, D.s3.label)}${items(D.s3.items, 3)}`);
    const s4 = sec("l-4", `${label(5, D.s4.label)}${rows(D.s4.rows)}`);
    return hero + read + t + s2 + s3 + s4;
  }

  const R = { about, art, montauk, grown, makeit, likethis };

  /* ───── behaviours ───── */
  let cleanup = [];
  function mount(k, root, scroller) {
    unmount();
    M.wireVideos(root);
    const reduce = YL.reduceMotion();
    // 3D model: loads itself when it comes close
    if (window.VIEWER3D && $("[data-v3-root]", root)) cleanup.push(window.VIEWER3D.mount(root));
    // app recordings: poster + play button; never autoplay; stop when scrolled away or when the detail closes
    // Montauk/GROWN ("auto"): muted autoplay while on screen, unless the visitor paused it or prefers reduced motion.
    // Make It!/Like this: wait for a tap. Both: pause off screen, replay, full screen; the poster shows until the video loads.
    $$(".demo", root).forEach((d) => {
      const v = $(".demo-video", d), auto = d.classList.contains("auto");
      let user = null; // true = asked to play, false = paused it themselves
      const load = () => { if (!v.src) { v.src = v.dataset.src; v.preload = "auto"; } };
      const play = () => { load(); const p = v.play(); if (p && p.catch) p.catch(() => d.classList.add("blocked")); };
      const sync = () => { const on = !v.paused; d.classList.toggle("playing", on); if (on) d.classList.remove("blocked"); d.dataset.user = user === false ? "off" : "on";
        $$('[data-demo="toggle"]', d).forEach((b) => { b.setAttribute("aria-pressed", String(on)); b.setAttribute("aria-label", on ? L("일시정지", "Pause") : L("재생", "Play")); const t = $(".dt, .demo-pp-t", b); if (t) t.textContent = b.classList.contains("demo-pp") ? L("구동 영상 재생", "Play the recording") : on ? L("일시정지", "Pause") : L("재생", "Play"); });
        d.classList.toggle("ended", v.ended); };
      ["play", "pause", "ended", "playing"].forEach((ev) => v.addEventListener(ev, sync));
      d.addEventListener("click", (e) => {
        const b = e.target.closest("[data-demo]"); const a = b ? b.dataset.demo : e.target === v ? "toggle" : null; if (!a) return;
        if (a === "toggle") { if (v.paused) { user = true; play(); } else { user = false; v.pause(); } }
        if (a === "replay") { user = true; load(); v.currentTime = 0; play(); }
        if (a === "fs") { const box = $(".demo-v", d); if (box.requestFullscreen) box.requestFullscreen().catch(() => {}); else if (v.webkitEnterFullscreen) { load(); v.webkitEnterFullscreen(); } }
      });
      // fetch only when the block comes close; autoplay only when it is actually in view
      const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(); near.disconnect(); } }), { rootMargin: "300px 0px" });
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { if (auto && user !== false && !reduce) play(); }
        else if (!v.paused) v.pause();
      }), { threshold: 0.4 });
      near.observe(d); io.observe(d);
      d.dataset.user = "off"; sync();
      cleanup.push(() => { io.disconnect(); near.disconnect(); v.pause(); });
    });
    // one-time "arrive" cues for evidence blocks (they are fully readable before and after)
    const cue = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); cue.unobserve(e.target); } }), { root: scroller, threshold: 0.35 });
    $$("[data-cmp], [data-xch], [data-lread], [data-toy], [data-glink]", root).forEach((el) => reduce ? el.classList.add("on") : cue.observe(el));
    cleanup.push(() => cue.disconnect());
    const onScroll = () => {
      const vh = scroller.clientHeight;
      const tl = $("#tl", root);
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
        tl.style.setProperty("--tp", p.toFixed(3));
        $$("li", tl).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.6));
      }
      // turning points: the connecting line follows the reader; the current point is marked
      $$("[data-turns]", root).forEach((T) => {
        const r = T.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.62 - r.top) / Math.max(1, r.height)));
        T.style.setProperty("--tp", reduce ? 1 : p.toFixed(3));
        $$(".turn", T).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.66));
      });
      const seq = $("#seq", root);
      if (seq) {
        const steps = $$(".step", seq);
        const stacked = getComputedStyle(seq).gridTemplateColumns.split(" ").length < 2;
        steps.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          let p;
          if (stacked) p = (vh * 0.75 - r.top) / (r.height * 0.6);
          else { const sr = seq.getBoundingClientRect(); p = ((vh * 0.85 - sr.top) / (sr.height + vh * 0.25)) * steps.length - i; }
          p = Math.max(0, Math.min(1, p));
          s.style.setProperty("--sp", p.toFixed(3));
          s.classList.toggle("on", p > 0.05 || reduce);
        });
      }
      // gallery: which field is being read
      const cats = $$(".cat-h", root);
      if (cats.length) {
        let cur = cats[0].dataset.anchor;
        cats.forEach((c) => { if (c.getBoundingClientRect().top < 140) cur = c.dataset.anchor; });
        $$(".cats a", root).forEach((a) => a.setAttribute("aria-current", String("cat-" + a.dataset.cat === cur)));
      }
    };
    let q = 0;
    // a recording that leaves the screen stops right away (not tied to animation frames or the observer)
    const stopAway = () => $$(".demo-video", root).forEach((v) => { if (!v.paused) { const r = v.getBoundingClientRect(), s = scroller.getBoundingClientRect(); if (r.bottom < s.top + 20 || r.top > s.bottom - 20) v.pause(); } });
    const sc = () => { stopAway(); if (!q) q = requestAnimationFrame(() => { q = 0; onScroll(); }); };
    scroller.addEventListener("scroll", sc, { passive: true });
    cleanup.push(() => scroller.removeEventListener("scroll", sc));
    requestAnimationFrame(onScroll);
    // Like this: a layer and the phrase it comes from light up together
    const lr = $("[data-lread]", root);
    if (lr) {
      const hi = (i) => { $$("mark[data-from]", lr).forEach((m) => m.classList.toggle("hot", m.dataset.from === i)); $$("[data-layer]", lr).forEach((l) => l.classList.toggle("hot", l.dataset.layer === i)); };
      ["mouseover", "focusin"].forEach((ev) => lr.addEventListener(ev, (e) => { const t = e.target.closest("[data-src], mark[data-from]"); hi(t ? (t.dataset.src || t.dataset.from) : null); }));
      lr.addEventListener("mouseleave", () => hi(null)); lr.addEventListener("focusout", () => hi(null));
    }
    root.addEventListener("click", onClick);
    cleanup.push(() => root.removeEventListener("click", onClick));
    function onClick(e) {
      const t = e.target.closest("[data-lb]:not(.imgerr)");
      if (t) {
        const [ck, pi] = t.dataset.lb.split("|").map((x, i) => i ? +x : x); const ii = +t.dataset.lb.split("|")[2];
        const p = C.art.cats.find((c) => c.k === ck).projects[pi];
        M.lbOpen(p.items.filter((x) => !x.video), ii, L(p.t), t);
        return;
      }
      // a tile whose image failed: try again instead of opening the enlarged view
      const bad = e.target.closest(".tile.imgerr");
      if (bad) { const im = $("img", bad); bad.classList.remove("imgerr"); im.classList.remove("err", "ok"); const s = im.getAttribute("src").split("?")[0]; im.removeAttribute("srcset"); im.src = s + "?r=" + Date.now(); return; }
      // “More process and views”: grows in place; closing keeps the button where the reader's eye is
      const mb = e.target.closest("[data-more]");
      if (mb) {
        const box = $("#" + mb.dataset.more, root), open = mb.getAttribute("aria-expanded") === "true", y0 = mb.getBoundingClientRect().top;
        if (!open) { box.hidden = false; if (!reduce) box.animate([{ height: "0px", opacity: 0 }, { height: box.scrollHeight + "px", opacity: 1 }], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" }); }
        else { box.hidden = true; scroller.scrollTop += mb.getBoundingClientRect().top - y0; }
        mb.setAttribute("aria-expanded", String(!open)); $(".mb-t", mb).hidden = !open; $(".mb-c", mb).hidden = open; $("i", mb).textContent = open ? "+" : "−";
        return;
      }
      const z = e.target.closest("[data-zoom]");
      if (z) { const [set, i] = z.dataset.zoom.split("|"); M.lbOpen(SETS[set](), +i, "Montauk Assembly Guide", z); return; }
      // GROWN: choosing a row recalculates that unit and moves the result next to it
      const row = e.target.closest("[data-row]");
      if (row) {
        const box = row.closest("[data-glink]");
        $$("[data-row]", box).forEach((b) => b.setAttribute("aria-pressed", String(b === row)));
        const gr = $(".gr", box); gr.innerHTML = grownResult(row.dataset.row);
        if (!reduce) $$(".gr-steps > li", gr).forEach((li, i) => li.animate([{ opacity: .25, transform: "translateX(-10px)" }, { opacity: 1, transform: "none" }], { duration: 260, delay: i * 70, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }));
        box.style.setProperty("--ry", (row.offsetTop + row.offsetHeight / 2) + "px");
        return;
      }
      const a = e.target.closest(".cats a");
      if (a) {
        e.preventDefault();
        const tgt = $("#cat-" + a.dataset.cat, root);
        // land the field title just under the pinned category bar (and under the control row when scrolling up brings it back)
        const raw = tgt.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop, cats = $(".cats", root), ctl = $("#sheet-ctl");
        const top = raw - (cats ? cats.offsetHeight : 0) - (raw < scroller.scrollTop && ctl ? ctl.offsetHeight : 0) - 12;
        scroller.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        tgt.setAttribute("tabindex", "-1"); tgt.focus({ preventScroll: true });
      }
    }
    // GROWN: place the connector at the initially selected row
    const gl = $("[data-glink]", root);
    if (gl) requestAnimationFrame(() => { const r = $('[data-row][aria-pressed="true"]', gl); if (r) gl.style.setProperty("--ry", (r.offsetTop + r.offsetHeight / 2) + "px"); });
  }
  function unmount() { M.stopAll(); cleanup.forEach((f) => f()); cleanup = []; }

  window.DETAIL = { render: (k) => R[k](), mount, unmount };
})();
