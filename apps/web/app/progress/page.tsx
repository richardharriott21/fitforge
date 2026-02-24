'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function ProgressPage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] relative min-h-screen pb-32">
          {/* Header */}
    <header className="flex items-center justify-between px-6 mb-6">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-0.5">Statistics</p>
            <h1 className="text-3xl font-display font-bold text-dark-900">Your Progress</h1>
        </div>
        <button onClick={() => router.push('/share-stats')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark-900 shadow-sm border border-slate-100 active:scale-95 transition-transform">
            <i className="ph ph-share-network text-xl"></i>
        </button>
    </header>

    <main className="w-full">
        {/* Weekly Calendar Strip */}
        <section className="px-6 mb-8">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-soft border border-slate-100">
                {/* Days */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">M</span>
                    <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center text-xs font-bold"><i className="ph-fill ph-check"></i></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">T</span>
                    <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center text-xs font-bold"><i className="ph-fill ph-check"></i></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">W</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">-</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-brand-500 font-bold">T</span>
                    <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold shadow-glow">14</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">F</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center text-xs font-bold">15</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">S</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center text-xs font-bold">16</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">S</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center text-xs font-bold">17</div>
                </div>
            </div>
        </section>

        {/* Activity Chart Card */}
        <section className="px-6 mb-6">
            <div className="bg-dark-900 p-6 rounded-[32px] shadow-lg text-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h2 className="text-lg font-display font-bold">Activity Level</h2>
                        <p className="text-sm text-slate-400">This week</p>
                    </div>
                    <div className="flex items-center gap-2 text-brand-500 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                        <i className="ph-fill ph-trend-up"></i>
                        <span className="text-xs font-bold">+12%</span>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end justify-between h-32 gap-3 relative z-10">
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '40%' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '65%', animationDelay: '0.1s' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '30%', animationDelay: '0.2s' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-brand-500 rounded-t-lg bar-anim shadow-[0_0_15px_rgba(255,85,51,0.5)]" style={{ height: '85%', animationDelay: '0.3s' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '45%', animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '20%', animationDelay: '0.5s' }}></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-t-lg relative h-full group">
                        <div className="absolute bottom-0 w-full bg-slate-600 rounded-t-lg bar-anim" style={{ height: '55%', animationDelay: '0.6s' }}></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Metrics Grid */}
        <section className="px-6 mb-8 grid grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                    <i className="ph-fill ph-drop text-xl"></i>
                </div>
                <div>
                    <span className="text-2xl font-display font-bold text-dark-900 block">1,240</span>
                    <span className="text-xs text-slate-400 font-medium">Kcal Burned</span>
                </div>
            </div>
            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                    <i className="ph-fill ph-timer text-xl"></i>
                </div>
                <div>
                    <span className="text-2xl font-display font-bold text-dark-900 block">4.5h</span>
                    <span className="text-xs text-slate-400 font-medium">Total Time</span>
                </div>
            </div>
        </section>

        {/* Recent History */}
        <section className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold text-dark-900">Recent History</h3>
                <button className="text-brand-500 text-sm font-medium">View All</button>
            </div>

            <div className="space-y-4">
                {/* History Item 1 */}
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <i className="ph-fill ph-barbell text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-dark-900 text-sm">Upper Body Power</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Today, 08:30 AM</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm font-bold text-brand-500">+320 kcal</span>
                        <span className="block text-xs text-slate-400">45 min</span>
                    </div>
                </div>

                {/* History Item 2 */}
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <i className="ph-fill ph-person-simple-run text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-dark-900 text-sm">Morning Cardio</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm font-bold text-brand-500">+210 kcal</span>
                        <span className="block text-xs text-slate-400">20 min</span>
                    </div>
                </div>

                {/* History Item 3 */}
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <i className="ph-fill ph-users-three text-2xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-dark-900 text-sm">Yoga Flow</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Tue, 12 Oct</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm font-bold text-brand-500">+120 kcal</span>
                        <span className="block text-xs text-slate-400">30 min</span>
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
