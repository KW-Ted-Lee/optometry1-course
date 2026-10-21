/* 網站設定：開發者名單、版權宣告、搭配的實驗課平台都集中在這裡修改，所有頁面會自動帶入 */
window.OB_CONFIG = {
  siteName: "視光學（一）（無邊界教室）",
  course: "視光學（一）（二專在職專班）",
  copyright: {
    year: 2026,
    holder: "Kuan-Wei Lee（李冠緯）",
    note: "版權所有。本教材供教學使用，未經授權請勿轉載或作商業用途。",
  },
  developers: [
    { name: "Kuan-Wei Lee（李冠緯）", role: "教材設計與開發", affiliation: "馬偕醫護管理專科學校 視光學科" },
  ],
  /* 搭配的《視光學實驗（一）》學習平台。上線後把 base 改成它的網址（結尾要有 /），
     例如 "../optometry1-practicum/"；留空時，各週的「實驗課對照」會顯示「即將上線」。 */
  partner: {
    name: "視光學實驗（一）學習平台",
    base: "",
  },
  /* 其他實驗台的工具（同一個 GitHub Pages 網域，用相對路徑） */
  tools: {
    phoropter: "../general.optometry-lab/phoropter.html",
  },
};
