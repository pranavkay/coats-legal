import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
      
      {/* 
        Refined Layout 
        Using a flex column stack with explicit spacing (gap) ensures perfect vertical rhythm
        without relying on fragile absolute positioning for the central element.
      */}
      <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Main Headline Group */}
          <div className="flex flex-col items-center justify-center">
            {/* Reduced sizes from [10rem] to 8xl/7xl to fit better on standard screens */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 uppercase tracking-tighter brand-font leading-[0.85] mb-0 drop-shadow-sm">
              Coats <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Reads</span>
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 uppercase tracking-tighter brand-font leading-[0.85]">
              14,000 Cases/Hr
            </h2>
          </div>

          {/* 
            Interactive Growing CTA Container
            Now part of the document flow. 
            h-24 creates a reserved 'stage' for the button to expand into without pushing content.
          */}
          <div className="my-6 md:my-8 w-full flex items-center justify-center h-20 relative z-20">
             <div className="group relative flex items-center justify-center w-64 h-full cursor-pointer">
                {/* The Button/Line Element */}
                <button className="absolute bg-red-600 text-white overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                   w-24 h-1.5 rounded-full group-hover:w-56 group-hover:h-14 group-hover:rounded-lg group-hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]
                                   flex items-center justify-center transform group-hover:scale-105">
                  
                  {/* Text Container */}
                  <span className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100
                                   font-bold uppercase tracking-widest text-lg brand-font whitespace-nowrap">
                    Join Waitlist
                  </span>
                </button>

                {/* Pulse ring animation for the 'line' state */}
                <div className="absolute w-24 h-1.5 rounded-full bg-red-500/50 animate-ping group-hover:hidden pointer-events-none"></div>
                
                {/* Invisible Hover Assistant (increases hit area) */}
                <div className="absolute inset-0 bg-transparent" />
              </div>
          </div>

          <h3 className="text-lg md:text-2xl font-bold text-gray-600 uppercase tracking-widest brand-font mb-10 max-w-3xl leading-tight">
            Win cases with the power of <br className="hidden md:block" /> AI
          </h3>

          {/* Feature Grid - Floating glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full text-left">
            <div className="group p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-4 text-white shadow-lg shadow-red-500/30">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 uppercase mb-2 brand-font group-hover:text-red-600 transition-colors">Analysis at Speed</h4>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                Gather intelligence on lawyers, judges, courts, successes and failures related to any case instantly. Coats can analyze thousands of documents in seconds rather than days.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mb-4 text-white shadow-lg shadow-gray-800/30">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 uppercase mb-2 brand-font group-hover:text-red-600 transition-colors">Predictive Outcomes</h4>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                Simulate outcomes using artificial intelligence models trained on millions of historical court rulings.
              </p>
            </div>
          </div>
      </div>

    </div>
  );
};

export default Hero;
