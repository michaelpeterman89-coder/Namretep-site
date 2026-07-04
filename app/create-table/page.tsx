'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTable() {
  const router = useRouter();
  const [config, setConfig] = useState({
    id: Date.now().toString(),
    name: 'My Table',
    numDecks: 6,
    blackjackPayout: '3:2',
    dealerHitsSoft17: true,
    minBet: 5,
    maxBet: 500,
  });

  const createTable = () => {
    localStorage.setItem('currentTable', JSON.stringify(config));
    router.push('/games/blackjack/play');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Create Table</h1>
        {/* Form fields as before */}
        <button onClick={createTable} className="w-full bg-yellow-500 text-black py-6 rounded-2xl text-xl font-semibold mt-8">
          Create & Play
        </button>
      </div>
    </div>
  );
}