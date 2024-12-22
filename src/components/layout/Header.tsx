import React from 'react';
import { CloudLightning, CreditCard } from 'lucide-react';

interface HeaderProps {
  credits: number;
  gamePhase: string;
}

export function Header({ credits, gamePhase }: HeaderProps) {
  const getPhaseTitle = () => {
    switch (gamePhase) {
      case 'intro': return 'Welcome to Kamino';
      case 'creation': return 'Clone Creation';
      case 'training': return 'Training Facility';
      case 'mission': return 'Mission Control';
      case 'reflection': return 'Reflection Chamber';
      case 'ending': return 'Mission Complete';
      default: return 'The Kamino Project';
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CloudLightning className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">{getPhaseTitle()}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold text-yellow-400">{credits}</span>
        </div>
      </div>
    </header>
  );
}