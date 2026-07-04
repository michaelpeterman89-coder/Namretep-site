'use client';

import { useState, useEffect } from 'react';

interface TableConfig {
  name: string;
  numDecks: number;
  blackjackPayout: string;
}

export default function BlackjackPlay() {
  const [config, setConfig] = useState<TableConfig | null>(null);
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('currentTable');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const dealCard = () => ranks[Math.floor(Math.random() * ranks.length)];

  const cardValue = (card: string): number => {
    if (card === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card)) return 10;
    return parseInt(card);
  };

  const calculateHand = (hand: string[]): number => {
    let total = hand.reduce((sum, card) => sum + cardValue(card), 0);
    const aces = hand.filter(card => card === 'A').length;
    for (let i = 0; i < aces; i++) {
      if (total > 21) total -= 10;
    }
    return total;
  };

  const startGame = () => {
    if (!config) return;
    setPlayerHand([dealCard(), dealCard()]);
    setDealerHand([dealCard(), dealCard()]);
    setGameOver(false);
    setMessage("");
  };

  const hit = () => {
    const newCard = dealCard();
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    if (calculateHand(newHand) > 21) {
      setGameOver(true);
      setMessage("Bust! Dealer wins.");
    }
  };

  const stand = () => {
    let dealer = [...dealerHand];
    while (calculateHand(dealer) < 17) {
      dealer.push(dealCard());
    }
    setDealerHand(dealer);
    setGameOver(true);

    const playerTotal = calculateHand(playerHand);
    const dealerTotal = calculateHand(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) setMessage("You Win!");
    else if (playerTotal === dealerTotal) setMessage("Push");
    else setMessage("Dealer Wins");
  };

  if (!config) {
    return <div className="p-8 text-center">No table selected.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-400 mb-2">{config.name}</h1>
        <p className="text-zinc-400 mb-12">{config.numDecks} Decks • {config.blackjackPayout}</p>

        <div className="bg-zinc-900 rounded-3xl p-12 mb-8">
          <div className="flex justify-between mb-12">
            <div>
              <p className="text-sm text-zinc-500">DEALER</p>
              <div className="text-6xl font-mono mt-2">{dealerHand.join(' ')}</div>
              <p className="text-emerald-400 mt-1">{gameOver && calculateHand(dealerHand)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">YOU</p>
              <div className="text-6xl font-mono mt-2">{playerHand.join(' ')}</div>
              <p className="text-emerald-400 mt-1">{calculateHand(playerHand)}</p>
            </div>
          </div>

          <div className="text-3xl text-center mb-8 text-yellow-400">{message}</div>

          <div className="flex gap-4 justify-center">
            <button onClick={startGame} className="bg-yellow-500 text-black px-12 py-5 rounded-2xl font-semibold">New Hand</button>
            <button onClick={hit} disabled={gameOver || playerHand.length === 0} className="bg-zinc-800 px-12 py-5 rounded-2xl disabled:opacity-50">Hit</button>
            <button onClick={stand} disabled={gameOver || playerHand.length === 0} className="bg-zinc-800 px-12 py-5 rounded-2xl disabled:opacity-50">Stand</button>
          </div>
        </div>
      </div>
    </div>
  );
}