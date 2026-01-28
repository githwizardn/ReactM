 
#   Nebula Shop — Advanced Next.js E-Commerce (Portfolio Edition)

**Live Demo:** https://react-m-five.vercel.app/  

Nebula Shop is a production-oriented e-commerce application built with **Next.js 15+ (App Router)**.  
The project focuses on **real-world frontend engineering concerns**: deployment stability, state consistency, and predictable behavior under external API failure.

This repository is intended as a **portfolio artifact**, demonstrating architectural decision-making rather than feature volume.

---

##   Engineering Goals

- Prevent build-time failures caused by unstable external APIs
- Maintain a single source of truth across UI layers
- Avoid hydration mismatches in hybrid-rendered applications
- Ensure predictable behavior in complex interactive components
- Optimize Core Web Vitals without sacrificing maintainability

---

##   Architecture Overview

### Hybrid Rendering Strategy

Rendering responsibilities are intentionally split to balance performance and deployment reliability:

- **Client-Side Rendering (CSR)**  
  Used for Product Catalog, Cart, and User Profile.  
  This avoids Vercel prerender failures when FakeStoreAPI is slow or unavailable.

- **Server Components**  
  Global UI shell (Navbar, Footer, metadata) implemented in `layout.js`.  
  Shared infrastructure renders once on the server to reduce duplication and improve initial load.

- **Hydration Control**  
  Explicit `useEffect` mounting strategies prevent server/client state divergence.

---

##   State Management Design

- **Redux Toolkit (RTK)** used for cart state
- Centralized slice guarantees a **Single Source of Truth** across:
  - Navbar cart indicator
  - Product cards
  - Cart page

- **Memoized Selectors**
  - Total quantity
  - Total price  
  Reduces unnecessary renders under frequent state updates

- **Persistence Layer**
  - Cart state persisted via **LocalStorage**
  - State survives reloads and browser restarts

---

##   Forms, Validation & Security

- **React Hook Form + Yup**
  - Schema-driven validation
  - Clear separation between UI and validation logic

- **Password Enforcement**
  - Regex-based rules:
    - Uppercase
    - Lowercase
    - Numbers
    - Special characters

- **Protected Routes**
  - Profile access gated by token verification
  - Unauthorized users redirected at runtime

---

##   Interaction & UX Engineering

- **Event Propagation Control**
  - `e.preventDefault()` and `e.stopPropagation()` used on nested interactive elements
  - Prevents accidental navigation (e.g., buttons inside links)

- **Instant UI Feedback**
  - Cart updates are synchronous from the user’s perspective
  - No blocking network dependency for UI state changes

---

##   Core Features

- **Cart Engine**
  - Quantity limits (1–10 per item)
  - Add / Remove / Update operations
  - Deterministic state transitions

- **Runtime Identity Fetching**
  - Profile data fetched dynamically
  - Eliminates build-time coupling to auth APIs

- **SEO & Social Metadata**
  - Open Graph and Twitter Cards configured in `layout.js`

- **Responsive UI**
  - Mobile-first design using Tailwind CSS
  - Consistent layout across breakpoints

---

##  Tech Stack

- **Next.js** (App Router, Server Components)
- **Redux Toolkit**
- **React Hook Form**
- **Yup**
- **Tailwind CSS**
- **FakeStoreAPI**

---

##   Project Structure

```bash
src/
├── app/
│   ├── cart/             # Cart logic & UI
│   ├── products/         # Catalog & dynamic [id] routes
│   ├── profile/          # Protected user profile
│   ├── login/            # Authentication flow
│   └── register/         # Schema-validated forms
├── store/
│   ├── store.js          # Redux store configuration
│   └── cartSlice.js      # Cart reducers & selectors
├── components/           # Navbar, Footer, providers
└── lib/                  # Metadata & utilities
````

---

##   Local Setup

```bash
git clone https://github.com/githwizardn/ReactM.git
npm install
npm run dev
```
##   Why This Project Matters

This project demonstrates:

* Architectural decision-making under real constraints
* Deployment-safe rendering strategies
* Scalable state management
* Practical UX engineering beyond “happy paths”

It is intentionally optimized for **signal-to-noise**, not feature inflation.

 
**Author:** Nodo
**Purpose:** Portfolio Project
**Status:** Final — 2026
 
