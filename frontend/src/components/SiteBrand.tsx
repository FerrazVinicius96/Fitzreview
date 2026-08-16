import { Link } from 'react-router-dom';

export function SiteBrand() {
  return (
    <Link to="/" className="group flex items-baseline gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bronze-bright">
        Arquivo
      </span>
      <span className="text-display text-xl text-paper transition group-hover:text-bronze-bright sm:text-2xl">
        FitzReview
      </span>
    </Link>
  );
}
