import { Zap, Shield, TrendingDown } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-canvas border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-slate uppercase tracking-widest mb-4">Why Vero API?</p>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4">Enterprise-grade fraud prevention.</h2>
          <p className="text-lg text-slate">Built for marketplaces. We handle the risk, you handle the growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-3xl shadow-soft hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-trust-good/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-trust-high" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Sub-100ms latency.</h3>
            <p className="text-slate leading-relaxed">Fraud happens fast. Our engine scores accounts instantly. Your checkout stays exactly as fast as it was.</p>
          </div>

          <div className="bg-surface p-8 rounded-3xl shadow-soft hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-risk-critical/10 rounded-2xl flex items-center justify-center mb-6">
              <TrendingDown className="w-6 h-6 text-risk-critical" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Cut chargebacks by 40%.</h3>
            <p className="text-slate leading-relaxed">Block high-risk accounts before the transfer clears. Protect your bottom line.</p>
          </div>

          <div className="bg-surface p-8 rounded-3xl shadow-soft hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-risk-high/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-risk-high" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-3">Stop serial scammers.</h3>
            <p className="text-slate leading-relaxed">Accounts flagged on one platform get blocked across the entire network. Scammers can't hide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
