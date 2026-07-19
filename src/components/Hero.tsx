import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, ShieldAlert, AlertTriangle, Search, Loader2, Building2, Check, X } from 'lucide-react';

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

const BANKS = [
  'GTBank', 'Access Bank', 'Opay', 'Moniepoint', 'Kuda', 'Zenith Bank', 'UBA', 'First Bank'
];

export default function Hero() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'analyzing' | 'verdict'>('typing');
  const [typedNuban, setTypedNuban] = useState('');
  
  // Interactive State
  const [isInteracting, setIsInteracting] = useState(false);
  const [showBankSelector, setShowBankSelector] = useState(false);
  const [selectedBank, setSelectedBank] = useState('GTBank');
  const [userProfile, setUserProfile] = useState<typeof PROFILES[0] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const currentProfile = userProfile || PROFILES[profileIndex];
  
  useEffect(() => {
    // If user interacts, stop auto loop
    if (isInteracting) return;

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
  }, [phase, typedNuban, currentProfile.nuban, isInteracting]);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (phase === 'verdict') {
      setPhase('typing');
    }
    setTypedNuban('');
    setUserProfile(null);
  };

  const handleAnalyzeClick = () => {
    if (typedNuban.length < 10) return;
    setPhase('analyzing');
    
    // Pseudo-random verdict based on last digit
    const lastDigit = parseInt(typedNuban.slice(-1));
    let result;
    if (lastDigit >= 0 && lastDigit <= 4) result = PROFILES[0]; // 50% Trusted
    else if (lastDigit >= 5 && lastDigit <= 7) result = PROFILES[2]; // 30% Caution
    else result = PROFILES[1]; // 20% High Risk
    
    // Generate a generic name based on input to make it feel real
    const mockName = `User ${typedNuban.slice(0,4)}...`;
    
    setUserProfile({
      ...result,
      nuban: typedNuban,
      bank: selectedBank,
      name: mockName,
      avatarChar: mockName.charAt(0)
    });

    setTimeout(() => {
      setPhase('verdict');
    }, 1500);
  };

  const resetDemo = () => {
    setPhase('typing');
    setTypedNuban('');
    setUserProfile(null);
    inputRef.current?.focus();
  };

  const closeInteractive = () => {
    setIsInteracting(false);
    setPhase('typing');
    setTypedNuban('');
    setUserProfile(null);
  };

  return (
    <>
      {/* Global Focus Backdrop */}
      <AnimatePresence>
        {isInteracting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-md"
            onClick={closeInteractive}
          />
        )}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Content */}
          <div className={`max-w-2xl transition-opacity duration-500 ${isInteracting ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
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
          <div className={`relative mt-8 lg:mt-0 perspective-1000 ${isInteracting ? 'z-50' : 'z-10'}`}>
            {!isInteracting && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-trust-high/5 blur-[100px] -z-10 rounded-full"></div>
            )}
            
            <motion.div 
              layout
              className={`bg-app-surface overflow-hidden flex flex-col relative transition-all duration-500 mx-auto
                ${isInteracting 
                  ? 'fixed inset-0 w-full h-[100dvh] rounded-none md:relative md:w-full md:max-w-[420px] md:rounded-[48px] md:h-[800px] md:border-[8px] md:border-surface md:shadow-[0_40px_100px_rgba(0,0,0,0.3)]' 
                  : 'w-full max-w-[390px] h-[750px] rounded-[40px] border-[6px] border-surface shadow-[0_30px_70px_rgba(43,52,69,0.14),0_6px_16px_rgba(43,52,69,0.06)]'
                }
              `}
            >
              {/* Close button for mobile fullscreen */}
              {isInteracting && (
                <button 
                  onClick={closeInteractive}
                  className="md:hidden absolute top-4 right-4 z-50 w-10 h-10 bg-surface/50 rounded-full flex items-center justify-center text-ink backdrop-blur-md shadow-sm border border-hairline"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Status Bar (Hidden on actual mobile to avoid clashing with real status bar, but shown on desktop demo) */}
              <div className={`h-[52px] hidden md:flex items-center justify-between px-[30px] font-semibold text-[15px] z-20 transition-colors duration-500 absolute top-0 left-0 right-0 ${phase === 'verdict' ? 'text-surface' : 'text-ink'}`}>
                <span>9:41</span>
                <div className="flex gap-[5px]">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${phase === 'verdict' ? 'bg-surface' : 'bg-ink'}`}></span>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className={`flex-1 relative ${isInteracting ? 'mt-0 pt-16 md:pt-0 md:mt-[52px]' : 'mt-[52px]'}`}>
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
                      <div className={`relative px-[30px] pb-[40px] rounded-b-[40px] overflow-hidden flex-shrink-0 ${currentProfile.bgClass} md:-mt-[52px] md:pt-[52px]`}>
                        {/* Glass reflections */}
                        <div className="absolute -top-[60px] -right-[40px] w-[200px] h-[200px] rounded-full bg-surface/10 blur-sm"></div>
                        <div className="absolute -bottom-[70px] -left-[30px] w-[160px] h-[160px] rounded-full bg-surface/10 blur-sm"></div>
                        
                        <div className="flex items-center justify-between relative mt-2">
                          <button onClick={resetDemo} className="text-surface/85 text-[15px] font-semibold hover:text-surface transition-colors cursor-pointer">‹ Back</button>
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
                      <div className="flex-1 bg-surface flex flex-col p-[30px] overflow-y-auto">
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
                          className="mt-[24px] pb-6"
                        >
                          {currentProfile.id === 'trusted' ? (
                            <div className="relative h-[64px] rounded-[999px] bg-trust-high flex items-center shadow-[0_12px_28px_rgba(0,200,83,0.3)] cursor-pointer hover:bg-[#00E676] transition-colors">
                              <div className="absolute left-[6px] w-[52px] h-[52px] rounded-full bg-surface flex items-center justify-center text-trust-high text-[22px] font-black">›</div>
                              <div className="flex-1 text-center text-surface font-bold text-[16px] pl-[40px]">Slide to copy details</div>
                            </div>
                          ) : (
                            <button className={`border-none rounded-[999px] font-semibold text-[16px] font-sans p-[17px] cursor-pointer w-full text-center text-surface shadow-soft hover:opacity-90 transition-opacity ${currentProfile.id === 'high-risk' ? 'bg-risk-critical' : 'bg-ink'}`}>
                              {currentProfile.id === 'high-risk' ? 'Report this account' : 'Proceed carefully'}
                            </button>
                          )}
                          <div className="text-center mt-[14px] text-slate text-[13px] font-semibold cursor-pointer hover:text-ink transition-colors">
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
                      <div className="flex items-center justify-between mb-[22px] hidden md:flex">
                        <div className="font-black text-[17px] text-ink tracking-[0.02em]">VERO</div>
                        <div className="w-[38px] h-[38px] rounded-[12px] bg-surface flex items-center justify-center font-bold text-ink text-[15px] shadow-[0_4px_12px_rgba(43,52,69,0.06)] border border-hairline cursor-pointer" onClick={closeInteractive}>
                          M
                        </div>
                      </div>
                      
                      <div className="text-[22px] font-bold text-ink leading-tight mb-[18px]">
                        Check an account<br/>before you send.
                      </div>

                      {/* Interactive Bank Selector Button */}
                      <button 
                        onClick={() => { handleInteractionStart(); setShowBankSelector(true); }}
                        className="flex items-center justify-between bg-surface rounded-[16px] px-[16px] py-[15px] shadow-sm border border-hairline mb-[12px] hover:border-slate/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-trust-high" />
                          <span className="font-semibold text-ink text-[15px]">{selectedBank}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate" />
                      </button>

                      {/* Interactive Input */}
                      <div className={`flex items-center gap-[10px] bg-surface rounded-[16px] px-[16px] py-[12px] shadow-[0_12px_30px_rgba(43,52,69,0.06)] border transition-colors duration-300 ${phase === 'analyzing' ? 'border-trust-high bg-trust-high/5' : isInteracting ? 'border-trust-high ring-2 ring-trust-high/20' : 'border-hairline'}`}>
                        {phase === 'analyzing' ? (
                          <Loader2 className="w-5 h-5 text-trust-high animate-spin" />
                        ) : (
                          <Search className="w-5 h-5 text-slate" />
                        )}
                        
                        {isInteracting ? (
                          <input 
                            ref={inputRef}
                            type="tel"
                            maxLength={10}
                            value={typedNuban}
                            onChange={(e) => setTypedNuban(e.target.value.replace(/\D/g, ''))}
                            placeholder="Account Number"
                            className="flex-1 bg-transparent border-none outline-none text-[17px] font-semibold text-ink placeholder-slate/50 h-[30px]"
                            disabled={phase === 'analyzing'}
                            autoFocus
                          />
                        ) : (
                          <div 
                            className="flex-1 text-[17px] font-semibold text-ink h-[30px] flex items-center cursor-text"
                            onClick={() => { handleInteractionStart(); setTimeout(() => inputRef.current?.focus(), 100); }}
                          >
                            {typedNuban}
                            {phase === 'typing' && <span className="animate-[pulse_1s_ease-in-out_infinite] font-normal text-trust-high">|</span>}
                          </div>
                        )}
                      </div>

                      {/* "Analyze Risk" Button - Only shows when interacting and 10 digits entered */}
                      <AnimatePresence>
                        {isInteracting && typedNuban.length === 10 && phase !== 'analyzing' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            className="mt-[16px]"
                          >
                            <button 
                              onClick={handleAnalyzeClick}
                              className="w-full bg-trust-high text-surface font-bold text-[16px] py-[16px] rounded-[16px] shadow-[0_8px_20px_rgba(0,200,83,0.3)] hover:bg-[#00E676] transition-colors active:scale-[0.98]"
                            >
                              Analyze Risk
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="text-[11px] font-bold tracking-[0.06em] uppercase text-slate mt-[26px] mb-[12px]">
                        {isInteracting ? 'Suggested' : 'Recent'}
                      </div>
                      
                      <div className="flex flex-col gap-[10px] overflow-y-auto pb-6 custom-scrollbar">
                        {PROFILES.map((prof) => (
                          <div 
                            key={prof.id} 
                            onClick={() => {
                              if (isInteracting && phase !== 'analyzing') {
                                setSelectedBank(prof.bank);
                                setTypedNuban(prof.nuban);
                              }
                            }}
                            className={`flex items-center gap-[12px] bg-surface shadow-sm rounded-[16px] p-[12px] transition-all duration-300 ${prof.id === currentProfile.id && phase === 'analyzing' ? 'opacity-100 ring-2 ring-trust-high/50' : 'opacity-70'} ${isInteracting ? 'cursor-pointer hover:opacity-100' : ''}`}
                          >
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

              {/* Bank Selector Slide-up Sheet */}
              <AnimatePresence>
                {showBankSelector && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-ink/40 z-30 backdrop-blur-[2px]"
                      onClick={() => setShowBankSelector(false)}
                    />
                    <motion.div 
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="absolute bottom-0 left-0 right-0 h-[70%] bg-surface rounded-t-[32px] z-40 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-hairline"
                    >
                      <div className="flex justify-center pt-3 pb-4">
                        <div className="w-12 h-1.5 bg-slate/20 rounded-full"></div>
                      </div>
                      <div className="px-6 pb-2">
                        <h3 className="font-bold text-xl text-ink">Select Bank</h3>
                      </div>
                      <div className="flex-1 overflow-y-auto px-4 pb-6">
                        {BANKS.map(bank => (
                          <button
                            key={bank}
                            onClick={() => {
                              setSelectedBank(bank);
                              setShowBankSelector(false);
                              setTimeout(() => inputRef.current?.focus(), 100);
                            }}
                            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-app-surface transition-colors text-left"
                          >
                            <span className="font-semibold text-ink text-[16px]">{bank}</span>
                            {selectedBank === bank && <Check className="w-5 h-5 text-trust-high" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
