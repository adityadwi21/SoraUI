import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GitHubIcon: React.FC<IconProps> = ({
  size = 15,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      borderRadius: 2,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path d="M30 48h40v12H56v44H44V60H30V48z" fill="#FFF" />
    <path
      d="M72 87c3 4 8 7 14 7 6 0 10-3 10-7 0-4-3-6-9-8l-5-2c-10-3-15-8-15-16 0-9 7-16 18-16 8 0 14 3 18 8l-7 8c-3-3-6-5-11-5s-7 2-7 5c0 3 2 5 8 7l5 2c11 4 16 9 16 17 0 10-8 17-20 17-9 0-16-3-21-9l7-8z"
      fill="#FFF"
    />
  </svg>
);

export const JavaScriptIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      borderRadius: 2,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path
      d="M38 48h12v42c0 9-5 14-14 14-4 0-8-1-11-3l3-10c2 1 4 2 7 2 3 0 5-2 5-6V48z"
      fill="#000"
    />
    <path
      d="M68 87c3 4 8 7 14 7 6 0 10-3 10-7 0-4-3-6-9-8l-5-2c-10-3-15-8-15-16 0-9 7-16 18-16 8 0 14 3 18 8l-7 8c-3-3-6-5-11-5s-7 2-7 5c0 3 2 5 8 7l5 2c11 4 16 9 16 17 0 10-8 17-20 17-9 0-16-3-21-9l7-8z"
      fill="#000"
    />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 115 102"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      color: "#00D8FF",
      ...style,
    }}
    aria-hidden="true"
  >
    <ellipse
      cx="57.5"
      cy="51"
      rx="55"
      ry="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
    />
    <ellipse
      cx="57.5"
      cy="51"
      rx="55"
      ry="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      transform="rotate(60 57.5 51)"
    />
    <ellipse
      cx="57.5"
      cy="51"
      rx="55"
      ry="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      transform="rotate(120 57.5 51)"
    />
    <circle cx="57.5" cy="51" r="10" fill="currentColor" />
  </svg>
);

export const NpmIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 256 256"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect width="256" height="256" fill="#CB3837" rx="32" />
    <path d="M48 48h160v160h-40V88h-40v120H48V48z" fill="#FFF" />
  </svg>
);

export const PnpmIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect x="0" y="0" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="35" y="0" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="70" y="0" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="35" y="35" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="70" y="35" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="0" y="70" width="30" height="30" fill="#4B5563" rx="3" />
    <rect x="35" y="70" width="30" height="30" fill="#F69220" rx="3" />
    <rect x="70" y="70" width="30" height="30" fill="#F69220" rx="3" />
  </svg>
);

export const YarnIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 256 256"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect width="256" height="256" fill="#2C8EBB" rx="32" />
    <path
      d="M128 48c-44.18 0-80 35.82-80 80 0 22.09 8.95 42.09 23.43 56.57L48 208l23.43-23.43C85.91 199.05 105.91 208 128 208c44.18 0 80-35.82 80-80s-35.82-80-80-80zm0 130c-27.61 0-50-22.39-50-50s22.39-50 50-50 50 22.39 50 50-22.39 50-50 50z"
      fill="#FFF"
    />
  </svg>
);

export const BunIcon: React.FC<IconProps> = ({
  size = 14,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 256 256"
    width={size}
    height={size}
    className={className}
    style={{
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  >
    <rect width="256" height="256" fill="#FBF0DF" rx="32" />
    <path
      d="M198 116c-4-24-26-42-52-42-14 0-26 5-36 14-10-9-23-14-38-14-31 0-57 26-57 57 0 22 13 41 31 51 5 18 23 32 43 32 10 0 18-3 26-8 11 5 24 8 38 8 48 0 87-37 92-84v-14h-47z"
      fill="#4B382A"
    />
  </svg>
);
