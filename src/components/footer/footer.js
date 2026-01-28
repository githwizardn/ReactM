export default function Footer() {
  return (
    <footer className="bg-[#f0f2f2] border-t border-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center text-[12px] text-gray-600 gap-4">
          
          

          {/*   ლინკები */}
          <div className="flex gap-6">
            <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">Conditions of Use</span>
            <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">Privacy Notice</span>
            <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">Help Center</span>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-500">
            © {new Date().getFullYear()} Nebula Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}