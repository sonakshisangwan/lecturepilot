import React from "react";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function TwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function NvidiaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.932 7.72c-.145.025-1.92.385-2.607 1.488-.544.872-.486 2.05-.486 2.05s.557-1.17 1.705-1.748c1.148-.578 2.378-.444 2.378-.444l-.99-1.346zm2.84-2.605c-.208.03-3.084.58-4.148 2.338-.853 1.409-.76 3.255-.76 3.255s.891-1.85 2.73-2.77c1.839-.92 3.8-.71 3.8-.71l-1.622-2.113zm3.763-4.115c-.287.037-4.464.795-6.002 3.38-1.233 2.072-1.096 4.795-1.096 4.795s1.288-2.724 3.948-4.08c2.66-1.355 5.503-1.045 5.503-1.045l-2.353-2.05zM2.86 16.59c-.482-.676-.79-1.572-.79-2.59 0-2.348 1.637-4.303 3.87-4.82v1.442c-1.468.46-2.53 1.8-2.53 3.378 0 .762.247 1.472.673 2.056l-1.223.534zm12.39-12.87c3.834.79 6.75 4.137 6.75 8.28 0 4.67-3.833 8.455-8.56 8.455-2.67 0-5.06-1.21-6.643-3.11l1.543-.674c1.238 1.47 3.067 2.41 5.1 2.41 3.79 0 6.877-3.05 6.877-6.81 0-3.32-2.4-6.095-5.568-6.68l.498-1.871z" />
    </svg>
  );
}

export function NebiusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v8l8 4 8-4v-8l-8 4zm0 2.2l6-3v4.6l-6 3-6-3v-4.6l6 3z" />
    </svg>
  );
}
