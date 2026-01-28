"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  setCart, 
  updateQuantity, 
  moveToTrash, 
  restoreFromTrash, 
  emptyTrash,
  selectCartItems, 
  selectDeletedItems,
  selectTotalQuantity, 
  selectTotalPrice 
} from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems); 
  const deletedItems = useSelector(selectDeletedItems);
  const totalItems = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalPrice);

  // --- Initial Load ---
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length > 0 && cartItems.length === 0) {
      dispatch(setCart(savedCart));
    }
   }, [dispatch, cartItems.length]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Shopping Cart</h1>
        <p className="text-blue-600 font-bold">Total Items: {totalItems}</p>
      </div>

      {/* ---   Cart --- */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {cartItems.length === 0 ? (
          <div className="p-20 text-center">
            <p className="text-2xl text-gray-400 mb-4">Your cart is empty </p>
            <Link href="/" className="text-blue-600 font-bold hover:underline">Continue Shopping</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-6 gap-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="relative w-24 h-24 bg-white border rounded-2xl p-2 shrink-0 shadow-sm">
                    <Image src={item.image} alt={item.title} fill className="object-contain p-2" sizes="96px" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 line-clamp-1 text-lg">{item.title}</p>
                    <p className="text-blue-600 font-bold text-xl">${item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-4">
                  <button onClick={() => dispatch(updateQuantity({id: item.id, amount: -1}))} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm font-bold hover:bg-gray-200">−</button>
                  <span className="w-6 text-center font-bold text-lg">{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({id: item.id, amount: 1}))} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm font-bold hover:bg-gray-200">+</button>
                </div>

                {/* Price and Delete Button */}
                <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                  <p className="font-black text-2xl text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => dispatch(moveToTrash(item.id))} className="p-3 text-gray-300 hover:text-red-500 transition-all text-xl">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---   (Trash)   --- */}
      {deletedItems.length > 0 && (
        <div className="bg-red-50 rounded-3xl p-8 border-2 border-dashed border-red-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-700">Recently Deleted ({deletedItems.length})</h2>
            <button 
              onClick={() => { if(window.confirm("Clear trash?")) dispatch(emptyTrash()) }} 
              className="text-sm font-bold text-red-500 hover:underline uppercase"
            >
              Empty Trash
            </button>
          </div>
          <div className="grid gap-4">
            {deletedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-red-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image src={item.image} alt={item.title} fill className="object-contain opacity-60" sizes="48px" />
                  </div>
                  <span className="text-gray-600 font-medium line-clamp-1">{item.title}</span>
                </div>
                <button 
                  onClick={() => dispatch(restoreFromTrash(item.id))} 
                  className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 font-bold transition-all shadow-md"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Checkout  --- */}
      {cartItems.length > 0 && (
        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-gray-400 text-lg">Total amount to pay:</p>
            <p className="text-5xl font-black text-blue-400">${totalAmount.toFixed(2)}</p>
          </div>
                  
           <Link href="/" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg">
          CHECKOUT NOW
        </Link>
         
        </div>
      )}
    </div>
  );
}