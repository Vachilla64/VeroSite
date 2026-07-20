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
    <div className="min-h-screen bg-canvas pt-24 pb-12">
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
            <ApiKeys />
            <MetricsChart />
          </div>

          <WebhookTable />
        </div>
      </div>
    </div>
  );
}
