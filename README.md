# MiniBlog API

A simple RESTful API for a mini-blog platform built with Node.js, Express, and MongoDB.

## Features

- User CRUD (Create, Read, Update, Delete)
- Post CRUD (Create, Read, Update, Delete)
- Relationship between users and posts (each post has an author)
- Add comments to posts
- Search posts by tag
- Search posts by author
- Aggregation to fetch post with full author info

## Collections

### Users
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required)
- `createdAt` (Date)

### Posts
- `title` (String, required)
- `content` (String, required)
- `author` (ObjectId, references User, required)
- `createdAt` (Date)
- `tags` (Array of Strings)
- `comments` (Array of objects: `{ username, body, date }`)

## Endpoints

### Users
- `POST   /api/users`         - Create a new user
- `GET    /api/users`         - Get all users
- `PUT    /api/users/:id`     - Update a user
- `DELETE /api/users/:id`     - Delete a user

### Posts
- `POST   /api/posts`                 - Create a new post
- `GET    /api/posts`                 - Get all posts
- `GET    /api/posts/:id`             - Get a post by ID (with author info)
- `PUT    /api/posts/:id`             - Update a post
- `DELETE /api/posts/:id`             - Delete a post
- `POST   /api/posts/:id/comments`    - Add a comment to a post
- `GET    /api/posts/tag/:tag`        - Get posts by tag
- `GET    /api/posts/author/:authorId`- Get posts by author

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Set up your MongoDB connection string in a `.env` file as `MONGODB_URI`
4. Run the server with `npm run dev`

## Example .env
```
MONGODB_URI=mongodb://localhost:27017/miniblog
PORT=3000
```

## Notes
- Passwords are stored in plain text for demo purposes. **Do not use in production!**
- All endpoints expect and return JSON.

## Author
- Alejandro Ramirez
