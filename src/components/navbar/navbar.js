import Link from 'next/link';  

export default function Navbar() {
  
  return (
     <nav className="bg-linear-to-r from-blue-800 to-blue-600 p-6">
      
       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg py-3 px-8 flex justify-around items-center text-gray-700 font-medium">
        
         <Link href="/" className="hover:text-blue-600 flex items-center gap-2">
          🏠 Home
        </Link>
        
         <Link href="/profile" className="hover:text-blue-600 flex items-center gap-2">
          👤 Account
        </Link>
        
         <Link href="/cart" className="hover:text-blue-600 flex items-center gap-2">
          🛒 Cart
        </Link>
      </div>
    </nav>
  );
}