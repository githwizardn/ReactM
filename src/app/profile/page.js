"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //  ვამოწმებთ არის თუ არა ტოკენი. თუ არაა - ვაბრუნებთ ლოგინზე.
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    //  მომხმარებლის მონაცემების წამოღება
    fetch("https://fakestoreapi.com/users/1")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setError(true));
  }, [router]);

  // გამოსვლა
  const handleLogout = () => {
    localStorage.removeItem("token"); // ვშლით ტოკენს
    router.push("/login"); // გადავდივართ ლოგინზე
  };

  if (error) return <div className="p-10 text-center text-red-500 font-bold">Failed to load profile. Please refresh.</div>;
  if (!user) return (
    <div className="flex justify-center items-center min-h-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-1">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-10">
        
        {/* ინფორმაციის ბლოკი */}
        <div className="flex-1 space-y-6 w-full text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 border-b pb-4">Account Details</h1>
          
          <div className="space-y-3">
            <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">User Info</p>
            <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
              <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Full Name:</strong> {user.name.firstname} {user.name.lastname}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
            </div>
          </div>

          {/* Logout ღილაკი */}
          <button 
            onClick={handleLogout}
            className="w-full md:w-auto bg-red-50 text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95 border border-red-100"
          >
            Logout From Account
          </button>
        </div>

        {/* პროფილის სურათი */}
        <div className="relative shrink-0">
          <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
            <Image 
              src="/profile.jpg" 
              alt="User Profile" 
              fill
              className="object-cover"
              priority 
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
        </div>
      </div>
    </div>
  );
}