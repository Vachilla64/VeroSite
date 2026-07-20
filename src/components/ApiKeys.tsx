import { Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function ApiKeys() {
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState<string>("Loading...");
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('vero_token');

  const fetchKeys = async () => {
    try {
      const res = await fetch(`${API_URL}/api/developer/keys`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.length > 0) {
        setApiKey(data[0].key);
      } else {
        setApiKey("No active key");
      }
    } catch (err) {
      setApiKey("Failed to load key");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKeys();
  }, [token]);

  const rollKey = async () => {
    if (!confirm("Are you sure? This will invalidate your old API key immediately.")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/developer/keys/roll`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setApiKey(data.key);
    } finally {
      setLoading(false);
    }
  };

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
              {isRevealed ? apiKey : (apiKey.startsWith('vero_live_') ? 'vero_live_' + '•'.repeat(24) : apiKey)}
            </div>
            <button 
              onClick={() => setIsRevealed(!isRevealed)}
              className="text-slate hover:text-ink transition-colors p-1" 
              title="Reveal"
            >
              {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
        <button 
          onClick={rollKey}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold text-risk-high hover:text-risk-critical transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Roll API Key
        </button>
      </div>
    </div>
  );
}
