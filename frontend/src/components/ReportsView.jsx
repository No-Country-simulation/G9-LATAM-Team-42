import { useMemo, useRef, useState } from "react";
import useHistorial from "../hooks/useHistorial";
import StatusBadge from "./StatusBadge";

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const PERIODOS = [
  { value: "mes", label: "Este mes" },
  { value: "mes-anterior", label: "Mes anterior" },
  { value: "todo", label: "Todo el historial" },
];

function isSameMonth(date, ref) {
  return date.getFullYear() === ref.getFullYear() && date.getMonth() === ref.getMonth();
}

function filterByPeriodo(registros, periodo) {
  if (periodo === "todo") return registros;

  const now = new Date();
  const ref = new Date(now);
  if (periodo === "mes-anterior") {
    ref.setMonth(ref.getMonth() - 1);
  }

  return registros.filter((r) => {
    if (!r.fechaCreacion) return false;
    return isSameMonth(new Date(r.fechaCreacion), ref);
  });
}

function toCsv(registros) {
  const header = ["Fecha", "Inmueble", "Consumo (kWh)", "Categoría", "Costo estimado (USD)"];
  const rows = registros.map((r) => [
    r.fechaCreacion ? new Date(r.fechaCreacion).toISOString() : "",
    r.tipoInmueble ?? "",
    r.consumoKwh ?? "",
    r.categoria ?? "",
    r.costoEstimadoMensual ?? "",
  ]);
  return [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

export default function ReportsView({ refreshKey }) {
  const { registros, loading, error } = useHistorial(refreshKey);
  const [periodo, setPeriodo] = useState("mes");
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  const filtrados = useMemo(() => filterByPeriodo(registros, periodo), [registros, periodo]);

  const resumen = useMemo(() => {
    if (filtrados.length === 0) return null;
    const totalConsumo = filtrados.reduce((sum, r) => sum + (r.consumoKwh || 0), 0);
    const totalCosto = filtrados.reduce((sum, r) => sum + (r.costoEstimadoMensual || 0), 0);
    const counts = { eficiente: 0, moderado: 0, ineficiente: 0 };
    filtrados.forEach((r) => {
      const key = (r.categoria || "").toLowerCase();
      if (key.startsWith("efic")) counts.eficiente += 1;
      else if (key.startsWith("moder")) counts.moderado += 1;
      else counts.ineficiente += 1;
    });
    const categoriaPrincipal = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return { totalConsumo, totalCosto, count: filtrados.length, categoriaPrincipal };
  }, [filtrados]);

  function handleDownloadCsv() {
    const csv = toCsv([...filtrados].sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion)));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `joulai-reporte-${periodo}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleDownloadPdf() {
    if (!window.html2pdf || !reportRef.current) {
      alert("El generador de PDF todavía no cargó. Intenta de nuevo en unos segundos.");
      return;
    }
    setExporting(true);
    window
      .html2pdf()
      .from(reportRef.current)
      .set({
        margin: 10,
        filename: `joulai-reporte-${periodo}-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save()
      .finally(() => setExporting(false));
  }

  return (
    <>
      <header className="section-header">
        <span className="eyebrow">Reportes</span>
        <h1>Reporte de consumo</h1>
        <p className="text-muted">
          Filtra por período y descarga tu historial de gasto energético en PDF o CSV.
        </p>
      </header>

      <div className="report-toolbar">
        <div className="form-field report-toolbar-select">
          <label htmlFor="periodo">Período</label>
          <select id="periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            {PERIODOS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="report-toolbar-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleDownloadCsv}
            disabled={!resumen}
          >
            Descargar CSV
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleDownloadPdf}
            disabled={!resumen || exporting}
          >
            {exporting ? "Generando PDF…" : "Descargar PDF"}
          </button>
        </div>
      </div>

      {loading && <p className="text-muted">Cargando datos…</p>}

      {error && !loading && (
        <div className="result-panel result-panel--error">
          <h3>No se pudo cargar el reporte</h3>
          <p className="text-muted">{error}</p>
        </div>
      )}

      {!loading && !error && !resumen && (
        <div className="result-panel result-panel--empty">
          <h3>No hay análisis en este período</h3>
          <p className="text-muted">Prueba con “Todo el historial” o corre un nuevo análisis.</p>
        </div>
      )}

      {!loading && !error && resumen && (
        <div className="report-printable" ref={reportRef}>
          <div className="report-summary-cards">
            <div className="report-summary-card">
              <span className="home-stat-label">Análisis en el período</span>
              <span className="home-stat-value mono">{resumen.count}</span>
            </div>
            <div className="report-summary-card">
              <span className="home-stat-label">Consumo total</span>
              <span className="home-stat-value mono">{resumen.totalConsumo.toFixed(1)} kWh</span>
            </div>
            <div className="report-summary-card">
              <span className="home-stat-label">Costo estimado total</span>
              <span className="home-stat-value mono">{currency.format(resumen.totalCosto)}</span>
            </div>
            <div className="report-summary-card">
              <span className="home-stat-label">Categoría más frecuente</span>
              <StatusBadge categoria={resumen.categoriaPrincipal} size="sm" />
            </div>
          </div>

          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Inmueble</th>
                  <th>Consumo</th>
                  <th>Categoría</th>
                  <th>Costo est.</th>
                </tr>
              </thead>
              <tbody>
                {[...filtrados]
                  .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
                  .map((r) => (
                    <tr key={r.id}>
                      <td className="mono">
                        {r.fechaCreacion ? dateFormatter.format(new Date(r.fechaCreacion)) : "—"}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>{r.tipoInmueble}</td>
                      <td className="mono">{r.consumoKwh} kWh</td>
                      <td>
                        <StatusBadge categoria={r.categoria} size="sm" />
                      </td>
                      <td className="mono">{currency.format(r.costoEstimadoMensual ?? 0)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
