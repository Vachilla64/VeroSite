import { useState } from 'react';
import { Code, Copy, CheckCircle2 } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group">
      <button
        onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="absolute top-3 right-3 p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <CheckCircle2 className="w-4 h-4 text-trust-high" /> : <Copy className="w-4 h-4 text-slate/60" />}
      </button>
      <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto">
        <pre className="text-slate/80 whitespace-pre-wrap"><code>{children}</code></pre>
      </div>
    </div>
  );
}

function Badge({ method }: { method: 'POST' | 'GET' | 'DELETE' }) {
  const colors: Record<string, string> = {
    POST: 'bg-trust-high/20 text-trust-high',
    GET: 'bg-blue-500/20 text-blue-400',
    DELETE: 'bg-risk-critical/20 text-risk-critical',
  };
  return (
    <span className={`${colors[method]} px-2 py-1 rounded text-xs font-bold tracking-wide`}>{method}</span>
  );
}

export default function LookupAPI() {
  return (
    <div className="space-y-12 animate-[fade-in_0.3s_ease-out]">

      {/* ── POST /api/verify ── */}
      <section>
        <h2 className="text-2xl font-bold text-ink mb-2 flex items-center gap-2">
          <Code className="w-5 h-5 text-trust-high" /> API Reference
        </h2>
        <p className="text-slate mb-8 leading-relaxed">
          The Vero API exposes three core endpoints. We recommend using an <strong className="text-ink">API Key</strong> (<code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono">x-api-key</code>) for backend requests, but valid Bearer tokens are also accepted.
        </p>

        <div className="flex items-center gap-3 mb-2">
          <Badge method="POST" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/verify</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Evaluate Trust Score</h3>
        <p className="text-slate mb-6 leading-relaxed">
          The core endpoint. Pass a recipient's NUBAN, bank code, and transfer amount. Returns a 0–100 Trust Score, 
          a list of risk signals, an AI-generated plain-English explanation, and a score breakdown.
          Free plan accounts are limited to <strong className="text-ink">15 calls per day</strong>.
        </p>

        <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request Body</h4>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Parameter</th>
                <th className="px-5 py-3 font-bold">Type</th>
                <th className="px-5 py-3 font-bold">Required</th>
                <th className="px-5 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink">nuban</td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4"><span className="text-risk-critical font-bold text-xs">Required</span></td>
                <td className="px-5 py-4 text-slate">10-digit NUBAN account number. Must match <code className="bg-app-surface px-1 rounded text-xs">/^\d{'{'}10{'}'}$/</code>.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">amount</td>
                <td className="px-5 py-4 text-slate">number</td>
                <td className="px-5 py-4"><span className="text-risk-critical font-bold text-xs">Required</span></td>
                <td className="px-5 py-4 text-slate">Transfer amount in NGN (kobo not accepted). Used for velocity anomaly detection.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">bankCode</td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4"><span className="text-slate font-bold text-xs">Optional</span></td>
                <td className="px-5 py-4 text-slate">3-digit CBN bank code (e.g. <code className="bg-app-surface px-1 rounded text-xs">"058"</code> for GTBank). Used to verify NUBAN checksum.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request</h4>
            <CodeBlock>{`curl -X POST https://api.verotrust.com/api/verify \\
  -H "x-api-key: vero_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nuban": "0123456789",
    "bankCode": "058",
    "amount": 50000
  }'`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response (200 OK)</h4>
            <CodeBlock>{`{
  "score": 30,
  "flags": [
    "new_account",
    "flagged_by_users",
    "critical_risk"
  ],
  "explanation": "This account was recently created and has been reported for suspicious activity by other users on the network.",
  "breakdown": [
    { "signal": "base_score",    "points": 100, "reason": "Starting trust score" },
    { "signal": "new_account",   "points": -40, "reason": "Account is less than 7 days old" },
    { "signal": "flagged_by_users", "points": -20, "reason": "Account has been flagged by users" },
    { "signal": "velocity_anomaly", "points": -15, "reason": "Unusually high amount vs sender history" }
  ],
  "timesChecked": 4,
  "accountName": "A. Okafor"
}`}</CodeBlock>
          </div>
        </div>

        <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Risk Signals (Flags)</h4>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Flag</th>
                <th className="px-5 py-3 font-bold">Score Impact</th>
                <th className="px-5 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-sm">
              <tr>
                <td className="px-5 py-4 font-mono text-ink">unknown_account</td>
                <td className="px-5 py-4 text-slate">Score → 55</td>
                <td className="px-5 py-4 text-slate">No prior history on the Vero Trust Network.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">suspended_account</td>
                <td className="px-5 py-4 text-slate">Score → 0</td>
                <td className="px-5 py-4 text-slate">Account suspended for confirmed policy violations.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">new_account</td>
                <td className="px-5 py-4 text-slate">−40</td>
                <td className="px-5 py-4 text-slate">Account is less than 7 days old.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">flagged_by_users</td>
                <td className="px-5 py-4 text-slate">−20</td>
                <td className="px-5 py-4 text-slate">1–2 user reports on record.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">heavily_reported</td>
                <td className="px-5 py-4 text-slate">−50</td>
                <td className="px-5 py-4 text-slate">3 or more user reports on record.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">velocity_anomaly</td>
                <td className="px-5 py-4 text-slate">−15</td>
                <td className="px-5 py-4 text-slate">Amount is 3× above the sender's 30-day average (min ₦10,000).</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">high_value</td>
                <td className="px-5 py-4 text-slate">−10</td>
                <td className="px-5 py-4 text-slate">Transfer exceeds ₦1,000,000.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">critical_risk</td>
                <td className="px-5 py-4 text-slate">—</td>
                <td className="px-5 py-4 text-slate">Computed score fell below 30. Block or require manual review.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">checksum_unverified</td>
                <td className="px-5 py-4 text-slate">0</td>
                <td className="px-5 py-4 text-slate">Soft signal — NUBAN checksum could not be verified (informational only).</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">verified_institution</td>
                <td className="px-5 py-4 text-slate">0</td>
                <td className="px-5 py-4 text-slate">Positive signal — account belongs to a verified partner institution.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">invalid_format</td>
                <td className="px-5 py-4 text-slate">Score → 0</td>
                <td className="px-5 py-4 text-slate">NUBAN is not a 10-digit number.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-hairline" />

      {/* ── POST /api/report ── */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <Badge method="POST" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/report</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Submit a Report</h3>
        <p className="text-slate mb-6 leading-relaxed">
          Report a suspicious account on behalf of a user. Reports are stake-weighted and feed directly into the 
          Trust Score engine — no manual moderation required. You can only report an account once; duplicate 
          submissions return a <code className="bg-app-surface px-1 rounded text-sm font-mono">429</code>.
        </p>

        <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request Body</h4>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Parameter</th>
                <th className="px-5 py-3 font-bold">Type</th>
                <th className="px-5 py-3 font-bold">Required</th>
                <th className="px-5 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink">nuban</td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4"><span className="text-risk-critical font-bold text-xs">Required</span></td>
                <td className="px-5 py-4 text-slate">The 10-digit NUBAN of the account being reported.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">reason</td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4"><span className="text-risk-critical font-bold text-xs">Required</span></td>
                <td className="px-5 py-4 text-slate">A brief description of the fraudulent activity (e.g. "Never delivered goods").</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request</h4>
            <CodeBlock>{`curl -X POST https://api.verotrust.com/api/report \\
  -H "x-api-key: vero_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nuban": "8877665544",
    "reason": "Seller collected payment and blocked me"
  }'`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response (200 OK)</h4>
            <CodeBlock>{`{
  "success": true,
  "message": "Report submitted successfully"
}`}</CodeBlock>
          </div>
        </div>
      </section>

      <div className="h-px bg-hairline" />

      {/* ── GET /api/history ── */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <Badge method="GET" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/history</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Lookup History</h3>
        <p className="text-slate mb-6 leading-relaxed">
          Retrieve all previous verification calls made by your platform, sorted newest-first. 
          Useful for building audit logs or displaying past checks in your UI.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request</h4>
            <CodeBlock>{`curl https://api.verotrust.com/api/history \\
  -H "x-api-key: vero_live_your_api_key_here"`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response (200 OK)</h4>
            <CodeBlock>{`[
  {
    "id": "clv_abc123",
    "nuban": "0123456789",
    "amount": 50000,
    "score": 30,
    "flags": ["new_account", "flagged_by_users"],
    "explanation": "Recently created account with user reports.",
    "name": "A. Okafor",
    "createdAt": "2025-07-19T21:00:00.000Z"
  }
]`}</CodeBlock>
          </div>
        </div>
      </section>

      <NextPrevNav
        prev={{ title: "Authentication", path: "/docs/authentication" }}
        next={{ title: "Webhooks", path: "/docs/webhooks" }}
      />
    </div>
  );
}
