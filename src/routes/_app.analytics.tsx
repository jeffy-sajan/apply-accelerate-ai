import { createFileRoute } from "@tanstack/react-router";
import { Send, MessagesSquare, CalendarCheck, Trophy, Download } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, StatCard, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics · CareerPilot AI" }] }),
  component: Analytics,
});

const weekly = Array.from({ length: 12 }, (_, i) => ({
  w: `W${i + 1}`,
  applications: Math.round(6 + Math.sin(i / 1.6) * 4 + i * 0.9),
  responses: Math.round(2 + Math.sin(i / 2) * 1.5 + i * 0.35),
}));

const funnel = [
  { stage: "Applied", v: 108 },
  { stage: "Response", v: 41 },
  { stage: "Screen", v: 27 },
  { stage: "Onsite", v: 12 },
  { stage: "Offer", v: 4 },
];

const conv = Array.from({ length: 8 }, (_, i) => ({ m: `M${i + 1}`, rate: 28 + Math.round(Math.sin(i) * 6 + i * 1.5) }));

function Analytics() {
  return (
    <>
      <Topbar title="Analytics" subtitle="How your search is performing over the last 90 days." actions={
        <>
          <Button variant="outline">Last 90 days</Button>
          <Button variant="primary"><Download className="h-4 w-4" /> Export</Button>
        </>
      } />

      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Applications" value="108" delta="+12 vs. prev" icon={<Send className="h-4 w-4" />} />
          <StatCard label="Response Rate" value="38%" delta="+4.2%" icon={<MessagesSquare className="h-4 w-4" />} />
          <StatCard label="Interview Rate" value="16.7%" delta="+1.8%" icon={<CalendarCheck className="h-4 w-4" />} />
          <StatCard label="Offer Rate" value="3.7%" delta="+0.9%" icon={<Trophy className="h-4 w-4" />} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Applications & Responses Over Time" subtitle="Weekly trend"
              action={<div className="flex items-center gap-3 text-xs text-muted-foreground"><Legend color="oklch(0.55 0.2 269)" label="Applications" /><Legend color="oklch(0.62 0.19 295)" label="Responses" /></div>} />
            <div className="h-72 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.2 269)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="oklch(0.55 0.2 269)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.19 295)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="oklch(0.62 0.19 295)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.92 0.01 255)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="w" tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="applications" stroke="oklch(0.55 0.2 269)" strokeWidth={2} fill="url(#a1)" />
                  <Area type="monotone" dataKey="responses" stroke="oklch(0.62 0.19 295)" strokeWidth={2} fill="url(#a2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardHeader title="Funnel" subtitle="Conversion through stages" />
            <div className="space-y-3 p-5">
              {funnel.map((f, i) => {
                const pct = (f.v / funnel[0].v) * 100;
                return (
                  <div key={f.stage}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{f.stage}</span>
                      <span className="tabular-nums text-muted-foreground">{f.v} · {pct.toFixed(0)}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `oklch(${0.55 + i * 0.03} 0.2 ${269 + i * 6})` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Interview Conversion Rate" subtitle="Applications → interview" />
            <div className="h-64 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conv} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="oklch(0.92 0.01 255)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="rate" stroke="oklch(0.55 0.2 269)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardHeader title="By Source" subtitle="Where your applications go in" />
            <div className="h-64 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { s: "LinkedIn", v: 48 }, { s: "Referral", v: 22 }, { s: "Careers", v: 18 }, { s: "Wellfound", v: 12 }, { s: "Twitter", v: 8 },
                ]} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="oklch(0.92 0.01 255)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="s" tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.025 260)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
                  <Bar dataKey="v" fill="oklch(0.55 0.2 269)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="AI Career Insights" subtitle="Generated from your last 30 days"
            action={<Pill tone="purple">Weekly digest</Pill>} />
          <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-3">
            {[
              "Tuesday morning applications get a 2.1× higher response rate for you.",
              "Roles tagged 'Growth' convert at 22% vs. 11% for 'Platform'.",
              "Referrals account for 20% of apps but 55% of interviews — double down.",
            ].map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface-muted p-4">
                <Pill tone="primary">Insight {i + 1}</Pill>
                <p className="mt-3 text-sm text-foreground">{t}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: color }} />{label}</span>;
}
