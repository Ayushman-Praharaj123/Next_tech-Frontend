import { AlertTriangle, CheckCircle, Loader, Users, Clock, Cpu } from "lucide-react";

export default function DetectionResult({ result, image, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
            <Loader className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">AI Model Processing</h3>
          <p className="text-slate-400">Neural network analyzing image...</p>
          <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <div className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>YOLO/CNN Processing...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
        <div className="text-center text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Upload an image to start threat detection</p>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-red-900/20 rounded-xl p-8 border border-red-500/50">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-400 mb-2">Detection Failed</h3>
          <p className="text-red-300">{result.error}</p>
        </div>
      </div>
    );
  }

  const threatCount = result.boxes?.length || 0;
  const isThreatDetected = threatCount > 0;

  return (
    <div className="space-y-6">
      {/* Detection Status */}
      <div className={`rounded-xl p-6 border ${
        isThreatDetected 
          ? 'bg-red-900/20 border-red-500/50' 
          : 'bg-emerald-900/20 border-emerald-500/50'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          {isThreatDetected ? (
            <AlertTriangle className="w-8 h-8 text-red-400" />
          ) : (
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          )}
          <div>
            <h3 className={`text-xl font-semibold ${
              isThreatDetected ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {isThreatDetected ? 'THREATS DETECTED' : 'AREA SECURE'}
            </h3>
            <p className="text-slate-400">
              {isThreatDetected 
                ? `${threatCount} human target${threatCount > 1 ? 's' : ''} identified`
                : 'No human activity detected in surveillance zone'
              }
            </p>
          </div>
        </div>

        {/* Detection Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">Targets: {threatCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">
              {result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : 'Now'}
            </span>
          </div>
        </div>
      </div>

      {/* Image with Bounding Boxes */}
      {image && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            AI Analysis Result
          </h4>
          <div className="relative inline-block">
            <img 
              src={image} 
              alt="Detection scan" 
              className="max-w-full h-auto rounded-lg border-2 border-slate-600" 
            />
            {result.boxes?.map((box, i) => (
              <div
                key={i}
                className="absolute border-2 border-red-500 bg-red-500/20 animate-pulse"
                style={{
                  left: `${box[0]}px`,
                  top: `${box[1]}px`,
                  width: `${box[2] - box[0]}px`,
                  height: `${box[3] - box[1]}px`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                  TARGET {i + 1}
                </div>
              </div>
            ))}
          </div>
          
          {/* Detection Stats */}
          <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
            <div className="text-xs text-slate-400 space-y-1">
              <div>Model: YOLO/CNN Neural Network</div>
              <div>Confidence Threshold: 50%</div>
              <div>Processing Time: ~2-5 seconds</div>
              {result.imageSize && (
                <div>Image Size: {result.imageSize.width}x{result.imageSize.height}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
