import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, AlertTriangle, Calendar, MapPin, Activity, Target } from "lucide-react";

export default function Analytics({ detectionHistory = [] }) {
  const [stats, setStats] = useState({
    totalScans: 0,
    threatsDetected: 0,
    successRate: 90,
    activeAlerts: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Calculate stats from detection history
    const total = detectionHistory.length;
    const threats = detectionHistory.filter(d => d.boxes && d.boxes.length > 0).length;
    
    setStats({
      totalScans: total,
      threatsDetected: threats,
      successRate: total > 0 ? Math.round(((total - threats) / total) * 100) : 90,
      activeAlerts: threats
    });

    // Prepare chart data - last 10 scans
    const recentScans = detectionHistory.slice(-10);
    const chartPoints = recentScans.map((detection, index) => ({
      scan: index + 1,
      threats: detection.boxes ? detection.boxes.length : 0,
      timestamp: new Date().getTime() - (recentScans.length - index) * 60000
    }));
    setChartData(chartPoints);
  }, [detectionHistory]);

  // Simple Bar Chart Component
  const ThreatChart = ({ data }) => {
    const maxThreats = Math.max(...data.map(d => d.threats), 1);
    
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Threat Detection Graph
        </h3>
        
        {data.length > 0 ? (
          <div className="space-y-4">
            {/* Chart Area */}
            <div className="h-48 flex items-end justify-between gap-2 bg-slate-900/50 rounded-lg p-4">
              {data.map((point, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  {/* Bar */}
                  <div className="w-full flex flex-col justify-end h-32">
                    <div 
                      className={`w-full rounded-t transition-all duration-500 ${
                        point.threats > 0 
                          ? 'bg-gradient-to-t from-red-600 to-red-400' 
                          : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                      }`}
                      style={{ 
                        height: `${(point.threats / maxThreats) * 100}%`,
                        minHeight: point.threats > 0 ? '20px' : '8px'
                      }}
                    ></div>
                  </div>
                  
                  {/* Value Label */}
                  <div className={`text-xs font-semibold ${
                    point.threats > 0 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {point.threats}
                  </div>
                  
                  {/* Scan Number */}
                  <div className="text-xs text-slate-400">
                    S{point.scan}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart Legend */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded"></div>
                <span className="text-emerald-400">Clear Scans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-400 rounded"></div>
                <span className="text-red-400">Threats Detected</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No scan data for graph</p>
            <p className="text-sm">Start scanning to see threat patterns</p>
          </div>
        )}
      </div>
    );
  };

  // Pie Chart for Success Rate
  const SuccessRateChart = () => {
    const successAngle = (stats.successRate / 100) * 360;
    const failureAngle = 360 - successAngle;
    
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          Mission Success Rate
        </h3>
        
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            {/* Pie Chart SVG */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgb(51 65 85)"
                strokeWidth="8"
              />
              
              {/* Success Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="8"
                strokeDasharray={`${(successAngle / 360) * 251.2} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              
              {/* Failure Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="8"
                strokeDasharray={`${(failureAngle / 360) * 251.2} 251.2`}
                strokeDashoffset={`-${(successAngle / 360) * 251.2}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stats.successRate}%</div>
                <div className="text-xs text-slate-400">Success</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-400 text-sm">Clear Zones</span>
            </div>
            <span className="text-emerald-400 font-semibold">{stats.totalScans - stats.threatsDetected}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-red-400 text-sm">Threat Zones</span>
            </div>
            <span className="text-red-400 font-semibold">{stats.threatsDetected}</span>
          </div>
        </div>
      </div>
    );
  };

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

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ThreatChart data={chartData} />
        <SuccessRateChart />
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
