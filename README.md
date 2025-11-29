# Clothing Brand E-Commerce Web App (MERN Stack)

A fully functional e-commerce web application for a fictional clothing brand, built using the **MERN Stack** (MongoDB, Express.js, React, Node.js).
Users can browse products, search & filter items, manage a cart, register/login, and complete a mock checkout with order confirmation email.

---

## Features

### **1. User Authentication**

* Register & Login (name, email, password)
* JWT-based authentication
* Passwords hashed using **bcrypt**
* Protected routes for orders & checkout

### **2. Product Management**

* 20+ demo clothing products seeded into MongoDB
* Each product contains:

  * Name, description, price, image URL
  * Category: Men / Women / Kids
  * Sizes: S / M / L / XL
* Product Detail Page

### **3. Search, Filters & Pagination**

* Search by name or description
* Multiple filters work together:

  * Category
  * Size
  * Price Range
* Pagination (`?page=1&limit=10`)

### **4. Shopping Cart**

* Add products with size selection
* Update quantity, remove items
* Cart saved per user
* Can add items without logging in (guest cart)

### **5. Checkout & Orders**

* Mock checkout (no real payments)
* Order stored in MongoDB with:

  * User reference
  * Items, sizes, quantities
  * Total price
  * Order date
  * Order ID

### **6. Order Confirmation Email**

* Sent using **Nodemailer**
* Includes:

  * Order summary
  * Total amount
  * Products, sizes, quantities
  * Order ID & date

---

## Tech Stack

### **Frontend**

* React (TypeScript)
* Tailwind CSS
* Context API for Auth & Cart
* React Router

### **Backend**

* Node.js
* Express.js
* JWT Authentication
* MongoDB + Mongoose
* Nodemailer (order confirmation)

---

## Project Structure

```
root/
 ├── backend/
 │   ├── config/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── models/
 │   ├── routes/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── context/
 │   │   ├── pages/
 │   │   ├── App.tsx
 │   │   └── main.tsx
 └── README.md
```

---

## Installation & Setup

### **1. Clone Repository**

```
git clone <repo-url>
cd clothing-ecommerce
```

---

## Backend Setup

### Install dependencies

```
cd backend
npm install
```

### Create `.env`

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Start backend

```
npm start
```

---

## Frontend Setup

### Install dependencies

```
cd frontend
npm install
```

### Start frontend

```
npm run dev
```

---

## Seed Products (Optional)

```
node backend/seed/products.js
```

---

## Order Confirmation Email

Nodemailer is configured inside:

```
/backend/utils/sendEmail.js
```

Emails are triggered after a successful checkout.

---

## API Endpoints (Summary)

### **Auth**

* POST `/api/auth/register`
* POST `/api/auth/login`

### **Products**

* GET `/api/products`
* GET `/api/products/:id`

### **Cart**

* POST `/api/cart/add`
* GET `/api/cart`
* PUT `/api/cart/update`
* DELETE `/api/cart/remove/:id`

### **Orders**

* POST `/api/orders/checkout`
* GET `/api/orders/my-orders`

---

## Future Enhancements

* Admin dashboard for adding/editing products
* Real payment gateway integration (Stripe/Razorpay)
* Wishlist functionality
* Product reviews & ratings

---

## Author

**Divya**
Software Developer
Portfolio: [https://divi363.netlify.app/](https://divi363.netlify.app/)

