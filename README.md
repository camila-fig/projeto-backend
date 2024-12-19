# Projeto Back-end

## Descrição:
Projeto que desenvolve o back-end de um site de e-commerce usando Node.js, Express e MongoDB. Neste site, a página inicial refere-se ao login ou cadastro de usuário, sendo ainda possível entrar com uma conta já existente do GitHub.
Sendo o login feito por um usuário, nas outras páginas é possível ver os produtos, inserir produtos no carrinho de compras e conversar com o fornecedor através de mensagens. Se o login for feito por um administrador, é possível entrar na Área Restrita onde é permitido editar, cadastrar e deletar produtos. Ainda como administrador é possível entrar na página Mail onde é permitido que o administrador envie mensagems por e-mail ou WhatsApp para seus clientes.

## Tecnologias:
- Back-end: Node.js, Express, MongoDB, Docker
- Front-end: JavaScript, CSS, Sweetalert, Handlebars
- Autenticação: JWT, Twilio
- Documentação de API: Swagger

Outras bibliotecas e frameworks utilizados neste projeto podem ser vistos no arquivo package.json.

## Funcionalidades:
- Cadastro e/ou login de usuários com autenticação JWT;
- Login através de uma conta do GitHub;
- Visualização detalhada de cada produto;
- Adição de produtos ao carrinho de compras;
- Visualização do carrinho de compras com a possibilidade de modificar a quantidade dos itens;
- Envio de mensagens;
- Cadastro, edição e remoção de produtos.

## Instruções de instalação:
Clone o repositório para sua máquina local

```
$ git clone https://github.com/camila-fig/projeto-backend.git
```

Acesse a pasta

```
$ cd projeto-backend
```

Instale as dependências, de acordo com o arquivo package.json,

```
$ npm install
```

- Inicie o servidor

```
$ npm run dev
```

- Visualize o site em
```
http://localhost:8080
```

##### Obs.: Não esqueça de criar um arquivo .env de acordo com o exemplo (.env.local) preenchendo com as variáveis necessárias.

## Exemplo de uso:
1. Crie uma conta;
2. Navegue pelos produtos e escolha um para visualizar;
3. Adicione o produto ao carrinho;
4. Navegue até o carrinho de compras e exclua o produto;
5. Retorne aos produtos e insira ao carrinho quantos quiser;
6. Mande uma mensagem ao fornecedor;
7. Faça o logout.

## Autora:
Camila A. Figueirêdo

E-mail: camila_fig@hotmail.com
