/* Project detail bodies. Each project reads as: the job → what I noticed → first attempt → the wall → what changed → what works now.
   Every case has its own evidence block and its own motion; nothing shares one reveal effect. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const C = window.CONTENT, M = window.MEDIA;
  const pad = (n) => String(n).padStart(2, "0");
  // "·" marks a section without a number: it shows as a plain colour square
  const label = (n, t) => `<p class="label">${n === "·" ? `<b class="dot" aria-hidden="true"></b>` : `<b>${typeof n === "number" ? pad(n) : esc(n)}</b>`}${esc(L(t))}</p>`;
  const fig = (name, cap, o = {}) => `<figure class="fig ${o.cls || ""}" ${o.anchor ? `data-anchor="${o.anchor}"` : ""}>
      <div class="ph ${o.ph || ""}" style="--ar:${o.ar || M.ratio(name)}">${o.video ? M.video(o.video, name, L(cap), o) : M.img(name, L(cap), o)}</div>
      ${cap ? `<figcaption class="cap">${esc(L(cap))}</figcaption>` : ""}</figure>`;
  /* App recordings: the control bar sits under the video. Montauk and GROWN are demo-only (muted autoplay on screen).
     Make It! and Like this: the entry starts with “Try it”, then what you can do and the first move, then the release / model status. */
  const DEMO_ONLY = new Set(["montauk", "grown"]);
  const demo = (k, h, o = {}) => {
    const name = { montauk: "Montauk Manual Studio", grown: "GROWN Recovery Scan", "grown-mobile": "GROWN Rent Scan", makeit: "Make It!", likethis: "Like this" }[k];
    // o.noEn: one recording for both languages (the GROWN mobile app has a Korean UI only)
    const en = YL.lang === "en" && !o.noEn ? "-en" : "", auto = DEMO_ONLY.has(k) || k === "grown-mobile", phone = k === "montauk" || k === "grown-mobile";
    const btn = (a, t, icon) => `<button type="button" data-demo="${a}" ${a !== "replay" ? 'aria-pressed="false"' : ""}><span class="di di-${icon}" aria-hidden="true"></span><span class="dt">${esc(L(t))}</span></button>`;
    const go = auto ? "" : `<div class="demo-go">
        <button type="button" class="btn" data-open-app><span>${esc(L(h.app))}</span><span class="arr" aria-hidden="true">→</span></button>
        <p class="dg-lead">${esc(L(h.tryLead))}</p>
        ${h.five ? `<p class="dg-five">${esc(L("직접 작성한 다섯 표현: ", "The five hand-written expressions: "))}<span lang="en">${esc(h.five)}</span></p>` : ""}
        <p class="dg-status">${esc(L(h.tryStatus))}</p></div>`;
    return `<div class="demo ${phone ? "phone" : ""} ${auto ? "auto" : "trial"}" data-anchor="${k}-demo">${o.label ? `<p class="demo-label">${esc(L(o.label))}</p>` : ""}
      ${go}
      <div class="demo-stage">
        <div class="demo-v"><video class="demo-video" muted playsinline webkit-playsinline preload="none" poster="assets/img/demo-${k}${en}-poster.jpg" data-src="assets/video/demo-${k}${en}.mp4" aria-label="${esc(L({ ko: `${name} 구동 시연 영상`, en: `${name} — demo recording` }))}"></video></div>
        <div class="demo-bar" role="group" aria-label="${esc(L("영상 조작", "Video controls"))}">${btn("toggle", { ko: "재생", en: "Play" }, "play")}${btn("replay", { ko: "다시 보기", en: "Replay" }, "replay")}${btn("fs", { ko: "전체 화면", en: "Full screen" }, "fs")}</div>
      </div>
      ${o.note ? `<p class="demo-note">${esc(L(o.note))}</p>` : ""}</div>`;
  };
  /* every project opens with two short notes, readable within the first screen:
     where AI was used (in the making vs. inside the app), and what I judged myself */
  const aiBlock = (A) => `<div class="aij" data-aij>
      <section class="aij-c"><h3>${esc(L("AI를 활용한 부분", "Where AI was used"))}</h3>
        <dl>${A.process.map((x) => `<div><dt><span class="aij-tag">${esc(L("기획·제작 과정", "Planning & making"))}</span>${esc(L(x.t))}</dt><dd>${esc(L(x.d))}</dd></div>`).join("")}
          <div><dt><span class="aij-tag app">${esc(L(A.app.t))}</span></dt><dd>${esc(L(A.app.d))}</dd></div></dl></section>
      <section class="aij-c"><h3>${esc(L("내가 판단한 것", "What I judged"))}</h3>
        <ul>${A.mine.map((x) => `<li>${esc(L(x))}</li>`).join("")}</ul></section></div>`;
  const rows = (list) => `<ul class="rows">${list.map((r) => `<li><b>${esc(L(r.k))}</b><span>${esc(L(r.v))}</span></li>`).join("")}</ul>`;
  const items = (list, n) => `<ol class="list" style="--n:${n || list.length}">${list.map((x) => `<li><h3>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`;
  const sec = (id, inner, cls = "") => `<section class="sec ${cls}" data-anchor="${id}"><div class="in">${inner}</div></section>`;
  /* turning points: titles carry the event, paragraphs carry the reasoning; the line between them draws as you read */
  const turns = (T, v) => `<ol class="turns v-${v}" data-turns style="--n:${T.list.length}"><span class="tline" aria-hidden="true"><i></i></span>
      ${T.list.map((x, i) => `<li class="turn" data-anchor="turn-${v}-${i}"><span class="tdot" aria-hidden="true"></span>
        <h3><i>${pad(i + 1)}</i>${esc(L(x.t))}</h3><div class="tp">${x.p.map((p) => `<p>${esc(L(p))}</p>`).join("")}</div></li>`).join("")}</ol>`;
  /* sets of pages that open in the enlarged view */
  const SETS = {
    // the two daybed guides, page by page: direct p1, app p1, direct p2, app p2 …
    cmp: () => C.montauk.compare.pages.flatMap((p) => [
      { img: "mkd-p" + p.n, t: { ko: `직접 제작한 가이드 · ${p.n}쪽 · ${p.t.ko}`, en: `The guide I made · p.${p.n} · ${p.t.en}` } },
      { img: "mkf-p" + p.n, t: { ko: `앱 버전 가이드 · ${p.n}쪽 · ${p.t.ko}`, en: `App-version guide · p.${p.n} · ${p.t.en}` } }]),
    s1: () => [{ img: "mk-ph-2", t: C.montauk.s1.phone }, { img: "mkd-p4", t: C.montauk.s1.page }],
    flow: () => C.montauk.flow.steps.map((s) => ({ img: s.img, t: s.t }))
  };
  const zoom = (set, i, inner, labelText) => `<button type="button" class="zoom" data-zoom="${set}|${i}" aria-label="${esc(labelText + " — " + L(C.ui.viewLarge))}">${inner}</button>`;
  const pages = (set, n, prefix, aria) => `<div class="pages" tabindex="0" role="region" aria-label="${esc(aria)}">${Array.from({ length: n }, (_, i) => `<figure>${zoom(set, i, `<span class="ph fig" style="position:relative;display:block">${M.img(prefix + (i + 1), `${aria} p.${i + 1}`, { sizes: "230px" })}</span>`, `${aria} p.${i + 1}`)}<figcaption>p.${i + 1}</figcaption></figure>`).join("")}</div>`;

  /* ───── About: the banner carries the name; the detail starts straight with the path so far ───── */
  function about() {
    const A = C.about;
    return sec("a-tl", `${label(1, { ko: "지나온 길", en: "The path so far" })}
        <ol class="tl" id="tl">${A.timeline.map((x, i) => `<li data-anchor="tl-${i}"><h3><small>${esc(L(x.when)) || "&nbsp;"}</small>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`, "first")
      + sec("a-why", `${label(2, { ko: "Why SK AIGEN", en: "Why SK AIGEN" })}<div class="why">${A.why[YL.lang].map((p, i) => `<p data-anchor="why-${i}">${esc(p)}</p>`).join("")}</div>`)
      + sec("a-links", `${label(3, { ko: "연락", en: "Contact" })}
        <div class="links">${A.links.map((l) => `<a href="${l.href}" ${l.ext ? 'target="_blank" rel="noopener"' : ""}>${esc(l.t)}${l.d ? ` <small lang="en">${esc(l.d)}</small>` : ""} <span aria-hidden="true">${l.ext ? "↗" : "→"}</span>${l.ext ? `<span class="sr-only">${esc(L("(새 창)", "(opens in a new tab)"))}</span>` : ""}</a>`).join("")}<a class="resume-link" href="${A.resume.href}" target="_blank" rel="noopener">${esc(L("이력서 보기", "View Résumé"))} <small lang="${YL.lang === "ko" ? "en" : "ko"}">${esc(YL.lang === "ko" ? "View Résumé" : "이력서 보기")}</small> <span aria-hidden="true">↗</span><span class="sr-only">${esc(L("(PDF, 새 창)", "(PDF, opens in a new tab)"))}</span></a></div>`);
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
        return `<div class="proj" data-anchor="p-${c.k}-${grp.i}">${grp.multi ? `<div class="proj-h"><h4 ${typeof grp.p.t === "string" ? 'lang="en"' : ""}>${esc(L(grp.p.t))}</h4><p>${esc(L(grp.p.d))}</p>${grp.p.cap ? `<p class="proj-cap">${esc(L(grp.p.cap))}</p>` : ""}</div>` : ""}
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

  /* ───── Manual for Manuals: the job → why the next decision came → Montauk Manual Studio → the two guides and what runs → the path as one line ───── */
  function montauk() {
    const D = C.montauk, S1 = D.s1, P = D.app, K = D.compare;
    const hero = sec("m-hero", `<p class="hero-line">${esc(L(D.hero.line))}</p>${aiBlock(D.ai)}`, "hero lead-only");
    const s1 = sec("m-1", `${label(1, S1.label)}<div class="duo"><h2 class="h2">${esc(L(S1.h))}</h2><div><p class="p">${esc(L(S1.p))}</p>
        <dl class="who-did">${S1.roles.map((r) => `<div class="${/AI/.test(r.v.en) ? "ai" : ""}"><dt>${esc(L(r.k))}</dt><dd>${esc(L(r.v))}</dd></div>`).join("")}</dl></div></div>
      <div class="s1-media">
        <figure>${zoom("s1", 0, `<span class="ph">${M.img("mk-ph-2", L(S1.phone), { sizes: "(max-width:760px) 100vw, 30vw" })}</span>`, L(S1.phone))}<figcaption class="cap">${esc(L(S1.phone))}</figcaption></figure>
        <span class="s1-ln" aria-hidden="true"><i></i></span>
        <figure>${zoom("s1", 1, `<span class="ph page">${M.img("mkd-p4", L(S1.page), { sizes: "(max-width:760px) 100vw, 40vw" })}</span><b class="vchip d">${esc(L(K.direct.t))}</b>`, L(S1.page))}<figcaption class="cap">${esc(L(S1.page))}</figcaption></figure>
      </div>`, "tight");
    const t = sec("m-turns", `${label(2, D.turns.label)}${turns(D.turns, "zig")}`);
    const app = sec("m-app", `${label(3, P.label)}<h2 class="h2" style="margin-bottom:20px">${esc(L(P.h))}</h2>
      <ol class="flowchips" aria-label="${esc(L("앱의 흐름", "The app's flow"))}">${P.flow.map((f, i) => `<li><b>${i + 1}</b>${esc(L(f))}</li>`).join("")}</ol>
      <div style="margin-top:28px">${demo("montauk", {}, { note: P.note })}</div>`);
    // the two guides: one page role at a time, the hand-made one first (left on desktop, first on mobile)
    const pick = 4;
    const cmp = sec("m-cmp", `${label(4, K.label)}<h2 class="h2" style="margin-bottom:18px">${esc(L(K.h))}</h2>
      <div class="cmp2" data-cmp2 data-n="${pick}">
        <div class="cmp2-tabs" role="tablist" aria-label="${esc(L("가이드 쪽", "Guide page"))}">${K.pages.map((p) => `<button type="button" role="tab" data-pg="${p.n}" aria-selected="${p.n === pick}"><b lang="en">${p.n}</b>${esc(L(p.t))}</button>`).join("")}</div>
        <div class="cmp2-pair" role="tabpanel" aria-live="polite">${cmpPair(pick)}</div>
      </div><p class="cap">${esc(L(K.cap))}</p>
      <div style="margin-top:40px">${label("·", D.scope.label)}${rows(D.scope.rows)}</div>`);
    // the whole path as one connected line (horizontal on desktop, top to bottom on mobile)
    const F = D.flow;
    const flow = sec("m-flow", `${label(5, F.label)}<ol class="pathline" data-path>${F.steps.map((s, i) => `<li class="${s.kind || ""}"><span class="pl-dot" aria-hidden="true"></span>
        ${zoom("flow", i, `<span class="ph">${M.img(s.img, L(s.t), { sizes: "(max-width:760px) 60vw, 18vw" })}</span>${s.kind ? `<b class="vchip ${s.kind === "direct" ? "d" : "a"}">${esc(L(s.kind === "direct" ? K.direct.t : K.app.t))}</b>` : ""}`, L(s.t))}
        <h3><i lang="en">${pad(i + 1)}</i>${esc(L(s.t))}</h3><p>${esc(L(s.d))}</p></li>`).join("")}</ol>`);
    return hero + s1 + t + app + cmp + flow;
  }

  /* one page role of the two guides: the hand-made one, then the app version (side by side on desktop, stacked on mobile) */
  function cmpPair(n) {
    const K = C.montauk.compare, pg = K.pages.find((p) => p.n === n);
    const side = (kind) => { const v = kind === "d" ? K.direct : K.app, img = (kind === "d" ? "mkd-p" : "mkf-p") + n, lab = `${L(v.t)} · ${L({ ko: `${n}쪽`, en: `p.${n}` })} · ${L(pg.t)}`;
      return `<figure class="cmp2-f ${kind}">${zoom("cmp", (n - 1) * 2 + (kind === "d" ? 0 : 1), `<span class="ph page">${M.img(img, lab, { sizes: "(max-width:760px) 100vw, 42vw" })}</span>`, lab)}
        <figcaption><b>${esc(L(v.t))} · ${esc(L({ ko: `${n}쪽`, en: `p.${n}` }))}</b><span>${esc(L(v.d))}</span></figcaption></figure>`; };
    return side("d") + side("a");
  }

  /* ───── GROWN: one vertical story — the brand work → what I noticed → what I proposed → the tool — then score and scope ───── */
  function grown() {
    const D = C.grown, h = D.hero, St = D.story;
    const hero = sec("g-hero", `<p class="hero-line">${esc(L(h.line))}</p>${aiBlock(D.ai)}`, "hero lead-only");
    const media = {
      brand: `<div class="vi">
        ${fig("gr-vi-1", { ko: "GROWN 심벌", en: "GROWN symbol" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-2", { ko: "가로형 로고", en: "Horizontal logo" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-3", { ko: "명함 · 색상 체계", en: "Business cards · colour system" }, { cls: "s4", ar: "16 / 9" })}
        ${fig("gr-card-logo", { ko: "명함 로고 면", en: "Card front" }, { cls: "s4", ar: "16 / 9" })}
        <figure class="fig s4"><div class="ph" style="--ar:16/9"><div class="card-re" aria-hidden="true"><span class="lg">GROWN</span><span><span class="nmx">홍 길 동</span><span class="rlx">Founder &amp; CEO</span></span><span class="ad">010-0000-0000<br>서울 ○○구 ○○로 00<br>name@example.com</span></div></div><figcaption class="cap">${esc(L(D.s1.cardCap))}</figcaption></figure>
      </div>`,
      tool: `<dl class="split">${D.roles.split.map((r) => `<div><dt>${esc(L(r.k))}</dt><dd>${esc(L(r.v))}</dd></div>`).join("")}</dl>
        <div class="g-link"><p class="label sm"><b>·</b>${esc(L(D.link.label))}</p><h3 class="h3x">${esc(L(D.link.h))}</h3><p class="note-line">${esc(L(D.link.note))}</p>${grownLink()}</div>`,
      // the extension note right under the heading, then the web system, then the same flow on the phone (one after the other)
      mobile: `<div class="g-duo g-stack">
        <p class="g-duo-lead">${esc(L(D.mobile.lead))}</p>
        <div class="g-duo-a">${demo("grown", h, { note: h.demoNote, label: D.mobile.left })}</div>
        <div class="g-duo-b">${demo("grown-mobile", h, { noEn: true, label: D.mobile.right, note: D.mobile.cap })}</div>
      </div>`
    };
    const story = sec("g-story", `${label(1, St.label)}<ol class="story" data-story>${St.steps.map((s, i) => `<li class="st-${s.k}" data-anchor="gs-${s.k}"><span class="sd" aria-hidden="true">${i + 1}</span>
        <p class="st-k">${esc(L(s.t))}</p><h3>${esc(L(s.h))}</h3><p class="p">${esc(L(s.p))}</p>${media[s.k] ? `<div class="st-m">${media[s.k]}</div>` : ""}</li>`).join("")}</ol>`);
    const s4 = sec("g-4", `${label(2, D.s4.label)}${items(D.s4.items, 4)}`);
    const s5 = sec("g-5", `${label(3, D.s5.label)}${rows(D.s5.rows)}`);
    return hero + story + s4 + s5;
  }
  function grownLink(sel) {
    const G = window.GROWN_SAMPLE; if (!G) return ""; // prepared results only; nothing is calculated here
    const list = G.rows, cur = sel || "B1|101";
    return `<div class="glink" data-glink>
      <div class="gx" role="group" aria-label="${esc(L("가상 예시 물건 목록", "Fictional sample unit list"))}">
        <div class="gx-h" aria-hidden="true"><span>${esc(L("현장", "Site"))}</span><span>${esc(L("호실", "Unit"))}</span><span>${esc(L("면적", "Area"))}</span><span>${esc(L("월 임대료", "Rent"))}</span><span>${esc(L("공실", "Vacant"))}</span></div>
        ${list.map((r) => `<button type="button" class="gx-r" data-row="${r.key}" aria-pressed="${r.key === cur}"><span>${esc(L(r.site))}</span><span lang="en">${esc(r.id)}</span><span lang="en">${r.area}㎡</span><span lang="en">${esc(L(r.rent))}</span><span lang="en">${r.vac == null ? "—" : r.vac + L("개월", " mo")}</span></button>`).join("")}
      </div>
      <div class="gr" aria-live="polite">${grownResult(cur)}</div></div>`;
  }
  function grownResult(key) {
    const r = window.GROWN_SAMPLE && window.GROWN_SAMPLE.reads[key]; if (!r) return "";
    const cap = key === "B1|101" ? `<p class="gr-cap">${esc(L(C.grown.link.cap101))}</p>` : "";
    return `<div class="gr-in" style="--c:${r.color}">
      <p class="gr-unit"><b lang="en">${esc(r.id)}</b>${esc(L(r.site))}</p>
      <ol class="gr-steps">
        <li class="gr-v"><span>${esc(L("예비 판정", "Preliminary verdict"))}</span><b>${esc(L(r.verdict))}</b><em lang="en">${esc(L("점수 ", "Score "))}${esc(r.score)}${r.p24 != null ? ` · ${esc(L("24개월 내 임대 가능성 ", "24-month leasing chance "))}${r.p24}%` : ""}</em></li>
        <li><span>${esc(L("근거", "Reasons"))}</span><p>${esc(L(r.reason))}</p></li>
        <li><span>${esc(L("추가 확인 · 자료 보완과 현장·문서 확인", "Further checks · missing data and site/document checks"))}</span><p>${esc(L(r.need))}</p></li>
        <li><span>${esc(L("우선 조치", "Actions first"))}</span><p>${esc(L(r.action))}</p></li>
      </ol>${cap}
      <p class="gr-stage"><i class="on">${esc(L("예비 판정 (계산)", "Preliminary (calculated)"))}</i><i>${esc(L("자료 보완 → 다시 계산", "Fill in data → recalculate"))}</i><i>${esc(L("전문가 현장·문서 확인 → 확정", "Expert site/document check → confirmed"))}</i></p></div>`;
  }

  /* ───── Make It!: the purpose → AI and my judgement → how it started → A10 → brief and reply → try it → decisions and scope ───── */
  function makeit() {
    const D = C.makeit, h = D.hero;
    const hero = sec("k-hero", `<p class="hero-line">${esc(L(h.line))}</p>${aiBlock(D.ai)}`, "hero lead-only");
    const t = sec("k-turns", `${label(1, D.turns.label)}${turns(D.turns, "chain")}`);
    const toy = sec("k-toy", `${label(2, { ko: "출발점 · 원화 아트토이", en: "Where it started · the art toy from the drawing" })}
      <div class="toy" data-toy>
        <figure class="toy-art"><div class="ph" style="--ar:${M.ratio("a10")}">${M.img("a10", L("작가 원화 · 연필 드로잉", "Artist's original · pencil drawing"), { sizes: "(max-width:760px) 100vw, 45vw" })}</div><figcaption class="cap">${esc(L("작가 원화 · 연필", "Artist's original · pencil"))}</figcaption></figure>
        <figure class="toy-3d">${window.VIEWER3D ? window.VIEWER3D.markup({ src: "assets/model/a10-arttoy.glb", video: "assets/video/a10-rotation.mp4", poster: "assets/img/a10-rotation-poster.jpg", alt: L("원화 아트토이 3D 모델의 대표 장면", "Art toy 3D model, representative frame") }) : ""}
          <figcaption class="cap">${esc(L("원화 아트토이 · Tripo AI로 만든 3D 모델 · 직접 돌려 보기", "Art toy · 3D model made with Tripo AI · turn it yourself"))}</figcaption></figure></div>
      <p class="toy-cap">${esc(L(D.toy.cap))}</p>`);
    const ex = sec("k-ex", `${label(3, D.exchange.label)}<h2 class="h2" style="margin-bottom:24px">${esc(L(D.exchange.h))}</h2>${exchange()}<p class="cap">${esc(L(D.exchange.note))}</p>`);
    const tryIt = sec("k-try", `${label(4, { ko: "체험과 시연", en: "Try it, or watch" })}${demo("makeit", h)}`);
    const s3 = sec("k-3", `${label(5, D.s3.label)}${items(D.s3.items, 3)}`);
    const s5 = sec("k-5", `${label(6, D.s5.label)}${rows(D.s5.rows)}`);
    return hero + t + toy + ex + tryIt + s3 + s5;
  }
  /* Make It!'s signature motion: the question in v1 → the maker's reply → the changed lines in v2 light up in turn, joined by drawn lines */
  function exchange() {
    const X = window.MAKEIT && window.MAKEIT.sample(YL.lang); if (!X) return "";
    const E = C.makeit.exchange;
    const mark = (txt, keys, cls) => esc(txt).split("\n").map((ln) => keys.some((c) => ln.includes(c)) ? `<mark class="${cls}">${ln}</mark>` : ln).join("\n");
    const hl = (s) => esc(s).replace(X.hl, "<mark class=\"r\">$1</mark>");
    return `<div class="xch" data-xch>
      <article class="xch-c x1"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("제작 문의서", "Build brief"))} v1</span></header><pre>${mark(X.v1, X.ask, "q")}</pre><p class="xch-tag q">${esc(L(E.v1note))}</p></article>
      <span class="xch-l" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c xch-r x2"><header><b lang="en">${esc(X.maker)}</b><span>${esc(L("예시 회신 · 사양 보완 요청", "Sample reply · change request"))}</span></header>
        <ul>${X.items.map((t) => `<li>${hl(t)}</li>`).join("")}</ul><p class="xch-msg">“${esc(X.msg)}”</p></article>
      <span class="xch-l back" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c x3"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("요청 반영", "Revised"))} · v2</span></header><pre>${mark(X.v2, X.changed, "c")}</pre><p class="xch-tag ch">${esc(L(E.change))}</p></article>
    </div>`;
  }

  /* ───── Like this: why (GPT → understanding isn't enough → the cartoon conversation → one screen) → the real conversation → the demo sentence in three readings → try it ───── */
  function likethis() {
    const D = C.likethis, h = D.hero, R = D.read, T = D.talk;
    const hero = sec("l-hero", `<p class="hero-line">${esc(L(h.line))}</p>${aiBlock(D.ai)}`, "hero lead-only");
    const t = sec("l-turns", `${label(1, D.turns.label)}${turns(D.turns, "talk")}`);
    const talk = sec("l-talk", `${label(2, T.label)}<h2 class="h2" style="margin-bottom:22px">${esc(L(T.h))}</h2>
      <div class="pair">${T.items.map((x) => `<div><h3 lang="${x.tlang}">${esc(x.t)}</h3>${x.ko ? `<span lang="ko">${esc(x.ko)}</span>` : ""}<p class="p" style="margin:0">${esc(L(x.d))}</p></div>`).join("")}</div>
      <p class="bridge">${esc(L(T.bridge))}</p><p class="cap src-real">${esc(L(T.cap))}</p>`);
    let src = esc(R.src);
    ["Samurai Jack", "every day after school"].forEach((p) => { src = src.replace(esc(p), `<mark data-from="1">${esc(p)}</mark>`); });
    const read = sec("l-read", `${label(3, R.label)}
      <div class="lread" data-lread><p class="lread-src" lang="en">“${src}”</p><p class="cap src-demo">${esc(L(R.srcNote))}</p>
        <ol class="lread-l three">${R.layers.map((l, i) => `<li data-layer="${i}" ${l.from ? `data-src="${i}" tabindex="0"` : ""}><h3><i>${i + 1}</i>${esc(L(l.t))}<em class="ex-tag">${esc(L("예시", "Sample"))}</em></h3><p ${l.lang ? `lang="${l.lang}" class="q"` : ""}>${esc(L(l.d))}</p>${l.miss ? `<p class="miss">${esc(L(l.miss))}</p>` : ""}</li>`).join("")}</ol></div>`);
    const tryIt = sec("l-try", `${label(4, { ko: "체험과 시연", en: "Try it, or watch" })}${demo("likethis", h)}`);
    const s3 = sec("l-3", `${label(5, D.s3.label)}${items(D.s3.items, 3)}`);
    const s4 = sec("l-4", `${label(6, D.s4.label)}${rows(D.s4.rows)}`);
    return hero + t + talk + read + tryIt + s3 + s4;
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
      const stage = $(".demo-stage", d), fsBtn = $('[data-demo="fs"]', d);
      const sync = () => { const on = !v.paused; d.classList.toggle("playing", on); if (on) d.classList.remove("blocked"); d.dataset.user = user === false ? "off" : "on";
        $$('[data-demo="toggle"]', d).forEach((b) => { b.setAttribute("aria-pressed", String(on)); $(".dt", b).textContent = on ? L("일시정지", "Pause") : L("재생", "Play"); $(".di", b).className = "di di-" + (on ? "pause" : "play"); });
        d.classList.toggle("ended", v.ended); };
      ["play", "pause", "ended", "playing"].forEach((ev) => v.addEventListener(ev, sync));
      // starting this one pauses any other recording on the page
      v.addEventListener("play", () => $$(".demo-video", root).forEach((o) => { if (o !== v && !o.paused) o.pause(); }));
      /* full screen holds the stage (video + its bar), so the controls and “exit” stay on screen.
         Where the Fullscreen API is missing, the stage grows into a fixed overlay instead; the same <video> keeps playing. */
      const isFs = () => document.fullscreenElement === stage || document.webkitFullscreenElement === stage || stage.classList.contains("zoomed");
      const syncFs = () => { const on = isFs(); fsBtn.setAttribute("aria-pressed", String(on)); $(".dt", fsBtn).textContent = on ? L("전체 화면 해제", "Exit full screen") : L("전체 화면", "Full screen"); $(".di", fsBtn).className = "di di-" + (on ? "fsx" : "fs"); d.classList.toggle("is-fs", on); };
      const unzoom = () => { if (!stage.classList.contains("zoomed")) return; const done = () => { stage.classList.remove("zoomed", "zoom-out"); document.documentElement.classList.remove("demo-zoomed"); syncFs(); fsBtn.focus({ preventScroll: true }); };
        if (reduce) done(); else { stage.classList.add("zoom-out"); setTimeout(done, 180); } };
      const zoomIn = () => { stage.classList.add("zoomed"); document.documentElement.classList.add("demo-zoomed"); syncFs(); };
      const onFsChange = () => { syncFs(); window.__ylFsAt = Date.now(); };
      document.addEventListener("fullscreenchange", onFsChange); document.addEventListener("webkitfullscreenchange", onFsChange);
      // Esc while zoomed leaves the zoom only; the detail page stays (home.js ignores this Esc)
      const onKey = (e) => { if (e.key === "Escape" && stage.classList.contains("zoomed")) { e.preventDefault(); e.stopImmediatePropagation(); window.__ylFsAt = Date.now(); unzoom(); } };
      window.addEventListener("keydown", onKey, true);
      d.addEventListener("click", (e) => {
        const b = e.target.closest("[data-demo]"); const a = b ? b.dataset.demo : e.target === v ? "toggle" : null; if (!a) return;
        if (a === "toggle") { if (v.paused) { user = true; play(); } else { user = false; v.pause(); } }
        if (a === "replay") { user = true; load(); try { v.currentTime = 0; } catch (_) {} play(); }
        if (a === "fs") {
          if (document.fullscreenElement === stage) { document.exitFullscreen().catch(() => {}); return; }
          if (document.webkitFullscreenElement === stage) { document.webkitExitFullscreen(); return; }
          if (stage.classList.contains("zoomed")) { unzoom(); return; }
          load();
          const req = stage.requestFullscreen || stage.webkitRequestFullscreen;
          if (req) { const p = req.call(stage); if (p && p.catch) p.catch(zoomIn); } else zoomIn();
        }
      });
      syncFs();
      cleanup.push(() => { document.removeEventListener("fullscreenchange", onFsChange); document.removeEventListener("webkitfullscreenchange", onFsChange); window.removeEventListener("keydown", onKey, true);
        if (document.fullscreenElement === stage) document.exitFullscreen().catch(() => {}); stage.classList.remove("zoomed"); document.documentElement.classList.remove("demo-zoomed"); });
      // fetch only when the block comes close; autoplay only when it is actually in view
      const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(); near.disconnect(); } }), { rootMargin: "300px 0px" });
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        // only one recording plays at a time: autoplay waits if another one on the page is already playing
        if (e.isIntersecting) { if (auto && user !== false && !reduce && !$$(".demo-video", root).some((o) => o !== v && !o.paused)) play(); }
        else if (!v.paused && !isFs()) v.pause();
      }), { threshold: 0.4 });
      near.observe(d); io.observe(d);
      d.dataset.user = "off"; sync();
      cleanup.push(() => { io.disconnect(); near.disconnect(); v.pause(); });
    });
    // one-time "arrive" cues for evidence blocks (they are fully readable before and after)
    const cue = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); cue.unobserve(e.target); } }), { root: scroller, threshold: 0.35 });
    $$("[data-cmp], [data-xch], [data-lread], [data-toy], [data-glink], [data-aij], [data-path], [data-cmp2]", root).forEach((el) => reduce ? el.classList.add("on") : cue.observe(el));
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
      // GROWN: the vertical story line follows the reader the same way
      $$("[data-story]", root).forEach((T) => { const r = T.getBoundingClientRect(); T.style.setProperty("--tp", reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.62 - r.top) / Math.max(1, r.height))).toFixed(3)); $$(":scope > li", T).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.7)); });
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
    const stopAway = () => $$(".demo-video", root).forEach((v) => { if (!v.paused && !v.closest(".zoomed") && !document.fullscreenElement) { const r = v.getBoundingClientRect(), s = scroller.getBoundingClientRect(); if (r.bottom < s.top + 20 || r.top > s.bottom - 20) v.pause(); } });
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
      if (z) { const [set, i] = z.dataset.zoom.split("|"); M.lbOpen(SETS[set](), +i, set === "cmp" ? L("두 가이드 비교", "The two guides") : "Montauk Daybed", z); return; }
      // Manual: pick a page role; the hand-made page and the app page change together (a short cross-fade)
      const pgb = e.target.closest("[data-pg]");
      if (pgb) {
        const box = pgb.closest("[data-cmp2]"), n = +pgb.dataset.pg, pair = $(".cmp2-pair", box);
        $$("[data-pg]", box).forEach((b) => b.setAttribute("aria-selected", String(b === pgb)));
        pair.innerHTML = cmpPair(n); box.dataset.n = n;
        if (!reduce) $$(".cmp2-f", pair).forEach((f, j) => f.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 180, delay: j * 60, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "backwards" }));
        return;
      }
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
