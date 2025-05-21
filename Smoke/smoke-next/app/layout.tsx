import "./globals.css";
import Navbar from './game/navbar';

export const metadata = {
  title: "Smoke App",
  description: "Aplicativo Smoke",
};

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
