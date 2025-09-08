import Hero from '@/components/Hero';
import ThreePillars from '@/components/ThreePillars';
import PortfolioPreview from '@/components/PortfolioPreview';
import PricingCalculator from '@/components/PricingCalculator';

export default function Home() {
  return (
    <main>
      <Hero />
      <ThreePillars />
      <PortfolioPreview />
      <PricingCalculator />
    </main>
  );
}
