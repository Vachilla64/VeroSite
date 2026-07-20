import { CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WebhookTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake network delay for polish
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const deliveries = [
    { id: 'evt_19xj29', type: 'score.calculated', status: 200, time: '2 mins ago', ms: 142 },
    { id: 'evt_98kx2m', type: 'score.calculated', status: 200, time: '15 mins ago', ms: 98 },
    { id: 'evt_22la8q', type: 'account.flagged', status: 200, time: '1 hour ago', ms: 110 },
    { id: 'evt_81mc1z', type: 'score.calculated', status: 500, time: '3 hours ago', ms: 540 },
    { id: 'evt_44pq9x', type: 'score.calculated', status: 200, time: '4 hours ago', ms: 89 },
  ];

  return (
    <div className="bg-surface rounded-[32px] shadow-card border border-hairline overflow-hidden">
      <div className="p-6 md:p-8 border-b border-hairline">
        <div className="flex items-center gap-2.5 mb-1">
          <h3 className="font-bold text-ink">Webhook Deliveries</h3>
          <span className="bg-risk-high/15 text-risk-high px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Preview — not live
          </span>
        </div>
        <p className="text-xs text-slate mt-1">
          Webhooks are not implemented yet. The rows below are placeholder data illustrating the planned view — no events
          are being delivered and no endpoint is registered.{' '}
          <a href="/docs/webhooks" className="text-trust-high font-semibold hover:underline">Read more</a>
        </p>
      </div>

      <div className="overflow-x-auto opacity-60 pointer-events-none select-none">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas/50 text-slate text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Event ID</th>
              <th className="px-6 py-4 font-bold">Event Type</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Latency</th>
              <th className="px-6 py-4 font-bold">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {loading ? (
              // Skeleton Rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-app-surface rounded w-20"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-app-surface rounded w-28"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-app-surface rounded-full w-20"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-app-surface rounded w-10"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-app-surface rounded w-16"></div></td>
                </tr>
              ))
            ) : (
              deliveries.map((del) => (
                <tr key={del.id} className="hover:bg-canvas/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-ink">{del.id}</td>
                  <td className="px-6 py-4 text-ink font-medium">{del.type}</td>
                  <td className="px-6 py-4">
                    {del.status === 200 ? (
                      <div className="flex items-center gap-1.5 text-trust-high bg-trust-high/10 w-max px-2.5 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-risk-critical bg-risk-critical/10 w-max px-2.5 py-1 rounded-full text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" /> 500 ERR
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate">{del.ms}ms</td>
                  <td className="px-6 py-4 text-slate whitespace-nowrap">{del.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-hairline bg-canvas/30 text-center">
        <span className="text-sm font-semibold text-slate">Available once webhooks ship</span>
      </div>
    </div>
  );
}
