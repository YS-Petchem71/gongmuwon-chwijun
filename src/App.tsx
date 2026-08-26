import React, { useState } from 'react';
import {
  TabType,
  Enterprise,
  UserSpecProfile,
  WeeklyRoutineItem,
  InterviewQuestion,
} from './types';
import {
  initialUserProfile,
  initialWeeklyRoutine,
  recommendedSpecs,
  enterprisesData,
  communityPostsData,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { TierListView } from './components/TierListView';
import { SpecAnalysisView } from './components/SpecAnalysisView';
import { EnterpriseDetailView } from './components/EnterpriseDetailView';
import { CommunityView } from './components/CommunityView';
import { AiMockInterviewModal } from './components/AiMockInterviewModal';
import { TierCriteriaModal } from './components/TierCriteriaModal';
import { SpecEditModal } from './components/SpecEditModal';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
  const [userProfile, setUserProfile] = useState<UserSpecProfile>(initialUserProfile);
  const [weeklyRoutine, setWeeklyRoutine] = useState<WeeklyRoutineItem[]>(initialWeeklyRoutine);
  const [enterprises, setEnterprises] = useState<Enterprise[]>(enterprisesData);

  // Modals & Panels state
  const [isSpecEditOpen, setIsSpecEditOpen] = useState(false);
  const [isTierCriteriaOpen, setIsTierCriteriaOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [aiInterviewModal, setAiInterviewModal] = useState<{
    question: InterviewQuestion;
    enterpriseName: string;
  } | null>(null);

  // Toggle routine item completion
  const handleToggleRoutine = (id: string) => {
    setWeeklyRoutine((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Toggle enterprise bookmark
  const handleBookmarkToggle = (enterpriseId: string) => {
    setEnterprises((prev) =>
      prev.map((e) =>
        e.id === enterpriseId ? { ...e, isBookmarked: !e.isBookmarked } : e
      )
    );
    if (selectedEnterprise && selectedEnterprise.id === enterpriseId) {
      setSelectedEnterprise((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );
    }
  };

  // Save updated user profile and recalculate match rates
  const handleSaveProfile = (updated: UserSpecProfile) => {
    setUserProfile(updated);

    // Dynamically recalculate enterprise match rate based on user specs
    const updatedEnterprises = enterprises.map((ent) => {
      let score = 70;
      if (updated.toeicScore >= 850) score += 10;
      else if (updated.toeicScore >= 750) score += 5;

      if (updated.certificates.includes('한국사 1급') || updated.certificates.includes('한국사능력검정시험 1급')) {
        score += 5;
      }
      if (updated.certificates.includes('컴퓨터활용능력 1급')) {
        score += 5;
      }
      if (updated.isNonCapitalGraduate) {
        score += 5;
      }
      if (updated.gpa >= 3.8) {
        score += 3;
      }
      return {
        ...ent,
        matchRate: Math.min(98, score),
      };
    });

    setEnterprises(updatedEnterprises);
  };

  const handleSelectEnterpriseById = (id: string) => {
    const found = enterprises.find((e) => e.id === id);
    if (found) {
      setSelectedEnterprise(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans selection:bg-[#dbe1ff] selection:text-[#00174d]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        selectedEnterpriseId={selectedEnterprise?.id || null}
        onBack={() => setSelectedEnterprise(null)}
        onOpenSpecEdit={() => setIsSpecEditOpen(true)}
        userProfile={userProfile}
        onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar + Mobile Bottom Nav */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={(tab) => {
            setCurrentTab(tab);
            setSelectedEnterprise(null);
          }}
        />

        {/* Content Canvas */}
        <main className="flex-1 px-4 md:px-8 py-6 md:ml-64 transition-all max-w-6xl w-full mx-auto">
          {selectedEnterprise ? (
            <EnterpriseDetailView
              enterprise={selectedEnterprise}
              initialTab="specScore"
              onBookmarkToggle={handleBookmarkToggle}
              onOpenAiInterview={(q, entName) => {
                setAiInterviewModal({ question: q, enterpriseName: entName });
              }}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardView
                  userProfile={userProfile}
                  enterprises={enterprises}
                  weeklyRoutine={weeklyRoutine}
                  onToggleRoutine={handleToggleRoutine}
                  onSelectEnterprise={(ent) => setSelectedEnterprise(ent)}
                  onNavigateToTab={(tab) => setCurrentTab(tab)}
                />
              )}

              {currentTab === 'tierlist' && (
                <TierListView
                  enterprises={enterprises}
                  onSelectEnterprise={(ent) => setSelectedEnterprise(ent)}
                  onOpenCriteriaModal={() => setIsTierCriteriaOpen(true)}
                />
              )}

              {currentTab === 'specAnalysis' && (
                <SpecAnalysisView
                  userProfile={userProfile}
                  recommendedSpecs={recommendedSpecs}
                  enterprises={enterprises}
                  onOpenSpecEdit={() => setIsSpecEditOpen(true)}
                  onSelectEnterprise={(ent) => setSelectedEnterprise(ent)}
                />
              )}

              {currentTab === 'community' && (
                <CommunityView posts={communityPostsData} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      {aiInterviewModal && (
        <AiMockInterviewModal
          question={aiInterviewModal.question}
          enterpriseName={aiInterviewModal.enterpriseName}
          onClose={() => setAiInterviewModal(null)}
        />
      )}

      <TierCriteriaModal
        isOpen={isTierCriteriaOpen}
        onClose={() => setIsTierCriteriaOpen(false)}
      />

      <SpecEditModal
        isOpen={isSpecEditOpen}
        userProfile={userProfile}
        onSave={handleSaveProfile}
        onClose={() => setIsSpecEditOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectEnterpriseById={handleSelectEnterpriseById}
      />
    </div>
  );
}
