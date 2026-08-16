const NAV_ITEMS = [
  { key: "inicio", label: "Inicio", icon: "◆" },
  { key: "analisis", label: "Nuevo análisis", icon: "⚡" },
  { key: "historial", label: "Historial", icon: "◷" },
  { key: "reportes", label: "Reportes", icon: "▤" },
];

export default function Sidebar({ active, onNavigate, collapsed, onToggleCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="brand">
        <div className="brand-identity">
          <span className="brand-mark" aria-hidden="true">⚡</span>
          {!collapsed && (
            <div>
              <span className="brand-name">JouleAI</span>
              <span className="brand-tag mono">G9 · LATAM · Team 42</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          title={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Secciones">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sidebar-nav-item ${active === item.key ? "is-active" : ""}`}
            onClick={() => onNavigate(item.key)}
            aria-current={active === item.key ? "page" : undefined}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-nav-icon" aria-hidden="true">{item.icon}</span>
            {!collapsed && item.label}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer text-muted">
          Diagnóstico de eficiencia energética para hogares, oficinas y comercios.
        </div>
      )}
    </aside>
  );
}
