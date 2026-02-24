'use client';

import { useRouter } from 'next/navigation';
import { Crown, Dumbbell, TrendingUp, Award, Sparkles, CheckCircle } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();

  const features = [
    { icon: Dumbbell, title: 'Unlimited Custom Workouts', description: 'Create as many workout plans as you need' },
    { icon: TrendingUp, title: 'Advanced Progress Tracking', description: 'Detailed analytics and insights' },
    { icon: Award, title: 'Exclusive Content', description: 'Access premium workout tips and guides' },
    { icon: Sparkles, title: 'Priority Support', description: 'Get help from our fitness experts' },
  ];

  const handleUpgrade = () => {
    router.push('/checkout?amount=19.99&description=Premium%20Monthly%20Subscription');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mb-4 shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Go Premium
          </h1>
          <p className="text-gray-600 text-lg">
            Unlock your full fitness potential
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-4 border-amber-400">
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">$19</span>
              <span className="text-2xl text-gray-600">.99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-amber-600 font-semibold">Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <Crown className="w-6 h-6" />
            Upgrade Now
          </button>
        </div>

        {/* Additional Benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            What's Included
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Unlimited workout plan creation and customization</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Detailed progress tracking with charts and insights</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Access to exclusive premium workout routines</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Ad-free experience across the entire app</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Priority customer support from fitness experts</span>
            </li>
          </ul>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Subscription automatically renews unless cancelled 24 hours before the end of the current period.
        </p>
      </div>
    </div>
  );
}
