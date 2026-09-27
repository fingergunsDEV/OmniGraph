import { useId } from "react";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" className={cn("size-9", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-a`} x1="6" y1="40" x2="42" y2="8">
          <stop stopColor="var(--color-cobalt)" />
          <stop offset="0.55" stopColor="var(--color-ch-search)" />
          <stop offset="1" stopColor="var(--color-teal-bright)" />
        </linearGradient>
      </defs>
      <path
        d="M24 7.5c9.4 0 17 6.7 17 16.2 0 6.6-3.8 11.2-9 14"
        fill="none"
        stroke={`url(#${id}-a)`}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M24 40.5c-9.4 0-17-6.7-17-16.2 0-6.8 4.2-11.6 9.6-14.4"
        fill="none"
        stroke={`url(#${id}-a)`}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <rect x="16.2" y="25" width="4" height="8.5" rx="1.1" fill="var(--color-ch-search)" />
      <rect x="22" y="19.5" width="4" height="14" rx="1.1" fill="var(--color-teal)" />
      <rect x="27.8" y="15.2" width="4" height="18.3" rx="1.1" fill="var(--color-teal-bright)" />
    </svg>
  );
}

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className={cn("text-lg font-semibold tracking-tight", tone === "light" ? "text-on-navy" : "text-ink")}>
      Omni
      <span className="text-teal-bright">Graph</span>
      <span className="ml-0.5 align-super text-xs font-medium">TM</span>
    </span>
  );
}
