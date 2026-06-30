🇧🇷 README – API (Português BR)
FECAF Flix – API
API desenvolvida por William Kerpen para o curso de Análise e Desenvolvimento de Sistemas (ADS) da Faculdade FECAF.
Este projeto foi criado com apoio de IA Generativa Assistida para acelerar desenvolvimento, documentação e boas práticas.

📌 Sobre o Projeto
A API FECAF Flix é responsável por gerenciar:

Cadastro de filmes

Upload de capas e vídeos

Streaming de vídeos com suporte a Range

Autenticação de administradores

Cadastro de gêneros

Listagem de usuários

Busca de filmes

A API segue arquitetura REST e foi construída para ser consumida por um front-end simples e responsivo.

🛠 Tecnologias Utilizadas
Node.js

Express.js

MySQL / MariaDB

JWT (autenticação)

Multer (upload de arquivos)

fs / streams para vídeos

CORS

Dotenv

📂 Estrutura Geral
Código
/src
  /controllers
  /routes
  /services
  /database
  /uploads
  /public
▶️ Como Rodar
Instale dependências:

Código
npm install
Configure o arquivo .env com:

Código
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
Inicie o servidor:

Código
npm start
A API rodará em:

Código
http://localhost:3000
🎬 Streaming de Vídeo
A API suporta streaming com cabeçalho Range, permitindo reprodução eficiente no navegador.

🔐 Autenticação
A API utiliza JWT.
Endpoints protegidos exigem:

Código
Authorization: Bearer <token>
👨‍💻 Autor
Projeto desenvolvido por William Kerpen  
Curso: ADS – Faculdade FECAF  
Com apoio de IA Generativa Assistida.

🇺🇸 README – API (English)
FECAF Flix – API
API developed by William Kerpen for the Systems Analysis and Development course at FECAF University.
This project was created with support from Assisted Generative AI to accelerate development and documentation.

📌 About the Project
FECAF Flix API manages:

Movie registration

Cover and video upload

Video streaming with Range support

Admin authentication

Genre management

User listing

Movie search

The API follows REST architecture and is designed to be consumed by a simple and responsive front-end.

🛠 Technologies
Node.js

Express.js

MySQL / MariaDB

JWT

Multer

File streaming

CORS

Dotenv

📂 Structure
Código
/src
  /controllers
  /routes
  /services
  /database
  /uploads
  /public
▶️ How to Run
Install dependencies:

Código
npm install
Configure .env:

Código
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
Start the server:

Código
npm start
API available at:

Código
http://localhost:3000
🎬 Video Streaming
The API supports Range-based streaming, allowing efficient playback in browsers.

🔐 Authentication
Protected routes require:

Código
Authorization: Bearer <token>
👨‍💻 Author
Developed by William Kerpen  
Course: Systems Analysis and Development – FECAF  
With support from Assisted Generative AI.
