"use client";  
import { useState, useEffect } from "react";  
import Image from "next/image";  
import Link from "next/link";  

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);  
  const [deletedItems, setDeletedItems] = useState([]);  
  const [loading, setLoading] = useState(true);  

  // --- მონაცემების წამოღება (ჩატვირთვისას) ---
  useEffect(() => {
    let isMounted = true; // ცვლადი, რომელიც გვეხმარება ავიცილოთ შეცდომა, თუ კომპონენტი დაიხურა ჩატვირთვამდე.

    const loadCart = async () => {
      // ვამოწმებთ, ბრაუზერის მეხსიერებაში (LocalStorage) გვაქვს თუ არა შენახული კალათა.
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (savedCart.length > 0) {
        // თუ ლოკალურად რამე გვაქვს, იმას ვტვირთავთ სთეითში.
        if (isMounted) {
          setCartItems(savedCart);
          setLoading(false);
        }
      } else {
        // თუ მეხსიერება ცარიელია, მივმართავთ FakeStore API-ს.
        try {
          const res = await fetch('https://fakestoreapi.com/carts/2'); // ვიღებთ მე-2 კალათის მონაცემებს.
          const data = await res.json();
          // რადგან API მხოლოდ ID-ებს გვაძლევს, თითოეული ID-ით ვიღებთ სრულ ინფორმაციას (სურათი, ფასი).
          const fullProductDetails = await Promise.all(
            data.products.map(async (item) => {
              const productRes = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
              const productData = await productRes.json();
              return { ...productData, quantity: item.quantity }; // ვაერთიანებთ პროდუქტის მონაცემებს და რაოდენობას.
            })
          );
          if (isMounted) {
            setCartItems(fullProductDetails);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error:", err);
          if (isMounted) setLoading(false);
        }
      }
    };

    loadCart();

    return () => { isMounted = false; }; // კომპონენტის დახურვისას ვთიშავთ "მონიტორინგს".
  }, []);

  // --- LocalStorage-ში შენახვა ---
  useEffect(() => {
    // ყოველ ჯერზე, როცა კალათა (cartItems) შეიცვლება, ვინახავთ მას ბრაუზერში.
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  // რაოდენობის განახლება (+ ან - ღილაკები)
  const updateQty = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        // ვზღუდავთ, რომ რაოდენობა იყოს 1-დან 10-მდე.
        if (newQty >= 1 && newQty <= 10) return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // ნივთის წაშლა (გადატანა ურნაში)
  const handleDelete = (item) => {
    setCartItems(cartItems.filter((i) => i.id !== item.id)); // ვაშორებთ კალათას.
    setDeletedItems([...deletedItems, item]); // ვამატებთ ურნის მასივში.
  };

  // ნივთის აღდგენა (ურნიდან კალათაში)
  const handleRestore = (item) => {
    setDeletedItems(deletedItems.filter((i) => i.id !== item.id)); // ვაშორებთ ურნას.
    setCartItems([...cartItems, item]); // ვაბრუნებთ კალათაში.
  };

  // ურნის სრული გასუფთავება
  const emptyTrash = () => {
    if (window.confirm("Are you sure you want to permanently clear the trash?")) {
      setDeletedItems([]); // ვასუფთავებთ ურნის მასივს.
    }
  };

  // ჯამური ფასის დათვლა (ფასი გამრავლებული რაოდენობაზე)
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // სანამ მონაცემები იტვირთება, ვაჩვენებთ "Loading" ანიმაციას.
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 font-semibold text-gray-600">Loading your cart...</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Shopping Cart</h1>

      {/* --- აქტიური კალათის ვიზუალი --- */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {cartItems.length === 0 ? (
          // თუ კალათა ცარიელია
          <div className="p-20 text-center">
            <p className="text-2xl text-gray-400 mb-4">Your cart is empty 🛒</p>
            <Link href="/" className="text-blue-600 font-bold hover:underline">Continue Shopping</Link>
          </div>
        ) : (
          // თუ კალათაში ნივთებია, სათითაოდ გამოგვაქვს ისინი map-ით.
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-6 gap-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="relative w-24 h-24 bg-white border rounded-2xl p-2 shrink-0 shadow-sm">
                    <Image src={item.image} alt={item.title} fill className="object-contain p-2" sizes="96px" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 line-clamp-1 text-lg">{item.title}</p>
                    <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">{item.category}</p>
                    <p className="text-blue-600 font-bold text-xl">${item.price}</p>
                  </div>
                </div>

                {/* რაოდენობის კონტროლის ღილაკები */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-4">
                  <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm font-bold">−</button>
                  <span className="w-6 text-center font-bold text-lg text-gray-700">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm font-bold">+</button>
                </div>

                {/* ფასი და წაშლის ღილაკი */}
                <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                  <p className="font-black text-2xl text-gray-900 min-w-25 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleDelete(item)} className="p-3 text-gray-300 hover:text-red-500 transition-all">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- ურნის ვიზუალი (მხოლოდ მაშინ ჩანს, თუ მასში რამეა) --- */}
      {deletedItems.length > 0 && (
        <div className="bg-red-50 rounded-3xl p-8 border-2 border-dashed border-red-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-700 flex items-center gap-3">Recently Deleted ({deletedItems.length})</h2>
            <button onClick={emptyTrash} className="text-sm font-bold text-red-500 hover:underline uppercase transition-colors">Empty Trash</button>
          </div>
          <div className="grid gap-4">
            {deletedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-red-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image src={item.image} alt={item.title} fill className="object-contain opacity-60" sizes="48px" />
                  </div>
                  <span className="text-gray-600 font-medium line-clamp-1 max-w-50 sm:max-w-md">{item.title}</span>
                </div>
                <button onClick={() => handleRestore(item)} className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 font-bold transition-all shadow-md">Restore</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ჯამური გადასახდელი და Checkout --- */}
      {cartItems.length > 0 && (
        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-gray-400 text-lg">Total amount to pay:</p>
            <p className="text-5xl font-black text-blue-400">${totalAmount.toFixed(2)}</p>
          </div>
          <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95">
             <Link href="/" >CHECKOUT NOW</Link>
          </button>
        </div>
      )}
    </div>
  );
}