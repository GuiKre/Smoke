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
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Lista de jogos</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {games.map(g => (
          <li key={g.id}>
            #{g.id} - {g.nome} ({g.genero}) {g.desenvolvedor}
          </li>
        ))}
      </ul>
    </div>
  );
}
