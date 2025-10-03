const locations = [
  {
    id: "gate-main",
    name: "正門",
    description: "東京家政大大学のメインゲート。",
    x: 23,
    y: 41,
    aliases: ["正門", "メインゲート"]
  },
  {
    id: "gate-itabashi",
    name: "板橋門",
    description: "キャンパス北側の入口です。",
    x: 49,
    y: 21,
    aliases: ["板橋門"]
  },
  {
    id: "gate-jujo",
    name: "十条門",
    description: "十条駅方面の入口です。",
    x: 55,
    y: 84,
    aliases: ["十条門"]
  },
  {
    id: "bld-1",
    name: "1号館",
    description: "ナースシミュレーションルームや講義室がある棟。",
    x: 30,
    y: 23,
    aliases: ["1号館"]
  },
  {
    id: "bld-4",
    name: "4号館",
    description: "実験室や研究室が多く集まる棟。",
    x: 60,
    y: 30,
    aliases: ["4号館"]
  },
  {
    id: "bld-7",
    name: "7号館",
    description: "スポーツ施設の中心棟。",
    x: 52,
    y: 43,
    aliases: ["7号館"]
  },
  {
    id: "bld-10",
    name: "10号館",
    description: "キャンパスで一番高い建物です。",
    x: 70,
    y: 46,
    aliases: ["10号館","図書館","学生ホール"]
  },
  {
    id: "bld-12",
    name: "12号館",
    description: "理系学生の研究拠点。",
    x: 85,
    y: 50,
    aliases: ["12号館"]
  },
  {
    id: "bld-15",
    name: "15号館",
    description: "コミュニケーションスペースやラウンジがある棟。",
    x: 89,
    y: 55,
    aliases: ["15号館"]
  },
  {
    id: "bld-16",
    name: "16号館",
    description: "アドミッションセンターやLuceなどが入る施設。",
    x: 46,
    y: 72,
    aliases: ["16号館","アドミッションセンター", "学生支援センター", "グローバル教育センター"]
  },
  {
    id: "bld-22",
    name: "22号館",
    description: "自然な環境が豊かなエリア。",
    x: 49,
    y: 33,
    aliases: ["22号館"]
  },
  {
    id: "hall-120",
    name: "120周年記念館",
    description: "ミュージック・ルームやホールなどユニークな施設。",
    x: 58,
    y: 19,
    aliases: ["120周年記念館"]
  },
  {
    id: "hall-100",
    name: "100周年記念館",
    description: "学校創立に合わせて作られた記念ホール。",
    x: 22,
    y: 49,
    aliases: ["100周年記念館"]
  },
  {
    id: "center-health",
    name: "保健センター",
    description: "学生の健康サポートを行う保健センター。",
    x: 26,
    y: 66,
    aliases: ["保健センター"]
  },
  {
    id: "center-clinic",
    name: "地域医療センター",
    description: "4号館北側に位置する医療施設。",
    x: 66,
    y: 31,
    aliases: ["地域医療センター"]
  },
  {
    id: "pool",
    name: "室内プール",
    description: "スポーツエリアにある室内プール。",
    x: 87,
    y: 28,
    aliases: ["室内プール"]
  },
  {
    id: "hall-85",
    name: "85周年記念館",
    description: "学校行事などが行われるホール。",
    x: 69,
    y: 66,
    aliases: ["85周年記念館"]
  }
];
const form = document.getElementById("search-form");
const select = document.getElementById("location-select");
const feedback = document.getElementById("search-feedback");
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
  locationIndex.set(location.id, location);
  const seenLabels = new Set();
  [location.name, ...(location.aliases || [])].forEach((label) => {
    if (!label) {
      return;
    }
    const key = normalise(label);
    if (seenLabels.has(key)) {
      return;
    }
    seenLabels.add(key);
    const option = document.createElement("option");
    option.value = location.id;
    option.textContent = label;
    select.appendChild(option);
  });
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
  const selectedId = select.value;
  if (!selectedId) {
    hideMarker("場所を選択してください。");
    return;
  }
  const location = locationIndex.get(selectedId);
  if (!location) {
    hideMarker("選択した場所の情報を取得できませんでした。");
    return;
  }
  showLocation(location);
});
select.addEventListener("change", () => {
  const selectedId = select.value;
  if (!selectedId) {
    hideMarker("");
    return;
  }
  const location = locationIndex.get(selectedId);
  if (location) {
    showLocation(location);
  } else {
    hideMarker("選択した場所の情報を取得できませんでした。");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  select.focus();
});

