"use client"; // გადაგვყავს კლიენტის მხარეს, რომ Vercel-ის ბილდი არ გაფუჭდეს

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users/3")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setError(true));
  }, []);

  if (error) return <div className="p-10 text-center text-red-500">Failed to load profile. Please refresh.</div>;
  if (!user) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="flex flex-col md:flex-row max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 items-center">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-blue-800">User Profile</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.name.firstname} {user.name.lastname}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      <div className="md:ml-6 mt-6 md:mt-0">
        <Image 
          src="/profile.jpg" 
          alt="User Profile" 
          width={150}
          height={150}
          className="rounded-full border-4 border-blue-500 shadow-lg"
          priority 
        />
      </div>
    </div>
  );
}