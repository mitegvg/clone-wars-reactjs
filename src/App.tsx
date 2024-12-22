import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { IntroStory } from './components/IntroStory';
import { CloneCreation } from './components/clone/CloneCreation';
import { CloneTraining } from './components/training/CloneTraining';
import { MissionBoard } from './components/mission/MissionBoard';
import { CloneIntelligence } from './components/intelligence/CloneIntelligence';
import { ReflectionZone } from './components/reflection/ReflectionZone';
import { CreditsSystem } from './components/economy/CreditsSystem';
import { GameEnding } from './components/ending/GameEnding';
import type { GameState, Clone, Mission } from './types/game';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    credits: 1000,
    clones: [],
    activeMissions: [],
    gamePhase: 'intro'
  });

  const [transactions, setTransactions] = useState<Array<{
    id: string;
    amount: number;
    description: string;
    timestamp: Date;
  }>>([]);

  const handleCreateClone = (clone: Omit<Clone, 'id'>) => {
    const newClone = {
      ...clone,
      id: crypto.randomUUID()
    };
    setGameState(prev => ({
      ...prev,
      clones: [...prev.clones, newClone],
      credits: prev.credits - 100
    }));
    addTransaction(-100, `Created clone ${newClone.name}`);
  };

  const handleTrainClone = (cloneId: string, attribute: keyof Clone, value: number) => {
    const clone = gameState.clones.find(c => c.id === cloneId);
    if (!clone) return;

    const cost = Math.floor(100 * Math.pow(1.5, clone[attribute] - 1));
    if (gameState.credits < cost) return;

    setGameState(prev => ({
      ...prev,
      credits: prev.credits - cost,
      clones: prev.clones.map(c => 
        c.id === cloneId 
          ? { ...c, [attribute]: value, rebellionChance: attribute === 'intelligence' ? value * 0.1 : c.rebellionChance }
          : c
      )
    }));
    addTransaction(-cost, `Trained ${clone.name}'s ${attribute}`);
  };

  const handleAssignMission = (missionId: string, cloneId: string) => {
    const mission = gameState.activeMissions.find(m => m.id === missionId);
    if (!mission) return;

    setGameState(prev => ({
      ...prev,
      clones: prev.clones.map(c => 
        c.id === cloneId ? { ...c, status: 'mission' } : c
      ),
      activeMissions: prev.activeMissions.filter(m => m.id !== missionId)
    }));

    // Simulate mission completion after duration
    setTimeout(() => {
      const reward = mission.credits;
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + reward,
        clones: prev.clones.map(c => 
          c.id === cloneId ? { ...c, status: 'idle' } : c
        )
      }));
      addTransaction(reward, `${gameState.clones.find(c => c.id === cloneId)?.name} completed mission`);
    }, mission.duration * 1000); // Using seconds instead of minutes for demo
  };

  const addTransaction = (amount: number, description: string) => {
    setTransactions(prev => [...prev, {
      id: crypto.randomUUID(),
      amount,
      description,
      timestamp: new Date()
    }]);
  };

  const handlePhaseChange = (newPhase: GameState['gamePhase']) => {
    setGameState(prev => ({ ...prev, gamePhase: newPhase }));
  };

  const renderGamePhase = () => {
    switch (gameState.gamePhase) {
      case 'intro':
        return <IntroStory onStart={() => handlePhaseChange('creation')} />;
      case 'creation':
        return (
          <CloneCreation
            credits={gameState.credits}
            onCreateClone={handleCreateClone}
            onProceed={() => handlePhaseChange('training')}
          />
        );
      case 'training':
        return gameState.clones.map(clone => (
          <CloneTraining
            key={clone.id}
            clone={clone}
            credits={gameState.credits}
            onTrainClone={handleTrainClone}
            onProceed={() => handlePhaseChange('mission')}
          />
        ));
      case 'mission':
        return (
          <div className="space-y-6">
            <MissionBoard
              missions={gameState.activeMissions}
              clones={gameState.clones}
              onAssignMission={handleAssignMission}
            />
            <CreditsSystem
              credits={gameState.credits}
              transactions={transactions}
            />
          </div>
        );
      case 'reflection':
        return (
          <ReflectionZone
            clones={gameState.clones}
            onProceed={() => handlePhaseChange('ending')}
          />
        );
      case 'ending':
        return (
          <GameEnding
            clones={gameState.clones}
            totalCredits={gameState.credits}
            onRestart={() => {
              setGameState({
                credits: 1000,
                clones: [],
                activeMissions: [],
                gamePhase: 'intro'
              });
              setTransactions([]);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header credits={gameState.credits} gamePhase={gameState.gamePhase} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderGamePhase()}
      </main>
      <Footer />
    </div>
  );
}