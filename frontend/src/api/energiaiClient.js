// Cliente para la API de EnergiAI (backend Spring Boot).
// Contrato de datos: docs/contrato-api.md en la raíz del monorepo.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseErrorBody(response) {
  try {
    const body = await response.json();
    // GlobalExceptionHandler devuelve { error, messages: [...], path, ... }.
    if (Array.isArray(body?.messages) && body.messages.length > 0) {
      return body.messages.join(" · ");
    }
    if (body?.errors && typeof body.errors === "object") {
      return Object.values(body.errors).join(" · ");
    }
    return body?.message || body?.error || null;
  } catch {
    return null;
  }
}

/**
 * Envía los datos de consumo y recibe la clasificación de eficiencia.
 * @param {{
 *   consumo_kwh: number,
 *   uso_horario_pico: boolean,
 *   cantidad_equipos: number,
 *   tipo_inmueble: string,
 *   horas_alto_consumo: number
 * }} payload
 */
export async function postAnalisis(payload) {
  const response = await fetch(`${BASE_URL}/analisis-energetico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await parseErrorBody(response);
    throw new ApiError(
      detail || "No se pudo procesar el análisis. Verifica los datos ingresados.",
      response.status
    );
  }

  return response.json();
}

/** Obtiene el historial completo de análisis guardados. */
export async function getHistorial() {
  const response = await fetch(`${BASE_URL}/analisis-energetico/historial`);

  if (!response.ok) {
    const detail = await parseErrorBody(response);
    throw new ApiError(detail || "No se pudo cargar el historial.", response.status);
  }

  return response.json();
}

/** Elimina un análisis del historial (por ejemplo, si se ingresaron datos por error). */
export async function deleteAnalisis(id) {
  const response = await fetch(`${BASE_URL}/analisis-energetico/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const detail = await parseErrorBody(response);
    throw new ApiError(detail || "No se pudo eliminar el análisis.", response.status);
  }
}

export { ApiError, BASE_URL };
