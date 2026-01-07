import Image from 'next/image';

// Force dynamic ensures Vercel doesn't try to bake an API error into your static build
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProfilePage() {
  try {
    // We use a timeout signal to prevent the build from hanging if the API is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('https://fakestoreapi.com/users/3', {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error('API Response was not OK');
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

        <div className="flex flex-col items-center p-5 md:ml-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-800 md:hidden">User Profile</h1>
          <Image 
            src="/profile.jpg" 
            alt="User Profile" 
            width={150}
            height={150}
            className="rounded-full mb-4 object-cover border-4 border-blue-500 shadow-lg"
            priority 
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Profile Temporarily Unavailable</h1>
        <p className="text-gray-600">The external API is currently unresponsive. Please try refreshing the browser.</p>
        <p className="mt-4 text-sm text-gray-400">Technical details: Remote API Connection Timeout</p>
      </div>
    );
  }
}