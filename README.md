# 🛍️ Kall - Loja de Roupas Femininas

> Uma elegante plataforma de e-commerce focada em roupas femininas, desenvolvida com Angular 19 e tecnologias modernas.

![Angular](https://img.shields.io/badge/Angular-19.2-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap)
![Angular Material](https://img.shields.io/badge/Angular%20Material-19.2-indigo?style=for-the-badge&logo=angular)

## 📱 Sobre o Projeto

Kall é uma moderna loja virtual especializada em moda feminina, oferecendo uma experiência de compra intuitiva e responsiva. O projeto foi desenvolvido com foco na usabilidade, performance e design atrativo, proporcionando aos usuários uma navegação fluida entre categorias de produtos, looks inspiradores e funcionalidades completas de e-commerce.

## 🎯 Funcionalidades Principais

### 🏠 **Home & Catálogo**
- Catálogo completo de roupas femininas
- Sistema de busca e filtragem por categorias
- Carousel de imagens promocionais
- Sistema de favoritos para produtos

### 🔐 **Autenticação & Usuários**
- Sistema completo de login e cadastro
- Autenticação com guards de segurança
- Perfil de usuário personalizado
- Proteção de rotas autenticadas

### 🛒 **Carrinho & Compras**
- Carrinho de compras dinâmico
- Contador de itens em tempo real
- Sistema de pagamento integrado
- Histórico de compras

### 👗 **Looks & Inspiração**
- Galeria de looks inspiradores
- Categorização por tipos (saias, vestidos, etc.)
- Sistema de favoritos para looks
- Opção de compra direta dos looks

### 📄 **Páginas Institucionais**
- Página "Sobre" com informações da empresa
- Formulário de contato
- Footer com informações adicionais

### 📱 **Design Responsivo**
- Menu hamburger para dispositivos móveis
- Layout adaptativo para todas as telas
- Interface otimizada para touch

## 🛠️ Tecnologias Utilizadas

### **Frontend Framework**
- **Angular 19.2** - Framework principal
- **TypeScript 5.7** - Linguagem de programação
- **RxJS 7.8** - Programação reativa

### **UI/UX & Styling**
- **Angular Material 19.2** - Componentes de UI
- **Bootstrap 5.3** - Framework CSS
- **Angular CDK 19.2** - Kit de desenvolvimento de componentes
- **SCSS** - Pré-processador CSS

### **Roteamento & Segurança**
- **Angular Router** - Sistema de roteamento SPA
- **Auth Guards** - Proteção de rotas
- **Route Guards** - Controle de acesso

### **Desenvolvimento & Build**
- **Angular CLI 19.2** - Ferramenta de desenvolvimento
- **Karma & Jasmine** - Testes unitários
- **TypeScript Compiler** - Compilação e type checking

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── componentes/          # Componentes da aplicação
│   │   ├── home/            # Página inicial e catálogo
│   │   ├── login/           # Sistema de autenticação
│   │   ├── cadastro/        # Registro de usuários
│   │   ├── carrinho/        # Carrinho de compras
│   │   ├── looks/           # Galeria de looks
│   │   ├── header/          # Cabeçalho e navegação
│   │   ├── footer/          # Rodapé
│   │   ├── sobre/           # Página institucional
│   │   ├── contato/         # Formulário de contato
│   │   ├── pagamento/       # Sistema de pagamento
│   │   └── compra/          # Finalização de compras
│   ├── services/            # Serviços da aplicação
│   │   ├── auth.service.ts  # Autenticação
│   │   ├── cart.service.ts  # Carrinho de compras
│   │   ├── clothing.service.ts # Produtos
│   │   └── looks.service.ts # Looks e inspirações
│   ├── guards/              # Proteção de rotas
│   │   └── auth.guard.ts    # Guard de autenticação
│   ├── model/               # Modelos de dados
│   │   └── clothing.model.ts # Interface de produtos
│   ├── app.routes.ts        # Configuração de rotas
│   └── app.config.ts        # Configuração da aplicação
└── styles.scss              # Estilos globais
```

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)
- Angular CLI (opcional, mas recomendado)

### **Instalação**

1. **Clone o repositório:**
```bash
git clone https://github.com/Aian06L/Kall-lojas.git
cd Kall-lojas
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm start
# ou
ng serve
```

4. **Acesse a aplicação:**
```
http://localhost:4200/
```

### **Scripts Disponíveis**

```bash
# Iniciar servidor de desenvolvimento
npm start

# Build de produção
npm run build

# Executar testes
npm test

# Build com watch mode
npm run watch
```

## 📊 Funcionalidades Detalhadas

### **Sistema de Autenticação**
- ✅ Login seguro com validação
- ✅ Cadastro de novos usuários
- ✅ Proteção de rotas com AuthGuard
- ✅ Gerenciamento de estado de autenticação

### **Carrinho de Compras**
- ✅ Adição/remoção de produtos
- ✅ Controle de quantidade
- ✅ Cálculo automático de totais
- ✅ Persistência de dados

### **Catálogo de Produtos**
- ✅ Listagem de produtos por categoria
- ✅ Sistema de busca
- ✅ Filtragem avançada
- ✅ Visualização detalhada

### **Sistema de Looks**
- ✅ Galeria de inspirações de moda
- ✅ Categorização por tipos de roupa
- ✅ Sistema de favoritos
- ✅ Compra direta de looks completos

## 🎨 Design & UX

- **Design Responsivo:** Interface adaptativa para desktop, tablet e mobile
- **Material Design:** Seguindo as diretrizes do Google Material Design
- **Navegação Intuitiva:** Menu claro e organizado
- **Performance:** Carregamento otimizado e navegação fluida
- **Acessibilidade:** Componentes acessíveis e semânticos

## 🔧 Configuração de Desenvolvimento

### **Estrutura de Componentes**
Cada componente segue o padrão:
- `.component.ts` - Lógica do componente
- `.component.html` - Template HTML
- `.component.scss` - Estilos específicos
- `.component.spec.ts` - Testes unitários

### **Serviços**
- **AuthService:** Gerenciamento de autenticação
- **CartService:** Lógica do carrinho de compras
- **ClothingService:** Manipulação de produtos
- **LooksService:** Gerenciamento de looks

### **Guards**
- **AuthGuard:** Proteção de rotas que requerem autenticação

## 🚀 Deploy

Para fazer o deploy da aplicação:

```bash
# Build de produção
ng build --prod

# Os arquivos gerados estarão na pasta dist/
```

## 📱 Capturas de Tela

*[Aqui você pode adicionar screenshots da aplicação quando estiver rodando]*

### Página Inicial
*Screenshot da home com catálogo de produtos*

### Sistema de Login
*Screenshot da tela de login/cadastro*

### Carrinho de Compras
*Screenshot do carrinho com produtos adicionados*

### Galeria de Looks
*Screenshot da página de looks inspiradores*

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Aian06L**
- GitHub: [@Aian06L](https://github.com/Aian06L)
- Projeto: [Kall-lojas](https://github.com/Aian06L/Kall-lojas)

---

<div align="center">
  <h3>🛍️ Desenvolvido com ❤️ para oferecer a melhor experiência em moda feminina</h3>
</div>
