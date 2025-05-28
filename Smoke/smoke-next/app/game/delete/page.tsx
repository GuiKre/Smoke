'use client';

import { useState } from 'react';

export default function DeleteGame() {
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const deletar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/api/games/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) throw new Error('Erro ao deletar jogo');

      setMensagem('Jogo deletado com sucesso!');
      setId('');
    } catch (err: any) {
      setMensagem(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Deletar Jogo</h1>
      <form onSubmit={deletar}>
        <input
          type="text"
          placeholder="ID do Jogo"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Deletar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}