// Espacio reservado para una imagen real. Se ve claramente como
// "por reemplazar" (borde punteado + ícono) para que el equipo
// sepa que ahí va una foto/ilustración propia antes de publicar.
export default function ImagePlaceholder({ label = "Reemplaza esta imagen", ratio = "4 / 3", className = "" }) {
  return (
    <div className={`image-placeholder ${className}`} style={{ aspectRatio: ratio }}>
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9" cy="10.5" r="1.6" fill="currentColor" />
        <path d="M4 17l5.5-5.5L14 16l2.5-2.5L20 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
