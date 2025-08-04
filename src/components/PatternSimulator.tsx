import React, { useState, useRef, useEffect } from 'react';
import { Palette, RotateCcw, Download, Save, Trash2, Grid, Eye, EyeOff } from 'lucide-react';

interface PatternSimulatorProps {
  language: 'en' | 'ta' | 'hi';
  speak: (text: string) => void;
  userLevel: number;
  setUserLevel: (level: number) => void;
  totalExp: number;
  setTotalExp: (exp: number) => void;
}

const colors = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', 
  '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
  '#000000', '#ffffff'
];

const translations = {
  en: {
    title: 'Interactive Pattern Simulator',
    subtitle: 'Create beautiful weaving patterns with touch or mouse',
    brushSize: 'Brush Size',
    gridSize: 'Grid Size',
    clear: 'Clear Canvas',
    undo: 'Undo',
    save: 'Save Pattern',
    download: 'Download',
    toggleGrid: 'Toggle Grid',
    togglePreview: 'Toggle Preview',
    warpThreads: 'Warp Threads (Vertical)',
    weftThreads: 'Weft Threads (Horizontal)',
    patternSaved: 'Pattern saved successfully!',
    instructions: 'Click and drag to create your weaving pattern. Use different colors for warp and weft threads.',
  },
  ta: {
    title: 'ஊடாடும் பேட்டர்ن் சிமுலேட்டர்',
    subtitle: 'தொடுதல் அல்லது மவுஸ் மூலம் அழகான நெசவு பேட்டர்ன்களை உருவாக்கவும்',
    brushSize: 'பிரஷ் அளவு',
    gridSize: 'கிரிட் அளவு',
    clear: 'கேன்வாஸை அழிக்கவும்',
    undo: 'செயல்தவிர்',
    save: 'பேட்டர்னை சேமிக்கவும்',
    download: 'பதிவிறக்கம்',
    toggleGrid: 'கிரிட் மாற்று',
    togglePreview: 'முன்னோட்ட மாற்று',
    warpThreads: 'வார்ப் நூல்கள் (செங்குத்து)',
    weftThreads: 'வெஃப்ட் நூல்கள் (கிடைமட்ட)',
    patternSaved: 'பேட்டர்ன் வெற்றிகரமாக சேமிக்கப்பட்டது!',
    instructions: 'உங்கள் நெசவு பேட்டர்னை உருவாக்க கிளிக் செய்து இழுக்கவும். வார்ப் மற்றும் வெஃப்ட் நூல்களுக்கு வெவ்வேறு வண்ணங்களைப் பயன்படுத்தவும்.',
  },
  hi: {
    title: 'इंटरैक्टिव पैटर्न सिमुलेटर',
    subtitle: 'टच या माउस से सुंदर बुनाई पैटर्न बनाएं',
    brushSize: 'ब्रश साइज़',
    gridSize: 'ग्रिड साइज़',
    clear: 'कैनवास साफ करें',
    undo: 'पूर्ववत करें',
    save: 'पैटर्न सेव करें',
    download: 'डाउनलोड',
    toggleGrid: 'ग्रिड टॉगल',
    togglePreview: 'प्रीव्यू टॉगल',
    warpThreads: 'वार्प धागे (लंबवत)',
    weftThreads: 'वेफ्ट धागे (क्षैतिज)',
    patternSaved: 'पैटर्न सफलतापूर्वक सेव हो गया!',
    instructions: 'अपना बुनाई पैटर्न बनाने के लिए क्लिक करें और ड्रैग करें। वार्प और वेफ्ट धागों के लिए अलग-अलग रंगों का उपयोग करें।',
  },
};

export default function PatternSimulator({ language, speak, setTotalExp, totalExp }: PatternSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(10);
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);

  const t = translations[language];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }
  }, [showGrid, gridSize]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // Add experience points for drawing
      setTotalExp(totalExp + 5);
      saveToHistory();
    }
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL();
    setCanvasHistory(prev => [...prev, dataURL].slice(-10)); // Keep last 10 states
  };

  const undo = () => {
    if (canvasHistory.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height);
      }
    };
    
    const previousState = canvasHistory[canvasHistory.length - 2] || '';
    img.src = previousState;
    
    setCanvasHistory(prev => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }
    
    setCanvasHistory([]);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `weaving-pattern-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    // Add experience points for downloading
    setTotalExp(totalExp + 10);
  };

  const savePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL();
    const patterns = JSON.parse(localStorage.getItem('weavingPatterns') || '[]');
    patterns.push({
      id: Date.now(),
      dataURL,
      timestamp: new Date().toISOString(),
      name: `Pattern ${patterns.length + 1}`
    });
    localStorage.setItem('weavingPatterns', JSON.stringify(patterns));
    
    speak(t.patternSaved);
    setTotalExp(totalExp + 15);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-center">{t.instructions}</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Color Palette */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-gray-800 scale-110 shadow-md'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Brush Controls */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{t.brushSize}</h3>
            <input
              type="range"
              min="5"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-gray-600 mt-1">{brushSize}px</div>
          </div>

          {/* Grid Controls */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{t.gridSize}</h3>
            <input
              type="range"
              min="10"
              max="40"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-gray-600 mt-1">{gridSize}px</div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                  showGrid
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4 mr-1" />
                <span className="text-xs">{showGrid ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}</span>
              </button>
              
              <button
                onClick={undo}
                disabled={canvasHistory.length === 0}
                className="flex items-center justify-center px-3 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                <span className="text-xs">Undo</span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={clearCanvas}
                className="flex items-center justify-center px-2 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={savePattern}
                className="flex items-center justify-center px-2 py-2 bg-green-50 border border-green-200 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              
              <button
                onClick={downloadCanvas}
                className="flex items-center justify-center px-2 py-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-gray-300 rounded-lg cursor-crosshair max-w-full h-auto"
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}