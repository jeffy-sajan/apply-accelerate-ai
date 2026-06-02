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
  PieChart, Pie, Cell,
} from "recharts";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, StatCard, Pill, Button } from "@/components/ui-kit";

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

const status = [
  { name: "Applied", v: 64, color: "oklch(0.55 0.2 269)" },
  { name: "Interview", v: 18, color: "oklch(0.62 0.19 295)" },
  { name: "Offer", v: 4, color: "oklch(0.62 0.16 152)" },
  { name: "Rejected", v: 22, color: "oklch(0.74 0.04 260)" },
];

const activity = [
  { icon: FileText, tone: "primary", title: "Resume uploaded — senior-pm-v4.pdf", time: "2 min ago" },
  { icon: ShieldCheck, tone: "success", title: "ATS analysis complete · scored 87/100", time: "12 min ago" },
  { icon: Target, tone: "purple", title: "JD matched · Stripe · Product Manager (78% match)", time: "1 hr ago" },
  { icon: Send, tone: "neutral", title: "Application updated · Linear · moved to Interview", time: "3 hr ago" },
  { icon: Trophy, tone: "success", title: "Offer received · Vercel · DX Engineer", time: "Yesterday" },
];

function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Welcome back, Ananya — here's what's happening this week." actions={
        <Link to="/job-tracker"><Button variant="primary"><PlusCircle className="h-4 w-4" /> New application</Button></Link>
      } />

      <div className="space-y-6 p-6 lg:p-8">
        {/* KPI */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Applications" value="108" delta="+12 this week" icon={<Send className="h-4 w-4" />} />
          <StatCard label="Interviews" value="18" delta="+3 scheduled" icon={<CalendarCheck className="h-4 w-4" />} />
          <StatCard label="Offers" value="4" delta="+1 this month" icon={<Trophy className="h-4 w-4" />} />
          <StatCard label="ATS Score" value="87/100" delta="+6 vs. last scan" icon={<ShieldCheck className="h-4 w-4" />} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader
              title="Monthly Application Activity"
              subtitle="Applications submitted over the last 12 months"
              action={<Pill tone="success">+18% MoM</Pill>}
            />
            <div className="h-72 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.2 269)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.55 0.2 269)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.92 0.01 255)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.5 0.2 269)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardHeader title="Application Status" subtitle="Distribution across pipeline" />
            <div className="flex h-72 items-center gap-4 p-5">
              <div className="h-full w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={status} dataKey="v" innerRadius={48} outerRadius={70} paddingAngle={2} stroke="none">
                      {status.map((s, i) => <Cell key={i} fill={s.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex-1 space-y-2.5 text-sm">
                {status.map((s) => (
                  <li key={s.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} /> {s.name}
                    </span>
                    <span className="font-medium tabular-nums text-muted-foreground">{s.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Activity + Quick actions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Recent Activity" action={<button className="text-xs font-medium text-primary hover:underline">View all</button>} />
            <ul className="divide-y divide-border">
              {activity.map((a, i) => {
                const Icon = a.icon;
                const tones: Record<string, string> = {
                  primary: "bg-primary-soft text-primary",
                  success: "bg-success-soft text-success",
                  purple: "bg-secondary text-secondary-foreground",
                  neutral: "bg-muted text-muted-foreground",
                };
                return (
                  <li key={i} className="flex items-center gap-3 px-5 py-3.5">
                    <div className={`grid h-9 w-9 place-items-center rounded-md ${tones[a.tone]}`}><Icon className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Quick Actions" subtitle="Jump into a workflow" />
            <div className="space-y-2.5 p-5">
              <Link to="/resume-analyzer" className="flex items-center justify-between rounded-lg border border-border p-3.5 transition hover:border-primary/30 hover:bg-primary-soft/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-primary-soft text-primary"><Upload className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Upload Resume</div>
                    <div className="text-xs text-muted-foreground">PDF or DOCX, up to 10MB</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link to="/jd-matcher" className="flex items-center justify-between rounded-lg border border-border p-3.5 transition hover:border-primary/30 hover:bg-primary-soft/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-secondary-foreground"><Target className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Analyze JD</div>
                    <div className="text-xs text-muted-foreground">Paste a job description</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link to="/job-tracker" className="flex items-center justify-between rounded-lg border border-border p-3.5 transition hover:border-primary/30 hover:bg-primary-soft/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-success-soft text-success"><PlusCircle className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Add Application</div>
                    <div className="text-xs text-muted-foreground">Track a new opportunity</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <div className="mt-4 rounded-lg border border-dashed border-primary/30 bg-primary-soft/40 p-4">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> AI Insight
                </div>
                <p className="text-sm text-foreground">Roles tagged <b>Product</b> have a 32% higher response rate for your profile this month.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
