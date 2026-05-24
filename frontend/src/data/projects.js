const fmtLocation = (area) => (area.toLowerCase().includes("chennai") ? area : `${area}, Chennai`);

const mk = (id, builder, name, area, priceMin, priceMax, bhk, image) => ({
  id,
  builder,
  name,
  area,
  location: fmtLocation(area),
  priceMin,
  priceMax,
  bhk,
  image,
});

const PROJECTS = [
  // Priority Builders first
  mk(1, "SPR City", "SPR City Apartments", "Minjur", 45, 90, [1, 2, 3], "/images/projectimages/spr city apartmentsw.jfif"),
  mk(2, "Casagrand", "Casagrand Supremus", "Perumbakkam", 95, 185, [2, 3, 4], "/images/projectimages/casagrand supremus.jpg"),
  mk(3, "Ampa Taj Skyview", "Ampa Taj Sky View Residences", "Aminjikarai", 195, 425, [3, 4], "/images/projectimages/Taj Skyview Residences.taj"),
  mk(4, "Urbanrise", "Urbanrise World of Joy", "Siruseri", 48, 92, [1, 2, 3], "/images/projectimages/urbanrise world of joy.jfif"),
  mk(5, "Brigade Groups", "Brigade Altius", "Sholinganallur", 130, 260, [3, 4], "/images/projectimages/brigade altius.jfif"),
  
  // Cleaned and Corrected projects
  mk(6, "Brigade Xanadu", "Brigade Xanadu", "Mogappair West", 85, 165, [2, 3, 4], "/images/projectimages/brigade xanadu.jfif"),
  mk(7, "Shriram Properties", "Shriram Properties", "Perambur", 85, 170, [2, 3], "/images/projectimages/sriram properties.jfif"),
  mk(8, "Urban Tree Cyber City", "Urban Tree Cyber City", "Manapakkam", 72, 145, [2, 3], "/images/projectimages/urban tree cyber city.jfif"),
  mk(9, "TVS Emerald Lake Shore", "TVS Emerald Lake Shore", "Siruseri", 78, 155, [2, 3], "/images/projectimages/tvs emerald lake shore.jfif"),
  mk(10, "Pacifica Aurum Pride", "Pacifica Aurum Pride", "Padur", 95, 185, [2, 3], "/images/projectimages/pacifica.jpg"),
  mk(11, "Casagrand Zenith", "Casagrand Zenith", "Pallavaram", 72, 140, [2, 3], "/images/projectimages/casagrand zenith.jpg"),
  mk(12, "VGN Properties", "VGN Properties", "Ambattur", 62, 115, [2, 3], "/images/projectimages/VGN properties.jfif"),
  mk(13, "Sameera Groups", "Sameera Groups", "Perungudi", 110, 220, [3, 4], "/images/projectimages/sameera.jfif"),
  mk(14, "VNR Fortuna", "VNR Fortuna", "OMR", 60, 110, [2, 3], "/images/projectimages/vnr fortuna.jfif"),
  mk(15, "Adityaram Nagar", "Adityaram Nagar", "OMR", 32, 65, [1, 2, 3], "/images/projectimages/adityaram nagar.webp"),
  mk(16, "Lancor Lumina", "Lancor Lumina", "Guduvanchery", 95, 175, [2, 3], "/images/projectimages/lancor lumina.jpg"),
  mk(17, "Arun Excello Temple Green", "Arun Excello Temple Green", "Oragadam", 42, 85, [2, 3], "/images/projectimages/arun excello temple green.jfif"),
  mk(18, "Jain Insieli Park", "Jain Inseli Park", "Padur", 88, 175, [2, 3], "/images/projectimages/Jains Inseli Park.jpg"),
  mk(19, "Voora Beckford", "Voora Beckford", "Nungambakkam", 220, 480, [3, 4], "/images/projectimages/voora beckford.webp"),
  mk(20, "RWD Grand Corridor", "RWD Grand Corridor", "Poonamallee", 42, 82, [2, 3], "/images/projectimages/RWD Grand Corridor.webp"),
  mk(21, "VR Livin", "VR Livin Heights", "Madhavaram", 95, 175, [2, 3], "/images/projectimages/VR Livin.webp"),
  mk(22, "Adityaram Properties", "Adityaram Nagar Plus", "OMR", 35, 70, [1, 2, 3], "/images/projectimages/adityaram nagar.webp"),
  mk(23, "Altis", "Altis Seaside", "Muttukadu, ECR", 180, 420, [3, 4], "/images/projectimages/altis seaside.jfif"),
  mk(24, "Arun Excello", "Arun Excello Green", "Oragadam", 45, 90, [2, 3], "/images/projectimages/arun excello temple green.jfif"),
  mk(25, "Bollineni BSCPL", "Bollineni Hillside", "Sholinganallur", 90, 185, [2, 3, 4], "/images/projectimages/bollineni hillside.jfif"),
  mk(26, "Elephantine", "Elephantine Estates", "Sriperumbudur", 60, 220, [2, 3, 4], "/images/projectimages/elephantine estates.jfif"),
  mk(27, "Empire Pride Deals", "Empire Pride", "Poonamallee", 55, 105, [2, 3], "/images/projectimages/empire pride.webp"),
  mk(28, "Jain Housing", "Jain Inseli Classic", "Padur", 90, 180, [2, 3], "/images/projectimages/Jains Inseli Park.jpg"),
  mk(29, "LML Homes", "LML Spring Valley", "Guduvanchery", 38, 72, [2, 3], "/images/projectimages/LML spring valley.jpg"),
  mk(30, "Lancor", "Lancor Lumina Elite", "Guduvanchery", 98, 180, [2, 3], "/images/projectimages/lancor lumina.jpg"),
  mk(31, "MPD", "MPD Silver Oak", "Tambaram", 58, 110, [2, 3], "/images/projectimages/mpd silver oak.jfif"),
  mk(32, "MWC", "MWC Township", "Sriperumbudur", 35, 150, [1, 2, 3], "/images/projectimages/mahindra world city.webp"),
  mk(33, "Merloam", "Merloam Plots", "Sriperumbudur", 30, 90, [0], "/images/projectimages/Merloam Park.jpg"),
  mk(34, "Nutech", "Nutech Elevate 21", "Perungudi", 105, 195, [2, 3], "/images/projectimages/nutech elevate 21.jfif"),
  mk(35, "Pacifica", "Pacifica Aurum", "Padur", 98, 190, [2, 3], "/images/projectimages/pacifica.jpg"),
  mk(36, "Pragnya", "Pragnya Elite", "Siruseri", 70, 135, [2, 3], "/images/projectimages/pragnya elite.jfif"),
  mk(37, "Pushkar Properties", "Pushkar Green Meadows", "Sholinganallur", 110, 220, [3, 4], "/images/projectimages/pushkar green meadows.webp"),
  mk(38, "RWD", "RWD Elite", "Poonamallee", 45, 85, [2, 3], "/images/projectimages/RWD Grand Corridor.webp"),
  mk(39, "Sameera", "Sameera Sky", "Perungudi", 115, 230, [3, 4], "/images/projectimages/sameera.jfif"),
  mk(40, "TVS Emerald", "TVS Emerald Lake Shore Elite", "Siruseri", 80, 160, [2, 3], "/images/projectimages/tvs emerald lake shore.jfif"),
  mk(41, "Urban Tree", "Urban Tree Cyber City Elite", "Manapakkam", 75, 150, [2, 3], "/images/projectimages/urban tree cyber city.jfif"),
  mk(42, "VGK", "VGK Eden Gardens", "Poonamallee", 50, 95, [2, 3], "/images/projectimages/vgk eden gardens.jfif"),
  mk(43, "VGN Properties", "VGN Properties", "Ambattur", 62, 115, [2, 3], "/images/projectimages/VGN properties.jfif"),
  mk(44, "VNR", "VNR Fortuna Elite", "OMR", 62, 115, [2, 3], "/images/projectimages/vnr fortuna.jfif"),
  mk(45, "Voora", "Voora Beckford Elite", "Nungambakkam", 225, 490, [3, 4], "/images/projectimages/voora beckford.webp"),
  mk(46, "VR Livin ", "VR Livin Premium", "Madhavaram", 98, 180, [2, 3], "/images/projectimages/VR Livin.webp"),
  mk(47, "Provident Ecopolitan", "Provident Ecopolitan", "Pallikaranai", 65, 120, [2, 3], "/images/projectimages/about-provident-ecopolitan.webp"),
];

// Re-map BUILDERS to preserve priority ordering
const PRIORITY_BUILDERS = ["SPR City", "Casagrand", "Ampa Taj Skyview", "Urbanrise", "Brigade Groups"];
const OTHER_BUILDERS = Array.from(new Set(PROJECTS.map((p) => p.builder)))
  .filter((b) => !PRIORITY_BUILDERS.includes(b))
  .sort();
const BUILDERS = [...PRIORITY_BUILDERS, ...OTHER_BUILDERS];

const AREAS = Array.from(new Set(PROJECTS.map((p) => p.area))).sort();

const formatPrice = (lakhs) => {
  if (lakhs >= 100) return `\u20B9${(lakhs / 100).toFixed(lakhs % 100 === 0 ? 0 : 2)}Cr`;
  return `\u20B9${lakhs}L`;
};

const formatPriceRange = (p) => `${formatPrice(p.priceMin)} \u2013 ${formatPrice(p.priceMax)}`;

const formatBhk = (bhk) => {
  if (bhk.includes(0)) return "Plots";
  return `${bhk.join(", ")} BHK`;
};

const BUDGET_OPTIONS = [
  { label: "Under \u20B940L", value: "<40", min: 0, max: 40 },
  { label: "\u20B940L \u2013 \u20B975L", value: "40-75", min: 40, max: 75 },
  { label: "\u20B975L \u2013 \u20B91.5Cr", value: "75-150", min: 75, max: 150 },
  { label: "\u20B91.5Cr+", value: "150+", min: 150, max: 99999 },
];

export { AREAS, BUDGET_OPTIONS, BUILDERS, PROJECTS, formatBhk, formatPrice, formatPriceRange };
