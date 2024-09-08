# Grocery React App

Welcome to our Grocery React App! This cutting-edge e-commerce platform is crafted using React and Vite, leveraging a robust set of dependencies to deliver an exceptional shopping experience. Our app combines modern web technologies with user-centric design to create a seamless, efficient, and enjoyable online grocery shopping journey.

Key Features:

- Responsive and intuitive user interface
- Fast performance with Vite's build optimization
- Comprehensive product catalog with easy navigation
- Secure user authentication and profile management
- Real-time inventory updates and availability checks
- Smooth checkout process with multiple payment options
- Order tracking and history for user convenience

Whether you're a busy professional, a health-conscious shopper, or simply looking for a convenient way to stock your pantry, our Grocery React App is designed to meet your needs with style and efficiency.

## Key Dependencies and Their Usage

1. **@headlessui/react (v2.1.3)**: Used for accessible UI components, particularly in the `CategoriesTag.jsx` file for the Dialog component.

2. **@hookform/resolvers (v3.9.0)** and **react-hook-form (v7.53.0)**: Employed for form handling and validation throughout the application.

3. **axios (v1.7.7)**: Utilized for making HTTP requests to backend services.

4. **class-variance-authority (v0.7.0)** and **clsx (v2.1.1)**: Used for dynamic class name generation, enhancing the flexibility of component styling.

5. **embla-carousel-react (v8.2.1)**: Implemented for creating responsive and touch-friendly carousels, `image-slider.jsx` & `product-slider.jsx`.

6. **framer-motion (v11.5.4)**: Used for smooth animations and transitions to enhance user interface interactions.

7. **lucide-react (v0.438.0)** and **react-icons (v5.3.0)**:  Icons library.

8. **react (v18.3.1)** and **react-dom (v18.3.1)**: Core libraries for building the user interface.

9. **react-router-dom (v6.26.1)**: Used for handling routing in the application, as evident in the `CategoriesTag.jsx` file where `useParams` and `useSearchParams` are employed.

10. **tailwind-merge (v2.5.2)** and **tailwindcss-animate (v1.0.7)**: Utilized for advanced Tailwind CSS usage, including merging classes and adding animations.

11. **zod (v3.23.8)**: Used for schema validation with react-hook-form.

12. **query-string (v9.1.0)**: Used in the search input component for searching products, providing efficient parsing and stringifying of URL query strings.

## File Routing

The project uses React Router for navigation. An example of proper file routing can be seen in `src/screen/CategoriesTag.jsx`, where `useParams` and `useSearchParams` are used to handle dynamic routing and query parameters.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

This will start the Vite development server with Hot Module Replacement (HMR) for a smooth development experience.
