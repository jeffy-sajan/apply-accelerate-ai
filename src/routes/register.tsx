import { Link, createFileRoute } from "@tanstack/react-router";
import { Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account · CareerPilot AI" }] }),
  component: RegisterPage,
});

const benefits = [
  "Unlimited resume scans + ATS scoring",
  "AI keyword & skill gap analysis",
  "Kanban job tracker with reminders",
  "Weekly career insights report",
];

function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[oklch(0.32_0.18_269)] via-[oklch(0.36_0.2_280)] to-[oklch(0.42_0.2_295)] p-12 text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15"><Sparkles className="h-5 w-5" /></div>
          <span className="text-base font-semibold">CareerPilot AI</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">Start your free 14-day trial.</h2>
          <p className="mt-3 text-sm text-white/70">No credit card required. Cancel anytime.</p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-white/15"><Check className="h-3 w-3" /></span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-sm italic text-white/85">
              "Went from 2 callbacks a month to 4 interviews a week. The JD matcher is unreasonably good."
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[oklch(0.78_0.16_60)] to-[oklch(0.7_0.18_200)]" />
              Priya R. · Senior PM, hired at Notion
            </div>
          </div>
        </div>

        <div className="text-xs text-white/50">© 2026 CareerPilot Labs</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get matched to roles in under 90 seconds.</p>

          <form className="mt-8 space-y-4">
            <Field label="Full name" placeholder="Ananya Mehta" />
            <Field label="Work email" type="email" placeholder="you@company.com" />
            <Field label="Password" type="password" placeholder="At least 8 characters" />
            <Field label="Confirm password" type="password" placeholder="Re-enter password" />

            <p className="text-xs text-muted-foreground">By creating an account you agree to our Terms and Privacy Policy.</p>

            <Link to="/dashboard" className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground shadow-card hover:opacity-95">
              Create account
            </Link>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-input bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
