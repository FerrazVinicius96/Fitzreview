import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BookDetailsPage from './pages/BookDetailsPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/livro/:id" element={<BookDetailsPage />} />
      </Routes>
    </Layout>
  );
}
