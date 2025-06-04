# 📚 Smoke

> Sistema para cadastro e gerenciamento de jogos de videogame.

## 🧾 Descrição

**Smoke** é uma aplicação web que simula o controle de um acervo de jogos de videogame.  
O sistema permite realizar o cadastro, listagem, busca, edição e exclusão de jogos de forma prática e organizada.

> "Esta API simula o funcionamento de uma plataforma de gerenciamento de biblioteca de jogos, como se fosse um acervo pessoal ou um sistema para uma pequena locadora de games."

---

## 👥 Integrantes da Dupla

- Guilherme Krelling - [Guikre](https://github.com/GuiKre)
- Tobias Albieri - [Tingoio](https://github.com/Tingoio)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C# (.NET 8)
- **Framework:** ASP.NET Core
- **ORM:** Entity Framework Core
- **Banco de Dados:** MySQL
- **Front-end:** Next.js (React + TypeScript)
- **Versionamento:** Git + GitHub

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- [Node.js + npm](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Git instalado

---

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Guikre/smoke

# 2. Acesse a pasta do projeto backend
cd .\Smoke\Smoke\

# 3. Altere a senha do banco de dados, para sua senha local
arquivo "appsettings.json" > password:"sua senha"

# 4. Restaure os pacotes
dotnet restore

# 5. Aplique as migrações
dotnet ef database update

# 6. Execute a API
dotnet run

# 7. Abra um segundo terminal
Terminal > New Terminal

# 8. Acesse a pasta do projeto frontend
cd .\Smoke\Smoke\smoke-next

# 9. Instale as dependências
npm install

# 10. Inicie o servidor de desenvolvimento
npm run dev
