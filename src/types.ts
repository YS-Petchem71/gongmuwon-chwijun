export type TierLevel = 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C';
export type JobCategory = '전체' | '사무/행정' | '기술/엔지니어' | '금융' | '보건/복지' | '에너지/발전' | 'SOC/교통';

export interface SpecCriteriaItem {
  id: string;
  category: '자격증' | '어학' | '우대사항';
  name: string;
  description: string;
  points: number;
  maxPoints?: number;
  acquired: boolean;
  extraInfo?: string;
}

export interface StarGuide {
  s: string;
  t: string;
  a: string;
  r: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  type: '인성/가치관' | '경험/직무' | '상황/대처' | '시사/전공';
  frequency: 'High Frequency' | 'Medium Frequency';
  guide: string;
  starGuide?: StarGuide;
}

export interface Enterprise {
  id: string;
  name: string;
  englishName?: string;
  category: string;
  jobCategory: JobCategory;
  tier: TierLevel;
  salaryRange: string;
  salaryStars: number;
  workLifeStars: number;
  competitionRate: '최상' | '상' | '중' | '보통';
  competitionScoreLabel?: string;
  headquarters: string;
  workingLocation: string;
  dDay: number;
  dDayText: string;
  matchRate: number;
  isBookmarked?: boolean;
  logoUrl?: string;
  badgeBgColor?: string;
  hiringInfo: {
    status: '접수중' | '마감임박' | '예정';
    period: string;
    positions: string;
    totalHiring: number;
    description: string;
  };
  specItems: SpecCriteriaItem[];
  interviewQuestions: InterviewQuestion[];
}

export interface UserSpecProfile {
  name: string;
  education: string;
  major: string;
  gpa: number;
  gpaMax: number;
  certificates: string[];
  toeicScore: number;
  toeicDDay: number;
  toeicSpeaking?: string;
  isNonCapitalGraduate: boolean;
  isLocalAreaGraduate: boolean;
  otherCertificates: string[];
}

export interface WeeklyRoutineItem {
  id: string;
  dayLabel: string;
  title: string;
  completed: boolean;
  isToday?: boolean;
}

export interface RecommendedSpec {
  id: string;
  step: number;
  title: string;
  description: string;
  actionText: string;
  impactTier: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
}

export type TabType = 'dashboard' | 'tierlist' | 'specAnalysis' | 'community';
export type DetailTabType = 'hiring' | 'specScore' | 'interview';
