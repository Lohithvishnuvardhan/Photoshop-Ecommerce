# Photo Pixel - Professional Photography Equipment Store

A full-stack e-commerce platform built with React, Node.js, and MongoDB, specializing in professional photography equipment.

## Features

- 🛍️ **Product Categories**
  - Cameras
  - Lenses
  - Accessories
  - Batteries

- 🔐 **User Authentication**
  - Email & Password Login
  - Password Reset
  - Protected Routes
  - Admin Dashboard

- 🛒 **Shopping Experience**
  - Product Search
  - Shopping Cart
  - Wishlist
  - Order Tracking
  - Secure Checkout

- 👤 **User Profile**
  - Order History
  - Address Management
  - Profile Settings

- 📱 **Responsive Design**
  - Mobile-First Approach
  - Modern UI/UX
  - Smooth Animations

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Router v7
- Lucide React (Icons)
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Nodemailer

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Lohithvishnuvardhan/Photoshop-Ecommerce.git
cd Photoshop-Ecommerce
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Environment Setup
```bash
# In backend directory, create .env file
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:5173
```

4. Start the development servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
photo-pixel/
├── src/                    # Frontend source files
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand store configurations
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
├── backend/              # Backend source files
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   └── routes/          # API routes
└── public/              # Static files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/:id` - Update order status (Admin)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)