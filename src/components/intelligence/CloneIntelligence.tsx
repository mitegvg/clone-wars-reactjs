import React from 'react';
import { Brain, AlertTriangle } from 'lucide-react';
import type { Clone } from '../../types/game';

interface CloneIntelligenceProps {
  clone: Clone;
  onAdjustIntelligence: (cloneId: string, amount: number) => void;
}

export function CloneIntelligence({ clone, onAdjustIntelligence }: CloneIntelligenceProps) {
  const getStatusMessage = () => {
    if (clone.rebellionChance > 0.7) return "Showing signs of strong independence";
    if (clone.rebellionChance > 0.4) return "Questioning orders occasionally";
    return "Maintaining stable behavior";
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        {clone.photoUrl && (
          <img src={clone.photoUrl} alt={clone.name} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          <h3 className="text-xl font-bold text-white">{clone.name}</h3>
          <p className="text-gray-400">{getStatusMessage()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white">Intelligence Level</span>
            <span className="text-blue-400">{clone.intelligence}/10</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(clone.intelligence / 10) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white">Rebellion Risk</span>
            <span className={`
              ${clone.rebellionChance < 0.3 ? 'text-green-400' : ''}
              ${clone.rebellionChance >= 0.3 && clone.rebellionChance < 0.7 ? 'text-yellow-400' : ''}
              ${clone.rebellionChance >= 0.7 ? 'text-red-400' : ''}
            `}>
              {(clone.rebellionChance * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className={`h-full rounded-full ${
                clone.rebellionChance < 0.3 ? 'bg-green-500' :
                clone.rebellionChance < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${clone.rebellionChance * 100}%` }}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onAdjustIntelligence(clone.id, -1)}
            disabled={clone.intelligence <= 1}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Reduce Intelligence
          </button>
          <button
            onClick={() => onAdjustIntelligence(clone.id, 1)}
            disabled={clone.intelligence >= 10}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Enhance Intelligence
          </button>
        </div>
      </div>
    </div>
  );
}