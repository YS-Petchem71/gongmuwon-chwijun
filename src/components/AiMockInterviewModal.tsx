import React, { useState } from 'react';
import { InterviewQuestion } from '../types';

interface AiMockInterviewModalProps {
  question: InterviewQuestion | null;
  enterpriseName: string;
  onClose: () => void;
}

export const AiMockInterviewModal: React.FC<AiMockInterviewModalProps> = ({
  question,
  enterpriseName,
  onClose,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    starAnalysis: {
      s: { present: boolean; comment: string };
      t: { present: boolean; comment: string };
      a: { present: boolean; comment: string };
      r: { present: boolean; comment: string };
    };
    strengths: string[];
    improvements: string[];
    modelSample: string;
  } | null>(null);

  if (!question) return null;

  const handleAnalyze = () => {
    if (!userAnswer.trim()) {
      alert('답변을 먼저 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      // Intelligent rule-based STAR analysis evaluation
      const length = userAnswer.length;
      const hasSituation = userAnswer.includes('당시') || userAnswer.includes('상황') || userAnswer.includes('프로젝트') || userAnswer.includes('경험');
      const hasAction = userAnswer.includes('해결하기 위해') || userAnswer.includes('실행') || userAnswer.includes('직접') || userAnswer.includes('제안');
      const hasResult = userAnswer.includes('결과') || userAnswer.includes('배웠') || userAnswer.includes('성과') || userAnswer.includes('달성');

      const score = Math.min(95, Math.max(65, Math.round(50 + (length > 150 ? 20 : 10) + (hasAction ? 15 : 5) + (hasResult ? 10 : 0))));

      setFeedback({
        score,
        starAnalysis: {
          s: {
            present: hasSituation,
            comment: hasSituation
              ? '배경 상황이 명확하게 제시되었습니다.'
              : '상황(Situation)의 시기와 맥락을 더 구체적으로 명시해보세요.',
          },
          t: {
            present: true,
            comment: '본인이 맡은 역할과 목표가 식별 가능합니다.',
          },
          a: {
            present: hasAction,
            comment: hasAction
              ? '주도적으로 취한 구체적 행동(Action)이 돋보입니다.'
              : '팀 전체의 일보다는 "본인이 직접 취한 핵심 행동"을 더 강조해보세요.',
          },
          r: {
            present: hasResult,
            comment: hasResult
              ? '정량적/정성적 성과와 배운 점이 잘 연결되었습니다.'
              : '결과(Result) 수치와 이를 입사 후 어떻게 적용할지 덧붙여보세요.',
          },
        },
        strengths: [
          `${enterpriseName}의 핵심 가치와 연계된 긍정적 태도`,
          '논리적인 문장 전개 및 직무 관심도 반영',
        ],
        improvements: [
          '수치화된 정량적 성과(예: 작업 효율 25% 개선)를 추가하면 설득력이 극대화됩니다.',
          '마지막 문장에서 지원 기업의 최근 현안과 연결하여 마무리하세요.',
        ],
        modelSample: `[모범 STAR 답변 예시]\n"대학교 3학년 시절 에너지 공학 캡스톤 디자인 프로젝트 당시(S), 태양광 패널의 효율 저하 문제를 해결해야 하는 과제를 맡았습니다(T). 저는 원인 규명을 위해 3주간 일사량 및 온도 데이터를 직접 수집 분석하였고, 방열 설계를 보완한 쿨링 모듈을 새롭게 제안 및 제작하였습니다(A). 그 결과 패널 표면 온도를 8도 낮추어 발전 효율을 14% 향상시키는 성과를 거두었습니다(R). 이러한 문제 해결 역량을 바탕으로 ${enterpriseName}에서도 안정적인 인프라 혁신에 기여하겠습니다."`,
      });
      setIsAnalyzing(false);
    }, 900);
  };

  const handleUseSample = () => {
    setUserAnswer(
      `이전 인턴십 당시 신규 데이터베이스 이관 작업 중 데이터 불일치 오류가 발생한 상황이었습니다. 저는 지연을 막기 위해 로그 분석 스크립트를 즉시 작성하여 오류 발생 위치를 신속히 특정하였고, 팀원들과 업무를 분담하여 4시간 만에 완전한 복구를 완료하였습니다. 이를 통해 일정 지연 없이 성공적으로 배포를 마쳤으며, 데이터 무결성 검증의 중요성을 배웠습니다.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl border border-[#e1e3e4] space-y-4 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#e1e3e4] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-full">
                AI 실전 모의면접
              </span>
              <span className="text-xs text-[#737686]">{enterpriseName}</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#191c1d] mt-1.5 leading-snug">
              {question.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#191c1d] p-1 rounded-full hover:bg-[#f3f4f5]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#434654]">내 답변 작성 (STAR 구조 권장)</span>
            <button
              onClick={handleUseSample}
              className="text-[#003fb1] hover:underline font-semibold"
            >
              예시 답변 불러오기
            </button>
          </div>
          <textarea
            rows={5}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="면접관에게 말하듯 STAR(상황-과제-행동-결과) 구조로 답변을 작성해보세요..."
            className="w-full p-3.5 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#003fb1] focus:bg-white transition-all resize-none"
          />
          <div className="flex justify-between items-center text-xs text-[#737686]">
            <span>글자 수: {userAnswer.length}자</span>
            <span>최적 답변 길이: 150~350자</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3 bg-[#003fb1] hover:bg-[#002d80] disabled:bg-[#c3c5d7] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              STAR 구조 및 역량 분석 중...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">psychology</span>
              AI 정밀 피드백 받기
            </>
          )}
        </button>

        {/* AI Feedback Report */}
        {feedback && (
          <div className="space-y-4 pt-3 border-t border-[#e1e3e4] animate-fadeIn">
            {/* Score & Summary Banner */}
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#737686] font-semibold">AI 면접 평가 점수</p>
                <p className="text-2xl font-extrabold text-[#003fb1]">
                  {feedback.score} <span className="text-sm font-normal text-[#737686]">/ 100점</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  feedback.score >= 85
                    ? 'bg-[#86f2e4] text-[#006f66]'
                    : feedback.score >= 75
                    ? 'bg-[#dbe1ff] text-[#00174d]'
                    : 'bg-[#ffd4c5] text-[#ad3b00]'
                }`}
              >
                {feedback.score >= 85 ? '우수 답변' : feedback.score >= 75 ? '양호한 답변' : '보완 필요'}
              </span>
            </div>

            {/* STAR Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#191c1d] uppercase tracking-wider">
                STAR 구성요소 분석
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#e1e3e4]">
                  <span className="font-bold text-[#006a61] block mb-0.5">S (Situation)</span>
                  <p className="text-[#434654]">{feedback.starAnalysis.s.comment}</p>
                </div>
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#e1e3e4]">
                  <span className="font-bold text-[#006a61] block mb-0.5">T (Task)</span>
                  <p className="text-[#434654]">{feedback.starAnalysis.t.comment}</p>
                </div>
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#e1e3e4]">
                  <span className="font-bold text-[#006a61] block mb-0.5">A (Action)</span>
                  <p className="text-[#434654]">{feedback.starAnalysis.a.comment}</p>
                </div>
                <div className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#e1e3e4]">
                  <span className="font-bold text-[#006a61] block mb-0.5">R (Result)</span>
                  <p className="text-[#434654]">{feedback.starAnalysis.r.comment}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#FFF7ED] p-3.5 rounded-xl border border-[#FFEDD5] space-y-1.5">
              <h5 className="text-xs font-bold text-[#ad3b00] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                개선 제안 포인트
              </h5>
              <ul className="text-xs text-[#434654] space-y-1 list-disc list-inside">
                {feedback.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>

            {/* Model Answer Toggle */}
            <details className="bg-[#f3f4f5] p-3.5 rounded-xl border border-[#e1e3e4]">
              <summary className="text-xs font-bold text-[#003fb1] cursor-pointer hover:underline">
                전문가 모범 예시 답변 확인하기
              </summary>
              <p className="text-xs text-[#434654] mt-2 whitespace-pre-line leading-relaxed">
                {feedback.modelSample}
              </p>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};
