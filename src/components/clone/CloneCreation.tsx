import React, { useState } from 'react';
import { Upload, Sliders } from 'lucide-react';
import { generateCloneName } from '../../utils/nameGenerator';
import type { Clone } from '../../types/game';

interface CloneCreationProps {
  onCreateClone: (clone: Omit<Clone, 'id'>) => void;
  onProceed: () => void;
  credits: number;
}

export function CloneCreation({ onCreateClone, onProceed, credits }: CloneCreationProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [traits, setTraits] = useState({
    strength: 5,
    agility: 5,
    intelligence: 5,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateClone = () => {
    const clone: Omit<Clone, 'id'> = {
      name: generateCloneName(),
      photoUrl: photo,
      strength: traits.strength,
      agility: traits.agility,
      intelligence: traits.intelligence,
      rebellionChance: traits.intelligence * 0.1,
      status: 'idle'
    };
    onCreateClone(clone);
    setPhoto(null);
    setTraits({ strength: 5, agility: 5, intelligence: 5 });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Clone</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
            {photo ? (
              <img src={photo} alt="Clone preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-400">Upload photo</span>
              </div>
            )}
            <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
          </label>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {Object.entries(traits).map(([trait, value]) => (
          <div key={trait} className="flex items-center space-x-4">
            <span className="text-white capitalize w-24">{trait}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={value}
              onChange={(e) => setTraits(prev => ({ ...prev, [trait]: Number(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-white w-8">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white">Credits: {credits}</span>
        <div className="space-x-4">
          <button
            onClick={handleCreateClone}
            disabled={!photo || credits < 100}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Create Clone (100 credits)
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Proceed to Training
          </button>
        </div>
      </div>
    </div>
  );
}