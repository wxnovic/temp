// app/auth/login/page.tsx
"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: 여기에 실제 로그인 로직(Fetch/axios 등) 연결
    setTimeout(() => {
      setIsLoading(false);
      // 예: router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
        {/* Left: 소개 / 브랜딩 영역 */}
        <div className="hidden md:flex flex-col gap-6 bg-[var(--surface-soft)] border border-[var(--border)] rounded-3xl p-10 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-soft)] text-sm font-medium text-[var(--primary-strong)] w-max">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary-strong)]" />
            Welcome back
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            SHC Dashboard에 <br />
            다시 오신 것을 환영합니다.
          </h1>

          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            한 곳에서 나의 기록, 프로젝트, 트래킹 데이터를 확인하고 관리하세요.
            <br />
            로그인을 통해 개인화된 보드와 설정에 접근할 수 있습니다.
          </p>

          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>실시간 모니터링 및 개인화된 인사이트 제공</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>운동, 개발, 재테크 등 라이프로그 통합 관리</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>모든 기기에서 동일한 경험을 유지</span>
            </li>
          </ul>

          <div className="mt-auto text-xs text-[var(--text-muted)]">
            ⓒ {new Date().getFullYear()} SHC. All rights reserved.
          </div>
        </div>

        {/* Right: 로그인 폼 */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-lg p-6 sm:p-8">
          {/* 로고/타이틀 */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[var(--primary-soft)] flex items-center justify-center">
                <span className="text-lg font-bold text-[var(--primary-strong)]">
                  SH
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-wide">
                  SHC Portal
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  로그인 후 대시보드에 접속하세요
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-semibold">로그인</h2>
            <p className="text-sm text-[var(--text-muted)]">
              계정 정보가 기억나지 않는다면 비밀번호 재설정을 이용하세요.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                이메일
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {/* 옵션 영역 */}
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--border)] bg-[var(--surface)] text-[var(--primary-strong)] focus:ring-[var(--primary-soft)]"
                />
                <span>로그인 상태 유지</span>
              </label>

              <button
                type="button"
                className="text-[var(--accent)] hover:underline"
                onClick={() => {
                  // TODO: 비밀번호 재설정 페이지로 라우팅
                  // router.push("/auth/reset-password");
                }}
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:bg-[var(--primary-strong)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>

            {/* 구분선 */}
            <div className="relative my-2">
              <div className="h-px bg-[var(--border)]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--surface)] px-2 text-[0.7rem] text-[var(--text-muted)]">
                또는
              </span>
            </div>

            {/* 소셜 로그인 자리 (원하면 채워 넣기) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-medium hover:bg-[var(--surface-strong)] transition-colors"
              >
                <span className="w-4 h-4 rounded-full bg-[var(--foreground)]" />
                <span>GitHub로 로그인</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-medium hover:bg-[var(--surface-strong)] transition-colors"
              >
                <span className="w-4 h-4 rounded-full bg-[var(--accent)]" />
                <span>Google로 로그인</span>
              </button>
            </div>

            {/* 회원가입 링크 */}
            <p className="pt-2 text-xs text-center text-[var(--text-muted)]">
              아직 계정이 없으신가요?{" "}
              <button
                type="button"
                className="font-medium text-[var(--accent)] hover:underline"
                onClick={() => {
                  // TODO: 회원가입 페이지로 라우팅
                  // router.push("/auth/register");
                }}
              >
                회원가입 하기
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
