import React from 'react';
import { TabType, UserSpecProfile } from '../types';

interface HeaderProps {
  currentTab: TabType;
  selectedEnterpriseId: string | null;
  onBack: () => void;
  onOpenSpecEdit: () => void;
  userProfile: UserSpecProfile;
  unreadCount?: number;
  onToggleNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedEnterpriseId,
  onBack,
  onOpenSpecEdit,
  userProfile,
  unreadCount = 2,
  onToggleNotifications,
}) => {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-[#e1e3e4] shadow-xs px-4 md:px-8 h-16 w-full flex justify-between items-center transition-colors">
      <div className="flex items-center gap-3">
        {selectedEnterpriseId ? (
          <button
            onClick={onBack}
            className="text-[#434654] hover:bg-[#f3f4f5] active:bg-[#e7e8e9] p-2 rounded-full flex items-center justify-center transition-colors"
            title="뒤로 가기"
            aria-label="뒤로 가기"
          >
            <span className="material-symbols-outlined text-[#003fb1] font-bold text-2xl">
              arrow_back
            </span>
          </button>
        ) : (
          <div
            onClick={onOpenSpecEdit}
            className="w-9 h-9 rounded-full overflow-hidden bg-[#e7e8e9] border border-[#c3c5d7] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#1a56db] transition-all shrink-0"
            title="내 프로필 / 스펙 관리"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMXGVNUPVwUfrUfvIoktDNTCuQ5jeMBk0zbpDxMmqDNR77_GAfVdBKUgS5aS1xaeexheTJLY2Hw6i_pmaSSGw_QyK71UmYD7O1JXcHuZbD7VcxDkvsUuQ-_YXJfbiWrT5Kt01Lm-LtHRWnQxhH-NsvqKqVWK8V7-1uL_RsBFJp1Ub9D5UqIUuSTdswpHuy_D7IVoodWoYHzHgoLMN762xwExQCs3H2MFrcGK3-k1md8jatjDtHhKJc"
              alt="사용자 프로필"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#003fb1] font-sans">
            JOB PREP
          </h1>
          <span className="hidden sm:inline-block text-xs text-[#737686] font-medium bg-[#edeeef] px-2 py-0.5 rounded-full">
            공공기관 취업 포털
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleNotifications}
          className="relative text-[#434654] hover:bg-[#f3f4f5] active:bg-[#e7e8e9] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          title="알림"
          aria-label="알림"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>

        <button
          onClick={onOpenSpecEdit}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-[#f3f4f5] transition-colors border border-transparent hover:border-[#c3c5d7]"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e1e3e4] border border-[#c3c5d7] shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXlY5RRhaz928UXGmrLsivBO-i8yv7f-c3r86slXF6Fb7vOSh0PEfRca5AW2ry1lamRfPZsxlc1l5e7M1mw15H4-X-UosOTQ7J3Fc3cB0qLX4RSKnMUTeJcUUWJaDv1HK2nvUSg1ZCYBMg1hx9TRZIuS4g3fDMjZp-rM8YDK9MUageBcQ3iW_qzgrA99ZfOm8zOl3GWrcE1SBynkq86jzR3--EI_hO1Fm6ab1DIhBbigmKPMuRZaN0"
              alt="User profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="hidden md:inline-block text-sm font-semibold text-[#191c1d]">
            {userProfile.name}님
          </span>
        </button>
      </div>
    </header>
  );
};
