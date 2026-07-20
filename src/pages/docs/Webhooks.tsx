import { Terminal } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Webhooks() {
  return (
    <div className="space-y-10 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-trust-high" /> Webhooks
        </h2>
        <p className="text-slate mb-6 leading-relaxed">
          Webhooks let Vero push real-time events to your server instead of you polling the API. 
          Subscribe to get notified when an account you've previously checked changes risk profile. 
          For example: a safe account gets reported by another platform on the network.
        </p>

        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium mb-8">
          ⚠ Webhooks are available on the <strong>Pro plan</strong> only. Configure your endpoint URL in the Developer Dashboard.
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-4">Supported Events</h3>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Event</th>
                <th className="px-5 py-3 font-bold">Trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">score.calculated</td>
                <td className="px-5 py-4 text-slate">Fired after every successful <code className="bg-app-surface px-1 rounded text-xs">/api/verify</code> call.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">account.flagged_critical</td>
                <td className="px-5 py-4 text-slate">Fired immediately when a previously safe account (score &gt; 50) drops below 30 due to new reports from any platform on the network.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">score.updated</td>
                <td className="px-5 py-4 text-slate">Fired when a watched account's score crosses a major 20-point threshold in either direction.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-4">Webhook Payload</h3>
        <p className="text-slate mb-4 leading-relaxed">
          Vero sends a <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">POST</code> request to your registered endpoint with the following JSON body:
        </p>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto">
          <pre className="text-slate/80 whitespace-pre-wrap"><code>{`{
  "event": "account.flagged_critical",
  "timestamp": "2025-07-19T21:43:00.000Z",
  "data": {
    "nuban": "8877665544",
    "previousScore": 72,
    "newScore": 10,
    "flags": ["heavily_reported", "critical_risk"],
    "explanation": "This account received 3 new fraud reports in the past hour."
  }
}`}</code></pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-4">Security: Verifying Payloads</h3>
        <p className="text-slate mb-4 leading-relaxed">
          All webhook requests include a <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">X-Vero-Signature</code> header.
          It is an HMAC-SHA256 signature of the raw request body, keyed with your Webhook Secret from the dashboard.
          Always verify this signature before processing the event.
        </p>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto">
          <pre className="text-slate/80 whitespace-pre-wrap"><code>{`// Node.js verification example
const crypto = require('crypto');

function verifyWebhook(rawBody, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature), 
    Buffer.from(expected)
  );
}`}</code></pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-4">Retry Policy</h3>
        <p className="text-slate leading-relaxed">
          Vero retries failed webhook deliveries (non-2xx responses) up to <strong className="text-ink">3 times</strong> with exponential backoff: at 30s, 5min, and 30min. 
          After 3 failures, the event is dropped and logged in your Dashboard for inspection.
          Your endpoint must respond within <strong className="text-ink">10 seconds</strong> or the delivery is considered failed.
        </p>
      </section>

      <NextPrevNav
        prev={{ title: "API Reference", path: "/docs/lookup" }}
        next={{ title: "Error Codes", path: "/docs/errors" }}
      />
    </div>
  );
}
