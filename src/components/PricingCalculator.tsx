'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface FormData {
  projectType: string;
  services: string[];
  languages: string;
  timeline: string;
  hosting: string;
  domain: string;
  emailService: string;
  addons: string[];
  email: string;
  name: string;
  message: string;
}

const projectTypes = [
  { id: 'landing', label: 'Landing Page (Great for marketing)', basePrice: 70 },
  { id: 'website', label: 'Multi-page Website (Best at collecting leads and building PR)', basePrice: 150 },
  { id: 'webapp', label: 'Web App with DB/CMS', basePrice: 700 }
];

const services = [
  { id: 'design', label: 'Design', multiplier: 1.2 },
  { id: 'development', label: '+ Development: (Most popular)', multiplier: 1.5 },
  { id: 'deploy', label: '+ Deploy with SEO & Hosting (Monthly fee applies separartely', multiplier: 1.6 }
];

const languages = [
  { id: 'single', label: 'Single Language Only', multiplier: 1.0 },
  { id: 'double', label: 'Multi-language (2)', multiplier: 1.6 },
  { id: 'three+', label: 'Multi-language (3+)', multiplier: 1.8 }
];

const timelines = [
  { id: 'rush', label: 'Under 1 week (Rush)', multiplier: 1.8 },
  { id: 'standard', label: '1-4 weeks (Standard)', multiplier: 1.0 }
];

const hostingOptions = [
  { id: 'vercel', label: 'Under Dustin Hosting (Recommended)', price: 0, description: 'Free tier, fast global CDN (Maintainance cost apply after release' },
  { id: 'aws-aliyun', label: 'AWS EC2', price: 100, description: 'Set up cost for dedicated instance' },
  { id: 'custom', label: 'Your own hosting (Custom plan)', price: 100, description: 'Setup fee $100, we deploy to your server' }
];

const domainOptions = [
  { id: 'com', label: '.com domain', price: 0, description: 'We will give you a free domain' },
  { id: 'others', label: 'Other domains (.io, .ai, etc)', price: 0, description: 'Premium domains, prices vary' },
  { id: 'existing', label: 'I have my own domain', price: 0, description: 'We\'ll configure your existing domain' }
];

const emailServices = [
  { id: 'none', label: 'No email needed (I will set up by myself', price: 0 },
  { id: 'basic', label: 'Basic email', price: 25, description: 'Set up email for you' }
];

const additionalAddons = [
  { id: 'monitoring', label: 'Performance Monitoring', price: 30, description: 'Real-time alerts & analytics' },
  { id: 'backup', label: 'Automated Backups', price: 20, description: 'Daily backups with 30-day retention' },
  { id: 'cdn', label: 'Premium CDN', price: 40, description: 'Enhanced global content delivery' },
  { id: 'seo', label: 'Advanced SEO Package', price: 150, description: 'Schema markup, sitemap, optimization' },
  { id: 'analytics', label: 'Custom Analytics Dashboard', price: 100, description: 'Detailed user behavior tracking' },
  { id: 'multilang', label: 'Translation Services', price: 200, description: 'Professional content translation' }
];

export default function PricingCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    services: [],
    languages: '',
    timeline: '',
    hosting: '',
    domain: '',
    emailService: '',
    addons: [],
    email: '',
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const calculatePrice = () => {
    if (!formData.projectType || formData.services.length === 0 || !formData.languages || !formData.timeline) {
      return 0;
    }

    const basePrice = projectTypes.find(p => p.id === formData.projectType)?.basePrice || 0;
    const serviceMultiplier = formData.services.reduce((acc, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return acc + (service?.multiplier || 0);
    }, 0);
    const languageMultiplier = languages.find(l => l.id === formData.languages)?.multiplier || 1;
    const timelineMultiplier = timelines.find(t => t.id === formData.timeline)?.multiplier || 1;

    let total = Math.round(basePrice * serviceMultiplier * languageMultiplier * timelineMultiplier);

    // Add hosting price
    const hostingPrice = hostingOptions.find(h => h.id === formData.hosting)?.price || 0;
    total += hostingPrice;

    // Add domain price
    const domainPrice = domainOptions.find(d => d.id === formData.domain)?.price || 0;
    total += domainPrice;

    // Add email service price
    const emailPrice = emailServices.find(e => e.id === formData.emailService)?.price || 0;
    total += emailPrice;

    // Add addon prices
    const addonPrices = formData.addons.reduce((acc, addonId) => {
      const addon = additionalAddons.find(a => a.id === addonId);
      return acc + (addon?.price || 0);
    }, 0);
    total += addonPrices;

    return total;
  };

  const handleSubmitEmail = async () => {
    if (!formData.email) return;
    
    setIsSubmitting(true);
    try {
      const price = calculatePrice();
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message,
          projectType: projectTypes.find(p => p.id === formData.projectType)?.label,
          services: formData.services.map(s => services.find(srv => srv.id === s)?.label),
          languages: languages.find(lang => lang.id === formData.languages)?.label,
          timeline: timelines.find(t => t.id === formData.timeline)?.label,
          hosting: hostingOptions.find(h => h.id === formData.hosting)?.label,
          domain: domainOptions.find(d => d.id === formData.domain)?.label,
          emailService: emailServices.find(e => e.id === formData.emailService)?.label,
          addons: formData.addons.map(a => additionalAddons.find(addon => addon.id === a)?.label),
          estimatedPrice: price
        })
      });

      if (response.ok) {
        setShowResults(true);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.projectType !== '';
      case 2: return formData.services.length > 0;
      case 3: return formData.languages !== '';
      case 4: return formData.timeline !== '';
      case 5: return formData.hosting !== '';
      case 6: return formData.domain !== '';
      case 7: return formData.emailService !== '';
      case 8: return true; // Addons are optional
      case 9: return formData.email !== '' && formData.name !== '';
      default: return false;
    }
  };

  if (showResults) {
    return (
      <section className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden" ref={ref}>
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-green-100 to-blue-100 rounded-full blur-3xl transform -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full blur-3xl transform translate-y-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-md">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-light mb-4 text-gray-900">Quote Sent Successfully!</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Your personalized quote has been sent to <strong>{formData.email}</strong>. 
                We&apos;ll be in touch within 24 hours to discuss your project in detail.
              </p>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                  setFormData({
                    projectType: '',
                    services: [],
                    languages: '',
                    timeline: '',
                    hosting: '',
                    domain: '',
                    emailService: '',
                    addons: [],
                    email: '',
                    name: '',
                    message: ''
                  });
                }}
                className="inline-flex items-center px-6 py-3 bg-black/90 backdrop-blur-sm text-white hover:bg-black transition-all duration-300 font-medium rounded-full border border-black/20 hover:border-black/40 shadow-lg hover:shadow-xl"
              >
                Calculate Another Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator-section" className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">Custom Quote</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-black leading-tight">
            Need Something Specific?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our packages don't fit your needs? Use our calculator to get a customized quote
            based on your specific requirements. Prices may vary lower depending on your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto py-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-black/90 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 9 && (
                    <div className={`h-[2px] w-8 sm:w-12 mx-1 transition-all duration-300 ${
                      step < currentStep ? 'bg-black/90' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">What type of project do you need?</h3>
                <div className="grid gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.projectType === type.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{type.label}</h4>
                          <p className="text-sm text-gray-600">Starting from ${type.basePrice.toLocaleString()}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.projectType === type.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Services */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Which services do you need?</h3>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        const newServices = formData.services.includes(service.id)
                          ? formData.services.filter(s => s !== service.id)
                          : [...formData.services, service.id];
                        setFormData({ ...formData, services: newServices });
                      }}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.services.includes(service.id)
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{service.label}</h4>
                          <p className="text-sm text-gray-600">+{Math.round((service.multiplier - 1) * 100)}% of base price</p>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 ${
                          formData.services.includes(service.id)
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Languages */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Language support needed?</h3>
                <div className="grid gap-4">
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => setFormData({ ...formData, languages: language.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.languages === language.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{language.label}</h4>
                          <p className="text-sm text-gray-600">+{Math.round((language.multiplier - 1) * 100)}% multiplier</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.languages === language.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">What&apos;s your preferred timeline?</h3>
                <div className="grid gap-4">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline.id}
                      onClick={() => setFormData({ ...formData, timeline: timeline.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.timeline === timeline.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{timeline.label}</h4>
                          <p className="text-sm text-gray-600">{timeline.multiplier > 1 ? '+' : ''}{Math.round((timeline.multiplier - 1) * 100)}% price adjustment</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.timeline === timeline.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Hosting */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Choose your hosting solution</h3>
                <div className="grid gap-4">
                  {hostingOptions.map((hosting) => (
                    <button
                      key={hosting.id}
                      onClick={() => setFormData({ ...formData, hosting: hosting.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.hosting === hosting.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{hosting.label}</h4>
                          <p className="text-sm text-gray-600">{hosting.description}</p>
                          {hosting.price > 0 && (
                            <p className="text-sm font-medium text-gray-700 mt-1">+${hosting.price}</p>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.hosting === hosting.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6: Domain */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Select your domain type</h3>
                <div className="grid gap-4">
                  {domainOptions.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setFormData({ ...formData, domain: domain.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.domain === domain.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{domain.label}</h4>
                          <p className="text-sm text-gray-600">{domain.description}</p>
                          {domain.price > 0 && (
                            <p className="text-sm font-medium text-gray-700 mt-1">+${domain.price}</p>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.domain === domain.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 7: Email Service */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Do you need email services?</h3>
                <div className="grid gap-4">
                  {emailServices.map((email) => (
                    <button
                      key={email.id}
                      onClick={() => setFormData({ ...formData, emailService: email.id })}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.emailService === email.id
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{email.label}</h4>
                          {email.description && (
                            <p className="text-sm text-gray-600">{email.description}</p>
                          )}
                          {email.price > 0 && (
                            <p className="text-sm font-medium text-gray-700 mt-1">+${email.price}</p>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.emailService === email.id
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 8: Additional Add-ons */}
            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-light mb-6 text-gray-900">Select additional services (optional)</h3>
                <div className="grid gap-4">
                  {additionalAddons.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => {
                        const newAddons = formData.addons.includes(addon.id)
                          ? formData.addons.filter(a => a !== addon.id)
                          : [...formData.addons, addon.id];
                        setFormData({ ...formData, addons: newAddons });
                      }}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                        formData.addons.includes(addon.id)
                          ? 'bg-black/10 border-black/20 shadow-md'
                          : 'bg-gray-100/80 border-gray-200/50 hover:bg-gray-200/90 hover:border-gray-300/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{addon.label}</h4>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                          <p className="text-sm font-medium text-gray-700 mt-1">+${addon.price}</p>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 ${
                          formData.addons.includes(addon.id)
                            ? 'bg-black border-black'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 9: Email & Results */}
            {currentStep === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light mb-3 text-gray-900">Your Estimated Price</h3>               
                  <div className="text-4xl font-light text-black mb-6">
                    ${calculatePrice().toLocaleString()}
                    <h5 className="text-sm text-gray-600 mt-2">* Custom pricing - may be lower based on specific requirements</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Enter your email to discuss your specific requirements and get a final quote
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-gray-700 w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all duration-300 text-center text-base"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-gray-700 w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all duration-300 text-center text-base"
                  />
                  <textarea
                    placeholder="Tell us more about your project... (optional)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="text-gray-700 w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all duration-300 text-base resize-none"
                  />
                  <button
                    onClick={handleSubmitEmail}
                    disabled={!formData.email || !formData.name || isSubmitting}
                    className="w-full px-4 py-3 bg-black/90 backdrop-blur-sm text-white rounded-full hover:bg-black transition-all duration-300 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Lead...' : 'Send Enquiry'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === 9 || !isStepValid(currentStep)}
                className="px-4 py-2 bg-black/10 hover:bg-black/20 text-gray-900 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 8 ? 'View Quote' : 'Next'} →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}