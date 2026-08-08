import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-steel/80 bg-charcoal/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="group flex items-baseline gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze-bright">
              Catálogo
            </span>
            <span className="text-2xl font-semibold tracking-tight text-fog transition group-hover:text-bronze-bright sm:text-3xl">
              FitzReview
            </span>
          </Link>

          <nav className="flex items-center gap-6 font-mono text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-bronze-bright'
                  : 'text-ash transition hover:text-fog'
              }
            >
              Busca
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>

      <footer className="border-t border-steel/60 py-8 text-center font-mono text-xs text-ash">
        Minimalista Industrial · Reviews com PostgreSQL + Google Books
      </footer>
    </div>
  );
}
