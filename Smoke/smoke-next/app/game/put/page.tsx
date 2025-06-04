'use client';

import { useState } from 'react';

export default function EditarJogo() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');

  const [fieldErrors, setFieldErrors] = useState<{ id?: string; nome?: string; genero?: string; desenvolvedor?: string }>({});
  const [submitStatusMessage, setSubmitStatusMessage] = useState('');

  const editar = async (e: React.FormEvent) => {
    e.preventDefault(); //
    setFieldErrors({});
    setSubmitStatusMessage('');

    if (!id || isNaN(Number(id))) {
      setFieldErrors({ id: 'O ID do jogo é obrigatório e deve ser um número válido.' });
      setSubmitStatusMessage('⚠️ Erro ao editar o jogo!');
      return;
    }

    try {
      const gameDataParaEnviar = {
        id: Number(id),
        nome,
        genero,
        desenvolvedor,
      };

      const resposta = await fetch(`http://localhost:5016/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameDataParaEnviar),
      });

      if (!resposta.ok) { //
        const errorData = await resposta.json().catch(() => resposta.text());

        if (resposta.status === 400 && errorData && typeof errorData === 'object' && errorData.errors) {
          const newFieldErrors: { id?: string; nome?: string; genero?: string; desenvolvedor?: string } = {};
          for (const fieldKey in errorData.errors) {
            const frontendKey = fieldKey.toLowerCase() as keyof typeof newFieldErrors;
            if (errorData.errors[fieldKey] && errorData.errors[fieldKey].length > 0) {
              newFieldErrors[frontendKey] = errorData.errors[fieldKey].join(' ');
            }
          }
          setFieldErrors(newFieldErrors);
          setSubmitStatusMessage('⚠️ Verifique os campos destacados.');
        } else if (errorData && typeof errorData === 'object' && errorData.title) {
            setSubmitStatusMessage(`⚠️ ${errorData.title}`);
        } else if (errorData && typeof errorData === 'object' && errorData.message) {
           setSubmitStatusMessage(`⚠️ ${errorData.message}`);
        } else if (typeof errorData === 'string' && errorData.length > 0) {
           setSubmitStatusMessage(`⚠️ ${errorData}`);
        } else {
           setSubmitStatusMessage(`⚠️ Erro ${resposta.status} ao editar o jogo.`);
        }
        return;
      }

      setSubmitStatusMessage('🎉 Jogo editado com sucesso!');
      setId('');
      setNome('');
      setGenero('');
      setDesenvolvedor('');
      setFieldErrors({});
    } catch (err: any) {
      console.error("Erro na requisição de edição:", err);
      if (!submitStatusMessage || !submitStatusMessage.startsWith('⚠️')) {
          setSubmitStatusMessage(`⚠️ Falha ao comunicar com o servidor: ${err.message}`);
      }
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outlineColor: '#3b82f6',
    width: '100%',
    boxSizing: 'border-box',
  };

  const errorTextStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '0.2rem',
    minHeight: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
    marginTop: '0.5rem',
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

        <form onSubmit={editar} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <input
              type="text"
              placeholder="ID do Jogo"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (fieldErrors.id) setFieldErrors(prev => ({ ...prev, id: undefined }));
              }}
              style={{ ...inputStyle, borderColor: fieldErrors.id ? '#ef4444' : '#d1d5db' }}
            />
            {fieldErrors.id && <p style={errorTextStyle}>{fieldErrors.id}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Novo nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (fieldErrors.nome) setFieldErrors(prev => ({ ...prev, nome: undefined }));
              }}
              style={{ ...inputStyle, borderColor: fieldErrors.nome ? '#ef4444' : '#d1d5db' }}
            />
            {fieldErrors.nome && <p style={errorTextStyle}>{fieldErrors.nome}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Novo gênero"
              value={genero}
              onChange={(e) => {
                setGenero(e.target.value);
                if (fieldErrors.genero) setFieldErrors(prev => ({ ...prev, genero: undefined }));
              }}
              style={{ ...inputStyle, borderColor: fieldErrors.genero ? '#ef4444' : '#d1d5db' }}
            />
            {fieldErrors.genero && <p style={errorTextStyle}>{fieldErrors.genero}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Novo desenvolvedor"
              value={desenvolvedor}
              onChange={(e) => {
                setDesenvolvedor(e.target.value);
                if (fieldErrors.desenvolvedor) setFieldErrors(prev => ({ ...prev, desenvolvedor: undefined }));
              }}
              style={{ ...inputStyle, borderColor: fieldErrors.desenvolvedor ? '#ef4444' : '#d1d5db' }}
            />
            {fieldErrors.desenvolvedor && <p style={errorTextStyle}>{fieldErrors.desenvolvedor}</p>}
          </div>
          
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Salvar Alterações
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