> Se quiser ver este documento em português, por favor acesse [esta página](README.md)

This project contains a simple web application with some vulnerabilities. I presented the application and discussed the vulnerabilities in the live stream that took place on Jul 22, 2023 with the Alquymia group.

# Instructions

## Requirements

To run the application, you need to have `node.js`, `docker`, and `docker-compose` installed on your machine. If you are using a Windows environment, you must install WSL before installing Docker.

## Launching the database

The application requires the database to be up and running to function correctly. If you already have a PostgreSQL database installed on your machine, you may encounter port conflicts with the database used by this application. If you need to change the database port, follow the instructions in the section **changing the database port** below. To launch the database, use the following command from the `database` folder:

```bash
docker-compose up
```

If you want to shut down and delete the database, use the following command from the `database` folder:

```bash
docker-compose down
```

## Running the application

Before running the application for the first time, you need to install the dependencies. Do this by using the following command from the root folder of the project:

```bash
npm install
```

To run the application, use the following command from the root folder of the project:

```bash
npm start
```

The application will listen for connections on port 3000.

## Changing the database port

With the database and application turned off, make the following changes:

1. In the `.env` file, replace the `DB_PORT` field with another value. For example, use `50000` instead of the default port.
2. In the `database/docker-compose.yml` file, modify the line below `ports:`. For example, if you want to use port `50000`, change it to `50000:5432`.

# License

This code is release under the MIT license. More details in [LICENSE.txt](LICENSE.txt).
