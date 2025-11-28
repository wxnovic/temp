// components/Win95Button.tsx
"use client";

import * as React from "react";

type Win95ButtonVariant = "default" | "primary" | "secondary" | "danger" | "ghost";
type Win95ButtonSize = "sm" | "md" | "lg";

export interface Win95ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Win95ButtonVariant;
  size?: Win95ButtonSize;
  block?: boolean; // true면 width: 100%
}

/**
 * Win95 / MFC 스타일 버튼 (TailwindCSS 유틸리티만 사용)
 *
 * - global-colors.css 에 정의된 CSS 변수 사용:
 *   - bg-[var(--surface-soft)], text-[var(--foreground)] 등
 * - 3D 베벨(위/왼쪽 밝게, 아래/오른쪽 어둡게)
 * - active 시 테두리 반전 + 살짝 눌리는 효과
 */
export function Win95Button(props: Win95ButtonProps) {
  const {
    variant = "default",
    size = "md",
    block = false,
    className = "",
    children,
    ...rest
  } = props;

  const baseClasses = [
    "select-none",
    "inline-flex items-center justify-center",
    "text-[14px] leading-none",
    "px-3 py-1.5",
    "min-h-[28px] min-w-[72px]",
    "bg-[var(--surface-soft)]",
    "text-[var(--foreground)]",
    "font-normal",
    "whitespace-nowrap",

    // Win95 3D 테두리
    "border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]",
    "border-t-[#ffffff] border-l-[#ffffff]",
    "border-r-[#808080] border-b-[#808080]",

    // 그림자 (soft)
    "shadow-[0_1px_0_#ffffff,_-1px_-1px_0_#808080]",
    "cursor-pointer",

    // hover
    "hover:bg-[#E0E0E0]",

    // active - 눌린 효과
    "active:border-t-[#404040] active:border-l-[#404040]",
    "active:border-r-[#ffffff] active:border-b-[#ffffff]",
    "active:bg-[#C0C0C0]",
    "active:shadow-none",
    "active:translate-x-[1px] active:translate-y-[1px]",

    // focus - 점선 포커스 링
    "focus-visible:outline-dotted",
    "focus-visible:outline-[1px]",
    "focus-visible:outline-offset-[-4px]",
    "focus-visible:outline-black",

    // disabled 상태
    "disabled:cursor-default",
    "disabled:text-[var(--text-muted)]",
    "disabled:bg-[#D4D0C8]",
    "disabled:border-t-[#E0E0E0] disabled:border-l-[#E0E0E0]",
    "disabled:border-r-[#A0A0A0] disabled:border-b-[#A0A0A0]",
    "disabled:shadow-none",
    "disabled:opacity-90",
  ];

  const variantClasses: Record<Win95ButtonVariant, string> = {
    default: "",
    primary: [
      "bg-[var(--primary-soft)]",
      "text-[var(--primary-foreground)]",
      "hover:bg-[var(--primary)]",
    ].join(" "),
    secondary: [
      "bg-[var(--secondary-soft)]",
      "text-[var(--secondary-foreground)]",
      "hover:bg-[var(--secondary)]",
    ].join(" "),
    danger: [
      "bg-[var(--accent-soft)]",
      "text-[var(--accent-foreground)]",
      "hover:bg-[var(--accent)]",
    ].join(" "),
    ghost: [
      "bg-transparent",
      "hover:bg-[#E0E0E0]",
    ].join(" "),
  };

  const sizeClasses: Record<Win95ButtonSize, string> = {
    sm: "px-2 py-1 text-[12px] min-h-[24px]",
    md: "",
    lg: "px-4 py-2 text-[15px] min-h-[32px]",
  };

  const blockClasses = block ? "w-full flex" : "";

  const merged = [
    ...baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    blockClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={merged} {...rest}>
      {children}
    </button>
  );
}
