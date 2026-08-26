import React, { useState } from 'react';
import { Enterprise, TierLevel, JobCategory } from '../types';

interface TierListViewProps {
  enterprises: Enterprise[];
  onSelectEnterprise: (enterprise: Enterprise) => void;
  onOpenCriteriaModal: () => void;
}

export const TierListView: React.FC<TierListViewProps> = ({
  enterprises,
  onSelectEnterprise,
  onOpenCriteriaModal,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedJob, setSelectedJob] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tierOptions: { label: string; value: string }[] = [
    { label: '전체', value: 'ALL' },
    { label: 'S-Tier', value: 'S' },
    { label: 'A-Tier', value: 'A' },
    { label: 'B-Tier', value: 'B' },
    { label: 'C-Tier', value: 'C' },
  ];

  const jobOptions: { label: string; value: string }[] = [
    { label: '직무 전체', value: 'ALL' },
    { label: '사무/행정', value: '사무/행정' },
    { label: '기술/엔지니어', value: '기술/엔지니어' },
    { label: '금융', value: '금융' },
    { label: '보건/복지', value: '보건/복지' },
    { label: '에너지/발전', value: '에너지/발전' },
    { label: 'SOC/교통', value: 'SOC/교통' },
  ];

  const filteredEnterprises = enterprises.filter((item) => {
    // Tier filter
    if (selectedTier !== 'ALL') {
      if (selectedTier === 'A') {
        if (!item.tier.startsWith('A')) return false;
      } else if (selectedTier === 'B') {
        if (!item.tier.startsWith('B')) return false;
      } else if (item.tier !== selectedTier) {
        return false;
      }
    }

    // Job filter
    if (selectedJob !== 'ALL') {
      if (item.jobCategory !== selectedJob && !item.hiringInfo.positions.includes(selectedJob)) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchHQ = item.headquarters.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchHQ) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 relative">
      {/* Header Section */}
      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-[#191c1d] tracking-tight">공공기관 티어표</h2>
        <p className="text-sm text-[#434654]">
          연봉, 워라밸, 경쟁률을 종합적으로 분석한 티어 리스트입니다.
        </p>
      </section>

      {/* Filter Chips */}
      <section className="space-y-2.5">
        {/* Tier Chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-0.5">
          {tierOptions.map((opt) => {
            const isSelected = selectedTier === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedTier(opt.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#003fb1] text-white shadow-xs'
                    : 'bg-white border border-[#c3c5d7] text-[#434654] hover:bg-[#edeeef]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Job Category Chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-0.5">
          {jobOptions.map((opt) => {
            const isSelected = selectedJob === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedJob(opt.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#003fb1] text-white shadow-xs'
                    : 'bg-white border border-[#c3c5d7] text-[#434654] hover:bg-[#edeeef]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative pt-1">
          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-[#737686] text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="기업명, 지역 또는 직무 검색 (예: 한전, 대전, 사무)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#c3c5d7] rounded-xl text-sm placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#003fb1] focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#737686] hover:text-[#191c1d] p-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </section>

      {/* Tier List Cards */}
      <section className="flex flex-col gap-4">
        {filteredEnterprises.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#e1e3e4] text-[#737686] space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#c3c5d7]">search_off</span>
            <p className="text-sm font-medium">검색 조건에 맞는 공공기관이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedTier('ALL');
                setSelectedJob('ALL');
                setSearchQuery('');
              }}
              className="text-xs text-[#003fb1] font-bold underline"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          filteredEnterprises.map((item) => {
            const isSTier = item.tier === 'S';
            const isAPlus = item.tier === 'A+';

            return (
              <article
                key={item.id}
                onClick={() => onSelectEnterprise(item)}
                className="bg-white rounded-2xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e3e4] hover:border-[#003fb1]/40 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.09)] transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Top header row */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#191c1d] group-hover:text-[#003fb1] transition-colors flex items-center gap-2">
                      {item.name}
                      {item.englishName && (
                        <span className="text-xs font-normal text-[#737686]">
                          ({item.englishName})
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[#434654] mt-0.5">{item.category}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-xs ${
                      isSTier
                        ? 'bg-[#1a56db] text-white'
                        : isAPlus
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : 'bg-[#dbe1ff] text-[#00174d]'
                    }`}
                  >
                    {item.tier}
                  </div>
                </div>

                {/* 3 Metric Boxes */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {/* Metric 1: 연봉 수준 */}
                  <div className="flex flex-col items-center bg-[#f8f9fa] rounded-xl p-2.5 border border-[#e1e3e4]">
                    <span className="text-xs font-semibold text-[#434654] mb-1">연봉 수준</span>
                    <div className="flex text-[#ad3b00]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`material-symbols-outlined text-[16px] ${
                            star <= item.salaryStars
                              ? 'fill-1 text-[#ad3b00]'
                              : 'fill-1 text-[#c3c5d7]'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric 2: 워라밸 */}
                  <div className="flex flex-col items-center bg-[#f8f9fa] rounded-xl p-2.5 border border-[#e1e3e4]">
                    <span className="text-xs font-semibold text-[#434654] mb-1">워라밸</span>
                    <div className="flex text-[#ad3b00]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`material-symbols-outlined text-[16px] ${
                            star <= item.workLifeStars
                              ? 'fill-1 text-[#ad3b00]'
                              : 'fill-1 text-[#c3c5d7]'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric 3: 경쟁률 */}
                  <div className="flex flex-col items-center bg-[#f8f9fa] rounded-xl p-2.5 border border-[#e1e3e4]">
                    <span className="text-xs font-semibold text-[#434654] mb-1">경쟁률</span>
                    <span
                      className={`text-sm font-bold ${
                        item.competitionRate === '최상'
                          ? 'text-[#ba1a1a]'
                          : item.competitionRate === '상'
                          ? 'text-[#ad3b00]'
                          : 'text-[#006a61]'
                      }`}
                    >
                      {item.competitionRate}
                    </span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-end pt-1">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#edeeef] rounded-md text-xs font-medium text-[#434654]">
                      {item.workingLocation}
                    </span>
                    <span className="px-2.5 py-1 bg-[#edeeef] rounded-md text-xs font-medium text-[#434654]">
                      {item.headquarters}
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-[#ad3b00]">
                    {item.dDayText}
                  </span>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* FAB for "Why is this Tier?" (티어 선정 기준) */}
      <button
        onClick={onOpenCriteriaModal}
        className="fixed bottom-20 md:bottom-8 right-5 md:right-8 bg-[#003fb1] hover:bg-[#002d80] text-white shadow-[0px_8px_24px_rgba(0,0,0,0.18)] px-5 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 z-40"
      >
        <span className="material-symbols-outlined text-[20px]">help</span>
        <span className="text-xs md:text-sm font-bold">티어 선정 기준</span>
      </button>
    </div>
  );
};
