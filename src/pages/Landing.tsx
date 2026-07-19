import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';

export default function Landing() {
  return (
    <div className="pt-24 pb-16 overflow-hidden">
      <Hero />
      <Features />
      <SocialProof />
    </div>
  );
}
