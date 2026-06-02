import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ChevronDown, FileText, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/ats-analysis")({
  head: () => ({ meta: [{ title: "ATS Analysis · CareerPilot AI" }] }),
  component: AtsPage,
});

const breakdown = [
  { label: "Formatting", v: 94, tone: "success" as const, note: "Single-column, ATS-safe fonts" },
  { label: "Keywords", v: 82, tone: "primary" as const, note: "Matches 41 of 50 target terms" },
  { label: "Experience", v: 79, tone: "warning" as const, note: "Add quantified outcomes" },
  { label: "Skills", v: 88, tone: "success" as const, note: "Aligned with PM benchmark" },
];

const recs = [
  { title: "Add a 3-line summary at the top", body: "Recruiters spend ~6s on first scan. Anchor it on growth, monetization, and 0→1 launches." },
  { title: "Quantify 4 missing bullets", body: "Bullets in your Swiggy role lack outcomes. Convert from task → impact with %/$/users." },
  { title: "Move Skills above Education", body: "For 6+ YoE roles, ATS templates expect Skills before Education." },
  { title: "Replace 'Responsible for' phrasing", body: "Found in 3 bullets. Lead with strong action verbs (Drove, Shipped, Led)." },
];

function AtsPage() {
  return (
    <>
      <Topbar title="ATS Analysis" subtitle="Detailed compatibility audit · senior-pm-v4.pdf" actions={
        <><Button variant="outline">Compare versions</Button><Button variant="primary">Apply all fixes</Button></>
      } />

      <div className="space-y-6 p-6 lg:p-8">
        {/* Hero */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative flex items-center gap-6 bg-gradient-to-br from-[oklch(0.97_0.03_269)] to-[oklch(0.96_0.04_295)] p-8 lg:col-span-1">
              <BigRing value={82} />
              <div>
                <Pill tone="success"><ShieldCheck className="mr-1 h-3 w-3" /> Strong</Pill>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">82<span className="text-base font-normal text-muted-foreground">/100</span></div>
                <div className="text-xs text-muted-foreground">Beats 71% of resumes in Product Management.</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 lg:col-span-2">
              {breakdown.map((b) => <BreakdownCard key={b.label} {...b} />)}
            </div>
          </div>
        </Card>

        {/* Strengths / weaknesses */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader title="Strengths" action={<Pill tone="success">9 found</Pill>} />
            <ul className="divide-y divide-border">
              {[
                "Clean single-column layout, parseable by Greenhouse/Lever/Workday",
                "Consistent date format and tense across roles",
                "Strong action verbs in 6 of 9 bullets",
                "Skills section includes 12 of 15 target keywords",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Weaknesses" action={<Pill tone="warning">5 found</Pill>} />
            <ul className="divide-y divide-border">
              {[
                "Missing professional summary — top section is education",
                "3 bullets lack quantified outcomes",
                "Resume length exceeds 2 pages (currently 2.4)",
                "Uses 2 graphical bullets that won't parse in older ATS",
                "Email address contains uncommon formatting",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" /> <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader
            title="Recommendations"
            subtitle="Apply individually or accept all"
            action={<Button variant="subtle"><Lightbulb className="h-4 w-4" /> AI auto-fix</Button>}
          />
          <ul className="divide-y divide-border">
            {recs.map((r, i) => (
              <li key={i}>
                <details className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-muted/40">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-md bg-primary-soft text-primary text-xs font-semibold">{i + 1}</div>
                      <span className="text-sm font-medium text-foreground">{r.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Pill tone="primary">High impact</Pill>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
                    </div>
                  </summary>
                  <div className="border-t border-border bg-surface-muted px-5 py-4">
                    <p className="text-sm text-foreground">{r.body}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="primary">Apply suggestion</Button>
                      <Button variant="ghost">Preview diff</Button>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Parsed by ATS engines" subtitle="How your resume looks to common applicant tracking systems" />
          <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
            {[
              { n: "Greenhouse", v: 84 }, { n: "Lever", v: 88 }, { n: "Workday", v: 76 }, { n: "Ashby", v: 91 },
            ].map((e) => (
              <div key={e.n} className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><FileText className="h-4 w-4 text-muted-foreground" /> {e.n}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-semibold">{e.v}</span><span className="text-xs text-muted-foreground">/100</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${e.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function BreakdownCard({ label, v, tone, note }: { label: string; v: number; tone: "success" | "primary" | "warning"; note: string }) {
  const colors = { success: "oklch(0.62 0.16 152)", primary: "oklch(0.55 0.2 269)", warning: "oklch(0.74 0.16 60)" };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <Pill tone={tone}>{v}%</Pill>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{v}<span className="text-sm font-normal text-muted-foreground">/100</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${v}%`, background: colors[tone] }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function BigRing({ value }: { value: number }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(0.92 0.01 255)" strokeWidth="12" fill="none" />
        <defs>
          <linearGradient id="bigring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.2 269)" />
            <stop offset="100%" stopColor="oklch(0.62 0.19 295)" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} stroke="url(#bigring)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
    </div>
  );
}
