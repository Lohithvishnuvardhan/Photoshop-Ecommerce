# Photo Pixel - E-commerce Platform

A modern e-commerce platform for photography equipment built with React, TypeScript, and Tailwind CSS.

## 🚧 Current Status: Frontend Only

**Note**: 
- This is now a frontend-only application
- Authentication is disabled for development
- All features work with mock data
- Backend integration removed

## Features

- 🛍️ Product browsing (Cameras, Lenses, Accessories, Batteries)
- 🛒 Shopping cart functionality
- 💳 Payment processing (mock)
- 📦 Order management (mock data)
- 👤 User profiles (mock)
- 📱 Responsive design
- 🔍 Product search
- 🎨 Modern UI with Tailwind CSS
- 🗄️ Local storage for cart persistence
- 📧 Mock notifications

## Tech Stack

**Frontend:**
- React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Getting Started

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment Ready

The project is ready for frontend deployment on:

- ✅ **Vercel**: Frontend deployment ready
- ✅ **Netlify**: Frontend deployment ready  
- ✅ **GitHub Pages**: Static deployment ready
- ✅ **Custom CDN**: Build output ready

### Deployment Checklist:

1. **Build**: Frontend builds successfully
2. **Static Assets**: All assets properly referenced
3. **Routing**: Client-side routing configured
4. **Environment**: No backend dependencies

## 📁 Project Structure

```
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React contexts
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main app component
│
├── public/               # Static assets
└── dist/                # Build output
```

## 🔧 Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📊 Mock Data

The application uses mock data for:
- Product catalog
- User profiles
- Order history
- Shopping cart (persisted in localStorage)

## 🌐 Features

**Product Browsing:**
- Browse cameras, lenses, accessories, and batteries
- Product search and filtering
- Detailed product information

**Shopping Experience:**
- Add to cart functionality
- Cart persistence with localStorage
- Mock checkout process
- Order confirmation

**User Interface:**
- Responsive design for all devices
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Professional photography theme

## 🚧 Development Notes

- All API calls are mocked
- Authentication is disabled
- Data persists only in browser storage
- No server-side functionality

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 🎯 Frontend-Only Application

This is now a complete frontend application with:
- ✅ **Mock Data**: All functionality works with sample data
- ✅ **Local Storage**: Cart and preferences saved locally
- ✅ **No Backend**: No server dependencies
- ✅ **Static Deployment**: Ready for any static hosting

Deploy anywhere you want! 🚀