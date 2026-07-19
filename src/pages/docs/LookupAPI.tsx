import { Code, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import NextPrevNav from '../../components/NextPrevNav';

export default function LookupAPI() {
  const [copiedCurl, setCopiedCurl] = useState(false);

  const copyCode = (code: string, setter: any) => {
    navigator.clipboard.writeText(code);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-2 flex items-center gap-2"><Code className="w-5 h-5 text-risk-critical" /> Evaluate Trust Score</h2>
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-trust-good/20 text-trust-high px-2 py-1 rounded text-xs font-bold tracking-wide">POST</span>
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">https://api.verotrust.com/api/verify</code>
        </div>
        
        <p className="text-slate mb-8 leading-relaxed">
          This endpoint takes a 10-digit NUBAN and an amount, and returns a predictive fraud risk score. 
          The score ranges from <strong>0 (High Risk)</strong> to <strong>100 (Safe)</strong>. It also provides 
          an AI-generated explanation detailing why the account received its specific score.
        </p>

        <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Request Body Parameters</h4>
        <div className="bg-surface rounded-2xl border border-hairline overflow-hidden mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas/50 text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Parameter</th>
                <th className="px-5 py-3 font-bold">Type</th>
                <th className="px-5 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink">nuban<span className="text-risk-critical ml-1">*</span></td>
                <td className="px-5 py-4 text-slate">string</td>
                <td className="px-5 py-4 text-slate">The 10-digit NUBAN or standard account number.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink">amount<span className="text-risk-critical ml-1">*</span></td>
                <td className="px-5 py-4 text-slate">number</td>
                <td className="px-5 py-4 text-slate">The transaction amount used to gauge contextual risk.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Request Example */}
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider flex items-center justify-between">
              Request Example
              <button onClick={() => copyCode("curl -X POST https://api.verotrust.com/api/verify \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"nuban\":\"0123456789\",\"amount\":50000}'", setCopiedCurl)} className="text-slate hover:text-ink transition-colors flex items-center gap-1">
                {copiedCurl ? <CheckCircle2 className="w-3.5 h-3.5 text-trust-high" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </h4>
            <div className="bg-[#1C212B] rounded-2xl p-4 font-mono text-xs shadow-soft h-[320px] overflow-auto">
<pre className="text-slate/80"><code>
<span className="text-purple-400">curl</span> -X POST https://api.verotrust.com/api/verify \
  -H <span className="text-yellow-300">"Authorization: Bearer &lt;token&gt;"</span> \
  -H <span className="text-yellow-300">"Content-Type: application/json"</span> \
  -d <span className="text-yellow-300">'{`{`}
    "nuban": "0123456789",
    "amount": 50000
{`}'`}</span>
</code></pre>
            </div>
          </div>

          {/* Response Example */}
          <div>
            <h4 className="font-bold text-ink mb-3 text-sm uppercase tracking-wider">Response Payload</h4>
            <div className="bg-[#1C212B] rounded-2xl p-4 font-mono text-xs shadow-soft h-[320px] overflow-auto">
<pre className="text-slate/80"><code>
{`{`}
  <span className="text-slate-300">"score"</span>: <span className="text-purple-300">30</span>,
  <span className="text-slate-300">"flags"</span>: [
    <span className="text-yellow-300">"multiple_reports_7d"</span>,
    <span className="text-yellow-300">"new_account"</span>
  ],
  <span className="text-slate-300">"explanation"</span>: <span className="text-yellow-300">"This account was recently created and has been reported multiple times for suspicious activity."</span>
{`}`}
</code></pre>
            </div>
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
