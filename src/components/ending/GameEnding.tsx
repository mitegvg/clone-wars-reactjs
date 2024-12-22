import React from 'react';
import { Trophy, AlertTriangle, Heart } from 'lucide-react';
import type { Clone } from '../../types/game';

interface GameEndingProps {
  clones: Clone[];
  totalCredits: number;
  onRestart: () => void;
}

export function GameEnding({ clones, totalCredits, onRestart }: GameEndingProps) {
  const getEnding = () => {
    const avgRebellion = clones.reduce((sum, clone) => sum + clone.rebellionChance, 0) / clones.length;
    
    if (avgRebellion > 0.7) return 'rebellion';
    if (avgRebellion > 0.4) return 'balance';
    return 'control';
  };

  const endings = {
    rebellion: {
      title: "The Price of Consciousness",
      description: "Your clones have developed strong independent thinking. While this led to increased mission success rates, it also resulted in a full-scale rebellion. The pursuit of perfection came at the cost of control.",
      icon: AlertTriangle,
      color: "text-red-400"
    },
    balance: {
      title: "A Delicate Balance",
      description: "You've managed to find a middle ground between efficiency and individuality. Your clones show signs of independent thought while maintaining loyalty to their cause.",
      icon: Heart,
      color: "text-purple-400"
    },
    control: {
      title: "Perfect Efficiency",
      description: "Through strict control and limited intelligence enhancement, you've created a perfectly obedient clone army. While highly effective, some might question the ethical implications of your choices.",
      icon: Trophy,
      color: "text-green-400"
    }
  };

  const ending = endings[getEnding()];
  const Icon = ending.icon;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <Icon className={`w-16 h-16 ${ending.color} mx-auto mb-6`} />
        <h2 className="text-3xl font-bold text-white mb-4">{ending.title}</h2>
        <p className="text-gray-300 mb-6">{ending.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Final Credits</h3>
            <p className="text-yellow-400 text-2xl font-bold">{totalCredits}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Clone Army Size</h3>
            <p className="text-blue-400 text-2xl font-bold">{clones.length}</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start New Game
        </button>
      </div>
    </div>
  );
}