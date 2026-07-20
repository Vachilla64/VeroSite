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
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> 15 lookups/day</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Verify, report &amp; history endpoints</li>
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
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> Uncapped server-to-server lookups</li>
            <li className="flex items-center gap-3 text-sm text-surface"><Check className="w-4 h-4 text-trust-high" /> API key management &amp; rolling</li>
            <li className="flex items-center gap-3 text-sm text-slate"><Check className="w-4 h-4 text-slate/60" /> Real-time webhooks <span className="text-[10px] font-bold uppercase tracking-wider text-risk-high">Soon</span></li>
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
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Custom scoring weights</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Negotiated SLA</li>
            <li className="flex items-center gap-3 text-sm text-ink"><Check className="w-4 h-4 text-trust-high" /> Solution architect</li>
          </ul>
          <button className="w-full py-3 rounded-pill bg-app-surface text-ink font-bold hover:bg-hairline transition-colors">Contact Sales</button>
        </div>
      </div>

      <p className="text-center text-xs text-slate mt-12 max-w-2xl mx-auto leading-relaxed">
        Billing is not live yet. Today every account is on the free tier: 15 lookups per day for signed-in user sessions,
        and no cap at all for server-to-server calls authenticated with an{' '}
        <code className="font-mono">x-api-key</code>. Items marked <span className="text-risk-high font-bold uppercase tracking-wider">Soon</span> are not yet implemented.
      </p>
    </div>
  );
}
