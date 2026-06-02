import { createFileRoute } from "@tanstack/react-router";
import { FileText, Building2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/jd-matcher")({
  head: () => ({ meta: [{ title: "JD Matcher · CareerPilot AI" }] }),
  component: JDMatcher,
});

const missingSkills = ["GraphQL", "Experimentation platforms", "Pricing strategy"];
const missingKeywords = ["growth loops", "north-star metric", "monetization", "PLG", "ICP"];

const jdText = `We're looking for a Senior Product Manager to lead our Growth team at Stripe. You'll own activation, conversion, and monetization across our core checkout surface.

Responsibilities
• Define and drive the north-star metric for activation
• Lead experimentation across pricing & packaging
• Partner with engineering on PLG growth loops
• Translate ICP insights into roadmap bets

Requirements
• 6+ years of PM experience, ideally in fintech or B2B SaaS
• Strong analytical chops (SQL, A/B testing)
• Experience with GraphQL APIs and experimentation platforms`;

function JDMatcher() {
  return (
    <>
      <Topbar title="JD Matcher" subtitle="Compare your resume against any role in seconds." actions={
        <Button variant="primary"><Sparkles className="h-4 w-4" /> Run match</Button>
      } />

      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Resume summary */}
          <Card>
            <CardHeader title="Your Resume" subtitle="senior-pm-v4.pdf · last updated 2 hr ago"
              action={<Button variant="outline">Change</Button>} />
            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted p-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-destructive-soft text-destructive"><FileText className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">Ananya Mehta · Senior Product Manager</div>
                  <div className="text-xs text-muted-foreground">8 yrs · Razorpay, Swiggy, Flipkart</div>
                </div>
                <Pill tone="success">ATS 87</Pill>
              </div>

              <Block title="Top Skills">
                <div className="flex flex-wrap gap-1.5">
                  {["Product Strategy", "SQL", "A/B Testing", "Roadmapping", "Mixpanel", "OKRs", "Stakeholder Mgmt"].map((s) => (
                    <Pill key={s} tone="primary">{s}</Pill>
                  ))}
                </div>
              </Block>

              <Block title="Recent Impact">
                <ul className="space-y-1.5 text-sm text-foreground">
                  <li>• Drove +24% checkout conversion (+$3.1M ARR)</li>
                  <li>• Launched subscription billing for 12K merchants</li>
                  <li>• Shipped pricing experiment framework</li>
                </ul>
              </Block>
            </div>
          </Card>

          {/* JD input */}
          <Card>
            <CardHeader title="Job Description"
              subtitle="Paste a JD or drop a URL"
              action={<Pill tone="purple"><Building2 className="mr-1 h-3 w-3" /> Stripe · Senior PM, Growth</Pill>}
            />
            <div className="p-5">
              <textarea
                defaultValue={jdText}
                className="h-72 w-full resize-none rounded-lg border border-input bg-surface p-4 font-mono text-[12.5px] leading-6 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>1,284 characters · ~190 words</span>
                <Button variant="primary"><Sparkles className="h-4 w-4" /> Analyze match</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader title="Match Score" subtitle="Resume vs. job description" />
            <div className="flex flex-col items-center p-6">
              <BigRing value={78} />
              <Pill tone="success" className="mt-1"><CheckCircle2 className="mr-1 h-3 w-3" /> Strong fit</Pill>
              <div className="mt-5 grid w-full grid-cols-2 gap-3 text-center">
                <Mini label="Skills" v="84%" />
                <Mini label="Experience" v="91%" />
                <Mini label="Keywords" v="62%" />
                <Mini label="Seniority" v="100%" />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Missing Skills" subtitle="Add or learn to close the gap"
              action={<Pill tone="warning">3</Pill>} />
            <ul className="divide-y divide-border">
              {missingSkills.map((s, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning-foreground" />
                    <span className="text-sm font-medium text-foreground">{s}</span>
                  </div>
                  <Button variant="ghost">Add</Button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Missing Keywords" subtitle="Mentioned in JD, not in resume"
              action={<Pill tone="destructive">5</Pill>} />
            <div className="flex flex-wrap gap-1.5 p-5">
              {missingKeywords.map((k) => (
                <span key={k} className="inline-flex items-center rounded-full border border-dashed border-destructive/40 bg-destructive-soft px-2.5 py-1 text-xs font-medium text-destructive">
                  {k}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Recs */}
        <Card>
          <CardHeader title="AI Recommendations"
            subtitle="Tailored edits to push your match above 90%"
            action={<Button variant="subtle"><Sparkles className="h-4 w-4" /> Generate tailored resume</Button>} />
          <ul className="divide-y divide-border">
            {[
              { t: "Add 'PLG growth loops' to your Razorpay bullet on activation", k: "Keyword boost" },
              { t: "Reframe Swiggy retention work as 'north-star metric' ownership", k: "Reframe" },
              { t: "Mention experimentation platform (Statsig/Optimizely) in Skills", k: "Skill gap" },
              { t: "Add GraphQL exposure to your API integration project", k: "Skill gap" },
            ].map((r, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-secondary-foreground"><Sparkles className="h-4 w-4" /></div>
                <p className="flex-1 text-sm text-foreground">{r.t}</p>
                <Pill tone="purple">{r.k}</Pill>
                <Button variant="ghost">Apply</Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}
function Mini({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-foreground">{v}</div>
    </div>
  );
}
function BigRing({ value }: { value: number }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(0.92 0.01 255)" strokeWidth="12" fill="none" />
        <defs>
          <linearGradient id="jdring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.2 269)" />
            <stop offset="100%" stopColor="oklch(0.62 0.19 295)" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} stroke="url(#jdring)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-semibold tracking-tight text-foreground">78%</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">match</div>
        </div>
      </div>
    </div>
  );
}
