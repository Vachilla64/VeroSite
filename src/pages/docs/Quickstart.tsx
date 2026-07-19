import { Play } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Quickstart() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-ink mb-4">Vero API Documentation</h1>
        <p className="text-lg text-slate">Everything you need to integrate Vero's Trust Layer and stop fraud before the money leaves your platform.</p>
      </div>

      <div className="h-px bg-hairline w-full"></div>

      <section className="animate-[fade-in_0.3s_ease-out]">
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-trust-high" /> Quickstart</h2>
        <p className="text-slate mb-6 leading-relaxed">
          Vero provides a single, high-performance endpoint to evaluate the fraud risk of a bank account. 
          The typical flow looks like this:
        </p>
        <ol className="list-decimal list-inside space-y-4 text-slate mb-8 bg-surface p-6 md:p-8 rounded-[32px] shadow-soft">
          <li><strong className="text-ink">Get your API keys</strong> from the Developer Dashboard.</li>
          <li><strong className="text-ink">Call the Lookup API</strong> when a user attempts to add a payout bank account or initiate a withdrawal.</li>
          <li><strong className="text-ink">Evaluate the Trust Score</strong> (0-100) and risk level returned.</li>
          <li><strong className="text-ink">Block or Flag</strong> the transaction based on your internal risk thresholds.</li>
        </ol>
      </section>

      <NextPrevNav 
        next={{ title: "Authentication", path: "/docs/authentication" }}
      />
    </div>
  );
}
