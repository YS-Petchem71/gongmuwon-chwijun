import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Enterprise, DetailTabType, InterviewQuestion, SpecCriteriaItem } from '../types';

interface EnterpriseDetailViewProps {
  enterprise: Enterprise;
  initialTab?: DetailTabType;
  onOpenAiInterview: (question: InterviewQuestion, enterpriseName: string) => void;
  onBookmarkToggle: (id: string) => void;
}

export const EnterpriseDetailView: React.FC<EnterpriseDetailViewProps> = ({
  enterprise,
  initialTab = 'specScore',
  onOpenAiInterview,
  onBookmarkToggle,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTabType>(initialTab);
  const [specItems, setSpecItems] = useState<SpecCriteriaItem[]>(enterprise.specItems);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    enterprise.interviewQuestions[0]?.id || null
  );
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<string>('ALL');

  // Calculate dynamic score based on checked items
  const licensePoints = specItems
    .filter((item) => item.category === '자격증' && item.acquired)
    .reduce((acc, curr) => acc + curr.points, 0);
  const licenseMax = 50;

  const languagePoints = specItems
    .filter((item) => item.category === '어학' && item.acquired)
    .reduce((acc, curr) => acc + curr.points, 0);
  const languageMax = 30;

  const benefitPoints = specItems
    .filter((item) => item.category === '우대사항' && item.acquired)
    .reduce((acc, curr) => acc + curr.points, 0);
  const benefitMax = 20;

  const totalPoints = Math.min(100, licensePoints + languagePoints + benefitPoints);
  const targetThreshold = 80;
  const pointsNeeded = Math.max(0, targetThreshold - totalPoints);

  const toggleItem = (itemId: string) => {
    const updated = specItems.map((item) => {
      if (item.id === itemId) {
        const nextState = !item.acquired;
        return { ...item, acquired: nextState };
      }
      return item;
    });
    setSpecItems(updated);

    const newTotal = updated
      .filter((item) => item.acquired)
      .reduce((acc, curr) => acc + curr.points, 0);

    if (newTotal >= targetThreshold && totalPoints < targetThreshold) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const filteredQuestions = enterprise.interviewQuestions.filter((q) => {
    if (selectedQuestionFilter === 'ALL') return true;
    return q.type === selectedQuestionFilter;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Enterprise Header Section */}
      <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col md:flex-row gap-5 relative border border-[#e1e3e4]">
        {/* Tier Badge */}
        <div
          className={`absolute top-5 right-5 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs ${
            enterprise.tier === 'S'
              ? 'bg-[#003fb1]'
              : enterprise.tier === 'A+'
              ? 'bg-[#006a61]'
              : 'bg-[#1a56db]'
          }`}
        >
          {enterprise.tier} Tier
        </div>

        {/* Logo Avatar Container */}
        <div className="w-20 h-20 shrink-0 rounded-2xl border border-[#e1e3e4] bg-[#f8f9fa] flex items-center justify-center overflow-hidden p-2 shadow-xs">
          {enterprise.logoUrl ? (
            <img
              src={enterprise.logoUrl}
              alt={enterprise.name}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-[#003fb1] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-3xl">bolt</span>
            </div>
          )}
        </div>

        {/* Header Metadata */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-[#191c1d]">{enterprise.name}</h2>
            {enterprise.englishName && (
              <span className="text-xs text-[#737686] font-medium">
                ({enterprise.englishName})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-xs text-[#434654] border border-[#c3c5d7] px-2.5 py-1 rounded-md bg-[#f8f9fa]">
              공기업
            </span>
            <span className="text-xs text-[#434654] border border-[#c3c5d7] px-2.5 py-1 rounded-md bg-[#f8f9fa]">
              본사: {enterprise.headquarters}
            </span>
            <span className="text-xs text-[#434654] border border-[#c3c5d7] px-2.5 py-1 rounded-md bg-[#f8f9fa]">
              연봉: {enterprise.salaryRange}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-[#FFF7ED] border border-[#FFEDD5] px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[#F97316] text-[16px] fill-1">
                event
              </span>
              <span className="text-xs md:text-sm font-bold text-[#F97316]">
                {enterprise.dDayText}
              </span>
            </div>

            <button
              onClick={() => onBookmarkToggle(enterprise.id)}
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs font-semibold ${
                enterprise.isBookmarked
                  ? 'bg-[#dbe1ff] border-[#003fb1] text-[#003fb1]'
                  : 'bg-[#f8f9fa] border-[#c3c5d7] text-[#737686] hover:bg-[#edeeef]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  enterprise.isBookmarked ? 'fill-1' : ''
                }`}
              >
                bookmark
              </span>
              {enterprise.isBookmarked ? '관심기업' : '스크랩'}
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="flex border-b border-[#e1e3e4] bg-white rounded-t-xl overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('hiring')}
          className={`flex-1 min-w-[110px] py-3.5 text-sm font-bold text-center transition-all ${
            activeTab === 'hiring'
              ? 'text-[#003fb1] border-b-2 border-[#003fb1] bg-[#003fb1]/5'
              : 'text-[#737686] hover:bg-[#f8f9fa]'
          }`}
        >
          채용 정보
        </button>
        <button
          onClick={() => setActiveTab('specScore')}
          className={`flex-1 min-w-[110px] py-3.5 text-sm font-bold text-center transition-all ${
            activeTab === 'specScore'
              ? 'text-[#003fb1] border-b-2 border-[#003fb1] bg-[#003fb1]/5'
              : 'text-[#737686] hover:bg-[#f8f9fa]'
          }`}
        >
          서류 가점 분석
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`flex-1 min-w-[110px] py-3.5 text-sm font-bold text-center transition-all ${
            activeTab === 'interview'
              ? 'text-[#003fb1] border-b-2 border-[#003fb1] bg-[#003fb1]/5'
              : 'text-[#737686] hover:bg-[#f8f9fa]'
          }`}
        >
          면접 기출
        </button>
      </nav>

      {/* TAB 1: 채용 정보 (Hiring Outline) */}
      {activeTab === 'hiring' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-lg font-bold text-[#191c1d]">채용 개요 및 전형 일정</h3>
            <p className="text-sm text-[#434654] leading-relaxed">
              {enterprise.hiringInfo.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
                <p className="text-xs text-[#737686] font-semibold">모집 분야</p>
                <p className="text-sm font-bold text-[#191c1d] mt-1">
                  {enterprise.hiringInfo.positions}
                </p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
                <p className="text-xs text-[#737686] font-semibold">선발 규모</p>
                <p className="text-sm font-bold text-[#003fb1] mt-1">
                  총 {enterprise.hiringInfo.totalHiring}명 예정
                </p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
                <p className="text-xs text-[#737686] font-semibold">원서 접수 기간</p>
                <p className="text-sm font-bold text-[#191c1d] mt-1">
                  {enterprise.hiringInfo.period}
                </p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]">
                <p className="text-xs text-[#737686] font-semibold">전형 절차</p>
                <p className="text-sm font-bold text-[#191c1d] mt-1">
                  서류전형 (가점제) → 필기 (NCS+전공) → 면접 (직무/인성)
                </p>
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={() => setActiveTab('specScore')}
                className="flex-1 py-3 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                내 서류 가점 계산하기
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className="px-5 py-3 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                면접 기출 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 서류 가점 분석 (Spec Points Content - Screen 3) */}
      {activeTab === 'specScore' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Left Col: My Estimated Points */}
          <div className="md:col-span-1 space-y-5">
            {/* Circular Gauge Card */}
            <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-6 flex flex-col items-center border border-[#e1e3e4]">
              <h3 className="text-base font-bold text-[#191c1d] mb-4 w-full text-left">
                나의 예상 가점
              </h3>
              <div className="relative w-44 h-44 mb-3">
                <svg className="circular-chart text-[#003fb1]" viewBox="0 0 36 36">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle text-[#003fb1]"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke="currentColor"
                    strokeDasharray={`${totalPoints}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#003fb1]">{totalPoints}</span>
                  <span className="text-xs text-[#737686] font-medium">/ 100 점</span>
                </div>
              </div>
              <p className="text-xs text-[#434654] text-center mt-1">
                {pointsNeeded > 0 ? (
                  <>
                    합격 안정권까지 <strong className="text-[#ba1a1a]">{pointsNeeded}점</strong>{' '}
                    부족합니다.
                  </>
                ) : (
                  <strong className="text-[#006a61]">🎉 서류전형 합격 안정권 점수입니다!</strong>
                )}
              </p>
            </section>

            {/* Score Summary Bars Card */}
            <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4] space-y-3">
              <h3 className="text-sm font-bold text-[#191c1d] mb-3">가점 요약</h3>

              {/* 자격증 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#737686]">자격증</span>
                  <span className="font-bold text-[#191c1d]">
                    {licensePoints} / {licenseMax}
                  </span>
                </div>
                <div className="w-full bg-[#e1e3e4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#003fb1] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (licensePoints / licenseMax) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 어학 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#737686]">어학</span>
                  <span className="font-bold text-[#191c1d]">
                    {languagePoints} / {languageMax}
                  </span>
                </div>
                <div className="w-full bg-[#e1e3e4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0D9488] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (languagePoints / languageMax) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 우대사항 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#737686]">우대사항</span>
                  <span className="font-bold text-[#191c1d]">
                    {benefitPoints} / {benefitMax}
                  </span>
                </div>
                <div className="w-full bg-[#e1e3e4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006a61] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (benefitPoints / benefitMax) * 100)}%` }}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Col: Detailed Checkable List */}
          <div className="md:col-span-2 space-y-5">
            {/* 1. Licenses */}
            <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#003fb1]">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191c1d]">자격증 가점 상세</h3>
                  <p className="text-xs text-[#737686]">클릭하여 보유 여부를 실시간 변경해보세요</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {specItems
                  .filter((item) => item.category === '자격증')
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start md:items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        item.acquired
                          ? 'border-[#003fb1]/30 bg-[#f8f9fa] shadow-2xs'
                          : 'border-[#e1e3e4] opacity-70 hover:opacity-100 hover:border-[#c3c5d7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-[22px] ${
                            item.acquired ? 'text-[#006a61] fill-1' : 'text-[#737686]'
                          }`}
                        >
                          {item.acquired ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#191c1d]">{item.name}</h4>
                          <p className="text-xs text-[#737686]">{item.description}</p>
                        </div>
                      </div>
                      <span
                        className={`text-base font-extrabold shrink-0 ${
                          item.acquired ? 'text-[#003fb1]' : 'text-[#737686]'
                        }`}
                      >
                        +{item.points}점
                      </span>
                    </div>
                  ))}
              </div>
            </section>

            {/* 2. Languages */}
            <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                  <span className="material-symbols-outlined text-[20px]">language</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191c1d]">어학 가점 상세</h3>
                  <p className="text-xs text-[#737686]">공인어학 환산 기준</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {specItems
                  .filter((item) => item.category === '어학')
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start md:items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        item.acquired
                          ? 'border-[#003fb1]/30 bg-[#f8f9fa] shadow-2xs'
                          : 'border-[#e1e3e4] opacity-70 hover:opacity-100 hover:border-[#c3c5d7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-[22px] ${
                            item.acquired ? 'text-[#006a61] fill-1' : 'text-[#737686]'
                          }`}
                        >
                          {item.acquired ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#191c1d]">{item.name}</h4>
                            {item.extraInfo && (
                              <span className="bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded text-[11px] font-bold">
                                {item.extraInfo}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#737686]">{item.description}</p>
                        </div>
                      </div>
                      <span
                        className={`text-base font-extrabold shrink-0 ${
                          item.acquired ? 'text-[#003fb1]' : 'text-[#737686]'
                        }`}
                      >
                        +{item.points}점
                      </span>
                    </div>
                  ))}
              </div>
            </section>

            {/* 3. Preferential Treatment */}
            <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#ffd4c5] flex items-center justify-center text-[#ad3b00]">
                  <span className="material-symbols-outlined text-[20px]">diversity_3</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191c1d]">우대사항 (가점)</h3>
                  <p className="text-xs text-[#737686]">지역인재 및 인턴십 가산점</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specItems
                  .filter((item) => item.category === '우대사항')
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                        item.acquired
                          ? 'border-[#003fb1]/30 bg-[#f8f9fa] shadow-2xs'
                          : 'border-[#e1e3e4] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-sm font-bold text-[#191c1d]">{item.name}</h4>
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              item.acquired ? 'text-[#006a61] fill-1' : 'text-[#737686]'
                            }`}
                          >
                            {item.acquired ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                        <p className="text-xs text-[#737686] mb-3">{item.description}</p>
                      </div>
                      <span
                        className={`text-sm font-extrabold self-end ${
                          item.acquired ? 'text-[#003fb1]' : 'text-[#737686]'
                        }`}
                      >
                        +{item.points}점
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* TAB 3: 면접 기출 (Interview Questions - Screen 1) */}
      {activeTab === 'interview' && (
        <section className="space-y-4 animate-fadeIn">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-[#191c1d]">빈출 질문 리스트</h3>
              <p className="text-xs text-[#737686] mt-0.5">
                실제 합격자 복기 기반 기출 문항 및 STAR 구조 가이드
              </p>
            </div>
            <span className="text-xs font-semibold text-[#003fb1] bg-[#dbe1ff] px-3 py-1 rounded-full self-start">
              총 {enterprise.interviewQuestions.length}문항 수록
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {['ALL', '인성/가치관', '경험/직무', '상황/대처', '시사/전공'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedQuestionFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedQuestionFilter === cat
                    ? 'bg-[#003fb1] text-white shadow-xs'
                    : 'bg-white border border-[#c3c5d7] text-[#434654] hover:bg-[#edeeef]'
                }`}
              >
                {cat === 'ALL' ? '전체' : cat}
              </button>
            ))}
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-3.5">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e3e4] overflow-hidden transition-all"
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="w-full flex items-start justify-between p-4 md:p-5 text-left focus:outline-none bg-[#f8f9fa] hover:bg-[#f3f4f5] transition-colors"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            q.frequency === 'High Frequency'
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : 'bg-[#e1e3e4] text-[#434654]'
                          }`}
                        >
                          {q.frequency}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            q.type === '인성/가치관'
                              ? 'bg-[#1a56db] text-white'
                              : q.type === '경험/직무'
                              ? 'bg-[#ad3b00] text-white'
                              : q.type === '상황/대처'
                              ? 'bg-[#86f2e4] text-[#006f66]'
                              : 'bg-[#006a61] text-white'
                          }`}
                        >
                          {q.type}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-base font-bold text-[#191c1d] leading-snug">
                        {q.title}
                      </h4>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#737686] transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#003fb1]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Accordion Content Body */}
                  {isExpanded && (
                    <div className="bg-white p-5 border-t border-[#e1e3e4] space-y-4 animate-fadeIn">
                      {/* Guide Section */}
                      <div className="bg-[#f3f4f5] p-4 rounded-xl border border-[#e1e3e4] space-y-3">
                        <h5 className="text-xs font-bold text-[#003fb1] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                          답변 가이드
                        </h5>
                        <p className="text-xs md:text-sm text-[#434654] leading-relaxed">
                          {q.guide}
                        </p>

                        {/* STAR Structure */}
                        {q.starGuide && (
                          <div className="space-y-2.5 pt-2 border-t border-[#e1e3e4]">
                            <p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">
                              STAR 구조화 핵심 포인트
                            </p>
                            <div className="space-y-2">
                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  S
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#191c1d] block">
                                    Situation (상황)
                                  </span>
                                  <span className="text-xs text-[#737686]">
                                    {q.starGuide.s}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  T
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#191c1d] block">
                                    Task (과제)
                                  </span>
                                  <span className="text-xs text-[#737686]">
                                    {q.starGuide.t}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  A
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#191c1d] block">
                                    Action (행동)
                                  </span>
                                  <span className="text-xs text-[#737686]">
                                    {q.starGuide.a}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2.5 items-start">
                                <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  R
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#191c1d] block">
                                    Result (결과)
                                  </span>
                                  <span className="text-xs text-[#737686]">
                                    {q.starGuide.r}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => onOpenAiInterview(q, enterprise.name)}
                        className="w-full py-3 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                        AI와 실전 연습하기
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
