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
          Vero supports two methods of authentication: <strong className="text-ink">API Keys</strong> for server-to-server B2B integrations, and <strong className="text-ink">Stateful JWTs</strong> for client-side sessions.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-ink mb-3">
          1. API Keys (Recommended for Servers)
        </h3>
        <p className="text-slate mb-4 leading-relaxed">
          For backend integrations, include your live API key in the <code className="bg-app-surface px-1.5 py-0.5 rounded border border-hairline text-sm font-mono">x-api-key</code> header. You can generate API keys from the Developer Dashboard.
        </p>
        <CodeBlock>{`x-api-key: vero_live_xxxxxxxxxxxxxxxxxxxx`}</CodeBlock>
        <div className="bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-2xl px-4 py-3 text-sm font-medium mt-4">
          ⚠ Never expose your live API keys in client-side code (browsers or mobile apps). Use JWTs instead.
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
        <p className="text-slate mb-4 leading-relaxed">Create a new platform account. No API key required.</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <CodeBlock>{`{
  "name": "Acme Corp",
  "email": "dev@acmecorp.com",
  "password": "super-secret-pw"
}`}</CodeBlock>
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
        <p className="text-slate mb-4 leading-relaxed">Exchange credentials for a 24-hour Bearer token.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <CodeBlock>{`{
  "email": "dev@acmecorp.com",
  "password": "super-secret-pw"
}`}</CodeBlock>
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
      </section>

      <NextPrevNav
        prev={{ title: "Quickstart", path: "/docs" }}
        next={{ title: "Verify Trust Score", path: "/docs/lookup" }}
      />
    </div>
  );
}
