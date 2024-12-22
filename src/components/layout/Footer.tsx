import React from 'react';
import { Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400">
            <Info className="w-4 h-4" />
            <span className="text-sm">The Kamino Project - Clone Management Simulator</span>
          </div>
          <div className="text-sm text-gray-500">
            Made with advanced cloning technology
          </div>
        </div>
      </div>
    </footer>
  );
}