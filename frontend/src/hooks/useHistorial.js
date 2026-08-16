import { useCallback, useEffect, useState } from "react";
import { getHistorial } from "../api/energiaiClient";

// Hook compartido: evita repetir el fetch del historial en cada vista
// (Inicio, Historial, Reportes) que necesita los mismos registros.
// Expone `refetch` para recargar tras eliminar un registro sin depender
// de un refreshKey global.
export default function useHistorial(refreshKey) {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    return getHistorial()
      .then((data) => setRegistros(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "No se pudo cargar el historial."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load, refreshKey]);

  return { registros, loading, error, refetch: load };
}
