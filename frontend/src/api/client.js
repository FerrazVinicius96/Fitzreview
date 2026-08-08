import axios from 'axios';

// Cliente HTTP centralizado: React → Express (/api) → Services → Repositories → PostgreSQL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const buscarLivros = async (termo) => {
  const { data } = await api.get('/livros/busca', { params: { q: termo } });
  return data;
};

export const obterLivro = async (id) => {
  const { data } = await api.get(`/livros/${id}`);
  return data;
};

export const listarAvaliacoesPorLivro = async (livroId) => {
  const { data } = await api.get(`/avaliacoes/livro/${livroId}`);
  return data;
};

export const criarAvaliacao = async (payload) => {
  const { data } = await api.post('/avaliacoes', payload);
  return data;
};

export const atualizarAvaliacao = async (id, payload) => {
  const { data } = await api.patch(`/avaliacoes/${id}`, payload);
  return data;
};

export const deletarAvaliacao = async (id) => {
  await api.delete(`/avaliacoes/${id}`);
};

export const criarUsuario = async (payload) => {
  const { data } = await api.post('/usuarios', payload);
  return data;
};

export const buscarUsuarioPorNome = async (nome) => {
  const { data } = await api.get(`/usuarios/${encodeURIComponent(nome)}`);
  return data;
};

export default api;
