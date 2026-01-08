**Live Demo**
View on Vercel: [https://react-m-five.vercel.app/](https://react-m-five.vercel.app/)

---

## 🛒 Advanced E-Commerce Architecture

A high-performance e-commerce prototype built with the Next.js App Router. The application employs a hybrid rendering strategy to maximize performance, improve deployment stability, and deliver a smooth, interactive user experience.

---

## 🏗️ Technical Architecture & Methodology

This project applies modern web standards to address common challenges in distributed frontend systems, with a strong emphasis on API resilience and reliable deployments.

### Hybrid Rendering & Data Strategy

To optimize Core Web Vitals and ensure stable deployments on Vercel, rendering responsibilities are intentionally divided:

* **Client-Side Fetching (CSR)**
  Used for the User Profile, Product Catalog, and Cart Logic. Shifting data fetching to the client avoids prerender bottlenecks during Vercel builds, ensuring successful deployments even when external APIs (FakeStoreAPI) experience latency.

* **Server-Side Layouts**
  The global UI shell (Navbar and Footer) is implemented using Server Components in `layout.js`, allowing shared infrastructure to render once on the server and improving initial load performance.

* **Dynamic Routing**
  Product detail pages use dynamic `[id]` segments, enabling scalable routing with a clean, DRY codebase.

---

## 🧩 State Management & Persistence

* **Persistence Layer**
  Shopping cart state is persisted via the Browser LocalStorage API, ensuring data retention across sessions and page reloads.

* **Hydration Synchronization**
  A controlled `useEffect` mounting strategy prevents hydration mismatches between server-rendered HTML and client-side state.

---

## ⚡ Event Handling & UX Optimization

* **Event Propagation Control**
  Strategic use of `e.preventDefault()` and `e.stopPropagation()` on nested interactive elements (e.g., “Add to Cart” buttons within product links) ensures predictable behavior and prevents unintended navigation.

---

## 🚀 Core Functionalities

* **Resilient Identity Management**
  Profile data is fetched dynamically to keep user information current without triggering build-time failures.

* **Granular Cart Engine**

  * Quantity validation (1–10 units per item)
  * Stateful CRUD operations (Add, Remove, Restore) with instant UI feedback
  * Trash system with a “Recently Deleted” buffer for item recovery before permanent removal

* **SEO & Social Optimization**
  Advanced metadata configuration in `layout.js`, including Open Graph and Twitter Card support.

* **Responsive Design**
  Mobile-first UI built with Tailwind CSS using a utility-first approach for consistency and rapid development.

---

## 📁 Project Directory Structure

```bash
src/
├── app/
│   ├── cart/                 # Cart business logic & trash system
│   ├── products/
│   │   └── details/[id]/     # Dynamic product view
│   ├── profile/              # Dynamic user identity component
│   ├── layout.js             # Server-side shared infrastructure (SEO/Navbar)
│   └── page.js               # Home: product catalog entry
├── components/
│   ├── navbar/               # Navigation & brand logic
│   └── footer/               # Global metadata & links
└── globals.css                # Tailwind CSS configuration
```

---

## 🛠️ Installation & Local Setup

Clone the repository:

```bash
git clone https://github.com/githwizardn/ReactM.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🧠 Engineering Insights

* **Deployment Resilience**
  Client-side data fetching for API-dependent routes is a deliberate architectural choice to avoid build-time failures caused by external API instability.

* **Performance Optimization**
  Utilized `next/image` with priority loading for above-the-fold content (e.g., profile images) to improve Largest Contentful Paint (LCP).

---

**Lead Developer:** Nodo
**Status:** Midterm Project - Final version 