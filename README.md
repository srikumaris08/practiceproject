# Wanderlust

A full-stack Airbnb-inspired web application where users can explore, create, edit, and review property listings.

## Live Demo

https://wanderlustpracticeproj.onrender.com

## Features

* User Authentication (Sign Up, Login, Logout)
* Create, Edit, and Delete Listings
* Upload Listing Images using Cloudinary
* Add and Delete Reviews
* Category-Based Listings
* Flash Messages and Form Validation
* Responsive UI

## Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local

### Other Tools

* Cloudinary
* Multer
* Joi
* Express Session
* Connect Mongo

## Installation

1. Clone the repository

```bash
git clone https://github.com/srikumaris08/practiceproject.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file and add:

```env
ATLASDB_URL=mongodb_connection_string
SECRET=session_secret
CLOUD_NAME=cloudinary_name
CLOUD_API_KEY=cloudinary_api_key
CLOUD_API_SECRET=cloudinary_api_secret
```

4. Start the server

```bash
node app.js
```

5. Open

```text
http://localhost:8080/listings
```

## Author

Srikumari S
