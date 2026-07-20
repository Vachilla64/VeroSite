import { useState } from 'react';
import { Play, Terminal, Copy, CheckCircle2 } from 'lucide-react';
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

export default function Quickstart() {
  return (
    <div className="space-y-10 animate-[fade-in_0.3s_ease-out]">
      <div>
        <h1 className="text-4xl font-black text-ink mb-4">Vero API Documentation</h1>
        <p className="text-lg text-slate leading-relaxed">
          Vero scores accounts instantly. Block fraud before money ever leaves your platform.
        </p>
      </div>

      <div className="h-px bg-hairline w-full" />

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-trust-high" /> Base URL
        </h2>
        <p className="text-slate mb-4 leading-relaxed">
          Every endpoint in these docs is relative to this host. There is no versioned path prefix.
        </p>
        <CodeBlock>{`https://api-vero.up.railway.app`}</CodeBlock>
        <p className="text-slate mt-4 text-sm leading-relaxed">
          Check that the service is up with the unauthenticated health endpoint:
        </p>
        <div className="mt-3">
          <CodeBlock>{`curl https://api-vero.up.railway.app/health
# => {"status":"ok","uptime":1042.19}`}</CodeBlock>
        </div>
      </section>

      <div className="h-px bg-hairline w-full" />

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-trust-high" /> Your first lookup in 3 calls
        </h2>
        <p className="text-slate mb-6 leading-relaxed">
          Copy the whole block below into a terminal. It logs in as the seeded demo user, mints an API key,
          and runs a real verification against the live API. Requires <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">curl</code> and <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">jq</code>.
        </p>

        <CodeBlock>{`# 1. Log in and capture a 24-hour JWT.
#    Demo credentials — swap for your own once you register.
TOKEN=$(curl -s -X POST https://api-vero.up.railway.app/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"clean@vero.net","password":"password123"}' | jq -r .token)

# 2. Roll an API key. This must be done with the JWT —
#    an API key cannot be used to manage API keys.
#    NOTE: rolling deactivates any key you already had.
API_KEY=$(curl -s -X POST https://api-vero.up.railway.app/api/developer/keys/roll \\
  -H "Authorization: Bearer $TOKEN" | jq -r .key)

# 3. Verify an account. This one is a seeded bad actor.
curl -X POST https://api-vero.up.railway.app/api/verify \\
  -H "x-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"nuban":"9876543210","bankCode":"058","amount":50000}'`}</CodeBlock>

        <h4 className="font-bold text-ink mb-3 mt-6 text-sm uppercase tracking-wider">Response</h4>
        <CodeBlock>{`{
  "score": 0,
  "flags": ["suspended_account", "critical_risk", "checksum_unverified"],
  "explanation": "This account has been suspended for policy violations.",
  "breakdown": [
    { "signal": "suspended_account",  "points": -100, "reason": "Account suspended for policy violations" },
    { "signal": "checksum_unverified", "points": 0,   "reason": "Could not verify check digit" }
  ],
  "timesChecked": 1,
  "accountName": "Ella Stores"
}`}</CodeBlock>

        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mt-4 leading-relaxed">
          <strong className="text-ink">Read the score, then act.</strong> 0–100. Below 30 the engine adds a{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">critical_risk</code> flag —
          block or route to manual review. Accounts Vero has never seen return a neutral{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">55</code> with{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">unknown_account</code>, not a failure.
        </div>
      </section>

      <div className="h-px bg-hairline w-full" />

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4">Integrating for real</h2>
        <ol className="list-decimal list-inside space-y-5 text-slate mb-8 bg-surface p-6 md:p-8 rounded-[32px] shadow-soft">
          <li>
            <strong className="text-ink">Register your platform</strong> with{' '}
            <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/auth/register</code>{' '}
            (email, name, password), or log in from the{' '}
            <a href="/developer" className="text-trust-high font-semibold hover:underline">Developer Dashboard</a>.
          </li>
          <li>
            <strong className="text-ink">Roll an API key</strong> with{' '}
            <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/developer/keys/roll</code>{' '}
            and store it as a server-side secret. Never ship it to a browser or mobile app.
          </li>
          <li>
            <strong className="text-ink">Call verify server-side</strong> when a user initiates a transfer. Pass the recipient's
            10-digit NUBAN, the transfer amount, and the bank code when you have it.
          </li>
          <li>
            <strong className="text-ink">Act on the score and flags</strong> — see the{' '}
            <a href="/docs/lookup" className="text-trust-high font-semibold hover:underline">API Reference</a> for every signal
            and its point value.
          </li>
          <li>
            <strong className="text-ink">Feed reports back</strong> with{' '}
            <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/report</code>{' '}
            when your users flag an account. Reports affect scores on the next lookup.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4">Rate Limits</h2>
        <p className="text-slate mb-4 leading-relaxed">
          One quota exists today: a daily lookup cap on <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/verify</code> for
          non-premium <em>user sessions</em>. There is no per-second throttle.
        </p>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Caller</th>
                <th className="px-5 py-3 font-bold">Daily Verify Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-semibold text-ink">JWT session, free account</td>
                <td className="px-5 py-4 text-slate">15 / day</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-ink">JWT session, premium account</td>
                <td className="px-5 py-4 text-slate">Uncapped</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-ink">
                  <code className="font-mono text-xs">x-api-key</code> (B2B server-to-server)
                </td>
                <td className="px-5 py-4 text-slate">Uncapped — bypasses the cap entirely</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mt-4 leading-relaxed">
          The counter resets at local midnight on the server and counts every verification row created that day.
          Exceeding it returns <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">403 LIMIT_REACHED</code>.
          You can read your current usage from{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">GET /api/user/profile</code>.
        </div>
      </section>

      <NextPrevNav next={{ title: "Authentication", path: "/docs/authentication" }} />
    </div>
  );
}
