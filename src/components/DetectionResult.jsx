import { AlertTriangle, CheckCircle, Loader, MapPin } from "lucide-react";
import AlertBox from "./AlertBox.jsx";

export default function DetectionResult({ result, image, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
            <Loader className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Analyzing Thermal Data</h3>
          <p className="text-slate-400">AI model processing image...</p>
          <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
        <div className="text-center text-slate-400">
          <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <p>Upload thermal image to begin analysis</p>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-red-500/50">
        <AlertBox type="error" message="⚠️ Analysis failed - Check connection" />
      </div>
    );
  }

  if (result.boxes && result.boxes.length > 0) {
    return (
      <div className="space-y-6">
        <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="text-xl font-bold text-red-400">THREAT DETECTED</h3>
              <p className="text-red-300">Human presence confirmed in thermal scan</p>
            </div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-4">
            <p className="text-red-200 font-medium">
              {result.boxes.length} human signature{result.boxes.length > 1 ? 's' : ''} detected
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h4 className="text-white font-semibold mb-4">Thermal Analysis Result</h4>
          <div className="relative inline-block">
            <img 
              src={image} 
              alt="Thermal scan" 
              className="max-w-full h-auto rounded-lg border-2 border-slate-600" 
            />
            {result.boxes.map((box, i) => (
              <div
                key={i}
                className="absolute border-2 border-red-500 bg-red-500/20"
                style={{
                  left: `${box[0]}px`,
                  top: `${box[1]}px`,
                  width: `${box[2] - box[0]}px`,
                  height: `${box[3] - box[1]}px`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Target {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-8 border border-emerald-500/50">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-emerald-400 mb-2">Area Clear</h3>
        <p className="text-slate-300">No human thermal signatures detected</p>
      </div>
    </div>
  );
}
