import { Construction } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

export default function Webhooks() {
  return (
    <div className="space-y-10 animate-[fade-in_0.3s_ease-out]">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
            <Construction className="w-5 h-5 text-risk-high" /> Webhooks
          </h2>
          <span className="bg-risk-high/15 text-risk-high px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            Not implemented
          </span>
        </div>

        <div className="bg-risk-high/10 border border-risk-high/20 rounded-2xl px-5 py-4 mb-8">
          <p className="text-risk-high text-sm font-bold mb-2">
            ⚠ Webhooks do not exist yet. This page describes a planned feature.
          </p>
          <p className="text-risk-high/90 text-sm leading-relaxed">
            There is no webhook endpoint on the Vero API today, no way to register a delivery URL, and no events are
            ever sent. Nothing on this page can be called. It is published so integrators can see the shape we intend
            to ship and tell us if it would not work for them — treat every payload, header and event name below as a
            <strong> draft proposal, subject to change</strong>.
          </p>
        </div>

        <p className="text-slate mb-4 leading-relaxed">
          Today, integrations are <strong className="text-ink">pull-based</strong>: call{' '}
          <a href="/docs/lookup" className="text-trust-high font-semibold hover:underline">POST /api/verify</a> at the moment
          you need a decision. Because scores are computed at read time rather than cached, a fresh lookup always reflects
          every report filed across the network up to that instant — including reports filed seconds earlier.
        </p>
        <p className="text-slate mb-6 leading-relaxed">
          If you want to react to an account degrading over time, poll{' '}
          <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">/api/verify</code> for the
          accounts you care about on a schedule that suits your risk appetite. API-key callers are not rate limited, so
          re-checking your active counterparties is a supported pattern until push delivery ships.
        </p>
      </section>

      <div className="h-px bg-hairline" />

      <section>
        <h3 className="text-xl font-bold text-ink mb-2">Proposed events</h3>
        <p className="text-slate mb-4 text-sm leading-relaxed">
          None of these fire today. Names are provisional.
        </p>
        <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden opacity-70">
          <table className="w-full text-left text-sm">
            <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="px-5 py-3 font-bold">Event (proposed)</th>
                <th className="px-5 py-3 font-bold">Intended trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">score.calculated</td>
                <td className="px-5 py-4 text-slate">Would fire after every successful <code className="bg-app-surface px-1 rounded text-xs">/api/verify</code> call.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">account.flagged_critical</td>
                <td className="px-5 py-4 text-slate">Would fire when a previously safe account drops below the critical-risk threshold of 30.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono text-ink text-sm">score.updated</td>
                <td className="px-5 py-4 text-slate">Would fire when a watched account's score crosses a major threshold in either direction.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-2">Proposed payload shape</h3>
        <p className="text-slate mb-4 text-sm leading-relaxed">
          Illustrative only — no such request is sent by any Vero service.
        </p>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto opacity-70">
          <pre className="text-slate/80 whitespace-pre-wrap"><code>{`// DRAFT — not delivered by any live endpoint
{
  "event": "account.flagged_critical",
  "timestamp": "2026-07-19T21:43:00.000Z",
  "data": {
    "nuban": "8877665544",
    "previousScore": 72,
    "newScore": 10,
    "flags": ["heavily_reported", "critical_risk"],
    "explanation": "This account received several new fraud reports."
  }
}`}</code></pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-2">Planned signing and retries</h3>
        <p className="text-slate mb-4 leading-relaxed text-sm">
          When webhooks ship, the intent is to sign each request with an HMAC-SHA256 header over the raw body and to retry
          non-2xx deliveries with exponential backoff. <strong className="text-ink">No signing secret exists in the dashboard today</strong>,
          and no retry schedule is in force, because nothing is delivered. Concrete guarantees will be documented here when the
          feature is actually built.
        </p>
      </section>

      <NextPrevNav
        prev={{ title: "API Reference", path: "/docs/lookup" }}
        next={{ title: "Error Codes", path: "/docs/errors" }}
      />
    </div>
  );
}
