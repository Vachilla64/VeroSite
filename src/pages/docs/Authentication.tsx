import { Key } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Authentication() {
  return (
    <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2"><Key className="w-5 h-5 text-risk-critical" /> Authentication</h2>
        <p className="text-slate mb-6 leading-relaxed">
          All API requests must be authenticated using a Bearer token in the <code className="bg-canvas px-1.5 py-0.5 rounded border border-hairline text-sm text-ink font-mono">Authorization</code> header.
          Never share your secret keys or commit them to version control.
        </p>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-sm shadow-soft overflow-x-auto relative group">
          <pre className="text-slate/80"><code>
<span className="text-blue-300">Authorization:</span> Bearer vero_live_xxx...
          </code></pre>
        </div>
      </section>

      <NextPrevNav 
        prev={{ title: "Quickstart", path: "/docs" }}
        next={{ title: "Evaluate Trust Score", path: "/docs/lookup" }}
      />
    </div>
  );
}
