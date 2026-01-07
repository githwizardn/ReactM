export default function Footer() {
  return (
     <footer className="bg-[#f0f2f2] border-t border-gray-300 py-6">
      
       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center text-[11px] text-gray-600">
        
         <div className="flex gap-4 mb-2 md:mb-0">
          
           <span className="hover:underline cursor-pointer">Conditions of Use</span>
          
           <span className="hover:underline cursor-pointer">Privacy Notice</span>
          
           <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
        </div>
        
         <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}