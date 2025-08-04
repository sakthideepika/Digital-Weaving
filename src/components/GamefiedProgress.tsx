import React from 'react';
import { Star, Award } from 'lucide-react';

interface GamefiedProgressProps {
  level: number;
  exp: number;
}

export default function GamefiedProgress({ level, exp }: GamefiedProgressProps) {
  const expToNextLevel = 100;
  const currentLevelExp = exp % expToNextLevel;
  const progressPercentage = (currentLevelExp / expToNextLevel) * 100;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 bg-white/70 rounded-full px-3 py-1 border border-orange-200">
        <Award className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-semibold text-gray-700">Level {level}</span>
      </div>
      
      <div className="hidden sm:flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600 font-medium">{currentLevelExp}/100 XP</span>
      </div>
    </div>
  );
}