"use client";   
import { useState, useEffect } from "react";   // React-ის ჰუკები
import Link from "next/link";  
import Image from "next/image";  

export default function ProductsPage() {
  const [products, setProducts] = useState([]); // ქმნის მდგომარეობას (state) პროდუქტების სიისთვის. საწყისი მნიშვნელობაა ცარიელი მასივი [].

  // useEffect ეშვება მაშინ, როცა კომპონენტი პირველად იხატება ეკრანზე.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products") // მიმართავს გარე სერვერს პროდუქტების სიის მისაღებად.
      .then((res) => res.json()) // სერვერიდან მიღებულ პასუხს გარდაქმნის JavaScript-ისთვის გასაგებ JSON ფორმატში.
      .then((data) => setProducts(data)); // მიღებულ მონაცემებს (მასივს) წერს 'products' ცვლადში, რაც აიძულებს გვერდს ხელახლა გადაიხატოს.
  }, []); // ცარიელი მასივი ნიშნავს, რომ ეს კოდი მხოლოდ ერთხელ გაეშვება.

  // ---  კალათაში დამატება ---
  const addToCart = (e, product) => {
    e.preventDefault(); //  აჩერებს Link-ის მოქმედებას. 

    //   ამოვიღოთ არსებული კალათა LocalStorage-დან. თუ იქ არაფერია, ვიღებთ ცარიელ მასივს.
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    //   ვამოწმებთ, ეს პროდუქტი უკვე ხომ არ გვიდევს კალათაში ID-ის მიხედვით.
    const itemIndex = currentCart.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      // თუ პროდუქტი უკვე არის კალათაში, ვპოულობთ მას და მხოლოდ რაოდენობას (quantity) ვზრდით ერთით.
      currentCart[itemIndex].quantity += 1;
    } else {
      // თუ პროდუქტი ახალია, ვამატებთ მას მასივში და ვუწერთ საწყის რაოდენობას: 1.
      currentCart.push({ ...product, quantity: 1 });
    }

    //  განახლებულ მასივს ვაქცევთ ტექსტად (String) და ვინახავთ LocalStorage-ში "cart" გასაღებით.
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // ვაჩვენებთ შეტყობინებას მომხმარებელს, რომ ნივთი წარმატებით დაემატა.
    alert(`${product.title.substring(0, 20)}... added to cart!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          // თითოეული პროდუქტისთვის იქმნება ბმული დეტალების გვერდზე გადასასვლელად.
          <Link key={item.id} href={`/products/details/${item.id}`}>

            <div className="bg-white p-4 shadow hover:shadow-lg transition flex flex-col h-full cursor-pointer rounded-lg border border-gray-100 group">
              

              <div className="h-40 flex items-center justify-center mb-4 relative">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={200} 
                  height={160} 
                  className="max-h-full object-contain group-hover:scale-105 transition-transform" 
                />
              </div>
              
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Ships to Georgia</p> 
              

              <h3 className="text-sm font-bold line-clamp-2 text-gray-800 mb-1 h-10">{item.title}</h3> 
              
              <div className="text-yellow-400 text-xs mb-2">⭐⭐⭐⭐⭐ {item.rating?.count} reviews</div> 
              

              <div className="mt-auto">
                <p className="text-xl font-black text-gray-900 mb-3">${item.price}</p> 
                

                <button 
                  onClick={(e) => addToCart(e, item)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}