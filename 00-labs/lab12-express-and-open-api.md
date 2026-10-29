# Web API with Express – Part 2

## Student Management API – CRUD and API Documentation

In the previous exercise, you developed a **Web API** using **Express** to
manage students stored in an in-memory array.

In this exercise, you will extend the API with **PUT** and **DELETE**
operations, implement a request-counting middleware, and finally document it
using **OpenAPI** and **Swagger UI**.

### Part 1 – Update and Delete Students

Implement the following endpoints:

| HTTP Method | Path | Description |
|---|---|---|
| PUT | `/students/:id` | Replaces an existing student's information. |
| DELETE | `/students/:id` | Deletes a student. |

**Requirements:**

- **PUT** must receive both `name` and `number` in the JSON request body and
  update the corresponding student. The `id` must remain unchanged.
- **DELETE** must remove the student with the specified ID.
- Return appropriate HTTP status codes:
  - `200 OK` – Student successfully updated.
  - `204 No Content` – Student successfully deleted.
  - `400 Bad Request` – Missing or invalid data.
  - `404 Not Found` – Student not found.

**Example PUT request:**

```http
PUT /students/1
Content-Type: application/json
```

```json
{
  "name": "Ana Oliveira",
  "number": 54321
}
```

### Part 2 – Request Counter Middleware

Create an Express middleware named `requestCounter` that counts the number of
HTTP requests received by the API.

**Requirements:**

1. Create a variable to store the total number of requests, initially set to
   `0`.
2. Implement the `requestCounter` middleware to:
   - Increment the counter for each incoming request.
   - Call `next()` to continue processing the request.
3. Register the middleware globally so that it executes for all requests.
4. Implement the following endpoint:

| HTTP Method | Path | Description |
|---|---|---|
| GET | `/stats` | Returns the total number of HTTP requests received. |

**Example response:**

```json
{
  "totalRequests": 15
}
```

**Additional requirements:**

- Count all requests, including those that result in errors.
- Requests to `/stats` must also be counted.
- Store the counter in memory; it resets when the server restarts.

### Part 3 – OpenAPI Specification

Create a file named **`openapi.json`** containing the OpenAPI specification
(version 3.0 or later) for the three endpoints listed below.

Document these endpoints:

| HTTP Method | Path | Description |
|---|---|---|
| GET | `/students` | Retrieve all students (optional `limit` parameter). |
| GET | `/students/{id}` | Retrieve a student by ID. |
| POST | `/students` | Create a student. |

The specification include:

- API information (title, description, version and server URL).
- Parameters and request bodies.
- HTTP response codes and example responses.
- Reusable schemas for students and errors using `components/schemas`.

### Part 4 – Swagger UI

Install **`swagger-ui-express`** and configure Express to load the
`openapi.json` file.

Add the following endpoint:

| HTTP Method | Path | Description |
|---|---|---|
| GET | `/api-docs` | Displays the API documentation using Swagger UI. |

The documentation must be accessible at:

`http://localhost:3000/api-docs`

Users must be able to explore and test the three documented API operations using
Swagger UI.

---

**Notes:**

- Students and the request counter must remain stored in memory.
- The server must run on port `3000`.
- API responses must use JSON, except `204 No Content` and the Swagger UI
  interface.
- Do not use a database.
