'use client';

import { useState, } from 'react';

export default function NovoGame() {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');

  const [fieldErrors, setFieldErrors] = useState<{ nome?: string; genero?: string; desenvolvedor?: string }>({});
  const [submitStatusMessage, setSubmitStatusMessage] = useState('');

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitStatusMessage('');

    try {
      const resposta = await fetch('http://localhost:5016/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, genero, desenvolvedor })
      });

      if (!resposta.ok) {
        const errorData = await resposta.json();
        if (resposta.status === 400 && errorData.errors) {
          const newFieldErrors: { nome?: string; genero?: string; desenvolvedor?: string } = {};
          for (const backendFieldName in errorData.errors) {
            const frontendFieldName = backendFieldName.toLowerCase() as keyof typeof newFieldErrors;
            if (errorData.errors[backendFieldName] && errorData.errors[backendFieldName].length > 0) {
              newFieldErrors[frontendFieldName] = errorData.errors[backendFieldName].join(' ');
            }
          }
          setFieldErrors(newFieldErrors);
          setSubmitStatusMessage('⚠️ Erro ao cadastrar oo jogo!');
        } else if (errorData.title) {
          setSubmitStatusMessage(`⚠️ ${errorData.title}`);
          setFieldErrors({});
        } else if (errorData.message) {
           setSubmitStatusMessage(`⚠️ ${errorData.message}`);
           setFieldErrors({});
        } else {
          setSubmitStatusMessage(`⚠️ Erro ${resposta.status} ao processar a solicitação.`);
          setFieldErrors({});
        }
        return;
      }

      setSubmitStatusMessage('🎉 Jogo cadastrado com sucesso!');
      setFieldErrors({});
      setNome('');
      setGenero('');
      setDesenvolvedor('');

    } catch (err: any) {
      console.error("Erro na requisição:", err);
      if (!submitStatusMessage.startsWith('⚠️')) {
         setSubmitStatusMessage(`⚠️ Falha na comunicação com o servidor: ${err.message}`);
      }
      setFieldErrors({});
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outlineColor: '#3b82f6',
    width: '100%',
    boxSizing: 'border-box'
  };

  const errorTextStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '0.2rem',
    minHeight: '1rem',
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
          Cadastrar Novo Jogo
        </h1>
      <form onSubmit={cadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (fieldErrors.nome) setFieldErrors(prev => ({ ...prev, nome: undefined }));
            }}
            style={{ ...inputStyle, borderColor: fieldErrors.nome ? '#ef4444' : '#d1d5db' }}
          />
          <p style={errorTextStyle}>{fieldErrors.nome || ''}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Gênero"
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
              if (fieldErrors.genero) setFieldErrors(prev => ({ ...prev, genero: undefined }));
            }}
            style={{ ...inputStyle, borderColor: fieldErrors.genero ? '#ef4444' : '#d1d5db' }}
          />
          <p style={errorTextStyle}>{fieldErrors.genero || ''}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Desenvolvedor"
            value={desenvolvedor}
            onChange={(e) => {
              setDesenvolvedor(e.target.value);
              if (fieldErrors.desenvolvedor) setFieldErrors(prev => ({ ...prev, desenvolvedor: undefined }));
            }}
            style={{ ...inputStyle, borderColor: fieldErrors.desenvolvedor ? '#ef4444' : '#d1d5db' }}
          />
          <p style={errorTextStyle}>{fieldErrors.desenvolvedor || ''}</p>
        </div>

        <button
            type="submit"
            style={{
              padding: '0.75rem',
              marginTop: '0.5rem',
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
            Cadastrar
        </button>
      </form>
      {submitStatusMessage && (
          <p style={{
            marginTop: '1rem',
            color: submitStatusMessage.includes('sucesso') ? '#10b981' : '#ef4444',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {submitStatusMessage}
          </p>
        )}
      </div>
    </div>
  );
}