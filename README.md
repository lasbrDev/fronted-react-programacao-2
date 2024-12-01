# Aplicação de Gerenciamento

Esta é uma aplicação de gerenciamento desenvolvida com React, utilizando JSX para a criação dos componentes. A aplicação permite gerenciar clientes, produtos e fornecedores, com funcionalidades de cadastro, edição e exclusão.

Atividade bimestral desenvolvida para consolidar o aprendizado sobre React e JSX na disciplina de Programação II, do curso de Engenharia de Software da Universidade Unoeste.

## Funcionalidades

- **Login**: Tela de login para autenticação de usuários.
- **Gerenciamento de Clientes**: Cadastro, edição e exclusão de clientes.
- **Gerenciamento de Produtos**: Cadastro, edição e exclusão de produtos.
- **Gerenciamento de Fornecedores**: Cadastro, edição e exclusão de fornecedores.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Bootstrap**: Biblioteca de componentes Bootstrap para React.
- **React Router DOM**: Biblioteca para roteamento em aplicações React.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições ao backend.
- **Bootstrap**: Framework CSS para estilização responsiva.
- **React Scripts**: Scripts e configuração para criar aplicativos React usando Create React App.


## Estrutura do Projeto

- **src**
  - **components**
    - **FormLogin.jsx**: Componente de formulário de login.
    - **FormCadCliente.jsx**: Componente de formulário de cadastro de clientes.
    - **FormCadProduto.jsx**: Componente de formulário de cadastro de produtos.
    - **FormCadFornecedor.jsx**: Componente de formulário de cadastro de fornecedores.
    - **TabelaClientes.jsx**: Componente de tabela de clientes.
    - **TabelaProdutos.jsx**: Componente de tabela de produtos.
    - **TabelaFornecedores.jsx**: Componente de tabela de fornecedores.
  - **services**
    - **clienteService.js**: Serviço para interagir com a API de clientes.
    - **produtoService.js**: Serviço para interagir com a API de produtos.
    - **fornecedorService.js**: Serviço para interagir com a API de fornecedores.
  - **App.jsx**: Componente principal da aplicação.
  - **index.js**: Ponto de entrada da aplicação.

## Dependências

As principais dependências utilizadas no projeto são:

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.5",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.27.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
  }
}
```

## Descrição Detalhada da Aplicação

#### Login - Gerenciamento de Clientes - Gerenciamento de Produtos

A aplicação possui uma tela de login para autenticação de usuários, redirecionando-os ao menu principal após a validação das credenciais. Nas seções de clientes, produtos e fornecedores, é possível realizar operações como cadastro, edição e exclusão de registros, apresentados em tabelas interativas com botões para gerenciamento individual.

## Licença

Este projeto está licenciado sob a [MIT LICENSE](LICENSE).