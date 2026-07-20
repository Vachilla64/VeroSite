import { useState } from 'react';
import { Key, Copy, CheckCircle2 } from 'lucide-react';
import NextPrevNav from '../../components/NextPrevNav';

function CodeBlock({ children, language = '' }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group">
      <button
        onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="absolute top-3 right-3 p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <CheckCircle2 className="w-4 h-4 text-trust-high" /> : <Copy className="w-4 h-4 text-slate/60" />}
      </button>
      <div className={`bg-[#1C212B] rounded-2xl p-5 font-mono text-xs shadow-soft overflow-x-auto ${language}`}>
        <pre className="text-slate/80 whitespace-pre-wrap"><code>{children}</code></pre>
      </div>
    </div>
  );
}

export default function Authentication() {
  return (
    <div className="space-y-10 animate-[fade-in_0.3s_ease-out]">
      <section>
        <h2 className="text-2xl font-bold text-ink mb-2 flex items-center gap-2">
          <Key className="w-5 h-5 text-trust-high" /> Authentication
        </h2>
        <p className="text-slate mb-6 leading-relaxed">
          Every protected endpoint accepts <strong className="text-ink">either</strong> of two credentials. Send one of them, never both:
          an <strong className="text-ink">API key</strong> in <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">x-api-key</code> for
          server-to-server B2B integrations, or a <strong className="text-ink">JWT</strong> in{' '}
          <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">Authorization: Bearer</code> for user sessions.
        </p>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate leading-relaxed">
          If <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">x-api-key</code> is present it is checked first
          and the <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">Authorization</code> header is ignored.
          Sending neither returns <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">401</code>.
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-3">
          1. API Keys (Recommended for Servers)
        </h3>
        <p className="text-slate mb-4 leading-relaxed">
          For backend integrations, include your live API key in the <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">x-api-key</code> header.
          Keys are the literal prefix <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">vero_live_</code> followed by 32 hex characters,
          and they do not expire — they stay valid until rolled.
        </p>
        <CodeBlock>{`x-api-key: vero_live_4f9c2ab7e1d0835a6b4c9e2f7a1d8b30`}</CodeBlock>
        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium mt-4">
          ⚠ Never expose your live API keys in client-side code (browsers or mobile apps). Use JWTs instead.
        </div>

        <h4 className="text-lg font-bold text-ink mb-3 mt-8">A. Roll a key</h4>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-trust-high/20 text-trust-high px-2 py-1 rounded text-xs font-bold tracking-wide">POST</span>
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/developer/keys/roll</code>
        </div>
        <p className="text-slate mb-4 leading-relaxed">
          Generates a new key and returns it in full. This is the only time the key is returned to you in a create response — store it immediately.
        </p>
        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium mb-4">
          ⚠ Rolling <strong>deactivates every existing active key</strong> on your account first. Any integration still using the old key
          starts receiving <code className="font-mono">403</code> immediately.
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <CodeBlock>{`curl -X POST \\
  https://api-vero.up.railway.app/api/developer/keys/roll \\
  -H "Authorization: Bearer eyJhbGci..."`}</CodeBlock>
          <CodeBlock>{`// 201 Created
{
  "id": "cuid_...",
  "key": "vero_live_4f9c2ab7e1d0835a6b4c9e2f7a1d8b30",
  "isActive": true,
  "createdAt": "2026-07-20T09:12:44.108Z",
  "userId": "cuid_..."
}`}</CodeBlock>
        </div>

        <h4 className="text-lg font-bold text-ink mb-3 mt-8">B. List active keys</h4>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold tracking-wide">GET</span>
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/developer/keys</code>
        </div>
        <p className="text-slate mb-4 leading-relaxed">
          Returns an array of your active keys, newest first. Deactivated keys are not included.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <CodeBlock>{`curl https://api-vero.up.railway.app/api/developer/keys \\
  -H "Authorization: Bearer eyJhbGci..."`}</CodeBlock>
          <CodeBlock>{`// 200 OK
[
  {
    "id": "cuid_...",
    "key": "vero_live_4f9c2ab7e1d0835a6b4c9e2f7a1d8b30",
    "isActive": true,
    "createdAt": "2026-07-20T09:12:44.108Z",
    "userId": "cuid_..."
  }
]`}</CodeBlock>
        </div>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate leading-relaxed">
          <strong className="text-ink">Both key-management endpoints require a JWT.</strong> Authenticating them with{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">x-api-key</code> returns{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">403 "Cannot manage API keys using an API key"</code>.
          A key can never mint or read another key.
        </div>
      </section>

      <div className="h-px bg-hairline my-10" />

      <section>
        <h3 className="text-xl font-bold text-ink mb-3">
          2. JWTs (For Client-Side Apps)
        </h3>
        <p className="text-slate mb-6 leading-relaxed">
          If you are integrating Vero directly into a client-side application, you must register a user and obtain a JWT session token. Include the token in the <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">Authorization</code> header. Tokens expire after <strong className="text-ink">24 hours</strong>.
        </p>

        <h4 className="text-lg font-bold text-ink mb-3">
          A. Register User
        </h4>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-trust-high/20 text-trust-high px-2 py-1 rounded text-xs font-bold tracking-wide">POST</span>
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/auth/register</code>
        </div>
        <p className="text-slate mb-4 leading-relaxed">
          Create a new platform account. No authentication required. All three fields are mandatory —
          omitting any returns <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">400 "Missing required fields"</code>.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <CodeBlock>{`curl -X POST \\
  https://api-vero.up.railway.app/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Acme Corp",
    "email": "dev@acmecorp.com",
    "password": "super-secret-pw"
  }'`}</CodeBlock>
          <CodeBlock>{`// 201 Created
{
  "token": "eyJhbGci...",
  "user": {
    "id": "cuid_...",
    "name": "Acme Corp",
    "email": "dev@acmecorp.com"
  }
}`}</CodeBlock>
        </div>
        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium">
          ⚠ A 409 is returned if the email is already registered.
        </div>
      </section>

      <div className="h-px bg-hairline my-10" />

      <section>
        <h4 className="text-lg font-bold text-ink mb-3">
          B. Login & Get Token
        </h4>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-trust-high/20 text-trust-high px-2 py-1 rounded text-xs font-bold tracking-wide">POST</span>
          <code className="text-sm font-mono text-ink bg-surface px-2 py-1 rounded border border-hairline">/api/auth/login</code>
        </div>
        <p className="text-slate mb-4 leading-relaxed">
          Exchange credentials for a 24-hour Bearer token. Wrong email or password returns{' '}
          <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">401 "Invalid credentials"</code> —
          the two cases are deliberately indistinguishable.
        </p>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mb-4 leading-relaxed">
          Trying things out? The demo user{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">clean@vero.net</code> /{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">password123</code>{' '}
          is seeded on the live API.
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <CodeBlock>{`curl -X POST \\
  https://api-vero.up.railway.app/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "clean@vero.net",
    "password": "password123"
  }'`}</CodeBlock>
          <CodeBlock>{`// 200 OK
{
  "token": "eyJhbGci...",
  "user": {
    "id": "cuid_...",
    "name": "Acme Corp",
    "email": "dev@acmecorp.com"
  }
}`}</CodeBlock>
        </div>
      </section>

      <div className="h-px bg-hairline my-10" />

      <section>
        <h4 className="text-lg font-bold text-ink mb-3">C. Use the Token</h4>
        <p className="text-slate mb-4 leading-relaxed">
          Include your token in the <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">Authorization</code> header of every subsequent request.
        </p>
        <CodeBlock>{`Authorization: Bearer eyJhbGci...`}</CodeBlock>
        <div className="bg-app-surface border border-hairline rounded-2xl px-4 py-3 text-sm text-slate mt-4 leading-relaxed">
          An expired or malformed token returns{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono border border-hairline">403 "Invalid or expired token"</code>,
          not a 401. Treat a 403 on a previously-working token as "re-authenticate", and log in again for a fresh 24-hour token.
        </div>
      </section>

      <NextPrevNav
        prev={{ title: "Quickstart", path: "/docs" }}
        next={{ title: "Verify Trust Score", path: "/docs/lookup" }}
      />
    </div>
  );
}
