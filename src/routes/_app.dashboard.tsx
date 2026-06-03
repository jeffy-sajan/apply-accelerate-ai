import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Send,
  CalendarCheck,
  Trophy,
  ShieldCheck,
  Upload,
  Target,
  PlusCircle,
  ArrowUpRight,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · CareerPilot AI" }] }),
  component: Dashboard,
});

const monthly = [
  { m: "Jan", v: 8 }, { m: "Feb", v: 12 }, { m: "Mar", v: 9 },
  { m: "Apr", v: 17 }, { m: "May", v: 22 }, { m: "Jun", v: 19 },
  { m: "Jul", v: 28 }, { m: "Aug", v: 34 }, { m: "Sep", v: 31 },
  { m: "Oct", v: 42 }, { m: "Nov", v: 38 }, { m: "Dec", v: 47 },
];

const funnel = [
  { s: "Applied", v: 108 },
  { s: "Screen", v: 41 },
  { s: "Interview", v: 18 },
  { s: "Onsite", v: 9 },
  { s: "Offer", v: 4 },
];

const activity = [
  { icon: FileText, title: "Resume uploaded — senior-pm-v4.pdf", time: "2 min ago", tag: "Resume" },
  { icon: ShieldCheck, title: "ATS analysis complete · scored 87/100", time: "12 min ago", tag: "ATS" },
  { icon: Target, title: "JD matched · Stripe · Product Manager (78% match)", time: "1 hr ago", tag: "Match" },
  { icon: Send, title: "Application updated · Linear · moved to Interview", time: "3 hr ago", tag: "Pipeline" },
  { icon: Trophy, title: "Offer received · Vercel · DX Engineer", time: "Yesterday", tag: "Offer" },
];

function Dashboard() {
  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Welcome back, Ananya — five interviews on the calendar this week."
        actions={
          <Link to="/job-tracker"><Button variant="primary"><PlusCircle className="h-4 w-4" /> New Application</Button></Link>
        }
      />

      <div className="p-8 lg:p-10 space-y-8 max-w-[1400px]">
        {/* Editorial intro */}
        <section className="grid grid-cols-12 gap-6 items-end border-b border-ink/15 pb-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="eyebrow mb-3">Vol. 26 · Week 23 · The Briefing</div>
            <h2 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground">
              Four offers,<br/>eighteen interviews,<br/>
              <span className="text-muted-foreground">one focused week ahead.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 border-l border-ink/15 pl-6">
            <div className="eyebrow mb-2">Editor's Note</div>
            <p className="text-sm leading-relaxed text-foreground">
              Your response rate climbed <b>+18%</b> month-over-month. Product roles
              continue to outperform — consider doubling down on Stripe-tier targets
              this cycle.
            </p>
          </div>
        </section>

        {/* Bento: KPIs */}
        <section className="grid grid-cols-12 gap-px bg-ink/15 border border-ink/15">
          <KpiCell label="Total Applications" value="108" delta="+12 this week" num="01" />
          <KpiCell label="Interviews" value="18" delta="+3 scheduled" num="02" />
          <KpiCell label="Offers" value="04" delta="+1 this month" num="03" />
          <KpiCell label="ATS Score" value="87" suffix="/100" delta="+6 vs last scan" num="04" />
        </section>

        {/* Bento row 2 */}
        <section className="grid grid-cols-12 gap-6">
          {/* Big chart */}
          <Card className="col-span-12 lg:col-span-8">
            <CardHeader
              eyebrow="Feature · 12-Month Trend"
              title="Monthly Application Activity"
              subtitle="Submissions volume, Jan → Dec"
              action={<Pill tone="primary">+18% MoM</Pill>}
            />
            <div className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ink-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.18 0.005 270)" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="oklch(0.18 0.005 270)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.82 0.012 85)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "oklch(0.45 0.008 270)", fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "oklch(0.18 0.005 270)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "oklch(0.45 0.008 270)", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 0, border: "1px solid oklch(0.18 0.005 270)", fontSize: 11, fontFamily: "JetBrains Mono", background: "oklch(0.98 0.006 85)" }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.18 0.005 270)" strokeWidth={1.5} fill="url(#ink-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pipeline funnel */}
          <Card className="col-span-12 lg:col-span-4">
            <CardHeader eyebrow="Index" title="Pipeline Funnel" subtitle="Applied → Offer" />
            <div className="p-5 space-y-3">
              {funnel.map((f, i) => {
                const pct = (f.v / funnel[0].v) * 100;
                return (
                  <div key={f.s}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">0{i+1}</span>
                        <span className="text-sm font-medium">{f.s}</span>
                      </div>
                      <span className="numeral text-xl">{String(f.v).padStart(2,"0")}</span>
                    </div>
                    <div className="h-1.5 bg-paper-2 relative">
                      <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 mt-2 border-t border-ink/15 flex items-center justify-between">
                <span className="eyebrow">Conversion · End-to-End</span>
                <span className="font-display text-lg">3.7%</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Bento row 3 */}
        <section className="grid grid-cols-12 gap-6">
          {/* Quick actions — vertical stack */}
          <Card className="col-span-12 lg:col-span-4">
            <CardHeader eyebrow="Tools" title="Quick Actions" />
            <div className="divide-y divide-ink/15">
              <ActionRow to="/resume-analyzer" icon={Upload} title="Upload Resume" hint="PDF · DOCX · 10MB" num="A" />
              <ActionRow to="/jd-matcher" icon={Target} title="Match a JD" hint="Paste a job description" num="B" />
              <ActionRow to="/job-tracker" icon={PlusCircle} title="Log Application" hint="Track a new opportunity" num="C" />
              <ActionRow to="/ats-analysis" icon={ShieldCheck} title="Run ATS Audit" hint="Score against ATS rules" num="D" />
            </div>
          </Card>

          {/* Activity log — editorial column */}
          <Card className="col-span-12 lg:col-span-5">
            <CardHeader
              eyebrow="Dispatch"
              title="Recent Activity"
              action={<button className="font-mono text-[10px] uppercase tracking-wider text-foreground hover:underline underline-offset-4">View all →</button>}
            />
            <ol className="divide-y divide-ink/15">
              {activity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li key={i} className="group flex items-start gap-4 px-5 py-4 hover:bg-paper-2/50 cursor-pointer">
                    <span className="font-mono text-[10px] text-muted-foreground pt-1">{String(i+1).padStart(2,"0")}</span>
                    <Icon className="h-4 w-4 mt-0.5 text-foreground" strokeWidth={1.5} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-foreground">{a.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="font-mono uppercase tracking-wider">{a.time}</span>
                        <span className="opacity-30">·</span>
                        <span className="font-mono uppercase tracking-wider">{a.tag}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" strokeWidth={1.5} />
                  </li>
                );
              })}
            </ol>
          </Card>

          {/* AI insight — featured editorial pull-quote */}
          <div className="col-span-12 lg:col-span-3 bg-ink text-paper p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">AI Insight · 06/03</div>
              <Sparkles className="h-3.5 w-3.5 text-warning" strokeWidth={1.5} />
            </div>
            <p className="mt-6 font-display text-2xl leading-tight tracking-tight">
              "Product roles return <span className="text-warning">3.2×</span> faster for your profile this month."
            </p>
            <div className="mt-auto pt-6 border-t border-paper/15">
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50 mb-2">Recommended</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span>Stripe — PM</span><span className="font-mono text-warning">92%</span></div>
                <div className="flex justify-between"><span>Linear — PM</span><span className="font-mono text-warning">88%</span></div>
                <div className="flex justify-between"><span>Notion — PM</span><span className="font-mono text-warning">81%</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom: response rate bar */}
        <section className="grid grid-cols-12 gap-6">
          <Card className="col-span-12 lg:col-span-7">
            <CardHeader eyebrow="Performance" title="Response Rate by Role Family" subtitle="Last 90 days" />
            <div className="h-56 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { k: "Product", v: 32 },
                  { k: "Design", v: 24 },
                  { k: "Eng", v: 18 },
                  { k: "DX", v: 27 },
                  { k: "Strategy", v: 14 },
                ]} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="oklch(0.82 0.012 85)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="k" tick={{ fontSize: 10, fill: "oklch(0.45 0.008 270)", fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "oklch(0.18 0.005 270)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "oklch(0.45 0.008 270)", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "oklch(0.93 0.01 85)" }} contentStyle={{ borderRadius: 0, border: "1px solid oklch(0.18 0.005 270)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <Bar dataKey="v" fill="oklch(0.18 0.005 270)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="col-span-12 lg:col-span-5 border border-ink/15 bg-paper-2/40 p-6">
            <div className="eyebrow mb-4">Calendar · Next 7 Days</div>
            <ul className="space-y-3">
              {[
                { d: "Tue 04", t: "Stripe — Loop 2 (PM)", time: "10:00" },
                { d: "Wed 05", t: "Linear — Hiring Manager", time: "14:30" },
                { d: "Fri 07", t: "Vercel — Offer call", time: "11:00" },
                { d: "Sat 08", t: "Notion — Take-home review", time: "—" },
              ].map((e) => (
                <li key={e.t} className="flex items-baseline justify-between border-b border-ink/10 pb-3 last:border-0">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{e.d}</div>
                    <div className="text-sm font-medium mt-0.5">{e.t}</div>
                  </div>
                  <span className="font-mono text-sm tabular-nums">{e.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="border-t-2 border-ink pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <span>CareerPilot · The AI Career Quarterly</span>
          <span>© 2026 · All rights reserved</span>
        </footer>
      </div>
    </>
  );
}

function KpiCell({ label, value, suffix, delta, num }: { label: string; value: string; suffix?: string; delta: string; num: string }) {
  return (
    <div className="col-span-12 sm:col-span-6 xl:col-span-3 bg-card p-6 min-h-[180px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="eyebrow">{label}</div>
        <span className="font-mono text-[10px] text-muted-foreground">№ {num}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="numeral text-6xl text-foreground">{value}</span>
          {suffix && <span className="font-mono text-sm text-muted-foreground">{suffix}</span>}
        </div>
        <div className="mt-3 pt-3 border-t border-ink/15 font-mono text-[10px] uppercase tracking-wider text-foreground">
          ▲ {delta}
        </div>
      </div>
    </div>
  );
}

function ActionRow({ to, icon: Icon, title, hint, num }: { to: string; icon: any; title: string; hint: string; num: string }) {
  return (
    <Link to={to} className="group flex items-center gap-4 px-5 py-4 hover:bg-ink hover:text-paper transition">
      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-paper/60">{num}</span>
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-[11px] text-muted-foreground group-hover:text-paper/60">{hint}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100" strokeWidth={1.5} />
    </Link>
  );
}
