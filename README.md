# Photo Pixel - E-commerce Platform

A modern e-commerce platform for photography equipment built with React, TypeScript, and Tailwind CSS.

## 🚧 Current Status: Authentication Temporarily Disabled

**Note**: Login and signup functionality is currently disabled for development purposes. All features work with mock data.

### To Re-enable Authentication:

1. **Uncomment auth imports in `src/App.tsx`**
2. **Uncomment auth routes in `src/App.tsx`**
3. **Uncomment auth context wrapper in `src/App.tsx`**
4. **Uncomment auth hooks in components**
5. **Uncomment API interceptors in `src/utils/api.ts`**
6. **Remove mock data and restore API calls**

## Features

- 🛍️ Product browsing (Cameras, Lenses, Accessories, Batteries)
- 🛒 Shopping cart functionality
- 💳 Payment processing
- 📦 Order management
- 👤 User profiles (mock data)
- 📱 Responsive design
- 🔍 Product search
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
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