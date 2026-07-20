import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-hairline pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/vero-logo.png" alt="Vero Logo" className="w-6 h-6" />
            <span className="text-lg font-bold tracking-tight text-ink">Vero</span>
          </Link>
          <p className="text-sm text-slate mb-6">
            The Trust Layer for the African Economy. Stop fraud before the money leaves your platform.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-ink mb-4">Product</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">API</Link></li>
            <li><Link to="/pricing" className="text-sm text-slate hover:text-ink transition-colors">Pricing</Link></li>
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">Webhooks</Link></li>
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">Trust Scores</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-ink mb-4">Developers</h4>
          <ul className="space-y-3">
            <li><Link to="/docs" className="text-sm text-slate hover:text-ink transition-colors">Documentation</Link></li>
            <li><Link to="/docs" className="text-sm text-slate hover:text-ink transition-colors">API Reference</Link></li>
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-ink mb-4">Company</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">About</Link></li>
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">Contact</Link></li>
            <li><Link to="/" className="text-sm text-slate hover:text-ink transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-hairline">
        <p className="text-xs text-slate">&copy; {new Date().getFullYear()} Vero Technologies Inc. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="w-2 h-2 rounded-full bg-trust-good"></span>
          <span className="text-xs font-medium text-slate">All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
