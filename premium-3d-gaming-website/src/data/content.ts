/* =============================================================
 *  CONTENT DATA — showcase / discovery only.
 *  No copyrighted game files, APKs or game assets are hosted or
 *  redistributed here. Artwork is royalty-free stock imagery used
 *  as thematic genre art, not official game artwork.
 * ============================================================= */

const px = (id: number, slug = "pexels-photo", w = 900, h = 600) =>
  `https://images.pexels.com/photos/${id}/${slug}-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export type Game = {
  id: string;
  title: string;
  studio: string;
  genre: string;
  categoryId: string;
  platform: string;
  rating: number;
  players: string;
  year: number;
  description: string;
  image: string;
  accent: string; // tailwind-ish rgb triple used for glow
  trending?: number; // rank when trending
  badge?: string;
};

export const CATEGORIES = [
  { id: "all", label: "All Games", icon: "Gamepad2", emoji: "🎮", accent: "34,230,255" },
  { id: "battle-royale", label: "Battle Royale", icon: "Crosshair", emoji: "🔥", accent: "255,92,66" },
  { id: "fps", label: "FPS", icon: "Target", emoji: "🎯", accent: "255,59,78" },
  { id: "racing", label: "Racing", icon: "Zap", emoji: "🏎", accent: "255,196,0" },
  { id: "rpg", label: "RPG", icon: "Wand2", emoji: "🧙", accent: "168,85,247" },
  { id: "action", label: "Action", icon: "Swords", emoji: "⚔", accent: "244,63,142" },
  { id: "strategy", label: "Strategy", icon: "Brain", emoji: "🧠", accent: "59,130,246" },
  { id: "sports", label: "Sports", icon: "Trophy", emoji: "⚽", accent: "34,197,94" },
  { id: "adventure", label: "Adventure", icon: "Globe2", emoji: "🌍", accent: "56,189,248" },
  { id: "multiplayer", label: "Multiplayer", icon: "Users", emoji: "👥", accent: "139,92,246" },
] as const;

export const GAMES: Game[] = [
  {
    id: "pubg-mobile",
    title: "PUBG Mobile",
    studio: "Level Infinite",
    genre: "Battle Royale",
    categoryId: "battle-royale",
    platform: "Android · iOS",
    rating: 4.6,
    players: "1B+",
    year: 2018,
    description:
      "100 players. One island. Drop, loot and outlast everyone to claim the chicken dinner in the most iconic mobile BR.",
    image: px(8107905, "pexels-photo"),
    accent: "255,140,50",
    trending: 1,
    badge: "HOT",
  },
  {
    id: "bgmi",
    title: "BGMI",
    studio: "Krafton India",
    genre: "Battle Royale",
    categoryId: "battle-royale",
    platform: "Android · iOS",
    rating: 4.5,
    players: "200M+",
    year: 2021,
    description:
      "Battlegrounds Mobile India — tactical 60fps squad warfare, Erangel classics and India's biggest esports scene.",
    image: px(8108316, "pexels-photo"),
    accent: "255,92,66",
    trending: 2,
    badge: "ESPORTS",
  },
  {
    id: "free-fire",
    title: "Free Fire",
    studio: "Garena",
    genre: "Battle Royale",
    categoryId: "battle-royale",
    platform: "Android · iOS",
    rating: 4.3,
    players: "1B+",
    year: 2017,
    description:
      "Fast 10-minute drops with 50 players, unique character skills and low-end device friendly performance.",
    image: px(8107911, "pexels-photo"),
    accent: "255,59,78",
    trending: 4,
  },
  {
    id: "cod-mobile",
    title: "Call of Duty: Mobile",
    studio: "Activision",
    genre: "FPS",
    categoryId: "fps",
    platform: "Android · iOS",
    rating: 4.7,
    players: "650M+",
    year: 2019,
    description:
      "Console-grade gunplay on mobile. Ranked multiplayer, legendary maps, killstreaks and a massive BR mode.",
    image: px(8107980, "pexels-photo"),
    accent: "120,190,255",
    trending: 3,
    badge: "TOP RATED",
  },
  {
    id: "asphalt-legends",
    title: "Asphalt Legends Unite",
    studio: "Gameloft",
    genre: "Racing",
    categoryId: "racing",
    platform: "Android · iOS",
    rating: 4.5,
    players: "150M+",
    year: 2024,
    description:
      "Hypercars, nitro drifts and gravity-defying stunts across neon skylines with full cross-play racing.",
    image: px(25637489, "pexels-photo"),
    accent: "255,196,0",
    trending: 5,
  },
  {
    id: "efootball",
    title: "eFootball",
    studio: "Konami",
    genre: "Sports",
    categoryId: "sports",
    platform: "Android · iOS",
    rating: 4.1,
    players: "400M+",
    year: 2021,
    description:
      "Authentic football on the go — build your dream squad, master skill moves and dominate online divisions.",
    image: px(35898730, "pexels-photo"),
    accent: "34,197,94",
  },
  {
    id: "roblox",
    title: "Roblox",
    studio: "Roblox Corp.",
    genre: "Adventure",
    categoryId: "adventure",
    platform: "Android · iOS",
    rating: 4.4,
    players: "70M+ DAU",
    year: 2011,
    description:
      "An endless universe of player-built experiences — obbys, tycoons, horror, simulators and social worlds.",
    image: px(6727761, "pexels-photo"),
    accent: "56,189,248",
  },
  {
    id: "minecraft",
    title: "Minecraft",
    studio: "Mojang Studios",
    genre: "Survival",
    categoryId: "adventure",
    platform: "Android · iOS",
    rating: 4.6,
    players: "300M+",
    year: 2011,
    description:
      "Mine, craft, build and survive. Infinite blocky worlds with realms, redstone engineering and co-op survival.",
    image: px(28551572, "pexels-photo"),
    accent: "132,204,22",
  },
  {
    id: "clash-of-clans",
    title: "Clash of Clans",
    studio: "Supercell",
    genre: "Strategy",
    categoryId: "strategy",
    platform: "Android · iOS",
    rating: 4.6,
    players: "500M+",
    year: 2012,
    description:
      "Build your village, train legendary troops and lead your clan through wars in the ultimate base-builder.",
    image: px(39125516, "pexels-photo"),
    accent: "251,146,60",
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    studio: "Moonton",
    genre: "Multiplayer MOBA",
    categoryId: "multiplayer",
    platform: "Android · iOS",
    rating: 4.4,
    players: "1B+",
    year: 2016,
    description:
      "Classic 5v5 MOBA action in 10-minute matches with 120+ heroes and a world-class competitive circuit.",
    image: px(38848922, "pexels-photo"),
    accent: "139,92,246",
    badge: "COMMUNITY",
  },
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    studio: "HoYoverse",
    genre: "Action RPG",
    categoryId: "rpg",
    platform: "Android · iOS",
    rating: 4.5,
    players: "60M+ MAU",
    year: 2020,
    description:
      "An open-world anime RPG with elemental combat, cinematic questlines and console-level visuals on mobile.",
    image: px(33879244, "pexels-photo"),
    accent: "168,85,247",
    badge: "AAA MOBILE",
  },
  {
    id: "honkai-star-rail",
    title: "Honkai: Star Rail",
    studio: "HoYoverse",
    genre: "Turn-based RPG",
    categoryId: "rpg",
    platform: "Android · iOS",
    rating: 4.6,
    players: "35M+",
    year: 2023,
    description:
      "Board the Astral Express for a space-fantasy odyssey with strategic turn-based combat and stunning worlds.",
    image: px(29450016, "pexels-photo"),
    accent: "99,102,241",
  },
  {
    id: "pokemon-go",
    title: "Pokémon GO",
    studio: "Niantic",
    genre: "AR Adventure",
    categoryId: "adventure",
    platform: "Android · iOS",
    rating: 4.2,
    players: "80M+ MAU",
    year: 2016,
    description:
      "Augmented-reality exploration — catch, battle and raid in the real world with friends around you.",
    image: px(32660204, "pexels-photo"),
    accent: "250,204,21",
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    studio: "SYBO Games",
    genre: "Casual Runner",
    categoryId: "action",
    platform: "Android · iOS",
    rating: 4.5,
    players: "3B+ downloads",
    year: 2012,
    description:
      "The endless runner that never stops — dash, dodge and grind rails through world tour cities.",
    image: px(18545016, "pexels-photo"),
    accent: "244,63,142",
  },
  {
    id: "brawl-stars",
    title: "Brawl Stars",
    studio: "Supercell",
    genre: "Action Multiplayer",
    categoryId: "multiplayer",
    platform: "Android · iOS",
    rating: 4.4,
    players: "300M+",
    year: 2018,
    description:
      "3v3 top-down brawls in fast rotating modes with dozens of brawlers, gadgets and hypercharges.",
    image: px(28494632, "pexels-photo"),
    accent: "34,230,255",
  },
];

export const SORTS = [
  { id: "trending", label: "Trending" },
  { id: "rating", label: "Top Rated" },
  { id: "newest", label: "Newest" },
  { id: "az", label: "A – Z" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

/* ---------------- Gaming news / updates ---------------- */
export type NewsItem = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  time: string;
  read: string;
  image: string;
  accent: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    tag: "New Release",
    title: "Next-gen mobile shooters land with 120fps support",
    excerpt:
      "Flagship Android and iOS devices now unlock ultra frame-rate tiers, bringing desktop-smooth aiming to competitive lobbies.",
    time: "2 hours ago",
    read: "4 min read",
    image: px(15367435, "pexels-photo", 800, 520),
    accent: "34,230,255",
  },
  {
    id: "n2",
    tag: "Esports",
    title: "Mobile Masters Invitational announces $2M prize pool",
    excerpt:
      "Sixteen regional champions will clash across a three-week LAN circuit streamed in nine languages worldwide.",
    time: "6 hours ago",
    read: "3 min read",
    image: px(9072320, "pexels-photo", 800, 520),
    accent: "244,63,142",
  },
  {
    id: "n3",
    tag: "New Season",
    title: "Season 12: Neon Protocol goes live tonight",
    excerpt:
      "A cyber-district map rework, a new ranked reward track and a fully reworked recoil system arrive in this drop.",
    time: "Yesterday",
    read: "5 min read",
    image: px(30469968, "pexels-photo", 800, 520),
    accent: "168,85,247",
  },
  {
    id: "n4",
    tag: "Event",
    title: "Limited-time co-op raid returns for the anniversary",
    excerpt:
      "Squad up for a two-week boss rotation with cosmetic-only rewards and no pay-to-win progression gates.",
    time: "2 days ago",
    read: "2 min read",
    image: px(9072394, "pexels-photo", 800, 520),
    accent: "59,130,246",
  },
  {
    id: "n5",
    tag: "Update",
    title: "Cloud saves and cross-progression expand to more titles",
    excerpt:
      "Carry your account, loadouts and cosmetics between phone, tablet and emulator without losing a single unlock.",
    time: "3 days ago",
    read: "4 min read",
    image: px(7915285, "pexels-photo", 800, 520),
    accent: "34,197,94",
  },
  {
    id: "n6",
    tag: "Pro Tips",
    title: "Five settings every mobile FPS player should change",
    excerpt:
      "Gyro sensitivity, 3-finger claw layouts and HUD scaling — small tweaks that quietly raise your K/D ratio.",
    time: "5 days ago",
    read: "6 min read",
    image: px(7915219, "pexels-photo", 800, 520),
    accent: "255,196,0",
  },
];

/* ---------------- Why this website ---------------- */
export const FEATURES = [
  {
    id: "discover",
    title: "DISCOVER",
    icon: "Compass",
    text: "Hand-picked mobile titles across every genre, refreshed with what the community is actually playing.",
    accent: "34,230,255",
  },
  {
    id: "explore",
    title: "EXPLORE",
    icon: "Layers",
    text: "Filter by genre, rating and hype. Deep-dive cards give you the details before you ever hit install.",
    accent: "59,130,246",
  },
  {
    id: "connect",
    title: "CONNECT",
    icon: "MessageCircle",
    text: "Talk strategy, squad up or collaborate — reach me directly on Instagram and WhatsApp any time.",
    accent: "168,85,247",
  },
  {
    id: "game",
    title: "GAME",
    icon: "Rocket",
    text: "Tips, seasons, events and esports updates so you always step into the lobby a step ahead.",
    accent: "244,63,142",
  },
] as const;

export const STATS = [
  { value: "150+", label: "Games Tracked" },
  { value: "10", label: "Genres" },
  { value: "24/7", label: "Updates" },
  { value: "1M+", label: "Community" },
] as const;
