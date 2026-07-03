# Taj Hotel Project Context

## Overview
Taj Hotel is a modern restaurant ordering experience built with Next.js 16 and TypeScript. The project presents a premium, heritage-inspired dining brand and supports browsing the menu, adding dishes to a cart, placing orders, and tracking order progress.

## Purpose
The application is designed to:
- showcase a luxury restaurant brand and menu experience
- allow customers to browse available dishes by category
- support cart-based ordering for delivery or pickup
- persist orders in a SQLite-backed database via Prisma
- provide an order confirmation and tracking experience

## Core Tech Stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI/animation: GSAP, Lenis, Motion, Lucide React
- State management: Zustand with persistence
- Database: Prisma + SQLite
- Validation: Zod + React Hook Form

## Project Structure
- src/app: route-level pages and API endpoints
- src/components: reusable UI, layout, menu, and section components
- src/store: cart state store
- src/types: shared TypeScript interfaces
- src/lib: shared library utilities and Prisma client
- prisma/: Prisma schema, migrations, and seed script
- public/: static assets such as menu images and videos

## Main Features
### 1. Home Experience
The home page highlights the restaurant’s heritage, signature dishes, and a strong call-to-action to explore the menu.

### 2. Menu Browsing
The menu page loads available dishes from the database and renders them through a client-side experience with filtering and detailed dish views.

### 3. Cart and Checkout
Customers can add dishes to a persisted cart, review their selections, and proceed to checkout.
The checkout form collects customer details, pickup/delivery preference, and optional notes.

### 4. Order Placement
Orders are submitted to an API route that validates the payload and stores the order and its items in the database.

### 5. Order Tracking
After checkout, users are redirected to a tracking page that displays the order lifecycle progress from placed to delivered.

## Data Model
The Prisma schema defines three primary models:
- MenuItem: dishes available for ordering
- Order: customer order metadata and overall totals
- OrderItem: individual items within an order

## Important Files
- package.json: project dependencies and scripts
- prisma/schema.prisma: database schema
- src/app/page.tsx: home page
- src/app/menu/page.tsx: menu listing page
- src/app/checkout/page.tsx: checkout experience
- src/app/api/orders/route.ts: order create/read API
- src/store/cartStore.ts: shopping cart state
- src/types/index.ts: shared data types

## Development Notes
- Run the app with npm run dev
- Seed the database with the Prisma seed script if needed
- The application uses SQLite locally, so the database is simple and file-based
- The cart persists in browser storage using Zustand

## Notes for Future Work
Potential enhancements include:
- admin dashboard for managing menu items and orders
- payment integration
- authentication and user accounts
- real-time order status updates
- richer menu filtering and search
