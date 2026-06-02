import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, X, Trash2, Save } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/job-tracker")({
  head: () => ({ meta: [{ title: "Job Tracker · CareerPilot AI" }] }),
  component: JobTracker,
});

type Status = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";

type Job = {
  id: string;
  company: string;
  role: string;
  date: string;
  source: string;
  salary?: string;
  match?: number;
  status: Status;
};

const seed: Job[] = [
  { id: "1", company: "Stripe", role: "Senior PM, Growth", date: "Dec 02", source: "LinkedIn", salary: "$190k–$230k", match: 78, status: "Saved" },
  { id: "2", company: "Notion", role: "Product Manager, AI", date: "Dec 01", source: "Referral", salary: "$170k–$210k", match: 84, status: "Saved" },
  { id: "3", company: "Linear", role: "Product Designer", date: "Nov 30", source: "Careers page", match: 71, status: "Applied" },
  { id: "4", company: "Vercel", role: "DX Engineer", date: "Nov 28", source: "Twitter", match: 66, status: "Applied" },
  { id: "5", company: "Figma", role: "Sr. PM, Platform", date: "Nov 27", source: "Wellfound", match: 88, status: "Applied" },
  { id: "6", company: "Ramp", role: "Product Manager", date: "Nov 22", source: "LinkedIn", match: 81, status: "Interview" },
  { id: "7", company: "Retool", role: "PM, Enterprise", date: "Nov 18", source: "Referral", match: 76, status: "Interview" },
  { id: "8", company: "Loom", role: "Growth PM", date: "Nov 14", source: "LinkedIn", match: 90, status: "Offer" },
  { id: "9", company: "Airtable", role: "PM, Automations", date: "Nov 09", source: "Careers page", match: 58, status: "Rejected" },
  { id: "10", company: "Webflow", role: "Senior PM", date: "Nov 04", source: "LinkedIn", match: 62, status: "Rejected" },
];

const columns: { key: Status; tone: "neutral" | "primary" | "purple" | "success" | "destructive"; accent: string }[] = [
  { key: "Saved", tone: "neutral", accent: "oklch(0.7 0.04 260)" },
  { key: "Applied", tone: "primary", accent: "oklch(0.55 0.2 269)" },
  { key: "Interview", tone: "purple", accent: "oklch(0.62 0.19 295)" },
  { key: "Offer", tone: "success", accent: "oklch(0.62 0.16 152)" },
  { key: "Rejected", tone: "destructive", accent: "oklch(0.6 0.22 27)" },
];

function JobTracker() {
  const [open, setOpen] = useState<Job | null>(null);

  return (
    <>
      <Topbar title="Job Tracker" subtitle="108 applications · 18 interviews · 4 offers" actions={
        <>
          <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="primary" onClick={() => setOpen(seed[0])}><Plus className="h-4 w-4" /> Add application</Button>
        </>
      } />

      <div className="space-y-4 p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className="h-9 w-full rounded-md border border-input bg-surface pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40" placeholder="Search company, role…" />
          </div>
          <Pill tone="primary">All sources</Pill>
          <Pill tone="neutral">Last 30 days</Pill>
          <Pill tone="neutral">Remote</Pill>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {columns.map((col) => {
            const items = seed.filter((j) => j.status === col.key);
            return (
              <div key={col.key} className="flex h-full flex-col rounded-xl border border-border bg-surface-muted">
                <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: col.accent }} />
                    <span className="text-sm font-semibold text-foreground">{col.key}</span>
                    <span className="text-xs font-medium text-muted-foreground">{items.length}</span>
                  </div>
                  <button className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"><Plus className="h-4 w-4" /></button>
                </div>
                <div className="flex-1 space-y-2.5 p-2.5">
                  {items.map((j) => (
                    <button
                      key={j.id}
                      onClick={() => setOpen(j)}
                      className="block w-full rounded-lg border border-border bg-card p-3.5 text-left shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary-soft to-secondary text-[11px] font-bold text-primary">
                            {j.company.slice(0, 1)}
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">{j.company}</div>
                        </div>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-snug text-foreground">{j.role}</div>
                      {j.salary && <div className="mt-1 text-[11px] text-muted-foreground">{j.salary}</div>}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">{j.source} · {j.date}</span>
                        {j.match && <Pill tone={j.match >= 80 ? "success" : j.match >= 65 ? "primary" : "warning"}>{j.match}%</Pill>}
                      </div>
                    </button>
                  ))}
                  {items.length === 0 && (
                    <div className="grid place-items-center rounded-lg border border-dashed border-border p-6 text-xs text-muted-foreground">No items</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && <Modal job={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function Modal({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-foreground/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-soft to-secondary text-base font-bold text-primary">
              {job.company.slice(0, 1)}
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">{job.role}</div>
              <div className="text-xs text-muted-foreground">{job.company} · {job.source}</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          <Field label="Company" value={job.company} />
          <Field label="Position" value={job.role} />
          <Field label="Source" value={job.source} />
          <SelectField label="Status" value={job.status} />
          <Field label="Application Date" value={job.date} />
          <Field label="Salary range" value={job.salary ?? "—"} />
        </div>

        <div className="px-5 pb-5">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Notes</label>
          <textarea
            defaultValue={"Reached out to hiring manager via LinkedIn. Round 1 scheduled for Dec 10 with Priya (Director, Growth)."}
            className="h-28 w-full resize-none rounded-md border border-input bg-surface p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-muted px-5 py-3.5">
          <Button variant="ghost" className="text-destructive hover:bg-destructive-soft"><Trash2 className="h-4 w-4" /> Delete</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary"><Save className="h-4 w-4" /> Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input defaultValue={value} className="h-9 w-full rounded-md border border-input bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
    </div>
  );
}
function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <select defaultValue={value} className="h-9 w-full rounded-md border border-input bg-surface px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40">
        {["Saved", "Applied", "Interview", "Offer", "Rejected"].map((s) => <option key={s}>{s}</option>)}
      </select>
    </div>
  );
}
