'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Landing Page Plan',
    price: '$300',
    popular: false,
    features: [
      { name: 'Design + Development', value: '1-page Landing Page', included: true },
      { name: 'Revisions', value: '2 revisions', included: true },
      { name: 'Domain Setup', value: '1 × .com domain included (1st year)', included: true },
      { name: 'Email Setup', value: '–', included: false },
      { name: 'Deployment', value: 'Optimized global hosting (Vercel)', included: true },
      { name: 'Maintenance', value: '$20 USD/month (optional)', included: true },
      { name: 'Performance', value: 'Fast load, SSL secured', included: true },
      { name: 'Reliability', value: '99.9% uptime', included: true },
      { name: 'Security', value: 'HTTPS/SSL included', included: true },
      { name: 'Post-Delivery Support', value: '–', included: false },
      { name: 'Extra Features', value: '–', included: false }
    ]
  },
  {
    name: 'Core Website Plan',
    price: '$800',
    popular: true,
    features: [
      { name: 'Design + Development', value: 'Up to 5-page Website', included: true },
      { name: 'Revisions', value: '3 revisions', included: true },
      { name: 'Domain Setup', value: '1 × .com domain included (1st year, .jp extra cost)', included: true },
      { name: 'Email Setup', value: 'Add-on cost', included: 'addon' },
      { name: 'Deployment', value: 'Optimized global hosting (Vercel)', included: true },
      { name: 'Maintenance', value: '$20 USD/month (optional)', included: true },
      { name: 'Performance', value: 'Fast load, SSL secured', included: true },
      { name: 'Reliability', value: '99.9% uptime', included: true },
      { name: 'Security', value: 'HTTPS/SSL + DDoS protection', included: true },
      { name: 'Post-Delivery Support', value: '1 month included', included: true },
      { name: 'Extra Features', value: 'Basic SEO + Google Analytics setup', included: true }
    ]
  },
  {
    name: 'Pro Plan',
    price: '$1,500',
    popular: false,
    features: [
      { name: 'Design + Development', value: 'Custom Website or Web App', included: true },
      { name: 'Revisions', value: '5 revisions', included: true },
      { name: 'Domain Setup', value: '1 × domain (any type, .jp/.cn separately billed)', included: true },
      { name: 'Email Setup', value: 'Add-on cost', included: 'addon' },
      { name: 'Deployment', value: 'Optimized global hosting (Vercel)', included: true },
      { name: 'Maintenance', value: '$20 USD/month (extra for custom infra)', included: true },
      { name: 'Performance', value: 'Fast load, SSL secured', included: true },
      { name: 'Reliability', value: '99.9% uptime', included: true },
      { name: 'Security', value: 'HTTPS/SSL + DDoS protection + WAF', included: true },
      { name: 'Post-Delivery Support', value: '3 months included', included: true },
      { name: 'Extra Features', value: 'Full SEO + Analytics + Multi-language support', included: true }
    ]
  }
];

export default function PricingPlans() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  return (
    <section className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">Pricing</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-black leading-tight">
            Choose Your Package
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Fixed pricing for standard projects. Need something specific? Use our calculator below for custom pricing.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-black/20 shadow-md'
                  : 'border-white/10'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-light text-black mb-1">
                  {plan.price}
                  <span className="text-base text-gray-600"> USD</span>
                </div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      {feature.included === true ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.included === 'addon' ? (
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{feature.name}:</span>{' '}
                        <span className={feature.included ? 'text-gray-600' : 'text-gray-400'}>
                          {feature.value}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                onClick={() => {
                  router.push('/contact');
                }}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-6">
            <button
              onClick={() => {
                const calculatorSection = document.querySelector('#calculator-section');
                if (calculatorSection) {
                  calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-black font-medium hover:underline transition-all"
            >
              Need custom pricing?
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-sm text-gray-600 mt-1">
              Use our calculator below for a personalized quote
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            * Other hosting providers (AWS, Aliyun, etc.) require additional setup fees
          </p>
          <p className="text-sm text-gray-600">
            * Maintenance includes updates, monitoring, and technical support
          </p>
        </motion.div>
      </div>
    </section>
  );
}