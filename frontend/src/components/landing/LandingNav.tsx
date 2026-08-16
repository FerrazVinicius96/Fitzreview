import { SiteBrand } from '../SiteBrand';

export function LandingNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="pointer-events-auto">
          <SiteBrand />
        </div>

        <a
          href="#busca"
          className="pointer-events-auto border border-steel/80 bg-obsidian/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mist backdrop-blur-sm transition hover:border-bronze hover:text-bronze-bright glow-bronze-sm"
        >
          Buscar
        </a>
      </div>
    </header>
  );
}
