// app/auth/register/page.tsx
"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    // TODO: 여기에서 실제 회원가입 API 호출 (예: DRF /api/auth/register/)
    // fetch("http://localhost:8000/api/auth/register/", { ... })

    setTimeout(() => {
      setIsLoading(false);
      // 예: 회원가입 완료 후 /auth/login 혹은 /dashboard 로 이동
      // router.push("/auth/login");
      console.log({ email, username, password, password2 });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
        {/* Left: 소개 / 브랜딩 영역 */}
        <div className="hidden md:flex flex-col gap-6 bg-[var(--surface-soft)] border border-[var(--border)] rounded-3xl p-10 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-soft)] text-sm font-medium text-[var(--primary-strong)] w-max">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary-strong)]" />
            Create your account
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            SHC Dashboard에 <br />
            처음 오신 것을 환영합니다.
          </h1>

          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            계정을 만들고 나만의 대시보드를 구성해 보세요.
            <br />
            운동, 개발, 재테크, 생활 로그를 하나의 포털에서 관리할 수 있습니다.
          </p>

          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>여러 디바이스에서 동일한 계정으로 접속</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>개인화된 위젯과 레이아웃 저장</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary-strong)]" />
              <span>향후 API 연동 및 자동화 기능 확장 예정</span>
            </li>
          </ul>

          <div className="mt-auto text-xs text-[var(--text-muted)]">
            ⓒ {new Date().getFullYear()} SHC. All rights reserved.
          </div>
        </div>

        {/* Right: 회원가입 폼 */}
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
                  계정을 생성하고 대시보드에 접속하세요
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-semibold">회원가입</h2>
            <p className="text-sm text-[var(--text-muted)]">
              이메일과 비밀번호를 입력해서 새로운 계정을 생성합니다.
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                사용자 이름
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="표시할 이름을 입력하세요"
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
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="영문, 숫자, 기호 조합을 권장합니다"
                />
              </div>
            </div>

            {/* Password Confirm */}
            <div className="space-y-1.5">
              <label
                htmlFor="password2"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                  placeholder="한 번 더 입력하세요"
                />
              </div>
            </div>

            {/* 이용약관 동의 영역 */}
            <div className="flex items-start gap-2 text-xs">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-[var(--border)] bg-[var(--surface)] text-[var(--primary-strong)] focus:ring-[var(--primary-soft)]"
              />
              <label htmlFor="terms" className="cursor-pointer select-none">
                <span>
                  <span className="font-medium">서비스 이용약관</span> 및{" "}
                  <span className="font-medium">개인정보 처리방침</span>에
                  동의합니다.
                </span>
              </label>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:bg-[var(--primary-strong)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </button>

            {/* 구분선 */}
            <div className="relative my-2">
              <div className="h-px bg-[var(--border)]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--surface)] px-2 text-[0.7rem] text-[var(--text-muted)]">
                이미 계정이 있으신가요?
              </span>
            </div>

            {/* 로그인 링크 */}
            <p className="pt-1 text-xs text-center text-[var(--text-muted)]">
              이미 계정을 가지고 계신 경우{" "}
              <button
                type="button"
                className="font-medium text-[var(--accent)] hover:underline"
                onClick={() => {
                  // TODO: 로그인 페이지로 라우팅
                  // router.push("/auth/login");
                }}
              >
                로그인 하러가기
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
