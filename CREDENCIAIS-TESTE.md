# 🔑 Credenciais de Teste - Kall Store

## 🛡️ Administrador

### **Conta Principal do Administrador**
- **Email:** `admin@kall.store`
- **Senha:** `Kall@2025!`
- **Nome:** Admin Kall Store
- **Telefone:** (11) 3000-0001
- **Endereço:** Av. Paulista, 1000 - Conj. 801, Bela Vista, São Paulo/SP

### **Funcionalidades do Administrador:**
✅ Dashboard com estatísticas completas  
✅ Gerenciamento de clientes  
✅ Visualização de pedidos  
✅ Controle de produtos  
✅ Relatórios de vendas  
✅ Perfil administrativo  

---

## 👤 Clientes de Teste

### **Cliente Demo Principal**
- **Email:** `cliente@demo.com`
- **Senha:** `Demo123!`
- **Nome:** Cliente Demonstração
- **Telefone:** (11) 99999-8888
- **Endereço:** Rua das Flores, 456 - Apto 101, Jardins, São Paulo/SP

### **Cliente Adicional**
- **Email:** `joao@teste.com`
- **Senha:** `Joao123!`
- **Nome:** João Silva
- **Telefone:** (21) 98765-4321
- **Endereço:** Rua Copacabana, 123, Copacabana, Rio de Janeiro/RJ

### **Funcionalidades do Cliente:**
✅ Perfil pessoal completo  
✅ Histórico de pedidos  
✅ Carrinho de compras  
✅ Catálogo de produtos  
✅ Busca e filtros  
✅ Cadastro de endereços  

---

## 🔄 Credenciais de Compatibilidade (Antigas)

### **Admin Antigo**
- **Email:** `admin@kall.com`
- **Senha:** `admin123`

### **Cliente Antigo**
- **Email:** `cliente@email.com`
- **Senha:** `cliente123`

---

## 🚀 Como Testar

### **1. Teste do Sistema Administrativo**
1. Faça login com `admin@kall.store` / `Kall@2025!`
2. Acesse o Dashboard (rota automática)
3. Navegue pelos menus: Clientes, Pedidos, Produtos
4. Teste o perfil do administrador
5. Verifique as estatísticas e dados

### **2. Teste do Sistema de Cliente**
1. Faça login com `cliente@demo.com` / `Demo123!`
2. Navegue pela loja
3. Use a busca e filtros
4. Adicione produtos ao carrinho
5. Acesse o perfil e edite informações

### **3. Teste de Cadastro**
1. Acesse a página de cadastro
2. Registre um novo usuário
3. Faça login com as novas credenciais
4. Verifique se as funcionalidades funcionam

---

## 🔧 Configurações de Desenvolvimento

### **Roles do Sistema:**
- `admin` - Acesso total ao sistema
- `customer` - Acesso de cliente padrão

### **Rotas Protegidas:**
- `/admin/**` - Apenas administradores
- `/profile` - Usuários autenticados
- `/carrinho` - Usuários autenticados

### **Armazenamento Local:**
- `authToken` - Token de autenticação
- `currentUser` - Dados do usuário atual
- `registeredUsers` - Usuários cadastrados

---

## ⚠️ Importante

> **ATENÇÃO:** Estas são credenciais de **DESENVOLVIMENTO** apenas.  
> Em produção, implemente:
> - Hash de senhas (bcrypt)
> - JWT tokens
> - Validação no backend
> - Rate limiting
> - Auditoria de acesso

---

**Data de Criação:** ${new Date().toLocaleDateString('pt-BR')}  
**Versão:** 1.0  
**Sistema:** Kall Store - Angular 19