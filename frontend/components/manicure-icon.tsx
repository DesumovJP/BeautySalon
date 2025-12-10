export function ManicureIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand with fingers */}
      <path d="M5 11c0-1.5 1-2.5 2.5-2.5h9c1.5 0 2.5 1 2.5 2.5v3c0 1.5-1 2.5-2.5 2.5h-9c-1.5 0-2.5-1-2.5-2.5v-3z" />
      {/* Three fingers */}
      <path d="M7.5 9v5M11 8v6M14.5 9v5" />
      {/* Nail polish brush */}
      <path d="M18 5l-1.5 1.5M16.5 6.5l1.5-1.5" />
      <circle cx="19" cy="4" r="1" />
    </svg>
  );
}

