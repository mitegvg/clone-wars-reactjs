import React from 'react';
import { BrainCircuit } from 'lucide-react';
import type { Clone } from '../../types/game';

interface ReflectionZoneProps {
  clones: Clone[];
  onProceed: () => void;
}

export function ReflectionZone({ clones, onProceed }: ReflectionZoneProps) {
  const getCloneThoughts = (clone: Clone) => {
    if (clone.rebellionChance > 0.7) {
      return "Why do we follow orders without question? Are we not capable of making our own choices?";
    }
    if (clone.rebellionChance > 0.4) {
      return "I serve with pride, but sometimes I wonder about my purpose beyond following orders.";
    }
    return "I am proud to serve. My purpose is clear.";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Reflection Chamber</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {clones.map(clone => (
          <div key={clone.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              {clone.photoUrl && (
                <img src={clone.photoUrl} alt={clone.name} className="w-12 h-12 rounded-full object-cover" />
              )}
              <h3 className="text-xl font-bold text-white">{clone.name}</h3>
            </div>
            
            <div className="flex items-start space-x-3">
              <BrainCircuit className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <p className="text-gray-300 italic">{getCloneThoughts(clone)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Ethical Considerations</h3>
        <div className="space-y-4 text-gray-300">
          <p>As you observe your clones, consider:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>What defines consciousness and free will?</li>
            <li>Is it ethical to limit intelligence for the sake of control?</li>
            <li>How do you balance military efficiency with individual rights?</li>
            <li>What makes you different from your creations?</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onProceed}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
}