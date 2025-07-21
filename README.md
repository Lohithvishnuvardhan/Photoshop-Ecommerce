# Photo Pixel - E-commerce Platform

A modern e-commerce platform for photography equipment built with React, TypeScript, and Tailwind CSS.

## 🚧 Current Status: Ready for Custom Deployment

**Note**: 
- Authentication is temporarily disabled for development
- Deployment configurations removed for custom deployment
- MongoDB connection ready and tested
- All features work with database integration

## 🗄️ Database Setup

### 1. MongoDB Configuration

1. **Create `.env` file in backend directory:**
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Update MongoDB connection string in `.env`:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/photopixel?retryWrites=true&w=majority
   ```

3. **Test MongoDB connection:**
   ```bash
   cd backend
   node test-mongodb.js
   ```

4. **Seed sample data:**
   ```bash
   cd backend
   node seedData.js
   ```

### 2. Environment Variables Setup

**Backend (.env):**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

## Features

- 🛍️ Product browsing (Cameras, Lenses, Accessories, Batteries)
- 🛒 Shopping cart functionality
- 💳 Payment processing
- 📦 Order management with MongoDB
- 👤 User profiles
- 📱 Responsive design
- 🔍 Product search
- 🎨 Modern UI with Tailwind CSS
- 🗄️ MongoDB integration
- 📧 Email notifications (password reset)

## Tech Stack

**Frontend:**
- React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

**Backend:**
- Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (temporarily disabled)
- **Email**: Nodemailer
- **Security**: bcryptjs, CORS

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Test MongoDB connection
node test-mongodb.js

# Seed sample data
node seedData.js

# Start backend server
npm run dev
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

### 3. Production Build

```bash
# Build frontend
npm run build

# Start backend in production
cd backend
npm start
```

## 🚀 Deployment Ready

The project is now ready for deployment on any platform:

- ✅ **Vercel/Netlify**: Frontend deployment ready
- ✅ **Railway/Render/Heroku**: Backend deployment ready  
- ✅ **MongoDB Atlas**: Database connection configured
- ✅ **Custom VPS**: Full-stack deployment ready

### Deployment Checklist:

1. **Database**: MongoDB Atlas cluster created and accessible
2. **Environment Variables**: All required env vars set
3. **CORS**: Frontend URL added to backend CORS config
4. **Build**: Frontend builds successfully
5. **API**: Backend API endpoints tested

## 📁 Project Structure

```
├── backend/                 # Node.js backend
│   ├── config/             # Database & email config
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation middleware
│   └── index.js           # Server entry point
│
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React contexts
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main app component
```

## 🔧 Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm run dev          # Start with nodemon
npm start            # Start production server
node test-mongodb.js # Test database connection
node seedData.js     # Seed sample data
```

## 🔄 To Re-enable Authentication:

1. **Uncomment auth imports in `src/App.tsx`**
2. **Uncomment auth routes in `src/App.tsx`**
3. **Uncomment auth context wrapper in `src/App.tsx`**
4. **Uncomment auth hooks in components**
5. **Uncomment API interceptors in `src/utils/api.ts`**
6. **Remove mock data and restore API calls**

## 🧪 Testing Database Connection

```bash
cd backend
node test-mongodb.js
```

This will test:
- ✅ MongoDB connection
- ✅ Database read/write operations
- ✅ Collections listing
- ✅ Environment variables

## 📊 Sample Data

Run the seed script to populate your database:

```bash
cd backend
node seedData.js
```

This adds sample products across all categories:
- 📷 Cameras (Canon, Sony, Nikon)
- 🔍 Lenses (Various focal lengths)
- 🎒 Accessories (Straps, Tripods, etc.)
- 🔋 Batteries (Brand-specific)

## 🚧 Temporarily Disabled Features

- User authentication (login/signup)
- Protected routes  
- Admin functionality
- Email verification

*All code is preserved and can be easily re-enabled*

## 🌐 API Endpoints

**Products:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Orders:**
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders

**Users:**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

**Health:**
- `GET /api/health` - API health check

## 🔒 Security Features

- CORS configuration
- Input validation
- Password hashing (bcryptjs)
- JWT token authentication (disabled)
- Environment variable protection

## 📧 Email Configuration

For password reset functionality:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate app password
   - Add to `.env` file

2. **Environment Variables:**
   ```bash
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_app_password
   ```

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
1. Check connection string format
2. Verify IP whitelist in MongoDB Atlas
3. Confirm username/password
4. Test with `node test-mongodb.js`

**CORS Issues:**
1. Update `FRONTEND_URL` in backend `.env`
2. Check CORS configuration in `backend/index.js`

**Build Issues:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check environment variables
3. Verify API endpoints

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 🎯 Ready for Deployment!

Your project is now:
- ✅ **Database Connected**: MongoDB integration working
- ✅ **API Ready**: All endpoints functional
- ✅ **Frontend Built**: Production-ready React app
- ✅ **Environment Configured**: All variables documented
- ✅ **Deployment Clean**: No platform-specific configs

Deploy anywhere you want! 🚀

   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── context/            # React contexts
├── store/              # Zustand stores
├── utils/              # Utility functions
├── types.ts            # TypeScript types
└── App.tsx             # Main app component
```

## Temporarily Disabled Features

- User authentication (login/signup)
- Protected routes
- Real API calls (using mock data)
- Admin functionality

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.