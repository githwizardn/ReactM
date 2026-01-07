import Image from 'next/image';

// This is the most important line. It tells Vercel: 
// "Do NOT try to build this page during deployment. Wait until a user opens it."
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  // 1. Fetch data with no caching
  const res = await fetch('https://fakestoreapi.com/users/3', { cache: 'no-store' });
  
  // 2. Simple check: If the API fails, show a basic message
  if (!res.ok) {
    return <div className="p-10 text-center">API is busy. Please refresh.</div>;
  }

  const user = await res.json();

  // 3. Simple Render
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