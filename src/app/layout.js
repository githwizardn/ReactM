import "./globals.css";  

import Navbar from "@/components/navbar/navbar";  
import Footer from "@/components/footer/footer"; 

 export const metadata = {
  title: "ReactM | Premium eCommerce Store",
  description: "Discover the best products at ReactM. Fast shipping, secure payments, and a wide variety of items from electronics to fashion.",
  keywords: "eCommerce, React, Next.js, Shopping, FakeStore, Nodo's Project",
  authors: [{ name: "Nodo" }],
  viewport: "width=device-width, initial-scale=1",
};

// განსაზღვრავს მთავარ Layout ფუნქციას, რომელიც იღებს { children }-ს.  იმიტომ, რომ Layout არის "ჩარჩო", ხოლო children არის ის კონკრეტული გვერდი, რომელზეც მომხმარებელი იმყოფება.
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