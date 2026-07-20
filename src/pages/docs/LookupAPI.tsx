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
      <section id="verify">
        <h2 className="text-2xl font-bold text-ink mb-2 flex items-center gap-2">
          <Code className="w-5 h-5 text-trust-high" /> API Reference
        </h2>
        <p className="text-slate mb-4 leading-relaxed">
          Three core endpoints power an integration: <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono">/api/verify</code>,{' '}
          <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono">/api/report</code> and{' '}
          <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono">/api/history</code>. All three accept either an{' '}
          <strong className="text-ink">API key</strong> (<code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono">x-api-key</code>, recommended for backends)
          or a <strong className="text-ink">Bearer token</strong>. Account and key management live on{' '}
          <a href="/docs/authentication" className="text-trust-high font-semibold hover:underline">Authentication</a>.
        </p>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mb-8 leading-relaxed">
          Base URL for every example on this page:{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">https://api-vero.up.railway.app</code>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <Badge method="POST" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/verify</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Evaluate Trust Score</h3>
        <p className="text-slate mb-4 leading-relaxed">
          Pass a recipient's NUBAN, bank code, and transfer amount. Returns a 0 to 100 Trust Score,
          a list of risk signals, an AI-generated explanation, and a score breakdown.
        </p>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mb-6 leading-relaxed">
          Callers using <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">x-api-key</code> have
          <strong className="text-ink"> no daily limit</strong>. The 15-lookups-per-day cap applies only to non-premium JWT user sessions.
          See <a href="/docs" className="text-trust-high font-semibold hover:underline">Rate Limits</a>.
        </div>

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
                <td className="px-5 py-4 text-slate">10-digit NUBAN account number. Anything not matching <code className="bg-app-surface px-1 rounded text-xs">/^\d{'{'}10{'}'}$/</code> still returns <code className="bg-app-surface px-1 rounded text-xs">200</code>, with score <code className="bg-app-surface px-1 rounded text-xs">0</code> and the <code className="bg-app-surface px-1 rounded text-xs">invalid_format</code> flag.</td>
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
                <td className="px-5 py-4 text-slate">3-digit CBN bank code (e.g. <code className="bg-app-surface px-1 rounded text-xs">"058"</code> for GTBank). Feeds the NUBAN check-digit calculation; omitting it defaults to <code className="bg-app-surface px-1 rounded text-xs">"000"</code>, which will usually fail the checksum and add the harmless <code className="bg-app-surface px-1 rounded text-xs">checksum_unverified</code> flag.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request</h4>
            <CodeBlock>{`curl -X POST \\
  https://api-vero.up.railway.app/api/verify \\
  -H "x-api-key: vero_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nuban": "9876543210",
    "bankCode": "058",
    "amount": 50000
  }'`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response (200 OK)</h4>
            <CodeBlock>{`{
  "score": 0,
  "flags": [
    "suspended_account",
    "critical_risk",
    "checksum_unverified"
  ],
  "explanation": "This account has been suspended for policy violations.",
  "breakdown": [
    { "signal": "suspended_account",   "points": -100, "reason": "Account suspended for policy violations" },
    { "signal": "checksum_unverified", "points": 0,    "reason": "Could not verify check digit" }
  ],
  "timesChecked": 1,
  "accountName": "Ella Stores"
}`}</CodeBlock>
          </div>
        </div>

        <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response Fields</h4>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Field</th>
                <th className="px-5 py-3 font-bold">Type</th>
                <th className="px-5 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink">score</td>
                <td className="px-5 py-4 text-slate">number</td>
                <td className="px-5 py-4 text-slate">Integer, clamped to 0–100.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">flags</td>
                <td className="px-5 py-4 text-slate">string[]</td>
                <td className="px-5 py-4 text-slate">Risk signals that fired. May be empty for a clean account.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">explanation</td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4 text-slate">Plain-language summary generated from the flags. Wording is not stable — never parse it, branch on <code className="bg-app-surface px-1 rounded text-xs">flags</code>.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">breakdown</td>
                <td className="px-5 py-4 text-slate">object[]</td>
                <td className="px-5 py-4 text-slate">Each entry is <code className="bg-app-surface px-1 rounded text-xs">{'{'} signal, points, reason {'}'}</code> — the audit trail for how the score was reached.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">timesChecked</td>
                <td className="px-5 py-4 text-slate">number</td>
                <td className="px-5 py-4 text-slate">Total lookups of this NUBAN across the whole network, including the call you just made (so the minimum is 1).</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">accountName</td>
                <td className="px-5 py-4 text-slate">string | null</td>
                <td className="px-5 py-4 text-slate">The name Vero already holds for this account, or <code className="bg-app-surface px-1 rounded text-xs">null</code> if it holds none.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mb-6 leading-relaxed">
          <strong className="text-ink">Vero does not perform bank name enquiry.</strong>{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">accountName</code> is only ever a name already
          recorded in the Trust Network. Vero never calls out to a bank to resolve a name and never invents one — for accounts it has not seen,
          the field is <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">null</code>.
          If you need name enquiry, use your own banking provider's endpoint alongside Vero.
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
                <td className="px-5 py-4 text-slate">No prior history on the Vero Trust Network. Terminal — no other signal is evaluated. This is neutral caution, not a fraud verdict.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">suspended_account</td>
                <td className="px-5 py-4 text-slate">Score → 0</td>
                <td className="px-5 py-4 text-slate">Account suspended for confirmed policy violations. Terminal, and always returned alongside <code className="bg-app-surface px-1 rounded text-xs">critical_risk</code>.</td>
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
                <td className="px-5 py-4 text-slate">Amount is more than 3× the sender's own 30-day average transfer, and above ₦10,000. Skipped entirely if the sender has fewer than 3 transactions in that window.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">high_value</td>
                <td className="px-5 py-4 text-slate">−10</td>
                <td className="px-5 py-4 text-slate">Transfer exceeds ₦1,000,000.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">critical_risk</td>
                <td className="px-5 py-4 text-slate">N/A</td>
                <td className="px-5 py-4 text-slate">Computed score fell below 30. Block or require manual review.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">checksum_unverified</td>
                <td className="px-5 py-4 text-slate">0</td>
                <td className="px-5 py-4 text-slate">NUBAN checksum could not be verified. (Informational only).</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">verified_institution</td>
                <td className="px-5 py-4 text-slate">0</td>
                <td className="px-5 py-4 text-slate">Account is held at a verified partner institution (bank code <code className="bg-app-surface px-1 rounded text-xs">032</code>). Informational — carries no points today.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">invalid_format</td>
                <td className="px-5 py-4 text-slate">Score → 0</td>
                <td className="px-5 py-4 text-slate">NUBAN is not a 10-digit number. Returned as a scored <code className="bg-app-surface px-1 rounded text-xs">200</code>, not a <code className="bg-app-surface px-1 rounded text-xs">400</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mt-4 leading-relaxed">
          Two more signals appear in <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">breakdown</code> but never as flags:{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">base_score</code> (the starting 100) and{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">score_clamped</code> (the adjustment applied when penalties push the raw score outside 0–100).
          A transfer to an account owned by the calling user short-circuits to score 100 with an empty{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">flags</code> array and a{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">self_transfer</code> breakdown entry.
        </div>
      </section>

      <div className="h-px bg-hairline" />

      {/* ── POST /api/report ── */}
      <section id="report">
        <div className="flex items-center gap-3 mb-2">
          <Badge method="POST" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/report</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Submit a Report</h3>
        <p className="text-slate mb-6 leading-relaxed">
          Report a suspicious account on behalf of a user. Reports feed directly into the Trust Score engine and are
          reflected on the <em>next</em> lookup — scores are computed at read time, not stored. No manual moderation step.
        </p>
        <p className="text-slate mb-6 leading-relaxed">
          Reporting a NUBAN Vero has never seen <strong className="text-ink">creates</strong> a record for it so its reputation can start
          accumulating. Each user may report a given account once; a duplicate returns{' '}
          <code className="bg-app-surface px-1 rounded text-sm font-mono">429</code>. Reporting an account you already own returns{' '}
          <code className="bg-app-surface px-1 rounded text-sm font-mono">400</code>. Unlike verify, a malformed NUBAN here is a hard{' '}
          <code className="bg-app-surface px-1 rounded text-sm font-mono">400 "Invalid NUBAN format"</code>.
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
            <CodeBlock>{`curl -X POST \\
  https://api-vero.up.railway.app/api/report \\
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
      <section id="history">
        <div className="flex items-center gap-3 mb-2">
          <Badge method="GET" />
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/history</code>
        </div>
        <h3 className="text-xl font-bold text-ink mb-3">Lookup History</h3>
        <p className="text-slate mb-6 leading-relaxed">
          Retrieve every verification made by your account, newest-first. Returns the full list — there is no pagination,
          limit, or date filter today. Useful for audit logs or showing past checks in your UI.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request</h4>
            <CodeBlock>{`curl https://api-vero.up.railway.app/api/history \\
  -H "x-api-key: vero_live_your_api_key_here"`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response (200 OK)</h4>
            <CodeBlock>{`[
  {
    "id": "clv_abc123",
    "nuban": "9876543210",
    "amount": 50000,
    "score": 0,
    "flags": ["suspended_account", "critical_risk"],
    "explanation": "This account has been suspended for policy violations.",
    "name": "Chidi Okafor",
    "createdAt": "2026-07-19T21:00:00.000Z",
    "userId": "cuid_..."
  }
]`}</CodeBlock>
          </div>
        </div>

        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed">
          ⚠ The <code className="font-mono">name</code> field here is a <strong>synthetic display label</strong>, derived deterministically
          from the digits of the NUBAN so history rows are visually distinguishable. It is not the account holder's real name and it is not
          the same value as <code className="font-mono">accountName</code> on <code className="font-mono">/api/verify</code>.
          Never show it to an end user as an identity, and never use it to make a payment decision.
        </div>
      </section>

      <NextPrevNav
        prev={{ title: "Authentication", path: "/docs/authentication" }}
        next={{ title: "Webhooks", path: "/docs/webhooks" }}
      />
    </div>
  );
}
