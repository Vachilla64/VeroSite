import { ShieldAlert } from 'lucide-react';

export default function CodeSnippet() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* The Code Window */}
      <div className="bg-[#1C212B] rounded-[32px] shadow-soft overflow-hidden border border-white/10 relative z-10">
        {/* Window Header */}
        <div className="flex items-center px-4 py-3 bg-[#242A35] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-risk-critical"></div>
            <div className="w-3 h-3 rounded-full bg-risk-neutral"></div>
            <div className="w-3 h-3 rounded-full bg-trust-good"></div>
          </div>
          <p className="mx-auto text-xs font-medium text-slate">POST /api/verify</p>
        </div>
        
        {/* Code Content */}
        <div className="p-5 md:p-6 text-sm font-mono text-slate/80 overflow-x-auto">
<pre><code>
<span className="text-pink-400">const</span> <span className="text-blue-300">response</span> = <span className="text-pink-400">await</span> vero.<span className="text-green-300">verify</span>({`{`}
  <span className="text-slate-300">nuban:</span> <span className="text-yellow-300">'0123456789'</span>,
  <span className="text-slate-300">amount:</span> <span className="text-purple-300">50000</span>
{`}`});

<span className="text-slate-500">// Returns:</span>
{`{`}
  <span className="text-slate-300">"score"</span>: <span className="text-purple-300">30</span>,
  <span className="text-slate-300">"flags"</span>: [
    <span className="text-yellow-300">"multiple_reports_7d"</span>,
    <span className="text-yellow-300">"new_account"</span>
  ],
  <span className="text-slate-300">"explanation"</span>: <span className="text-yellow-300">"Reported multiple times..."</span>
{`}`}
</code></pre>
        </div>
      </div>

      {/* Floating UI Card Mockup */}
      <div className="absolute -bottom-8 -right-4 md:-right-8 bg-surface rounded-[32px] p-5 shadow-soft border border-hairline w-[260px] md:w-[280px] z-20 animate-[bounce_4s_ease-in-out_infinite]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Trust Score</p>
            <p className="text-3xl font-black text-ink">30</p>
          </div>
          {/* Circular Meter Mockup */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-hairline"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-risk-high"
                strokeWidth="4"
                strokeDasharray="30, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <ShieldAlert className="absolute w-5 h-5 text-risk-high" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 bg-risk-critical/5 p-2 rounded-lg border border-risk-critical/10">
            <div className="w-1.5 h-1.5 rounded-full bg-risk-critical mt-1.5 flex-shrink-0"></div>
            <p className="text-xs font-medium text-ink leading-tight">Reported 3 times this month</p>
          </div>
          <div className="flex items-start gap-2 bg-hairline/50 p-2 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-slate leading-tight">Limited transaction history</p>
          </div>
        </div>
      </div>
    </div>
  );
}
