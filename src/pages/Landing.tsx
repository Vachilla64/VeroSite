import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';

export default function Landing() {
  // Hero owns its own top offset (pt-32); adding pt-24 here stacked
  // 224px of dead space under the fixed navbar.
  return (
    <div className="pb-16 overflow-hidden">
      <Hero />
      <Features />
      <SocialProof />
    </div>
  );
}
