import React, { useState } from 'react';
import { UserSpecProfile } from '../types';

interface SpecEditModalProps {
  isOpen: boolean;
  userProfile: UserSpecProfile;
  onSave: (updated: UserSpecProfile) => void;
  onClose: () => void;
}

export const SpecEditModal: React.FC<SpecEditModalProps> = ({
  isOpen,
  userProfile,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<UserSpecProfile>({ ...userProfile });
  const [newCert, setNewCert] = useState('');

  if (!isOpen) return null;

  const handleAddCert = () => {
    if (newCert.trim() && !formData.certificates.includes(newCert.trim())) {
      setFormData({
        ...formData,
        certificates: [...formData.certificates, newCert.trim()],
      });
      setNewCert('');
    }
  };

  const handleRemoveCert = (certToRemove: string) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.filter((c) => c !== certToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e1e3e4] space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b border-[#e1e3e4] pb-3">
          <div>
            <span className="text-xs font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-full">
              내 스펙 관리
            </span>
            <h3 className="text-xl font-bold text-[#191c1d] mt-1.5">
              취업 스펙 프로필 설정
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#191c1d] p-1 rounded-full hover:bg-[#f3f4f5]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Major */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">전공 계열</label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Education & GPA */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">학력 구분</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">학점 (4.5 만점)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.5"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Language TOEIC */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">TOEIC 점수</label>
              <input
                type="number"
                min="0"
                max="990"
                step="5"
                value={formData.toeicScore}
                onChange={(e) =>
                  setFormData({ ...formData, toeicScore: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#434654] block mb-1">스피킹 성적</label>
              <input
                type="text"
                value={formData.toeicSpeaking || ''}
                onChange={(e) => setFormData({ ...formData, toeicSpeaking: e.target.value })}
                placeholder="예: AL / IH / Lv.7"
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Certificates */}
          <div>
            <label className="text-xs font-bold text-[#434654] block mb-1">보유 자격증</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCert();
                  }
                }}
                placeholder="자격증 이름 입력 (예: 컴퓨터활용능력 1급)"
                className="flex-1 px-3 py-2 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] focus:bg-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddCert}
                className="px-4 py-2 bg-[#003fb1] text-white rounded-xl text-xs font-bold hover:bg-[#002d80]"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4]">
              {formData.certificates.map((cert) => (
                <span
                  key={cert}
                  className="px-2.5 py-1 bg-[#dbe1ff] text-[#00174d] rounded-full text-xs font-semibold flex items-center gap-1"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(cert)}
                    className="hover:text-[#ba1a1a]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Region Status */}
          <div className="space-y-2 pt-1 border-t border-[#e1e3e4]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#191c1d]">
              <input
                type="checkbox"
                checked={formData.isNonCapitalGraduate}
                onChange={(e) =>
                  setFormData({ ...formData, isNonCapitalGraduate: e.target.checked })
                }
                className="w-4 h-4 rounded text-[#003fb1] focus:ring-[#003fb1] accent-[#003fb1]"
              />
              비수도권 지방인재 전형 대상자
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#191c1d]">
              <input
                type="checkbox"
                checked={formData.isLocalAreaGraduate}
                onChange={(e) =>
                  setFormData({ ...formData, isLocalAreaGraduate: e.target.checked })
                }
                className="w-4 h-4 rounded text-[#003fb1] focus:ring-[#003fb1] accent-[#003fb1]"
              />
              이전지역(지방 혁신도시 소재 대학) 인재 대상자
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              저장 및 가점 재계산
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-[#edeeef] text-[#434654] hover:bg-[#e1e3e4] rounded-xl text-xs font-bold transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
