import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Target, Activity, Clock, CheckCircle, Star } from 'lucide-react';

interface ProgressDashboardProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

interface ProgressData {
  patternsCompleted: number;
  hoursSpent: number;
  streakDays: number;
  achievements: string[];
  weeklyActivity: number[];
  skillRatings: { [key: string]: number };
}

const translations = {
  en: {
    title: 'Progress Dashboard',
    subtitle: 'Track your weaving journey and achievements',
    overview: 'Overview',
    patternsCompleted: 'Patterns Completed',
    hoursSpent: 'Hours Spent Learning',
    currentStreak: 'Current Streak',
    days: 'days',
    level: 'Level',
    experience: 'Experience Points',
    weeklyActivity: 'Weekly Activity',
    skillProgress: 'Skill Progress',
    achievements: 'Achievements',
    recentActivity: 'Recent Activity',
    skills: {
      'Pattern Design': 'Pattern Design',
      'Color Theory': 'Color Theory',
      'Technical Skills': 'Technical Skills',
      'Traditional Methods': 'Traditional Methods',
    },
    achievementsList: [
      'First Pattern Created',
      'Learning Streak - 7 Days',
      'Pattern Master - 10 Patterns',
      'Color Expert',
      'Community Contributor',
    ],
    activities: [
      'Completed "Introduction to Weaving" module',
      'Created first plain weave pattern',
      'Shared pattern in community gallery',
      'Achieved 7-day learning streak',
      'Mastered color theory basics',
    ],
  },
  ta: {
    title: 'முன்னேற்ற டாஷ்போர்ட்',
    subtitle: 'உங்கள் நெசவு பயணம் மற்றும் சாதனைகளைக் கண்காணிக்கவும்',
    overview: 'கண்ணோட்டம்',
    patternsCompleted: 'முடிக்கப்பட்ட பேட்டர்ன்கள்',
    hoursSpent: 'கற்றலில் செலவிட்ட மணிநேரங்கள்',
    currentStreak: 'தற்போதைய தொடர்ச்சி',
    days: 'நாட்கள்',
    level: 'நிலை',
    experience: 'அனுபவ புள்ளிகள்',
    weeklyActivity: 'வாராந்திர செயல்பாடு',
    skillProgress: 'திறன் முன்னேற்றம்',
    achievements: 'சாதனைகள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    skills: {
      'Pattern Design': 'பேட்டர்ன் வடிவமைப்பு',
      'Color Theory': 'வண்ண கோட்பாடு',
      'Technical Skills': 'தொழில்நுட்ப திறன்கள்',
      'Traditional Methods': 'பாரம்பரிய முறைகள்',
    },
    achievementsList: [
      'முதல் பேட்டர்ன் உருவாக்கப்பட்டது',
      'கற்றல் தொடர்ச்சி - 7 நாட்கள்',
      'பேட்டர்ன் மாஸ்டர் - 10 பேட்டர்ன்கள்',
      'வண்ண வல்லுநர்',
      'சமூக பங்களிப்பாளர்',
    ],
    activities: [
      '"நெசவு அறிமுகம்" தொகுதி முடிக்கப்பட்டது',
      'முதல் வெற்று நெசவு பேட்டர்ன் உருவாக்கப்பட்டது',
      'சமூக கேலரியில் பேட்டர்ன் பகிரப்பட்டது',
      '7 நாள் கற்றல் தொடர்ச்சி அடைந்தது',
      'வண்ண கோட்பாடு அடிப்படைகளில் தேர்ச்சி பெற்றது',
    ],
  },
  hi: {
    title: 'प्रगति डैशबोर्ड',
    subtitle: 'अपनी बुनाई यात्रा और उपलब्धियों को ट्रैक करें',
    overview: 'अवलोकन',
    patternsCompleted: 'पूरे किए गए पैटर्न',
    hoursSpent: 'सीखने में बिताए घंटे',
    currentStreak: 'वर्तमान स्ट्रीक',
    days: 'दिन',
    level: 'स्तर',
    experience: 'अनुभव अंक',
    weeklyActivity: 'साप्ताहिक गतिविधि',
    skillProgress: 'कौशल प्रगति',
    achievements: 'उपलब्धियां',
    recentActivity: 'हाल की गतिविधि',
    skills: {
      'Pattern Design': 'पैटर्न डिज़ाइन',
      'Color Theory': 'रंग सिद्धांत',
      'Technical Skills': 'तकनीकी कौशल',
      'Traditional Methods': 'पारंपरिक तरीके',
    },
    achievementsList: [
      'पहला पैटर्न बनाया गया',
      'सीखने की स्ट्रीक - 7 दिन',
      'पैटर्न मास्टर - 10 पैटर्न',
      'रंग विशेषज्ञ',
      'समुदायिक योगदानकर्ता',
    ],
    activities: [
      '"बुनाई का परिचय" मॉड्यूल पूरा किया',
      'पहला सादा बुनाई पैटर्न बनाया',
      'कम्युनिटी गैलरी में पैटर्न साझा किया',
      '7 दिन की सीखने की स्ट्रीक हासिल की',
      'रंग सिद्धांत की मूल बातें सीखीं',
    ],
  },
};

export default function ProgressDashboard({ language, speak, userLevel, totalExp }: ProgressDashboardProps) {
  const [progressData, setProgressData] = useState<ProgressData>({
    patternsCompleted: 0,
    hoursSpent: 0,
    streakDays: 0,
    achievements: [],
    weeklyActivity: [3, 5, 2, 8, 4, 6, 7],
    skillRatings: {
      'Pattern Design': 65,
      'Color Theory': 45,
      'Technical Skills': 55,
      'Traditional Methods': 35,
    }
  });

  const t = translations[language];

  useEffect(() => {
    // Load progress data from localStorage
    const savedProgress = localStorage.getItem('weavingProgress');
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    }

    // Update based on user activity
    const patterns = JSON.parse(localStorage.getItem('weavingPatterns') || '[]');
    setProgressData(prev => ({
      ...prev,
      patternsCompleted: patterns.length,
      hoursSpent: Math.floor(totalExp / 10), // Rough conversion
      streakDays: Math.floor(totalExp / 50), // Another rough conversion
      achievements: totalExp > 100 ? ['First Pattern Created', 'Learning Streak - 7 Days'] : ['First Pattern Created']
    }));
  }, [totalExp]);

  const expToNextLevel = 100;
  const currentLevelExp = totalExp % expToNextLevel;
  const progressPercentage = (currentLevelExp / expToNextLevel) * 100;

  const maxActivity = Math.max(...progressData.weeklyActivity);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.patternsCompleted}</p>
              <p className="text-3xl font-bold text-gray-900">{progressData.patternsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.hoursSpent}</p>
              <p className="text-3xl font-bold text-gray-900">{progressData.hoursSpent}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.currentStreak}</p>
              <p className="text-3xl font-bold text-gray-900">{progressData.streakDays} <span className="text-lg font-normal text-gray-600">{t.days}</span></p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.level} {userLevel}</p>
              <p className="text-lg font-semibold text-gray-900">{currentLevelExp}/100 XP</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            {t.weeklyActivity}
          </h3>
          <div className="flex items-end justify-between space-x-2 h-32">
            {progressData.weeklyActivity.map((activity, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(activity / maxActivity) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            {t.skillProgress}
          </h3>
          <div className="space-y-4">
            {Object.entries(progressData.skillRatings).map(([skill, rating]) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{t.skills[skill as keyof typeof t.skills]}</span>
                  <span className="text-sm text-gray-600">{rating}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${rating}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            {t.achievements}
          </h3>
          <div className="space-y-3">
            {t.achievementsList.map((achievement, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  progressData.achievements.includes(achievement) || index < progressData.achievements.length
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-gray-50 border border-gray-200 opacity-60'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  progressData.achievements.includes(achievement) || index < progressData.achievements.length
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <span className={`font-medium ${
                  progressData.achievements.includes(achievement) || index < progressData.achievements.length
                    ? 'text-gray-800'
                    : 'text-gray-500'
                }`}>
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            {t.recentActivity}
          </h3>
          <div className="space-y-3">
            {t.activities.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}