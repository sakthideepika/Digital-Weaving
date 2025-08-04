import React, { useState, useEffect } from 'react';
import { Heart, Share2, Download, Eye, MessageCircle, Plus, Filter, Search } from 'lucide-react';

interface PatternGalleryProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

interface Pattern {
  id: string;
  name: string;
  author: string;
  imageUrl: string;
  likes: number;
  views: number;
  comments: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  liked: boolean;
  description: string;
  tags: string[];
}

const translations = {
  en: {
    title: 'Pattern Gallery',
    subtitle: 'Share and discover beautiful weaving patterns from the community',
    myPatterns: 'My Patterns',
    communityPatterns: 'Community Patterns',
    uploadPattern: 'Upload Pattern',
    searchPlaceholder: 'Search patterns...',
    filterBy: 'Filter by',
    allCategories: 'All Categories',
    traditional: 'Traditional',
    modern: 'Modern',
    geometric: 'Geometric',
    floral: 'Floral',
    abstract: 'Abstract',
    difficulty: 'Difficulty',
    allLevels: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    likes: 'Likes',
    views: 'Views',
    comments: 'Comments',
    download: 'Download',
    share: 'Share',
    like: 'Like',
  },
  ta: {
    title: 'பேட்டர்ன் கேலரி',
    subtitle: 'சமூகத்திலிருந்து அழகான நெசவு பேட்டர்ன்களைப் பகிரவும் கண்டறியவும்',
    myPatterns: 'என் பேட்டர்ன்கள்',
    communityPatterns: 'சமூக பேட்டர்ன்கள்',
    uploadPattern: 'பேட்டர்ன் பதிவேற்று',
    searchPlaceholder: 'பேட்டர்ன்களைத் தேடு...',
    filterBy: 'வடிகட்டு',
    allCategories: 'அனைத்து வகைகள்',
    traditional: 'பாரம்பரிய',
    modern: 'நவீன',
    geometric: 'வடிவியல்',
    floral: 'பூ வடிவ',
    abstract: 'சுருக்க',
    difficulty: 'சிரமம்',
    allLevels: 'அனைத்து நிலைகள்',
    beginner: 'ஆரம்பநிலை',
    intermediate: 'இடைநிலை',
    advanced: 'மேம்பட்ட',
    likes: 'விருப்பங்கள்',
    views: 'பார்வைகள்',
    comments: 'கருத்துகள்',
    download: 'பதிவிறக்கம்',
    share: 'பகிர்',
    like: 'விருப்பம்',
  },
  hi: {
    title: 'पैटर्न गैलरी',
    subtitle: 'समुदाय से सुंदर बुनाई पैटर्न साझा करें और खोजें',
    myPatterns: 'मेरे पैटर्न',
    communityPatterns: 'समुदायिक पैटर्न',
    uploadPattern: 'पैटर्न अपलोड करें',
    searchPlaceholder: 'पैटर्न खोजें...',
    filterBy: 'फिल्टर करें',
    allCategories: 'सभी श्रेणियां',
    traditional: 'पारंपरिक',
    modern: 'आधुनिक',
    geometric: 'ज्यामितीय',
    floral: 'पुष्प',
    abstract: 'अमूर्त',
    difficulty: 'कठिनाई',
    allLevels: 'सभी स्तर',
    beginner: 'शुरुआती',
    intermediate: 'मध्यम',
    advanced: 'उन्नत',
    likes: 'पसंद',
    views: 'दृश्य',
    comments: 'टिप्पणियां',
    download: 'डाउनलोड',
    share: 'साझा करें',
    like: 'पसंद',
  },
};

const samplePatterns: Pattern[] = [
  {
    id: '1',
    name: 'Traditional Chevron',
    author: 'Maya Patel',
    imageUrl: 'https://images.pexels.com/photos/6069866/pexels-photo-6069866.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 24,
    views: 156,
    comments: 8,
    category: 'Traditional',
    difficulty: 'Intermediate',
    liked: false,
    description: 'A classic chevron pattern with traditional color combinations',
    tags: ['chevron', 'traditional', 'geometric']
  },
  {
    id: '2',
    name: 'Modern Abstract',
    author: 'Alex Chen',
    imageUrl: 'https://images.pexels.com/photos/4846433/pexels-photo-4846433.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 31,
    views: 203,
    comments: 12,
    category: 'Modern',
    difficulty: 'Advanced',
    liked: true,
    description: 'Contemporary abstract design with bold color blocking',
    tags: ['abstract', 'modern', 'colorful']
  },
  {
    id: '3',
    name: 'Floral Motif',
    author: 'Priya Singh',
    imageUrl: 'https://images.pexels.com/photos/7262776/pexels-photo-7262776.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 18,
    views: 89,
    comments: 5,
    category: 'Floral',
    difficulty: 'Beginner',
    liked: false,
    description: 'Delicate floral pattern perfect for beginners',
    tags: ['floral', 'delicate', 'nature']
  },
  {
    id: '4',
    name: 'Geometric Diamonds',
    author: 'Sarah Johnson',
    imageUrl: 'https://images.pexels.com/photos/6238235/pexels-photo-6238235.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 42,
    views: 278,
    comments: 15,
    category: 'Geometric',
    difficulty: 'Intermediate',
    liked: true,
    description: 'Bold diamond pattern with striking contrast',
    tags: ['geometric', 'diamonds', 'bold']
  },
  {
    id: '5',
    name: 'Minimalist Lines',
    author: 'David Kim',
    imageUrl: 'https://images.pexels.com/photos/8892327/pexels-photo-8892327.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 15,
    views: 134,
    comments: 7,
    category: 'Modern',
    difficulty: 'Beginner',
    liked: false,
    description: 'Clean minimalist design with simple lines',
    tags: ['minimalist', 'lines', 'simple']
  },
  {
    id: '6',
    name: 'Celtic Knot',
    author: 'Emma Walsh',
    imageUrl: 'https://images.pexels.com/photos/8892316/pexels-photo-8892316.jpeg?auto=compress&cs=tinysrgb&w=300',
    likes: 33,
    views: 187,
    comments: 9,
    category: 'Traditional',
    difficulty: 'Advanced',
    liked: false,
    description: 'Intricate Celtic knot pattern with traditional symbolism',
    tags: ['celtic', 'knot', 'intricate']
  },
];

export default function PatternGallery({ language, speak, setTotalExp, totalExp }: PatternGalleryProps) {
  const [patterns, setPatterns] = useState<Pattern[]>(samplePatterns);
  const [activeTab, setActiveTab] = useState<'community' | 'my'>('community');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [myPatterns, setMyPatterns] = useState<Pattern[]>([]);

  const t = translations[language];

  useEffect(() => {
    // Load user's patterns from localStorage
    const savedPatterns = JSON.parse(localStorage.getItem('weavingPatterns') || '[]');
    const userPatterns = savedPatterns.map((pattern: any, index: number) => ({
      id: `user-${pattern.id}`,
      name: pattern.name || `My Pattern ${index + 1}`,
      author: 'You',
      imageUrl: pattern.dataURL,
      likes: 0,
      views: 0,
      comments: 0,
      category: 'Custom',
      difficulty: 'Beginner' as const,
      liked: false,
      description: 'Your custom weaving pattern',
      tags: ['custom', 'personal']
    }));
    setMyPatterns(userPatterns);
  }, []);

  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                          selectedCategory === t.allCategories ||
                          pattern.category === selectedCategory;
    
    const matchesDifficulty = selectedDifficulty === 'All Levels' || 
                            selectedDifficulty === t.allLevels ||
                            pattern.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const displayPatterns = activeTab === 'community' ? filteredPatterns : myPatterns;

  const handleLike = (patternId: string) => {
    setPatterns(prev => prev.map(pattern => 
      pattern.id === patternId 
        ? { ...pattern, liked: !pattern.liked, likes: pattern.liked ? pattern.likes - 1 : pattern.likes + 1 }
        : pattern
    ));
    setTotalExp(totalExp + 3);
  };

  const handleDownload = (pattern: Pattern) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = pattern.imageUrl;
    link.download = `${pattern.name.replace(/\s+/g, '-')}.png`;
    link.click();
    setTotalExp(totalExp + 5);
  };

  const handleShare = (pattern: Pattern) => {
    if (navigator.share) {
      navigator.share({
        title: pattern.name,
        text: pattern.description,
        url: window.location.href
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      speak(language === 'en' ? 'Link copied to clipboard' : language === 'ta' ? 'இணைப்பு கிளிப்போர்டில் நகலெடுக்கப்பட்டது' : 'लिंक क्लिपबोर्ड में कॉपी किया गया');
    }
    setTotalExp(totalExp + 2);
  };

  const categories = [t.allCategories, t.traditional, t.modern, t.geometric, t.floral, t.abstract];
  const difficulties = [t.allLevels, t.beginner, t.intermediate, t.advanced];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setActiveTab('community')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'community'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {t.communityPatterns}
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'my'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {t.myPatterns} ({myPatterns.length})
        </button>
      </div>

      {/* Search and Filters */}
      {activeTab === 'community' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayPatterns.map((pattern) => (
          <div key={pattern.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Pattern Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={pattern.imageUrl}
                alt={pattern.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Pattern Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{pattern.name}</h3>
                  <p className="text-sm text-gray-600">by {pattern.author}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  pattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  pattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pattern.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{pattern.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {pattern.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className={`w-4 h-4 ${pattern.liked ? 'text-red-500 fill-current' : ''}`} />
                    <span>{pattern.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{pattern.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{pattern.comments}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLike(pattern.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pattern.liked
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${pattern.liked ? 'fill-current' : ''}`} />
                  <span>{t.like}</span>
                </button>

                <button
                  onClick={() => handleDownload(pattern)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.download}</span>
                </button>

                <button
                  onClick={() => handleShare(pattern)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.share}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayPatterns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {activeTab === 'my' 
              ? (language === 'en' ? 'No patterns yet' : language === 'ta' ? 'இன்னும் பேட்டர்ன்கள் இல்லை' : 'अभी तक कोई पैटर्न नहीं')
              : (language === 'en' ? 'No patterns found' : language === 'ta' ? 'பேட்டர்ன்கள் கிடைக்கவில்லை' : 'कोई पैटर्न नहीं मिला')
            }
          </h3>
          <p className="text-gray-600">
            {activeTab === 'my'
              ? (language === 'en' ? 'Create your first pattern in the simulator' : language === 'ta' ? 'சிமுலேட்டரில் உங்கள் முதல் பேட்டர்னை உருவாக்குங்கள்' : 'सिमुलेटर में अपना पहला पैटर्न बनाएं')
              : (language === 'en' ? 'Try adjusting your search or filters' : language === 'ta' ? 'உங்கள் தேடல் அல்லது வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்' : 'अपनी खोज या फ़िल्टर को समायोजित करने का प्रयास करें')
            }
          </p>
        </div>
      )}
    </div>
  );
}