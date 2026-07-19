import { CheckCircle2, XCircle } from 'lucide-react';

export default function WebhookTable() {
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
        <h3 className="font-bold text-ink">Recent Webhook Deliveries</h3>
        <p className="text-xs text-slate mt-1">Endpoint: https://api.yourplatform.com/vero-webhooks</p>
      </div>
      
      <div className="overflow-x-auto">
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
            {deliveries.map((del) => (
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
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-hairline bg-canvas/30 text-center">
        <button className="text-sm font-semibold text-ink hover:text-risk-critical transition-colors">View All Events</button>
      </div>
    </div>
  );
}
