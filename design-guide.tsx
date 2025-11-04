"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Next.js App Router page example
 * Drop this file at: /app/design-guide/page.tsx
 * Requires your global.css tokens already defined on :root / .dark
 * Tailwind is used with arbitrary values (var(--token))
 */

export default function DesignGuidePage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header dark={dark} onToggle={() => setDark((v) => !v)} />
      <div className="mx-auto max-w-6xl p-6 md:p-10 space-y-12">
        <Intro />
        <Section title="Colors">
          <ColorsPanel />
        </Section>
        <Section title="Typography">
          <TypographyPanel />
        </Section>
        <Section title="Buttons">
          <ButtonsPanel />
        </Section>
        <Section title="Inputs & Forms">
          <InputsPanel />
        </Section>
        <Section title="Cards">
          <CardsPanel />
        </Section>
        <Section title="Alerts / Banners">
          <AlertsPanel />
        </Section>
        <Section title="Badges / Chips">
          <BadgesPanel />
        </Section>
        <Section title="Tabs">
          <TabsPanel />
        </Section>
        <Section title="Table">
          <TablePanel />
        </Section>
        <Section title="Progress & Meter">
          <ProgressPanel />
        </Section>
        <Section title="Modal & Toast & Tooltip">
          <OverlaysPanel />
        </Section>
        <FooterNote />
      </div>
    </main>
  );
}

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <div className="sticky top-0 z-10 border-b border-[var(--border)]/80 bg-[var(--surface)]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--text-strong)]">Design Guide</h1>
        <div className="flex items-center gap-3">
          <ThemeSwatch />
          <button
            onClick={onToggle}
            className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition shadow-sm"
          >
            {dark ? "라이트" : "다크"} 모드
          </button>
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <p className="text-sm text-[var(--text-subtle)]">Next.js + Tailwind + 글로벌 토큰 기반 디자인 가이드. 아래 컴포넌트들은 모두 <code>var(--token)</code>을 사용합니다.</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)]">{title}</h2>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">{children}</div>
    </section>
  );
}

/* -------------------------------- Colors -------------------------------- */
const COLOR_KEYS = [
  "background",
  "surface",
  "surface-alt",
  "surface-hover",
  "foreground",
  "border",
  "divider",
  "primary",
  "secondary",
  "accent",
  "text-strong",
  "text-subtle",
  "text-muted",
  "success",
  "warning",
  "error",
  "info",
  "focus-ring",
  "disabled",
  "highlight",
] as const;

type TokenKey = (typeof COLOR_KEYS)[number];

function ColorsPanel() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {COLOR_KEYS.map((k) => (
        <ColorSwatch key={k} token={k} />
      ))}
    </div>
  );
}

function ColorSwatch({ token }: { token: TokenKey }) {
  const bg = `bg-[var(--${token})]`;
  const border = token === "background" ? "border-[var(--divider)]" : "border-[var(--border)]";
  return (
    <div className={`rounded-xl overflow-hidden border ${border} shadow-sm`}>      
      <div className={`h-16 ${bg}`} />
      <div className="p-3 text-sm">
        <div className="font-medium text-[var(--text-strong)]">--{token}</div>
        <div className="text-xs text-[var(--text-subtle)]">var(--{token})</div>
      </div>
    </div>
  );
}

/* ------------------------------ Typography ------------------------------ */
function TypographyPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-strong)]">H1 제목 - 3xl / bold</h1>
        <p className="text-[var(--text-subtle)]">페이지 최상단 제목에 사용</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-strong)]">H2 제목 - 2xl / semibold</h2>
        <p className="text-[var(--text-subtle)]">섹션 타이틀에 사용</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[var(--text-strong)]">H3 제목 - xl / semibold</h3>
        <p className="text-[var(--text-subtle)]">카드/모듈 타이틀에 사용</p>
      </div>
      <p className="text-base leading-7">
        본문 예시입니다. 토큰 <code>--text-subtle</code>과 <code>--text-muted</code>를 혼용해 정보 위계를 표현할 수 있습니다. <span className="text-[var(--text-muted)]">이 문장은 muted 톤입니다.</span>
      </p>
      <a href="#" className="underline decoration-[var(--accent)] underline-offset-4">링크 예시</a>
      <div className="flex items-center gap-2 text-sm">
        <Tag label="NEW" tone="accent" />
        <Tag label="Beta" tone="secondary" />
      </div>
    </div>
  );
}

function Tag({ label, tone = "accent" as "accent" | "secondary" | "primary" }) {
  const bg = {
    accent: "bg-[var(--accent)]",
    secondary: "bg-[var(--secondary)]",
    primary: "bg-[var(--primary)]",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs text-[var(--surface)] ${bg}`}>{label}</span>
  );
}

/* -------------------------------- Buttons ------------------------------- */
function ButtonsPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h4 className="font-semibold text-[var(--text-strong)]">Solid</h4>
        <div className="flex flex-wrap gap-3">
          <Btn>기본</Btn>
          <Btn tone="secondary">세컨더리</Btn>
          <Btn tone="accent">액센트</Btn>
          <Btn tone="success">성공</Btn>
          <Btn tone="warning">경고</Btn>
          <Btn tone="error">에러</Btn>
          <Btn tone="info">정보</Btn>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-[var(--text-strong)]">Outline</h4>
        <div className="flex flex-wrap gap-3">
          <Btn variant="outline">기본</Btn>
          <Btn variant="outline" tone="secondary">세컨더리</Btn>
          <Btn variant="outline" tone="accent">액센트</Btn>
          <Btn variant="outline" tone="success">성공</Btn>
          <Btn variant="outline" tone="warning">경고</Btn>
          <Btn variant="outline" tone="error">에러</Btn>
          <Btn variant="outline" tone="info">정보</Btn>
        </div>
      </div>
      <div className="space-y-3 md:col-span-2">
        <h4 className="font-semibold text-[var(--text-strong)]">Sizes</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Btn size="sm">작게</Btn>
          <Btn size="md">보통</Btn>
          <Btn size="lg">크게</Btn>
        </div>
      </div>
    </div>
  );
}

function Btn({
  children,
  variant = "solid" as "solid" | "outline" | "ghost",
  tone = "primary" as "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info",
  size = "md" as "sm" | "md" | "lg",
}: React.PropsWithChildren<{ variant?: "solid" | "outline" | "ghost"; tone?: any; size?: "sm" | "md" | "lg" }>) {
  const toneMap: Record<string, string> = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--error)",
    info: "var(--info)",
  };

  const pxpy = size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";

  if (variant === "outline") {
    return (
      <button
        className={`rounded-xl border shadow-sm ${pxpy} hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2`}
        style={{ borderColor: `var(--border)`, color: toneMap[tone], boxShadow: "0 1px 0 rgba(0,0,0,.02)" }}
      >
        {children}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        className={`rounded-xl ${pxpy} hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2`}
        style={{ color: toneMap[tone] }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`rounded-xl text-[var(--surface)] shadow-sm ${pxpy} focus:outline-none focus:ring-2`}
      style={{ background: toneMap[tone], boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}
    >
      {children}
    </button>
  );
}

/* ------------------------------ Inputs & Forms ------------------------------ */
function InputsPanel() {
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(true);
  const [radio, setRadio] = useState("a");

  return (
    <form className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="you@example.com" value={value} onChange={(e) => setValue(e.target.value)} />
        <Helper>우측 예시는 포커스/에러/성공 상태를 보여줍니다.</Helper>
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="••••••••" state="error" />
        <ErrorText>비밀번호가 너무 짧습니다.</ErrorText>
      </div>

      <div className="space-y-2">
        <Label>검색</Label>
        <Input placeholder="검색어 입력" state="success" />
      </div>

      <div className="space-y-2">
        <Label>셀렉트</Label>
        <Select>
          <option>옵션 A</option>
          <option>옵션 B</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>체크박스</Label>
        <div className="flex items-center gap-3">
          <Checkbox checked={check} onChange={() => setCheck((v) => !v)} label="동의" />
          <Checkbox checked={!check} onChange={() => setCheck((v) => !v)} label="비동의" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>라디오</Label>
        <div className="flex items-center gap-3">
          <Radio name="r" value="a" current={radio} onChange={setRadio} label="A" />
          <Radio name="r" value="b" current={radio} onChange={setRadio} label="B" />
        </div>
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label>텍스트에어리어</Label>
        <Textarea rows={4} placeholder="메모를 입력하세요" />
      </div>
    </form>
  );
}

function Label({ children }: React.PropsWithChildren) {
  return <label className="block text-sm font-medium text-[var(--text-strong)]">{children}</label>;
}
function Helper({ children }: React.PropsWithChildren) {
  return <p className="text-xs text-[var(--text-subtle)]">{children}</p>;
}
function ErrorText({ children }: React.PropsWithChildren) {
  return <p className="text-xs text-[var(--error)]">{children}</p>;
}

function Input({ state, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { state?: "default" | "error" | "success" }) {
  const ring = state === "error" ? "ring-[var(--error)]" : state === "success" ? "ring-[var(--success)]" : "ring-[var(--focus-ring)]";
  return (
    <input
      className={`w-full rounded-xl border bg-[var(--surface)] border-[var(--border)] px-3 py-2 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 ${ring} ${className || ""}`}
      {...props}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full rounded-xl border bg-[var(--surface)] border-[var(--border)] px-3 py-2 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
      {...props}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full rounded-xl border bg-[var(--surface)] border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
      {...props}
    />
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--focus-ring)]" />
      <span>{label}</span>
    </label>
  );
}

function Radio({ name, value, current, onChange, label }: { name: string; value: string; current: string; onChange: (v: string) => void; label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="radio" name={name} checked={current === value} onChange={() => onChange(value)} className="h-4 w-4 border-[var(--border)] text-[var(--primary)] focus:ring-[var(--focus-ring)]" />
      <span>{label}</span>
    </label>
  );
}

/* ---------------------------------- Cards --------------------------------- */
function CardsPanel() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card title="기본 카드">
        간단한 본문 텍스트. <a className="underline" href="#">자세히</a>
      </Card>
      <Card title="성공 상태" tone="success">처리가 완료되었습니다.</Card>
      <Card title="경고 상태" tone="warning">주의가 필요합니다.</Card>
    </div>
  );
}

function Card({ title, tone, children }: React.PropsWithChildren<{ title: string; tone?: "success" | "warning" | "error" | "info" }>) {
  const toneMap: Record<string, string> = {
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--error)",
    info: "var(--info)",
  };
  const border = tone ? toneMap[tone] : "var(--border)";
  return (
    <div className="rounded-2xl border bg-[var(--surface)] p-5 shadow-sm" style={{ borderColor: border }}>
      <div className="mb-2 flex items-center gap-2">
        {tone && <span className="inline-block h-2 w-2 rounded-full" style={{ background: border }} />}
        <h4 className="font-semibold text-[var(--text-strong)]">{title}</h4>
      </div>
      <div className="text-sm text-[var(--text-subtle)]">{children}</div>
    </div>
  );
}

/* ------------------------------- Alerts/Banner ------------------------------ */
function AlertsPanel() {
  return (
    <div className="space-y-3">
      <Alert tone="success" title="성공" desc="요청이 성공적으로 처리되었습니다." />
      <Alert tone="info" title="정보" desc="시스템 점검이 내일 02:00에 예정되어 있습니다." />
      <Alert tone="warning" title="경고" desc="사용량이 임계치에 근접했습니다." />
      <Alert tone="error" title="오류" desc="네트워크 연결에 실패했습니다." />
    </div>
  );
}

function Alert({ tone, title, desc }: { tone: "success" | "info" | "warning" | "error"; title: string; desc: string }) {
  const toneMap: Record<string, string> = {
    success: "var(--success)",
    info: "var(--info)",
    warning: "var(--warning)",
    error: "var(--error)",
  };
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-[var(--surface)] p-4" style={{ borderColor: toneMap[tone] }}>
      <div className="mt-1 h-2 w-2 rounded-full" style={{ background: toneMap[tone] }} />
      <div>
        <div className="font-medium text-[var(--text-strong)]">{title}</div>
        <div className="text-sm text-[var(--text-subtle)]">{desc}</div>
      </div>
    </div>
  );
}

/* ------------------------------- Badges/Chips ------------------------------- */
function BadgesPanel() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge>Default</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="secondary">Secondary</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="error">Error</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="outline">Outline</Badge>
    </div>
  );
}

function Badge({ children, tone = "default" as "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info" | "outline" }) {
  const bg: Record<string, string> = {
    default: "var(--surface-alt)",
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--error)",
    info: "var(--info)",
    outline: "transparent",
  };
  const color = tone === "outline" ? "var(--text-strong)" : "var(--surface)";
  const style = tone === "outline" ? { borderColor: "var(--divider)", color } : { background: bg[tone], color };
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs" style={style}>
      {children}
    </span>
  );
}

/* ----------------------------------- Tabs ---------------------------------- */
function TabsPanel() {
  const [tab, setTab] = useState("one");
  return (
    <div>
      <div className="flex gap-2 border-b border-[var(--divider)]">
        {[
          { id: "one", label: "탭 1" },
          { id: "two", label: "탭 2" },
          { id: "three", label: "탭 3" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px rounded-t-lg px-4 py-2 text-sm ${tab === t.id ? "border-b-2" : "border-b"} border-[var(--primary)]`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm text-[var(--text-subtle)]">
        {tab === "one" && <p>첫 번째 탭 내용</p>}
        {tab === "two" && <p>두 번째 탭 내용</p>}
        {tab === "three" && <p>세 번째 탭 내용</p>}
      </div>
    </div>
  );
}

/* ---------------------------------- Table ---------------------------------- */
function TablePanel() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--surface-alt)] text-[var(--text-strong)]">
          <tr className="text-left">
            <th className="px-4 py-2">이름</th>
            <th className="px-4 py-2">역할</th>
            <th className="px-4 py-2">상태</th>
            <th className="px-4 py-2">액션</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "홍길동", role: "Admin", status: "활성" },
            { name: "김영희", role: "Editor", status: "대기" },
            { name: "이철수", role: "Viewer", status: "비활성" },
          ].map((r, i) => (
            <tr key={i} className="border-t border-[var(--divider)]">
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2 text-[var(--text-subtle)]">{r.role}</td>
              <td className="px-4 py-2">
                <Badge tone={r.status === "활성" ? "success" : r.status === "대기" ? "warning" : "outline"}>{r.status}</Badge>
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <Btn size="sm">보기</Btn>
                  <Btn size="sm" variant="outline">편집</Btn>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------- Progress & Meter ----------------------------- */
function ProgressPanel() {
  const [val, setVal] = useState(45);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="range" min={0} max={100} value={val} onChange={(e) => setVal(parseInt(e.target.value))} />
        <span className="text-sm text-[var(--text-subtle)]">{val}%</span>
      </div>
      <Progress value={val} />
      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="CPU" value="36%" />
        <Stat label="RAM" value="6.1 GB" />
        <Stat label="Disk" value="71%" />
      </div>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: "var(--primary)" }} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
      <div className="text-[var(--text-subtle)]">{label}</div>
      <div className="text-lg font-semibold text-[var(--text-strong)]">{value}</div>
    </div>
  );
}

/* --------------------------- Modal / Toast / Tip --------------------------- */
function OverlaysPanel() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ModalDemo />
      <ToastDemo />
      <TooltipDemo />
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-[var(--text-strong)]">Modal</h4>
      <Btn onClick={() => setOpen(true)}>열기</Btn>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
            <h5 className="mb-2 text-lg font-semibold text-[var(--text-strong)]">모달 제목</h5>
            <p className="mb-4 text-sm text-[var(--text-subtle)]">모달 내용입니다. 이 영역은 스크롤 가능합니다.</p>
            <div className="flex justify-end gap-2">
              <Btn variant="outline" onClick={() => setOpen(false)}>취소</Btn>
              <Btn onClick={() => setOpen(false)}>확인</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; text: string; tone: "success" | "info" | "warning" | "error" }[]>([]);
  const push = (tone: "success" | "info" | "warning" | "error") =>
    setToasts((arr) => [{ id: Date.now(), text: `${tone} 메시지!`, tone }, ...arr].slice(0, 5));

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-[var(--text-strong)]">Toast</h4>
      <div className="flex flex-wrap gap-2">
        <Btn size="sm" onClick={() => push("success")} tone="success">Success</Btn>
        <Btn size="sm" onClick={() => push("info")} tone="info">Info</Btn>
        <Btn size="sm" onClick={() => push("warning")} tone="warning">Warning</Btn>
        <Btn size="sm" onClick={() => push("error")} tone="error">Error</Btn>
      </div>
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto min-w-[220px] rounded-xl border bg-[var(--surface)] p-3 shadow-lg" style={{ borderColor: `var(--${t.tone})` }}>
            <div className="text-sm text-[var(--text-strong)]">{t.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-[var(--text-strong)]">Tooltip</h4>
      <Tooltip label="설명 텍스트">
        <Btn variant="outline">호버/포커스</Btn>
      </Tooltip>
    </div>
  );
}

function Tooltip({ label, children }: React.PropsWithChildren<{ label: string }>) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--text-subtle)] shadow-md">
          {label}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Footer --------------------------------- */
function FooterNote() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-subtle)]">
      Tailwind 임의값(예: <code>bg-[var(--primary)]</code>)으로 모든 컴포넌트를 토큰에 결합했습니다. 
      실제 프로젝트에서는 이 파일을 시작점으로 분리/리팩토링해 사용하세요.
    </div>
  );
}

function ThemeSwatch() {
  const sample = useMemo(
    () => [
      "background",
      "surface",
      "surface-alt",
      "surface-hover",
      "primary",
      "secondary",
      "accent",
      "success",
      "warning",
      "error",
      "info",
    ],
    []
  );
  return (
    <div className="hidden sm:flex items-center gap-1">
      {sample.map((k) => (
        <span key={k} className={`h-5 w-5 rounded-full border border-[var(--border)] bg-[var(--${k})]`} title={k} />
      ))}
    </div>
  );
}
