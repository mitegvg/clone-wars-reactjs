import React from 'react';
import { Trophy, AlertTriangle } from 'lucide-react';
import type { Clone, Mission } from '../../types/game';
import { calculateMissionSuccess } from '../../utils/mission';

interface MissionBoardProps {
  missions: Mission[];
  clones: Clone[];
  onAssignMission: (missionId: string, cloneId: string) => void;
}

export function MissionBoard({ missions, clones, onAssignMission }: MissionBoardProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Available Missions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map(mission => (
          <div key={mission.id} className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
            <p className="text-gray-400 mb-4">{mission.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty:</span>
                <span className={`
                  ${mission.difficulty === 'easy' ? 'text-green-400' : ''}
                  ${mission.difficulty === 'medium' ? 'text-yellow-400' : ''}
                  ${mission.difficulty === 'hard' ? 'text-red-400' : ''}
                `}>
                  {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reward:</span>
                <span className="text-yellow-400">{mission.credits} credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{mission.duration} minutes</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold">Required Stats:</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-sm text-gray-400">Strength</div>
                  <div className="text-white">{mission.requiredStrength}</div>
                </div>
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-sm text-gray-400">Agility</div>
                  <div className="text-white">{mission.requiredAgility}</div>
                </div>
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-sm text-gray-400">Intelligence</div>
                  <div className="text-white">{mission.requiredIntelligence}</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <select
                onChange={(e) => onAssignMission(mission.id, e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-2"
                defaultValue=""
              >
                <option value="" disabled>Assign Clone</option>
                {clones
                  .filter(clone => clone.status === 'idle')
                  .map(clone => {
                    const success = calculateMissionSuccess(clone, mission);
                    return (
                      <option key={clone.id} value={clone.id}>
                        {clone.name} - Success: {(success * 100).toFixed(1)}%
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}