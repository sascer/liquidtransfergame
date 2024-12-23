import React, { useState, useEffect } from 'react';
import { Jug } from './components/Jug';
import { LanguageSelector } from './components/LanguageSelector';
import { Trophy, RotateCcw } from 'lucide-react';
import { translations } from './translations';

interface JugState {
  capacity: number;
  current: number;
}

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language as keyof typeof translations];

  const [jugs, setJugs] = useState<JugState[]>([
    { capacity: 10, current: 10 },
    { capacity: 7, current: 0 },
    { capacity: 3, current: 0 },
  ]);
  
  const [selectedJug, setSelectedJug] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (jugs[1].current === 5) {
      setHasWon(true);
    }
  }, [jugs]);

  const handleJugClick = (index: number) => {
    if (hasWon) return;

    if (selectedJug === null) {
      if (jugs[index].current > 0) {
        setSelectedJug(index);
      }
    } else {
      if (selectedJug !== index) {
        const newJugs = [...jugs];
        const sourceJug = newJugs[selectedJug];
        const targetJug = newJugs[index];
        
        const spaceInTarget = targetJug.capacity - targetJug.current;
        const amountToPour = Math.min(sourceJug.current, spaceInTarget);
        
        if (amountToPour > 0) {
          sourceJug.current -= amountToPour;
          targetJug.current += amountToPour;
          setJugs(newJugs);
          setMoves(moves + 1);
        }
      }
      setSelectedJug(null);
    }
  };

  const resetGame = () => {
    setJugs([
      { capacity: 10, current: 10 },
      { capacity: 7, current: 0 },
      { capacity: 3, current: 0 },
    ]);
    setSelectedJug(null);
    setMoves(0);
    setHasWon(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">
            {t.goal}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {t.moves}: {moves}
          </div>
        </div>

        <div className="flex justify-center gap-12 mb-8">
          {jugs.map((jug, index) => (
            <Jug
              key={index}
              capacity={jug.capacity}
              current={jug.current}
              onPour={() => {}}
              isSelectable={!hasWon}
              isSelected={selectedJug === index}
              onClick={() => handleJugClick(index)}
            />
          ))}
        </div>

        {hasWon && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
              <Trophy className="animate-bounce" />
              <span>{t.solved}</span>
            </div>
            <p className="text-gray-600 mt-2">
              {t.solvedIn} {moves} {t.movesLabel}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw size={20} />
            {t.reset}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;