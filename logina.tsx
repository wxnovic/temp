// app/login/page.tsx
import LoginCard from "./ui/LoginCard";

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </main>
  );
}




// app/login/ui/LoginCard.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type LoginState = "idle" | "loading" | "error" | "success";

function isValidEmail(email: string) {
  // 과하게 엄격하게 안 잡고 기본만 체크
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);

  const [state, setState] = useState<LoginState>("idle");
  const [message, setMessage] = useState<string>("");

  const canSubmit = useMemo(() => {
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 8) return false;
    return state !== "loading";
  }, [email, password, state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const safeEmail = email.trim();
    const safePw = password;

    if (!isValidEmail(safeEmail)) {
      setState("error");
      setMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (safePw.trim().length < 8) {
      setState("error");
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setState("loading");

    try {
      // ✅ 여기만 너의 실제 로그인 API로 연결하면 됨
      // 예: /api/auth/login 을 만들어서 {email, password, remember} 받도록 구현
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: safeEmail, password: safePw, remember }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message || "로그인에 실패했습니다.");
      }

      setState("success");
      setMessage("로그인 성공! 이동 중…");

      // 로그인 성공 후 이동 (원하면 콜백URL 처리로 바꿔도 됨)
      window.location.href = "/";
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <header className="px-6 pt-6">
        <h1 className="text-xl font-semibold tracking-tight">로그인</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          계정으로 로그인해서 계속 진행합니다.
        </p>
      </header>

      <form onSubmit={onSubmit} className="px-6 pb-6 pt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-[var(--primary)] placeholder:text-[var(--text-muted)]"
          />
          {email.length > 0 && !isValidEmail(email) && (
            <p className="text-xs text-[var(--accent)]">이메일 형식을 확인해줘.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">
            비밀번호
          </label>

          <div className="flex items-stretch gap-2">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-[var(--primary)] placeholder:text-[var(--text-muted)]"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="shrink-0 rounded-xl border border-[var(--border)] px-3 text-sm
                         hover:bg-[var(--secondary)] transition"
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPw ? "숨김" : "표시"}
            </button>
          </div>

          {password.length > 0 && password.trim().length < 8 && (
            <p className="text-xs text-[var(--accent)]">비밀번호는 8자 이상이 좋아.</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-[var(--text-muted)] select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            로그인 유지
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-[var(--foreground)] underline decoration-[var(--border)] hover:decoration-[var(--foreground)]"
          >
            비밀번호 찾기
          </Link>
        </div>

        {message && (
          <div
            className={[
              "rounded-xl border px-3 py-2 text-sm",
              state === "error"
                ? "border-[var(--accent)]/40 bg-[var(--accent)]/10"
                : "border-[var(--border)] bg-[var(--background)]",
            ].join(" ")}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--surface)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:brightness-95 active:brightness-90 transition"
        >
          {state === "loading" ? "로그인 중…" : "로그인"}
        </button>

        <div className="text-center text-sm text-[var(--text-muted)]">
          계정이 없나?{" "}
          <Link
            href="/signup"
            className="text-[var(--foreground)] underline decoration-[var(--border)] hover:decoration-[var(--foreground)]"
          >
            회원가입
          </Link>
        </div>
      </form>
    </section>
  );
}









// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string; remember?: boolean }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  // ✅ 데모: 특정 계정만 통과
  if (email === "test@example.com" && password === "password1234") {
    // 실제 구현에서는 여기서 세션/토큰 발급 (httpOnly 쿠키 권장)
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
    { status: 401 }
  );
}

