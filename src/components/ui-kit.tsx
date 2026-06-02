export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border border-border bg-card shadow-card ${className}`}>{children}</div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}) {
  const trendColor =
    trend === "up" ? "text-success bg-success-soft" : trend === "down" ? "text-destructive bg-destructive-soft" : "text-muted-foreground bg-muted";
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {icon && <div className="grid h-8 w-8 place-items-center rounded-md bg-primary-soft text-primary">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
        {delta && (
          <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${trendColor}`}>{delta}</span>
        )}
      </div>
    </div>
  );
}

export function Pill({ tone = "neutral", className = "", children }: { tone?: "neutral" | "primary" | "success" | "warning" | "destructive" | "purple"; className?: string; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground",
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    destructive: "bg-destructive-soft text-destructive",
    purple: "bg-secondary text-secondary-foreground",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]} ${className}`}>{children}</span>;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "subtle" }) {
  const v: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-95 shadow-card",
    outline: "border border-input bg-surface text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
    subtle: "bg-primary-soft text-primary hover:bg-primary-soft/70",
  };
  return (
    <button
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition ${v[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
