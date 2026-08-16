const CONFIG = {
  eficiente: {
    label: "Eficiente",
    varColor: "var(--eficiente)",
    varBg: "var(--eficiente-bg)",
    varBorder: "var(--eficiente-border)",
  },
  moderado: {
    label: "Moderado",
    varColor: "var(--moderado)",
    varBg: "var(--moderado-bg)",
    varBorder: "var(--moderado-border)",
  },
  ineficiente: {
    label: "Ineficiente",
    varColor: "var(--ineficiente)",
    varBg: "var(--ineficiente-bg)",
    varBorder: "var(--ineficiente-border)",
  },
};

function normalize(categoria) {
  const key = (categoria || "").toLowerCase();
  if (key.startsWith("efic")) return "eficiente";
  if (key.startsWith("moder")) return "moderado";
  return "ineficiente";
}

export default function StatusBadge({ categoria, size = "md" }) {
  const cfg = CONFIG[normalize(categoria)];
  return (
    <span
      className={`status-badge status-badge--${size}`}
      style={{ color: cfg.varColor, background: cfg.varBg, borderColor: cfg.varBorder }}
    >
      <span className="status-badge-dot" style={{ background: cfg.varColor }} />
      {categoria || cfg.label}
    </span>
  );
}
