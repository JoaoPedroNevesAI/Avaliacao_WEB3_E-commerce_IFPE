# 🛒 Avaliacao_WEB3_E-commerce_IFPE

## Descrição do Projeto

Este é um projeto completo de **E-commerce** desenvolvido para a avaliação da disciplina de **WEB3** do IFPE. A aplicação é dividida em Backend e Frontend, utilizando as melhores práticas de desenvolvimento com tipagem estática.

O sistema foi arquitetado para gerenciar todas as etapas de uma loja virtual, desde o catálogo de produtos até a finalização do pedido.

<hr>

##  Funcionalidades

O projeto implementa uma arquitetura robusta com as seguintes funcionalidades e entidades principais:

* **Produto:** Cadastro, listagem e gerenciamento de itens.
* **Categoria:** Organização hierárquica e filtragem dos produtos.
* **Carrinho de Compras:** Funcionalidade para adicionar, remover e gerenciar itens antes da compra.
* **Pedido (Ordem):** Criação e acompanhamento do status das compras.
* **Pagamento:** Processamento e registro das transações financeiras.
* **Seeds:** Utilização de dados iniciais (seeds) para popular o banco de dados e facilitar o setup inicial.

<hr>

##  Tecnologias Utilizadas

A solução foi construída utilizando as seguintes tecnologias no ecossistema Node.js/TypeScript:

* **TypeScript:** Utilizado no Backend e no Frontend para garantir tipagem estática, maior segurança e manutenibilidade do código.
* **TypeORM:** ORM que facilita a interação com o banco de dados, permitindo a definição das entidades de forma clara e eficiente.

<hr>

##  Como Executar o Projeto

Siga os passos abaixo para clonar e rodar o Backend e o Frontend do projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

* [Node.js](https://nodejs.org/en/) (Recomendado versão LTS)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Um servidor de banco de dados compatível com a configuração do `TypeORM` (ex: PostgreSQL, MySQL, SQLite).

### 1. Configuração do Backend

1.  **Acesse a pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    * Certifique-se de que as configurações do banco de dados (geralmente em um arquivo `.env` ou similar) estão corretas.
    ```bash
    npm run start:dev
    ```
    O servidor estará rodando e pronto para atender as requisições.

### 2. Configuração do Frontend

1.  **Acesse a pasta do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Inicie a aplicação:**
    ```bash
    npm start
    ```
    A aplicação Frontend será iniciada e deverá abrir automaticamente no seu navegador.
