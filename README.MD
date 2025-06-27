# API Golden Raspberry Awards

Esta é uma API RESTful desenvolvida como solução para o teste de back-end . A aplicação identifica os produtores de filmes com o maior e o menor intervalo entre prêmios consecutivos na categoria "Pior Filme" do Golden Raspberry Awards.

## Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
-   **Express**: Framework para construção da API RESTful.
-   **Sequelize**: ORM (Object-Relational Mapper) para interação com o banco de dados.
-   **SQLite**: Banco de dados SQL embarcado, utilizado em modo de arquivo para desenvolvimento e em memória para testes.
-   **Jest & Supertest**: Frameworks para a execução dos testes de integração.

---

## Pré-requisitos

-   Node.js (v18 ou superior)
-   npm (geralmente instalado com o Node.js)

---

## Instalação

1.  Clone o repositório para a sua máquina local:
    ```bash
    git clone https://github.com/klzchz/gra.git
    ```

2.  Navegue até a pasta do projeto:
    ```bash
    cd  gra
    ```

3.  Instale todas as dependências necessárias:
    ```bash
    npm install
    ```

---

## Como Executar a Aplicação

### Modo de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando. Ele usará o `ts-node-dev` para reiniciar o servidor automaticamente a cada alteração nos arquivos.

```bash
npm run dev
```

-   Ao iniciar, a aplicação irá ler o arquivo `data/movielist.csv` e popular o banco de dados `database.sqlite` na raiz do projeto.
-   O servidor estará disponível em `http://localhost:3000`.

---

## Como Executar os Testes

Para rodar a suíte de testes de integração, execute o comando:

```bash
npm test
```

-   Os testes são executados com o Jest e o Supertest.
-   Um banco de dados SQLite **em memória** é utilizado para garantir que os testes sejam rápidos e não interfiram no banco de desenvolvimento.
-   O banco de dados é populado com os dados do CSV antes da execução dos testes.

---

## Endpoints da API

### 1. Obter Intervalos de Prêmios

Retorna o produtor com o maior intervalo entre dois prêmios consecutivos e o que obteve dois prêmios mais rápido.

-   **Método:** `GET`
-   **URL:** `/awards-interval`
-   **Resposta de Sucesso (200 OK):**

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

### 2. Importar Dados via CSV

Permite repopular o banco de dados enviando um novo arquivo CSV. Isso apaga todos os dados existentes antes de inserir os novos.

-   **Método:** `POST`
-   **URL:** `/import-csv`
-   **Corpo da Requisição:** `multipart/form-data`
-   **Campo do Arquivo:** `csvfile`
-   **Exemplo de uso com cURL:**
    ```bash
    curl -X POST -F "csvfile=@/caminho/para/seu/arquivo.csv" http://localhost:3000/import-csv
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
      "message": "Database populated successfully.",
      "count": 206
    }
    ```

---

## Conformidade com os Requisitos da Avaliação

-   **[✓] Especificação do teste:** API desenvolvida para ler a lista de indicados e vencedores.
-   **[✓] Ler arquivo CSV:** A aplicação lê o CSV na inicialização e também disponibiliza um endpoint `POST` para upload.
-   **[✓] Requisitos da API:** O endpoint `GET /awards-interval` retorna os produtores com o maior e menor intervalo, conforme o formato especificado.
-   **[✓] Nível 2 de Maturidade de Richardson:** A API utiliza verbos HTTP (`GET`, `POST`), recursos nominais (`/awards-interval`) e códigos de status (`200`, `201`, `400`, `500`).
-   **[✓] Testes de Integração:** Foram implementados somente testes de integração (`awards.test.ts`) que garantem a  a resposta da API.
-   **[✓] Banco de Dados Embarcado:** Utiliza SQLite, que não requer instalação externa. O banco de desenvolvimento é um arquivo e o de teste é em memória.
-   **[✓] README:** Este arquivo contém as instruções para rodar o projeto e os testes.
-   **[✓] Repositório Git:** O código-fonte está disponível em um repositório Git.
