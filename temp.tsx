"use client";
import React, { useMemo, useState, useEffect } from "react";

/**
 * DesignGuide — Bootstrap-like single page, HMI-friendly
 * - TailwindCSS utilities with your CSS variables (light/dark supported)
 * - Sticky sidebar (desktop) + topbar (mobile)
 * - All in one file so you can copy and split later
 * - No external UI libs; pure React + Tailwind
 */

// ---------- Small UI primitives (pure React) ----------
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-12 border-t border-[var(--border)]">
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">{title}</h2>
      <div className="prose prose-sm max-w-none prose-headings:scroll-mt-24 prose-pre:bg-[var(--surface)] prose-hr:border-[var(--border)] text-[var(--foreground)]">
        {children}
      </div>
    </section>
  );
}

function Badge({ children, tone = "neutral" as "neutral"|"primary"|"accent"|"success"|"warning"|"danger" }) {
  const toneCls: Record<string, string> = {
    neutral: "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]",
    primary: "bg-[var(--primary)]/15 text-[var(--foreground)] border border-[var(--primary)]/35",
    accent: "bg-[var(--accent)]/15 text-[var(--foreground)] border border-[var(--accent)]/35",
    success: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-100 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-900 dark:text-amber-100 border border-amber-500/30",
    danger: "bg-red-500/15 text-red-900 dark:text-red-100 border border-red-500/30",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${toneCls[tone]}`}>{children}</span>;
}

function Button({
  children,
  variant = "solid" as "solid" | "outline" | "ghost",
  tone = "primary" as "primary" | "accent" | "neutral",
  size = "md" as "sm" | "md" | "lg",
  onClick,
  type = "button",
  disabled,
}: React.PropsWithChildren<{
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}>) {
  const base = "inline-flex items-center justify-center rounded-2xl font-medium transition active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "text-xs px-2.5 h-8",
    md: "text-sm px-3.5 h-10",
    lg: "text-base px-4.5 h-12",
  };
  const tones: Record<string, { solid: string; outline: string; ghost: string }> = {
    primary: {
      solid: "bg-[var(--primary)] text-[var(--foreground)] hover:opacity-90 focus:ring-[var(--primary)]",
      outline: "border border-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 focus:ring-[var(--primary)]",
      ghost: "text-[var(--foreground)] hover:bg-[var(--primary)]/10 focus:ring-[var(--primary)]",
    },
    accent: {
      solid: "bg-[var(--accent)] text-white hover:opacity-90 focus:ring-[var(--accent)]",
      outline: "border border-[var(--accent)] text-[var(--foreground)] hover:bg-[var(--accent)]/10 focus:ring-[var(--accent)]",
      ghost: "text-[var(--foreground)] hover:bg-[var(--accent)]/10 focus:ring-[var(--accent)]",
    },
    neutral: {
      solid: "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--border)]/40 focus:ring-[var(--foreground)]",
      outline: "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)]/30 focus:ring-[var(--foreground)]",
      ghost: "text-[var(--foreground)] hover:bg-[var(--border)]/30 focus:ring-[var(--foreground)]",
    },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${sizes[size]} ${tones[tone][variant]}`}>
      {children}
    </button>
  );
}

function Input({ label, desc, ...props }: { label: string; desc?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useMemo(() => props.id || `in-${Math.random().toString(36).slice(2, 8)}`, [props.id]);
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-[var(--foreground)]/80">{label}</span>
      <input
        id={id}
        {...props}
        className={`mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${props.className || ""}`}
      />
      {desc && <span className="mt-1 block text-xs text-[var(--text-muted)]">{desc}</span>}
    </label>
  );
}

function Select({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useMemo(() => props.id || `sel-${Math.random().toString(36).slice(2, 8)}`, [props.id]);
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-[var(--foreground)]/80">{label}</span>
      <select
        id={id}
        {...props}
        className={`mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${props.className || ""}`}
      >
        {children}
      </select>
    </label>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition border border-[var(--border)] ${checked ? "bg-[var(--primary)]" : "bg-[var(--surface)]"}`}
      aria-pressed={checked}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-1"}`} />
      {label && <span className="ml-3 text-sm text-[var(--foreground)]">{label}</span>}
    </button>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full h-3 rounded-full bg-[var(--border)]/60 overflow-hidden">
      <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${value}%` }} />
    </div>
  );
}

function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  initial?: number;
}) {
  const [i, setI] = useState(initial);
  return (
    <div>
      <div className="flex gap-2 border-b border-[var(--border)]">
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setI(idx)}
            className={`px-3 py-2 text-sm rounded-t-xl border-b-2 -mb-[2px] ${
              i === idx ? "border-[var(--primary)] text-[var(--foreground)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-b-xl border border-[var(--border)] p-4 bg-[var(--surface)]">{tabs[i].content}</div>
    </div>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-[min(92vw,720px)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
          <Button variant="ghost" tone="neutral" onClick={onClose}>✕</Button>
        </div>
        <div className="mt-3 text-[var(--foreground)]/90">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" tone="neutral" onClick={onClose}>취소</Button>
          <Button tone="accent" onClick={onClose}>확인</Button>
        </div>
      </div>
    </div>
  );
}

function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-md text-[var(--foreground)]">
        {message}
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function DesignGuidePage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Top bar (mobile) */}
      <div className="md:hidden sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:rgb(255_255_255_/_0.6)] dark:supports-[backdrop-filter]:bg-[color:rgb(22_33_62_/_0.6)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <span className="font-semibold">DesignGuide</span>
          <Switch checked={dark} onChange={setDark} label="Dark" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block sticky top-4 self-start h-[calc(100vh-2rem)] overflow-auto pr-4">
          <nav className="text-sm">
            <ul className="space-y-1">
              {[
                ["overview", "개요"],
                ["colors", "색상"],
                ["typography", "타이포그래피"],
                ["grid", "그리드"],
                ["buttons", "버튼"],
                ["forms", "폼"],
                ["feedback", "피드백"],
                ["navigation", "네비게이션"],
                ["data", "데이터 표시"],
                ["overlays", "오버레이"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="block px-3 py-2 rounded-xl text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--border)]/30">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <main className="pb-20">
          <header className="flex items-center justify-between mt-6 md:mt-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">DesignGuide</h1>
              <p className="mt-1 text-[var(--text-muted)]">Bootstrap 문서 톤에 맞춘 일체형 HMI 스타일 가이드</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Switch checked={dark} onChange={setDark} label="Dark" />
              <Button variant="outline" tone="neutral" onClick={() => { navigator.clipboard.writeText("/app/design-guide/page.tsx"); setToast(true); setTimeout(() => setToast(false), 1200); }}>경로 복사</Button>
            </div>
          </header>

          {/* 개요 */}
          <Section id="overview" title="개요">
            <p>
              이 페이지는 <strong>하나의 파일</strong> 안에 핵심 컴포넌트를 모아둔 "디자인 가이드" 입니다. 그대로 붙여넣고 프로젝트에 맞게 파편화하세요. 모든 색상은 당신의 <code>CSS 변수</code>를 통해 Tailwind 임의값으로 스타일링됩니다.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]"><div className="text-sm text-[var(--text-muted)]">테마</div><div className="mt-1 font-semibold">Light / Dark</div></div>
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]"><div className="text-sm text-[var(--text-muted)]">타이포</div><div className="mt-1 font-semibold">시스템 폰트 + Scale</div></div>
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]"><div className="text-sm text-[var(--text-muted)]">격자</div><div className="mt-1 font-semibold">Grid / Gap / Ratio</div></div>
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--surface)]"><div className="text-sm text-[var(--text-muted)]">상태</div><div className="mt-1 font-semibold">Hover / Focus / Disabled</div></div>
            </div>
          </Section>

          {/* 색상 */}
          <Section id="colors" title="색상 시스템 (CSS 변수 기반)">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Background", var: "--background" },
                { name: "Foreground", var: "--foreground" },
                { name: "Surface", var: "--surface" },
                { name: "Primary", var: "--primary" },
                { name: "Secondary", var: "--secondary" },
                { name: "Text Muted", var: "--text-muted" },
                { name: "Accent", var: "--accent" },
                { name: "Border", var: "--border" },
              ].map((c) => (
                <div key={c.var} className="rounded-2xl overflow-hidden border border-[var(--border)]">
                  <div className="h-20" style={{ background: `var(${c.var})` }} />
                  <div className="p-3 text-sm flex items-center justify-between bg-[var(--surface)]">
                    <span className="text-[var(--foreground)]">{c.name}</span>
                    <code className="text-[var(--text-muted)]">{c.var}</code>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 타이포 */}
          <Section id="typography" title="타이포그래피">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">H1 — 시스템 헤드라인</h1>
              <h2 className="text-3xl font-bold">H2 — 섹션 타이틀</h2>
              <h3 className="text-2xl font-semibold">H3 — 카드 타이틀</h3>
              <p className="text-base">본문 텍스트. <strong>강조</strong>와 <em>이탤릭</em>, <a href="#" className="underline underline-offset-4">링크</a> 예시.</p>
              <p className="text-sm text-[var(--text-muted)]">보조 텍스트(설명/힌트) 스타일.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge>Neutral</Badge>
                <Badge tone="primary">Primary</Badge>
                <Badge tone="accent">Accent</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </div>
            </div>
          </Section>

          {/* 그리드 */}
          <Section id="grid" title="그리드 & 레이아웃">
            <p>반응형 12열 그리드 예시 (카드 타일)</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text-muted)] flex items-end">col</div>
              ))}
            </div>
          </Section>

          {/* 버튼 */}
          <Section id="buttons" title="버튼">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button tone="accent">Accent</Button>
              <Button tone="neutral">Neutral</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button onClick={() => setToast(true)}>토스트</Button>
              <Button onClick={() => setModal(true)} variant="outline">모달</Button>
            </div>
          </Section>

          {/* 폼 */}
          <Section id="forms" title="폼 구성요소">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input label="사용자명" placeholder="wxnovic" />
                <Input label="이메일" type="email" placeholder="you@example.com" />
                <Input label="비밀번호" type="password" placeholder="••••••••" />
                <Select label="역할">
                  <option>Operator</option>
                  <option>Engineer</option>
                  <option>Admin</option>
                </Select>
                <div className="flex items-center gap-3">
                  <Switch checked={dark} onChange={setDark} label="다크모드" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-[var(--foreground)]/80">설명</label>
                  <textarea className="w-full min-h-[120px] rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="세부 설명을 입력하세요" />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">저장</Button>
                  <Button variant="outline" tone="neutral" type="reset">초기화</Button>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-muted)]">유효성/상태 예시</p>
                <Input label="정상" placeholder="OK" />
                <Input label="경고" className="border-amber-500 focus:ring-amber-500" placeholder="Check this value" />
                <Input label="오류" className="border-red-500 focus:ring-red-500" placeholder="Invalid value" />
                <Progress value={62} />
              </div>
            </div>
          </Section>

          {/* 피드백 */}
          <Section id="feedback" title="피드백 (Alert/Toast/etc)">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm">작업이 성공적으로 완료되었습니다.</div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">주의: 일부 값이 한계에 근접합니다.</div>
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">오류: 연결이 끊어졌습니다.</div>
              </div>
              <div className="space-y-3">
                <Tabs
                  tabs={[
                    { id: "t1", label: "로그", content: <pre className="whitespace-pre-wrap text-xs">[10:21:15] CONNECTED\n[10:22:02] SYNC START\n[10:22:07] SYNC DONE</pre> },
                    { id: "t2", label: "상태", content: <div className="text-sm">장비 4대 정상, 1대 경고</div> },
                    { id: "t3", label: "메모", content: <div className="text-sm">점검 필요 항목을 기록하세요.</div> },
                  ]}
                />
              </div>
            </div>
          </Section>

          {/* 네비게이션 */}
          <Section id="navigation" title="네비게이션">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">브레드크럼</p>
                <nav className="flex items-center gap-2 text-sm">
                  <a className="text-[var(--text-muted)] hover:text-[var(--foreground)]" href="#">홈</a>
                  <span>/</span>
                  <a className="text-[var(--text-muted)] hover:text-[var(--foreground)]" href="#">장비</a>
                  <span>/</span>
                  <span className="text-[var(--foreground)]">상세</span>
                </nav>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">탭 (상단에 구현됨)</p>
                <p className="text-sm">사이드바는 좌측 고정, 모바일에서는 상단바로 축약됩니다.</p>
              </div>
            </div>
          </Section>

          {/* 데이터 표시 */}
          <Section id="data" title="데이터 표시 (Cards/Table)">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">생산량</h3>
                  <Badge tone="success">+4.2%</Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--text-muted)]">최근 7일</p>
                <div className="mt-4 h-24 rounded-lg bg-[var(--border)]/40 flex items-end">
                  {/* placeholder mini bars */}
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "40%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "60%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "55%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "72%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "66%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "80%" }} />
                  <div className="flex-1 mx-1 bg-[var(--primary)] rounded-t" style={{ height: "70%" }} />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--border)]/40">
                    <tr className="text-left">
                      <th className="px-4 py-2">장비</th>
                      <th className="px-4 py-2">상태</th>
                      <th className="px-4 py-2">온도</th>
                      <th className="px-4 py-2">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Robot-A", state: "정상", temp: "38.2℃" },
                      { name: "Robot-B", state: "경고", temp: "61.0℃" },
                      { name: "Robot-C", state: "정상", temp: "35.8℃" },
                    ].map((r) => (
                      <tr key={r.name} className="border-t border-[var(--border)]">
                        <td className="px-4 py-2">{r.name}</td>
                        <td className="px-4 py-2">
                          {r.state === "정상" ? <Badge tone="success">정상</Badge> : <Badge tone="warning">경고</Badge>}
                        </td>
                        <td className="px-4 py-2">{r.temp}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" tone="neutral" title="상세 보기">보기</Button>
                            <Button variant="outline" tone="neutral">관리</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* 오버레이 */}
          <Section id="overlays" title="오버레이 (Modal/Toast/Tooltip)">
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setModal(true)}>모달 열기</Button>
              <Button onClick={() => { setToast(true); setTimeout(() => setToast(false), 1200); }}>토스트 띄우기</Button>
              <span className="text-sm" title="툴팁 예시 (title 속성)">툴팁은 title 로 간단히</span>
            </div>
          </Section>

          <footer className="mt-16 text-xs text-[var(--text-muted)]">
            <hr className="border-[var(--border)]" />
            <p className="mt-4">© {new Date().getFullYear()} WxNovic • Single-file DesignGuide. 필요에 따라 컴포넌트를 폴더로 분리하세요.</p>
          </footer>
        </main>
      </div>

      {/* Floaters */}
      <Toast show={toast} message="복사/알림 완료" />
      <Modal open={modal} onClose={() => setModal(false)} title="모달 제목">
        이곳에 컨텐츠를 배치하세요. 폼, 경고, 확인 버튼 등.
      </Modal>
    </div>
  );
}
 
