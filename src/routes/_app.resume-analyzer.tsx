import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Lightbulb, Sparkles, Download, RefreshCw } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/resume-analyzer")({
  head: () => ({ meta: [{ title: "Resume Analyzer · CareerPilot AI" }] }),
  component: ResumeAnalyzer,
});

const skills = ["Product Strategy", "SQL", "A/B Testing", "Roadmapping", "Figma", "Mixpanel", "Stakeholder Mgmt", "Python", "OKRs", "User Research"];

function ResumeAnalyzer() {
  const score = 87;
  return (
    <>
      <Topbar title="Resume Analyzer" subtitle="Upload, score, and improve your resume in seconds." actions={
        <><Button variant="outline"><RefreshCw className="h-4 w-4" /> Re-scan</Button>
        <Button variant="primary"><Download className="h-4 w-4" /> Export report</Button></>
      } />

      <div className="space-y-6 p-6 lg:p-8">
        {/* Upload */}
        <Card>
          <div className="p-5">
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-strong bg-surface-muted px-6 py-12 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Drop your resume here, or browse</h3>
                <p className="mt-1 text-sm text-muted-foreground">Supports PDF and DOCX up to 10MB. We never share your data.</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="primary">Browse files</Button>
                <Button variant="outline">Paste text</Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-destructive-soft text-destructive"><FileText className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium text-foreground">senior-pm-v4.pdf</div>
                  <div className="text-xs text-muted-foreground">312 KB · uploaded 2 min ago</div>
                </div>
              </div>
              <Pill tone="success"><CheckCircle2 className="mr-1 h-3 w-3" /> Parsed</Pill>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Overview */}
          <Card className="lg:col-span-2">
            <CardHeader title="Resume Overview" subtitle="Extracted by AI from your latest upload" />
            <div className="grid grid-cols-1 divide-border md:grid-cols-2 md:divide-x">
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => <Pill key={s} tone="primary">{s}</Pill>)}
                </div>
              </Section>
              <Section title="Education">
                <Row title="MBA, Product Management" sub="Indian School of Business · 2019" />
                <Row title="B.Tech, Computer Science" sub="IIT Bombay · 2015" />
              </Section>
              <Section title="Experience">
                <Row title="Senior Product Manager" sub="Razorpay · 2022 — Present" />
                <Row title="Product Manager" sub="Swiggy · 2019 — 2022" />
                <Row title="Associate PM" sub="Flipkart · 2017 — 2019" />
              </Section>
              <Section title="Projects & Certs">
                <Row title="Checkout 2.0 launch" sub="+24% conversion · $3.1M ARR" />
                <Row title="Certified Scrum Product Owner" sub="Scrum Alliance · 2021" />
                <Row title="Reforge: Growth Series" sub="2023" />
              </Section>
            </div>
          </Card>

          {/* ATS score */}
          <Card>
            <CardHeader title="ATS Score" subtitle="Compatibility with major ATS systems" />
            <div className="flex flex-col items-center p-6">
              <ScoreRing value={score} />
              <Pill tone="success" className=""><Sparkles className="mr-1 h-3 w-3" /> Recruiter-ready</Pill>
              <div className="mt-5 grid w-full grid-cols-2 gap-3 text-center">
                <Mini label="Keywords" v="82%" />
                <Mini label="Formatting" v="94%" />
                <Mini label="Skills" v="88%" />
                <Mini label="Experience" v="79%" />
              </div>
            </div>
          </Card>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InsightCard tone="success" icon={CheckCircle2} title="Strengths" items={[
            "Strong quantified impact in 6 of 9 bullets",
            "Skills section aligned with PM job market",
            "Clean single-column, ATS-safe formatting",
          ]} />
          <InsightCard tone="warning" icon={AlertTriangle} title="Weaknesses" items={[
            "Summary section is missing — recruiters skim it first",
            "3 bullets lack metrics or outcomes",
            "Education listed before recent senior experience",
          ]} />
          <InsightCard tone="primary" icon={Lightbulb} title="Suggestions" items={[
            "Add a 3-line summary anchored on growth & monetization",
            "Quantify the Swiggy projects (users, GMV, retention)",
            "Move 'Skills' above 'Education' for senior roles",
          ]} />
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
function Row({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
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

function ScoreRing({ value }: { value: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(0.93 0.01 255)" strokeWidth="10" fill="none" />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.2 269)" />
            <stop offset="100%" stopColor="oklch(0.62 0.19 295)" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} stroke="url(#ring)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">of 100</div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ tone, icon: Icon, title, items }: { tone: "success" | "warning" | "primary"; icon: typeof CheckCircle2; title: string; items: string[] }) {
  const tones = {
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    primary: "bg-primary-soft text-primary",
  };
  return (
    <Card>
      <div className="p-5">
        <div className={`mb-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${tones[tone]}`}>
          <Icon className="h-3.5 w-3.5" /> {title}
        </div>
        <ul className="space-y-2.5">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
