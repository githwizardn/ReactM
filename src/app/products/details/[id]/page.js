"use client"; 
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useDispatch } from "react-redux"; //  useDispatch დამატება
import { addToCart } from "@/store/cartSlice"; //    addToCart  სლაისიდან

export default function DetailsPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // ინიციალიზაცია

  useEffect(() => {
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

  //  შეცვლილი ფუნქცია Redux-ისთვის
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // ეს ავტომატურად განაახლებს Redux-ს და LocalStorage-ს  
      toast.success("Added to Nebula Cart!", { position: "bottom-center" });    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!product) return <div className="p-10 text-center font-bold text-red-500">Product not found!</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-12 mt-10 border border-gray-100">
      <div className="w-full md:w-1/2 flex justify-center bg-gray-50 rounded-xl p-6">
        <Image 
          src={product.image} 
          width={400} 
          height={500} 
          className="object-contain h-100 hover:scale-105 transition-transform duration-300" 
          alt={product.title} 
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
        
        <div className="flex items-center gap-4 mb-6">
           <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
            ★ {product.rating?.rate}
          </div>
          <span className="text-gray-400 text-sm">({product.rating?.count} reviews)</span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>
        
        <div className="flex items-center justify-between mb-8">
          <div className="text-4xl font-black text-gray-900">${product.price}</div>
        </div>

        <button 
          onClick={handleAddToCart} //გამოძახება 
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}