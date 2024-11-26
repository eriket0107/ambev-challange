# Documentation

## Running the project

- **Dev**
  - Runs the application using the built files.

  ```bash
  npm i
  npm run dev
  ```

### Tests

- **Tests**
  - Runs the all application tests

  ```bash
  npm run test:watch
  ```

  - Runs the only use cases tests

  ```bash
  npm run test:watch-use-cases
  ```

### Migrations

- **migration:generate:**
  - Generates a new migration based on changes in the entities.

  ```bash
  npm run typeorm migration:generate src/database/migrations/<name of the migration>
  ```

- **migration:run:**
  - Runs pending migrations to update the database schema.

  ```bash
  npm run migration:run
  ```

## API Documentation

This document provides an overview of the available endpoints for managing items and sales. All endpoints follow RESTful conventions and return standard HTTP status codes.

With the application running acess the link below

```bash
http://localhost:3333/docs#/
```
