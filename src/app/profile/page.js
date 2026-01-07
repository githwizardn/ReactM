import Image from 'next/image';

export default async function ProfilePage() {
  try {
    // მონაცემების წამოღება შეცდომების მართვით
    const res = await fetch('https://fakestoreapi.com/users/3', {
      next: { revalidate: 3600 } //   მონაცემების განახლება საათში ერთხელ
    });

    // თუ API-მ HTML ან შეცდომა დააბრუნა
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const user = await res.json();

    return (
      <div className="flex flex-col-reverse md:flex-row max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 items-center md:items-start">
        <div className="space-y-4 pt-4 flex-1 w-full">
          <h1 className="text-2xl font-bold mb-4 text-blue-800 hidden md:block">User Profile</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Full Name:</strong> {user.name.firstname} {user.name.lastname}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
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
            priority // სურათის სწრაფი ჩატვირთვისთვის
          />
        </div>
      </div>
    );
  } catch (error) {
    // თუ ფეჩინგისას მოხდა შეცდომა (მაგ. API გამორთულია)
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
        <p className="text-gray-600">The server could not retrieve user data at this moment. Please try again later.</p>
      </div>
    );
  }
}