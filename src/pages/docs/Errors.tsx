import { AlertTriangle } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Errors() {
  return (
    <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-risk-critical" /> Errors</h2>
        <div className="bg-surface rounded-2xl border border-hairline overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas/50 text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Code</th>
                <th className="px-5 py-3 font-bold">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-risk-critical font-bold">400</td>
                <td className="px-5 py-4 text-slate">Bad Request - Invalid account number format or missing bank code.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-risk-critical font-bold">401</td>
                <td className="px-5 py-4 text-slate">Unauthorized - Invalid or missing API Key.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-risk-critical font-bold">429</td>
                <td className="px-5 py-4 text-slate">Too Many Requests - Rate limit exceeded for your tier.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-risk-critical font-bold">500</td>
                <td className="px-5 py-4 text-slate">Internal Server Error - Our ML engine experienced an issue.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <NextPrevNav 
        prev={{ title: "Webhooks", path: "/docs/webhooks" }}
      />
    </div>
  );
}
