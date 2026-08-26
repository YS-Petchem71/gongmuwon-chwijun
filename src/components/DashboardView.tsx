import React from 'react';
import { Enterprise, UserSpecProfile, WeeklyRoutineItem } from '../types';

interface DashboardViewProps {
  userProfile: UserSpecProfile;
  enterprises: Enterprise[];
  weeklyRoutine: WeeklyRoutineItem[];
  onToggleRoutine: (id: string) => void;
  onSelectEnterprise: (enterprise: Enterprise) => void;
  onNavigateToTab: (tab: 'tierlist' | 'specAnalysis' | 'community') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  enterprises,
  weeklyRoutine,
  onToggleRoutine,
  onSelectEnterprise,
  onNavigateToTab,
}) => {
  const completedCount = weeklyRoutine.filter((r) => r.completed).length;
  const routineProgress = weeklyRoutine.length > 0
    ? Math.round((completedCount / weeklyRoutine.length) * 100)
    : 0;

  const urgentEnterprises = enterprises.filter((e) => e.dDay <= 14);
  const bookmarkedEnterprises = enterprises.filter((e) => e.isBookmarked);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* User Welcome Section */}
      <section className="bg-white rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e3e4]">
        <div className="absolute right-0 top-0 w-48 h-48 bg-[#dbe1ff] rounded-full blur-3xl opacity-40 -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-1.5">
          <p className="text-sm md:text-base text-[#434654] font-medium">
            안녕하세요, {userProfile.name}님
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-[#191c1d] leading-snug">
            오늘 지원 가능한 <span className="text-[#003fb1] underline decoration-[#86f2e4] decoration-4 underline-offset-4 font-extrabold">공공기관 24곳</span>이 있습니다!
          </h2>
          <p className="text-xs md:text-sm text-[#737686] mt-1">
            등록된 스펙 ({userProfile.major}, 학점 {userProfile.gpa}, TOEIC {userProfile.toeicScore}) 기준 매칭 분석
          </p>
        </div>
      </section>

      {/* Current Status Summary (Horizontal Scroll) */}
      <section className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold text-[#191c1d]">현재 현황 요약</h3>
          <button
            onClick={() => onNavigateToTab('tierlist')}
            className="text-xs text-[#003fb1] font-semibold hover:underline flex items-center gap-0.5"
          >
            전체 보기
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 snap-x">
          {/* Status Card 1 */}
          <div
            onClick={() => onNavigateToTab('tierlist')}
            className="bg-white rounded-xl p-4 min-w-[135px] md:min-w-[150px] flex-1 flex-shrink-0 snap-start flex flex-col items-center justify-center gap-2 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:border-[#003fb1] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#003fb1] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill-1 text-[22px]">work</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#737686] font-medium">진행중 채용</p>
              <p className="text-lg md:text-xl font-bold text-[#003fb1]">5건</p>
            </div>
          </div>

          {/* Status Card 2 */}
          <div
            onClick={() => onNavigateToTab('tierlist')}
            className="bg-white rounded-xl p-4 min-w-[135px] md:min-w-[150px] flex-1 flex-shrink-0 snap-start flex flex-col items-center justify-center gap-2 border border-[#ffdad6] shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:border-[#ba1a1a] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill-1 text-[22px]">timer</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#ba1a1a] font-medium">마감 임박</p>
              <p className="text-lg md:text-xl font-bold text-[#ba1a1a]">
                {urgentEnterprises.length}건
              </p>
            </div>
          </div>

          {/* Status Card 3 */}
          <div
            onClick={() => onNavigateToTab('tierlist')}
            className="bg-white rounded-xl p-4 min-w-[135px] md:min-w-[150px] flex-1 flex-shrink-0 snap-start flex flex-col items-center justify-center gap-2 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:border-[#006a61] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill-1 text-[22px]">bookmark</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#737686] font-medium">관심 기업</p>
              <p className="text-lg md:text-xl font-bold text-[#191c1d]">
                {bookmarkedEnterprises.length}건
              </p>
            </div>
          </div>

          {/* Status Card 4 */}
          <div
            onClick={() => {
              const kepco = enterprises.find((e) => e.id === 'kepco') || enterprises[0];
              onSelectEnterprise(kepco);
            }}
            className="bg-white rounded-xl p-4 min-w-[135px] md:min-w-[150px] flex-1 flex-shrink-0 snap-start flex flex-col items-center justify-center gap-2 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:border-[#ad3b00] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffd4c5] flex items-center justify-center text-[#ad3b00] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill-1 text-[22px]">forum</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#737686] font-medium">면접 준비</p>
              <p className="text-lg md:text-xl font-bold text-[#191c1d]">3건</p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Goal / Routine Section */}
      <section className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold text-[#191c1d]">이번 주 추천 준비 루틴</h3>
          <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-1 rounded-full">
            진행률 {routineProgress}%
          </span>
        </div>
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] space-y-2.5">
          {weeklyRoutine.map((item) => {
            return (
              <label
                key={item.id}
                className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-150 border ${
                  item.isToday
                    ? 'border-[#003fb1]/30 bg-[#f8f9fa] shadow-xs ring-1 ring-[#003fb1]/20'
                    : item.completed
                    ? 'border-transparent bg-[#f3f4f5]/60'
                    : 'border-transparent hover:bg-[#f3f4f5]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleRoutine(item.id)}
                  className="w-5 h-5 rounded border-[#737686] text-[#003fb1] focus:ring-[#003fb1] focus:ring-2 cursor-pointer accent-[#003fb1]"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span
                    className={`text-xs font-semibold ${
                      item.isToday
                        ? 'text-[#003fb1]'
                        : item.completed
                        ? 'text-[#737686] line-through opacity-70'
                        : 'text-[#737686]'
                    }`}
                  >
                    {item.dayLabel}
                  </span>
                  <span
                    className={`text-sm font-medium truncate ${
                      item.completed
                        ? 'text-[#737686] line-through opacity-70'
                        : 'text-[#191c1d]'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                {item.isToday && (
                  <span className="text-[10px] font-bold bg-[#003fb1] text-white px-2 py-0.5 rounded-full shrink-0">
                    TODAY
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </section>

      {/* Recommended Enterprises Bento Grid */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold text-[#191c1d]">맞춤 공공기관 추천</h3>
          <button
            onClick={() => onNavigateToTab('specAnalysis')}
            className="text-xs text-[#003fb1] font-semibold hover:underline flex items-center gap-0.5"
          >
            스펙 정밀 진단
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enterprises.slice(0, 3).map((enterprise) => {
            const tierColor =
              enterprise.tier === 'S'
                ? 'bg-[#003fb1] text-white'
                : enterprise.tier === 'A+'
                ? 'bg-[#006a61] text-white'
                : 'bg-[#1a56db] text-white';

            return (
              <article
                key={enterprise.id}
                onClick={() => onSelectEnterprise(enterprise)}
                className="bg-white rounded-2xl p-4 md:p-5 flex flex-col justify-between border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.09)] hover:border-[#003fb1]/40 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#737686] font-medium">
                      {enterprise.category}
                    </span>
                    <h4 className="text-lg font-bold text-[#191c1d] group-hover:text-[#003fb1] transition-colors">
                      {enterprise.name}
                    </h4>
                  </div>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs ${tierColor}`}
                  >
                    {enterprise.tier} Tier
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 mt-auto pt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-[#737686] font-medium">내 스펙 매칭률</span>
                    <span className="text-base font-bold text-[#006a61]">
                      {enterprise.matchRate}%
                    </span>
                  </div>
                  <div className="w-full bg-[#e1e3e4] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#006a61] h-full rounded-full transition-all duration-700"
                      style={{ width: `${enterprise.matchRate}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#f3f4f5]">
                  <span className="text-xs text-[#737686]">
                    {enterprise.workingLocation} · {enterprise.headquarters}
                  </span>
                  <span className="bg-[#ffd4c5] text-[#ad3b00] text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                    {enterprise.dDayText}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
