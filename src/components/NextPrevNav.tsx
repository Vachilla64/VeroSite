import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavLinkProps {
  title: string;
  path: string;
}

export default function NextPrevNav({ prev, next }: { prev?: NavLinkProps, next?: NavLinkProps }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-16 pt-8 border-t border-hairline">
      {prev ? (
        <Link to={prev.path} className="group flex-1 bg-surface p-4 rounded-2xl border border-hairline hover:border-slate/40 transition-colors">
          <span className="text-[10px] font-bold text-slate uppercase tracking-widest mb-1 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Previous</span>
          <span className="text-sm font-bold text-ink group-hover:text-risk-critical transition-colors">{prev.title}</span>
        </Link>
      ) : <div className="flex-1 hidden sm:block"></div>}
      
      {next ? (
        <Link to={next.path} className="group flex-1 bg-surface p-4 rounded-2xl border border-hairline hover:border-slate/40 transition-colors text-right flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate uppercase tracking-widest mb-1 flex items-center gap-1">Next <ArrowRight className="w-3 h-3" /></span>
          <span className="text-sm font-bold text-ink group-hover:text-risk-critical transition-colors">{next.title}</span>
        </Link>
      ) : <div className="flex-1 hidden sm:block"></div>}
    </div>
  );
}
