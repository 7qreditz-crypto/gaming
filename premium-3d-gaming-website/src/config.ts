/* =============================================================
 *  MAFUJ GAMING — SITE CONFIGURATION
 *  Everything the owner may need to edit lives in this file.
 * ============================================================= */

export const BRAND = {
  name: "MAFUJ",
  suffix: "GAMING",
  full: "MAFUJ GAMING",
  tagline: "MOBILE GAME ZONE",
  description:
    "A futuristic mobile gaming hub built for players. Discover trending titles, explore genres and connect with the community.",
  year: 2026,
};

/* -------------------------------------------------------------
 *  INSTAGRAM
 *  Exact profile URL supplied by the owner.
 * ----------------------------------------------------------- */
export const INSTAGRAM_URL =
  "https://www.instagram.com/_itz_mafuj_/?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==";

export const INSTAGRAM_HANDLE = "@_itz_mafuj_";

/* -------------------------------------------------------------
 *  WHATSAPP
 *
 *  ⚠️ IMPORTANT FOR THE OWNER:
 *  `WHATSAPP_NUMBER` below is stored EXACTLY as it was provided.
 *  wa.me requires a FULL international number in the format
 *  <country code><number> with no "+", spaces or dashes.
 *
 *  Example: for Bangladesh (+880) 1839 207 292  ->  "8801839207292"
 *
 *  If the chat link does not open the right contact, simply replace
 *  the value of WHATSAPP_NUMBER below with the full international
 *  number. Nothing else in the codebase needs to change.
 * ----------------------------------------------------------- */
export const WHATSAPP_NUMBER = "839207292";

export const WHATSAPP_MESSAGE =
  "Hi! I found your gaming website and wanted to connect.";

/** Builds a valid wa.me deep link (strips every non-digit character). */
export const whatsappLink = (
  number: string = WHATSAPP_NUMBER,
  message: string = WHATSAPP_MESSAGE,
): string =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = whatsappLink();

/* -------------------------------------------------------------
 *  NAVIGATION
 * ----------------------------------------------------------- */
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Games", href: "#games" },
  { label: "Categories", href: "#categories" },
  { label: "Trending", href: "#trending" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
