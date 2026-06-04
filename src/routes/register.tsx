import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account · CareerPilot AI" }] }),
  component: RegisterPage,
});

const benefits = [
  "Unlimited resume scans + ATS scoring",
  "AI keyword and skill-gap analysis",
  "Kanban tracker with interview reminders",
  "Weekly editorial career insights",
];

const press = ["FORBES", "TECHCRUNCH", "WIRED", "FAST CO."];

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-[1fr_1.05fr]">
      {/* Form left */}
      <main className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex items-center gap-2">
            <div className="h-7 w-7 grid place-items-center bg-ink text-paper font-display text-sm">C</div>
            <span className="font-display text-base tracking-tight">CareerPilot</span>
          </div>

          <div className="eyebrow mb-3">Section 02 — Enrollment</div>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight">
            Begin your<br/>next chapter.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Free for 14 days. No card required.{" "}
            <Link to="/login" className="text-foreground underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
              Already a member?
            </Link>
          </p>

          <form className="mt-10 space-y-6">
            <Field num="01" label="Full name" placeholder="Ananya Mehta" />
            <Field num="02" label="Work email" type="email" placeholder="you@company.com" />
            <div className="grid grid-cols-2 gap-6">
              <Field num="03" label="Password" type="password" placeholder="8+ characters" />
              <Field num="04" label="Confirm" type="password" placeholder="Repeat password" />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              By creating an account you agree to our{" "}
              <span className="underline underline-offset-2">Terms</span> and{" "}
              <span className="underline underline-offset-2">Privacy Policy</span>.
            </p>

            <Link
              to="/dashboard"
              className="group flex h-12 w-full items-center justify-between bg-ink px-5 text-paper font-display text-sm tracking-wide uppercase hover:bg-ink/90 transition"
            >
              Create account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-ink/15" />
              <span className="eyebrow">or</span>
              <div className="h-px flex-1 bg-ink/15" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 border border-ink/20 bg-paper px-5 text-sm font-medium hover:border-ink hover:bg-paper-2 transition"
            >
              <GoogleIcon /> Sign up with Google
            </button>
          </form>
        </div>
      </main>

      {/* Editorial right */}
      <aside className="relative hidden lg:flex flex-col justify-between border-l border-ink/15 p-12 order-1 lg:order-2">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 grid place-items-center bg-ink text-paper font-display text-sm">C</div>
            <span className="font-display text-base tracking-tight">CareerPilot</span>
          </Link>
          <span className="eyebrow">Issue №26 / Join</span>
        </header>

        <div>
          <div className="eyebrow mb-4">Featured Volume — Spring '26</div>
          <h1 className="font-display text-6xl xl:text-7xl leading-[0.92] tracking-tight">
            The search,<br/>
            <span className="text-muted-foreground">refined.</span>
          </h1>

          <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {benefits.map((b, i) => (
              <li key={b} className="flex items-center gap-5 py-4">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg tracking-tight flex-1">{b}</span>
                <Check className="h-4 w-4 text-foreground" />
              </li>
            ))}
          </ul>

          <figure className="mt-10 border-l-2 border-ink pl-5">
            <blockquote className="font-display text-2xl leading-tight tracking-tight">
              "Reads like a magazine, works like a CRM. Finally a tool that respects the job seeker."
            </blockquote>
            <figcaption className="eyebrow mt-3">Marcus L. — Staff Engineer, hired at Vercel</figcaption>
          </figure>
        </div>

        <footer className="space-y-4">
          <div className="eyebrow">As featured in</div>
          <div className="flex items-center gap-6 font-display text-sm tracking-widest text-muted-foreground">
            {press.map((p) => <span key={p}>{p}</span>)}
          </div>
        </footer>
      </aside>
    </div>
  );
}

function Field({
  num, label, type = "text", placeholder,
}: { num: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 flex items-baseline gap-3">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{num}</span>
        <span className="font-display text-sm tracking-tight">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full border-0 border-b border-ink/25 bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ink transition"
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
