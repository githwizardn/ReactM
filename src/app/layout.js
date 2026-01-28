import "./globals.css";  
import Navbar from "@/components/navbar/navbar";  
import Footer from "@/components/footer/footer"; 
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";  // იმპორტი

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",  
};

export const metadata = {
  title: "Nebula Shop | Premium eCommerce Store",
  description: "Explore Nebula Shop for a seamless shopping experience. High-quality electronics, jewelry, and fashion with real-time cart management.",
  keywords: "Next.js, eCommerce, React, Tailwind CSS, Shopping Cart",
  
  openGraph: {
    title: "Nebula Shop | Modern eCommerce Experience",
    description: "Shop the latest trends with our high-performance React application.",
    url: "https://react-m-five.vercel.app/", 
    siteName: "Nebula Shop Store",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nebula Shop Storefront Preview" }],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nebula Shop | Premium eCommerce Store",
    description: "Explore the best products with Next.js performance.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        {/*  Providers-ით შეფუთვა */}
        <Providers>
          <Navbar /> 
          <Toaster position="bottom-right" reverseOrder={false} />
          <main className="grow container mx-auto p-4">
            {children}
          </main>
          <Footer />  
        </Providers>
      </body>
    </html>
  );
}