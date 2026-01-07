"use client"; 
import { useState, useEffect } from "react";
import Image from 'next/image';

export default function DetailsPage({ params }) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // პარამეტრების ამოღება და მონაცემების წამოღება
    const fetchProduct = async () => {
      const { id } = await params; 
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params]);

  // კალათაში დამატების ფუნქცია 
  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = currentCart.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${product.title.substring(0, 20)}... added to cart!`);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found!</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col md:flex-row gap-10">
      <Image 
        src={product.image} 
        width={300} 
        height={384} 
        className="w-full md:w-1/3 object-contain h-96" 
        alt={product.title} 
      />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-500 mb-6 italic">{product.category}</p>
        <p className="text-lg text-gray-700 mb-6">{product.description}</p>
        
        <div className="text-2xl font-bold text-blue-600 mb-4">${product.price}</div>
        
        <div className="bg-blue-50 p-4 rounded text-sm mb-6">
          Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
        </div>


        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-colors cursor-pointer active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}