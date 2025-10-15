# PopX Account Management App

A production-ready full-stack React.js application with serverless backend that provides complete user account management including registration, authentication, and profile management.

## 🚀 Quick Start

### Development
```bash
npm install
npm start
```
This runs the React development server on port 3000.

### Production (Vercel)
Just push to GitHub and deploy on Vercel - it handles everything automatically!

## Features

- **Welcome Page**: Landing page with animated circles and navigation buttons
- **User Registration**: Complete signup form with validation and MongoDB storage
- **User Authentication**: Secure login with JWT tokens
- **Account Settings**: User profile management with edit capabilities
- **Protected Routes**: Authentication-based route protection
- **Real-time Validation**: Form validation with error handling
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React 18 with Hooks
- React Router DOM for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling and animations

### Backend
- Serverless functions (Vercel)
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Input validation

## 🏗️ Architecture

- **Serverless Functions**: Each API endpoint is a separate Vercel serverless function
- **Static Frontend**: React app builds to static files served by Vercel
- **API Routes**: All API endpoints are under `/api/*` as serverless functions
- **No CORS Issues**: Frontend and API run on the same domain

## Project Structure

```
├── src/                          # Frontend React app
│   ├── components/
│   │   ├── Welcome.js           # Landing page
│   │   ├── CreateAccount.js     # Registration form
│   │   ├── Login.js            # Login form
│   │   ├── AccountSettings.js   # Profile management
│   │   └── LoadingSpinner.js    # Loading component
│   ├── context/
│   │   └── AuthContext.js       # Authentication context
│   ├── services/
│   │   └── api.js              # API service layer
│   └── App.js                   # Main app with routing
├── api/                          # Serverless API functions
│   ├── health.js                # Health check endpoint
│   └── auth/                    # Authentication endpoints
│       ├── register.js          # User registration
│       ├── login.js            # User login
│       ├── me.js               # Get current user
│       └── profile.js          # Update profile
├── lib/                          # Shared utilities
│   ├── mongodb.js              # Database connection
│   └── auth.js                 # Authentication helpers
├── models/
│   └── User.js                 # User model
├── .env                          # Environment variables
└── vercel.json                  # Vercel configuration
```

## 📋 Available Scripts

### `npm start`
Runs the React development server on port 3000.

### `npm run build`
Builds the React app for production to the `build` folder.

### `npm test`
Runs the test suite.

## 🌐 Deployment

The app is configured for seamless deployment:

1. **Vercel/Netlify**: Just connect your repo - the `postinstall` script handles the build
2. **Heroku**: Set the PORT environment variable - the app will use it automatically
3. **Docker**: The app binds to `0.0.0.0` and uses the PORT env variable
4. **Traditional hosting**: Run `npm start` - everything is handled automatically

## 🔧 Environment Configuration

The app uses relative API paths (`/api`) in production, eliminating localhost dependencies.

- **Production**: Uses `.env` with relative paths
- **Development**: Uses `.env.development` with localhost URLs

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Clone and install:
   ```bash
   git clone <your-repo>
   cd popx-account-app
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=production
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser to http://localhost:3000

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

## Features Implementation

### Authentication Flow
1. **Registration**: Users create accounts with form validation
2. **Login**: Secure authentication with JWT tokens
3. **Protected Routes**: Automatic redirection based on auth status
4. **Token Management**: Automatic token storage and refresh
5. **Profile Management**: Users can view and edit their profiles

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration

### User Experience
- Real-time form validation
- Loading states and error handling
- Responsive design for all devices
- Smooth navigation between pages
- Profile editing with save/cancel options

## Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  phoneNumber: String (required),
  password: String (required, hashed),
  companyName: String (optional),
  isAgency: Boolean (required),
  profileImage: String (optional),
  isVerified: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```
This starts the React development server with hot reload.

### Development
The API endpoints are handled by Vercel serverless functions in production and development.

### Environment Variables
- Production: `.env` file in root directory
- Development: `.env.development` file in root directory
- Never commit `.env` files to version control

## Production Features

✅ **No localhost dependencies**  
✅ **Automatic build process**  
✅ **Single port deployment**  
✅ **Environment-aware configuration**  
✅ **Graceful error handling**  
✅ **Production-ready logging**  
✅ **Vercel/Heroku compatible**

This full-stack application provides a complete user management system with modern authentication patterns and a responsive user interface that matches the original design specifications.