type P = { className?: string; size?: number };

export function WhatsAppIcon({ className, size = 24 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="waG" x1="0" y1="1" x2="0.7" y2="0">
          <stop offset="0%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#5BF57F" />
        </linearGradient>
      </defs>
      <path
        fill="url(#waG)"
        d="M16.02 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.45 1.72 6.39L3.1 28.8l6.6-1.73a12.76 12.76 0 0 0 6.31 1.66h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.74-9.04a12.7 12.7 0 0 0-9.05-3.7Zm0 23.36h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.58 10.58 0 0 1-1.63-5.66c0-5.86 4.78-10.63 10.65-10.63 2.84 0 5.51 1.11 7.52 3.12a10.55 10.55 0 0 1 3.11 7.52c0 5.87-4.77 10.63-10.64 10.63Z"
      />
      <path
        fill="url(#waG)"
        d="M21.85 18.72c-.32-.16-1.88-.93-2.18-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-1 1.24-.18.21-.37.24-.68.08-.32-.16-1.35-.5-2.56-1.58-.95-.84-1.59-1.89-1.77-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54l-.6-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.6-.37Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className, size = 24 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="igG" cx="0.28" cy="1.05" r="1.25">
          <stop offset="0%" stopColor="#FFD776" />
          <stop offset="25%" stopColor="#F9A83A" />
          <stop offset="50%" stopColor="#F2295B" />
          <stop offset="75%" stopColor="#C32AA3" />
          <stop offset="100%" stopColor="#7B4DFF" />
        </radialGradient>
      </defs>
      <rect x="2.6" y="2.6" width="26.8" height="26.8" rx="8.4" fill="url(#igG)" />
      <rect x="2.6" y="2.6" width="26.8" height="26.8" rx="8.4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="6.4" fill="none" stroke="#fff" strokeWidth="2.1" />
      <circle cx="23.3" cy="8.8" r="1.65" fill="#fff" />
    </svg>
  );
}
