import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-ink mb-6">Simple pricing.</h1>
        <p className="text-lg text-slate">Pay for what you protect. Block fraud before it drains your platform.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        {/* Starter */}
        <div className="bg-surface rounded-3xl p-8 shadow-soft h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-ink mb-2">Starter</h3>
          <p className="text-slate text-sm mb-6">For new marketplaces.</p>
          <div className="mb-6">
            <span className="text-4xl font-black text-ink">Free</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> 500 API calls/mo</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Standard endpoints</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Community support</li>
          </ul>
          <button className="w-full py-3 rounded-pill bg-app-surface text-ink font-bold hover:bg-hairline transition-colors">Get API Keys</button>
        </div>

        {/* Growth (Highlighted) */}
        <div className="bg-ink rounded-3xl p-8 shadow-soft h-[540px] flex flex-col relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-trust-high text-surface text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-trust-high/20">Recommended</div>
          <h3 className="text-xl font-bold text-surface mb-2">Growth</h3>
          <p className="text-slate text-sm mb-6">For scaling platforms.</p>
          <div className="mb-6">
            <span className="text-4xl font-black text-surface">$49</span>
            <span className="text-slate">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> 10,000 API calls/mo</li>
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> Real-time webhooks</li>
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> Fraud insights dashboard</li>
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> Dedicated support</li>
          </ul>
          <button className="w-full py-3 rounded-pill bg-trust-high text-surface font-bold hover:bg-trust-high/90 shadow-lg shadow-trust-high/20 transition-all hover:scale-105">Start 14-Day Trial</button>
        </div>

        {/* Enterprise */}
        <div className="bg-surface rounded-3xl p-8 shadow-soft h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-ink mb-2">Enterprise</h3>
          <p className="text-slate text-sm mb-6">For high-volume financial apps.</p>
          <div className="mb-6">
            <span className="text-4xl font-black text-ink">Custom</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Unlimited volume</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Custom ML models</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> 99.99% SLA</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Solution architect</li>
          </ul>
          <button className="w-full py-3 rounded-pill bg-app-surface text-ink font-bold hover:bg-hairline transition-colors">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
