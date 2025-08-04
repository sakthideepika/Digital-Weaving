import React, { useState } from 'react';
import { Play, BookOpen, Volume2, ChevronRight, Award, Clock } from 'lucide-react';

interface LearningAssistantProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

const learningContent = {
  en: {
    title: 'Learning Center',
    subtitle: 'Master weaving techniques step by step',
    modules: [
      {
        id: 1,
        title: 'Introduction to Weaving',
        duration: '15 min',
        level: 'Beginner',
        description: 'Learn the basics of weaving, tools, and materials',
        content: 'Weaving is the ancient art of creating fabric by interlacing threads. The vertical threads are called warp, and the horizontal threads are called weft. Understanding this basic structure is essential for all weaving techniques.',
        completed: false,
      },
      {
        id: 2,
        title: 'Understanding Warp and Weft',
        duration: '20 min',
        level: 'Beginner',
        description: 'Master the fundamental thread directions',
        content: 'The warp threads run lengthwise and are held taut on the loom. The weft threads are woven horizontally through the warp. This perpendicular relationship creates the basic structure of woven fabric.',
        completed: false,
      },
      {
        id: 3,
        title: 'Basic Weave Patterns',
        duration: '25 min',
        level: 'Intermediate',
        description: 'Explore plain weave, twill, and satin patterns',
        content: 'Plain weave alternates over and under in a regular pattern. Twill creates diagonal lines by shifting the pattern each row. Satin weave minimizes intersections for a smooth, lustrous surface.',
        completed: false,
      },
      {
        id: 4,
        title: 'Color Theory in Weaving',
        duration: '30 min',
        level: 'Intermediate',
        description: 'Learn how colors interact in woven patterns',
        content: 'Color in weaving involves both warp and weft interactions. Understanding complementary colors, color gradients, and optical mixing helps create stunning visual effects in your woven pieces.',
        completed: false,
      },
      {
        id: 5,
        title: 'Advanced Pattern Design',
        duration: '45 min',
        level: 'Advanced',
        description: 'Create complex geometric and traditional patterns',
        content: 'Advanced patterns combine multiple weave structures, color changes, and thread variations. Traditional patterns from different cultures provide inspiration for contemporary weaving projects.',
        completed: false,
      },
    ],
  },
  ta: {
    title: 'கற்றல் மையம்',
    subtitle: 'படிப்படியாக நெசவு நுட்பங்களில் தேர்ச்சி பெறுங்கள்',
    modules: [
      {
        id: 1,
        title: 'நெசவு அறிமுகம்',
        duration: '15 நிமி',
        level: 'ஆரம்பநிலை',
        description: 'நெசவின் அடிப்படைகள், கருவிகள் மற்றும் பொருட்களைக் கற்றுக்கொள்ளுங்கள்',
        content: 'நெசவு என்பது நூல்களை பின்னிப் பிணைத்து துணி உருவாக்கும் பழங்கால கலையாகும். செங்குத்து நூல்கள் வார்ப் என்றும், கிடைமட்ட நூல்கள் வெஃப்ட் என்றும் அழைக்கப்படுகின்றன.',
        completed: false,
      },
      {
        id: 2,
        title: 'வார்ப் மற்றும் வெஃப்ட் புரிதல்',
        duration: '20 நிமி',
        level: 'ஆரம்பநிலை',
        description: 'அடிப்படை நூல் திசைகளில் தேர்ச்சி பெறுங்கள்',
        content: 'வார்ப் நூல்கள் நீளவாக்கில் ஓடி தறியில் இறுக்கமாக வைக்கப்படுகின்றன. வெஃப்ட் நூல்கள் வார்ப் வழியாக கிடைமட்டமாக நெசவு செய்யப்படுகின்றன.',
        completed: false,
      },
      {
        id: 3,
        title: 'அடிப்படை நெசவு வடிவங்கள்',
        duration: '25 நிமி',
        level: 'இடைநிலை',
        description: 'வெற்று நெசவு, ட்வில் மற்றும் சாடின் வடிவங்களை ஆராயுங்கள்',
        content: 'வெற்று நெசவு ஒரு வழக்கமான வடிவத்தில் மேலும் கீழும் மாறி மாறி வருகிறது. ட்வில் ஒவ்வொரு வரிசையிலும் வடிவத்தை மாற்றுவதன் மூலம் மூலைவிட்ட கோடுகளை உருவாக்குகிறது.',
        completed: false,
      },
      {
        id: 4,
        title: 'நெசவில் வண்ண கோட்பாடு',
        duration: '30 நிமி',
        level: 'இடைநிலை',
        description: 'நெசவு வடிவங்களில் வண்ணங்கள் எவ்வாறு தொடர்பு கொள்கின்றன என்பதைக் கற்றுக்கொள்ளுங்கள்',
        content: 'நெசவில் வண்ணம் வார்ப் மற்றும் வெஃப்ட் இடைவினைகளை உள்ளடக்குகிறது. நிரப்பு வண்ணங்கள், வண்ண சீராக்கங்கள் மற்றும் ஒளியியல் கலவையைப் புரிந்துகொள்வது உங்கள் நெசவு துண்டுகளில் அற்புதமான காட்சி விளைவுகளை உருவாக்க உதவுகிறது.',
        completed: false,
      },
      {
        id: 5,
        title: 'மேம்பட்ட வடிவ வடிவமைப்பு',
        duration: '45 நிமி',
        level: 'மேம்பட்ட',
        description: 'சிக்கலான வடிவியல் மற்றும் பாரம்பரிய வடிவங்களை உருவாக்குங்கள்',
        content: 'மேம்பட்ட வடிவங்கள் பல நெசவு கட்டமைப்புகள், வண்ண மாற்றங்கள் மற்றும் நூல் மாறுபாடுகளை இணைக்கின்றன. பல்வேறு கலாச்சாரங்களின் பாரம்பரிய வடிவங்கள் சமகால நெசவு திட்டங்களுக்கு உத்வேகம் அளிக்கின்றன.',
        completed: false,
      },
    ],
  },
  hi: {
    title: 'शिक्षा केंद्र',
    subtitle: 'चरणबद्ध तरीके से बुनाई तकनीकों में महारत हासिल करें',
    modules: [
      {
        id: 1,
        title: 'बुनाई का परिचय',
        duration: '15 मिनट',
        level: 'शुरुआती',
        description: 'बुनाई की मूल बातें, उपकरण और सामग्री सीखें',
        content: 'बुनाई धागों को आपस में बुनकर कपड़ा बनाने की प्राचीन कला है। लंबवत धागों को वार्प कहा जाता है, और क्षैतिज धागों को वेफ्ट कहा जाता है। इस बुनियादी संरचना को समझना सभी बुनाई तकनीकों के लिए आवश्यक है।',
        completed: false,
      },
      {
        id: 2,
        title: 'वार्प और वेफ्ट को समझना',
        duration: '20 मिनट',
        level: 'शुरुआती',
        description: 'मूलभूत धागे की दिशाओं में महारत हासिल करें',
        content: 'वार्प धागे लंबाई की दिशा में चलते हैं और करघे पर तना रखा जाता है। वेफ्ट धागे वार्प के माध्यम से क्षैतिज रूप से बुने जाते हैं। यह लंबवत संबंध बुने हुए कपड़े की बुनियादी संरचना बनाता है।',
        completed: false,
      },
      {
        id: 3,
        title: 'बुनियादी बुनाई पैटर्न',
        duration: '25 मिनट',
        level: 'मध्यम',
        description: 'सादी बुनाई, टवील और साटन पैटर्न का अन्वेषण करें',
        content: 'सादी बुनाई एक नियमित पैटर्न में ऊपर और नीचे बारी-बारी से होती है। टवील प्रत्येक पंक्ति के पैटर्न को स्थानांतरित करके विकर्ण रेखाएं बनाता है। साटन बुनाई एक चिकनी, चमकदार सतह के लिए प्रतिच्छेदन को कम करती है।',
        completed: false,
      },
      {
        id: 4,
        title: 'बुनाई में रंग सिद्धांत',
        duration: '30 मिनट',
        level: 'मध्यम',
        description: 'सीखें कि बुने हुए पैटर्न में रंग कैसे परस्पर क्रिया करते हैं',
        content: 'बुनाई में रंग वार्प और वेफ्ट दोनों की अंतर्क्रिया शामिल है। पूरक रंगों, रंग ग्रेडिएंट्स और ऑप्टिकल मिश्रण को समझना आपके बुने हुए टुकड़ों में आश्चर्यजनक दृश्य प्रभाव बनाने में मदद करता है।',
        completed: false,
      },
      {
        id: 5,
        title: 'उन्नत पैटर्न डिज़ाइन',
        duration: '45 मिनट',
        level: 'उन्नत',
        description: 'जटिल ज्यामितीय और पारंपरिक पैटर्न बनाएं',
        content: 'उन्नत पैटर्न कई बुनाई संरचनाओं, रंग परिवर्तन और धागे की विविधताओं को जोड़ते हैं। विभिन्न संस्कृतियों के पारंपरिक पैटर्न समकालीन बुनाई परियोजनाओं के लिए प्रेरणा प्रदान करते हैं।',
        completed: false,
      },
    ],
  },
};

export default function LearningAssistant({ language, speak, setTotalExp, totalExp }: LearningAssistantProps) {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const content = learningContent[language];

  const startModule = (moduleId: number) => {
    setSelectedModule(moduleId);
    const module = content.modules.find(m => m.id === moduleId);
    if (module) {
      speak(module.title);
    }
  };

  const completeModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      setTotalExp(totalExp + 25);
      speak(language === 'en' ? 'Module completed!' : language === 'ta' ? 'பாடம் முடிவுற்றது!' : 'मॉड्यूल पूरा हुआ!');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
      case 'ஆரம்பநிலை':
      case 'शुरुआती':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
      case 'இடைநிலை':
      case 'मध्यम':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
      case 'மேம்பட்ட':
      case 'उन्नत':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedModule) {
    const module = content.modules.find(m => m.id === selectedModule);
    if (!module) return null;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedModule(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Back to modules</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
                <p className="opacity-90">{module.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(module.level)}`}>
                    {module.level}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {module.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => speak(module.content)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>

              <button
                onClick={() => completeModule(module.id)}
                disabled={completedModules.includes(module.id)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  completedModules.includes(module.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {completedModules.includes(module.id) 
                    ? (language === 'en' ? 'Completed' : language === 'ta' ? 'முடிந்தது' : 'पूरा हुआ')
                    : (language === 'en' ? 'Mark Complete' : language === 'ta' ? 'முடிந்ததாக குறிக்கவும்' : 'पूरा करें')
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h2>
        <p className="text-gray-600">{content.subtitle}</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
          <span className="text-sm text-gray-600">
            {completedModules.length} of {content.modules.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedModules.length / content.modules.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.modules.map((module) => (
          <div
            key={module.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${
              completedModules.includes(module.id) ? 'ring-2 ring-green-200' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                  {module.level}
                </span>
                {completedModules.includes(module.id) && (
                  <Award className="w-5 h-5 text-green-600" />
                )}
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{module.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{module.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{module.duration}</span>
                </div>
              </div>

              <button
                onClick={() => startModule(module.id)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start Learning</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}