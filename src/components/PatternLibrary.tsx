import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Heart, Star, Grid, List } from 'lucide-react';

interface PatternLibraryProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

interface LibraryPattern {
  id: string;
  name: string;
  region: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  description: string;
  instructions: string;
  materials: string[];
  tags: string[];
  rating: number;
  downloads: number;
  isFavorited: boolean;
}

const translations = {
  en: {
    title: 'Pattern Library',
    subtitle: 'Explore hundreds of traditional and modern weaving patterns',
    searchPlaceholder: 'Search patterns by name, region, or technique...',
    filterBy: 'Filter by',
    allCategories: 'All Categories',
    traditional: 'Traditional',
    modern: 'Modern',
    geometric: 'Geometric',
    floral: 'Floral',
    abstract: 'Abstract',
    allRegions: 'All Regions',
    difficulty: 'Difficulty',
    allLevels: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    gridView: 'Grid View',
    listView: 'List View',
    download: 'Download',
    favorite: 'Favorite',
    rating: 'Rating',
    downloads: 'Downloads',
    viewInstructions: 'View Instructions',
    materials: 'Materials',
    instructions: 'Instructions',
  },
  ta: {
    title: 'பேட்டர்ன் நூலகம்',
    subtitle: 'நூற்றுக்கணக்கான பாரம்பரிய மற்றும் நவீன நெசவுப் பேட்டர்ன்களை ஆராயுங்கள்',
    searchPlaceholder: 'பெயர், பகுதி அல்லது நுட்பத்தால் பேட்டர்ன்களைத் தேடுங்கள்...',
    filterBy: 'வடிகட்டு',
    allCategories: 'அனைத்து வகைகள்',
    traditional: 'பாரம்பரிய',
    modern: 'நவீன',
    geometric: 'வடிவியல்',
    floral: 'பூ வடிவ',
    abstract: 'சுருக்க',
    allRegions: 'அனைத்து பகுதிகள்',
    difficulty: 'சிரமம்',
    allLevels: 'அனைத்து நிலைகள்',
    beginner: 'ஆரம்பநிலை',
    intermediate: 'இடைநிலை',
    advanced: 'மேம்பட்ட',
    gridView: 'கிரிட் பார்வை',
    listView: 'பட்டியல் பார்வை',
    download: 'பதிவிறக்கம்',
    favorite: 'விருப்பம்',
    rating: 'மதிப்பீடு',
    downloads: 'பதிவிறக்கங்கள்',
    viewInstructions: 'வழிமுறைகளைப் பார்க்கவும்',
    materials: 'பொருட்கள்',
    instructions: 'வழிமுறைகள்',
  },
  hi: {
    title: 'पैटर्न पुस्तकालय',
    subtitle: 'सैकड़ों पारंपरिक और आधुनिक बुनाई पैटर्न का अन्वेषण करें',
    searchPlaceholder: 'नाम, क्षेत्र या तकनीक से पैटर्न खोजें...',
    filterBy: 'फिल्टर करें',
    allCategories: 'सभी श्रेणियां',
    traditional: 'पारंपरिक',
    modern: 'आधुनिक',
    geometric: 'ज्यामितीय',
    floral: 'पुष्प',
    abstract: 'अमूर्त',
    allRegions: 'सभी क्षेत्र',
    difficulty: 'कठिनाई',
    allLevels: 'सभी स्तर',
    beginner: 'शुरुआती',
    intermediate: 'मध्यम',
    advanced: 'उन्नत',
    gridView: 'ग्रिड दृश्य',
    listView: 'सूची दृश्य',
    download: 'डाउनलोड',
    favorite: 'पसंदीदा',
    rating: 'रेटिंग',
    downloads: 'डाउनलोड',
    viewInstructions: 'निर्देश देखें',
    materials: 'सामग्री',
    instructions: 'निर्देश',
  },
};

const samplePatterns: LibraryPattern[] = [
  {
    id: '1',
    name: 'Kanchipuram Silk Brocade',
    region: 'Tamil Nadu, India',
    category: 'Traditional',
    difficulty: 'Advanced',
    imageUrl: 'https://images.pexels.com/photos/6069866/pexels-photo-6069866.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional Kanchipuram silk weaving pattern with intricate brocade work',
    instructions: 'Set up warp with gold zari threads. Follow the traditional motif sequence with silk weft.',
    materials: ['Silk threads', 'Gold zari', 'Cotton base'],
    tags: ['silk', 'brocade', 'traditional', 'indian'],
    rating: 4.8,
    downloads: 234,
    isFavorited: false,
  },
  {
    id: '2',
    name: 'Scandinavian Rosepath',
    region: 'Scandinavia',
    category: 'Traditional',
    difficulty: 'Intermediate',
    imageUrl: 'https://images.pexels.com/photos/4846433/pexels-photo-4846433.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic Nordic rosepath pattern with geometric rose motifs',
    instructions: 'Use 4-shaft loom with rosepath threading. Alternate treadle sequence for rose pattern.',
    materials: ['Wool yarn', 'Cotton warp'],
    tags: ['nordic', 'rosepath', 'geometric', 'wool'],
    rating: 4.6,
    downloads: 156,
    isFavorited: true,
  },
  {
    id: '3',
    name: 'Modern Color Block',
    region: 'Contemporary',
    category: 'Modern',
    difficulty: 'Beginner',
    imageUrl: 'https://images.pexels.com/photos/7262776/pexels-photo-7262776.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Bold contemporary pattern with striking color blocks',
    instructions: 'Plain weave structure with color changes every inch. Use high contrast colors.',
    materials: ['Cotton yarn', 'Polyester blend'],
    tags: ['modern', 'colorblock', 'contemporary', 'bold'],
    rating: 4.3,
    downloads: 89,
    isFavorited: false,
  },
  {
    id: '4',
    name: 'Ikat Diamond Pattern',
    region: 'Indonesia',
    category: 'Traditional',
    difficulty: 'Advanced',
    imageUrl: 'https://images.pexels.com/photos/6238235/pexels-photo-6238235.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional Indonesian ikat with diamond motifs',
    instructions: 'Pre-dye warp threads using resist technique. Follow diamond threading pattern.',
    materials: ['Natural cotton', 'Natural dyes', 'Binding material'],
    tags: ['ikat', 'diamond', 'indonesian', 'resist-dye'],
    rating: 4.9,
    downloads: 178,
    isFavorited: true,
  },
  {
    id: '5',
    name: 'Celtic Interlace',
    region: 'Ireland/Scotland',
    category: 'Traditional',
    difficulty: 'Advanced',
    imageUrl: 'https://images.pexels.com/photos/8892327/pexels-photo-8892327.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Intricate Celtic knotwork pattern for decorative panels',
    instructions: 'Complex 8-shaft pattern. Requires careful attention to float management.',
    materials: ['Linen threads', 'Wool accents'],
    tags: ['celtic', 'interlace', 'knot', 'decorative'],
    rating: 4.7,
    downloads: 203,
    isFavorited: false,
  },
  {
    id: '6',
    name: 'Japanese Sashiko',
    region: 'Japan',
    category: 'Traditional',
    difficulty: 'Beginner',
    imageUrl: 'https://images.pexels.com/photos/8892316/pexels-photo-8892316.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional Japanese running stitch reinforcement pattern',
    instructions: 'Use plain weave base. Add sashiko reinforcement stitches in geometric patterns.',
    materials: ['Indigo cotton', 'White cotton thread'],
    tags: ['sashiko', 'japanese', 'reinforcement', 'indigo'],
    rating: 4.5,
    downloads: 145,
    isFavorited: true,
  },
];

export default function PatternLibrary({ language, speak, setTotalExp, totalExp }: PatternLibraryProps) {
  const [patterns, setPatterns] = useState<LibraryPattern[]>(samplePatterns);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPattern, setSelectedPattern] = useState<LibraryPattern | null>(null);

  const t = translations[language];

  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                          selectedCategory === t.allCategories ||
                          pattern.category === selectedCategory;
    
    const matchesRegion = selectedRegion === 'All Regions' || 
                         selectedRegion === t.allRegions ||
                         pattern.region.includes(selectedRegion);
    
    const matchesDifficulty = selectedDifficulty === 'All Levels' || 
                            selectedDifficulty === t.allLevels ||
                            pattern.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesRegion && matchesDifficulty;
  });

  const handleFavorite = (patternId: string) => {
    setPatterns(prev => prev.map(pattern => 
      pattern.id === patternId 
        ? { ...pattern, isFavorited: !pattern.isFavorited }
        : pattern
    ));
    setTotalExp(totalExp + 2);
  };

  const handleDownload = (pattern: LibraryPattern) => {
    setPatterns(prev => prev.map(p => 
      p.id === pattern.id 
        ? { ...p, downloads: p.downloads + 1 }
        : p
    ));
    setTotalExp(totalExp + 5);
    speak(language === 'en' ? 'Pattern downloaded' : language === 'ta' ? 'பேட்டர்ன் பதிவிறக்கப்பட்டது' : 'पैटर्न डाउनलोड किया गया');
  };

  const categories = [t.allCategories, t.traditional, t.modern, t.geometric, t.floral, t.abstract];
  const regions = [t.allRegions, 'India', 'Scandinavia', 'Japan', 'Indonesia', 'Ireland/Scotland', 'Contemporary'];
  const difficulties = [t.allLevels, t.beginner, t.intermediate, t.advanced];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (selectedPattern) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPattern(null)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>← Back to library</span>
        </button>

        {/* Pattern Detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-square bg-gray-100">
              <img
                src={selectedPattern.imageUrl}
                alt={selectedPattern.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedPattern.name}</h1>
                  <p className="text-gray-600 mb-1">{selectedPattern.region}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedPattern.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({selectedPattern.rating})</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedPattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  selectedPattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedPattern.difficulty}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{selectedPattern.description}</p>

              {/* Materials */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">{t.materials}:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPattern.materials.map((material, index) => (
                    <li key={index} className="text-gray-600">{material}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">{t.instructions}:</h3>
                <p className="text-gray-700">{selectedPattern.instructions}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPattern.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDownload(selectedPattern)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.download}</span>
                </button>

                <button
                  onClick={() => handleFavorite(selectedPattern.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    selectedPattern.isFavorited
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedPattern.isFavorited ? 'fill-current' : ''}`} />
                  <span>{t.favorite}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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

          {/* Region Filter */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
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

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {filteredPatterns.length} patterns found
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Patterns Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Pattern Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={pattern.imageUrl}
                  alt={pattern.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => setSelectedPattern(pattern)}
                />
              </div>

              {/* Pattern Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{pattern.name}</h3>
                    <p className="text-sm text-gray-600">{pattern.region}</p>
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

                {/* Rating and Downloads */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(pattern.rating)}
                    <span>({pattern.rating})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{pattern.downloads}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPattern(pattern)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.viewInstructions}</span>
                  </button>

                  <button
                    onClick={() => handleFavorite(pattern.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      pattern.isFavorited
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${pattern.isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={pattern.imageUrl}
                    alt={pattern.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setSelectedPattern(pattern)}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{pattern.name}</h3>
                      <p className="text-gray-600">{pattern.region}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      pattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      pattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {pattern.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{pattern.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        {renderStars(pattern.rating)}
                        <span>({pattern.rating})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{pattern.downloads}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedPattern(pattern)}
                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t.viewInstructions}</span>
                      </button>

                      <button
                        onClick={() => handleFavorite(pattern.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          pattern.isFavorited
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${pattern.isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPatterns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No patterns found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}