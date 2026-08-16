type LampDotProps = {
  className?: string;
};

/**
 * Ponto de luz — versão mínima da lâmpada, sempre acesa.
 * Reforça o motivo do Hero nas seções seguintes sem custo de animação.
 */
export function LampDot({ className }: LampDotProps) {
  return (
    <span
      className={`relative inline-flex h-1.5 w-1.5 shrink-0 ${className ?? ''}`}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full bg-bronze-bright blur-[3px] opacity-80" />
      <span className="relative h-full w-full rounded-full bg-bronze-bright" />
    </span>
  );
}
