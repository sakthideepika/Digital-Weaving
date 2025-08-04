import React, { useState, useEffect } from 'react';
import { Palette, BookOpen, MessageCircle, TrendingUp, Share2, Library, Menu, X, Volume2 } from 'lucide-react';
import PatternSimulator from './components/PatternSimulator';
import LearningAssistant from './components/LearningAssistant';
import Chatbot from './components/Chatbot';
import ProgressDashboard from './components/ProgressDashboard';
import PatternGallery from './components/PatternGallery';
import PatternLibrary from './components/PatternLibrary';
import LanguageSelector from './components/LanguageSelector';
import GamefiedProgress from './components/GamefiedProgress';

type Language = 'en' | 'ta' | 'hi';
type ActiveTab = 'simulator' | 'learning' | 'chatbot' | 'progress' | 'gallery' | 'library';

const translations = {
  en: {
    title: 'WeaveLearn',
    subtitle: 'Master the Art of Weaving',
    simulator: 'Pattern Simulator',
    learning: 'Learning Center',
    chatbot: 'AI Assistant',
    progress: 'Progress',
    gallery: 'Gallery',
    library: 'Pattern Library',
  },
  ta: {
    title: 'நெசவுகற்றல்',
    subtitle: 'நெசவு கலையில் தேர்ச்சி பெறுங்கள்',
    simulator: 'பேட்டர்ன் சிமுலேட்டர்',
    learning: 'கற்றல் மையம்',
    chatbot: 'AI உதவியாளர்',
    progress: 'முன்னேற்றம்',
    gallery: 'கேலரி',
    library: 'பேட்டர்ன் நூலகம்',
  },
  hi: {
    title: 'बुनाई सीखें',
    subtitle: 'बुनाई की कला में महारत हासिल करें',
    simulator: 'पैटर्न सिमुलेटर',
    learning: 'शिक्षा केंद्र',
    chatbot: 'AI सहायक',
    progress: 'प्रगति',
    gallery: 'गैलरी',
    library: 'पैटर्न पुस्तकालय',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator');
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [totalExp, setTotalExp] = useState(0);

  const t = translations[language];

  // Text-to-Speech functionality
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const navigationItems = [
    { id: 'simulator' as ActiveTab, label: t.simulator, icon: Palette, color: 'text-blue-600' },
    { id: 'learning' as ActiveTab, label: t.learning, icon: BookOpen, color: 'text-green-600' },
    { id: 'chatbot' as ActiveTab, label: t.chatbot, icon: MessageCircle, color: 'text-purple-600' },
    { id: 'progress' as ActiveTab, label: t.progress, icon: TrendingUp, color: 'text-orange-600' },
    { id: 'gallery' as ActiveTab, label: t.gallery, icon: Share2, color: 'text-pink-600' },
    { id: 'library' as ActiveTab, label: t.library, icon: Library, color: 'text-indigo-600' },
  ];

  const renderActiveComponent = () => {
    const props = { language, speak, userLevel, setUserLevel, totalExp, setTotalExp };
    
    switch (activeTab) {
      case 'simulator':
        return <PatternSimulator {...props} />;
      case 'learning':
        return <LearningAssistant {...props} />;
      case 'chatbot':
        return <Chatbot {...props} />;
      case 'progress':
        return <ProgressDashboard {...props} />;
      case 'gallery':
        return <PatternGallery {...props} />;
      case 'library':
        return <PatternLibrary {...props} />;
      default:
        return <PatternSimulator {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-sm text-gray-600 hidden sm:block">{t.subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white shadow-md text-gray-800'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? item.color : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              <GamefiedProgress level={userLevel} exp={totalExp} />
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <button
                onClick={() => speak(t.subtitle)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
                title="Read aloud"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-orange-200">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? item.color : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;