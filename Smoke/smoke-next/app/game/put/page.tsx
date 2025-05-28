'use client';

import { useState } from 'react';

export default function EditarJogo() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const editar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5016/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          nome,
          genero,
          desenvolvedor,
        }),
      });

      if (!resposta.ok) throw new Error('Erro ao editar o jogo');

      setMensagem('🎉 Jogo editado com sucesso!');
      setId('');
      setNome('');
      setGenero('');
      setDesenvolvedor('');
    } catch (err: any) {
      setMensagem(`⚠️ ${err.message}`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1f2937',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        background: '#C0C0C0',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          color: '#111827',
          textAlign: 'center',
        }}>
          Editar Jogo
        </h1>

        <form onSubmit={editar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="ID do Jogo"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={inputEstilo}
          />
          <input
            type="text"
            placeholder="Novo nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputEstilo}
          />
          <input
            type="text"
            placeholder="Novo gênero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            style={inputEstilo}
          />
          <input
            type="text"
            placeholder="Novo desenvolvedor"
            value={desenvolvedor}
            onChange={(e) => setDesenvolvedor(e.target.value)}
            style={inputEstilo}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Salvar Alterações
          </button>
        </form>

        {mensagem && (
          <p style={{
            marginTop: '1rem',
            color: mensagem.includes('sucesso') ? '#10b981' : '#ef4444',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

// Estilo comum para os inputs
const inputEstilo: React.CSSProperties = {
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  outlineColor: '#3b82f6',
};
