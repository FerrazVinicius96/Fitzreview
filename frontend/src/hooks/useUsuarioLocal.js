import { useState } from 'react';
import { buscarUsuarioPorNome, criarUsuario } from '../api/client';

const STORAGE_KEY = 'fitzreview_usuario';

// Mantém o usuário da sessão no localStorage para associar reviews sem tela de login.
export function useUsuarioLocal() {
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });

  const salvar = (dados) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    setUsuario(dados);
    return dados;
  };

  const garantirUsuario = async ({ nome, email }) => {
    // Sempre resolve a partir do formulário (nome → busca; se não existir → cria)
    try {
      const existente = await buscarUsuarioPorNome(nome.trim());
      return salvar(existente);
    } catch {
      const novo = await criarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        // Demo educacional: valor placeholder (não é autenticação real)
        senha_hash: `demo_${email.trim()}`,
      });
      return salvar(novo);
    }
  };

  return { usuario, garantirUsuario };
}
