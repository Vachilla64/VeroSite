import { AlertTriangle } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

const errors = [
  {
    code: '400',
    name: 'Bad Request',
    causes: [
      { error: 'Missing nuban or amount', endpoint: '/api/verify', detail: 'Both fields are required.' },
      { error: 'Invalid NUBAN format', endpoint: '/api/verify, /api/report', detail: 'NUBAN must be exactly 10 digits.' },
      { error: 'Missing nuban or reason', endpoint: '/api/report', detail: 'Both fields are required.' },
      { error: 'You cannot report your own account.', endpoint: '/api/report', detail: 'Self-reporting is blocked.' },
    ],
    color: 'text-risk-high',
    bg: 'bg-risk-high/10',
  },
  {
    code: '401',
    name: 'Unauthorized',
    causes: [
      { error: 'Invalid credentials', endpoint: '/api/auth/login', detail: 'Email or password is incorrect.' },
      { error: 'Token missing or invalid', endpoint: 'All protected routes', detail: 'Provide a valid Bearer token in the Authorization header.' },
    ],
    color: 'text-risk-critical',
    bg: 'bg-risk-critical/10',
  },
  {
    code: '403',
    name: 'Forbidden',
    causes: [
      { error: 'LIMIT_REACHED', endpoint: '/api/verify', detail: 'Free plan daily limit of 15 checks reached. Upgrade to Pro for unlimited calls.' },
    ],
    color: 'text-risk-critical',
    bg: 'bg-risk-critical/10',
  },
  {
    code: '404',
    name: 'Not Found',
    causes: [
      { error: 'User not found', endpoint: '/api/verify', detail: 'The authenticated user record no longer exists.' },
    ],
    color: 'text-slate',
    bg: 'bg-app-surface',
  },
  {
    code: '409',
    name: 'Conflict',
    causes: [
      { error: 'Email already in use', endpoint: '/api/auth/register', detail: 'An account with this email already exists. Use /api/auth/login instead.' },
    ],
    color: 'text-slate',
    bg: 'bg-app-surface',
  },
  {
    code: '429',
    name: 'Too Many Requests',
    causes: [
      { error: 'You have already reported this account.', endpoint: '/api/report', detail: 'Duplicate reports per account per user are blocked at the database level.' },
    ],
    color: 'text-risk-high',
    bg: 'bg-risk-high/10',
  },
  {
    code: '500',
    name: 'Internal Server Error',
    causes: [
      { error: 'Internal server error', endpoint: 'All routes', detail: 'An unexpected error occurred server-side. Retry with exponential backoff. If it persists, contact support.' },
    ],
    color: 'text-risk-critical',
    bg: 'bg-risk-critical/10',
  },
];

export default function Errors() {
  return (
    <div className="space-y-10 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-trust-high" /> Error Codes
        </h2>
        <p className="text-slate mb-6 leading-relaxed">
          Vero uses standard HTTP status codes. Every error response includes an <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">error</code> field 
          with a machine-readable message, and sometimes a <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">message</code> field with a human-readable explanation.
        </p>
        <div className="bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto mb-8">
          <pre className="text-slate/80 whitespace-pre-wrap"><code>{`// Example error response
{
  "error": "LIMIT_REACHED",
  "message": "You have reached your daily limit of 15 free checks. Please upgrade to Pro."
}`}</code></pre>
        </div>
      </section>

      {errors.map((group) => (
        <section key={group.code}>
          <div className={`flex items-center gap-3 mb-4`}>
            <span className={`font-black text-2xl font-mono ${group.color}`}>{group.code}</span>
            <span className="text-ink font-bold text-lg">{group.name}</span>
          </div>
          <div className="bg-surface rounded-[24px] shadow-soft overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-app-surface text-slate text-xs uppercase tracking-wider border-b border-hairline">
                <tr>
                  <th className="px-5 py-3 font-bold">Error Message</th>
                  <th className="px-5 py-3 font-bold">Endpoint</th>
                  <th className="px-5 py-3 font-bold">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {group.causes.map((c, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4 font-mono text-ink text-xs">{c.error}</td>
                    <td className="px-5 py-4 text-slate font-mono text-xs">{c.endpoint}</td>
                    <td className="px-5 py-4 text-slate">{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <NextPrevNav prev={{ title: "Webhooks", path: "/docs/webhooks" }} />
    </div>
  );
}
