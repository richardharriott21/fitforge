'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function TipsPage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] relative min-h-screen pb-32">
          {/* Header */}
    <header className="flex items-center justify-between px-6 mb-6">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-0.5">Learn & Grow</p>
            <h1 className="text-3xl font-display font-bold text-dark-900">Tips & Insights</h1>
        </div>
        <button onClick={() => router.push('/saved-tips')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark-900 shadow-sm border border-slate-100 active:scale-95 transition-transform">
            <i className="ph ph-bookmark text-xl"></i>
        </button>
    </header>

    <main className="w-full">
        {/* Categories */}
        <section className="mb-8">
            <div className="flex items-center gap-3 px-6 overflow-x-auto no-scrollbar">
                {/* Active Chip */}
                <button className="px-5 py-2.5 bg-dark-900 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-md">
                    Recommended
                </button>
                {/* Inactive Chips */}
                <button className="px-5 py-2.5 bg-white text-slate-500 border border-slate-100 rounded-full text-sm font-medium whitespace-nowrap active:bg-slate-50">
                    Nutrition
                </button>
                <button className="px-5 py-2.5 bg-white text-slate-500 border border-slate-100 rounded-full text-sm font-medium whitespace-nowrap active:bg-slate-50">
                    Recovery
                </button>
                <button className="px-5 py-2.5 bg-white text-slate-500 border border-slate-100 rounded-full text-sm font-medium whitespace-nowrap active:bg-slate-50">
                    Mindset
                </button>
            </div>
        </section>

        {/* Featured Article */}
        <section className="px-6 mb-8">
            <div onClick={() => router.push('/article-detail')} className="relative w-full h-[360px] rounded-[32px] overflow-hidden shadow-soft group cursor-pointer active:scale-[0.99] transition-transform">
                <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Healthy Meal" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-5 left-5 bg-green-500/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-green-400/20">
                    <span className="text-xs text-white font-bold tracking-wide uppercase flex items-center gap-1">
                        <i className="ph-fill ph-carrot"></i> Nutrition
                    </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl text-white font-bold font-display leading-tight mb-3">Pre-Workout Fuel: <br />What to Eat?</h2>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">Maximize your energy levels with these 5 scientifically proven pre-workout snacks.</p>
                    
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                            <img alt="" src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white text-xs font-medium">Dr. Sarah Fit</span>
                        <span className="text-white/50 text-xs">•</span>
                        <span className="text-white/70 text-xs">5 min read</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Daily Tip Card (Small highlight) */}
        <section className="px-6 mb-8">
            <div className="bg-brand-50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 text-brand-100 rotate-12">
                    <i className="ph-fill ph-lightbulb text-[120px]"></i>
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-brand-600 font-bold text-sm uppercase tracking-wider mb-2">Did You Know?</h3>
                    <p className="text-dark-900 font-display font-bold text-xl leading-snug mb-3">
                        Drinking 500ml of water before meals can boost metabolism by 30%.
                    </p>
                    <button className="text-brand-500 font-bold text-sm flex items-center gap-1">
                        Read More <i className="ph-bold ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>

        {/* Recent Articles List */}
        <section className="px-6 space-y-5">
            <h3 className="text-lg font-display font-bold text-dark-900">Latest Updates</h3>

            {/* Article 1 */}
            <div onClick={() => router.push('/article-1')} className="bg-white p-3 pr-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Stretching" />
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-500 text-xs shadow-sm">
                        <i className="ph-fill ph-person-simple-tai-chi"></i>
                    </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Recovery</span>
                    <h4 className="font-bold text-dark-900 text-base leading-tight mt-1 mb-2">Why Rest Days Are Crucial for Muscle Growth</h4>
                    <span className="text-xs text-brand-500 font-medium">3 min read</span>
                </div>
            </div>

            {/* Article 2 */}
            <div onClick={() => router.push('/article-2')} className="bg-white p-3 pr-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1552674605-469455315056?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Weights" />
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-purple-500 text-xs shadow-sm">
                        <i className="ph-fill ph-brain"></i>
                    </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mindset</span>
                    <h4 className="font-bold text-dark-900 text-base leading-tight mt-1 mb-2">Overcoming the Plateau: Mental Strategies</h4>
                    <span className="text-xs text-brand-500 font-medium">6 min read</span>
                </div>
            </div>

            {/* Article 3 */}
            <div onClick={() => router.push('/article-3')} className="bg-white p-3 pr-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Gear" />
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-orange-500 text-xs shadow-sm">
                        <i className="ph-fill ph-sneaker"></i>
                    </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Gear</span>
                    <h4 className="font-bold text-dark-900 text-base leading-tight mt-1 mb-2">Best Running Shoes of 2024: A Review</h4>
                    <span className="text-xs text-brand-500 font-medium">4 min read</span>
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
