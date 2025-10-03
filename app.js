const locations = [
  {
    id: "gate-main",
    name: "正門",
    description: "東京都市大学恒例のメインゲート。",
    x: 23,
    y: 41,
    aliases: ["正門", "メインゲート"]
  },
  {
    id: "gate-itabashi",
    name: "板橋門",
    description: "キャンパス北側の入口です。",
    x: 52,
    y: 24,
    aliases: ["板橋門"]
  },
  {
    id: "gate-jujo",
    name: "十条門",
    description: "十条駅方面の入口です。",
    x: 52,
    y: 89,
    aliases: ["十条門"]
  },
  {
    id: "bld-1",
    name: "1号館",
    description: "ナースシミュレーションルームや講義室がある棟。",
    x: 21,
    y: 18,
    aliases: ["1号館", "第一号館", "北棟", "1棟"]
  },
  {
    id: "bld-4",
    name: "4号館",
    description: "実験室や研究室が多く集まる棟。",
    x: 60,
    y: 30,
    aliases: ["4号館", "第四号館", "南棟", "4棟"]
  },
  {
    id: "bld-7",
    name: "7号館",
    description: "スポーツ施設の中心棟。",
    x: 52,
    y: 43,
    aliases: ["7号館", "第七号館", "体育館", "7棟"]
  },
  {
    id: "bld-10",
    name: "10号館",
    description: "キャンパスで一番高い建物です。",
    x: 72,
    y: 37,
    aliases: ["10号館", "第十号館", "西棟", "10棟"]
  },
  {
    id: "bld-12",
    name: "12号館",
    description: "理系学生の研究拠点。",
    x: 87,
    y: 57,
    aliases: ["12号館", "第十二号館", "南研究棟", "12棟"]
  },
  {
    id: "bld-15",
    name: "15号館",
    description: "コミュニケーションスペースやラウンジがある棟。",
    x: 89,
    y: 55,
    aliases: ["15号館", "第十五号館", "南別館", "15棟"]
  },
  {
    id: "bld-16",
    name: "16号館",
    description: "アドミッションセンターやLuceなどが入る施設。",
    x: 34,
    y: 78,
    aliases: ["16号館", "第十六号館", "学生センター", "16棟"]
  },
  {
    id: "bld-22",
    name: "22号館",
    description: "自然な環境が豊かなエリア。",
    x: 49,
    y: 33,
    aliases: ["22号館", "第二十二号館", "新南棟", "22棟"]
  },
  {
    id: "hall-120",
    name: "120周年記念館",
    description: "ミュージック・ルームやホールなどユニークな施設。",
    x: 58,
    y: 19,
    aliases: ["120周年記念館", "百二十周年記念館", "120館"]
  },
  {
    id: "hall-100",
    name: "100周年記念館",
    description: "学校創立に合わせて作られた記念ホール。",
    x: 22,
    y: 49,
    aliases: ["100周年記念館", "百周年記念館", "100館"]
  },
  {
    id: "center-health",
    name: "保健センター",
    description: "学生の健康サポートを行う保健センター。",
    x: 26,
    y: 66,
    aliases: ["保健センター", "保健室"]
  },
  {
    id: "center-clinic",
    name: "地域医療センター",
    description: "4号館北側に位置する医療施設。",
    x: 66,
    y: 31,
    aliases: ["地域医療センター", "地域診療所"]
  },
  {
    id: "pool",
    name: "室内プール",
    description: "スポーツエリアにある室内プール。",
    x: 87,
    y: 28,
    aliases: ["室内プール", "室内温水プール"]
  },
  {
    id: "hall-85",
    name: "85周年記念館",
    description: "学校行事などが行われるホール。",
    x: 69,
    y: 66,
    aliases: ["85周年記念館", "八十五周年記念館", "85館"]
  }
];

const form = document.getElementById("search-form");
const input = document.getElementById("location-input");
const feedback = document.getElementById("search-feedback");
const datalist = document.getElementById("location-list");
const marker = document.getElementById("marker");
const markerLabel = document.getElementById("marker-label");
const mapContainer = document.querySelector(".map__container");

const normalise = (value) =>
  value
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .toLowerCase();

const locationIndex = new Map();

locations.forEach((location) => {
  const uniqueAliases = new Set([location.name, ...(location.aliases || [])]);
  uniqueAliases.forEach((alias) => {
    locationIndex.set(normalise(alias), location);
  });

  const option = document.createElement("option");
  option.value = location.name;
  datalist.appendChild(option);
});

const showLocation = (location) => {
  marker.style.left = `${location.x}%`;
  marker.style.top = `${location.y}%`;
//  markerLabel.textContent = location.name;
  marker.classList.remove("hidden");

  if (location.description) {
    feedback.textContent = `${location.name}：${location.description}`;
  } else {
    feedback.textContent = `${location.name} の位置を表示しています。`;
  }

  mapContainer.scrollIntoView({ behavior: "smooth", block: "center" });
};

const hideMarker = (message) => {
  marker.classList.add("hidden");
  markerLabel.textContent = "";
  feedback.textContent = message || "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = normalise(input.value || "");

  if (!query) {
    hideMarker("名前を入力してください。");
    return;
  }

  const location = locationIndex.get(query);

  if (!location) {
    hideMarker("ご希望の名前に該当する場所は見つかりませんでした。別の名前で試してください。");
    return;
  }

  showLocation(location);
});

input.addEventListener("input", () => {
  if (!input.value.trim()) {
    hideMarker("");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  input.focus();
});
