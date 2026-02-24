'use client';

import { useState } from 'react';
import { redirectToCheckout, redirectToBillingPortal } from '@/lib/payments/stripe';

export default function Paywall() {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);
        
        const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '';
        
        if (!priceId) {
            console.error('Stripe Price ID not configured');
            alert('Payment system not configured. Please contact support.');
            setIsProcessing(false);
            return;
        }

        const { error } = await redirectToCheckout({
            priceId,
            successUrl: window.location.origin + '/payment/success',
            cancelUrl: window.location.origin + '/payment/cancel',
        });

        if (error) {
            console.error('Checkout error:', error);
            alert(error);
            setIsProcessing(false);
        }
    };

    const handleRestore = async () => {
        setIsProcessing(true);
        
        const { error } = await redirectToBillingPortal();

        if (error) {
            console.error('Billing portal error:', error);
            alert(error);
            setIsProcessing(false);
        }
    };

    return (
      <div className="fixed inset-0 z-[100] flex flex-col  overflow-y-auto" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="pt-[55px] relative min-h-screen flex flex-col justify-between">
          {/* Background Noise Texture */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" 
         style={{ backgroundImage: 'url(\'https://grainy-gradients.vercel.app/noise.svg\')' }}>
    </div>

    {/* Top Section: Visual & Value Prop */}
    <div className="flex-1 flex flex-col">
        
        {/* Hero Image Container with Curved Bottom */}
        <div className="relative w-full h-[40vh] -mt-[55px] rounded-b-4xl overflow-hidden shadow-soft z-10">
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Home Workout" 
                 className="w-full h-full object-cover" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Restore Button (Top Right) */}
            <button 
                onClick={handleRestore}
                disabled={isProcessing}
                className="absolute top-[60px] right-6 text-white/80 text-sm font-medium hover:text-white transition-colors z-20 disabled:opacity-50"
            >
                Restore
            </button>

            {/* Social Proof Badge Over Image */}
            <div className="absolute bottom-8 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mb-3">
                    <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                        <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                        <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User" />
                    </div>
                    <span className="text-xs text-white font-medium">Join 50k+ active members</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-white leading-tight">
                    Achieve your dream body <br /><span className="text-brand-400">from home.</span>
                </h1>
            </div>
        </div>

        {/* Features List */}
        <div className="px-6 mt-8 space-y-5 z-10">
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                    <i className="ph-fill ph-barbell-slash text-xl"></i>
                </div>
                <div>
                    <h3 className="text-dark-900 font-bold text-base">No Equipment Needed</h3>
                    <p className="text-slate-500 text-sm leading-tight">Effective bodyweight workouts for any space.</p>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                    <i className="ph-fill ph-video text-xl"></i>
                </div>
                <div>
                    <h3 className="text-dark-900 font-bold text-base">HD Video Coaching</h3>
                    <p className="text-slate-500 text-sm leading-tight">Follow-along guides with form correction.</p>
                </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                    <i className="ph-fill ph-chart-line-up text-xl"></i>
                </div>
                <div>
                    <h3 className="text-dark-900 font-bold text-base">Track Your Transformation</h3>
                    <p className="text-slate-500 text-sm leading-tight">Visualize progress with advanced analytics.</p>
                </div>
            </div>
        </div>
    </div>

    {/* Bottom Section: Pricing & CTA */}
    <div className="px-6 pt-6 pb-2 z-10">
        
        {/* Pricing Card (Single Option - Hard Paywall) */}
        <div className="relative w-full bg-white rounded-3xl p-5 shadow-card-selected border border-brand-100 mb-6 cursor-pointer">
            {/* Best Value Badge */}
            <div className="absolute -top-3 right-5 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-glow uppercase tracking-wide">
                Best Value
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Custom Radio Button (Selected) */}
                    <div className="w-6 h-6 rounded-full border-2 border-brand-500 bg-brand-500 flex items-center justify-center">
                        <i className="ph-bold ph-check text-white text-sm"></i>
                    </div>
                    <div>
                        <h4 className="text-lg font-display font-bold text-dark-900">Lifetime Access</h4>
                        <p className="text-xs text-slate-500 font-medium">One-time payment. No subscriptions.</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-slate-400 line-through decoration-slate-400">$59.99</span>
                    <span className="block text-xl font-display font-bold text-brand-500">$19.99</span>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <button 
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full bg-dark-900 text-white font-bold text-lg py-4 rounded-3xl shadow-lg shadow-slate-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span>{isProcessing ? 'Processing...' : 'Unlock Forever'}</span>
            {!isProcessing && <i className="ph-bold ph-arrow-right"></i>}
        </button>

        {/* Secure Payment / Trust */}
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium uppercase tracking-wide">
                <i className="ph-fill ph-lock-key"></i>
                Secured with Apple Pay
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-[10px] text-slate-400">
                <a href="#" className="hover:text-slate-600">Terms of Service</a>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            </div>
        </div>
    </div>
        </div>
      </div>
    );
}