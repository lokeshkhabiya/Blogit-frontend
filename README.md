# Black Cherie Media Frontend

This is the frontend application for Black Cherie Media, built with React and Vite.

## Prerequisites

- Node.js (v18.0.0 or newer recommended)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_UNSPLASH_API_KEY=your_unsplash_api_key
```

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or if you use yarn:
   ```
   yarn
   ```

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) by default.

## Building for Production

To create a production build:

```
npm run build
```

To preview the production build locally:

```
npm run preview
```

## Project Structure

- `src/components/` - React components
- `src/stores/` - State management using Zustand
- `src/services/` - API service functions
- `src/constants/` - Constant values and configurations

## Technologies Used

- React 19
- Vite 6
- React Router v7
- Zustand for state management
- Tailwind CSS
- BlockNote for rich text editing
- Axios for API requests