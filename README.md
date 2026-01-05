# StoreAdmin - Catalog Inventory Portal

A modern, responsive web application for managing and browsing product inventory. Built with React, TypeScript, and Tailwind CSS.

## Features

### 1. Inventory Overview Screen

- **Comprehensive Product List**: View all products with Name, Price, Brand, Category, and Stock Status
- **Sorting**: Organize products by Price or Name (ascending/descending)
- **Category Filtering**: Filter products by specific categories
- **Search Functionality**: Real-time search with debouncing for responsive performance
- **Pagination**: Load more products as needed (initial load of 20+ products)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 2. Product Details Screen

- **Visual Product Page**: Beautiful, organized layout with product images
- **Complete Information**: Display all product details including Description, Rating, and Discount Percentage
- **Image Gallery**: View multiple product images with thumbnail navigation
- **Related Products**: Browse similar products from the same category (up to 5 recommendations)

### 3. Hierarchical Catalogue Overview

- **Category Cards**: Visual representation of all product categories with sample images
- **Drill-Down Navigation**: Click any category to view all products in that category
- **Reusable Interface**: Category product view uses the same Inventory Overview screen for consistency

### 4. Welcome Home Page

- **User-Friendly Introduction**: Clear instructions about application functionalities
- **Quick Navigation**: Direct links to Inventory Overview and Catalogue Overview
- **Feature Highlights**: Overview of key application features

## Technical Stack

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the project files

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview


## Project Structure

```

src/
├── components/ # Reusable UI components
│ ├── Layout.tsx # Main layout with navigation
│ ├── ProductCard.tsx # Product display component
│ ├── LoadingSpinner.tsx
│ ├── ErrorMessage.tsx
│ └── ProductSkeleton.tsx
├── pages/ # Page components
│ ├── HomePage.tsx
│ ├── InventoryOverview.tsx
│ ├── ProductDetails.tsx
│ └── CatalogueOverview.tsx
├── services/ # API service layer
│ └── api.ts
├── types/ # TypeScript type definitions
│ └── index.ts
├── App.tsx # Main app component with routing
├── main.tsx # Application entry point
└── index.css # Global styles and Tailwind imports

```

## API Integration

The application uses the DummyJSON API:

- Base URL: `https://dummyjson.com`
- Endpoints:
  - `/products` - Get all products
  - `/products/:id` - Get product by ID
  - `/products/categories` - Get all categories
  - `/products/category/:category` - Get products by category
  - `/products/search?q=:query` - Search products

## Assumptions and Design Decisions

1. **Initial Product Load**: The application loads a minimum of 20 products on the initial page load, as specified in the requirements.

2. **Pagination Strategy**: Instead of traditional pagination, the application uses a "Load More" button for better UX and progressive loading. This prevents overwhelming the browser with too much data at once.

3. **Search Debouncing**: Search queries are debounced with a 300ms delay to prevent excessive API calls while the user is typing, ensuring responsive performance.

4. **Category Images**: For the Catalogue Overview, the application fetches a sample product from each category to display as a representative image. If a category has no products or the fetch fails, a placeholder icon is shown.

5. **Related Products**: The "Browse Similar Products" section shows up to 5 products from the same category (excluding the current product). This is limited to prevent overwhelming the page.

6. **Error Handling**: The application gracefully handles network errors and displays user-friendly error messages with retry options. Partial data (e.g., if categories fail to load) doesn't break the application.

7. **Responsive Breakpoints**: The application uses Tailwind's default breakpoints:

   - Mobile: Default (< 768px)
   - Tablet: md (≥ 768px)
   - Desktop: lg (≥ 1024px)

8. **Stock Status Display**: Products with stock > 0 are marked as "In Stock" (green), while products with stock = 0 are marked as "Out of Stock" (red).

9. **Sorting Default**: When no sort option is selected, products are displayed in their original API order.

10. **Category Filtering**: When a category is selected, the search functionality is disabled to avoid conflicts. Users can clear the category filter to enable search again.

11. **Image Fallback**: If a product has multiple images, the first image is used as the thumbnail. If an image fails to load, the browser's default broken image icon will appear (this is standard browser behavior).

12. **Navigation**: The application uses client-side routing with React Router, providing a smooth single-page application experience without full page reloads.

## Performance Optimizations

- **Lazy Loading**: Images are loaded as needed
- **Debounced Search**: Prevents excessive API calls
- **Progressive Loading**: Products load in batches
- **Memoized Sorting**: Sorting calculations are memoized to prevent unnecessary re-renders
- **Skeleton Loaders**: Provide visual feedback during data loading
```
