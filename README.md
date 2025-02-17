# 📚 Gerenciador de Notas Escolares

## 📌 Descrição
Este é o projeto final para obtenção do certificado do curso de Vue.js. O objetivo é desenvolver um sistema de gerenciamento de notas escolares, permitindo o cadastro, listagem, filtragem, alteração e exclusão de alunos.

## 🚀 Funcionalidades

### ✅ Cadastro
- O usuário poderá cadastrar um aluno informando:
  - Nome do aluno (campo obrigatório)
  - Primeira nota (entre 0 e 10)
  - Segunda nota (entre 0 e 10)
- Validação de entrada dos dados para garantir que as informações sejam inseridas corretamente.

### 📋 Listagem
- Exibição dos alunos cadastrados em uma tabela contendo:
  - Nome do aluno
  - Primeira nota
  - Segunda nota
  - Média das notas
  - Situação do aluno:
    - **Aprovado(a)**: Média entre **7.0 e 10.0**
    - **Em exame**: Média entre **5.0 e 6.9**
    - **Reprovado(a)**: Média entre **0.0 e 4.9**

### 🔎 Filtragem
- Permite filtrar alunos pelo nome para facilitar a busca de informações.

### ✏️ Alteração
- Permite modificar o nome e as notas dos alunos cadastrados.

### ❌ Exclusão
- Permite remover um aluno da listagem.

## 🛠️ Tecnologias Utilizadas
- Vue.js
- Vue Router
- Axios (para consumo de API fake JSON-server, se necessário)
- Bootstrap  (para estilização)

## ▶️ Como Executar o Projeto

### 1️⃣ Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Vue CLI](https://cli.vuejs.org/) instalados.

### 2️⃣ Instalação
```sh
# Clone este repositório
git clone https://github.com/seu-usuario/gerenciador-notas.git

# Acesse a pasta do projeto
cd gerenciador-notas

# Instale as dependências
npm install
```

### 3️⃣ Executando o Projeto
```sh
# Inicie o servidor de desenvolvimento
npm run dev
```
O projeto estará disponível em `http://localhost:5173` (ou outra porta especificada pelo Vite).

### 4️⃣ Configurando API Fake
Se desejar usar uma API fake para persistência dos dados, instale o JSON Server:
```sh
npm install -g json-server
```
Depois, crie um arquivo `db.json` com a estrutura inicial:
```json
{
  "alunos": []
}
```
E execute:
```sh
json-server --watch db.json --port 3001
```
A API estará disponível em `http://localhost:3001/alunos`.

## 🎨 Layout
Caso tenha um layout ou wireframe, inclua aqui uma imagem ou link para o Figma.

## 📌 Contribuição
Se desejar contribuir com melhorias para este projeto, fique à vontade para enviar um pull request!

## 🏆 Certificação
Este projeto faz parte do desafio final do curso de Vue.js. Complete todas as funcionalidades e obtenha seu certificado!

---
Feito com ❤️ por Marcelo Jhones

