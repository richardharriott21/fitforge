'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Check, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const amount = parseFloat(searchParams.get('amount') || '19.99');
  const description = searchParams.get('description') || 'Premium Workout Plan';

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // For demo purposes, simulate a successful payment
      // In production, you'd use Stripe Elements to collect payment details
      setTimeout(async () => {
        // Save payment to database
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'usd',
            status: 'succeeded',
            paymentIntentId: clientSecret?.split('_secret_')[0],
            userId: 'default-user',
          }),
        });

        setSuccess(true);
        setLoading(false);

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }, 1500);

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-gray-600 mb-2">Your purchase has been completed.</p>
          <p className="text-2xl font-bold text-green-600 mb-4">${amount.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6">
          <CreditCard className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Checkout
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Complete your purchase
        </p>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 font-medium">Item</span>
            <span className="text-gray-900 font-semibold">{description}</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700">Total Amount</span>
            <span className="text-3xl font-bold text-blue-600">${amount.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay ${amount.toFixed(2)}
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Secure payment powered by Stripe
        </p>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-gray-600 py-3 font-medium hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
