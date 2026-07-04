'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTable() {
  const router = useRouter();
  const [config, setConfig] = useState({
    name: 'My Table',
    numDecks: 6,
    blackjackPayout: '3:2',
    dealerHitsSoft17: true,
    minBet: 5,
    maxBet: 500,
  });

  const createAndPlay = () => {
    localStorage.setItem('currentTable', JSON.stringify(config));
    router.push('/games/blackjack/play');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Create Blackjack Table</h1>

        <div className="bg-zinc-900 rounded-3xl p-10 space-y-8">
          <div>
            <label className="block text-sm mb-2">Table Name</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({...config, name: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Decks</label>
              <select value={config.numDecks} onChange={(e) => setConfig({...config, numDecks: Number(e.target.value)})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3">
                {[1,2,4,6,8].map(n => <option key={n} value={n}>{n} Deck</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Blackjack Payout</label>
              <select value={config.blackjackPayout} onChange={(e) => setConfig({...config, blackjackPayout: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3">
                <option value="3:2">3:2</option>
                <option value="6:5">6:5</option>
              </select>
            </div>
          </div>

          <button onClick={createAndPlay} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-6 rounded-2xl text-xl font-semibold">
            Create & Play
          </button>
        </div>
      </div>
    </div>
  );
}