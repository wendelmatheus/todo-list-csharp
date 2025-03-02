O projeto consiste em uma simples To Do List.

Após clonar o projeto, você deverá ter um banco de dados PostgreSQL (seja no seu pc ou hospedado em algum lugar), então, na raiz do projeto, crie um arquivo ".env.development" para configurar as strings de conexão do seu banco, são elas:

DB_HOST=servidor
DB_PORT=porta (geralmente 5432)
DB_DATABASE=nomeDoBanco
DB_USERNAME=seuUsuario
DB_PASSWORD=suaSenha

Após isso, instale todas as dependências do package.json com "pnpm i" ou "npm i".

E finalmente, inicie o projeto com "pnpm dev" ou "npm run dev".

Foi configurado no package.json para iniciar o servidor logo após o React, então pode demorar alguns segundos.

Após isso, aproveite :D
