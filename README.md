# Sistema de Cartazes Promocionais e Envio de Cobranças

Esse projeto foi desenvolvido para agilizar o processo de criação de cartazes promocionais e envio de e-mails de cobrança para fornecedores no supermercado onde trabalho. O sistema foi pensado para facilitar a comunicação de promoções e melhorar a gestão de cobrança, reduzindo o tempo e os erros manuais associados a essas tarefas.

## Funcionalidades

- **Criação de Cartazes Promocionais**  
  O sistema permite criar cartazes de promoção de forma rápida e personalizada. Com base nas informações de produtos e preços, é possível gerar cartazes prontos para impressão.
  
- **Envio de E-mails de Cobrança**  
  Além dos cartazes, a aplicação também possibilita o envio de e-mails de cobrança para fornecedores, garantindo que as pendências financeiras sejam notificadas de forma prática e eficiente.

## Tecnologias Utilizadas

- **Frontend**: React com Tailwind CSS para uma interface moderna e responsiva.
- **Backend**: Node.js e Express
- **Serviço de E-mail**: Nodemailer com integração para envio de e-mails automáticos.

## Instalação

1. Clone o repositório:

  ```bash
  git clone https://github.com/PosterMailer
  ```
2. Instale as dependências:

   
  ```bash
  cd PosterMailer-front-end
  yarn install
  cd PosterMailer-back-end
  yarn install
  ```


## Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurar alguns serviços, como o envio de e-mails. Para rodar a aplicação corretamente, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

| Variável        | Descrição                                                  | Exemplo                          |
|-----------------|------------------------------------------------------------|----------------------------------|
| `EMAIL_USER`    | Endereço de e-mail usado para enviar notificações           | `seu_email@email.com`            |
| `EMAIL_PASS`    | Senha ou App Password para autenticação do e-mail           | `sua_senha_ou_app_password`      |
| `PORT`          | Porta onde o servidor deve rodar (opcional)                 | `3333`                           |

### Exemplo do Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
EMAIL_USER=seu_email@email.com
EMAIL_PASS=sua_senha_ou_app_password
PORT=3333
```


3. Execute o Projeto:
  ```bash
  cd PosterMailer-front-end
  yarn dev
  cd PosterMailer-back-end
  yarn dev
