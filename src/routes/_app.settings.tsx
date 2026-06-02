import { createFileRoute } from "@tanstack/react-router";
import { User, Lock, FileText, Bell, Mail, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Card, CardHeader, Pill, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings · CareerPilot AI" }] }),
  component: Settings,
});

function Settings() {
  return (
    <>
      <Topbar title="Settings" subtitle="Manage your profile, security, and preferences." />

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[220px_1fr] lg:p-8">
        {/* Side nav */}
        <nav className="space-y-0.5">
          {[
            { i: User, l: "Profile", active: true },
            { i: Lock, l: "Password & Security" },
            { i: FileText, l: "Resume Preferences" },
            { i: Bell, l: "Notifications" },
            { i: Mail, l: "Email & Digest" },
          ].map((t, i) => {
            const Icon = t.i;
            return (
              <button
                key={i}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                  t.active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2"><Icon className="h-4 w-4" /> {t.l}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              </button>
            );
          })}
        </nav>

        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader title="Profile" subtitle="This information appears on your resume and applications." />
            <div className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.58_0.2_295)] text-lg font-semibold text-primary-foreground">AM</div>
                <div className="flex gap-2">
                  <Button variant="outline">Upload photo</Button>
                  <Button variant="ghost" className="text-muted-foreground">Remove</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full name" value="Ananya Mehta" />
                <Field label="Headline" value="Senior Product Manager · Growth & Monetization" />
                <Field label="Email" value="ananya@careerpilot.ai" />
                <Field label="Location" value="Bengaluru, India" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Save changes</Button>
              </div>
            </div>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader title="Password" subtitle="Last changed 3 months ago"
              action={<Pill tone="success">Strong</Pill>} />
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
              <Field label="Current password" type="password" value="••••••••" />
              <Field label="New password" type="password" value="" />
              <Field label="Confirm new password" type="password" value="" />
            </div>
            <div className="flex justify-end gap-2 px-5 pb-5">
              <Button variant="primary">Update password</Button>
            </div>
          </Card>

          {/* Resume prefs */}
          <Card>
            <CardHeader title="Resume Preferences" subtitle="Defaults applied to AI suggestions" />
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              <SelectField label="Target seniority" value="Senior (6–10 yrs)" options={["Junior", "Mid", "Senior (6–10 yrs)", "Staff / Principal"]} />
              <SelectField label="Preferred industries" value="SaaS, Fintech" options={["SaaS, Fintech", "Consumer", "Healthcare", "Enterprise"]} />
              <SelectField label="Resume tone" value="Confident & quantified" options={["Confident & quantified", "Concise & punchy", "Narrative"]} />
              <SelectField label="Page length" value="2 pages" options={["1 page", "2 pages", "Flexible"]} />
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader title="Notifications" subtitle="Choose what you hear about and where" />
            <div className="divide-y divide-border">
              {[
                { t: "Weekly career insights digest", d: "Every Monday at 9 AM, summary of your job search performance.", on: true },
                { t: "Interview reminders", d: "1 hour before any scheduled interview.", on: true },
                { t: "Job match alerts", d: "When a new role matches above 80% of your profile.", on: true },
                { t: "Product updates", d: "Occasional emails about new CareerPilot features.", on: false },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{n.t}</div>
                    <div className="text-xs text-muted-foreground">{n.d}</div>
                  </div>
                  <Toggle defaultOn={n.on} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type={type} defaultValue={value} className="h-10 w-full rounded-md border border-input bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
    </div>
  );
}
function SelectField({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <select defaultValue={value} className="h-10 w-full rounded-md border border-input bg-surface px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  return (
    <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="h-6 w-11 rounded-full bg-border transition peer-checked:bg-primary" />
      <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
    </label>
  );
}
