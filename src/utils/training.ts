export function calculateTrainingCost(currentLevel: number): number {
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
}