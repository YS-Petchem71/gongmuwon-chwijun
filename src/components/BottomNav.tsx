import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: '대시보드', icon: 'dashboard' },
    { id: 'tierlist', label: '티어표', icon: 'leaderboard' },
    { id: 'specAnalysis', label: '스펙 분석', icon: 'analytics' },
    { id: 'community', label: '커뮤니티', icon: 'group' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-[#e1e3e4] shadow-[0px_-8px_24px_rgba(0,0,0,0.08)] rounded-t-2xl flex justify-around items-center px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#003fb1] font-bold scale-100'
                  : 'text-[#737686] hover:text-[#191c1d] active:scale-95 font-medium'
              }`}
            >
              <div className="relative flex flex-col items-center">
                <span
                  className={`material-symbols-outlined text-[24px] mb-0.5 ${
                    isActive ? 'fill-1 text-[#003fb1]' : 'text-[#737686]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] leading-tight tracking-tight">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 bg-[#003fb1] rounded-full mt-1 animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Desktop Side Navigation Bar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-[#e1e3e4] p-4 gap-2 z-30 shadow-xs">
        <div className="text-xs font-bold text-[#737686] px-3 py-2 uppercase tracking-wider">
          주요 메뉴
        </div>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#dbe1ff] text-[#00174d] font-bold shadow-xs'
                  : 'text-[#434654] hover:bg-[#f3f4f5] hover:text-[#191c1d]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'fill-1 text-[#003fb1]' : 'text-[#737686]'
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#003fb1]" />
              )}
            </button>
          );
        })}

        <div className="mt-auto pt-4 border-t border-[#e1e3e4] space-y-2">
          <div className="bg-[#f3f4f5] p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#003fb1] mb-1">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span>합격 예측 리포트</span>
            </div>
            <p className="text-xs text-[#737686] leading-relaxed">
              서류 가점과 필기 커트라인을 분석하여 최적의 지원 전략을 세워보세요.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
