import { AtmosphereImage } from '../AtmosphereImage';
import { imageSlots } from '../../data/imageSlots';

/**
 * Estante geométrica do Hero — painel estilizado (não é foto).
 * Se `hero-atmosphere.jpg` existir, entra como camada de fundo.
 */
export function HeroShelfPanel() {
  const spines = [
    { h: '72%' },
    { h: '88%' },
    { h: '64%' },
    { h: '96%' },
    { h: '70%' },
    { h: '82%' },
    { h: '58%' },
    { h: '90%' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-void">
      <AtmosphereImage
        src={imageSlots.heroAtmosphere}
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
      />
      <div className="texture-grain absolute inset-0 opacity-70" />

      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[42%] w-[55%] -translate-x-1/2 rounded-full bg-bronze/25 blur-[90px]"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex h-[78%] items-end justify-center gap-2 px-[8%] sm:gap-3">
        {spines.map((spine, index) => (
          <div
            key={index}
            className="relative w-[9%] max-w-[4.5rem] overflow-hidden border border-steel/70 bg-charcoal"
            style={{ height: spine.h }}
          >
            <div
              className={`absolute inset-y-0 left-0 w-[3px] ${
                index === 3 ? 'bg-bronze-bright/80' : 'bg-steel'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-fog/5 via-transparent to-void/80" />
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-[22%] w-[min(42%,20rem)] -translate-x-1/2">
        <div className="glow-bronze aspect-[3/4] border border-bronze-soft/50 bg-slate-panel/80">
          <div className="flex h-full flex-col justify-between p-6">
            <span className="kicker">Volume 01</span>
            <p className="text-display text-3xl leading-tight text-paper sm:text-4xl">
              Arquivo
              <span className="mt-2 block italic text-mist">pessoal.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/70" />
    </div>
  );
}
