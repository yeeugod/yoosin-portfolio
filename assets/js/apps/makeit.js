/* Make It! — one product's workspace, linking an individual designer with local makers.
   Designer: production terms → maker list or the makers that fit this design → brief and sample enquiry → sample reply → revised specs.
   Maker: read the same brief → ask for changes or send a sample quote. Shared history.
   Processes follow real production routes (SLA printing, silicone-mould resin casting, steel-mould injection, CNC masters).
   Makers, prices and replies are samples; nothing is actually sent or paid, and no language model runs. */
(function () {
  "use strict";
  const { L, esc, $, $$, fmt } = YL;
  const KEY = "yl.makeit.v5";

  const MAT = {
    print: { ko: "3D 프린팅 (SLA 레진) · 시제품·소량", en: "3D printing (SLA resin) · prototypes, small runs" },
    silicone: { ko: "실리콘 몰드 레진 캐스팅 · 수십–수백 개", en: "Silicone-mould resin casting · tens to hundreds" },
    inject: { ko: "금형 사출 (PVC·ABS) · 대량", en: "Injection moulding (PVC/ABS) · volume" },
    cnc: { ko: "CNC 가공 · 원형·마스터 모델", en: "CNC machining · masters and patterns" },
    unknown: { ko: "모름 — 업체에 묻기", en: "Not sure — ask the maker" }
  };
  const MAT_SHORT = { print: { ko: "SLA 3D 프린팅", en: "SLA 3D printing" }, silicone: { ko: "실리콘 몰드 캐스팅", en: "Silicone-mould casting" }, inject: { ko: "금형 사출", en: "Injection moulding" }, cnc: { ko: "CNC 가공", en: "CNC machining" }, unknown: { ko: "미정", en: "Undecided" } };
  const MAKERS = [
    { id: "m1", n: "Studio Print Lab", city: { ko: "서울 성동구 (예시)", en: "Seongdong, Seoul (sample)" }, mat: ["print"], moq: 1, max: 60, lead: [2, 3], mold: 0, unit: (s) => 18000 + s.h * 210, note: { ko: "SLA 3D 프린팅 · 시제품과 소량", en: "SLA 3D printing · prototypes and small runs" } },
    { id: "m2", n: "Cast & Co.", city: { ko: "경기 파주 (예시)", en: "Paju, Gyeonggi (sample)" }, mat: ["silicone"], moq: 30, max: 600, lead: [6, 8], mold: 1200000, unit: (s) => 9000 + s.h * 70, note: { ko: "원형 제작 + 실리콘 몰드 레진 캐스팅 · 한정판", en: "Master + silicone-mould resin casting · limited editions" } },
    { id: "m3", n: "Mold Works", city: { ko: "경기 시흥 (예시)", en: "Siheung, Gyeonggi (sample)" }, mat: ["inject"], moq: 1000, max: 50000, lead: [12, 16], mold: 6500000, unit: (s) => 2800 + s.h * 16, note: { ko: "강철 금형 제작 + PVC·ABS 사출 · 대량 생산", en: "Steel moulds + PVC/ABS injection · volume production" } },
    { id: "m4", n: "CNC Proto Shop", city: { ko: "서울 금천구 (예시)", en: "Geumcheon, Seoul (sample)" }, mat: ["cnc"], moq: 1, max: 20, lead: [2, 4], mold: 0, unit: (s) => 42000 + s.h * 320, note: { ko: "CNC 가공 원형 · 캐스팅용 마스터 모델", en: "CNC-machined patterns · masters for casting" } }
  ];
  const fresh = () => ({ role: "designer", tab: "spec", mtab: "inbox", mview: "match", me: "m2", target: null, v: 1,
    spec: { name: "Art Toy", from: { ko: "작가 원화", en: "Artist's original drawing" }, h: 180, mat: "silicone", qty: 50, budget: 4000000, weeks: 10, base: "yes", minWall: 0, notes: "" },
    sent: [], replies: [], hist: [], picked: [] });
  let S = Object.assign(fresh(), YL.store.sget(KEY, {}));
  const save = () => YL.store.sset(KEY, S);
  const now = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
  const log = (who, ko, en) => { S.hist.unshift({ who, ko, en, at: now(), v: S.v }); };

  // quantity decides the route: a few → print, tens to hundreds → silicone moulds, a thousand and up → steel moulds
  function suggestedProcess(s) { if (s.qty <= 20) return "print"; if (s.qty < 1000) return "silicone"; return "inject"; }
  function questions(s) {
    const q = [];
    if (s.mat === "unknown") q.push({ ko: `수량 ${s.qty}개에 맞는 제작 방식을 추천해 주세요.`, en: `Which process suits a run of ${s.qty}?` });
    if (!(s.h > 0)) q.push({ ko: "적정 크기를 제안해 주세요.", en: "Please suggest a suitable size." });
    if (!s.minWall) q.push({ ko: "얇은 가지 부분(원화의 가는 선)이 버틸 최소 두께가 얼마인지 알려 주세요.", en: "What is the minimum thickness for the thin branch-like parts of the drawing?" });
    return q;
  }
  function estimate(m, s) { const per = m.unit(s); return { per: Math.round(per / 100) * 100, total: Math.round((m.mold + per * s.qty) / 1000) * 1000 }; }
  function match(s) {
    const proc = s.mat === "unknown" ? suggestedProcess(s) : s.mat;
    return MAKERS.map((m) => {
      const e = estimate(m, s);
      const c = [
        { ok: m.mat.includes(proc), t: { ko: `공정: ${L(MAT_SHORT[m.mat[0]])}`, en: `Process: ${L(MAT_SHORT[m.mat[0]])}` } },
        { ok: s.qty >= m.moq && s.qty <= m.max, t: { ko: `수량 ${m.moq.toLocaleString()}–${m.max.toLocaleString()}개 가능`, en: `Runs of ${m.moq.toLocaleString()}–${m.max.toLocaleString()}` } },
        { ok: m.lead[1] <= s.weeks, t: { ko: `${m.lead[0]}–${m.lead[1]}주 소요`, en: `${m.lead[0]}–${m.lead[1]} weeks` } },
        { ok: e.total <= s.budget, t: { ko: `예상 ${fmt.won(e.total)} (몰드·금형 ${fmt.won(m.mold)})`, en: `Est. ${fmt.won(e.total)} (moulds ${fmt.won(m.mold)})` } }
      ];
      return { m, e, c, n: c.filter((x) => x.ok).length };
    }).sort((a, b) => b.n - a.n || a.e.total - b.e.total);
  }
  function brief(lang) { return briefFor(S.spec, S.v, lang); }
  function briefFor(s, v, lang) { const T = (o) => typeof o === "string" ? o : o[lang], en = lang === "en";
    const q = questions(s).map((x, i) => `${i + 1}. ${T(x)}`).join("\n");
    return (en ? `BUILD BRIEF v${v} — ${s.name}\n\nSource: ${T(s.from)} (2D drawing → collectible figure)\nHeight: ${s.h} mm${s.base === "yes" ? " incl. base" : ""}\nProcess: ${T(MAT[s.mat])}\nQuantity: ${s.qty} pcs\nBudget: up to ${fmt.won(s.budget)}\nWanted within: ${s.weeks} weeks\n${s.minWall ? `Min. thickness of thin parts: ${s.minWall} mm\n` : ""}${s.notes ? `Notes: ${s.notes}\n` : ""}${q ? `\nQuestions for you:\n${q}\n` : ""}\nAttached: front drawing, 3D turntable (Tripo AI model).`
      : `제작 문의서 v${v} — ${s.name}\n\n원본: ${T(s.from)} (평면 그림 → 수집가용 피규어)\n높이: ${s.h}mm${s.base === "yes" ? " (받침 포함)" : ""}\n제작 방식: ${T(MAT[s.mat])}\n수량: ${s.qty}개\n예산: ${fmt.won(s.budget)} 이내\n희망 기간: ${s.weeks}주 이내\n${s.minWall ? `가는 부분 최소 두께: ${s.minWall}mm\n` : ""}${s.notes ? `메모: ${s.notes}\n` : ""}${q ? `\n업체에 묻는 것:\n${q}\n` : ""}\n첨부: 원화 정면, 3D 회전 영상 (Tripo AI 모델)`);
  }

  /* ── rendering ── */
  let pane, scroller, prev = {};
  const DT = [{ k: "spec", t: { ko: "제작 조건", en: "Terms" } }, { k: "makers", t: { ko: "업체 찾기", en: "Makers" } }, { k: "brief", t: { ko: "문의서·문의", en: "Brief & enquiry" } }, { k: "reply", t: { ko: "회신·사양 수정", en: "Reply & revise" } }];
  const MT = [{ k: "inbox", t: { ko: "받은 문의", en: "Enquiry" } }, { k: "respond", t: { ko: "회신하기", en: "Respond" } }];
  function render() {
    const tabs = S.role === "designer" ? DT : MT, cur = S.role === "designer" ? S.tab : S.mtab;
    const newReplies = S.replies.filter((r) => !r.read).length;
    const s = S.spec, me = makerName(S.me);
    const av = (who) => who === "designer" ? `<span class="mx-av d" aria-hidden="true">YL</span>` : `<span class="mx-av m" aria-hidden="true">${esc(me.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2))}</span>`;
    const specRows = [[{ ko: "높이", en: "Height" }, `${s.h} mm`, "h"], [{ ko: "제작 방식", en: "Process" }, L(MAT_SHORT[s.mat]), "mat"], [{ ko: "수량", en: "Quantity" }, `${s.qty.toLocaleString()}${L("개", " pcs")}`, "qty"], [{ ko: "예산", en: "Budget" }, fmt.won(s.budget), "budget"], [{ ko: "기간", en: "Wanted in" }, `${s.weeks}${L("주", " wks")}`, "weeks"], [{ ko: "최소 두께", en: "Min. thickness" }, s.minWall ? `${s.minWall} mm` : L("질문 중", "Asked"), "minWall"]];
    pane.innerHTML = `<div class="mx" data-mode="${S.role}">
      <header class="mx-proj"><img class="mx-thumb" src="assets/img/a10-sm.jpg" alt="${esc(L("작가 원화", "Artist's drawing"))}">
        <div class="mx-pt"><p class="mx-kicker">${esc(L("제작 프로젝트 · 예시", "Production project · sample"))}</p><h3 lang="en">${esc(s.name)}</h3>
          <p class="mx-meta"><span class="mx-ver" data-watch="ver">${esc(L("문의서", "Brief"))} v${S.v}</span><span class="mx-status" data-watch="status">${esc(statusText())}</span></p></div>
        <div class="mx-role roleswitch" role="radiogroup" aria-label="${esc(L("누구의 화면으로 볼까요", "Whose side to view"))}">
          <button type="button" role="radio" aria-checked="${S.role === "designer"}" data-role="designer">${av("designer")}<span><b>${esc(L("디자이너", "Designer"))}</b><small>${esc(L("이유신", "Yoosin Lee"))}</small></span>${newReplies && S.role !== "designer" ? `<i class="dot" aria-label="${esc(L("새 회신", "new reply"))}"></i>` : ""}</button>
          <button type="button" role="radio" aria-checked="${S.role === "maker"}" data-role="maker">${av("maker")}<span><b>${esc(L("제조업체 (예시)", "Maker (sample)"))}</b><small lang="en">${esc(me)}</small></span>${S.sent.some((x) => x.to === S.me && !x.seen) && S.role !== "maker" ? `<i class="dot" aria-label="${esc(L("새 문의", "new enquiry"))}"></i>` : ""}</button></div></header>
      <nav class="mx-tabs" aria-label="${esc(L("작업 단계", "Work steps"))}">${tabs.map((t, i) => `<button type="button" data-tab="${t.k}" ${t.k === cur ? 'aria-current="step"' : ""} class="${tabs.findIndex((x) => x.k === cur) > i ? "done" : ""}"><b>${i + 1}</b>${esc(L(t.t))}${t.k === "reply" && newReplies ? ` <i class="dot"></i>` : ""}</button>`).join("")}
        <span class="mx-as">${av(S.role)}${esc(S.role === "designer" ? L("디자이너 화면", "Designer's view") : L(`${me} 화면`, `${me}'s view`))}</span></nav>
      <div class="mx-cols"><div class="mx-main mk-view">${S.role === "designer" ? ({ spec: vSpec, makers: vMakers, brief: vBrief, reply: vReply }[S.tab])() : ({ inbox: vInbox, respond: vRespond }[S.mtab])()}</div>
        <aside class="mx-side"><section class="mx-spec" aria-label="${esc(L("현재 사양", "Current specs"))}"><h4>${esc(L("현재 사양", "Current specs"))}<span>v${S.v}</span></h4><dl>${specRows.map(([k, v, w]) => `<div><dt>${esc(L(k))}</dt><dd data-watch="sp-${w}">${esc(v)}</dd></div>`).join("")}</dl>
          <p>${esc(L("두 역할이 같은 사양과 문의서를 봅니다.", "Both sides read the same specs and brief."))}</p></section>${vHist()}</aside></div></div>`;
    prev = YL.flashChanged(pane, prev);
  }
  const makerName = (id) => (MAKERS.find((m) => m.id === id) || {}).n || "—";
  function statusText() {
    if (S.replies.some((r) => !r.applied && r.kind === "change")) return L("보완 요청 받음 (예시)", "Change requested (sample)");
    if (S.replies.some((r) => r.kind === "quote")) return L("예시 견적 받음", "Sample quote in");
    if (S.sent.length) return L("문의 보냄 (예시)", "Enquiry sent (sample)");
    return L("작성 중", "Drafting");
  }
  const sel = (k, lab, map, v) => `<label class="fl"><span>${esc(L(lab))}</span><select data-k="${k}">${Object.entries(map).map(([a, t]) => `<option value="${a}" ${a === v ? "selected" : ""}>${esc(L(t))}</option>`).join("")}</select></label>`;
  const num = (k, lab, v, unit, min = 1, max) => `<label class="fl"><span>${esc(L(lab))}</span><span class="unit"><input type="number" inputmode="numeric" data-k="${k}" value="${v}" min="${min}" ${max ? `max="${max}"` : ""} aria-describedby="err-${k}"><em>${esc(L(unit))}</em></span><small class="err" id="err-${k}" hidden></small></label>`;
  function vSpec() {
    const s = S.spec, sp = suggestedProcess(s);
    return `<div class="mk-h" data-anchor="mk-spec"><h3>${esc(L("작품에서 제작 조건으로", "From artwork to production terms"))}</h3><p class="muted">${esc(L("모르는 항목은 ‘모름’으로 두거나 비워 두면 문의서에 질문으로 들어갑니다.", "Leave anything you don't know as ‘Not sure’ or blank — it becomes a question in the brief."))}</p></div>
      <div class="mk-art"><figure><img src="assets/img/a10-sm.jpg" alt="${esc(L("작가 원화", "Artist's drawing"))}"><figcaption>${esc(L("원본 · 작가 원화", "Source · original drawing"))}</figcaption></figure>
        <figure><img src="assets/img/a10-rotation-poster.jpg" alt="${esc(L("Tripo AI 모델", "Tripo AI model"))}"><figcaption>${esc(L("형태 · Tripo AI 3D 모델", "Form · Tripo AI 3D model"))}</figcaption></figure></div>
      <div class="fg">
        <label class="fl"><span>${esc(L("제품 이름", "Product name"))}</span><input data-k="name" value="${esc(s.name)}"></label>
        ${num("h", { ko: "높이", en: "Height" }, s.h, { ko: "mm", en: "mm" }, 40, 600)}
        ${sel("mat", { ko: "제작 방식", en: "Process" }, MAT, s.mat)}
        ${num("qty", { ko: "수량", en: "Quantity" }, s.qty, { ko: "개", en: "pcs" }, 1, 50000)}
        ${num("budget", { ko: "총 예산", en: "Total budget" }, s.budget, { ko: "원", en: "KRW" }, 100000)}
        ${num("weeks", { ko: "희망 기간", en: "Wanted within" }, s.weeks, { ko: "주", en: "weeks" }, 1, 52)}
        <label class="fl wide"><span>${esc(L("메모", "Notes"))}</span><textarea data-k="notes" rows="2" placeholder="${esc(L("예: 받침에 작가 서명 각인", "e.g. Artist signature engraved on the base"))}">${esc(s.notes)}</textarea></label></div>
      <p class="tipline" data-watch="sp">${esc(L(`수량 ${s.qty}개라면 보통 ${L(MAT_SHORT[sp])} 쪽이 맞습니다. 최소 두께는 아직 몰라 문의서에 질문으로 남습니다.`, `For ${s.qty} pieces, ${L(MAT_SHORT[sp]).toLowerCase()} usually fits. The minimum thickness isn't known yet, so it stays in the brief as a question.`))}</p>
      <div class="mk-next"><button type="button" class="btn" data-tab="makers"><span>${esc(L("이 조건에 맞는 업체 찾기", "Find makers for these terms"))}</span><span class="arr" aria-hidden="true">→</span></button></div>`;
  }
  // two ways in: the makers that fit this design (ranked, with reasons) or the whole list
  function vMakers() {
    const fit = S.mview !== "all", list = fit ? match(S.spec) : MAKERS.map((m) => ({ m, e: estimate(m, S.spec) }));
    const sw = `<div class="seg mv" role="radiogroup" aria-label="${esc(L("업체 보기 방식", "How to view makers"))}">${[["match", { ko: "내 디자인에 맞는 업체", en: "Makers that fit my design" }], ["all", { ko: "업체 리스트", en: "All makers" }]].map(([v, t]) => `<button type="button" role="radio" data-mview="${v}" aria-checked="${(S.mview || "match") === v}">${esc(L(t))}</button>`).join("")}</div>`;
    const ask = (m) => { const sent = S.sent.find((x) => x.to === m.id); return sent ? `<span class="sent">${esc(L("예시 문의 보냄 ", "Sample enquiry sent "))}${esc(sent.at)}</span>` : `<button type="button" class="btn sm" data-ask="${m.id}">${esc(L("이 업체에 문의하기", "Enquire with this maker"))} →</button>`; };
    return `<div class="mk-h" data-anchor="mk-makers"><h3>${esc(L("업체 찾기", "Find makers"))}</h3><p class="muted">${esc(L("업체 정보와 금액은 예시입니다. 사양을 바꾸면 맞는 업체의 순서와 이유가 달라집니다.", "Makers and prices are samples. Change the specs and the ranking and reasons change."))}</p>${sw}</div>
      <ol class="makers ${fit ? "" : "all"}">${list.map(({ m, e, c, n }, i) => `<li class="${fit && n === 4 ? "fit" : ""}" data-anchor="mk-${m.id}"><div class="mh">${fit ? `<span class="rank">${i + 1}</span>` : ""}<div><b lang="en">${esc(m.n)}</b><span>${esc(L(m.city))} · ${esc(L(m.note))}</span></div>${fit ? `<span class="fitn" data-watch="fit-${m.id}">${n}/4</span>` : ""}</div>
        ${fit ? `<ul class="why">${c.map((x) => `<li class="${x.ok ? "ok" : "no"}"><span aria-hidden="true">${x.ok ? "✓" : "✕"}</span><span class="sr-only">${esc(x.ok ? L("맞음", "fits") : L("맞지 않음", "doesn't fit"))}</span>${esc(L(x.t))}</li>`).join("")}</ul>`
          : `<p class="mk-facts">${esc(L(MAT_SHORT[m.mat[0]]))} · ${esc(L(`${m.moq.toLocaleString()}–${m.max.toLocaleString()}개`, `${m.moq.toLocaleString()}–${m.max.toLocaleString()} pcs`))} · ${esc(L(`${m.lead[0]}–${m.lead[1]}주`, `${m.lead[0]}–${m.lead[1]} wks`))}</p>`}
        <div class="mb"><span>${esc(L("개당 예상 (예시)", "Est. per piece (sample)"))} <b data-watch="per-${m.id}">${fmt.won(e.per)}</b></span>${ask(m)}</div></li>`).join("")}</ol>`;
  }
  function vBrief() {
    const tg = S.target && MAKERS.find((m) => m.id === S.target), sent = tg && S.sent.find((x) => x.to === tg.id);
    return `<div class="mk-h" data-anchor="mk-brief"><h3>${esc(L("제작 문의서", "Build brief"))} <span class="ver" data-watch="ver2">v${S.v}</span></h3><p class="muted">${esc(L("업체가 그대로 읽을 수 있는 형식입니다. 제조업체 화면에도 같은 문의서가 보입니다.", "Written so a maker can read it as is. The maker's screen shows the same brief."))}</p></div>
      <p class="mk-to">${esc(L("받는 곳", "To"))}: ${tg ? `<b lang="en">${esc(tg.n)}</b> <span>${esc(L("(예시 업체)", "(sample maker)"))}</span>` : `<span class="muted">${esc(L("아직 고르지 않음", "not chosen yet"))}</span>`}</p>
      <pre class="brief" tabindex="0" aria-label="${esc(L("문의서 내용", "Brief text"))}" data-watch="brief">${esc(brief(YL.lang))}</pre>
      <div class="row"><button type="button" class="btn sm ghost" data-act="copy">${esc(L("문의서 복사", "Copy brief"))}</button>
        ${!tg ? `<button type="button" class="btn sm" data-tab="makers">${esc(L("업체 고르기", "Choose a maker"))} →</button>`
          : sent ? `<span class="sent">${esc(L("예시 문의 보냄 ", "Sample enquiry sent "))}${esc(sent.at)}</span><button type="button" class="btn sm" data-role="maker">${esc(L("제조업체 화면에서 회신하기", "Reply as the maker"))} ⇄</button>`
          : `<button type="button" class="btn sm" data-send="${tg.id}">${esc(L(`${tg.n}에 예시 문의 보내기`, `Send sample enquiry to ${tg.n}`))}</button>`}</div>
      <p class="muted">${esc(L("‘보내기’는 실제로 발송하지 않고, 같은 화면의 제조업체 역할에 문의서를 전달합니다.", "‘Send’ doesn't actually send anything; it passes the brief to the maker role on this screen."))}</p>`;
  }
  function vReply() {
    const rs = S.replies;
    if (!rs.length) return `<div class="mk-h"><h3>${esc(L("회신", "Replies"))}</h3></div><div class="empty-box"><p>${esc(L("아직 회신이 없습니다. 업체에 예시 문의를 보낸 뒤, 제조업체 역할로 바꿔 회신해 보세요.", "No replies yet. Send a sample enquiry, then switch to the maker's side and reply."))}</p><button type="button" class="btn sm" data-tab="makers">${esc(L("업체 찾기로", "Go to makers"))}</button></div>`;
    rs.forEach((r) => r.read = true); save();
    return `<div class="mk-h" data-anchor="mk-reply"><h3>${esc(L("받은 회신 · 예시", "Replies · samples"))}</h3><p class="muted">${esc(L("회신은 준비된 예시입니다. 요청을 반영하면 문의서 버전이 올라갑니다.", "Replies are prepared samples. Applying a request raises the brief version."))}</p></div>
      ${rs.map((r, i) => `<article class="reply ${r.kind}" data-anchor="rp-${i}"><header><b lang="en">${esc(makerName(r.from))}</b><span>${esc(r.kind === "quote" ? L("예시 견적", "Sample quote") : L("예시 회신 · 사양 보완 요청", "Sample reply · change request"))} · v${r.v} · ${esc(r.at)}</span></header>
        ${r.kind === "quote" ? `<dl class="q"><div><dt>${esc(L("개당", "Per piece"))}</dt><dd>${fmt.won(r.per)}</dd></div><div><dt>${esc(L("몰드·금형·준비", "Moulds & setup"))}</dt><dd>${fmt.won(r.mold)}</dd></div><div><dt>${esc(L("합계", "Total"))}</dt><dd>${fmt.won(r.total)}</dd></div><div><dt>${esc(L("기간", "Lead time"))}</dt><dd>${r.weeks}${esc(L("주", " wks"))}</dd></div></dl>` : ""}
        ${r.items && r.items.length ? `<ul class="asks">${r.items.map((it) => `<li>${esc(L(CHANGE[it].t))}</li>`).join("")}</ul>` : ""}
        ${r.msg ? `<p class="msg">“${esc(r.msg)}”</p>` : ""}
        ${r.kind === "change" ? (r.applied ? `<p class="okmsg">${esc(L(`반영함 → v${r.appliedV}`, `Applied → v${r.appliedV}`))}</p>` : `<button type="button" class="btn sm" data-apply="${i}">${esc(L("요청 반영해 사양 수정", "Apply and revise specs"))}</button>`) : ""}</article>`).join("")}
      <div class="mk-next"><button type="button" class="btn ghost" data-tab="spec">${esc(L("사양 직접 고치기", "Edit specs yourself"))}</button></div>`;
  }
  const CHANGE = {
    thick: { t: { ko: "가는 가지 부분 두께 2mm 이상으로", en: "Thicken the thin branches to at least 2 mm" }, apply: (s) => { s.minWall = 2; } },
    qty: { t: { ko: "몰드 비용을 고려해 수량 100개 이상 권장", en: "100+ pieces recommended to cover the moulds" }, apply: (s) => { s.qty = Math.max(s.qty, 100); } },
    size: { t: { ko: "높이 150mm로 줄여 재료비 절감", en: "Reduce height to 150 mm to save material" }, apply: (s) => { s.h = 150; } }
  };
  function vInbox() {
    const got = S.sent.filter((x) => x.to === S.me);
    const opts = MAKERS.map((m) => `<option value="${m.id}" ${m.id === S.me ? "selected" : ""}>${esc(m.n)}${S.sent.some((x) => x.to === m.id) ? " •" : ""}</option>`).join("");
    got.forEach((x) => x.seen = true); save();
    return `<div class="mk-h" data-anchor="mk-inbox"><h3>${esc(L("받은 문의", "Incoming enquiry"))}</h3><label class="fl inline"><span>${esc(L("내 업체 (예시)", "I am (sample)"))}</span><select data-k="me">${opts}</select></label></div>
      ${got.length ? `<pre class="brief" tabindex="0" data-watch="mbrief">${esc(brief(YL.lang))}</pre><p class="muted">${esc(L(`디자이너가 ${got[0].at}에 보낸 문의서의 최신 버전(v${S.v})입니다.`, `Latest version (v${S.v}) of the brief the designer sent at ${got[0].at}.`))}</p>
        <div class="mk-next"><button type="button" class="btn" data-tab="respond"><span>${esc(L("회신하기", "Respond"))}</span><span class="arr" aria-hidden="true">→</span></button></div>`
        : `<div class="empty-box"><p>${esc(L("이 업체에 온 문의가 없습니다. 디자이너 역할에서 이 업체에 예시 문의를 보내세요.", "No enquiry for this maker. Send one from the designer's side."))}</p><button type="button" class="btn sm" data-role="designer">${esc(L("디자이너 역할로", "Go to designer"))}</button></div>`}`;
  }
  function vRespond() {
    const m = MAKERS.find((x) => x.id === S.me), e = estimate(m, S.spec), got = S.sent.some((x) => x.to === S.me);
    if (!got) return vInbox();
    const d = S.draft || (S.draft = { kind: "change", items: [], msg: "", per: e.per, weeks: m.lead[1] });
    return `<div class="mk-h" data-anchor="mk-respond"><h3>${esc(L("회신하기", "Respond"))}</h3><p class="muted">${esc(L("제조업체 입장에서 보완을 요청하거나 예시 견적을 보냅니다.", "As the maker, ask for changes or send a sample quote."))}</p></div>
      <fieldset class="seg"><legend class="sr-only">${esc(L("회신 종류", "Reply type"))}</legend>${[["change", { ko: "사양 보완 요청", en: "Ask for changes" }], ["quote", { ko: "예시 견적", en: "Sample quote" }]].map(([v, t]) => `<label><input type="radio" name="rk" value="${v}" data-d="kind" ${d.kind === v ? "checked" : ""}><span>${esc(L(t))}</span></label>`).join("")}</fieldset>
      ${d.kind === "change" ? `<fieldset class="ck"><legend>${esc(L("요청할 항목", "What to ask for"))}</legend>${Object.entries(CHANGE).map(([k, c]) => `<label><input type="checkbox" data-item="${k}" ${d.items.includes(k) ? "checked" : ""}><span>${esc(L(c.t))}</span></label>`).join("")}</fieldset>`
        : `<div class="fg"><label class="fl"><span>${esc(L("개당 단가", "Per piece"))}</span><span class="unit"><input type="number" data-d="per" value="${d.per}" min="0"><em>${esc(L("원", "KRW"))}</em></span></label><label class="fl"><span>${esc(L("기간", "Lead time"))}</span><span class="unit"><input type="number" data-d="weeks" value="${d.weeks}" min="1"><em>${esc(L("주", "weeks"))}</em></span></label>
          <p class="tipline">${esc(L(`몰드·금형·준비 ${fmt.won(m.mold)} + ${S.spec.qty}개 = 합계 ${fmt.won(m.mold + d.per * S.spec.qty)}`, `Moulds & setup ${fmt.won(m.mold)} + ${S.spec.qty} pcs = ${fmt.won(m.mold + d.per * S.spec.qty)} total`))}</p></div>`}
      <label class="fl"><span>${esc(L("메시지", "Message"))}</span><textarea data-d="msg" rows="2" placeholder="${esc(L("예: 원화의 가는 선이 많아 두께 보강이 필요합니다.", "e.g. The drawing has many thin lines; they need thickening."))}">${esc(d.msg)}</textarea></label>
      <p class="err" id="rp-err" role="alert" hidden></p>
      <div class="row"><button type="button" class="btn" data-act="reply">${esc(L("디자이너에게 회신 (예시)", "Reply to designer (sample)"))}</button></div>`;
  }
  function vHist() {
    return `<section class="hist" data-anchor="mk-hist" aria-label="${esc(L("수정 이력", "History"))}"><h4>${esc(L("수정 이력", "History"))}<span data-watch="hist-n">${S.hist.length}</span></h4>
      ${S.hist.length ? `<ol>${S.hist.map((h) => `<li class="${h.who === "designer" ? "d" : "m"}"><b>${esc(h.who === "designer" ? L("디자이너", "Designer") : makerName(h.who))}</b><span>${esc(L(h))}</span><small><time>${esc(h.at)}</time> · v${h.v}</small></li>`).join("")}</ol>` : `<p class="muted">${esc(L("아직 기록이 없습니다. 문의를 보내면 두 역할의 기록이 여기에 쌓입니다.", "Nothing yet. Once an enquiry goes out, both sides' actions collect here."))}</p>`}
      <button type="button" class="linkbtn" data-act="reset">${esc(L("처음 상태로 되돌리기", "Reset the workspace"))}</button></section>`;
  }

  /* ── events ── */
  function rr() { const f = YL.captureFocus(), a = YL.captureAnchor(scroller); render(); YL.restoreAnchor(scroller, a); YL.restoreFocus(f); }
  function goTab(t) { if (S.role === "designer") S.tab = t; else S.mtab = t; save(); render(); if (scroller) scroller.scrollTop = 0; const h = $(".mk-h h3", pane); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
  function send(id) { S.sent.push({ to: id, at: now(), v: S.v }); S.me = id; log("designer", `${makerName(id)}에 예시 문의 보냄`, `Sample enquiry sent to ${makerName(id)}`); }
  function onClick(e) {
    const r = e.target.closest("[data-role]");
    if (r) { S.role = r.dataset.role; save(); render(); const v = $(".mk-view", pane); if (v && !YL.reduceMotion()) v.animate([{ opacity: 0, transform: `translateX(${S.role === "maker" ? 24 : -24}px)` }, { opacity: 1, transform: "none" }], { duration: 260, easing: "cubic-bezier(.16,1,.3,1)" }); YL.announce(S.role === "maker" ? L("제조업체 역할입니다", "Maker's side") : L("디자이너 역할입니다", "Designer's side")); return; }
    const mv = e.target.closest("[data-mview]"); if (mv) { S.mview = mv.dataset.mview; save(); rr(); return; }
    const t = e.target.closest("[data-tab]"); if (t) { goTab(t.dataset.tab); return; }
    const ak = e.target.closest("[data-ask]"); if (ak) { S.target = ak.dataset.ask; save(); goTab("brief"); return; }
    const sd = e.target.closest("[data-send]");
    if (sd) { send(sd.dataset.send); save(); rr(); YL.toast(L("예시 문의를 보냈습니다 (실제 발송 없음)", "Sample enquiry sent (nothing actually sent)"), "ok"); return; }
    const ap = e.target.closest("[data-apply]");
    if (ap) { const rp = S.replies[+ap.dataset.apply]; rp.items.forEach((k) => CHANGE[k].apply(S.spec)); S.v++; rp.applied = true; rp.appliedV = S.v; log("designer", "보완 요청을 반영해 사양 수정", "Applied the requests and revised the specs"); save(); rr(); YL.toast(L(`문의서 v${S.v}로 수정했습니다`, `Brief revised to v${S.v}`), "ok"); return; }
    const a = e.target.closest("[data-act]"); if (!a) return;
    if (a.dataset.act === "copy") YL.copyText(brief(YL.lang), a);
    if (a.dataset.act === "reset") { S = fresh(); save(); render(); YL.toast(L("처음 상태로 되돌렸습니다", "Workspace reset"), "ok"); }
    if (a.dataset.act === "reply") {
      const d = S.draft, err = $("#rp-err", pane);
      if (d.kind === "change" && !d.items.length && !d.msg.trim()) { err.hidden = false; err.textContent = L("요청할 항목을 하나 이상 고르거나 메시지를 써 주세요.", "Pick at least one item or write a message."); const f = $("[data-item]", pane); if (f) f.focus(); return; }
      if (d.kind === "quote" && !(d.per > 0)) { err.hidden = false; err.textContent = L("개당 단가를 0보다 크게 넣어 주세요.", "Enter a per-piece price above 0."); const f = $('[data-d="per"]', pane); f.setAttribute("aria-invalid", "true"); f.focus(); return; }
      const m = MAKERS.find((x) => x.id === S.me);
      const rp = { from: S.me, kind: d.kind, items: d.kind === "change" ? d.items.slice() : [], msg: d.msg.trim(), at: now(), v: S.v, read: false };
      if (d.kind === "quote") Object.assign(rp, { per: +d.per, mold: m.mold, total: m.mold + d.per * S.spec.qty, weeks: +d.weeks });
      S.replies.unshift(rp); log(S.me, d.kind === "quote" ? `예시 견적 회신 (${fmt.won(rp.total)})` : `사양 보완 요청 ${rp.items.length}건`, d.kind === "quote" ? `Sample quote sent (${fmt.won(rp.total)})` : `${rp.items.length} change request(s)`);
      S.draft = null; save(); render();
      YL.toast(L("회신했습니다. 디자이너 역할에서 확인하세요", "Replied — check it on the designer's side"), "ok");
      const b = $('[data-role="designer"]', pane); if (b) b.focus();
    }
  }
  function onInput(e) {
    const t = e.target;
    if (t.dataset.d && t.type !== "radio") { S.draft[t.dataset.d] = t.type === "number" ? Number(t.value) : t.value; save(); }
    if (t.dataset.k === "name" || t.dataset.k === "notes") { S.spec[t.dataset.k] = t.value; save(); }
  }
  function onChange(e) {
    const t = e.target, k = t.dataset.k;
    if (k === "me") { S.me = t.value; S.draft = null; save(); rr(); return; }
    if (k && k !== "name" && k !== "notes") {
      if (t.type === "number") {
        const v = Number(t.value), min = Number(t.min || 0), max = t.max ? Number(t.max) : Infinity, er = $("#err-" + k, pane);
        if (!t.value || isNaN(v) || v < min || v > max) { t.setAttribute("aria-invalid", "true"); er.hidden = false; er.textContent = L(`${min.toLocaleString()}${max < Infinity ? "–" + max.toLocaleString() : " 이상"} 사이의 숫자를 넣어 주세요`, `Enter a number ${max < Infinity ? `between ${min.toLocaleString()} and ${max.toLocaleString()}` : `of ${min.toLocaleString()} or more`}`); t.focus(); return; }
        S.spec[k] = v;
      } else S.spec[k] = t.value;
      if (S.sent.length) { S.v++; log("designer", "사양 직접 수정", "Specs edited"); }
      save(); rr(); return;
    }
    if (t.dataset.d === "kind") { S.draft.kind = t.value; save(); rr(); return; }
    if (t.dataset.d && t.type === "number") { rr(); return; }
    if (t.dataset.item) { const it = S.draft.items, i = it.indexOf(t.dataset.item); if (t.checked && i < 0) it.push(t.dataset.item); if (!t.checked && i >= 0) it.splice(i, 1); const er = $("#rp-err", pane); if (er) er.hidden = true; save(); }
  }

  window.APPS = window.APPS || {};
  const SAMPLE_ASK = ["thick", "qty"];
  const sampleMsg = (en) => en ? "The drawing has many thin lines; they need thickening. Moulds pay off from about 100 pieces." : "원화의 가는 선이 많아 두께 보강이 필요합니다. 몰드 비용은 100개 안팎부터 맞습니다.";
  /* guided walk-through: each step rebuilds the prepared A10 example up to that point (nothing is sent anywhere)
     1 project · 2 terms · 3 makers that fit · 4 brief sent to Cast & Co. · 5 sample reply · 6 revised specs (v2) */
  function tourStep(n) {
    const en = YL.lang === "en";
    S = fresh();
    if (n === 2) S.tab = "spec";
    if (n === 3) { S.tab = "makers"; S.mview = "match"; }
    if (n >= 4) { S.target = "m2"; send("m2"); S.sent[0].seen = true; S.tab = "brief"; }
    if (n >= 5) {
      S.replies = [{ from: "m2", kind: "change", items: SAMPLE_ASK.slice(), msg: sampleMsg(en), at: now(), v: 1, read: true }];
      log("m2", "사양 보완 요청 2건", "2 change request(s)");
      S.tab = "reply";
    }
    if (n >= 6) { const rp = S.replies[0]; rp.items.forEach((k) => CHANGE[k].apply(S.spec)); S.v = 2; rp.applied = true; rp.appliedV = 2; log("designer", "보완 요청을 반영해 사양 수정", "Applied the requests and revised the specs"); }
    save(); render(); if (scroller) scroller.scrollTop = 0;
  }
  /* for the detail page: the same brief → reply → revision the app produces, from a fresh A10 project */
  window.MAKEIT = {
    tourStep,
    sample(lang) {
      const s1 = JSON.parse(JSON.stringify(fresh().spec)), s2 = JSON.parse(JSON.stringify(s1));
      SAMPLE_ASK.forEach((k) => CHANGE[k].apply(s2));
      const en = lang === "en";
      return { v1: briefFor(s1, 1, lang), v2: briefFor(s2, 2, lang), maker: "Cast & Co.", items: SAMPLE_ASK.map((k) => CHANGE[k].t[lang]), msg: sampleMsg(en),
        ask: en ? ["minimum thickness"] : ["최소 두께"],
        hl: en ? /(at least 2 mm|100\+ pieces)/g : /(2mm 이상|100개 이상)/g,
        changed: en ? ["Min. thickness", "Quantity:"] : ["가는 부분 최소 두께", "수량:"] };
    }
  };
  window.APPS.makeit = {
    title: { ko: "제작 협업 공간", en: "Production workspace" },
    brand: `<span class="mkb-name">Make It!</span>`,
    mount(el, ctx) { pane = el; scroller = ctx.scroller; el.addEventListener("click", onClick); el.addEventListener("input", onInput); el.addEventListener("change", onChange); render(); },
    show() { render(); },
    relang() { render(); }
  };
})();
