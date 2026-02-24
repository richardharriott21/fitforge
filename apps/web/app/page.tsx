'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function HomePage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] relative min-h-screen pb-32">
          {/* Header */}
    <header className="flex items-center justify-between px-6 mb-6">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-0.5">Welcome back</p>
            <h1 className="text-2xl font-display font-bold text-dark-900">Let's crush it, Alex! 🔥</h1>
        </div>
        <button onClick={() => router.push('/profile')} className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        </button>
    </header>

    <main className="w-full">
        {/* Stats Overview */}
        <section className="px-6 mb-8">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                {/* Streak Card */}
                <div className="min-w-[100px] flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <div className="text-brand-500 mb-1">
                        <i className="ph-fill ph-fire text-2xl"></i>
                    </div>
                    <span className="text-2xl font-display font-bold">12</span>
                    <span className="text-xs text-slate-400 font-medium">Day Streak</span>
                </div>
                {/* Kcal Card */}
                <div className="min-w-[100px] flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <div className="text-blue-500 mb-1">
                        <i className="ph-fill ph-drop text-2xl"></i>
                    </div>
                    <span className="text-2xl font-display font-bold">840</span>
                    <span className="text-xs text-slate-400 font-medium">Kcal Burned</span>
                </div>
                {/* Time Card */}
                <div className="min-w-[100px] flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <div className="text-purple-500 mb-1">
                        <i className="ph-fill ph-clock text-2xl"></i>
                    </div>
                    <span className="text-2xl font-display font-bold">45</span>
                    <span className="text-xs text-slate-400 font-medium">Minutes</span>
                </div>
            </div>
        </section>

        {/* Premium Banner */}
        <section className="px-6 mb-8">
            <button 
                onClick={() => router.push('/premium')}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-6 flex items-center justify-between text-left shadow-lg active:scale-[0.98] transition-transform"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        <i className="ph-fill ph-crown text-2xl"></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Go Premium</h3>
                        <p className="text-sm text-white/90 mt-0.5">Unlock all features for $19.99/month</p>
                    </div>
                </div>
                <i className="ph ph-caret-right text-white text-xl"></i>
            </button>
        </section>

        {/* Hero: Daily Workout */}
        <section className="px-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-dark-900">Today's Pick</h2>
                <button className="text-brand-500 text-sm font-medium">View all</button>
            </div>
            <div onClick={() => router.push('/workout-detail')} className="relative w-full h-64 rounded-3xl overflow-hidden shadow-soft group cursor-pointer active:scale-95 transition-transform duration-200">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Workout" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs text-white font-medium flex items-center gap-1">
                        <i className="ph-fill ph-lightning"></i> High Intensity
                    </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl text-white font-bold font-display leading-tight mb-2">Full Body HIIT <br />Crusher</h3>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                        <span className="flex items-center gap-1.5"><i className="ph ph-clock"></i> 30 min</span>
                        <span className="flex items-center gap-1.5"><i className="ph ph-barbell"></i> Intermediate</span>
                    </div>
                </div>
                
                <button className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-lg pulse-animation">
                    <i className="ph-fill ph-play text-xl ml-0.5"></i>
                </button>
            </div>
        </section>

        {/* Quick Actions Grid (Navigation) */}
        <section className="px-6 mb-8">
            <h2 className="text-lg font-display font-bold text-dark-900 mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Workout Plans */}
                <button onClick={() => router.push('/workout-plans')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                        <i className="ph-fill ph-calendar-check text-xl"></i>
                    </div>
                    <h4 className="font-bold text-dark-900">Workout Plans</h4>
                    <p className="text-xs text-slate-500 mt-1">4 Active Programs</p>
                </button>
                
                {/* Progress Tracker */}
                <button onClick={() => router.push('/progress')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                        <i className="ph-fill ph-chart-line-up text-xl"></i>
                    </div>
                    <h4 className="font-bold text-dark-900">Progress</h4>
                    <p className="text-xs text-slate-500 mt-1">Weekly Analysis</p>
                </button>
            </div>
            
            {/* Fitness Tips Full Width */}
            <button onClick={() => router.push('/tips')} className="w-full mt-4 bg-slate-900 rounded-3xl p-5 flex items-center justify-between text-left shadow-lg shadow-slate-200 active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <i className="ph-fill ph-lightbulb text-xl"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Fitness Tips & Hacks</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Boost your recovery today</p>
                    </div>
                </div>
                <i className="ph ph-caret-right text-slate-400"></i>
            </button>
        </section>

        {/* Spacer for nav */}
        <div className="h-8"></div>
    </main>

    {/* Bottom Navigation */}
    

    {/* Simple Noise Overlay for texture */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" 
         style={{ backgroundImage: 'url(\'https://grainy-gradients.vercel.app/noise.svg\')' }}>
    </div>
        </div>
      <BottomNav />
      </>
    );
}
