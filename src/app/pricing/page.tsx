import PricingCalculator from '@/components/PricingCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | dustin studio',
  description: 'Get an instant estimate for your project. Answer a few questions to receive a personalized quote delivered to your inbox.',
};

export default function PricingPage() {
  return (
    <main>
      <PricingCalculator />
    </main>
  );
}