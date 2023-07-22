> If you want to see the this document in English, please check out [this page](README-en.md)

Este projeto contém uma aplicação web simples com algums vulnerabilidades. Apresentei a aplicação e discuti as vulnerabilidades na live que apresentei em 22/07/2023 com o grupo Alquymia.

# Instruções

## Requisitos

Para executar a aplicação, é preciso ter o `node.js`, o `docker` e o `docker-compose` instalados na sua máquina. Se você usa ambiente Windows, é preciso instalar o WSL antes de instalar o Docker.

## Executar o banco

A aplicação requer que o banco esteja em execução para funcionar. Se você já tiver um banco Postgre instalado na sua máquina, encontrará problemas com a porta usada pelo banco desta aplicação. Se precisar trocar a porta do banco, siga as instruções da seção **trocar a porta do banco** abaixo. Para executar o banco, use o seguinte comando, a partir da pasta `database`:

```bash
docker-compose up
```

Caso queira desligar e apagar o banco, use o comando abaixo, a partir da pasta `database`:

```bash
docker-compose down
```

## Executar a aplicação

Antes de executar a aplicação pela primeira vez, é preciso instalar as dependências. Faça isso usando o seguinte comando, a partir da pasta raiz do projeto:

```bash
npm install
```

Para executar a aplicação, use o seguinte comando, a partir da pasta raiz do projeto:

```bash
npm start
```

A aplicação recebe conexões na porta 3000.

## Trocar a porta do banco

Com o banco e a aplicação desligados, faça as seguintes alterações:

1. No arquivo `.env`, substitua o campo `DB_PORT` por outro valor. Por exemplo, `50000`.
2. No arquivo `database/docker-compose.yml`, altere a linha abaixo de `ports:`. Para a porta `50000`, por exemplo, fica assim: `50000:5432`.

# Licença

Este código está liberado sob licença MIT. Mais detalhes em [LICENSE.txt](LICENSE.txt).