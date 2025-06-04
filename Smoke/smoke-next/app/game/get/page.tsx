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
        setErro(`⚠️ ${err.message}`);
      }
    };

    fetchGames();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1f2937',
        color: '#f3f4f6',
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
          maxWidth: '800px',
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

        {erro ? (
          <p
            style={{
              color: '#ef4444',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {erro}
          </p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f9fafb',
            color: '#111827',
            borderRadius: '0.5rem',
            overflow: 'hidden',
          }}>
            <thead style={{ backgroundColor: '#e5e7eb' }}>
              <tr>
                <th style={thEstilo}>ID</th>
                <th style={thEstilo}>Nome</th>
                <th style={thEstilo}>Gênero</th>
                <th style={thEstilo}>Desenvolvedor</th>
              </tr>
            </thead>
            <tbody>
              {games.map((g) => (
                <tr key={g.id} style={{ textAlign: 'center' }}>
                  <td style={tdEstilo}>{g.id}</td>
                  <td style={tdEstilo}>{g.nome}</td>
                  <td style={tdEstilo}>{g.genero}</td>
                  <td style={tdEstilo}>{g.desenvolvedor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const thEstilo: React.CSSProperties = {
  padding: '0.75rem',
  fontWeight: 'bold',
  borderBottom: '2px solid #d1d5db',
};

const tdEstilo: React.CSSProperties = {
  padding: '0.75rem',
  borderBottom: '1px solid #d1d5db',
};
