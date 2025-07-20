# Birthday Love Website

## Overview

This is a romantic birthday website built as a full-stack application with a React frontend and Express.js backend. The application is designed as a personal birthday gift featuring interactive elements, photo galleries, memories, and surprise features. The site uses modern web technologies with a focus on beautiful animations and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Client-Side Components
1. **Interactive Elements**: Birthday cake with candle blowing functionality using microphone API
2. **Photo Gallery**: Lightbox modal system for displaying memories
3. **Timeline**: Animated relationship milestones
4. **Surprise Section**: Interactive balloons, letter modal, gift modal, and quiz
5. **Navigation**: Smooth scrolling navigation with scroll-based styling
6. **Floating Hearts**: Animated background elements

### UI Component Library
- Comprehensive shadcn/ui component collection including:
  - Form controls (buttons, inputs, selects, etc.)
  - Layout components (cards, dialogs, sheets)
  - Navigation (breadcrumbs, pagination, menubar)
  - Data display (tables, charts, calendars)
  - Feedback (toasts, alerts, progress)

### Custom Hooks
- **useMicrophone**: Audio input detection for interactive cake feature
- **useParallax**: Scroll-based parallax effects
- **useIsMobile**: Responsive design detection
- **useToast**: Toast notification system

## Data Flow

### Database Schema
- **Users Table**: Basic user management with username/password
- **Drizzle ORM**: Type-safe database queries and migrations
- **Zod Validation**: Schema validation for data integrity

### API Structure
- RESTful API design with `/api` prefix
- Express middleware for request logging and error handling
- Modular route registration system
- Storage abstraction layer supporting both memory and database backends

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI & Styling**: Radix UI primitives, Tailwind CSS, class-variance-authority
- **Animation**: Framer Motion, Embla Carousel
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Utilities**: date-fns, clsx, nanoid

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Replit Integration**: Runtime error overlay and development tools

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema changes

### Environment Configuration
- **Development**: Hot reload with Vite dev server middleware
- **Production**: Optimized builds with static file serving
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### File Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Route components
├── server/          # Express backend
│   ├── routes.ts    # API route handlers
│   ├── storage.ts   # Data access layer
│   └── vite.ts      # Development server setup
├── shared/          # Shared types and schemas
└── migrations/      # Database migration files
```

The application is designed for easy deployment on Replit with automatic database provisioning and environment setup. The modular architecture allows for easy feature additions and maintenance.