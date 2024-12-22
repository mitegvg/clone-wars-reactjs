import React from 'react';
import { Brain, Swords, Wind } from 'lucide-react';
import type { Clone } from '../../types/game';
import { calculateTrainingCost } from '../../utils/training';

interface CloneTrainingProps {
  clone: Clone;
  credits: number;
  onTrainClone: (cloneId: string, attribute: keyof Clone, value: number) => void;
  onProceed: () => void;
}

export function CloneTraining({ clone, credits, onTrainClone, onProceed }: CloneTrainingProps) {
  const attributes = [
    { name: 'strength', icon: Swords, current: clone.strength },
    { name: 'agility', icon: Wind, current: clone.agility },
    { name: 'intelligence', icon: Brain, current: clone.intelligence }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="flex items-center space-x-4 mb-6">
        {clone.photoUrl && (
          <img src={clone.photoUrl} alt={clone.name} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          <h3 className="text-xl font-bold text-white">{clone.name}</h3>
          <p className="text-gray-400">Rebellion Risk: {(clone.rebellionChance * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {attributes.map(({ name, icon: Icon, current }) => {
          const cost = calculateTrainingCost(current);
          const canTrain = credits >= cost && current < 10;

          return (
            <div key={name} className="flex items-center space-x-4">
              <Icon className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-white capitalize">{name}</span>
                  <span className="text-gray-400">Level {current}/10</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(current / 10) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => onTrainClone(clone.id, name as keyof Clone, current + 1)}
                disabled={!canTrain}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                Train ({cost} credits)
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white">Credits: {credits}</span>
        <button
          onClick={onProceed}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Proceed to Missions
        </button>
      </div>
    </div>
  );
}