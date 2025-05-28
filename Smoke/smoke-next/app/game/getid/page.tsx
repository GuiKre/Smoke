'use client';

import { useState } from 'react';

type Game = {
  id: number;
  nome: string;
  genero: string;
  desenvolvedor: string;
};

export default function BuscarPorId() {
  const [input, setInput] = useState<string>('');
  const [game, setGame] = useState<Game | null>(null);
  const [erro, setErro] = useState<string>('');

  const buscarGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setGame(null);

    try {
      const resposta = await fetch(`http://localhost:5016/api/games/${input}`);

      if (!resposta.ok) {
        throw new Error('Jogo não encontrado.');
      }

      const dados = await resposta.json();

      setGame({
        id: dados.id,
        nome: dados.nome,
        genero: dados.genero,
        desenvolvedor: dados.desenvolvedor,
      });

    } catch (err: any) {
      setErro(`⚠️ ${err.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1f2937',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: '#C0C0C0',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111827' }}>
          Buscar Jogo por ID
        </h1>

        <form onSubmit={buscarGame} style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Digite o ID do Jogo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '60%',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              marginLeft: '0.5rem',
              backgroundColor: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Buscar
          </button>
        </form>

        {erro && (
          <p style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '1rem' }}>{erro}</p>
        )}

        {game && (
          <table
  style={{
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    backgroundColor: '#f9fafb', // fundo claro
    borderRadius: '0.5rem',
    overflow: 'hidden',
    color: '#111827', // letras escuras
  }}
>
  <thead>
    <tr style={{ backgroundColor: '#d1d5db' }}>
      <th style={{ padding: '0.75rem' }}>ID</th>
      <th style={{ padding: '0.75rem' }}>Nome</th>
      <th style={{ padding: '0.75rem' }}>Gênero</th>
      <th style={{ padding: '0.75rem' }}>Desenvolvedor</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{ textAlign: 'center' }}>
      <td style={{ padding: '0.75rem' }}>{game.id}</td>
      <td style={{ padding: '0.75rem' }}>{game.nome}</td>
      <td style={{ padding: '0.75rem' }}>{game.genero}</td>
      <td style={{ padding: '0.75rem' }}>{game.desenvolvedor}</td>
    </tr>
  </tbody>
</table>

        )}
      </div>
    </div>
  );
}
