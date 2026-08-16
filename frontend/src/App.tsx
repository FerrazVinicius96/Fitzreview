import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BookDetailsPage from './pages/BookDetailsPage';
import HomePage from './pages/HomePage';

const LandingPage = lazy(() => import('./pages/LandingPage'));

function LandingFallback() {
  return <div className="min-h-screen bg-obsidian" aria-hidden />;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LandingFallback />}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/catalogo" element={<HomePage />} />
        <Route path="/livro/:id" element={<BookDetailsPage />} />
      </Route>
    </Routes>
  );
}
