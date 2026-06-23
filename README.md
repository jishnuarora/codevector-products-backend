# CodeVector Products Backend

A backend API built with Node.js, Express.js, and PostgreSQL for browsing 200,000 products using efficient keyset pagination.

## Features

- Generate and store 200,000 products
- PostgreSQL database
- Category filtering
- Keyset (cursor-based) pagination
- Composite index for fast queries
- Stable ordering using `(created_at, id)`
- Prevents duplicates and missing records during pagination

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv

---

## Database Schema

### products

| Column | Type |
|----------|----------|
| id | BIGSERIAL PRIMARY KEY |
| name | VARCHAR(255) |
| category | VARCHAR(100) |
| price | NUMERIC(10,2) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Index

To optimize pagination queries:

```sql
CREATE INDEX idx_products_created_id
ON products(created_at DESC, id DESC);
```

---

## Product Generation

A seed script generates 200,000 products with:

- Product Name
- Category
- Price
- Created Timestamp

Run:

```bash
node seed.js
```

---

## Installation

Clone repository:

```bash
git clone <repository-url>
cd codevector-products-backend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
```

Start server:

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

---

## API

### Get Products

```http
GET /products
```

### Query Parameters

| Parameter | Description |
|------------|------------|
| limit | Number of products to return |
| category | Filter by category |
| lastCreatedAt | Cursor timestamp |
| lastId | Cursor id |

---

## Examples

### First Page

```http
GET /products?limit=5
```

### Filter By Category

```http
GET /products?limit=5&category=Books
```

### Next Page Using Cursor

```http
GET /products?limit=5&lastCreatedAt=2026-06-23T06:02:43.080Z&lastId=199996
```

### Category + Cursor

```http
GET /products?limit=5&category=Books&lastCreatedAt=2026-06-23T06:02:43.080Z&lastId=199996
```

---

## Pagination Strategy

This project uses keyset pagination instead of OFFSET pagination.

### Why?

OFFSET pagination becomes slower as page numbers increase because PostgreSQL must scan and skip rows.

Keyset pagination uses the last product from the previous page as a cursor:

```sql
WHERE (created_at, id) < (?, ?)
ORDER BY created_at DESC, id DESC
LIMIT ?
```

Benefits:

- Faster for large datasets
- Scales well with 200,000+ records
- Stable ordering
- Avoids duplicate and missing records during browsing

---

## Assignment Requirements Covered

- [x] 200,000 generated products
- [x] PostgreSQL database
- [x] Category filtering
- [x] Fast pagination
- [x] Keyset pagination
- [x] Composite index
- [x] Seed script included
- [x] GitHub repository

---

## Author

Jishnu Arora