import { Copy, Eye, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function ApiKeys() {
  const [copied, setCopied] = useState(false);
  const apiKey = "vero_live_xxxxxxxxxxxxxxxxxxxxxxxx";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface rounded-[32px] p-6 md:p-8 shadow-card border border-hairline flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-ink">Live API Keys</h3>
          <span className="bg-trust-high/10 text-trust-high px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-medium text-slate mb-2">Secret Key</p>
          <div className="flex items-center gap-2 bg-app-surface p-3 rounded-xl border border-hairline group">
            <div className="flex-1 font-mono text-sm text-ink overflow-hidden text-ellipsis whitespace-nowrap">
              {apiKey}
            </div>
            <button className="text-slate hover:text-ink transition-colors p-1" title="Reveal">
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={handleCopy}
              className={`p-1 transition-colors ${copied ? 'text-trust-high' : 'text-slate hover:text-ink'}`}
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        {copied && <p className="text-xs text-trust-high font-medium animate-pulse">Copied to clipboard!</p>}
      </div>

      <div className="mt-8 border-t border-hairline pt-4">
        <button className="flex items-center gap-2 text-sm font-semibold text-risk-high hover:text-risk-critical transition-colors">
          <RefreshCw className="w-4 h-4" /> Roll API Key
        </button>
      </div>
    </div>
  );
}
