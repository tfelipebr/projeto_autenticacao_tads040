# Front-end de Login com Next.js, React e TypeScript

Este projeto é um exemplo de **tela de login** construída com Next.js (Pages Router), React e TypeScript, que se comunica com um backend via API REST utilizando **axios**. Após autenticar com sucesso, o usuário é redirecionado para uma página de boas-vindas.

## 📁 Estrutura de Diretórios

```bash
my-project/
├── src/                 # código auxiliar, hooks, components, etc.
      ├── pages/
      │   ├── index.tsx        # Tela de Login
      │   └── welcome.tsx      # Tela de Boas-vindas pós-login
      ├── styles/
      │   └── Login.module.css # Estilos em CSS Modules para a página de login
├── public/              # Imagens, favicon e ativos estáticos
├── .gitignore
├── next.config.ts       # Configurações do Next.js
├── package.json
├── tsconfig.json        # Configurações do TypeScript
└── README.md
```

## 🚀 Pré-requisitos

* **Node.js** (versão 14 ou superior)
* **npm** (ou **yarn**)
* Backend disponível em `http://localhost:8080/api/auth/login`

  * Deve aceitar requisição POST com payload `{ nomeUsuario, senha }` e devolver JSON:

    ```jsonc
    // Sucesso
    { "sucesso": true, "mensagem": "Login bem-sucedido" }

    // Falha (ex: credenciais inválidas)
    { "sucesso": false, "mensagem": "Credenciais inválidas" }
    ```

## ⚙️ Instalação e Execução

1. Clone este repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd my-project
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra no navegador:

   ```
   http://localhost:3000
   ```

## 🔄 Fluxo de Login

1. Acesse `http://localhost:3000` e preencha **Usuário** e **Senha**.
2. Ao clicar em **Entrar**, faz-se um `POST` para `http://localhost:8080/api/auth/login` via axios.
3. Se o backend responder `{ sucesso: true }`, o usuário é redirecionado para `/welcome?user=<nome>`.
4. Se `{ sucesso: false }`, a mensagem de erro retornada (`mensagem`) é exibida em tela.


## 🛠️ Principais Tecnologias

* [Next.js](https://nextjs.org/) (Pages Router)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Axios](https://axios-http.com/)
* CSS Modules

---

## 📝 Customização

* **URL do backend**: altere em `pages/index.tsx` conforme necessário.
* **Estilos**: ajuste `styles/Login.module.css` para outras cores, fontes ou layout.
* **Rotas**: adicione novas páginas em `pages/` seguindo a convenção `<nome>.tsx`.

---

> **Dica:** para produção, configure variáveis de ambiente (`.env.local`) e use `NEXT_PUBLIC_API_URL` em vez de código fixo.


