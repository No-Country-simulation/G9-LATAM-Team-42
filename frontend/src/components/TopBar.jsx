import ThemeToggle from "./ThemeToggle";

const SECTION_LABELS = {
  inicio: "Inicio",
  analisis: "Nuevo análisis",
  historial: "Historial",
  reportes: "Reportes",
};

export default function TopBar({ section, onNavigate, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        <span className="topbar-eyebrow mono">JOULEAI</span>
        <span className="topbar-divider" aria-hidden="true">/</span>
        <span className="topbar-title">{SECTION_LABELS[section] || "Inicio"}</span>
      </div>

      <div className="topbar-actions">
        {section !== "analisis" && (
          <button type="button" className="btn-secondary topbar-cta" onClick={() => onNavigate("analisis")}>
            + Nuevo análisis
          </button>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
      </div>
    </header>
  );
}
