Live Demo: View on Vercel  https://react-m-five.vercel.app/ 

🛒 Advanced E-Commerce Architecture
This is a high-performance e-commerce prototype engineered with the Next.js App Router. The platform leverages a sophisticated hybrid rendering strategy to optimize performance and deployment stability while maintaining a fluid, interactive user experience.

🏗️ Technical Architecture & Methodology
This project implements modern web standards to solve common challenges in distributed frontend systems, specifically focusing on API resilience and deployment reliability.

1. Hybrid Rendering & Data Strategy
To optimize Core Web Vitals and ensure a seamless deployment on Vercel, the application strategically splits rendering responsibilities:

Client-Side Fetching (CSR): Utilized for the User Profile, Product Catalog, and Cart Logic. By shifting data fetching to the client side, the application bypasses "Prerender" bottlenecks during the Vercel build phase, ensuring the site deploys successfully even if external APIs (FakeStoreAPI) experience high latency.

Server-Side Layouts: The global UI shell, including the Navbar and Footer, is managed via Server Components in the root layout.js. This ensures that shared infrastructure is rendered once on the server, improving initial load times.

Dynamic Routing: Implemented via [id] segments for product details, allowing for infinite scalability with a dry (Don't Repeat Yourself) codebase.

2. State Management & Persistence
Persistence Layer: Integrated with the Browser LocalStorage API to ensure shopping cart data persists across sessions and page refreshes.

Hydration Synchronization: Implemented a useEffect mounting strategy to prevent Hydration Mismatch—a common issue when reconciling server-rendered HTML with client-side stateful data.

3. Event Handling & UX Optimization
Event Propagation Control: Utilized e.preventDefault() and e.stopPropagation() on nested interactive elements (like "Add to Cart" buttons inside product links) to ensure clean logic execution without unintended navigation.

🚀 Core Functionalities
Resilient Identity Management: Profile data is fetched dynamically to ensure user information is always current without failing build-time checks.

Granular Cart Engine:

Validation logic constraining item quantities (1–10 units).

Stateful CRUD operations (Add, Remove, Restore) with instant UI feedback.

Trash System: A dedicated "Recently Deleted" buffer allowing users to restore items before permanent removal.

SEO & Social Optimization: Advanced metadata configuration in layout.js including Open Graph and Twitter Cards for professional social sharing.

Responsive Design: A mobile-first interface crafted with Tailwind CSS, utilizing a utility-first approach for rapid styling and consistency.

📁 Project Directory Structure
Bash

src/
├── app/                  # Application Core (Routes & Layouts)
│   ├── cart/             # Cart Business Logic & Trash System
│   ├── products/
│   │   └── details/[id]/ # Dynamic Product View
│   ├── profile/          # Dynamic User Identity Component
│   ├── layout.js         # Server-Side Shared Infrastructure (SEO/Navbar)
│   └── page.js           # Home: Product Catalog Entry
├── components/           # Reusable Component Library
│   ├── navbar/           # Navigation & Brand Logic
│   └── footer/           # Global Metadata & Links
└── globals.css           # Tailwind CSS Configuration
🛠️ Installation & Local Setup
Clone the Repository

Bash

git clone https://github.com/githwizardn/ReactM.git
Install Dependencies

Bash

npm install
Execute Development Server

Bash

npm run dev
🧠 Engineering Insights
Deployment Resilience: The decision to utilize Client-Side Fetching for API-dependent routes was a deliberate architectural choice to ensure high availability and bypass build-time failures associated with external API instability.

Performance: Leveraged next/image with priority loading for "Above the Fold" content (like profile pictures) to optimize Largest Contentful Paint (LCP).

Lead Developer: Nodo

Status: Midterm Project - Final Version

