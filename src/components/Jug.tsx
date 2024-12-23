import React from 'react';
import { Droplet } from 'lucide-react';

interface JugProps {
  capacity: number;
  current: number;
  onPour: (target: number) => void;
  isSelectable: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function Jug({ capacity, current, isSelectable, isSelected, onClick }: JugProps) {
  const fillPercentage = (current / capacity) * 100;
  
  return (
    <div 
      className={`relative flex flex-col items-center ${isSelectable ? 'cursor-pointer' : ''} ${
        isSelected ? 'ring-2 ring-blue-500 rounded-xl p-2' : ''
      }`}
      onClick={onClick}
    >
      <div className="text-lg font-semibold mb-2">{current}L / {capacity}L</div>
      <div className="relative w-24 h-48">
        {/* Bottle neck */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-200 border-4 border-gray-700 rounded-t-lg" />
        
        {/* Bottle body */}
        <div className="absolute top-6 w-full h-[calc(100%-1.5rem)] bg-gray-200 border-4 border-gray-700 rounded-b-3xl overflow-hidden">
          {/* Water */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
            style={{ height: `${fillPercentage}%` }}
          >
            {/* Water surface effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-blue-400 opacity-50" />
            
            {/* Water animation */}
            {current > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplet className="text-white animate-bounce" size={24} />
              </div>
            )}
          </div>
          
          {/* Glass reflection */}
          <div className="absolute top-0 right-0 w-4 h-full bg-white opacity-20 transform skew-x-[-20deg]" />
        </div>
      </div>
    </div>
  );
}