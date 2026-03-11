# VARD Store - Fullstack E-commerce de Sneakers

Aplicacao fullstack de catalogo e gerenciamento de sneakers construida com React, Node.js, Express, MongoDB e autenticacao JWT.

## Visao Geral

VARD Store e uma plataforma e-commerce focada em sneakers que permite aos usuarios navegar pelo catalogo de produtos, criar uma conta, e gerenciar o inventario de tenis. O sistema conta com autenticacao completa, CRUD de produtos e interface responsiva.

## Tecnologias

### Frontend
- **React 18** - Biblioteca UI com hooks e Context API
- **TypeScript** - Tipagem estatica
- **Vite 5** - Bundler e dev server com HMR
- **React Router v6** - Roteamento SPA com rotas protegidas
- **Axios** - Cliente HTTP com interceptors
- **Tailwind CSS 3** - Framework CSS utility-first
- **PostCSS + Autoprefixer** - Processamento CSS

### Backend
- **Node.js + Express 4** - API REST
- **TypeScript** - Tipagem estatica
- **Mongoose 8** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticacao baseada em tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Middleware cross-origin
- **dotenv** - Variaveis de ambiente

### Banco de Dados
- **MongoDB** - Banco de dados NoSQL

## Estrutura do Projeto

```
├── src/                          # API raiz (Express 5 - hello world)
│   └── index.ts
├── projeto-fullstack/
│   ├── backend/
│   │   └── src/
│   │       ├── server.ts         # Entry point do servidor
│   │       ├── app.ts            # Configuracao Express
│   │       ├── config/
│   │       │   └── database.ts   # Conexao MongoDB
│   │       ├── middlewares/
│   │       │   └── auth.ts       # Middleware JWT
│   │       ├── modules/
│   │       │   ├── user/         # Modulo de usuarios
│   │       │   │   ├── model.ts
│   │       │   │   ├── dto.ts
│   │       │   │   ├── service.ts
│   │       │   │   ├── controller.ts
│   │       │   │   └── routes.ts
│   │       │   └── sneaker/      # Modulo de sneakers
│   │       │       ├── model.ts
│   │       │       ├── dto.ts
│   │       │       ├── service.ts
│   │       │       ├── controller.ts
│   │       │       └── routes.ts
│   │       └── routes/
│   │           └── index.ts      # Roteador principal
│   └── frontend/
│       └── src/
│           ├── main.tsx          # Entry point React
│           ├── App.tsx           # Componente principal
│           ├── api/
│           │   └── api.ts        # Instancia Axios com interceptors
│           ├── components/       # Componentes reutilizaveis
│           │   ├── Button/
│           │   ├── Card/
│           │   ├── Navbar/
│           │   └── SneakerCard/
│           ├── contexts/
│           │   └── AuthContext.tsx
│           ├── hooks/
│           │   └── useLocalStorage.ts
│           ├── pages/            # Paginas da aplicacao
│           │   ├── Home/
│           │   ├── Login/
│           │   ├── Register/
│           │   ├── Sneakers/
│           │   ├── CreateSneaker/
│           │   └── EditSneaker/
│           ├── routes/
│           │   └── AppRoutes.tsx
│           ├── services/         # Servicos de API
│           │   ├── userService.ts
│           │   └── sneakerService.ts
│           └── types/
│               └── index.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

## Endpoints da API

### Usuarios
| Metodo | Rota | Auth | Descricao |
|--------|------|------|-----------|
| POST | `/api/users/register` | Nao | Registrar novo usuario |
| POST | `/api/users/login` | Nao | Login (retorna JWT) |
| GET | `/api/users` | Sim | Listar todos os usuarios |
| GET | `/api/users/:id` | Sim | Buscar usuario por ID |
| DELETE | `/api/users/:id` | Sim | Excluir usuario |

### Sneakers
| Metodo | Rota | Auth | Descricao |
|--------|------|------|-----------|
| GET | `/api/sneakers` | Nao | Listar sneakers (filtro por `?brand=`) |
| GET | `/api/sneakers/:id` | Nao | Detalhe do sneaker |
| POST | `/api/sneakers` | Sim | Criar novo sneaker |
| PUT | `/api/sneakers/:id` | Sim | Atualizar sneaker |
| DELETE | `/api/sneakers/:id` | Sim | Excluir sneaker |

### Health Check
| Metodo | Rota | Auth | Descricao |
|--------|------|------|-----------|
| GET | `/health` | Nao | Status do servidor |

## Arquitetura

### Backend
- **Modular por feature** - Cada entidade (user, sneaker) tem seu proprio modulo
- **MVC + Service Layer** - Model, Service, Controller e Routes separados
- **DTOs** - Data Transfer Objects para validacao de entrada/saida
- **Middleware JWT** - Protecao de rotas autenticadas

### Frontend
- **Context API** - Gerenciamento de estado de autenticacao
- **Custom Hooks** - `useLocalStorage`, `useAuth`
- **Service Layer** - Chamadas API centralizadas
- **Rotas Protegidas** - Componente `PrivateRoute` com redirect
- **Axios Interceptors** - Injecao automatica de token e tratamento de 401

## Como Executar

### Pre-requisitos
- Node.js 18+
- MongoDB 6+ (local ou Atlas)
- npm ou yarn

### 1. Clonar o repositorio
```bash
git clone https://github.com/hadryan89/Fullstack_e-commerce.git
cd Fullstack_e-commerce
```

### 2. Configurar variaveis de ambiente

Crie o arquivo `projeto-fullstack/backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/sneakers_db
PORT=3001
JWT_SECRET=sua_chave_secreta_aqui
```

### 3. Instalar dependencias

```bash
# Backend
cd projeto-fullstack/backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Iniciar os servicos

```bash
# Terminal 1 - MongoDB
mongod --dbpath /data/db

# Terminal 2 - Backend (porta 3001)
cd projeto-fullstack/backend
npm run dev

# Terminal 3 - Frontend (porta 5173)
cd projeto-fullstack/frontend
npm run dev
```

### 5. Acessar a aplicacao
- **Frontend:** http://localhost:5173
- **API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health

## Variaveis de Ambiente

| Variavel | Descricao | Padrao |
|----------|-----------|--------|
| `MONGO_URI` | URI de conexao do MongoDB | `mongodb://localhost:27017/sneakers_db` |
| `PORT` | Porta do servidor backend | `3001` |
| `JWT_SECRET` | Chave secreta para tokens JWT | - |

## Autor

Desenvolvido por **Hadryan**.
