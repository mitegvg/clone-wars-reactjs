export interface Clone {
  id: string;
  name: string;
  intelligence: number;
  strength: number;
  agility: number;
  rebellionChance: number;
  photoUrl: string | null;
  status: 'idle' | 'training' | 'mission';
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredStrength: number;
  requiredAgility: number;
  requiredIntelligence: number;
  credits: number;
  duration: number; // in minutes
}

export interface GameState {
  credits: number;
  clones: Clone[];
  activeMissions: Mission[];
  gamePhase: 'intro' | 'creation' | 'training' | 'mission' | 'reflection' | 'ending';
}