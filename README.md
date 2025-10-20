# Frontend-PetShop---Trabalho-final-PPI-2025---FIPP

## 🎯 **Objetivo**
Desenvolver uma interface web responsiva e intuitiva para gerenciamento do sistema Pet Shop, permitindo o cadastro de interessados e filhotes com integração completa ao backend via API REST.

## 🛠 **Tecnologias Utilizadas**

### **Frontend Principal**
- **HTML5** - Estruturação semântica das páginas
- **CSS3** - Estilização e layout responsivo
- **Bootstrap 5** - Framework CSS para componentes UI
- **JavaScript Vanilla** - Lógica da aplicação (sem frameworks)

### **Comunicação & API**
- **Fetch API** - Requisições HTTP para o backend
- **JSON** - Formato de dados para comunicação
- **RESTful API** - Integração com endpoints do backend

## 🎨 **Interface & Componentes**

### **Formulários Web**
- **Cadastro de Interessados** - Formulário com validações
- **Cadastro de Filhotes** - Formulário com select dinâmico
- **Validação Nativa** - HTML5 + JavaScript customizado

### **Componentes UI**
- **Tabelas Dinâmicas** - Listagem de registros atualizável
- **Select Dinâmico** - Carregamento de interessados via API
- **Modais & Alertas** - Feedback para o usuário
- **Ícones SVG** - Ações visuais (editar, excluir)

## ⚡ **Funcionalidades Implementadas**

### **CRUD Completo**
- **Create** - Cadastro de novos registros
- **Read** - Listagem e visualização de dados
- **Update** - Edição de registros existentes
- **Delete** - Exclusão com confirmação

### **Features Dinâmicas**
- 🔄 **Select Dinâmico** - Lista de interessados carregada via API
- 📊 **Tabelas Atualizáveis** - Atualização em tempo real
- 🎯 **Vínculo Opcional** - Filhotes podem ser cadastrados com ou sem interessado
- 💬 **Feedback Visual** - Mensagens de sucesso/erro

## 🔗 **Integração com Backend**

### **Endpoints Consumidos**
- `GET    /interessados` - Listar interessados
- `POST   /interessados` - Cadastrar interessado
- `PUT    /interessados/:id` - Atualizar interessado
- `DELETE /interessados/:id` - Excluir interessado

- `GET    /filhotes` - Listar filhotes
- `POST   /filhotes` - Cadastrar filhote
- `PUT    /filhotes/:id` - Atualizar filhote
- `DELETE /filhotes/:id` - Excluir filhote

### **Métodos HTTP Utilizados**
- **GET** - Recuperar dados
- **POST** - Criar registros
- **PUT** - Atualizar registros
- **DELETE** - Excluir registros

*Desenvolvido como trabalho final para a disciplina de Programação para Internet - 2025*
