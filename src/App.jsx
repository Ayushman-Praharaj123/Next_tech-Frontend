import { useState } from "react";
import Header from "./components/Header.jsx";
import UploadForm from "./components/UploadForm.jsx";
import DetectionResult from "./components/DetectionResult.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ModelShowcase from "./components/ModelShowcase.jsx";
import Features from "./components/Features.jsx";
import Analytics from "./components/Analytics.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [detectionHistory, setDetectionHistory] = useState([]);

  const handleNewDetection = (newResult) => {
    setResult(newResult);
    if (newResult && !newResult.error) {
      setDetectionHistory(prev => [...prev, newResult]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden">
      {/* Epic Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        {/* Large Moving Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-teal-400/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-emerald-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 right-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping delay-1500"></div>
        <div className="absolute bottom-40 right-10 w-1.5 h-1.5 bg-teal-300/40 rounded-full animate-bounce delay-2000"></div>
        
        {/* Moving Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-teal-400/30 to-transparent animate-pulse delay-700"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse delay-1400"></div>
        
        {/* Diagonal Moving Lines */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-pulse delay-300"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-teal-400/15 to-transparent animate-pulse delay-1100"></div>
        
        {/* Rotating Elements */}
        <div className="absolute top-20 left-1/2 w-32 h-32 border border-emerald-400/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-teal-400/10 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        
        {/* Floating Squares */}
        <div className="absolute top-1/4 left-20 w-4 h-4 bg-emerald-400/20 rotate-45 animate-bounce delay-800"></div>
        <div className="absolute bottom-1/4 right-32 w-3 h-3 bg-teal-400/20 rotate-45 animate-bounce delay-1200"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-teal-400/40 to-transparent animate-pulse delay-500"></div>
        </div>
        
        {/* Matrix-style Dots */}
        <div className="absolute top-16 left-16 grid grid-cols-8 gap-4 opacity-20">
          {Array.from({length: 32}).map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" 
              style={{animationDelay: `${i * 100}ms`}}
            ></div>
          ))}
        </div>
        
        {/* Hexagon Pattern */}
        <div className="absolute bottom-32 right-16 opacity-10">
          <div className="w-8 h-8 border border-emerald-400 transform rotate-45 animate-pulse"></div>
          <div className="w-6 h-6 border border-teal-400 transform rotate-45 animate-pulse delay-500 absolute top-1 left-1"></div>
        </div>
        
        {/* Moving Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/5 via-transparent to-teal-900/5 animate-pulse"></div>
        
        {/* Radar Sweep Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-emerald-400/10 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
          <div className="w-64 h-64 border border-teal-400/10 rounded-full animate-ping absolute top-16 left-16" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
        </div>
        
        {/* Glitch Lines */}
        <div className="absolute top-1/4 right-0 w-32 h-px bg-emerald-400/30 animate-pulse delay-200"></div>
        <div className="absolute top-3/4 left-0 w-24 h-px bg-teal-400/30 animate-pulse delay-600"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-px bg-cyan-400/30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Hero Section only on home page */}
        {currentPage === 'home' && <HeroSection />}
        
        <main className="max-w-7xl mx-auto py-12 px-4 space-y-12">
          {/* Model Showcase only on home and detection pages */}
          {(currentPage === 'home' || currentPage === 'detection') && <ModelShowcase />}
          
          {/* Home page content */}
          {currentPage === 'home' && (
            <div className="text-center">
              <Features />
            </div>
          )}
          
          {/* Detection page content */}
          {currentPage === 'detection' && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <UploadForm 
                  setResult={handleNewDetection} 
                  setLoading={setLoading} 
                  setImage={setImage} 
                />
              </div>
              <DetectionResult result={result} image={image} loading={loading} />
            </div>
          )}
          
          {currentPage === 'analytics' && (
            <Analytics detectionHistory={detectionHistory} />
          )}

          {currentPage === 'about' && (
            <About />
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;









