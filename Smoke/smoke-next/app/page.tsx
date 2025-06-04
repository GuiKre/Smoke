'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1f2937',
      color: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#00BFFF',
      }}>
        SMOKE
      </h1>
      <p style={{
        fontSize: '1.25rem',
        maxWidth: '600px',
        lineHeight: '1.75',
        color: '#d1d5db',
      }}>
        Bem-vindo ao Smoke! Um sistema para gerenciar sua coleção de jogos de videogame. 
        Aqui você pode cadastrar novos jogos, visualizar sua lista, editar informações e remover jogos facilmente.
      </p>
    </div>
  );
};
