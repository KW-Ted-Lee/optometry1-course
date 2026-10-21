/* ★ 必會計算（共 13 項，全部一步到兩步）＋各週的延伸計算。數字隨機，原創題。
   每題標註 star：1–13 對應「★ 必會計算練功房」；0 為延伸練習（不列入精熟統計）。 */
(function () {
  const { define, F } = (typeof window !== "undefined" ? window : globalThis).OBPractice;
  const ax3 = (a) => String(Math.round(a)).padStart(3, "0");
  const normAx = (a) => { let x = Math.round(a) % 180; if (x <= 0) x += 180; return x; };
  const sph = (v) => (Math.abs(v) < 0.005 ? "plano" : F.s(v));
  const rx = (S, C, A) => `${sph(S)} ${F.s(C)} ×${ax3(A)}`;
  const log10 = (x) => Math.log(x) / Math.LN10;

  /* ---------- W02 ★1 視力 ＝ 測試距離 ÷ 設計距離 ---------- */
  define("w02", [
    { id: "2-1", star: 1, title: "走近視力表：視力怎麼算", gen(r) {
      const d = r.pick([1, 1.5, 2, 3, 4]);                // 實際測試距離（m）
      const D = r.pick([60, 30, 20, 12, 60, 30]);         // 視標設計距離（m）
      const va = d / D;
      return {
        q: `病人在 6 公尺連最大的視標都看不到，你請他走近，在 <b>${d} 公尺</b>處剛好能辨認設計距離為 <b>${D} 公尺</b>（6/${D}）的視標。他的小數視力是多少？`,
        parts: [{ label: "小數視力", type: "num", ans: va, dp: 3, tol: 0.002 }, { label: "公尺制寫法", type: "choice", opts: [`${d}/${D}`, `6/${D}`, `${D}/${d}`], ans: 0 }],
        steps: [
          { c: "視力 ＝ 測試距離 ÷ 視標大小為一分視角（細節）的設計距離。分子要換成「實際」距離。", e: `VA ＝ ${d} ÷ ${D}` },
          { c: "算出小數視力；紀錄時把實際距離寫在分子。", e: `VA ＝ ${va.toFixed(3)}（寫成 ${d}/${D}）` },
        ],
      };
    } },
  ]);

  /* ---------- W03 ★2 四種寫法互換、★3 視標高度、★4 M-unit；延伸：LogMAR 差 ---------- */
  define("w03", [
    { id: "3-1", star: 2, title: "小數 → Snellen、MAR、LogMAR", gen(r) {
      const dec = r.pick([2.0, 1.25, 1.0, 0.8, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05]);
      const mar = 1 / dec, lm = log10(mar), sn = 20 * mar;
      return {
        q: `病人的小數視力是 <b>${dec.toFixed(dec < 0.1 ? 2 : 1)}</b>。請換算成英尺制 Snellen 分母、MAR 與 LogMAR。`,
        parts: [
          { label: "Snellen 20/ ？", type: "num", ans: sn, dp: 0, tol: 0.6 },
          { label: "MAR", type: "num", ans: mar, unit: "弧分", dp: 2, tol: 0.02 },
          { label: "LogMAR", type: "num", ans: lm, dp: 2, tol: 0.015 },
        ],
        steps: [
          { c: "MAR 是小數視力的倒數。", e: `MAR ＝ 1 ÷ ${dec} ＝ ${mar.toFixed(2)} 弧分` },
          { c: "Snellen 分母 ＝ 20 × MAR（公尺制則是 6 × MAR）。", e: `20 × ${mar.toFixed(2)} ＝ ${sn.toFixed(0)} → 20/${sn.toFixed(0)}（6/${(6 * mar).toFixed(1)}）` },
          { c: "LogMAR 是 MAR 取常用對數。負值代表比 1.0 好，是正常的。", e: `log(${mar.toFixed(2)}) ＝ ${F.n(lm, 2)}` },
        ],
      };
    } },
    { id: "3-2", star: 3, title: "視標高度 h ＝ d × tan θ", gen(r) {
      const d = r.pick([6, 4, 3, 2, 1, 0.4]);
      const dec = r.pick([1.0, 0.5, 0.2, 0.1]);
      const th = 5 / dec;                                   // 整個視標所對的弧分
      const h = d * Math.tan(th / 60 * Math.PI / 180) * 1000;
      return {
        q: `測試距離 <b>${d < 1 ? d * 100 + " 公分" : d + " 公尺"}</b>，小數視力 <b>${dec.toFixed(1)}</b> 那一行的視標，整個字高應該是多少 mm？（1.0 的整個視標占 5 弧分）`,
        parts: [{ label: "整個視標所占視角", type: "num", ans: th, unit: "弧分", dp: 0, tol: 0.1 }, { label: "視標高度 h", type: "num", ans: h, unit: "mm", dp: 2, tol: Math.max(0.02, h * 0.01) }],
        steps: [
          { c: "1.0 的視標總高占 5 弧分；視力差幾倍，視標就大幾倍。", e: `5 × (1 ÷ ${dec}) ＝ ${th} 弧分` },
          { c: "弧分換成度：÷ 60。", e: `${th} ÷ 60 ＝ ${(th / 60).toFixed(4)}°` },
          { c: "h ＝ d × tan θ，公尺換成 mm。（同義寫法：h ＝ 2d × tan(θ/2)，結果相同）", e: `${d} × tan(${(th / 60).toFixed(4)}°) ＝ ${(h / 1000).toFixed(5)} m ＝ ${h.toFixed(2)} mm` },
        ],
      };
    } },
    { id: "3-3", star: 4, title: "M-unit：VA ＝ m ÷ M", gen(r) {
      const m = r.pick([0.4, 0.4, 0.5, 0.33, 1, 0.25, 0.5]);
      const M = r.pick([0.8, 1.0, 1.6, 2.0, 2.5, 4.0, 8.0]);
      const va = m / M;
      return {
        q: `病人在 <b>${Math.round(m * 100)} 公分</b>處剛好能讀 <b>${M.toFixed(1)}M</b> 的字。他的近用視力（小數）是多少？相當於英尺制 20/？`,
        parts: [{ label: "小數視力", type: "num", ans: va, dp: 2, tol: 0.012 }, { label: "Snellen 20/ ？", type: "num", ans: 20 / va, dp: 0, tol: Math.max(1, 20 / va * 0.02) }],
        steps: [
          { c: "小 m 除大 M：測試距離（公尺）÷ 讀到的 M 數。", e: `${m} ÷ ${M} ＝ ${va.toFixed(3)}` },
          { c: "換成 Snellen：分母 ＝ 20 ÷ 小數視力。", e: `20 ÷ ${va.toFixed(3)} ＝ ${(20 / va).toFixed(0)} → 20/${(20 / va).toFixed(0)}` },
        ],
      };
    } },
    { id: "3-4", star: 0, title: "延伸：兩個視力差幾個 LogMAR？", gen(r) {
      const pairs = [[0.2, 0.5], [0.1, 0.4], [0.5, 1.0], [0.25, 1.0], [0.1, 0.2], [0.4, 0.8]];
      const [a, b] = r.pick(pairs);
      const d = log10(1 / a) - log10(1 / b);
      return {
        q: `小數視力 <b>${a}</b> 與 <b>${b}</b> 的 LogMAR 差多少？（log 2 ＝ 0.301）在 ETDRS 視力表上大約差幾行？`,
        parts: [{ label: "LogMAR 差", type: "num", ans: d, dp: 2, tol: 0.015 }, { label: "約差幾行", type: "num", ans: d / 0.1, unit: "行", dp: 0, tol: 0.6 }],
        steps: [
          { c: "各自求 LogMAR ＝ log(1 ÷ 小數視力)。", e: `log(${(1 / a).toFixed(2)}) ＝ ${log10(1 / a).toFixed(3)}；log(${(1 / b).toFixed(2)}) ＝ ${log10(1 / b).toFixed(3)}` },
          { c: "相減。通則：視力差一倍，LogMAR 差 0.301。", e: `${log10(1 / a).toFixed(3)} − ${log10(1 / b).toFixed(3)} ＝ ${d.toFixed(3)}` },
          { c: "ETDRS 一行 ＝ 0.1 LogMAR（一個字母 0.02）。", e: `${d.toFixed(2)} ÷ 0.1 ≈ ${Math.round(d / 0.1)} 行` },
        ],
      };
    } },
  ]);

  /* ---------- W04 ★5 D ＝ n / f、★6 遠點距離 ---------- */
  define("w04", [
    { id: "4-1", star: 5, title: "屈光力 D ＝ n ÷ f", gen(r) {
      const inAir = r.rand() < 0.7;
      const n = inAir ? 1 : 1.336;
      const f = r.pick([2, 1, 0.5, 0.4, 0.25, 0.2, 0.125, 0.1]) * (r.rand() < 0.3 ? -1 : 1);
      const D = n / f;
      return {
        q: `一片鏡片${inAir ? "在空氣中" : "在折射率 1.336 的介質中"}的焦距是 <b>${F.n(f * 100, 1)} 公分</b>。它的屈光力是多少？`,
        parts: [{ label: "屈光力", type: "num", ans: D, unit: "D", dp: 2, tol: 0.02 }, { label: "鏡片", type: "choice", opts: ["凸透鏡（會聚）", "凹透鏡（發散）"], ans: D > 0 ? 0 : 1 }],
        steps: [
          { c: "焦距換成公尺。", e: `${F.n(f * 100, 1)} cm ＝ ${F.n(f, 3)} m` },
          { c: `D ＝ n ÷ f，${inAir ? "空氣中 n ＝ 1" : "n ＝ 1.336"}。`, e: `${n} ÷ ${F.n(f, 3)} ＝ ${F.D(D)}` },
          { c: D > 0 ? "正值：會聚光線，凸透鏡。" : "負值：發散光線，凹透鏡（矯正近視用）。" },
        ],
      };
    } },
    { id: "4-2", star: 6, title: "遠點距離 ＝ 1 ÷ |屈光度|", gen(r) {
      const D = -r.pick([0.5, 1, 1.25, 2, 2.5, 4, 5, 8, 10]);
      const fp = 1 / Math.abs(D);
      return {
        q: `一位 <b>${F.D(D)}</b> 的近視眼（調節放鬆、未矯正），遠點在眼前多遠？`,
        parts: [{ label: "遠點距離", type: "num", ans: fp * 100, unit: "cm", dp: 1, tol: 0.3 }],
        steps: [
          { c: "近視的遠點在眼前有限距離：遠點（m）＝ 1 ÷ |屈光度|。", e: `1 ÷ ${Math.abs(D)} ＝ ${fp.toFixed(3)} m` },
          { c: "換成公分。度數越深，遠點越近。", e: `${fp.toFixed(3)} m ＝ ${(fp * 100).toFixed(1)} cm` },
        ],
      };
    } },
    { id: "4-3", star: 6, title: "反向題：量到遠點，推度數", gen(r) {
      const cm = r.pick([200, 100, 80, 50, 40, 25, 20, 12.5]);
      const D = -100 / cm;
      return {
        q: `病人不戴眼鏡，視標由遠處慢慢拿近，在眼前 <b>${cm} 公分</b>處第一次變清楚（遠點）。他大約是幾度的近視？`,
        parts: [{ label: "屈光度", type: "num", ans: D, unit: "D", dp: 2, tol: 0.02 }],
        steps: [
          { c: "公分換公尺後取倒數，近視寫負號。", e: `−1 ÷ ${(cm / 100).toFixed(3)} ＝ ${F.D(D)}` },
        ],
      };
    } },
  ]);

  /* ---------- W05 ★7 正負散換算、★8 等價球面 ---------- */
  define("w05", [
    { id: "5-1", star: 7, title: "正負散換算三步驟", gen(r) {
      const S = r.step(-6, 4, 0.25), C = r.pick([0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3]) * r.sign(), A = r.pick([5, 10, 15, 30, 45, 60, 80, 90, 100, 120, 135, 150, 165, 175, 180]);
      const S2 = S + C, C2 = -C, A2 = normAx(A + 90);
      return {
        q: `把處方 <b>${rx(S, C, A)}</b> 換成${C < 0 ? "正" : "負"}散寫法。`,
        parts: [{ label: "新球面", type: "num", ans: S2, unit: "D", dp: 2, tol: 0.01 }, { label: "新柱面", type: "num", ans: C2, unit: "D", dp: 2, tol: 0.01 }, { label: "新軸度", type: "num", ans: A2, unit: "°", dp: 0, tol: 0.5 }],
        steps: [
          { c: "第一步：球面 ＋ 柱面 ＝ 新球面。", e: `${F.s(S)} + ${F.s(C)} ＝ ${F.s(S2)}${Math.abs(S2) < 0.005 ? "（寫 plano）" : ""}` },
          { c: "第二步：柱面變號，數值不變。", e: `${F.s(C)} → ${F.s(C2)}` },
          { c: "第三步：軸度加 90，超過 180 就扣 180。軸度一律寫三位數。", e: `${A} + 90 ＝ ${A + 90}${A + 90 > 180 ? ` → ${A + 90} − 180 ＝ ${A2}` : ""} → ${ax3(A2)}` },
          { c: "驗算：兩種寫法的等價球面相同。", e: `SE ＝ ${F.s(S)} + ${F.s(C)} / 2 ＝ ${F.s(S + C / 2, 3)}；${F.s(S2)} + ${F.s(C2)} / 2 ＝ ${F.s(S2 + C2 / 2, 3)}` },
        ],
      };
    } },
    { id: "5-2", star: 8, title: "等價球面 SE ＝ 球面 ＋ 柱面 ÷ 2", gen(r) {
      const S = r.step(-6, 3, 0.25), C = -r.pick([0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3]), A = r.pick([180, 175, 90, 85, 45, 135, 10, 170]);
      const se = S + C / 2;
      return {
        q: `處方 <b>${rx(S, C, A)}</b> 的等價球面是多少？`,
        parts: [{ label: "SE", type: "num", ans: se, unit: "D", dp: 3, tol: 0.005 }],
        steps: [
          { c: "柱面的一半加回球面。SE 的光學意義：把最小模糊圈 COLC 放到網膜上的球面度數。", e: `${F.s(S)} + ${F.s(C)} / 2 ＝ ${F.s(se, 3)}` },
        ],
      };
    } },
  ]);

  /* ---------- W06 ★9 AA ＝ Fnp − Ffp、★10 Hofstetter 最小值 ---------- */
  define("w06", [
    { id: "6-1", star: 9, title: "推進法：近點 → 調節幅度", gen(r) {
      const unc = r.rand() < 0.4;
      const np = r.pick([8, 10, 12.5, 15, 20, 25, 33.3, 40, 50]);
      const fpD = unc ? r.pick([1, 2, 2.5, 4]) : 0;              // 未矯正近視：遠點在眼前
      const fpCm = unc ? 100 / fpD : Infinity;
      const npUse = unc ? Math.min(np, fpCm * 0.6) : np;
      const npR = Math.round(npUse * 10) / 10;
      const Fnp = 100 / npR, aa = Fnp - fpD;
      return {
        q: unc ? `一位未戴眼鏡的近視者，遠點在眼前 <b>${fpCm.toFixed(0)} 公分</b>、近點在眼前 <b>${npR} 公分</b>。他的調節幅度是多少？（眼前的點以正的距離屈光度計）`
               : `病人戴著遠用矯正做推進法，視標在眼鏡平面前 <b>${npR} 公分</b>出現持續性模糊。他的調節幅度是多少？`,
        parts: [{ label: "AA", type: "num", ans: aa, unit: "D", dp: 2, tol: 0.03 }],
        steps: unc ? [
          { c: "AA ＝ Fnp − Ffp。先把近點、遠點換成屈光度。", e: `Fnp ＝ 1 ÷ ${(npR / 100).toFixed(3)} ＝ ${Fnp.toFixed(2)} D；Ffp ＝ 1 ÷ ${(fpCm / 100).toFixed(2)} ＝ ${fpD.toFixed(2)} D` },
          { c: "相減。近視者的遠點本來就在眼前，扣掉的這段不需要調節。", e: `${Fnp.toFixed(2)} − ${fpD.toFixed(2)} ＝ ${aa.toFixed(2)} D` },
        ] : [
          { c: "戴遠用矯正時遠點在無限遠：Ffp ＝ 0。", e: "Ffp ＝ 0 D" },
          { c: "近點換成屈光度：D ＝ 1 ÷ 距離（公尺）。", e: `Fnp ＝ 1 ÷ ${(npR / 100).toFixed(3)} ＝ ${Fnp.toFixed(2)} D` },
          { c: "AA ＝ Fnp − Ffp。", e: `${Fnp.toFixed(2)} − 0 ＝ ${aa.toFixed(2)} D` },
        ],
      };
    } },
    { id: "6-2", star: 10, title: "Hofstetter 最小值與判讀", gen(r) {
      const age = r.pick([18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48]);
      const min = 15 - 0.25 * age;
      const meas = Math.max(0.5, Math.round((min + r.pick([-3, -2, -1.5, -1, 0.5, 1, 2, 3])) * 2) / 2);
      const low = meas < min;
      return {
        q: `<b>${age} 歲</b>的病人，推進法測得 AA ＝ <b>${meas.toFixed(2)} D</b>。用 Hofstetter 最小調節幅度公式判讀。`,
        parts: [{ label: "最小期望值", type: "num", ans: min, unit: "D", dp: 2, tol: 0.01 }, { label: "判讀", type: "choice", opts: ["符合年齡期望", "低於最小值：疑似調節不足"], ans: low ? 1 : 0 }],
        steps: [
          { c: "臨床判讀用「最小」式：15 − 0.25 × 年齡。", e: `15 − 0.25 × ${age} ＝ ${min.toFixed(2)} D` },
          { c: low ? "實測值低於最小期望值 → 調節不足，需要進一步檢查（先排除未矯正的遠視等因素）。" : "實測值不低於最小期望值 → 符合年齡。", e: `${meas.toFixed(2)} ${low ? "<" : "≥"} ${min.toFixed(2)}` },
        ],
      };
    } },
  ]);

  /* ---------- W11 ★11 三十法則 ---------- */
  define("w11", [
    { id: "11-1", star: 11, title: "三十法則：鐘點 → 負柱鏡軸", gen(r) {
      const h = r.int(1, 12), small = h > 6 ? h - 6 : h, ax = small * 30;
      const kind = (ax <= 30 || ax >= 150) ? 0 : (ax >= 60 && ax <= 120) ? 1 : 2;
      return {
        q: `霧視後，病人說 <b>${h} 點鐘</b>方向（也就是 ${small}–${small + 6} 點那條線）最黑最清楚。負柱鏡軸度是多少？屬於哪一種散光？`,
        parts: [{ label: "負柱鏡軸", type: "num", ans: ax, unit: "°", dp: 0, tol: 0.5 }, { label: "分類", type: "choice", opts: ["順散 WTR", "逆散 ATR", "斜散 OBL"], ans: kind }],
        steps: [
          { c: "線是成對的，取 1–6 之間較小的鐘點數。", e: `${h} 點 → ${small}–${small + 6} 線 → 取 ${small}` },
          { c: "鐘點數 × 30（一圈 12 個鐘點 ＝ 360°，每鐘點 30°）。", e: `${small} × 30 ＝ ${ax3(ax)}` },
          { c: "負柱鏡軸 180 ± 30 為順散、090 ± 30 為逆散，其餘為斜散。" },
        ],
      };
    } },
  ]);

  /* ---------- W12 ★12 JCC 球面補償 ---------- */
  define("w12", [
    { id: "12-1", star: 12, title: "柱鏡變了，球面補多少？", gen(r) {
      const S = r.step(-5, 1, 0.25), c1 = -r.pick([0, 0.25, 0.5, 0.75, 1, 1.25, 1.5]);
      let dC = r.pick([-0.5, -1, -0.5, 0.5, -1.5]); if (c1 + dC > 0) dC = -dC;
      const c2 = c1 + dC, comp = -dC / 2, S2 = S + comp;
      return {
        q: `JCC 之前：<b>${sph(S)} ${F.s(c1)}</b>。度數精修後柱鏡變成 <b>${F.s(c2)}</b>。為了維持等價球面，球面應補多少？新的球面是多少？`,
        parts: [{ label: "球面補償", type: "num", ans: comp, unit: "D", dp: 2, tol: 0.01 }, { label: "新球面", type: "num", ans: S2, unit: "D", dp: 2, tol: 0.01 }],
        steps: [
          { c: "先算柱鏡變化量。", e: `${F.s(c2)} − ${F.s(c1)} ＝ ${F.s(dC)}` },
          { c: "柱鏡每 −0.50，球面補 +0.25：補償量 ＝ 變化量的一半、反號。", e: `−(${F.s(dC)}) ÷ 2 ＝ ${F.s(comp)}` },
          { c: "加回原球面。", e: `${F.s(S)} + ${F.s(comp)} ＝ ${F.s(S2)}` },
          { c: "驗算 SE 不變。", e: `${F.s(S)} + ${F.s(c1)} / 2 ＝ ${F.s(S + c1 / 2, 3)}；${F.s(S2)} + ${F.s(c2)} / 2 ＝ ${F.s(S2 + c2 / 2, 3)}` },
        ],
      };
    } },
  ]);

  /* ---------- W13 延伸：軸度步進 ---------- */
  define("w13", [
    { id: "13-1", star: 0, title: "延伸：依散光量選軸度步進", gen(r) {
      const C = -r.pick([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4]);
      const a = Math.abs(C), ans = a <= 0.5 ? 0 : a <= 1.5 ? 1 : a <= 3 ? 2 : 3;
      return {
        q: `目前柱鏡 <b>${F.s(C)} D</b>，用 JCC 精修軸度時，每次轉幾度比較合適？`,
        parts: [{ label: "建議步進", type: "choice", opts: ["15°", "10°", "5°", "2–3°"], ans }],
        steps: [{ c: "散光越大，軸度越敏感，步進越小：≤ 0.50 → 15°；0.75–1.50 → 10°；1.75–3.00 → 5°；> 3.00 → 2–3°（Carlson & Kurtz）。" }],
      };
    } },
  ]);

  /* ---------- W14 ★13 主子午線 → 處方 ---------- */
  define("w14", [
    { id: "14-1", star: 13, title: "兩條主子午線 → 負散處方", gen(r) {
      const A = r.pick([180, 90, 175, 5, 170, 10, 85, 95, 45, 135, 160, 20]);
      const P1 = r.step(-5, 1, 0.25), cyl = r.pick([0.5, 0.75, 1, 1.25, 1.5, 2, 2.5]);
      const P2 = P1 - cyl, A2 = normAx(A + 90);
      return {
        q: `裂孔板：第一主子午線 <b>${ax3(A)}</b> 方向最清楚時為 <b>${sph(P1)} D</b>；轉 90° 後第二主子午線 <b>${ax3(A2)}</b> 方向為 <b>${sph(P2)} D</b>。寫出負散處方。`,
        parts: [{ label: "球面", type: "num", ans: P1, unit: "D", dp: 2, tol: 0.01 }, { label: "柱面", type: "num", ans: -cyl, unit: "D", dp: 2, tol: 0.01 }, { label: "軸度", type: "num", ans: A, unit: "°", dp: 0, tol: 0.5 }],
        steps: [
          { c: "畫光學十字：每條線寫上該方向的總屈光力。", e: `${ax3(A)} → ${sph(P1)}；${ax3(A2)} → ${sph(P2)}` },
          { c: "散光量 ＝ 兩條主子午線相差。", e: `${F.s(P2)} − ${F.s(P1)} ＝ ${F.s(-cyl)}` },
          { c: "負散寫法：球面取較正（較弱）的那條，軸度 ＝ 那條（第一主子午線）的方向。", e: `${rx(P1, -cyl, A)}` },
        ],
      };
    } },
  ]);
})();
