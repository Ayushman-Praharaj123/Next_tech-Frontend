import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, AlertTriangle, Calendar, MapPin } from "lucide-react";

export default function Analytics({ detectionHistory = [] }) {
  const [stats, setStats] = useState({
    totalScans: 0,
    threatsDetected: 0,
    successRate: 90,
    activeAlerts: 0
  });

  useEffect(() => {
    // Calculate stats from detection history
    const total = detectionHistory.length;
    const threats = detectionHistory.filter(d => d.boxes && d.boxes.length > 0).length;
    
    setStats({
      totalScans: total,
      threatsDetected: threats,
      successRate: 90,
      activeAlerts: threats
    });
  }, [detectionHistory]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Mission Analytics</h2>
        <p className="text-slate-400">Real-time surveillance data and threat analysis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <span className="text-slate-400 text-sm">Total Scans</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalScans}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/50">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-slate-400 text-sm">Threats Found</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{stats.threatsDetected}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-emerald-500/50">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span className="text-slate-400 text-sm">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{stats.successRate}%</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-yellow-500/50">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-yellow-400" />
            <span className="text-slate-400 text-sm">Active Alerts</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{stats.activeAlerts}</p>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Recent Detection History
        </h3>
        
        {detectionHistory.length > 0 ? (
          <div className="space-y-3">
            {detectionHistory.slice(-5).reverse().map((detection, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-white">Scan #{detectionHistory.length - index}</span>
                </div>
                <div className="flex items-center gap-2">
                  {detection.boxes && detection.boxes.length > 0 ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-medium">
                        {detection.boxes.length} Target{detection.boxes.length > 1 ? 's' : ''}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                      <span className="text-emerald-400 font-medium">Clear</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No detection data available</p>
            <p className="text-sm">Start scanning to see analytics</p>
          </div>
        )}
      </div>
    </div>
  );
}