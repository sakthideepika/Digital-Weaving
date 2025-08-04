import React from 'react';
import { Globe } from 'lucide-react';

type Language = 'en' | 'ta' | 'hi';

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ta' as Language, name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
];

export default function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {languages.find(l => l.code === language)?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                language === lang.code ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}