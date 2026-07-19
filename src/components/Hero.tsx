import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, ShieldAlert, AlertTriangle, Search, Loader2 } from 'lucide-react';

const PROFILES = [
  {
    id: 'trusted',
    nuban: '0123456789',
    name: 'Adaeze Okafor',
    bank: 'GTBank',
    score: 92,
    label: 'Trusted',
    color: '#00C853',
    bgClass: 'bg-gradient-to-br from-[#00C853] to-[#00E676]',
    text: 'Verified business with 200+ consistent payments over 3 years.',
    tags: ['Legit thrift store', 'Fast delivery'],
    icon: ShieldCheck,
    iconColor: 'text-trust-high',
    avatarChar: 'A'
  },
  {
    id: 'high-risk',
    nuban: '8877665544',
    name: 'Chidi Nwosu',
    bank: 'Opay',
    score: 12,
    label: 'High Risk',
    color: '#FF4B4B',
    bgClass: 'bg-gradient-to-br from-[#FF4B4B] to-[#FF7A7A]',
    text: 'Reported 14 times in the past month for undelivered goods.',
    tags: ['Fake vendor', 'Never delivered'],
    icon: ShieldAlert,
    iconColor: 'text-risk-critical',
    avatarChar: 'C'
  },
  {
    id: 'caution',
    nuban: '1122334455',
    name: 'Blessing Eze',
    bank: 'Kuda',
    score: 54,
    label: 'Caution',
    color: '#FFC300',
    bgClass: 'bg-gradient-to-br from-[#FFC300] to-[#FFD84D]',
    text: 'Mixed history — mostly on-time, one recent delayed delivery report.',
    tags: ['Delayed once'],
    icon: AlertTriangle,
    iconColor: 'text-risk-neutral',
    avatarChar: 'B'
  }
];

export default function Hero() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'analyzing' | 'verdict'>('typing');
  const [typedNuban, setTypedNuban] = useState('');
  
  const currentProfile = PROFILES[profileIndex];
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (phase === 'typing') {
      const target = currentProfile.nuban;
      if (typedNuban.length < target.length) {
        timeout = setTimeout(() => {
          setTypedNuban(target.slice(0, typedNuban.length + 1));
        }, 80 + Math.random() * 80);
      } else {
        timeout = setTimeout(() => setPhase('analyzing'), 500);
      }
    } else if (phase === 'analyzing') {
      timeout = setTimeout(() => setPhase('verdict'), 1500);
    } else if (phase === 'verdict') {
      timeout = setTimeout(() => {
        setPhase('typing');
        setTypedNuban('');
        setProfileIndex((prev) => (prev + 1) % PROFILES.length);
      }, 5000);
    }
    
    return () => clearTimeout(timeout);
  }, [phase, typedNuban, currentProfile.nuban]);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-trust-high/10 text-trust-high px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-trust-high animate-[pulse_2s_ease-in-out_infinite]"></span>
            Live in Nigeria & Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink leading-[1.1] mb-6 tracking-tight">
            Know who you're paying. <br className="hidden md:block"/>
            <span className="text-trust-high">Before you pay.</span>
          </h1>
          <p className="text-lg text-slate mb-8 leading-relaxed max-w-lg">
            Vero intercepts bank transfers to provide a 0-100 Trust Score and an AI-driven risk explanation. 
            <strong className="text-ink font-semibold"> Stop scams at checkout.</strong>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/developer" className="flex items-center gap-2 bg-trust-high text-surface px-6 py-3.5 rounded-pill font-bold shadow-soft hover:opacity-90 transition-all hover:-translate-y-0.5">
              Get API Keys <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="flex items-center gap-2 text-ink bg-surface shadow-sm border border-hairline px-6 py-3.5 rounded-pill font-semibold hover:border-slate/30 hover:bg-app-surface transition-colors">
              Read Docs
            </Link>
          </div>
        </div>

        {/* Right Visuals - Interactive Verdict Mockup */}
        <div className="relative mt-8 lg:mt-0 perspective-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-trust-high/5 blur-[100px] -z-10 rounded-full"></div>
          
          <motion.div 
            layout
            className="w-full max-w-[390px] mx-auto bg-app-surface rounded-[40px] shadow-[0_30px_70px_rgba(43,52,69,0.14),0_6px_16px_rgba(43,52,69,0.06)] overflow-hidden border-[6px] border-surface flex flex-col relative"
            style={{ height: '750px' }}
          >
            {/* Status Bar */}
            <div className={`h-[52px] flex items-center justify-between px-[30px] font-semibold text-[15px] z-20 transition-colors duration-500 absolute top-0 left-0 right-0 ${phase === 'verdict' ? 'text-surface' : 'text-ink'}`}>
              <span>9:41</span>
              <div className="flex gap-[5px]">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 relative mt-[52px]">
              <AnimatePresence mode="wait">
                {phase === 'verdict' ? (
                  <motion.div 
                    key="verdict"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col absolute inset-0"
                  >
                    {/* Color Hero */}
                    <div className={`relative px-[30px] pb-[40px] rounded-b-[40px] overflow-hidden flex-shrink-0 ${currentProfile.bgClass} -mt-[52px] pt-[52px]`}>
                      {/* Glass reflections */}
                      <div className="absolute -top-[60px] -right-[40px] w-[200px] h-[200px] rounded-full bg-surface/10 blur-sm"></div>
                      <div className="absolute -bottom-[70px] -left-[30px] w-[160px] h-[160px] rounded-full bg-surface/10 blur-sm"></div>
                      
                      <div className="flex items-center justify-between relative mt-2">
                        <div className="text-surface/85 text-[15px] font-semibold">‹ Back</div>
                        <div className="font-black text-[15px] text-surface tracking-[0.04em]">VERO</div>
                        <div className="text-surface/85 text-[22px] font-bold">⋯</div>
                      </div>

                      <div className="flex flex-col items-center mt-5 relative">
                        <div className="font-bold text-[12px] tracking-[0.14em] uppercase text-surface/90 font-sans">{currentProfile.label}</div>
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                          className="text-[120px] font-black text-surface leading-none tracking-[-0.03em]"
                        >
                          {currentProfile.score}
                        </motion.div>
                        <div className="flex gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`w-[26px] h-[5px] rounded-[3px] ${i < Math.ceil(currentProfile.score / 20) ? 'bg-surface' : 'bg-surface/30'}`}></span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Verdict Details Card */}
                    <div className="flex-1 bg-surface flex flex-col p-[30px]">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-[12px] mb-[22px]"
                      >
                        <div className={`w-[52px] h-[52px] rounded-[16px] bg-app-surface flex items-center justify-center font-bold text-[20px] ${currentProfile.iconColor}`}>
                          {currentProfile.avatarChar}
                        </div>
                        <div>
                          <div className="text-[19px] font-bold text-ink">{currentProfile.name}</div>
                          <div className="text-[14px] text-slate font-medium">{currentProfile.bank} · ••••{currentProfile.nuban.slice(-4)}</div>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[16px] font-medium text-ink leading-relaxed mb-[20px]"
                      >
                        {currentProfile.text}
                      </motion.div>

                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-[8px] flex-wrap mb-auto"
                      >
                        {currentProfile.tags.map((tag, i) => (
                          <span key={i} className="font-medium text-[13px] font-sans px-[14px] py-[8px] rounded-[12px] bg-app-surface text-ink border border-hairline">
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-[24px]"
                      >
                        {currentProfile.id === 'trusted' ? (
                          <div className="relative h-[64px] rounded-[999px] bg-trust-high flex items-center shadow-[0_12px_28px_rgba(0,200,83,0.3)] cursor-pointer">
                            <div className="absolute left-[6px] w-[52px] h-[52px] rounded-full bg-surface flex items-center justify-center text-trust-high text-[22px] font-black">›</div>
                            <div className="flex-1 text-center text-surface font-bold text-[16px] pl-[40px]">Slide to copy details</div>
                          </div>
                        ) : (
                          <button className={`border-none rounded-[999px] font-semibold text-[16px] font-sans p-[17px] cursor-pointer w-full text-center text-surface shadow-soft ${currentProfile.id === 'high-risk' ? 'bg-risk-critical' : 'bg-ink'}`}>
                            {currentProfile.id === 'high-risk' ? 'Report this account' : 'Proceed carefully'}
                          </button>
                        )}
                        <div className="text-center mt-[14px] text-slate text-[13px] font-semibold cursor-pointer">
                          {currentProfile.id === 'high-risk' ? 'Send anyway' : 'Report this account'}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col px-[26px] pb-[26px] absolute inset-0"
                  >
                    <div className="flex items-center justify-between mb-[22px]">
                      <div className="font-black text-[17px] text-ink tracking-[0.02em]">VERO</div>
                      <div className="w-[38px] h-[38px] rounded-[12px] bg-surface flex items-center justify-center font-bold text-ink text-[15px] shadow-[0_4px_12px_rgba(43,52,69,0.06)] border border-hairline">
                        A
                      </div>
                    </div>
                    
                    <div className="text-[22px] font-bold text-ink leading-tight mb-[18px]">
                      Check an account<br/>before you send.
                    </div>

                    {/* Input Simulation */}
                    <div className={`flex items-center gap-[10px] bg-surface rounded-[16px] px-[16px] py-[15px] shadow-[0_12px_30px_rgba(43,52,69,0.06)] border transition-colors duration-300 ${phase === 'analyzing' ? 'border-trust-high bg-trust-high/5' : 'border-hairline'}`}>
                      {phase === 'analyzing' ? (
                        <Loader2 className="w-5 h-5 text-trust-high animate-spin" />
                      ) : (
                        <Search className="w-5 h-5 text-slate" />
                      )}
                      <span className="text-[17px] font-medium text-ink flex-1 h-[24px]">
                        {typedNuban}
                        {phase === 'typing' && <span className="animate-[pulse_1s_ease-in-out_infinite]">|</span>}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold tracking-[0.06em] uppercase text-slate mt-[26px] mb-[12px]">Recent</div>
                    <div className="flex flex-col gap-[10px]">
                      {PROFILES.map((prof) => (
                        <div key={prof.id} className={`flex items-center gap-[12px] bg-surface shadow-sm rounded-[16px] p-[12px] transition-opacity duration-300 ${prof.id === currentProfile.id && phase === 'analyzing' ? 'opacity-100 ring-2 ring-trust-high/50' : 'opacity-70'}`}>
                          <div className={`w-[42px] h-[42px] rounded-[13px] bg-app-surface flex items-center justify-center font-bold text-[16px] ${prof.iconColor}`}>
                            {prof.avatarChar}
                          </div>
                          <div className="flex-1">
                            <div className="text-[15px] font-bold text-ink">{prof.name}</div>
                            <div className="text-[12.5px] text-slate font-medium">{prof.bank}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
