const prefixes = ['CT', 'RC', 'CC'];
const numbers = Array.from({ length: 9999 }, (_, i) => String(i + 1).padStart(4, '0'));

export function generateCloneName(): string {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  return `${prefix}-${number}`;
}