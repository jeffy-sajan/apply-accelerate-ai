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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSidebar } from "@/components/sidebar-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const { collapsed, toggle } = useSidebar();

  return (
    <TooltipProvider delayDuration={120}>
      <aside
        data-collapsed={collapsed}
        className={`group/sb sticky top-0 hidden h-screen shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out lg:flex ${
          collapsed ? "w-[68px]" : "w-72"
        }`}
      >
        {/* Masthead */}
        <div className={`relative border-b border-sidebar-border ${collapsed ? "px-3 pt-6 pb-5" : "px-6 pt-7 pb-6"}`}>
          {!collapsed ? (
            <>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/50">
                № 001 — Vol. 26
              </div>
              <Link
                to="/dashboard"
                className="mt-3 block font-display text-[28px] leading-[0.9] text-sidebar-primary"
              >
                Career
                <br />
                Pilot<span className="text-warning">.</span>
              </Link>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/50">
                An AI Career Quarterly
              </div>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="mx-auto grid h-10 w-10 place-items-center bg-sidebar-primary font-display text-base text-sidebar-primary-foreground"
              aria-label="CareerPilot home"
            >
              C<span className="text-warning">.</span>
            </Link>
          )}

          {/* Collapse toggle */}
          <button
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}
            className="absolute -right-3 top-7 z-10 grid h-6 w-6 place-items-center border border-sidebar-border bg-sidebar text-sidebar-foreground/70 opacity-0 transition-opacity hover:text-sidebar-primary group-hover/sb:opacity-100 focus-visible:opacity-100"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-2 py-4" : "px-3 py-5"}`}>
          {!collapsed && (
            <div className="px-3 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">
              Sections
            </div>
          )}
          <ul className="space-y-px">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;

              const link = (
                <Link
                  to={item.to}
                  className={`group relative flex items-center transition-colors ${
                    collapsed
                      ? "h-10 w-full justify-center"
                      : "gap-3 px-3 py-2.5"
                  } ${
                    active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-primary"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-warning" />
                  )}
                  {!collapsed && (
                    <span
                      className={`font-mono text-[10px] tabular-nums ${
                        active ? "text-warning" : "text-sidebar-foreground/40"
                      }`}
                    >
                      {item.num}
                    </span>
                  )}
                  <Icon className="h-4 w-4 opacity-80 shrink-0" strokeWidth={1.5} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
                    </>
                  )}
                </Link>
              );

              return (
                <li key={item.to}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{link}</TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="border border-ink bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.18em] rounded-none"
                      >
                        <span className="text-warning mr-2">{item.num}</span>
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    link
                  )}
                </li>
              );
            })}
          </ul>

          {!collapsed && (
            <div className="mt-8 mx-3 border-t border-sidebar-border pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">
                This week
              </div>
              <p className="mt-2 font-display text-lg leading-tight text-sidebar-primary">
                "Tailored resumes get 3.2× more callbacks."
              </p>
              <p className="mt-2 text-xs text-sidebar-foreground/50">— Internal data, May 2026</p>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className={`border-t border-sidebar-border ${collapsed ? "p-2" : "p-4"}`}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="grid h-10 w-10 place-items-center bg-sidebar-primary font-display text-sm text-sidebar-primary-foreground">
                    AM
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="border border-ink bg-ink text-paper rounded-none">
                  <div className="text-xs font-semibold">Ananya Mehta</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-paper/60">Pro · Member</div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/login"
                    className="grid h-9 w-9 place-items-center text-sidebar-foreground/60 hover:text-sidebar-primary"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="border border-ink bg-ink text-paper rounded-none text-xs">
                  Sign out
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center bg-sidebar-primary font-display text-sm text-sidebar-primary-foreground">
                AM
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-sm font-semibold text-sidebar-primary">Ananya Mehta</div>
                <div className="truncate font-mono text-[11px] uppercase tracking-wider text-sidebar-foreground/50">
                  Pro · Member
                </div>
              </div>
              <Link
                to="/login"
                className="p-2 text-sidebar-foreground/60 hover:text-sidebar-primary"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
