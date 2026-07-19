import ApiKeys from '../components/ApiKeys';
import MetricsChart from '../components/MetricsChart';
import WebhookTable from '../components/WebhookTable';
import { LayoutDashboard, Key, Activity, Settings } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Mock */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-[32px] p-6 shadow-soft space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-trust-high text-surface rounded-xl shadow-md">
              <Key className="w-4 h-4" /> API Keys
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <Activity className="w-4 h-4" /> Webhooks
            </button>
            <div className="my-4 border-t border-hairline"></div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate hover:bg-canvas rounded-xl transition-colors">
              <Settings className="w-4 h-4" /> Settings
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
