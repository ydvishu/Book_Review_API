# 📚 Book Review API

A RESTful API built using Node.js, Express, and MongoDB that allows users to sign up, log in, add books, write reviews, and search books. JWT authentication is used for secure access.

---

## 🚀 Features

- User authentication using JWT
- Register and login endpoints
- Add, view, and search books
- Submit, update, and delete reviews (1 review per user per book)
- Pagination and filtering (by genre, author)
- Clean and modular code structure

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Environment Management:** dotenv

---

## 🔐 Authentication

JWT tokens are required for protected routes.

- Include the token in the `Authorization` header as:

## Clone the repository
- git clone https://github.com/<your-username>/book-review-api.git
- cd book-review-api
- npm install
- npm start

##  Create a `.env` file
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key

## 📬 API Endpoints

> **Note:** Protected routes require JWT token in `Authorization` header:  
> `Authorization: Bearer <your_jwt_token_here>`

### 🔐 Authentication

| Method | Endpoint | Auth Required | Description               |
|--------|----------|---------------|---------------------------|
| POST   | /signup  | No            | Register a new user       |
| POST   | /login   | No            | Login and get JWT token   |

### 📚 Books

| Method | Endpoint         | Auth Required | Description                                |
|--------|------------------|---------------|--------------------------------------------|
| POST   | /books           | Yes           | Add a new book                            |
| GET    | /books           | No            | Get all books (with pagination and filters) |
| GET    | /books/:id       | No            | Get book details by ID (includes reviews and average rating) |
| GET    | /books/search?q= | No            | Search books by title or author (case-insensitive) |

### ✍️ Reviews

| Method | Endpoint            | Auth Required | Description                   |
|--------|---------------------|---------------|-------------------------------|
| POST   | /books/:id/reviews  | Yes           | Add a review for a book       |
| PUT    | /reviews/:id        | Yes           | Update your review            |
| DELETE | /reviews/:id        | Yes           | Delete your review            |

---

### Example Request

- POST /signup
- Content-Type: application/json

{
  "username": "ishu",
  "password": "securepassword"
}

## 🧑‍💻 Author

**Ishu**  
2025 graduate from Indian Institute of Technology (IIT), Ropar  

[GitHub](https://github.com/ydvishu) | [LinkedIn](https://www.linkedin.com/in/ishu-yadav-b43892223/)
