import type { Clone, Mission } from '../types/game';

export function calculateMissionSuccess(clone: Clone, mission: Mission): number {
  const strengthFactor = clone.strength / mission.requiredStrength;
  const agilityFactor = clone.agility / mission.requiredAgility;
  const intelligenceFactor = clone.intelligence / mission.requiredIntelligence;
  
  const baseSuccess = (strengthFactor + agilityFactor + intelligenceFactor) / 3;
  return Math.min(Math.max(baseSuccess, 0), 1);
}