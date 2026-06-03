import { Bell, Search, Command } from "lucide-react";

export function Topbar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-background">
      <div className="flex items-center justify-between px-8 pt-5 pb-2 border-b border-border">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {today}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Issue · {title}
        </div>
      </div>

      <div className="flex h-16 items-center gap-6 px-8">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl leading-none text-foreground truncate">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[13px] text-muted-foreground truncate">{subtitle}</p>}
        </div>

        <div className="relative hidden md:flex items-center w-80 h-10 border border-input bg-surface">
          <Search className="ml-3 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="search"
            placeholder="Search the archive…"
            className="h-full w-full bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="mr-2 flex items-center gap-0.5 border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <button className="relative grid h-10 w-10 place-items-center border border-input bg-surface text-foreground hover:bg-muted" aria-label="Notifications">
            <Bell className="h-4 w-4" strokeWidth={1.5} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-warning" />
          </button>
        </div>
      </div>
    </header>
  );
}
