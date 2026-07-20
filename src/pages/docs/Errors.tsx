import { AlertTriangle } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

const errors = [
  {
    code: '400',
    name: 'Bad Request',
    causes: [
      { error: 'Missing nuban or amount', endpoint: '/api/verify', detail: 'Both fields are required. Note: a badly formatted NUBAN is NOT a 400 here — it returns 200 with score 0 and the invalid_format flag.' },
      { error: 'Missing nuban or reason', endpoint: '/api/report', detail: 'Both fields are required.' },
      { error: 'Invalid NUBAN format', endpoint: '/api/report', detail: 'NUBAN must be exactly 10 digits. This hard check applies to /api/report only.' },
      { error: 'You cannot report your own account.', endpoint: '/api/report', detail: 'Self-reporting an account you already own is blocked.' },
      { error: 'Missing required fields', endpoint: '/api/auth/register', detail: 'email, password and name are all mandatory.' },
      { error: 'Missing email or password', endpoint: '/api/auth/login', detail: 'Both fields are required.' },
      { error: 'Nothing to update', endpoint: '/api/user/settings', detail: 'Send at least one of name or password.' },
    ],
    color: 'text-risk-high',
    bg: 'bg-risk-high/10',
  },
  {
    code: '401',
    name: 'Unauthorized',
    causes: [
      { error: 'Invalid credentials', endpoint: '/api/auth/login', detail: 'Email or password is incorrect. The two cases are deliberately indistinguishable.' },
      { error: 'Authorization header or x-api-key missing', endpoint: 'All protected routes', detail: 'You sent neither credential. Add x-api-key, or Authorization: Bearer <jwt>. A credential that is present but bad is a 403, not a 401.' },
    ],
    color: 'text-risk-critical',
    bg: 'bg-risk-critical/10',
  },
  {
    code: '403',
    name: 'Forbidden',
    causes: [
      { error: 'Invalid or revoked API key', endpoint: 'All protected routes', detail: 'The x-api-key is unknown or was deactivated — most often because a newer key was rolled, which deactivates all previous keys. Roll again and redeploy.' },
      { error: 'Invalid or expired token', endpoint: 'All protected routes', detail: 'The Bearer token failed verification or is past its 24-hour lifetime. Log in again.' },
      { error: 'Cannot manage API keys using an API key', endpoint: '/api/developer/keys, /api/developer/keys/roll', detail: 'Key management requires a JWT user session. An API key can never mint or list keys.' },
      { error: 'LIMIT_REACHED', endpoint: '/api/verify', detail: 'Non-premium JWT session hit the 15-lookup daily cap. Callers using x-api-key are exempt and never see this.' },
    ],
    color: 'text-risk-critical',
    bg: 'bg-risk-critical/10',
  },
  {
    code: '404',
    name: 'Not Found',
    causes: [
      { error: 'User not found', endpoint: '/api/verify, /api/user/profile', detail: 'The authenticated user record no longer exists.' },
      { error: 'Not found', endpoint: 'Any unrecognised path', detail: 'Catch-all for a route that does not exist. Check the path and that you are hitting https://api-vero.up.railway.app.' },
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
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate leading-relaxed">
          <strong className="text-ink">401 vs 403.</strong> Vero returns <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">401</code> only
          when <em>no</em> credential was supplied. A credential that is supplied but rejected — expired token, revoked key, wrong credential type
          for the endpoint — is always a <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">403</code>.
          Retry logic should treat 403 as "re-authenticate", not as a permanent denial.
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
