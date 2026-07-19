import { Terminal } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Webhooks() {
  return (
    <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-risk-critical" /> Webhooks</h2>
        <p className="text-slate mb-6 leading-relaxed">
          If you process transactions asynchronously, you can subscribe to Vero Webhooks to receive notifications when an account's risk profile changes abruptly (e.g., if an account you interact with is flagged by another platform on the network).
        </p>
        <div className="bg-surface p-6 rounded-2xl border border-hairline shadow-sm">
          <h4 className="font-bold text-ink mb-2">Supported Events:</h4>
          <ul className="list-disc list-inside space-y-2 text-slate text-sm">
            <li><code className="font-mono text-ink bg-canvas px-1 rounded">account.flagged_critical</code> - Dispatched immediately when a previously safe account commits fraud.</li>
            <li><code className="font-mono text-ink bg-canvas px-1 rounded">score.updated</code> - Dispatched when an account's score crosses a major threshold.</li>
          </ul>
        </div>
      </section>

      <NextPrevNav 
        prev={{ title: "Evaluate Trust Score", path: "/docs/lookup" }}
        next={{ title: "Error Codes", path: "/docs/errors" }}
      />
    </div>
  );
}
