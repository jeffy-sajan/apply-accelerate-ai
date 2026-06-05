import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · CareerPilot AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="h-screen overflow-hidden bg-background text-foreground grid lg:grid-cols-[1.05fr_1fr]">
      {/* Editorial left */}
      <aside className="relative hidden lg:flex flex-col justify-between border-r border-ink/15 p-8 xl:p-10">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 grid place-items-center bg-ink text-paper font-display text-sm">C</div>
            <span className="font-display text-base tracking-tight">CareerPilot</span>
          </Link>
          <span className="eyebrow">Issue №26 / Sign In</span>
        </header>

        <div className="min-h-0">
          <div className="eyebrow mb-3">The Career Quarterly</div>
          <h1 className="font-display text-5xl xl:text-6xl leading-[0.92] tracking-tight">
            Quiet tools.<br/>
            <span className="text-muted-foreground">Loud results.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            A focused workspace for job seekers who treat their search like the
            most important project of the year. Sign in and pick up where you left off.
          </p>

          <div className="mt-8 space-y-3">
            <div className="eyebrow">" style={{ letterSpacing: "0.1em" }}>What we do</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-1 bg-ink shrink-0" />
                ATS‑optimized resume formatting and scoring
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-1 bg-ink shrink-0" />
                Job description keyword and skill gap analysis
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-1 bg-ink shrink-0" />
                Application pipeline and interview tracking
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-1 bg-ink shrink-0" />
                AI‑powered career insights and progress reports
              </li>
            </ul>
          </div>
        </div>

        <footer className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <span>© 2026 CareerPilot Labs</span>
          <span>SOC 2 · Type II</span>
        </footer>
      </aside>

      {/* Form right */}
      <main className="flex items-center justify-center p-6 sm:p-10 overflow-hidden">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="h-7 w-7 grid place-items-center bg-ink text-paper font-display text-sm">C</div>
            <span className="font-display text-base tracking-tight">CareerPilot</span>
          </div>

          <div className="eyebrow mb-2">Section 01 — Access</div>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight">
            Welcome back.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            New to CareerPilot?{" "}
            <Link to="/register" className="text-foreground underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
              Create an account
            </Link>
          </p>

          <form className="mt-6 space-y-5">
            <Field label="Work email" type="email" placeholder="you@company.com" num="01" />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              num="02"
              right={<Link to="/login" className="eyebrow hover:text-foreground">Forgot?</Link>}
            />

            <label className="flex items-center gap-2.5 text-sm text-foreground select-none">
              <input type="checkbox" defaultChecked className="h-4 w-4 border border-ink accent-[var(--color-ink)] rounded-none" />
              Keep me signed in for 30 days
            </label>

            <Link
              to="/dashboard"
              className="group flex h-11 w-full items-center justify-between bg-ink px-5 text-paper font-display text-sm tracking-wide uppercase hover:bg-ink/90 transition"
            >
              Enter workspace
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-ink/15" />
              <span className="eyebrow">or</span>
              <div className="h-px flex-1 bg-ink/15" />
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 border border-ink/20 bg-paper px-5 text-sm font-medium hover:border-ink hover:bg-paper-2 transition"
            >
              <GoogleIcon /> Continue with Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({
  label, type, placeholder, num, right,
}: { label: string; type: string; placeholder?: string; num: string; right?: React.ReactNode }) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{num}</span>
          <span className="font-display text-sm tracking-tight">{label}</span>
        </label>
        {right}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full border-0 border-b border-ink/25 bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ink transition"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 10.2v3.96h5.52c-.24 1.32-1.68 3.84-5.52 3.84-3.36 0-6.12-2.76-6.12-6.12S8.64 5.76 12 5.76c1.92 0 3.24.84 3.96 1.56l2.7-2.64C16.92 3.12 14.64 2.16 12 2.16 6.6 2.16 2.16 6.6 2.16 12s4.44 9.84 9.84 9.84c5.64 0 9.36-3.96 9.36-9.6 0-.6-.06-1.08-.18-1.56H12z"/>
    </svg>
  );
}
