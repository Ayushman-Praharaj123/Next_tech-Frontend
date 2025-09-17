import { useState, useEffect } from "react";
import { Cpu, Camera, Radar, Sun, Wifi, Battery } from "lucide-react";

export default function ModelShowcase() {
  const [rotation, setRotation] = useState(0);
  const [wingFlap, setWingFlap] = useState(0);
  const [propellerSpin, setPropellerSpin] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.3);
      setWingFlap(prev => prev + 6);
      setPropellerSpin(prev => prev + 15);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Guard-X Beetle Drone - Covert Surveillance Unit
        </h2>
        <p className="text-emerald-400 text-center mb-12">
          Unobtrusive-scale design with solar-powered surveillance and threat detection
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Beetle Drone Model */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 overflow-hidden relative">
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {Array.from({length: 64}).map((_, i) => (
                    <div key={i} className="border border-emerald-400/20"></div>
                  ))}
                </div>
              </div>

              {/* Crosshair Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/40"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-400/40"></div>
              </div>

              <div className="relative h-80 flex items-center justify-center">
                
                {/* Main Beetle Drone */}
                <div 
                  className="relative"
                  style={{ 
                    transform: `rotateY(${rotation}deg) rotateX(15deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  
                  {/* Main Body - Realistic Beetle Shape */}
                  <div className="relative">
                    
                    {/* Head with Thermal Camera */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-full shadow-2xl border border-slate-600">
                      {/* Thermal Camera */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-2 border-slate-500">
                        <div className="absolute inset-1 bg-red-400 rounded-full animate-pulse">
                          <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
                        </div>
                      </div>
                      
                      {/* RGB Sensors */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      
                      {/* Antennae for Communication */}
                      <div className="absolute -top-3 left-2 w-0.5 h-4 bg-slate-400 rounded-full transform rotate-15"></div>
                      <div className="absolute -top-3 right-2 w-0.5 h-4 bg-slate-400 rounded-full transform -rotate-15"></div>
                    </div>

                    {/* Thorax - Main Body with Solar Panels */}
                    <div className="w-20 h-14 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 rounded-xl shadow-2xl relative border border-slate-500">
                      
                      {/* Solar Panel Texture */}
                      <div className="absolute inset-2 border border-blue-400/30 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-800/20"></div>
                      <div className="absolute top-3 left-2 right-2 h-0.5 bg-blue-400/40"></div>
                      <div className="absolute top-6 left-2 right-2 h-0.5 bg-blue-400/40"></div>
                      <div className="absolute top-9 left-2 right-2 h-0.5 bg-blue-400/40"></div>

                      {/* Wing Cases with Solar Integration */}
                      <div className="absolute top-1 left-1 w-8 h-11 bg-gradient-to-br from-blue-500/20 to-slate-700 rounded-lg shadow-lg border border-blue-400/50">
                        <div className="absolute inset-1 bg-gradient-to-br from-blue-400/20 to-transparent rounded-md"></div>
                      </div>
                      <div className="absolute top-1 right-1 w-8 h-11 bg-gradient-to-br from-blue-500/20 to-slate-700 rounded-lg shadow-lg border border-blue-400/50">
                        <div className="absolute inset-1 bg-gradient-to-br from-blue-400/20 to-transparent rounded-md"></div>
                      </div>

                      {/* Propellers */}
                      <div className="absolute -top-2 left-2">
                        <div 
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ transform: `rotate(${propellerSpin}deg)` }}
                        >
                          <div className="w-6 h-0.5 bg-slate-300 rounded-full"></div>
                          <div className="w-0.5 h-6 bg-slate-300 rounded-full absolute"></div>
                        </div>
                      </div>
                      <div className="absolute -top-2 right-2">
                        <div 
                          className="w-6 h-6 flex items-center justify-center"
                          style={{ transform: `rotate(${-propellerSpin}deg)` }}
                        >
                          <div className="w-6 h-0.5 bg-slate-300 rounded-full"></div>
                          <div className="w-0.5 h-6 bg-slate-300 rounded-full absolute"></div>
                        </div>
                      </div>

                      {/* ML Model Processing Unit */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-slate-900 rounded border-2 border-emerald-400">
                        <div className="w-2 h-1 bg-emerald-400 rounded-full mx-auto mt-0.5 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Wheels for Land Surveillance */}
                    <div className="absolute top-12 -left-2 w-3 h-3 bg-slate-600 rounded-full border border-slate-400"></div>
                    <div className="absolute top-12 -right-2 w-3 h-3 bg-slate-600 rounded-full border border-slate-400"></div>

                    {/* Mechanical Legs */}
                    <div className="absolute top-1 -left-6 w-8 h-1 bg-slate-600 rounded-full transform rotate-45 origin-right shadow-lg"></div>
                    <div className="absolute top-1 -right-6 w-8 h-1 bg-slate-600 rounded-full transform -rotate-45 origin-left shadow-lg"></div>
                    <div className="absolute top-5 -left-7 w-9 h-1 bg-slate-600 rounded-full transform rotate-90 origin-right shadow-lg"></div>
                    <div className="absolute top-5 -right-7 w-9 h-1 bg-slate-600 rounded-full transform -rotate-90 origin-left shadow-lg"></div>
                    <div className="absolute top-9 -left-6 w-8 h-1 bg-slate-600 rounded-full transform -rotate-45 origin-right shadow-lg"></div>
                    <div className="absolute top-9 -right-6 w-8 h-1 bg-slate-600 rounded-full transform rotate-45 origin-left shadow-lg"></div>
                  </div>
                </div>

                {/* Scanning Effects */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-40 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                    style={{ transform: `rotate(${rotation * 1.5}deg)` }}
                  ></div>
                </div>
              </div>

              {/* Status Panel */}
              <div className="flex justify-between items-center mt-4 text-xs">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400">OPERATIONAL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400">SOLAR</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400">SURVEILLANCE</span>
                  </div>
                </div>
                <div className="text-emerald-400 font-mono">
                  GUARD-X | NEXTECH 1.0
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Thermal & RGB Imaging</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Thermal sensor camera for heat signatures</li>
                <li>• RGB cameras for visual surveillance</li>
                <li>• Real-time image processing</li>
                <li>• YOLO & CNN detection models</li>
                <li>• Multi-terrain surveillance capability</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">AI/ML Processing</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• CNNs & YOLO neural networks</li>
                <li>• Neural engine for edge computing</li>
                <li>• SLAM & path algorithms</li>
                <li>• Proactive threat detection</li>
                <li>• Continuous data stream</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Solar-Powered Operation</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Solar panel integration</li>
                <li>• Unobtrusive-scale design</li>
                <li>• Air and land surveillance</li>
                <li>• Return-to-base (RTB) capability</li>
                <li>• Swarm deployment ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


