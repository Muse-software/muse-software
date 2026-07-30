/**
 * Thin-outline icon set matching the brand guideline's iconography style
 * (1.5px stroke, no fills). Extend this map as new icons are needed.
 */
const paths: Record<string, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7M18.1 18.1l-1.7-1.7M7.6 7.6 5.9 5.9" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.4 3.2 7.6 8 9 4.8-1.4 8-4.6 8-9V6l-8-3Z" />,
  chart: <path d="M4 20V10M11 20V4M18 20v-7M4 20h16" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1-3.6 4-5.6 7.5-5.6s6.5 2 7.5 5.6" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 3v18" />
      <path d="M16.5 7.2c0-1.8-2-3.2-4.5-3.2S7.5 5.4 7.5 7.2c0 3.6 9 2 9 5.6 0 1.8-2 3.2-4.5 3.2S7.5 15.6 7.5 13.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  chat: <path d="M4 5h16v11H8l-4 4V5Z" />,
  check: <path d="M4 12.5 9.5 18 20 6" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.6 10.2V16M7.6 7.7h.01" />
      <path d="M11.4 10.2V16M11.4 12.5a2.3 2.3 0 0 1 4.6 0V16" />
    </>
  ),
  x: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.7 7.7l8.6 8.6M16.3 7.7l-8.6 8.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.3 7.5h.01" />
    </>
  ),
};

type IconProps = {
  name: keyof typeof paths;
  className?: string;
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
