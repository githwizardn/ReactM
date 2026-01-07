import "./globals.css";  
import Navbar from "@/components/navbar/navbar";  
import Footer from "@/components/footer/footer"; 

 export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",  
};

export const metadata = {
  title: "ReactM | Premium eCommerce Store",
  description: "Explore ReactM for a seamless shopping experience. High-quality electronics, jewelry, and fashion with real-time cart management.",
  keywords: "Next.js, eCommerce, React, Tailwind CSS, Shopping Cart",
  
  // Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "ReactM | Modern eCommerce Experience",
    description: "Shop the latest trends with our high-performance React application.",
    url: "https://your-deployment-link.vercel.app", 
    siteName: "ReactM Store",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "ReactM Storefront Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Tags
  twitter: {
    card: "summary_large_image",
    title: "ReactM | Premium eCommerce Store",
    description: "Explore the best products with Next.js performance.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        <Navbar /> 
        <main className="grow container mx-auto p-4">
          {children}
        </main>
        <Footer />  
      </body>
    </html>
  );
}