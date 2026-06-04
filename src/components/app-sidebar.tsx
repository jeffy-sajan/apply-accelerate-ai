import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Target,
  Kanban,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, num: "01" },
  { label: "Resume Analyzer", to: "/resume-analyzer", icon: FileText, num: "02" },
  { label: "ATS Analysis", to: "/ats-analysis", icon: ShieldCheck, num: "03" },
  { label: "JD Matcher", to: "/jd-matcher", icon: Target, num: "04" },
  { label: "Job Tracker", to: "/job-tracker", icon: Kanban, num: "05" },
  { label: "Analytics", to: "/analytics", icon: BarChart3, num: "06" },
  { label: "Settings", to: "/settings", icon: Settings, num: "07" },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex h-screen w-72 shrink-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="px-6 pt-5 pb-4 border-b border-sidebar-border">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/50">№ 001 — Vol. 26</div>
        <Link to="/dashboard" className="mt-3 block font-display text-[28px] leading-[0.9] text-sidebar-primary">
          Career<br/>Pilot<span className="text-warning">.</span>
        </Link>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/50">
          An AI Career Quarterly
        </div>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="px-3 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">
          Sections
        </div>
        <ul className="space-y-px">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`group flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-primary"
                  }`}
                >
                  <span className={`font-mono text-[10px] tabular-nums ${active ? "text-warning" : "text-sidebar-foreground/40"}`}>
                    {item.num}
                  </span>
                  <Icon className="h-4 w-4 opacity-80" strokeWidth={1.5} />
                  <span className="flex-1 font-medium tracking-tight">{item.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 mx-3 border-t border-sidebar-border pt-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">
            This week
          </div>
          <p className="mt-2 font-display text-lg leading-tight text-sidebar-primary">
            "Tailored resumes get 3.2× more callbacks."
          </p>
          <p className="mt-2 text-xs text-sidebar-foreground/50">— Internal data, May 2026</p>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center bg-sidebar-primary text-sidebar-primary-foreground font-display text-sm">
            AM
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-semibold text-sidebar-primary">Ananya Mehta</div>
            <div className="truncate text-[11px] text-sidebar-foreground/50 font-mono uppercase tracking-wider">Pro · Member</div>
          </div>
          <Link to="/login" className="p-2 text-sidebar-foreground/60 hover:text-sidebar-primary" aria-label="Logout">
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
