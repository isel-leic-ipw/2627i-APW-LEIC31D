# Web API with Express

## Student Management API

Using the **Express** library in Node.js, create a **Web API** to manage a
collection of students stored in memory (using an array). Each student must have
the following properties:

- `id` – automatically generated unique identifier
- `name` – string representing the student's name
- `number` – numeric student number

---

#### Requirements

The API must support the following operations:

| HTTP Method | Path Template              | Description                                                                 |
|--------------|------------------------|-----------------------------------------------------------------------------|
| GET          | `/students`            | Returns all students. Supports a query string parameter `limit` to restrict the number of students returned. |
| GET          | `/students/:id`        | Returns the student with the specified `id`.                               |
| POST         | `/students`            | Creates a new student. Requires a JSON body with `name` and `number`.      |

---

#### Additional Notes

- All responses must be in **JSON format**.
- The API should handle errors properly, returning meaningful error messages
  (e.g. "Student not found", "Invalid data").
- The server must run on **port 3000**.
- Students must be stored **in memory** (not in a database), using an array.

---

#### Example Request Body for Creating a Student
`POST /students`
```json
{
  "name": "Ana Silva",
  "number": 12345
}
```

#### Example Response Body
```json
{
  "id": 1,
  "name": "Ana Silva",
  "number": 12345
}
```
