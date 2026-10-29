<div align="center">

# ⚛️ Projeto React 02 — Conceitos

**SENAI · Frameworks Front-end · Prof. Me. Deivison S. Takatu**

Aplicação React da atividade da **Aula 09 — Projeto React 02** — por **Gustavo Ribas Silestrino**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 📝 Descrição

Aplicação React que reúne **os cinco conceitos estudados na Aula 09** — State e useState,
formulários, useEffect, consumo de APIs e React Router — cada um na sua própria página.

A navegação é feita pelo **React Router**: cada conceito tem uma URL própria e a página
pode ser aberta, recarregada ou compartilhada diretamente pelo endereço. Em cada página há
três camadas: a **explicação** do conceito, o **código** correspondente e uma
**demonstração que funciona de verdade**, para ser usada na apresentação.

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🧭 **Navegação por URL** | 4 rotas + rota curinga, com menu que destaca a página ativa |
| 🔢 **Contador com passo** | Incremento, decremento e zerar, com passo ajustável de 1 a 10 |
| ⚖️ **Variável comum × state** | Comparação lado a lado do que atualiza a tela e do que não atualiza |
| 📋 **Formulário de inscrição** | 5 campos controlados, validação, envio sem recarregar e lista de inscritos |
| 🔍 **Estado em tempo real** | O objeto do formulário exibido em JSON enquanto é digitado |
| ⏱️ **Relógio** | `setInterval` com função de limpeza, que pode ser ligado e desligado |
| 📐 **Largura da janela** | Listener de `resize` com remoção na limpeza |
| 🔁 **Contador de execuções** | Mostra quantas vezes um efeito rodou conforme a dependência muda |
| 🌐 **GET com fetch** | 5 publicações do JSONPlaceholder, com carregando, erro, vazio e repetir |
| 🗺️ **Busca encadeada** | Estados e municípios do IBGE, com o efeito dependendo da UF escolhida |
| 📤 **POST com fetch** | Envio de uma publicação, com validação e resposta da API na tela |
| 🚫 **Páginas de erro** | 404 da aplicação e aviso para um `:id` de conceito inexistente |
| 🏷️ **Título da aba** | Muda conforme a página, por um `useEffect` com dependência |
| 🌓 **Tema e responsivo** | Claro e escuro automático, do desktop até o celular |

---

## 🧩 Conceitos utilizados

### 1. State e useState — `src/conceitos/StateUseState.jsx`

Três estados independentes no mesmo componente (`contador`, `passo`, `renderizacoes`),
atualizados pela forma de função — `setContador((valor) => valor + passo)` — que parte
sempre do valor mais recente. A página também demonstra, lado a lado, por que uma variável
comum não basta: ela muda na memória, mas não pede uma nova renderização.

### 2. Formulários — `src/conceitos/Formularios.jsx`

Cinco **campos controlados** (texto, e-mail, `select`, `textarea` e `checkbox`) presos a um
único objeto de estado, atualizados por um só handler através do atributo `name`. O envio
usa `onSubmit` com `preventDefault()`, valida nome, e-mail e aceite, e exibe a mensagem de
erro condicionalmente. O estado do formulário é mostrado em JSON em tempo real.

### 3. useEffect — `src/conceitos/UseEffect.jsx`

Três efeitos, cada um com um papel diferente:

| Efeito | Dependências | Limpeza |
|---|---|---|
| Relógio com `setInterval` | `[relogioLigado]` | `clearInterval` |
| Listener de `resize` | `[]` | `removeEventListener` |
| Contador de execuções | `[etiqueta]` | — |

Há ainda o hook `useTituloDaAba`, em `src/hooks/useTituloDaAba.js`, que sincroniza
`document.title` com o título da página — `useEffect(..., [titulo])`.

### 4. Consumo de APIs — `src/conceitos/ConsumoApis.jsx`

Três requisições reais, todas com `AbortController` na limpeza do efeito e verificação de
`resposta.ok`:

| Requisição | API | O que demonstra |
|---|---|---|
| `GET /posts?_limit=5` | JSONPlaceholder | Carregando, sucesso, erro, lista vazia e repetir |
| `GET /localidades/estados` | IBGE | Busca na montagem, com `[]` nas dependências |
| `GET .../{uf}/municipios` | IBGE | Dependência `[uf]`: o efeito roda só quando a UF muda |
| `POST /posts` | JSONPlaceholder | `headers`, `JSON.stringify()` e a resposta da API na tela |

### 5. React Router — `src/App.jsx`, `src/components/Layout.jsx`, `src/conceitos/RoteamentoReact.jsx`

| Recurso | Onde |
|---|---|
| `BrowserRouter` | `src/main.jsx`, envolvendo a aplicação |
| `Routes` e `Route` | `src/App.jsx` |
| Rota aninhada com `Outlet` | `Layout` é a rota pai de todas as páginas |
| `Link` e `NavLink` | Cartões do início e menu do topo, com a classe `active` |
| Parâmetro `:id` + `useParams` | Um único `Route` atende os cinco conceitos |
| `useLocation` | Mostra o caminho atual e monta a página 404 |
| `useNavigate` | Navegação por código, incluindo voltar no histórico |
| Rota curinga `*` | Página 404 da aplicação |

---

## 🗂️ Estrutura

```
projeto-react-02/
├── src/
│   ├── main.jsx                    # BrowserRouter
│   ├── App.jsx                     # Routes e Route
│   ├── conceitos.js                # registro dos conceitos
│   ├── components/
│   │   ├── Layout.jsx              # rota pai: menu, Outlet e rodapé
│   │   ├── Codigo.jsx
│   │   └── Demo.jsx
│   ├── pages/
│   │   ├── Home.jsx                # /
│   │   ├── Conceito.jsx            # /conceito/:id
│   │   ├── Sobre.jsx               # /sobre
│   │   └── NaoEncontrada.jsx       # *
│   ├── conceitos/
│   │   ├── StateUseState.jsx
│   │   ├── Formularios.jsx
│   │   ├── UseEffect.jsx
│   │   ├── ConsumoApis.jsx
│   │   └── RoteamentoReact.jsx
│   ├── hooks/useTituloDaAba.js
│   └── styles/global.css
├── index.html
├── vercel.json                     # redireciona as rotas para index.html
└── package.json
```

---

## ▶️ Como executar

```bash
npm install
npm run dev
```

Build de produção: `npm run build`. Lint: `npm run lint`.

> As demonstrações de consumo de API dependem de conexão com a internet e da
> disponibilidade do [JSONPlaceholder](https://jsonplaceholder.typicode.com) e da
> [API de Localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades).

---

## 🛠️ Tecnologias

React 19, React Router 7, Vite e CSS puro.

---

<div align="center">

**Gustavo Ribas Silestrino**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GustavoRibasSilestrino)

</div>
