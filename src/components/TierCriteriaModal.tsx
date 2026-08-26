import React from 'react';

interface TierCriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TierCriteriaModal: React.FC<TierCriteriaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e1e3e4] space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b border-[#e1e3e4] pb-3">
          <div>
            <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-full">
              산정 기준 가이드
            </span>
            <h3 className="text-xl font-bold text-[#191c1d] mt-1.5">
              공공기관 티어 산정 지표
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#191c1d] p-1 rounded-full hover:bg-[#f3f4f5]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <p className="text-xs md:text-sm text-[#434654] leading-relaxed">
          JOB PREP 공공기관 티어는 알리오(ALIO) 공시 데이터 및 현직자 재직 평가, 합격자 스펙 데이터를 토대로 <strong>5가지 핵심 지표</strong>를 가중 평가하여 산정됩니다.
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#191c1d]">1. 신입 초봉 및 평균 연봉</span>
              <span className="text-xs font-bold text-[#003fb1]">반영비율 30%</span>
            </div>
            <p className="text-xs text-[#737686]">
              기본급, 고정수당, 성과급을 합산한 실제 수령액 기준 (5성급 만점 4,500만원 이상)
            </p>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#191c1d]">2. 워라밸 & 복리후생</span>
              <span className="text-xs font-bold text-[#006a61]">반영비율 25%</span>
            </div>
            <p className="text-xs text-[#737686]">
              정시 퇴근 비율, 유연근무제 정착도, 주거지원비, 자녀 학자금 등 복지제도 실효성
            </p>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#191c1d]">3. 근무지 및 순환 주기</span>
              <span className="text-xs font-bold text-[#ad3b00]">반영비율 20%</span>
            </div>
            <p className="text-xs text-[#737686]">
              수도권 알박기 가능 여부, 본사 위치(서울/수도권/혁신도시), 권역 순환 주기
            </p>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#191c1d]">4. 채용 경쟁률 & 필기 난이도</span>
              <span className="text-xs font-bold text-[#ba1a1a]">반영비율 15%</span>
            </div>
            <p className="text-xs text-[#737686]">
              평균 서류 및 필기 경쟁률 (최상: 100:1 초과, 상: 50~100:1)
            </p>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#191c1d]">5. 조직 안정성 & 정년 보장</span>
              <span className="text-xs font-bold text-[#737686]">반영비율 10%</span>
            </div>
            <p className="text-xs text-[#737686]">
              기획재정부 경영평가 등급 및 기관 통폐합 리스크 지수
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs font-bold transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
