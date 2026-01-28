"use client";   
import { useState, useEffect } from "react";   
import Link from "next/link";  
import Image from "next/image";  
import toast from "react-hot-toast"; // Import toast
import { useDispatch } from "react-redux"; //   useDispatch
import { addToCart } from "@/store/cartSlice"; //  Action

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch(); // ინიციალიზაცია

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //  კალათაში დამატება ---
  const handleAddToCart = (e, product) => {
    e.preventDefault(); //  
    
    dispatch(addToCart(product)); 
    

toast.success(`${product.title.substring(0, 20)}... added to cart!`, {
      style: {
        border: '1px solid #3b82f6',
        padding: '16px',
        color: '#1e40af',
        borderRadius: '15px',
        fontWeight: 'bold'
      },
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#FFFAEE',
      },
    });  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-black mb-8 text-gray-800 tracking-tight">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <Link key={item.id} href={`/products/details/${item.id}`}>
            <div className="bg-white p-5 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer rounded-2xl border border-gray-100 group relative">
              
              <div className="h-48 flex items-center justify-center mb-4 relative overflow-hidden rounded-xl bg-gray-50 p-4">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={200} 
                  height={160} 
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              
              <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-1">Global Shipping</p> 

              <h3 className="text-sm font-bold line-clamp-2 text-gray-800 mb-2 h-10 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3> 
              
              <div className="flex items-center gap-1 text-yellow-400 text-sm mb-3">
                <span>★★★★★</span> <span>{item.rating?.rate}</span>
                <span className="text-gray-400 text-sm">({item.rating?.count} reviews)</span>
              </div> 
              
              <div className="mt-auto">
                <p className="text-2xl font-black text-gray-900 mb-4">${item.price}</p> 
                
                <button 
                  onClick={(e) => handleAddToCart(e, item)} //  ახალი ფუნქცია
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Add to Cart</span>
                  <span className="text-lg"></span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}