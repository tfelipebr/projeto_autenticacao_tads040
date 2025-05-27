# Autenticação Spring Boot + Next.js

Este repositório reúne dois projetos independentes que juntos compõem um sistema de login simples:

- **backend-login**: API REST de autenticação em Spring Boot (Java 17 + MySQL).  
- **front-end**: tela de login em Next.js (React + TypeScript) que consome a API de autenticação.

---

## 📂 Estrutura de diretórios

```bash
.
├── backend-login/      # Projeto Spring Boot
│   ├── src/
│   ├── mvnw
│   ├── pom.xml
│   └── README.md       # Documentação específica do backend
└── front-end/          # Projeto Next.js
    ├── pages/
    ├── public/
    ├── styles/
    ├── package.json
    ├── tsconfig.json
    └── README.md       # Documentação específica do frontend
````

---

## 🚀 Pré-requisitos globais

* **Java 17**
* **Maven** (ou use o wrapper `./mvnw`)
* **Node.js** v14+ e **npm** (ou **yarn**)
* **MySQL 8+**

---

## 🔧 Como rodar

### 1. Backend (Spring Boot)

```bash
# entre na pasta do backend
cd backend-login

# crie o banco e a tabela (ou ajuste o nome no application.properties)
# exemplo:
# CREATE DATABASE backend_login;
# USE backend_login;
# ... veja o script em backend-login/README.md

# configure as credenciais em src/main/resources/application.properties

# inicie a aplicação
# Linux/macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

> A API ficará disponível em `http://localhost:8080/api/auth/login`.

---

### 2. Front-end (Next.js)

```bash
# em outra janela de terminal
cd front-end

# instale as dependências
npm install
# ou
yarn

# inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

> A aplicação de login irá rodar em `http://localhost:3000` e fará chamadas ao backend em `http://localhost:8080/api/auth/login`.

---

## 🛠️ Tecnologias

| Camada   | Tecnologias                                                               |
| -------- | ------------------------------------------------------------------------- |
| Backend  | Java 17 · Spring Boot 3.5.0 · Spring Data JPA · MySQL Connector/J · Maven |
| Frontend | Next.js · React · TypeScript · Axios · CSS Modules                        |

---

## 📖 Mais detalhes

Cada sub-pasta (`backend-login` e `front-end`) já possui um próprio `README.md` com:

* Descrição do projeto
* Estrutura interna
* Configuração de variáveis de ambiente
* Exemplos de uso e endpoints

---

## 🤝 Contribuição

1. Faça um fork e crie sua branch (`git checkout -b minha-feature`)
2. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
3. Push para a branch (`git push origin minha-feature`)
4. Abra um Pull Request

