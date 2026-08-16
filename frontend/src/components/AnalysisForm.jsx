import { useState } from "react";

const INMUEBLES = [
  { value: "casa", label: "Casa" },
  { value: "oficina", label: "Oficina" },
  { value: "comercio", label: "Comercio" },
];

const INITIAL_FORM = {
  consumo_kwh: "",
  uso_horario_pico: false,
  cantidad_equipos: "",
  tipo_inmueble: "casa",
  horas_alto_consumo: "",
};

function validate(form) {
  const errors = {};
  if (!form.consumo_kwh || Number(form.consumo_kwh) <= 0) {
    errors.consumo_kwh = "Ingresa un consumo mayor a 0 kWh.";
  }
  if (!form.cantidad_equipos || Number(form.cantidad_equipos) <= 0) {
    errors.cantidad_equipos = "Ingresa al menos 1 equipo.";
  }
  if (!form.horas_alto_consumo || Number(form.horas_alto_consumo) <= 0) {
    errors.horas_alto_consumo = "Ingresa horas mayores a 0.";
  }
  if (!form.tipo_inmueble) {
    errors.tipo_inmueble = "Selecciona un tipo de inmueble.";
  }
  return errors;
}

export default function AnalysisForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ ...form }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    setTouched({
      consumo_kwh: true,
      cantidad_equipos: true,
      horas_alto_consumo: true,
      tipo_inmueble: true,
    });
    if (Object.keys(validation).length > 0) return;

    onSubmit({
      consumo_kwh: Number(form.consumo_kwh),
      uso_horario_pico: form.uso_horario_pico,
      cantidad_equipos: Number(form.cantidad_equipos),
      tipo_inmueble: form.tipo_inmueble,
      horas_alto_consumo: Number(form.horas_alto_consumo),
    });
  }

  return (
    <form className="analysis-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="consumo_kwh">Consumo mensual</label>
        <div className="input-with-suffix">
          <input
            id="consumo_kwh"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            placeholder="450.5"
            value={form.consumo_kwh}
            onChange={(e) => update("consumo_kwh", e.target.value)}
            onBlur={() => handleBlur("consumo_kwh")}
            aria-invalid={touched.consumo_kwh && !!errors.consumo_kwh}
            aria-describedby="consumo_kwh-hint"
          />
          <span className="input-suffix mono">kWh</span>
        </div>
        {touched.consumo_kwh && errors.consumo_kwh ? (
          <p className="field-error" id="consumo_kwh-hint">{errors.consumo_kwh}</p>
        ) : (
          <p className="field-hint" id="consumo_kwh-hint">Lo que indica tu última factura de luz.</p>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cantidad_equipos">Equipos conectados</label>
          <input
            id="cantidad_equipos"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="12"
            value={form.cantidad_equipos}
            onChange={(e) => update("cantidad_equipos", e.target.value)}
            onBlur={() => handleBlur("cantidad_equipos")}
            aria-invalid={touched.cantidad_equipos && !!errors.cantidad_equipos}
          />
          {touched.cantidad_equipos && errors.cantidad_equipos && (
            <p className="field-error">{errors.cantidad_equipos}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="horas_alto_consumo">Horas de alto consumo / día</label>
          <input
            id="horas_alto_consumo"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="6"
            value={form.horas_alto_consumo}
            onChange={(e) => update("horas_alto_consumo", e.target.value)}
            onBlur={() => handleBlur("horas_alto_consumo")}
            aria-invalid={touched.horas_alto_consumo && !!errors.horas_alto_consumo}
          />
          {touched.horas_alto_consumo && errors.horas_alto_consumo && (
            <p className="field-error">{errors.horas_alto_consumo}</p>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="tipo_inmueble">Tipo de inmueble</label>
        <div className="segmented" role="radiogroup" aria-label="Tipo de inmueble">
          {INMUEBLES.map((opt) => (
            <button
              type="button"
              key={opt.value}
              role="radio"
              aria-checked={form.tipo_inmueble === opt.value}
              className={`segmented-option ${form.tipo_inmueble === opt.value ? "is-active" : ""}`}
              onClick={() => update("tipo_inmueble", opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <label className="toggle-row" htmlFor="uso_horario_pico">
        <span>
          <span className="toggle-title">Mayor uso en horario pico</span>
          <span className="toggle-subtitle">18:00 – 23:00</span>
        </span>
        <span className={`toggle ${form.uso_horario_pico ? "is-on" : ""}`}>
          <input
            id="uso_horario_pico"
            type="checkbox"
            checked={form.uso_horario_pico}
            onChange={(e) => update("uso_horario_pico", e.target.checked)}
          />
          <span className="toggle-knob" />
        </span>
      </label>

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Calculando…" : "Calcular eficiencia"}
      </button>
    </form>
  );
}
