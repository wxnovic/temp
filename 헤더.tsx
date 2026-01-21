"use client";

import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { toggleIsDark } from "@/store/slices/uiSlice";
import Link from "next/link";

type AdminHeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function AdminHeader({
  isSidebarOpen,
  onToggleSidebar,
}: AdminHeaderProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto flex h-full w-full items-center gap-3 px-4 sm:px-6">
      {/* Sidebar toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-pressed={isSidebarOpen}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm shadow-sm transition hover:bg-[var(--secondary)]/60"
      >
        {isSidebarOpen ? "⟨" : "☰"}
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm font-bold text-[var(--accent)]">
            Rx
          </div>
        </Link>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Blog Admin Page
          </span>
          <span className="text-xs text-[var(--text-muted)]">RxNovx</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm shadow-sm transition hover:bg-[var(--secondary)]/60"
          aria-label="Toggle theme"
          onClick={() => dispatch(toggleIsDark())}
        >
          🌗
        </button>

        {/* user placeholder */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] shadow-sm transition hover:bg-[var(--secondary)]/60"
          aria-label="Account menu"
        >
          <span className="h-6 w-6 rounded-full bg-[var(--secondary)]" />
          <span className="hidden sm:inline">추승협</span>
        </button>
      </div>
    </div>
  );
}
