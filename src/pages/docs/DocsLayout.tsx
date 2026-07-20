import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function DocsLayout() {
  const activeClass = "text-sm font-bold text-trust-high";
  const inactiveClass = "text-sm font-medium text-slate hover:text-ink transition-colors";
  
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) {
          // Adjust scroll for sticky header
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

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
                <NavLink to="/docs/lookup" className={({isActive}) => (isActive && !location.hash || location.hash === '#verify' ? activeClass : inactiveClass) + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-trust-high/20 text-trust-high px-1.5 py-0.5 rounded font-bold">POST</span>
                  /api/verify
                </NavLink>
                <NavLink to="/docs/lookup#report" className={() => (location.hash === '#report' ? activeClass : inactiveClass) + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-trust-high/20 text-trust-high px-1.5 py-0.5 rounded font-bold">POST</span>
                  /api/report
                </NavLink>
                <NavLink to="/docs/lookup#history" className={() => (location.hash === '#history' ? activeClass : inactiveClass) + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">GET</span>
                  /api/history
                </NavLink>
                <NavLink to="/docs/authentication" className={inactiveClass + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-trust-high/20 text-trust-high px-1.5 py-0.5 rounded font-bold">POST</span>
                  /api/developer/keys/roll
                </NavLink>
                <NavLink to="/docs/authentication" className={inactiveClass + " flex items-center gap-2"}>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">GET</span>
                  /api/developer/keys
                </NavLink>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate mb-3">Integration</h4>
              <ul className="space-y-2 flex flex-col">
                <NavLink to="/docs/webhooks" className={({isActive}) => (isActive ? activeClass : inactiveClass) + " flex items-center gap-2"}>
                  Webhooks
                  <span className="text-[9px] bg-risk-high/15 text-risk-high px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Soon</span>
                </NavLink>
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
