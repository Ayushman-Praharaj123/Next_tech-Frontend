import { Shield, Menu, Zap, Target } from "lucide-react";
import { useState } from "react";

export default function Header({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-emerald-500/20 sticky top-0 z-50 shadow-2xl shadow-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced animation */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-2 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-lg border border-emerald-400/50 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
              <Shield className="w-6 h-6 text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute inset-0 bg-emerald-400/20 rounded-lg blur-xl group-hover:bg-emerald-400/30 transition-all duration-300"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent tracking-tight animate-pulse">
                Guard-X Sentinel
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                <p className="text-xs text-emerald-400 font-medium">NEXTECH 1.0 • ACTIVE</p>
              </div>
            </div>
          </div>
          
          {/* Compact Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-slate-700/50">
            {[
              { id: 'home', label: 'Home', icon: Shield },
              { id: 'detection', label: 'Detection', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: Zap },
              { id: 'about', label: 'About', icon: Menu }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 shadow-lg shadow-emerald-500/20 border border-emerald-400/30 scale-105'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50 hover:scale-105'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="font-medium">{item.label}</span>
                  {currentPage === item.id && (
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-sm animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-slate-400 hover:text-emerald-400 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-700/50 animate-in slide-in-from-top duration-300">
            <div className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'detection', label: 'Detection' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'about', label: 'About' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
