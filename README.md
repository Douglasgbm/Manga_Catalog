# 📚 Mangá Catalog

Um sistema de gerenciamento e exibição de mangás desenvolvido para organizar coleções e facilitar a busca de títulos, unindo a arte dos mangás com o desenvolvimento web moderno.

## 🚀 Funcionalidades

- **Catálogo Dinâmico:** Exibição de mangás em formato de carrossel, consumindo dados de uma API.
- **Painel Administrativo:** Área restrita para gerenciamento completo (CRUD) dos mangás (Adicionar, Editar e Remover).
- **Controle de Acesso:** Sistema de verificação de usuário para liberar funcionalidades de administração.
- **Design Responsivo:** Interface adaptável para diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

- **Back-end:** Python & FastAPI (Alta performance e tipagem forte).
- **Front-end:** HTML5, CSS3 e JavaScript (Vanilla).
- **Persistência de Dados:** Armazenamento local via arquivos JSON (Leitura e escrita dinâmica).
- **Comunicação:** Fetch API para integração entre Front e Back.

## 📦 Como Executar o Projeto

### Pré-requisitos
- Python 3.x instalado.

### Passo a Passo
1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/manga-catalog.git
   cd manga-catalog
   ```

2. **Instalar dependências:**
   ```bash
   pip install fastapi uvicorn
   ```

3. **Iniciar o servidor:**
   ```bash
   uvicorn main:app --reload
   ```

4. **Acessar a aplicação:**
   Abra o navegador e acesse: `http://127.0.0.1:8000`

## ✒️ Autor
Desenvolvido por **Douglas Mendes**.
