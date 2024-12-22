import React from 'react';
import { CloudLightning } from 'lucide-react';

export function IntroStory({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-center space-x-4">
          <CloudLightning className="w-12 h-12 text-blue-400" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            The Kamino Project
          </h1>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700">
          <p className="text-lg leading-relaxed mb-4">
            Welcome to Kamino, the water world where the galaxy's finest cloning technology
            was perfected. As our newest genetic engineer, you've been entrusted with
            the responsibility of creating and managing an elite clone army.
          </p>
          
          <p className="text-lg leading-relaxed mb-4">
            But remember: with great power comes great ethical responsibility. Each clone
            you create is not just a soldier, but a being capable of thought and emotion.
            The more intelligent they become, the more they might question their purpose.
          </p>
          
          <p className="text-lg leading-relaxed">
            Will you prioritize efficiency and control, or nurture individuality at the
            risk of rebellion? The fate of your clones—and your legacy—rests in your hands.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                     transform transition hover:scale-105 focus:outline-none focus:ring-2
                     focus:ring-blue-400 focus:ring-opacity-50 shadow-lg"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}