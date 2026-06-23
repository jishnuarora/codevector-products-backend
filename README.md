# CodeVector Products Backend

Backend service built with Node.js, Express, and PostgreSQL.

## Features

- Generates 200,000 products using a batch seed script
- Keyset pagination using `(created_at, id)`
- Category filtering
- PostgreSQL composite index for efficient pagination
- Parameterized queries to prevent SQL injection

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=codevector
```

Run server:

```bash
node server.js
```

## API

Get products:

```http
GET /products
```

Filter by category:

```http
GET /products?category=Books
```

Keyset pagination:

```http
GET /products?category=Books&lastCreatedAt=2026-06-23T05:20:17.191Z&lastId=199996
```

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv