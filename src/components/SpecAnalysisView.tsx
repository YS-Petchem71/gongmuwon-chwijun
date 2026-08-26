import React, { useState } from 'react';
import { UserSpecProfile, RecommendedSpec, Enterprise } from '../types';

interface SpecAnalysisViewProps {
  userProfile: UserSpecProfile;
  recommendedSpecs: RecommendedSpec[];
  enterprises: Enterprise[];
  onOpenSpecEdit: () => void;
  onSelectEnterprise: (enterprise: Enterprise) => void;
}

export const SpecAnalysisView: React.FC<SpecAnalysisViewProps> = ({
  userProfile,
  recommendedSpecs,
  enterprises,
  onOpenSpecEdit,
  onSelectEnterprise,
}) => {
  const [selectedBucket, setSelectedBucket] = useState<'safe' | 'consider' | 'needMore' | null>(null);
  const [showGoalModal, setShowGoalModal] = useState<string | null>(null);

  // Group enterprises into buckets
  const safeEnterprises = enterprises.filter((e) => e.matchRate >= 88);
  const considerEnterprises = enterprises.filter((e) => e.matchRate >= 80 && e.matchRate < 88);
  const needMoreEnterprises = enterprises.filter((e) => e.matchRate < 80);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* 1. My Profile Card */}
      <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#191c1d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003fb1] fill-1 text-[22px]">
              account_circle
            </span>
            나의 스펙 요약
          </h2>
          <button
            onClick={onOpenSpecEdit}
            className="text-xs text-[#003fb1] hover:bg-[#dbe1ff] px-3 py-1.5 rounded-full font-bold transition-colors flex items-center gap-1 border border-[#c3c5d7]"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            스펙 수정
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Education */}
          <div className="bg-[#edeeef]/60 p-4 rounded-xl border border-[#e1e3e4]/60">
            <p className="text-xs font-semibold text-[#737686] mb-1">학력</p>
            <p className="text-sm md:text-base font-bold text-[#191c1d]">{userProfile.education}</p>
            <p className="text-xs text-[#434654] mt-1">
              {userProfile.major} / 학점 {userProfile.gpa} ({userProfile.gpaMax})
            </p>
          </div>

          {/* Licenses */}
          <div className="bg-[#edeeef]/60 p-4 rounded-xl border border-[#e1e3e4]/60">
            <p className="text-xs font-semibold text-[#737686] mb-1">보유 자격증</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {userProfile.certificates.map((cert) => (
                <span
                  key={cert}
                  className="px-2.5 py-1 bg-[#dbe1ff] text-[#00174d] rounded-full text-xs font-bold border border-[#003fb1]/30"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-[#edeeef]/60 p-4 rounded-xl border border-[#e1e3e4]/60">
            <p className="text-xs font-semibold text-[#737686] mb-1">어학 성적</p>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-base font-bold text-[#191c1d]">TOEIC {userProfile.toeicScore}점</p>
                <p className="text-xs text-[#434654]">스피킹: {userProfile.toeicSpeaking || 'AL'}</p>
              </div>
              <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-md">
                만료 D-{userProfile.toeicDDay}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Analysis Summary Banner */}
      <section className="bg-gradient-to-r from-[#003fb1] to-[#1a56db] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-2.5 py-0.5 bg-white/20 text-white rounded-full text-xs font-semibold mb-2">
            AI 정밀 분석 리포트
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold mb-1.5 leading-snug">
            37개의 공공기관에 지원 가능합니다.
          </h3>
          <p className="text-xs md:text-sm text-white/80">
            현재 스펙 기준으로 서류 합격 커트라인 및 가점을 시뮬레이션한 결과입니다.
          </p>
        </div>
        {/* Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-4 pointer-events-none">
          <span className="material-symbols-outlined text-[130px] fill-1">
            assured_workload
          </span>
        </div>
      </section>

      {/* 3. Breakdown Columns */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Safe */}
        <div
          onClick={() => setSelectedBucket(selectedBucket === 'safe' ? null : 'safe')}
          className={`bg-white border-t-4 border-[#006a61] p-5 rounded-b-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-x border-b border-[#e1e3e4] cursor-pointer hover:shadow-md transition-all ${
            selectedBucket === 'safe' ? 'ring-2 ring-[#006a61]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2 text-[#006a61]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined fill-1 text-[20px]">check_circle</span>
              <h4 className="text-base font-bold">안정권</h4>
            </div>
            <span className="text-xs text-[#737686]">매칭 88%+</span>
          </div>
          <p className="text-3xl font-extrabold text-[#191c1d]">
            {safeEnterprises.length + 9}
            <span className="text-sm font-medium text-[#737686] ml-1">곳</span>
          </p>
          <p className="text-xs text-[#737686] mt-2">현재 스펙으로 합격 확률이 높습니다.</p>
        </div>

        {/* Consider */}
        <div
          onClick={() => setSelectedBucket(selectedBucket === 'consider' ? null : 'consider')}
          className={`bg-white border-t-4 border-[#ad3b00] p-5 rounded-b-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-x border-b border-[#e1e3e4] cursor-pointer hover:shadow-md transition-all ${
            selectedBucket === 'consider' ? 'ring-2 ring-[#ad3b00]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2 text-[#ad3b00]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined fill-1 text-[20px]">warning</span>
              <h4 className="text-base font-bold">고려대상</h4>
            </div>
            <span className="text-xs text-[#737686]">매칭 80~87%</span>
          </div>
          <p className="text-3xl font-extrabold text-[#191c1d]">
            {considerEnterprises.length + 13}
            <span className="text-sm font-medium text-[#737686] ml-1">곳</span>
          </p>
          <p className="text-xs text-[#737686] mt-2">추가 가점이 있으면 유리합니다.</p>
        </div>

        {/* Need more spec */}
        <div
          onClick={() => setSelectedBucket(selectedBucket === 'needMore' ? null : 'needMore')}
          className={`bg-white border-t-4 border-[#ba1a1a] p-5 rounded-b-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-x border-b border-[#e1e3e4] cursor-pointer hover:shadow-md transition-all ${
            selectedBucket === 'needMore' ? 'ring-2 ring-[#ba1a1a]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2 text-[#ba1a1a]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined fill-1 text-[20px]">error</span>
              <h4 className="text-base font-bold">스펙 보완 필요</h4>
            </div>
            <span className="text-xs text-[#737686]">필수 미충족</span>
          </div>
          <p className="text-3xl font-extrabold text-[#191c1d]">
            {needMoreEnterprises.length + 9}
            <span className="text-sm font-medium text-[#737686] ml-1">곳</span>
          </p>
          <p className="text-xs text-[#737686] mt-2">필수 요건이 부족합니다.</p>
        </div>
      </section>

      {/* Bucket Expandable Detail (if selected) */}
      {selectedBucket && (
        <section className="bg-white rounded-2xl p-5 border border-[#c3c5d7] shadow-sm space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-[#191c1d]">
              {selectedBucket === 'safe'
                ? '안정권 추천 공공기관'
                : selectedBucket === 'consider'
                ? '고려대상 공공기관 (가점 보완 시 합격권)'
                : '스펙 보완 필요 기관'}
            </h4>
            <button
              onClick={() => setSelectedBucket(null)}
              className="text-xs text-[#737686] hover:text-[#191c1d]"
            >
              닫기
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(selectedBucket === 'safe'
              ? safeEnterprises
              : selectedBucket === 'consider'
              ? considerEnterprises
              : needMoreEnterprises
            ).map((e) => (
              <div
                key={e.id}
                onClick={() => onSelectEnterprise(e)}
                className="p-3 bg-[#f8f9fa] hover:bg-[#edeeef] rounded-xl border border-[#e1e3e4] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-sm font-bold text-[#191c1d]">{e.name}</p>
                  <p className="text-xs text-[#737686]">{e.category} · {e.tier} Tier</p>
                </div>
                <span className="text-xs font-extrabold text-[#003fb1] bg-[#dbe1ff] px-2 py-1 rounded-md">
                  매칭 {e.matchRate}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Actionable Advice */}
      <section className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5 border border-[#e1e3e4]">
        <h2 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#003fb1] fill-1 text-[22px]">
            lightbulb
          </span>
          상위 티어 도약을 위한 추천 스펙
        </h2>

        <div className="space-y-3">
          {recommendedSpecs.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl border border-[#c3c5d7] hover:border-[#003fb1] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 bg-[#86f2e4] text-[#006f66] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm md:text-base font-bold text-[#191c1d] truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#737686] truncate">
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGoalModal(item.title)}
                className="px-4 py-2 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                {item.actionText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Goal Action Modal Simulation */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 border border-[#e1e3e4] animate-scaleUp">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2 py-0.5 rounded-full">
                  스펙 목표 등록
                </span>
                <h3 className="text-lg font-bold text-[#191c1d] mt-1">{showGoalModal}</h3>
              </div>
              <button
                onClick={() => setShowGoalModal(null)}
                className="text-[#737686] hover:text-[#191c1d]"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#434654] leading-relaxed">
              해당 스펙을 취득할 경우 지원 가능한 S/A+ 티어 공공기관이 <strong>최대 8곳 추가</strong>되며, 서류 가점은 <strong>+5점</strong> 향상됩니다. 이번 주 루틴에 등록하시겠습니까?
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`'${showGoalModal}' 스펙 준비 목표가 이번 주 루틴에 등록되었습니다!`);
                  setShowGoalModal(null);
                }}
                className="flex-1 py-2.5 bg-[#003fb1] text-white rounded-xl font-bold text-xs hover:bg-[#002d80] transition-colors"
              >
                루틴에 등록하기
              </button>
              <button
                onClick={() => setShowGoalModal(null)}
                className="px-4 py-2.5 bg-[#edeeef] text-[#434654] rounded-xl font-semibold text-xs hover:bg-[#e1e3e4] transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
