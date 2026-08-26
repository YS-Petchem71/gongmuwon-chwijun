import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEnterpriseById: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEnterpriseById,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: '한국철도공사 (코레일) 서류 마감 D-12 알림',
      description: '사무영업/운전/차량 원서 접수가 12일 후 마감됩니다. 서류 가점을 최종 점검하세요.',
      enterpriseId: 'korail',
      time: '10분 전',
      unread: true,
    },
    {
      id: 'notif-2',
      title: '한국전력공사 (KEPCO) 신규 면접 기출 문항 업데이트',
      description: '2026년 하반기 에너지 신사업 및 STAR 답변 가이드 4문항이 추가되었습니다.',
      enterpriseId: 'kepco',
      time: '1시간 전',
      unread: true,
    },
    {
      id: 'notif-3',
      title: '오늘의 NCS 데일리 루틴 미완료',
      description: '화요일 (오늘): NCS 의사소통능력 50제 풀이 일정이 등록되어 있습니다.',
      time: '3시간 전',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col animate-slideLeft border-l border-[#e1e3e4]">
        <div className="p-4 border-b border-[#e1e3e4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003fb1] text-[22px]">
              notifications
            </span>
            <h3 className="text-base font-bold text-[#191c1d]">채용 및 루틴 알림</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#737686] hover:text-[#191c1d] p-1 rounded-full hover:bg-[#f3f4f5]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.enterpriseId) {
                  onSelectEnterpriseById(n.enterpriseId);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                n.unread
                  ? 'bg-[#dbe1ff]/30 border-[#003fb1]/30 hover:bg-[#dbe1ff]/50'
                  : 'bg-[#f8f9fa] border-[#e1e3e4] hover:bg-[#edeeef]'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xs font-bold text-[#191c1d] leading-snug">{n.title}</h4>
                {n.unread && <span className="w-2 h-2 rounded-full bg-[#ba1a1a] shrink-0 mt-1" />}
              </div>
              <p className="text-[11px] text-[#434654] leading-relaxed mb-2">{n.description}</p>
              <span className="text-[10px] text-[#737686]">{n.time}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#e1e3e4] bg-[#f8f9fa]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#434654] rounded-xl text-xs font-bold transition-colors"
          >
            모두 확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
