import ApiKeys from '../components/ApiKeys';
import MetricsChart from '../components/MetricsChart';
import WebhookTable from '../components/WebhookTable';
import { LayoutDashboard, Key, Activity, Settings, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('vero_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // API Key State
  const [apiKey, setApiKey] = useState<string>("Loading...");
  const [keysLoading, setKeysLoading] = useState(true);

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
      setKeysLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKeys();
  }, [token]);

  const rollKey = async () => {
    if (apiKey !== "No active key" && !confirm("Are you sure? This will invalidate your old API key immediately.")) return;
    setKeysLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/developer/keys/roll`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setApiKey(data.key);
    } finally {
      setKeysLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('vero_token', data.token);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vero_token');
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-canvas pt-32 pb-12 px-6 flex items-center justify-center">
        <div className="bg-surface p-8 rounded-[32px] shadow-card border border-hairline w-full max-w-md">
          <div className="flex justify-center mb-6 text-trust-high">
            <Key size={48} />
          </div>
          <h2 className="text-2xl font-bold text-ink text-center mb-2">Developer Login</h2>
          <p className="text-sm text-slate text-center mb-8">Use your standard Vero account to access the API.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-app-surface border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-trust-high"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-app-surface border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-trust-high"
                required
              />
            </div>
            {error && <p className="text-risk-critical text-sm font-medium text-center">{error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ink text-white font-bold py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 relative">
      {/* Onboarding Overlay */}
      {apiKey === "No active key" && !keysLoading && (
        <div className="absolute inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center pt-24 pb-12 px-6 animate-[fade-in_0.4s_ease-out]">
          <div className="bg-surface max-w-2xl w-full rounded-[32px] shadow-app border border-hairline p-10 md:p-14 text-center">
            <div className="mx-auto w-16 h-16 bg-trust-high/10 rounded-2xl flex items-center justify-center mb-6 text-trust-high">
              <Key size={32} />
            </div>
            <h2 className="text-3xl font-bold text-ink mb-4">Welcome to Vero Developer Platform</h2>
            <p className="text-slate text-lg mb-10 leading-relaxed max-w-lg mx-auto">
              You're minutes away from integrating Nigeria's most powerful Trust Network. Generate your first API key to start verifying accounts and stopping fraud on your platform.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-10 max-w-lg mx-auto">
              <div className="bg-app-surface p-4 rounded-2xl border border-hairline">
                <h4 className="font-bold text-ink text-sm mb-1">Zero-Trust Architecture</h4>
                <p className="text-xs text-slate">Authenticate securely server-to-server with dedicated keys.</p>
              </div>
              <div className="bg-app-surface p-4 rounded-2xl border border-hairline">
                <h4 className="font-bold text-ink text-sm mb-1">Instant Verification</h4>
                <p className="text-xs text-slate">Intercept fraud before transactions clear with sub-200ms latency.</p>
              </div>
            </div>
            <button 
              onClick={rollKey}
              className="bg-trust-high text-white font-bold text-lg px-8 py-4 rounded-xl shadow-btn-green hover:scale-[1.02] active:scale-95 transition-all w-full max-w-sm mx-auto"
            >
              Generate First API Key
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Mock */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-[32px] p-6 shadow-card space-y-2 border border-hairline">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-trust-high text-white rounded-xl shadow-btn-green">
              <Key className="w-4 h-4" /> API Keys
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <Activity className="w-4 h-4" /> Webhooks
            </button>
            <div className="my-4 border-t border-hairline"></div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-risk-critical hover:bg-risk-critical/10 rounded-xl transition-colors mt-auto">
               Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-ink mb-1">Developer Dashboard</h1>
            <p className="text-sm text-slate">Manage your API keys and monitor integration health.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ApiKeys apiKey={apiKey} loading={keysLoading} rollKey={rollKey} />
            <MetricsChart />
          </div>

          <WebhookTable />
        </div>
      </div>
    </div>
  );
}
