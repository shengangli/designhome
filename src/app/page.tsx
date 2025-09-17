import Hero from '@/components/Hero';
import ThreePillars from '@/components/ThreePillars';
import PortfolioPreview from '@/components/PortfolioPreview';
import PricingPlans from '@/components/PricingPlans';
import PricingCalculator from '@/components/PricingCalculator';

export default function Home() {
  return (
    <main>
      <Hero />
      <PortfolioPreview />
      <ThreePillars />
      <PricingPlans />
      <PricingCalculator />
    </main>
  );
}
