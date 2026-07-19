import { NavLink, Outlet } from 'react-router-dom';

export default function DocsLayout() {
  const activeClass = "text-sm font-bold text-trust-high";
  const inactiveClass = "text-sm font-medium text-slate hover:text-ink transition-colors";

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 flex justify-center">
      <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col md:flex-row gap-12 relative">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden md:block w-64 flex-shrink-0 relative">
          <div className="sticky top-28 space-y-8">

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-3">Getting Started</h4>
              <ul className="space-y-2 flex flex-col">
                <NavLink to="/docs" end className={({isActive}) => isActive ? activeClass : inactiveClass}>Quickstart</NavLink>
                <NavLink to="/docs/authentication" className={({isActive}) => isActive ? activeClass : inactiveClass}>Authentication</NavLink>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-3">API Reference</h4>
              <ul className="space-y-3 flex flex-col">
                <NavLink to="/docs/lookup" className={({isActive}) => (isActive ? activeClass : inactiveClass) + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-trust-high/20 text-trust-high px-1.5 py-0.5 rounded font-bold">POST</span>
                  /api/verify
                </NavLink>
                <NavLink to="/docs/lookup#report" className={() => inactiveClass + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-trust-high/20 text-trust-high px-1.5 py-0.5 rounded font-bold">POST</span>
                  /api/report
                </NavLink>
                <NavLink to="/docs/lookup#history" className={() => inactiveClass + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">GET</span>
                  /api/history
                </NavLink>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-3">Integration</h4>
              <ul className="space-y-2 flex flex-col">
                <NavLink to="/docs/webhooks" className={({isActive}) => isActive ? activeClass : inactiveClass}>Webhooks</NavLink>
                <NavLink to="/docs/errors" className={({isActive}) => isActive ? activeClass : inactiveClass}>Error Codes</NavLink>
              </ul>
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-3xl pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
