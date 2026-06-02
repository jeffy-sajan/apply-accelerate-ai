import { Link, createFileRoute } from "@tanstack/react-router";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in · CareerPilot AI" }],
  }),
  component: LoginPage,
});

const bullets = [
  "Land 3× more interviews with ATS-optimized resumes",
  "Match any JD in seconds — see what's missing",
  "Track every application from saved to offer",
];

function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[oklch(0.32_0.18_269)] via-[oklch(0.36_0.2_280)] to-[oklch(0.42_0.2_295)] p-12 text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold">CareerPilot AI</span>
        </div>

        <div className="relative">
          <div className="mb-8 max-w-md">
            <h2 className="text-3xl font-semibold leading-tight">
              Your AI co-pilot for landing the next role.
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Resume scoring, JD matching, and a job tracker — all in one calm workspace built for serious job seekers.
            </p>
          </div>

          {/* Illustration card */}
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-elevated">
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/60">Resume · senior-pm.pdf</div>
              <div className="rounded-full bg-[oklch(0.7_0.16_152)]/20 px-2 py-0.5 text-[10px] font-medium text-[oklch(0.85_0.16_152)]">ATS 92</div>
            </div>
            <div className="mt-4 space-y-2.5">
              {[78, 54, 88, 42].map((w, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] text-white/50">
                    <span>{["Keywords", "Formatting", "Skills", "Experience"][i]}</span>
                    <span>{w}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_200)] to-[oklch(0.78_0.16_152)]" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-8 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[oklch(0.8_0.16_152)]" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-white/50">© 2026 CareerPilot Labs · SOC 2 Type II</div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-semibold">CareerPilot AI</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your workspace.</p>

          <form className="mt-8 space-y-4">
            <Field label="Work email" type="email" placeholder="you@company.com" />
            <Field label="Password" type="password" placeholder="••••••••" rightLabel={<Link to="/login" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>} />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border accent-[var(--color-primary)]" />
              Remember me for 30 days
            </label>

            <Link to="/dashboard" className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-card transition hover:opacity-95">
              Sign in
            </Link>

            <div className="relative py-2 text-center">
              <div className="absolute inset-0 top-1/2 h-px bg-border" />
              <span className="relative bg-background px-2 text-xs text-muted-foreground">or</span>
            </div>

            <button type="button" className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-input bg-surface text-sm font-medium text-foreground hover:bg-muted">
              <GoogleIcon /> Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder, rightLabel }: { label: string; type: string; placeholder?: string; rightLabel?: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {rightLabel}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-input bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.96h5.52c-.24 1.32-1.68 3.84-5.52 3.84-3.36 0-6.12-2.76-6.12-6.12S8.64 5.76 12 5.76c1.92 0 3.24.84 3.96 1.56l2.7-2.64C16.92 3.12 14.64 2.16 12 2.16 6.6 2.16 2.16 6.6 2.16 12s4.44 9.84 9.84 9.84c5.64 0 9.36-3.96 9.36-9.6 0-.6-.06-1.08-.18-1.56H12z"/>
    </svg>
  );
}
