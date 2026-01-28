"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '@/store/cartSlice';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const totalQuantity = useSelector(selectTotalQuantity);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token !== isLoggedIn) {
      setIsLoggedIn(!!token);
    }
  }, [isLoggedIn]);

  return (
    <nav className="bg-linear-to-r from-blue-800 to-blue-600 p-6 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl py-3 px-12 flex justify-around items-center text-gray-700 font-semibold">
        
        {/*  Home */}
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>

       

        {/*   Cart */}
        <Link href="/cart" className="relative group hover:text-blue-600 transition-colors flex items-center gap-1">
          Cart
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              {totalQuantity}
            </span>
          )}
        </Link>

         {/*  Account / Login (Conditional) */}
        {isLoggedIn ? (
          <Link href="/profile" className="hover:text-blue-600 transition-colors">
            Profile
          </Link>
        ) : (
          <Link href="/login" className="hover:text-blue-600 transition-colors">
            Profile
          </Link>
        )}

        {/*   Register */}
        <Link 
          href="/register" 
          className="bg-blue-600 text-white px-8 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          Register
        </Link>

      </div>
    </nav>
  );
}