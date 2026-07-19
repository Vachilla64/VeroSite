import { BarChart3 } from 'lucide-react';

export default function MetricsChart() {
  return (
    <div className="bg-surface rounded-[32px] p-6 md:p-8 shadow-soft">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-ink mb-1">API Usage</h3>
          <p className="text-xs text-slate">This billing cycle</p>
        </div>
        <div className="bg-app-surface p-2 rounded-xl">
          <BarChart3 className="w-5 h-5 text-ink" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-black text-ink tracking-tight">4,102</span>
          <span className="text-sm text-slate font-medium mb-1">/ 10,000 calls</span>
        </div>
        
        <div className="h-3 w-full bg-app-surface rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-risk-high to-risk-critical rounded-full w-[41%] shadow-[0_0_10px_rgba(255,75,75,0.4)] animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-xs text-slate mt-3">41% of Growth Plan limit</p>
      </div>

      {/* Fake CSS Chart */}
      <div className="flex items-end gap-2 h-24 mt-auto">
        {[20, 35, 25, 45, 60, 50, 80].map((h, i) => (
          <div key={i} className="flex-1 bg-app-surface rounded-t-sm relative group cursor-pointer h-full">
            <div 
              className="absolute bottom-0 w-full bg-risk-critical/80 rounded-t-sm transition-all duration-500 group-hover:bg-risk-critical"
              style={{ height: `${h}%`, animation: `growUp 1s ease-out ${i * 0.1}s forwards` }}
            ></div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes growUp {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
}
