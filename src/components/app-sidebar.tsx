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
  Sparkles,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Resume Analyzer", to: "/resume-analyzer", icon: FileText },
  { label: "ATS Analysis", to: "/ats-analysis", icon: ShieldCheck },
  { label: "JD Matcher", to: "/jd-matcher", icon: Target },
  { label: "Job Tracker", to: "/job-tracker", icon: Kanban },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-card">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-sidebar-foreground">CareerPilot</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">AI Career Suite</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent/60">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.58_0.2_295)] text-sm font-semibold text-primary-foreground">
            AM
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-medium text-sidebar-foreground">Ananya Mehta</div>
            <div className="truncate text-xs text-muted-foreground">ananya@careerpilot.ai</div>
          </div>
          <Link to="/login" className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground" aria-label="Logout">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
