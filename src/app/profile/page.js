import Image from 'next/image';

export default async function ProfilePage() {
  const res = await fetch('https://fakestoreapi.com/users/3');
  const user = await res.json();

  return (


  <div className="flex flex-col-reverse md:flex-row max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 items-center md:items-start">
      
       <div className="space-y-4 pt-4 flex-1 w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-800 hidden md:block">User Profile</h1>
        <p ><strong>Username:</strong> {user.username}</p>
        <p ><strong>Email:</strong> {user.email}</p>
        <p ><strong>Full Name:</strong> {user.name.firstname} {user.name.lastname}</p>
        <p ><strong>Phone:</strong> {user.phone}</p>
      </div>

      {/* სურათი */}
      <div className="flex flex-col items-center p-5 md:ml-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-800 md:hidden">User Profile</h1>
        <Image 
          src="/profile.jpg" 
          alt="User Profile" 
          width={150}
          height={150}
          className="rounded-full mb-4 object-cover border-4 border-blue-500 shadow-lg"
        />
      </div>
      
    </div>
  );
}