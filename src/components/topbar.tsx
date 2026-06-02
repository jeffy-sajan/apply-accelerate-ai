import { Bell, Search, HelpCircle } from "lucide-react";

export function Topbar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="relative hidden md:block w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search applications, roles…"
            className="h-9 w-full rounded-md border border-input bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
        </div>

        <div className="flex items-center gap-1">
          {actions}
          <button className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Help">
            <HelpCircle className="h-4 w-4" />
          </button>
          <button className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.58_0.2_295)] text-xs font-semibold text-primary-foreground">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
