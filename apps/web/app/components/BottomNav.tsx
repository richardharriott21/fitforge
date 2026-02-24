'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-100 pb-[max(2rem,env(safe-area-inset-bottom))] z-50 shadow-nav">
      <div className="relative w-full h-[70px]">
        
        <div className="flex items-end justify-between w-full h-full px-2">
          {/* Left Tabs */}
          <div className="flex-1 flex justify-around pb-2">
            <Link href="/" className={`flex flex-col items-center gap-1 w-16 ${isActive('/') ? 'text-brand-500' : 'text-slate-400 hover:text-slate-600 transition-colors'}`}>
              <i className={`${isActive('/') ? 'ph-fill' : 'ph'} ph-house text-2xl`}></i>
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/goals" className={`flex flex-col items-center gap-1 w-16 ${isActive('/goals') ? 'text-brand-500' : 'text-slate-400 hover:text-slate-600 transition-colors'}`}>
              <i className={`${isActive('/goals') ? 'ph-fill' : 'ph'} ph-target text-2xl`}></i>
              <span className="text-[10px] font-medium">Goals</span>
            </Link>
          </div>

          {/* Center Spacer for FAB */}
          <div className="w-20"></div>

          {/* Right Tabs */}
          <div className="flex-1 flex justify-around pb-2">
            <Link href="/progress" className={`flex flex-col items-center gap-1 w-16 ${isActive('/progress') ? 'text-brand-500' : 'text-slate-400 hover:text-slate-600 transition-colors'}`}>
              <i className={`${isActive('/progress') ? 'ph-fill' : 'ph'} ph-chart-bar text-2xl`}></i>
              <span className="text-[10px] font-medium">Progress</span>
            </Link>
            <Link href="/tips" className={`flex flex-col items-center gap-1 w-16 ${isActive('/tips') ? 'text-brand-500' : 'text-slate-400 hover:text-slate-600 transition-colors'}`}>
              <i className={`${isActive('/tips') ? 'ph-fill' : 'ph'} ph-article text-2xl`}></i>
              <span className="text-[10px] font-medium">Tips</span>
            </Link>
          </div>
        </div>

        {/* Floating Action Button (Start Workout) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <Link href="/start-workout" className="w-16 h-16 rounded-full bg-brand-500 text-white shadow-glow flex items-center justify-center border-4 border-white active:scale-95 transition-transform duration-200 group">
            <i className="ph-fill ph-play text-2xl ml-1 group-hover:scale-110 transition-transform"></i>
          </Link>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-brand-500 whitespace-nowrap pt-1">Start</span>
        </div>

      </div>
    </nav>
  );
}
