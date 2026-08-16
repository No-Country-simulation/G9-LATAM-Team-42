import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import StatusBadge from "./StatusBadge";
import useHistorial from "../hooks/useHistorial";
import { deleteAnalisis, ApiError } from "../api/energiaiClient";

const dateFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-date mono">{label}</p>
      <p className="chart-tooltip-value mono">{payload[0].value} kWh</p>
    </div>
  );
}

export default function HistoryView({ refreshKey }) {
  const { registros, loading, error, refetch } = useHistorial(refreshKey);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const chartData = useMemo(() => {
    return [...registros]
      .sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion))
      .map((r) => ({
        fecha: r.fechaCreacion ? dateFormatter.format(new Date(r.fechaCreacion)) : "—",
        consumo: r.consumoKwh,
      }));
  }, [registros]);

  const sortedForTable = useMemo(
    () => [...registros].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)),
    [registros]
  );

  async function handleDelete(registro) {
    const fecha = registro.fechaCreacion ? dateFormatter.format(new Date(registro.fechaCreacion)) : "este análisis";
    const confirmed = window.confirm(
      `¿Eliminar el análisis del ${fecha} (${registro.consumoKwh} kWh)? Esta acción no se puede deshacer y dejará de aparecer en tu historial y reportes.`
    );
    if (!confirmed) return;

    setDeleteError(null);
    setDeletingId(registro.id);
    try {
      await deleteAnalisis(registro.id);
      await refetch();
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : "No se pudo eliminar el análisis.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p className="text-muted">Cargando historial…</p>;
  }

  if (error) {
    return (
      <div className="result-panel result-panel--error">
        <h3>No se pudo cargar el historial</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  if (registros.length === 0) {
    return (
      <div className="result-panel result-panel--empty">
        <h3>Todavía no hay análisis guardados</h3>
        <p className="text-muted">
          Cada análisis que calcules desde “Nuevo análisis” quedará registrado aquí, con
          fecha y evolución de tu consumo.
        </p>
      </div>
    );
  }

  return (
    <div className="history-view">
      <div className="chart-card">
        <span className="eyebrow">Consumo por análisis (kWh)</span>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border-soft)" vertical={false} />
              <XAxis
                dataKey="fecha"
                tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={56}
                allowDecimals={false}
                domain={[0, (max) => Math.ceil((max || 1) * 1.2)]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)" }} />
              <Line
                type="monotone"
                dataKey="consumo"
                stroke="var(--amber)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--amber)", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {deleteError && <p className="field-error">{deleteError}</p>}

      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Inmueble</th>
              <th>Consumo</th>
              <th>Categoría</th>
              <th>Costo est.</th>
              <th aria-label="Acciones"></th>
            </tr>
          </thead>
          <tbody>
            {sortedForTable.map((r) => (
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
                <td>
                  <button
                    type="button"
                    className="history-delete-btn"
                    onClick={() => handleDelete(r)}
                    disabled={deletingId === r.id}
                    aria-label={`Eliminar análisis del ${r.fechaCreacion ? dateFormatter.format(new Date(r.fechaCreacion)) : "registro"}`}
                    title="Eliminar este análisis"
                  >
                    {deletingId === r.id ? "…" : "✕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
