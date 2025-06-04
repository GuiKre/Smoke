'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#374151', // navbar mais clara que o fundo do corpo (#1f2937)
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{
        color: '#00BFFF',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        letterSpacing: '1px',
      }}>
        SMOKE
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink href="/" text="HOME" />
        <NavLink href="/game/getid" text="Pesquisar" />
        <NavLink href="/game/get" text="Listar" />
        <NavLink href="/game/post" text="Cadastrar" />
        <NavLink href="/game/put" text="Editar" />
        <NavLink href="/game/delete" text="Deletar" />
      </div>
    </nav>
  );
}

// Componente com efeito hover nos links
function NavLink({ href, text }: { href: string, text: string }) {
  return (
    <Link
      href={href}
      style={{
        color: '#f3f4f6',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#f3f4f6')}
    >
      {text}
    </Link>
  );
}
