import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BookDetailsPage from './pages/BookDetailsPage';

const HomePage = lazy(() => import('./pages/HomePage'));

function HomeFallback() {
  return <div className="min-h-screen bg-obsidian" aria-hidden />;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<HomeFallback />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/livro/:id" element={<BookDetailsPage />} />
      </Route>
    </Routes>
  );
}
