'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function StartWorkoutPage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] relative min-h-screen pb-32">
          {/* Header */}
    <header className="flex items-center justify-between px-6 mb-6">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-0.5">Let's do this</p>
            <h1 className="text-3xl font-display font-bold text-dark-900">Session Setup</h1>
        </div>
        <button onClick={() => router.push('/settings')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark-900 shadow-sm border border-slate-100 active:scale-95 transition-transform">
            <i className="ph ph-gear text-xl"></i>
        </button>
    </header>

    <main className="w-full">
        {/* Selected Workout Hero Card */}
        <section className="px-6 mb-8">
            <div className="bg-dark-900 rounded-[32px] p-1 shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Workout Background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-5 pt-8 pb-6">
                    <div className="flex justify-between items-start mb-16">
                        <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Selected
                        </span>
                        <div className="flex gap-2">
                             <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                                <i className="ph-fill ph-music-notes"></i>
                             </button>
                             <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                                <i className="ph-fill ph-speaker-high"></i>
                             </button>
                        </div>
                    </div>

                    <h2 className="text-3xl text-white font-display font-bold mb-2">High Intensity <br />Interval Training</h2>
                    <p className="text-slate-300 text-sm mb-6">Equipment: Dumbbells, Mat</p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-400 uppercase tracking-wide">Duration</span>
                            <span className="text-xl font-bold text-white font-display">45:00</span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-400 uppercase tracking-wide">Sets</span>
                            <span className="text-xl font-bold text-white font-display">4</span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-400 uppercase tracking-wide">Burn</span>
                            <span className="text-xl font-bold text-brand-500 font-display">420</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Big Start Button (Primary Call to Action) */}
        <section className="px-6 mb-8">
            <button onClick={() => router.push('/active-session')} className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-[28px] py-5 shadow-glow flex items-center justify-between px-8 group active:scale-[0.98] transition-all">
                <span className="text-xl font-bold font-display">Start Session</span>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i className="ph-fill ph-arrow-right text-xl"></i>
                </div>
            </button>
        </section>

        {/* Exercise Queue */}
        <section className="px-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-dark-900">Up Next (12)</h3>
                <button className="text-sm text-slate-400 flex items-center gap-1">
                    Edit <i className="ph ph-pencil-simple"></i>
                </button>
            </div>

            {/* List Item 1 (Warmup) */}
            <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-sm z-10"></div>
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 ml-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-2xl">
                        <i className="ph-fill ph-person-simple-walk"></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Warm Up</span>
                        <h4 className="font-bold text-dark-900">Jumping Jacks</h4>
                        <span className="text-xs text-brand-500 font-medium">2:00 mins</span>
                    </div>
                    <button className="ml-auto w-8 h-8 flex items-center justify-center text-slate-300">
                        <i className="ph ph-info text-xl"></i>
                    </button>
                </div>
            </div>

            {/* List Item 2 */}
            <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[7px] top-6 w-3 h-3 rounded-full bg-slate-300 border-2 border-white z-10"></div>
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 ml-4 opacity-80">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-2xl">
                        <i className="ph-fill ph-person-simple-throw"></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Set 1</span>
                        <h4 className="font-bold text-dark-900">Push Ups</h4>
                        <span className="text-xs text-slate-500 font-medium">15 Reps</span>
                    </div>
                </div>
            </div>

            {/* List Item 3 */}
            <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[7px] top-6 w-3 h-3 rounded-full bg-slate-300 border-2 border-white z-10"></div>
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 ml-4 opacity-60">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-2xl">
                        <i className="ph-fill ph-arrows-out-line-horizontal"></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Set 1</span>
                        <h4 className="font-bold text-dark-900">Plank Hold</h4>
                        <span className="text-xs text-slate-500 font-medium">45 secs</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Spacer */}
        <div className="h-10"></div>
    </main>

    {/* Bottom Navigation */}
    

    {/* Noise Overlay */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" 
         style={{ backgroundImage: 'url(\'https://grainy-gradients.vercel.app/noise.svg\')' }}>
    </div>
        </div>
      <BottomNav />
      </>
    );
}
