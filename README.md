## What is ?

## Prerequisites

- To run the application, you need to have `nodeJs` already installed.
- A `sql/relational` database local or in cloud configurated with the migrations and seeders.
- ~~Some script pre setted in package.json was made to run together then `yarn`. Then it's important to have it~~.

## Installation

First you need to configure your `environment` with the current variables:

```
# a protect key for your application
PROTECT_KEY=xxxx-xxxx-xxxx-xxxx

# the database informations
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=db_orcca
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql
DATABASE_LOG=true

# database for tests
DATABASE_TEST_USERNAME=root
DATABASE_TEST_PASSWORD=root
DATABASE_TEST_NAME=db_orcca_test
DATABASE_TEST_HOST=localhost
DATABASE_TEST_DIALECT=mysql
DATABASE_TEST_LOG=false
```

After that, run the `migrations` for the database setted in environment, in this example `db_orcca` and finnaly run the `seeders`.

To make `all database configurations`, execute:

```
  # npm run db:prepare
```

### Migrations

Was setted a configurations using `Sequelize-CLI` to execute the database `migrations`.
There is a script in the `package.json` that encapsulate the command, just use:

```
  # npm run db:migrate
```

To revert the the migrations use:

```
  # npm run db:migrate:undo
```

### Seeders

Some pre defined informations of database was already setted in `seeders`.

```
  # npm run db:seed
```

To revert:

```
  # npm run db:seed:undo
```

## Running

The application was made with `javascript` only, so to run the application you just need to execute the app using `nodeJs`.

In the `root` folder of the project execute:

```
  # npm start
  or
  # yarn start
```

## Testing

To make the tests, was used `jest` library.

So, to run the test, you can use the `jest commands` But in the package.json there is a sequence of command that are executed to prepare the database and run the tests inside the correct database.

To prepare the database (create database, run migrations and seeders) run the command:

```
  # npm run test
```

⚠️ Warning to run the comand `jest` in command line, because when you execute just the `jest` command, you are running the tests in production/development environment. The environment variable `ENV` define what environment you are in. You can set this variable manually in your `.env file` or run the command above that set the enviroment automatically.
