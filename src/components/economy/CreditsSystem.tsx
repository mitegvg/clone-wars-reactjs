import React from 'react';
import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

interface CreditsSystemProps {
  credits: number;
  transactions: Array<{
    id: string;
    amount: number;
    description: string;
    timestamp: Date;
  }>;
}

export function CreditsSystem({ credits, transactions }: CreditsSystemProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Credits Management</h2>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-bold text-yellow-400">{credits}</span>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div className="flex items-center space-x-3">
              {transaction.amount > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <div>
                <p className="text-white">{transaction.description}</p>
                <p className="text-sm text-gray-400">
                  {transaction.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className={`font-bold ${
              transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}