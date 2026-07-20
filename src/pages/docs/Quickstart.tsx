import { Play, Terminal } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

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

      <section className="animate-[fade-in_0.3s_ease-out]">
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-trust-high" /> Quickstart
        </h2>
        <p className="text-slate mb-6 leading-relaxed">
          Integrate Vero in under 10 minutes. Your integration will live on a single backend-to-backend call — never expose API keys to your frontend.
        </p>

        <ol className="list-decimal list-inside space-y-5 text-slate mb-8 bg-surface p-6 md:p-8 rounded-[32px] shadow-soft">
          <li>
            <strong className="text-ink">Create an account</strong> and retrieve your API key from the{' '}
            <a href="/developer" className="text-trust-high font-semibold hover:underline">Developer Dashboard</a>.
          </li>
          <li>
            <strong className="text-ink">Register your platform</strong> by calling{' '}
            <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/auth/register</code> with your email, name and password.
          </li>
          <li>
            <strong className="text-ink">Obtain a session token</strong> via{' '}
            <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/auth/login</code>. This JWT is valid for 24 hours.
          </li>
          <li>
            <strong className="text-ink">Call the Verify endpoint</strong> server-side when a user initiates a bank transfer.
            Pass the recipient's 10-digit NUBAN, their bank code, and the transfer amount.
          </li>
          <li>
            <strong className="text-ink">Read the Trust Score</strong> (0 to 100) and act on it.
            A score above 70 is generally safe. Below 30 triggers <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">critical_risk</code>.
          </li>
          <li>
            <strong className="text-ink">Optionally report accounts</strong> your users flag using <code className="bg-app-surface px-1.5 py-0.5 rounded text-sm font-mono border border-hairline">POST /api/report</code>.
            Reports feed back into the Trust Network instantly.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-trust-high" /> Base URL
        </h2>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-sm shadow-soft overflow-x-auto">
          <pre className="text-slate/80"><code>
<span className="text-slate-400"># All API calls are made to:</span>
<span className="text-trust-high">https://api.verotrust.com</span>
          </code></pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ink mb-4">Rate Limits</h2>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Plan</th>
                <th className="px-5 py-3 font-bold">Daily Lookups</th>
                <th className="px-5 py-3 font-bold">Concurrency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-semibold text-ink">Free</td>
                <td className="px-5 py-4 text-slate">15 / day</td>
                <td className="px-5 py-4 text-slate">5 req/s</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-ink">Pro</td>
                <td className="px-5 py-4 text-slate">Unlimited</td>
                <td className="px-5 py-4 text-slate">100 req/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <NextPrevNav next={{ title: "Authentication", path: "/docs/authentication" }} />
    </div>
  );
}
