import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 top-4 px-4 md:px-8 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-3xl md:rounded-[32px] transition-all duration-300 flex items-center justify-between px-5 md:px-8 ${scrolled ? 'bg-surface/90 backdrop-blur-md border border-hairline shadow-soft h-16 md:h-20' : 'bg-transparent h-20'}`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-risk-critical rounded-xl p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-surface" />
          </div>
          <span className="font-black text-xl tracking-tight text-ink">vero</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate hover:text-ink transition-colors">Platform</Link>
          <Link to="/pricing" className="text-sm font-medium text-slate hover:text-ink transition-colors">Pricing</Link>
          <Link to="/docs" className="text-sm font-medium text-slate hover:text-ink transition-colors">Docs</Link>
          <Link to="/developer" className="flex items-center gap-2 bg-trust-high text-surface px-5 py-2.5 rounded-pill text-sm font-bold shadow-soft hover:opacity-90 transition-all hover:scale-105">
            Get API Keys <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 bg-surface rounded-2xl shadow-soft border border-hairline p-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-ink hover:bg-canvas rounded-lg">Platform</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-ink hover:bg-canvas rounded-lg">Pricing</Link>
          <Link to="/docs" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium text-ink hover:bg-canvas rounded-lg">Docs</Link>
          <Link to="/developer" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-trust-high text-surface px-5 py-3 rounded-pill text-sm font-bold mt-2">
            Get API Keys <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
