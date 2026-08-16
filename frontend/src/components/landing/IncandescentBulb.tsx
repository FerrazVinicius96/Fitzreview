import type { CSSProperties } from 'react';

type IncandescentBulbProps = {
  className?: string;
  /** Estado inicial (0 apagada — 1 acesa) antes de qualquer animação assumir o controle. */
  defaultLit?: number;
  /** Nome do gancho `data-*` usado pelo GSAP para encontrar este nó (ex.: "hero-lamp"). */
  hook?: string;
  /** Desenha as partículas de poeira flutuante ao redor do globo (custa alguns nós a mais). */
  particles?: boolean;
};

const PARTICLES = [
  { cx: 58, cy: 96, r: 2.6, delay: '0s' },
  { cx: 148, cy: 88, r: 2, delay: '1.1s' },
  { cx: 168, cy: 150, r: 1.7, delay: '2.4s' },
  { cx: 34, cy: 158, r: 2.2, delay: '0.6s' },
  { cx: 100, cy: 52, r: 1.6, delay: '1.8s' },
  { cx: 122, cy: 196, r: 1.9, delay: '3s' },
];

/**
 * Lâmpada incandescente — motivo visual recorrente do site.
 * O aceso/apagado é controlado inteiramente pela custom property `--lamp-lit`
 * (0 a 1), lida pelo filamento, pelo vidro, pelas camadas de halo e pelas
 * partículas. Quem anima essa variável (GSAP scrub, ou nada — fica no valor
 * de `defaultLit`) decide o gatilho; o componente só sabe desenhar o estado.
 *
 * Três camadas de halo (ambiente / meio / núcleo) substituem o blur único
 * anterior — dá volume à luz em vez de um disco borrado achatado.
 */
export function IncandescentBulb({
  className,
  defaultLit = 0.12,
  hook,
  particles = true,
}: IncandescentBulbProps) {
  const hookAttr = hook ? { [`data-${hook}`]: '' } : {};
  const style = { '--lamp-lit': defaultLit } as CSSProperties;

  return (
    <div
      {...hookAttr}
      className={`pointer-events-none relative ${className ?? ''}`}
      style={style}
      aria-hidden
    >
      {/* Halo — ambiente (largo, muito difuso) */}
      <div
        className="bulb-halo-breathe absolute left-1/2 top-[42%] h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze blur-[48px]"
        style={{ opacity: 'calc(var(--lamp-lit) * 0.28)' }}
      />
      {/* Halo — meio (bloom) */}
      <div
        className="absolute left-1/2 top-[42%] h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-bright blur-[26px]"
        style={{ opacity: 'calc(var(--lamp-lit) * 0.42)' }}
      />
      {/* Halo — núcleo (brilho quente próximo ao vidro) */}
      <div
        className="absolute left-1/2 top-[40%] h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper blur-[12px]"
        style={{ opacity: 'calc(var(--lamp-lit) * 0.5)' }}
      />

      <svg
        viewBox="0 0 200 320"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bulb-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-steel)" />
            <stop offset="45%" stopColor="var(--color-mist)" stopOpacity="0.7" />
            <stop offset="55%" stopColor="var(--color-mist)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-steel)" />
          </linearGradient>

          <radialGradient id="bulb-glass" cx="38%" cy="30%" r="80%">
            <stop
              offset="0%"
              style={{
                stopColor:
                  'color-mix(in srgb, var(--color-paper) calc(var(--lamp-lit) * 85%), var(--color-charcoal))',
              }}
            />
            <stop
              offset="45%"
              style={{
                stopColor:
                  'color-mix(in srgb, var(--color-bronze-bright) calc(var(--lamp-lit) * 60%), var(--color-charcoal))',
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor:
                  'color-mix(in srgb, var(--color-bronze-soft) calc(var(--lamp-lit) * 35%), var(--color-ink))',
              }}
            />
          </radialGradient>
        </defs>

        {/* Fio de alimentação */}
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="64"
          stroke="var(--color-steel)"
          strokeWidth="2"
        />

        {/* Casquilho / rosca metálica */}
        <rect x="84" y="58" width="32" height="14" fill="url(#bulb-metal)" />
        <rect x="86" y="74" width="28" height="3" fill="var(--color-ink)" />
        <rect x="86" y="79" width="28" height="3" fill="var(--color-ink)" />
        <rect x="86" y="84" width="28" height="3" fill="var(--color-ink)" />
        <rect x="86.5" y="66" width="27" height="2" fill="var(--color-ink)" opacity="0.6" />

        {/* Globo de vidro */}
        <path
          d="M100 88c-32 0-57 25.8-57 57.7 0 23.3 13.7 36.8 24.5 48 7.4 7.6 11.3 13.2 11.3 23.1v7.4h42.4v-7.4c0-9.9 3.9-15.5 11.3-23.1 10.8-11.2 24.5-24.7 24.5-48C157 113.8 132 88 100 88Z"
          fill="url(#bulb-glass)"
          stroke="var(--color-mist)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />

        {/* Reflexo especular — sempre presente, dá a sensação de vidro real */}
        <path
          d="M68 116c-7 11-10.5 21-10.5 30.5"
          stroke="var(--color-fog)"
          strokeOpacity="0.4"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="78" cy="104" r="4.5" fill="var(--color-fog)" opacity="0.35" />

        {/* Sombra interna no colo do vidro (profundidade) */}
        <path
          d="M100 88c-32 0-57 25.8-57 57.7 0 6 1 11.4 2.7 16.4 5-27 27-46.7 54.3-46.7 27.3 0 49.3 19.7 54.3 46.7 1.7-5 2.7-10.4 2.7-16.4C157 113.8 132 88 100 88Z"
          fill="var(--color-ink)"
          opacity="0.18"
        />

        {/* Base / pé de apoio */}
        <rect
          x="79"
          y="220"
          width="42"
          height="10"
          rx="2.5"
          fill="url(#bulb-metal)"
        />

        {/* Filamento */}
        <g
          style={{
            opacity: 'calc(0.35 + var(--lamp-lit) * 0.65)',
            filter:
              'drop-shadow(0 0 calc(var(--lamp-lit) * 10px) var(--color-bronze-bright)) drop-shadow(0 0 calc(var(--lamp-lit) * 22px) var(--color-bronze))',
          }}
        >
          <path
            d="M80 122c0 0 10-16 20-16s7.5 16 20 16 10-16 20-16"
            stroke="var(--color-bronze-bright)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="122"
            x2="80"
            y2="152"
            stroke="var(--color-bronze-bright)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="140"
            y1="122"
            x2="140"
            y2="152"
            stroke="var(--color-bronze-bright)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="128" r="2.6" fill="var(--color-paper)" opacity="0.9" />
        </g>

        {/* Partículas de poeira suspensas na luz */}
        {particles && (
          <g style={{ opacity: 'calc(var(--lamp-lit) * 0.65)' }}>
            {PARTICLES.map((p, i) => (
              <circle
                key={i}
                className="bulb-particle"
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill="var(--color-paper)"
                style={{ animationDelay: p.delay }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
