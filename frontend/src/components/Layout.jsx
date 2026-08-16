import { Link, NavLink, Outlet } from 'react-router-dom';
import { AtmosphereImage } from './AtmosphereImage';
import { SiteBrand } from './SiteBrand';
import { imageSlots } from '../data/imageSlots';

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-obsidian text-paper">
      <div className="texture-grain pointer-events-none absolute inset-0 opacity-60" />
      <AtmosphereImage
        src={imageSlots.catalogStill}
        className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] w-full object-cover opacity-[0.14] mix-blend-luminosity"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] bg-gradient-to-b from-obsidian/40 via-obsidian/80 to-obsidian" />

      <header className="relative z-10 border-b border-steel/40 bg-obsidian/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <SiteBrand />

          <nav className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em]">
            <NavLink
              to="/"
              end
              className="text-ash transition hover:text-paper"
            >
              Início
            </NavLink>
            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                isActive
                  ? 'text-bronze-bright'
                  : 'text-ash transition hover:text-paper'
              }
            >
              Catálogo
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-steel/40 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
          <span>FitzReview · arquivo de leituras</span>
          <nav className="flex gap-8">
            <Link to="/" className="transition hover:text-bronze-bright">
              Início
            </Link>
            <Link to="/catalogo" className="transition hover:text-bronze-bright">
              Catálogo
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
