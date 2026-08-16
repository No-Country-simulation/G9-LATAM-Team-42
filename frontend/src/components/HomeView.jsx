import { useMemo } from "react";
import useHistorial from "../hooks/useHistorial";
import StatusBadge from "./StatusBadge";
import MeterGauge from "./MeterGauge";

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function normalizeCategoria(categoria) {
  const key = (categoria || "").toLowerCase();
  if (key.startsWith("efic")) return "eficiente";
  if (key.startsWith("moder")) return "moderado";
  return "ineficiente";
}

// ── Íconos propios (SVG en línea, siguen la paleta de la marca) ──
function IconForm() {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
      <rect x="7" y="4" width="26" height="32" rx="4" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <line x1="13" y1="13" x2="27" y2="13" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="20" x2="24" y2="20" stroke="var(--amber-soft)" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="27" x2="21" y2="27" stroke="var(--amber-soft)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="29" cy="29" r="6" fill="var(--mint)" />
      <path d="M26.5 29l1.8 1.8 3.2-3.6" stroke="#0d1917" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconModel() {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <circle cx="20" cy="20" r="4" fill="var(--amber)" />
      <line x1="20" y1="20" x2="20" y2="7" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="20" x2="29" y2="26" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="20" x2="11" y2="26" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="7" r="2.4" fill="var(--mint)" />
      <circle cx="29" cy="26" r="2.4" fill="var(--yellow)" />
      <circle cx="11" cy="26" r="2.4" fill="var(--coral)" />
    </svg>
  );
}

function IconReport() {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
      <rect x="6" y="6" width="28" height="28" rx="5" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <path d="M12 25l5-8 4 5 7-10" stroke="var(--mint)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="12" r="2" fill="var(--mint)" />
    </svg>
  );
}

function IconChip() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <rect x="9" y="9" width="14" height="14" rx="2" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <circle cx="16" cy="16" r="3" fill="var(--amber-soft)" />
      <line x1="16" y1="2" x2="16" y2="9" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="23" x2="16" y2="30" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="16" x2="9" y2="16" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="16" x2="30" y2="16" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconApi() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <rect x="4" y="7" width="24" height="18" rx="3" fill="none" stroke="var(--amber)" strokeWidth="2" />
      <line x1="4" y1="13" x2="28" y2="13" stroke="var(--amber)" strokeWidth="2" />
      <circle cx="8" cy="10" r="1.2" fill="var(--amber)" />
      <path d="M11 20l3-5 3 3.5 4-6" fill="none" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <path
        d="M10 22a5.5 5.5 0 0 1-.6-10.97A6.5 6.5 0 0 1 22 9.6a5 5 0 0 1-1 10.4H10Z"
        fill="none"
        stroke="var(--amber)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 25v-4M16 25v-6M19 25v-3" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAtom() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <circle cx="16" cy="16" r="2.6" fill="var(--amber)" />
      <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="var(--amber)" strokeWidth="1.8" transform="rotate(0 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="var(--mint)" strokeWidth="1.8" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="var(--coral)" strokeWidth="1.8" transform="rotate(120 16 16)" />
    </svg>
  );
}

export default function HomeView({ onNavigate, refreshKey }) {
  const { registros, loading, error } = useHistorial(refreshKey);

  const stats = useMemo(() => {
    if (registros.length === 0) return null;

    const sorted = [...registros].sort(
      (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    );
    const last = sorted[0];

    const totalConsumo = registros.reduce((sum, r) => sum + (r.consumoKwh || 0), 0);
    const totalCosto = registros.reduce((sum, r) => sum + (r.costoEstimadoMensual || 0), 0);
    const avgConsumo = totalConsumo / registros.length;

    const counts = { eficiente: 0, moderado: 0, ineficiente: 0 };
    registros.forEach((r) => {
      counts[normalizeCategoria(r.categoria)] += 1;
    });

    return { last, avgConsumo, totalCosto, count: registros.length, counts };
  }, [registros]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Plataforma de eficiencia energética con IA
          </span>
          <h1 className="hero-title">
            Tu factura de luz, <span className="hero-title-accent">explicada por un modelo</span>, no por
            adivinanza
          </h1>
          <p className="hero-subtitle">
            JouleAI toma los datos de tu consumo mensual y los pasa por un modelo de Random
            Forest entrenado en Python: te dice si tu perfil es eficiente, moderado o
            ineficiente, cuánto vas a pagar aproximadamente (a RD$0,75/kWh) y qué cambiar
            primero — sin registrarte, sin planillas.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNavigate("analisis")}>
              Analizar mi consumo
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("historial")}>
              Ver historial
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value mono">RD$0.75</span>
              <span className="hero-stat-label">tarifa de referencia por kWh</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value mono">{stats ? stats.count : 0}</span>
              <span className="hero-stat-label">análisis en tu historial</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value mono">3</span>
              <span className="hero-stat-label">perfiles de eficiencia</span>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="/hero-bulb.jpg"
            alt="Foco encendido, símbolo de JouleAI"
            className="hero-art-photo"
          />
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="how-it-works">
        <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>
          Proceso simple
        </span>
        <h2 className="how-it-works-title">¿Cómo funciona JouleAI?</h2>
        <p className="text-muted" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          Tres pasos, del formulario a la recomendación — sin pasos ocultos.
        </p>

        <div className="how-it-works-grid">
          <div className="how-step">
            <span className="how-step-number mono">01</span>
            <div className="how-step-icon"><IconForm /></div>
            <h3>Ingresa tus datos</h3>
            <p className="text-muted">
              Consumo mensual en kWh, cantidad de equipos, si el mayor uso ocurre en horario
              pico (18:00–23:00), horas de alto consumo y tipo de inmueble.
            </p>
          </div>
          <div className="how-step">
            <span className="how-step-number mono">02</span>
            <div className="how-step-icon"><IconModel /></div>
            <h3>El modelo clasifica tu perfil</h3>
            <p className="text-muted">
              Un clasificador entrenado con Scikit-learn evalúa el patrón y asigna una
              categoría — Eficiente, Moderado o Ineficiente — con su puntaje.
            </p>
          </div>
          <div className="how-step">
            <span className="how-step-number mono">03</span>
            <div className="how-step-icon"><IconReport /></div>
            <h3>Recibe tu diagnóstico</h3>
            <p className="text-muted">
              Costo estimado mensual, recomendaciones puntuales, y todo queda guardado en tu
              historial para comparar con el próximo mes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stack técnico ── */}
      <section className="tech-section">
        <span className="eyebrow">Arquitectura técnica</span>
        <h2>Detrás de la interfaz</h2>
        <p className="text-muted" style={{ maxWidth: 560 }}>
          JouleAI combina ciencia de datos con una API REST en producción sobre OCI —
          este proyecto nació como parte del hackathon G9 LATAM Team 42.
        </p>

        <div className="tech-grid">
          <div className="tech-card">
            <span className="tech-card-shine" aria-hidden="true" />
            <span className="tech-card-icon"><IconChip /></span>
            <div>
              <span className="tech-card-title">Python + Scikit-learn</span>
              <span className="tech-card-subtitle">Modelo de clasificación (Random Forest)</span>
            </div>
          </div>
          <div className="tech-card">
            <span className="tech-card-shine" aria-hidden="true" />
            <span className="tech-card-icon"><IconApi /></span>
            <div>
              <span className="tech-card-title">Java + Spring Boot</span>
              <span className="tech-card-subtitle">API REST — /analisis-energetico</span>
            </div>
          </div>
          <div className="tech-card">
            <span className="tech-card-shine" aria-hidden="true" />
            <span className="tech-card-icon"><IconCloud /></span>
            <div>
              <span className="tech-card-title">Oracle Cloud (OCI)</span>
              <span className="tech-card-subtitle">Base de datos Oracle Autonomous en producción</span>
            </div>
          </div>
          <div className="tech-card">
            <span className="tech-card-shine" aria-hidden="true" />
            <span className="tech-card-icon"><IconAtom /></span>
            <div>
              <span className="tech-card-title">React + Vite</span>
              <span className="tech-card-subtitle">Interfaz — el panel que estás usando</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tu actividad reciente ── */}
      <section>
        <header className="section-header">
          <span className="eyebrow">Tu actividad</span>
          <h2>Resumen de tus análisis</h2>
        </header>

        {loading && <p className="text-muted">Cargando resumen…</p>}

        {error && !loading && (
          <div className="result-panel result-panel--error">
            <h3>No se pudo cargar tu resumen</h3>
            <p className="text-muted">{error}</p>
          </div>
        )}

        {!loading && !error && !stats && (
          <div className="result-panel result-panel--empty">
            <h3>Todavía no tienes análisis</h3>
            <p className="text-muted">
              Corre tu primer diagnóstico desde “Analizar mi consumo” para ver tu resumen
              aquí.
            </p>
          </div>
        )}

        {!loading && !error && stats && (
          <div className="home-grid">
            <div className="result-panel home-last-result">
              <div className="result-panel-header">
                <MeterGauge score={stats.last.probabilidad} categoria={stats.last.categoria} size={160} />
                <div className="result-panel-heading">
                  <span className="eyebrow">Último análisis</span>
                  <StatusBadge categoria={stats.last.categoria} size="lg" />
                  <span className="text-muted mono" style={{ fontSize: 12 }}>
                    {stats.last.fechaCreacion ? dateFormatter.format(new Date(stats.last.fechaCreacion)) : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="home-stat-cards">
              <div className="home-stat-card">
                <span className="home-stat-label">Análisis realizados</span>
                <span className="home-stat-value mono">{stats.count}</span>
              </div>
              <div className="home-stat-card">
                <span className="home-stat-label">Consumo promedio</span>
                <span className="home-stat-value mono">{stats.avgConsumo.toFixed(1)} kWh</span>
              </div>
              <div className="home-stat-card">
                <span className="home-stat-label">Costo estimado acumulado</span>
                <span className="home-stat-value mono">{currency.format(stats.totalCosto)}</span>
              </div>
              <div className="home-stat-card home-stat-card--distribution">
                <span className="home-stat-label">Distribución</span>
                <div className="home-distribution">
                  <span className="home-distribution-item">
                    <span className="status-dot" style={{ background: "var(--eficiente)" }} />
                    Eficiente <b className="mono">{stats.counts.eficiente}</b>
                  </span>
                  <span className="home-distribution-item">
                    <span className="status-dot" style={{ background: "var(--moderado)" }} />
                    Moderado <b className="mono">{stats.counts.moderado}</b>
                  </span>
                  <span className="home-distribution-item">
                    <span className="status-dot" style={{ background: "var(--ineficiente)" }} />
                    Ineficiente <b className="mono">{stats.counts.ineficiente}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
