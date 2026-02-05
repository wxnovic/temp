// app/register/page.tsx
import RegisterCard from "./ui/RegisterCard";

export default function RegisterPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <RegisterCard />
      </div>
    </main>
  );
}




// app/register/ui/RegisterCard.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type State = "idle" | "loading" | "error" | "success";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(true);

  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => {
    if (name.trim().length < 2) return false;
    if (!isValidEmail(email)) return false;
    if (pw.trim().length < 8) return false;
    if (pw !== pw2) return false;
    if (!agree) return false;
    return state !== "loading";
  }, [name, email, pw, pw2, agree, state]);

  function fail(msg: string) {
    setState("error");
    setMessage(msg);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const safeName = name.trim();
    const safeEmail = email.trim();

    if (safeName.length < 2) return fail("이름은 2자 이상이 좋아.");
    if (!isValidEmail(safeEmail)) return fail("이메일 형식을 확인해줘.");
    if (pw.trim().length < 8) return fail("비밀번호는 8자 이상이어야 합니다.");
    if (pw !== pw2) return fail("비밀번호 확인이 일치하지 않습니다.");
    if (!agree) return fail("약관 동의가 필요합니다.");

    setState("loading");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: safeName, email: safeEmail, password: pw }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message || "회원가입에 실패했습니다.");
      }

      setState("success");
      setMessage("회원가입 완료! 로그인으로 이동합니다…");
      window.location.href = "/login";
    } catch (err) {
      fail(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <header className="px-6 pt-6">
        <h1 className="text-xl font-semibold tracking-tight">회원가입</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          계정을 만들고 계속 진행합니다.
        </p>
      </header>

      <form onSubmit={onSubmit} className="px-6 pb-6 pt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="name">
            이름
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            autoComplete="name"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-[var(--primary)] placeholder:text-[var(--text-muted)]"
          />
          {name.length > 0 && name.trim().length < 2 && (
            <p className="text-xs text-[var(--accent)]">2자 이상 입력해줘.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-[var(--primary)] placeholder:text-[var(--text-muted)]"
          />
          {email.length > 0 && !isValidEmail(email) && (
            <p className="text-xs text-[var(--accent)]">이메일 형식이 올바르지 않아.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="pw">
            비밀번호
          </label>

          <div className="flex items-stretch gap-2">
            <input
              id="pw"
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="8자 이상"
              autoComplete="new-password"
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

          {pw.length > 0 && pw.trim().length < 8 && (
            <p className="text-xs text-[var(--accent)]">비밀번호는 8자 이상이 좋아.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="pw2">
            비밀번혹 확인
          </label>
          <input
            id="pw2"
            type={showPw ? "text" : "password"}
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            placeholder="한 번 더 입력"
            autoComplete="new-password"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-[var(--primary)] placeholder:text-[var(--text-muted)]"
          />
          {pw2.length > 0 && pw !== pw2 && (
            <p className="text-xs text-[var(--accent)]">비밀번호가 일치하지 않아.</p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--text-muted)] select-none">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          약관에 동의합니다.
        </label>

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
          {state === "loading" ? "생성 중…" : "회원가입"}
        </button>

        <div className="text-center text-sm text-[var(--text-muted)]">
          이미 계정이 있나?{" "}
          <Link
            href="/login"
            className="text-[var(--foreground)] underline decoration-[var(--border)] hover:decoration-[var(--foreground)]"
          >
            로그인
          </Link>
        </div>
      </form>
    </section>
  );
}
