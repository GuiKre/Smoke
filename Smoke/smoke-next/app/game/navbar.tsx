'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c2c2c',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      fontFamily: 'Arial, sans-serif',
      fontSize: '1rem',
    }}>
      <Link href="/">HOME</Link>
      <Link href="/game/get">Listar</Link>
      <Link href="/game/post">Cadastrar</Link>
      <Link href="/game/put">Editar</Link>
      <Link href="/game/delete">Deletar</Link>
    </nav>
  );
}