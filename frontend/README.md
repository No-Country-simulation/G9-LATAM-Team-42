# JouleAI — Frontend

Interfaz web para el diagnóstico de eficiencia energética de JouleAI. Consume el
backend Spring Boot descrito en `../docs/contrato-api.md`.

## Stack

- React 19 + Vite
- `recharts` para el gráfico de historial
- CSS plano (sin framework), con un sistema de tokens en `src/index.css`

## Empezar

```bash
npm install
cp .env.example .env.local   # ajusta VITE_API_URL si tu backend no corre en :8080
npm run dev
```

El backend debe estar corriendo (por defecto en `http://localhost:8080`) y con CORS
habilitado para el origen del frontend (ver `SecurityConfig.java`).

## Estructura

```
src/
  api/energiaiClient.js     # fetch a /analisis-energetico y /analisis-energetico/historial
  components/
    AnalysisForm.jsx        # formulario con los 5 campos del contrato de entrada
    ResultPanel.jsx         # categoría, costo estimado y recomendaciones
    MeterGauge.jsx          # medidor analógico (aguja) para el puntaje del modelo
    HistoryView.jsx         # gráfico + tabla del historial guardado
    StatusBadge.jsx         # pastilla de categoría (Eficiente/Moderado/Ineficiente)
    Sidebar.jsx
  App.jsx                   # navegación entre "Nuevo análisis" e "Historial"
```

## Notas sobre el contrato de datos

- Petición (`POST /analisis-energetico`): `consumo_kwh`, `uso_horario_pico` (boolean),
  `cantidad_equipos`, `tipo_inmueble` (`casa` | `oficina` | `comercio`),
  `horas_alto_consumo`.
- Respuesta: `categoria`, `probabilidad` (el puntaje interno del modelo — no es un
  porcentaje 0-1 en la implementación actual, así que se muestra como puntaje en el
  medidor), `recomendaciones`, `costo_estimado`.
- Historial (`GET /analisis-energetico/historial`): devuelve la entidad JPA completa
  en camelCase (`consumoKwh`, `fechaCreacion`, etc.), distinto al de la respuesta del
  análisis.

Si el equipo de datascience cambia el contrato, actualiza `src/api/energiaiClient.js`
y los componentes que leen esos campos.
