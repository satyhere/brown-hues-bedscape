# Brown Hues Bedscape

A modern, interactive web application for customizing and ordering premium bed pallets in Bangalore. Built with React, TypeScript, and Vite.

## 🌟 Features

- Interactive 3D bed pallet configurator
- Real-time size visualization
- Custom dimension support
- Multiple treatment options
- Responsive design
- Shopping cart functionality
- Modern UI with animations
- Supabase integration for backend services

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Shadcn UI
- **State Management:** React Query
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Backend:** Supabase
- **Maps Integration:** Mapbox GL
- **Form Handling:** React Hook Form with Zod validation
- **Date Handling:** date-fns
- **Charts:** Recharts
- **Notifications:** Sonner

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brown-hues-bedscape.git
   cd brown-hues-bedscape
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Start the development server**
   ```bash
npm run dev
```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── integrations/  # Third-party service integrations
└── types/         # TypeScript type definitions
```

## 🔧 Configuration

The project uses several configuration files:
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🎨 Design System

The project uses a custom design system built on top of Shadcn UI with:
- Custom color palette
- Typography system
- Component variants
- Animation system
- Responsive breakpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens
- Large displays

## 🔒 Security

- Environment variables for sensitive data
- Supabase authentication
- Secure API endpoints
- Input validation with Zod

## 🚀 Performance

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Shadcn UI for the component library
- Supabase for the backend services
- Mapbox for mapping services
- All contributors and supporters
