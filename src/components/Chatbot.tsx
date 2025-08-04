import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, Lightbulb, HelpCircle } from 'lucide-react';

interface ChatbotProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const chatbotResponses = {
  en: {
    greeting: "Hello! I'm your weaving assistant. I can help you with weaving techniques, app navigation, and answer your questions about traditional textile arts. How can I assist you today?",
    navigation: {
      simulator: "The Pattern Simulator lets you create weaving patterns by drawing on a digital canvas. You can select colors, adjust brush size, and save your creations.",
      learning: "The Learning Center offers structured courses on weaving techniques, from beginner to advanced levels. Each module includes audio narration.",
      progress: "Your Progress Dashboard tracks completed patterns, skill improvements, and learning achievements over time.",
      gallery: "The Gallery is where you can share your patterns with the community, view others' work, and get inspiration.",
      library: "The Pattern Library contains hundreds of traditional and modern weaving patterns that you can filter and explore."
    },
    techniques: {
      "plain weave": "Plain weave is the simplest weaving pattern where weft threads go over and under alternating warp threads. It creates a strong, stable fabric.",
      "twill weave": "Twill weave creates diagonal lines by shifting the over-under pattern in each row. This produces the characteristic diagonal ribbing.",
      "warp": "Warp threads run lengthwise on the loom and are held under tension. They form the foundation of your weaving.",
      "weft": "Weft threads are woven horizontally through the warp threads to create the fabric structure.",
      "loom": "A loom is the device that holds the warp threads in place while you weave the weft threads through them."
    },
    defaultResponse: "I'm here to help with weaving questions and app navigation. You can ask me about weaving techniques, how to use different features, or traditional textile patterns. What would you like to know?"
  },
  ta: {
    greeting: "வணக்கம்! நான் உங்கள் நெசவு உதவியாளர். நெசவு நுட்பங்கள், ஆப் வழிசெலுத்தல் மற்றும் பாரம்பரிய துணி கலைகள் பற்றிய உங்கள் கேள்விகளுக்கு நான் உதவ முடியும். இன்று நான் எவ்வாறு உதவ முடியும்?",
    navigation: {
      simulator: "பேட்டர்ன் சிமுலேட்டர் டிஜிட்டல் கேன்வாஸில் வரைவதன் மூலம் நெசவு பேட்டர்ன்களை உருவாக்க உங்களை அனுமதிக்கிறது. நீங்கள் வண்ணங்களைத் தேர்ந்தெடுக்கலாம், பிரஷ் அளவை சரிசெய்யலாம் மற்றும் உங்கள் படைப்புகளைச் சேமிக்கலாம்.",
      learning: "கற்றல் மையம் ஆரம்பநிலை முதல் மேம்பட்ட நிலைகள் வரை நெசவு நுட்பங்கள் பற்றிய கட்டமைக்கப்பட்ட பாடங்களை வழங்குகிறது. ஒவ்வொரு மாட்யூலிலும் ஆடியோ விவரணை உள்ளது.",
      progress: "உங்கள் முன்னேற்ற டாஷ்போர்ட் முடிக்கப்பட்ட பேட்டர்ன்கள், திறன் மேம்பாடுகள் மற்றும் காலப்போக்கில் கற்றல் சாதனைகளைக் கண்காணிக்கிறது.",
      gallery: "கேலரி என்பது நீங்கள் உங்கள் பேட்டர்ன்களை சமூகத்துடன் பகிர்ந்து கொள்ளலாம், மற்றவர்களின் வேலைகளைப் பார்க்கலாம் மற்றும் உத்வேகம் பெறலாம்.",
      library: "பேட்டர்ன் நூலகத்தில் நூற்றுக்கணக்கான பாரம்பரிய மற்றும் நவீன நெசவு பேட்டர்ன்கள் உள்ளன, அவற்றை நீங்கள் வடிகட்டி ஆராயலாம்."
    },
    techniques: {
      "plain weave": "வெற்று நெசவு என்பது வெஃப்ட் நூல்கள் மாற்று வார்ப் நூல்களின் மேலும் கீழும் செல்லும் எளிமையான நெசவு வடிவமாகும். இது வலுவான, நிலையான துணியை உருவாக்குகிறது.",
      "twill weave": "ட்வில் நெசவு ஒவ்வொரு வரிசையிலும் மேல்-கீழ் வடிவத்தை மாற்றுவதன் மூலம் மூலைவிட்ட கோடுகளை உருவாக்குகிறது.",
      "warp": "வார்ப் நூல்கள் தறியில் நீளவாக்கில் ஓடி பதற்றத்தின் கீழ் வைக்கப்படுகின்றன. அவை உங்கள் நெசவின் அடித்தளத்தை உருவாக்குகின்றன.",
      "weft": "வெஃப்ட் நூல்கள் துணி கட்டமைப்பை உருவாக்க வார்ப் நூல்கள் வழியாக கிடைமட்டமாக நெசவு செய்யப்படுகின்றன.",
      "loom": "தறி என்பது வெஃப்ட் நூல்களை அவற்றின் வழியாக நெசவு செய்யும் போது வார்ப் நூல்களை இடத்தில் வைத்திருக்கும் சாதனமாகும்."
    },
    defaultResponse: "நெசவு கேள்விகள் மற்றும் ஆப் வழிசெலுத்தலில் உதவ நான் இங்கே இருக்கிறேன். நெசவு நுட்பங்கள், வெவ்வேறு அம்சங்களை எவ்வாறு பயன்படுத்துவது அல்லது பாரம்பரிய துணி வடிவங்கள் பற்றி என்னிடம் கேட்கலாம். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?"
  },
  hi: {
    greeting: "नमस्ते! मैं आपका बुनाई सहायक हूं। मैं बुनाई तकनीकों, ऐप नेविगेशन, और पारंपरिक वस्त्र कलाओं के बारे में आपके सवालों में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    navigation: {
      simulator: "पैटर्न सिमुलेटर आपको डिजिटल कैनवास पर ड्राइंग करके बुनाई पैटर्न बनाने की सुविधा देता है। आप रंग चुन सकते हैं, ब्रश साइज़ एडजस्ट कर सकते हैं, और अपनी रचनाओं को सेव कर सकते हैं।",
      learning: "लर्निंग सेंटर शुरुआती से उन्नत स्तर तक बुनाई तकनीकों पर संरचित कोर्स प्रदान करता है। हर मॉड्यूल में ऑडियो विवरण शामिल है।",
      progress: "आपका प्रोग्रेस डैशबोर्ड पूरे किए गए पैटर्न, कौशल सुधार, और समय के साथ सीखने की उपलब्धियों को ट्रैक करता है।",
      gallery: "गैलरी वह जगह है जहाँ आप अपने पैटर्न को समुदाय के साथ साझा कर सकते हैं, दूसरों के काम देख सकते हैं, और प्रेरणा पा सकते हैं।",
      library: "पैटर्न लाइब्रेरी में सैकड़ों पारंपरिक और आधुनिक बुनाई पैटर्न हैं जिन्हें आप फिल्टर और एक्सप्लोर कर सकते हैं।"
    },
    techniques: {
      "plain weave": "सादी बुनाई सबसे सरल बुनाई पैटर्न है जहाँ वेफ्ट धागे वैकल्पिक वार्प धागों के ऊपर और नीचे जाते हैं। यह एक मजबूत, स्थिर कपड़ा बनाता है।",
      "twill weave": "टवील बुनाई हर पंक्ति में ऊपर-नीचे पैटर्न को स्थानांतरित करके विकर्ण रेखाएं बनाती है।",
      "warp": "वार्प धागे करघे पर लंबाई की दिशा में चलते हैं और तनाव में रखे जाते हैं। वे आपकी बुनाई की नींव बनाते हैं।",
      "weft": "वेफ्ट धागे कपड़े की संरचना बनाने के लिए वार्प धागों के माध्यम से क्षैतिज रूप से बुने जाते हैं।",
      "loom": "करघा वह उपकरण है जो वार्प धागों को अपनी जगह पर रखता है जबकि आप वेफ्ट धागों को उनके माध्यम से बुनते हैं।"
    },
    defaultResponse: "मैं बुनाई के सवालों और ऐप नेविगेशन में मदद के लिए यहाँ हूँ। आप मुझसे बुनाई तकनीकों, विभिन्न फीचर्स का उपयोग कैसे करें, या पारंपरिक वस्त्र पैटर्न के बारे में पूछ सकते हैं। आप क्या जानना चाहते हैं?"
  }
};

const quickQuestions = {
  en: [
    "How do I use the pattern simulator?",
    "What is plain weave?",
    "How do I save my patterns?",
    "What are warp and weft threads?",
    "How do I access the learning modules?"
  ],
  ta: [
    "பேட்டர்ன் சிமுலேட்டரை எவ்வாறு பயன்படுத்துவது?",
    "வெற்று நெசவு என்றால் என்ன?",
    "என் பேட்டர்ன்களை எவ்வாறு சேமிப்பது?",
    "வார்ப் மற்றும் வெஃப்ட் நூல்கள் என்றால் என்ன?",
    "கற்றல் தொகுதிகளை எவ்வாறு அணுகுவது?"
  ],
  hi: [
    "पैटर्न सिमुलेटर का उपयोग कैसे करें?",
    "सादी बुनाई क्या है?",
    "अपने पैटर्न कैसे सेव करें?",
    "वार्प और वेफ्ट धागे क्या हैं?",
    "लर्निंग मॉड्यूल्स तक कैसे पहुंचें?"
  ]
};

export default function Chatbot({ language, speak, setTotalExp, totalExp }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses = chatbotResponses[language];
  const questions = quickQuestions[language];

  useEffect(() => {
    // Initialize with greeting message
    const greeting: Message = {
      id: '1',
      type: 'bot',
      content: responses.greeting,
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Navigation help
    if (lowerMessage.includes('simulator') || lowerMessage.includes('pattern') && lowerMessage.includes('create')) {
      return responses.navigation.simulator;
    }
    if (lowerMessage.includes('learning') || lowerMessage.includes('course') || lowerMessage.includes('module')) {
      return responses.navigation.learning;
    }
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return responses.navigation.progress;
    }
    if (lowerMessage.includes('gallery') || lowerMessage.includes('share')) {
      return responses.navigation.gallery;
    }
    if (lowerMessage.includes('library') || lowerMessage.includes('browse')) {
      return responses.navigation.library;
    }

    // Technique explanations
    for (const [technique, explanation] of Object.entries(responses.techniques)) {
      if (lowerMessage.includes(technique)) {
        return explanation;
      }
    }

    // Common questions
    if (lowerMessage.includes('save') || lowerMessage.includes('download')) {
      return language === 'en' 
        ? "To save your patterns, use the Save button in the Pattern Simulator. You can also download them as PNG images using the Download button."
        : language === 'ta'
        ? "உங்கள் பேட்டர்ன்களைச் சேமிக்க, பேட்டர்ன் சிமுலேட்டரில் சேமி பொத்தானைப் பயன்படுத்தவும். பதிவிறக்க பொத்தானைப் பயன்படுத்தி அவற்றை PNG படங்களாகவும் பதிவிறக்கம் செய்யலாம்."
        : "अपने पैटर्न को सेव करने के लिए, पैटर्न सिमुलेटर में सेव बटन का उपयोग करें। आप डाउनलोड बटन का उपयोग करके उन्हें PNG इमेज के रूप में भी डाउनलोड कर सकते हैं।";
    }

    if (lowerMessage.includes('color') || lowerMessage.includes('வண்ণம்') || lowerMessage.includes('रंग')) {
      return language === 'en'
        ? "You can select different colors from the color palette in the Pattern Simulator. Colors help distinguish between warp and weft threads in your designs."
        : language === 'ta'
        ? "பేட்டர்ன் சிமுலேட்டரில் வண்ண தட்டிலிருந்து வெவ்வேறு வண்ணங்களைத் தேர்ந்தெடுக்கலாம். உங்கள் வடிவமைப்புகளில் வார்ப் மற்றும் வெஃப்ட் நூல்களை வேறுபடுத்த வண்ணங்கள் உதவுகின்றன."
        : "आप पैटर्न सिमुलेटर में कलर पैलेट से अलग-अलग रंग चुन सकते हैं। रंग आपके डिज़ाइन में वार्प और वेफ्ट धागों के बीच अंतर करने में मदद करते हैं।";
    }

    return responses.defaultResponse;
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Add experience for asking questions
    setTotalExp(totalExp + 2);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {language === 'en' ? 'AI Weaving Assistant' : language === 'ta' ? 'AI நெசவு உதவியாளர்' : 'AI बुनाई सहायक'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Get help with weaving techniques and app navigation' 
            : language === 'ta' 
            ? 'நெசவு நுட்பங்கள் மற்றும் ஆப் வழிசெலுத்தலுக்கு உதவி பெறுங்கள்'
            : 'बुनाई तकनीकों और ऐप नेविगेशन में सहायता प्राप्त करें'
          }
        </p>
      </div>

      {/* Quick Questions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          {language === 'en' ? 'Quick Questions' : language === 'ta' ? 'விரைவு கேள்விகள்' : 'त्वरित प्रश्न'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4 inline mr-2 text-blue-500" />
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-purple-500 text-white'
              }`}>
                {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.type === 'bot' && (
                    <button
                      onClick={() => speak(message.content)}
                      className="text-xs text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === 'en' 
                  ? 'Ask me about weaving techniques...' 
                  : language === 'ta' 
                  ? 'நெசவு நுட்பங்கள் பற்றி என்னிடம் கேளுங்கள்...'
                  : 'मुझसे बुनाई तकनीकों के बारे में पूछें...'
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}