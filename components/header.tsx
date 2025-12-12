import React from 'react';

const LogoSymbol: React.FC = () => (
  <svg width="40" height="24" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
     <circle cx="10" cy="10" r="8" stroke="#EF4444" strokeWidth="4" />
     <path d="M30 2L38 18H22L30 2Z" stroke="#EF4444" strokeWidth="4" />
     <path d="M50 2L58 10L50 18L42 10L50 2Z" stroke="#EF4444" strokeWidth="4" />
     <rect x="2" y="24" width="16" height="16" stroke="#EF4444" strokeWidth="4" />
     <path d="M30 24L38 32L30 40L22 32L30 24Z" fill="#EF4444" /> {/* Solid X approximation or diamond */}
     <path d="M50 24L58 40H42L50 24Z" stroke="#EF4444" strokeWidth="4" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-6 md:px-12 flex justify-between items-start z-50">
      <div className="flex flex-col items-start gap-1">
        <a href="/" className="group flex flex-col items-start gap-1 mb-1 focus:outline-none">
            <div className="mb-1 transition-transform duration-300 group-hover:scale-105">
                <LogoSymbol />
            </div>
            <div className="text-3xl font-bold tracking-tighter text-red-500 brand-font leading-none">
              COATS<span className="text-gray-400">.IN</span>
            </div>
        </a>
        
        <nav className="flex flex-col items-start mt-4 gap-1 text-sm font-medium text-red-500 brand-font tracking-wide">
          <a href="#about" className="hover:text-red-700 transition-colors uppercase">About</a>
          <a href="#contact" className="hover:text-red-700 transition-colors uppercase">Contact</a>
        </nav>
      </div>

      <div className="pt-2">
        <a href="#login" className="text-red-500 font-bold uppercase tracking-wide hover:text-red-700 transition-colors brand-font text-lg">
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
