// Elemento distintivo: un medidor eléctrico analógico.
// El puntaje interno del modelo (0 = más eficiente, 100+ = menos eficiente)
// se lee como una aguja de medidor, igual que un contador de luz físico.
import { useEffect, useId, useState } from "react";

const VIEW_W = 200;
const VIEW_H = 118;
const CENTER_X = 100;
const CENTER_Y = 100;
const RADIUS = 78;
const STROKE = 14;

function polarToCartesian(angleDeg) {
  const rad = ((angleDeg - 180) * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS * Math.cos(rad),
    y: CENTER_Y + RADIUS * Math.sin(rad),
  };
}

// Arco completo de 180° a 0°, dibujado como una sola pieza continua
// (evita costuras/quiebres visuales entre tramos de color separados).
function fullArcPath() {
  const start = polarToCartesian(180);
  const end = polarToCartesian(0);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
}

export default function MeterGauge({ score, categoria, size = 220 }) {
  const gradientId = useId();
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, score ?? 0));
    const frame = requestAnimationFrame(() => setAnimatedScore(clamped));
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const clampedForNeedle = Math.max(0, Math.min(100, score ?? 0));
  // angleDeg=0 -> extremo izquierdo (verde), angleDeg=180 -> extremo derecho (rojo).
  const needleAngle = (animatedScore / 100) * 180;
  const needleRad = ((needleAngle - 180) * Math.PI) / 180;
  const needleLen = RADIUS - 18;
  const tipX = CENTER_X + needleLen * Math.cos(needleRad);
  const tipY = CENTER_Y + needleLen * Math.sin(needleRad);

  const overflow = (score ?? 0) > 100;
  const renderedHeight = Math.round((size * VIEW_H) / VIEW_W);

  return (
    <div className="meter-gauge" style={{ width: size }}>
      <svg
        width={size}
        height={renderedHeight}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`Medidor de eficiencia: ${Math.round(score ?? 0)} puntos, categoría ${categoria || "sin calcular"}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--mint)" />
            <stop offset="50%" stopColor="var(--yellow)" />
            <stop offset="100%" stopColor="var(--coral)" />
          </linearGradient>
        </defs>
        <path
          d={fullArcPath()}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <line
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={tipX}
          y2={tipY}
          stroke="var(--text)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: "x2 0.9s cubic-bezier(.2,.9,.25,1), y2 0.9s cubic-bezier(.2,.9,.25,1)" }}
        />
        <circle cx={CENTER_X} cy={CENTER_Y} r="6" fill="var(--text)" />
      </svg>
      <div className="meter-gauge-readout">
        <span className="meter-gauge-value mono">
          {overflow ? "100+" : Math.round(clampedForNeedle)}
        </span>
        <span className="meter-gauge-unit">puntos</span>
      </div>
    </div>
  );
}
