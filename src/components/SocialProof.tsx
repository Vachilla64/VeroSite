import { Building2, ShoppingBag, Store, Plane } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="border-t border-hairline py-16 bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-bold text-slate uppercase tracking-widest mb-8">
          Securing payments for 1,200+ platforms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-ink" />
            <span className="text-xl font-black tracking-tighter text-ink">Market<span className="text-risk-critical">Pro</span></span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-ink" />
            <span className="text-xl font-bold tracking-tight text-ink">KokoCarts</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-ink" />
            <span className="text-xl font-serif italic font-bold text-ink">Avenue</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-ink" />
            <span className="text-xl font-black text-ink uppercase">FlyBase</span>
          </div>
        </div>
      </div>
    </section>
  );
}
