import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-gray-900 bg-gray-50/50">
      {/* Background Layer */}
      <ParticleBackground />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Hero />
        </main>
      </div>
    </div>
  );
};

export default App;
