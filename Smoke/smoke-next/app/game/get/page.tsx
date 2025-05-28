'use client';

import { useEffect, useState } from 'react';

type Game = {
  id: number;
  nome: string;
  genero: string;
  desenvolvedor: string;
};

export default function TodosGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const resposta = await fetch('http://localhost:5016/api/games');
        if (!resposta.ok) throw new Error('Erro ao buscar jogos');

        const dados = await resposta.json();
        setGames(dados);
      } catch (err: any) {
        setErro(err.message);
      }
    };

    fetchGames();
  }, []);

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
          maxWidth: '400px',
        }}
      >
        <h1
          style={{
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            color: '#111827',
            textAlign: 'center',
          }}
        >
          Lista de Jogos
        </h1>

        {erro && (
          <p
            style={{
              color: '#ef4444',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {erro}
          </p>
        )}

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            color: '#111827',
            fontSize: '1rem',
          }}
        >
          {games.map((g) => (
            <li key={g.id} style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <strong>#{g.id}</strong> - {g.nome} ({g.genero}) <em>{g.desenvolvedor}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
