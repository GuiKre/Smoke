"use client";

import { useState } from 'react';

type Game = {
  id: number;
  nome: string;
  tipo: string;
};

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [game, setGame] = useState<Game | null>(null);
  const [erro, setErro] = useState<string>('');

  const buscarGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setGame(null);

    try {
      const resposta = await fetch(`http://localhost:5124/api/game/${input}`);

      if (!resposta.ok) {
        throw new Error('Jogo não encontrado.');
      }

      const dados = await resposta.json();

      setGame({
        id: dados.id,
        nome: dados.nome,
        tipo: dados.tipo,
      });

    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Buscar Jogo</h1>
      <br/>
      <form onSubmit={buscarGame}>
        <input
          type="text"
          placeholder="Digite o ID do Jogo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem', marginLeft: '1rem' }}>
          Buscar
        </button>
      </form>

      {erro && <p style={{ color: 'red', marginTop: '30px' }}>{erro}</p>}

      {game && (
        <div style={{ marginTop: '2rem' }}>
          <h2>#{game.id} - {game.nome}</h2>
          <p>{game.tipo}</p>
        </div>
      )}
    </div>
  );
}