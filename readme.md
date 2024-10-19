How to run the project

### Development and Build

- **Dev**
  - Runs the application using the built files.

  ```bash
    npm i
  ```

 ```
  npm run dev

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

# API Documentation

This document provides an overview of the available endpoints for managing items and sales. All endpoints follow RESTful conventions and return standard HTTP status codes.

## Table of Contents

- [Items](#items)  
  - [Create Item](#1-create-item)  
  - [Update Item](#2-update-item)  
  - [Delete Item](#3-delete-item)  
- [Sales](#sales)  
  - [Create Sale](#1-create-sale)  
  - [Cancel Sale](#2-cancel-sale)  
  - [Update Sale](#3-update-sale)  
- [Error Handling](#error-handling)  
- [Logging](#logging)  
- [Usage Instructions](#usage-instructions)  

---

## Items

### 1. Create Item

**Endpoint:**  
`POST /items`

**Request Body:**

```json
{
  "name": "string",
  "price": 100.0,
  "stock": 10,
  "slug": "item-slug"
}
```

**Response:**

- **200 OK:** Item created successfully  
- **400 Bad Request:** Validation failed or item already exists  

**Description:**  
Creates a new item with the given details.

### 2. Update Item

**Endpoint:**  
`PUT /items/:id`

**Request Parameters:**

- **id**: `string` (The ID of the item to update)

**Request Body:**

```json
{
  "stock": 20,
  "price": 120.0,
  "slug": "item-slug"
}
```

- **stock**: `number` (New stock quantity)
- **price**: `number` (New price)
- **slug**: `string` (New item slug)

**Response:**

- **200 OK:**
- Updated item details
- **400 Bad Request:**
- Validation failed or item not found  

**Description:**  
Creates a new item with the given details.

### 3. Delete Item

**Endpoint:**  
`DELETE /items/:id`

**Request Parameters:**

- **id**: `string` (The ID of the item to delete)

**Response:**

- **204 No Content:**
  - Item deleted successfully
- **400 Bad Request:**
  - Item not found  

**Description:**  
Deletes the item with the given ID.

## Sales

### 1. Create Sale

**Endpoint:**  
`POST /sales`

**Request Body:**

```json
{
  "customerName": "John Doe",
  "branch": "NYC Branch",
  "items": [
    { "itemSlug": "item-1", "quantity": 2 },
    { "itemSlug": "item-2", "quantity": 3 }
  ]
}
```

- **customerName**: `string` (Name of the customer)
- **branch**: `string` (Branch where the sale is made)
- **items**:
  - An array of item objects, each containing:
    - **itemSlug**: `string` (Slug of the item)
    - **quantity**: `number` (Quantity of the item sold)

**Response:**

- **200 OK:**
  - Sale created successfully
- **400 Bad Request:**
  - Validation failed or item stock insufficient  

**Description:**  
Creates a new sale with the specified customer, branch, and items.

---

### 2. Cancel Sale

**Endpoint:**  
`POST /sales/cancel`

**Request Body:**
```json
{
  "saleId": "sale-id"
}
```

- **saleId**: `string` (ID of the sale to cancel)

**Response:**
- **200 OK:**
  - Sale canceled successfully
- **400 Bad Request:**
  - Sale not found  

**Description:**  
Cancels an existing sale using the provided sale ID.

---

### 3. Update Sale

**Endpoint:**  
`PUT /sales`

**Request Body:**
- **saleId**: `string` (ID of the sale to update)
- **saleItems**:
  - An array of updated item objects, each containing:
    - **itemSlug**: `string` (Slug of the item)
    - **quantity**: `number` (New quantity of the item)

**Response:**
```json
{
  "saleId": "sale-id",
  "saleItems": [
    { "itemSlug": "item-1", "quantity": 2 },
    { "itemSlug": "item-2", "quantity": 1 }
  ]
}
```

- **200 OK:**
  - Sale updated successfully
- **400 Bad Request:**
  - Validation failed or sale not found  

**Description:**  
Updates the sale with the given sale ID and new items.

Here’s the "Error Handling" section formatted with bullet points:

```markdown
## Error Handling

All endpoints return errors in the following format:

- **Response Format:**
  ```json
  {
    "error": "string"
  }
  ```

- **Examples of Errors:**
  - **400 Bad Request:**
    - Invalid request or validation error  
  - **404 Not Found:**
    - Resource not found  

