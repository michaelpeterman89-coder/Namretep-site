'use client';

import { useState, useEffect } from 'react';

interface TableConfig {
  id: string;
  name: string;
  numDecks: number;
  blackjackPayout: string;
  dealerHitsSoft17: boolean;
  minBet: number;
}

export default function BlackjackPlay() {
  const [config, setConfig] = useState<TableConfig | null>(null);
  const [playerHand, setPlayerHand] = useState<number[]>([]);
  const [dealerHand, setDealerHand] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('currentTable');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const dealCard = () => Math.floor(Math.random() * 13) + 1;

  const getCardValue = (card: number) => card > 10 ? 10 : card;

  const calculateHand = (hand: number[]) => {
    let total = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    const aces = hand.filter(card => card === 1).length;
    for (let i = 0; i < aces; i++) {
      if (total + 10 <= 21) total += 10;
    }
    return total;
  };

  const startGame = () => {
    if (!config) return;
    const p1 = dealCard();
    const p2 = dealCard();
    const d1 = dealCard();
    const d2 = dealCard();
    setPlayerHand([p1, p2]);
    setDealerHand([d1, d2]);
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
    while (calculateHand(dealer) < (config?.dealerHitsSoft17 ? 17 : 18)) {
      dealer.push(dealCard());
    }
    setDealerHand(dealer);
    setGameOver(true);

    const playerTotal = calculateHand(playerHand);
    const dealerTotal = calculateHand(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) setMessage("You win!");
    else if (playerTotal === dealerTotal) setMessage("Push");
    else setMessage("Dealer wins");
  };

  if (!config) {
    return <div className="p-8">No table. Create one first.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-400 mb-2">{config.name}</h1>
        <p className="text-zinc-400 mb-8">{config.numDecks} Decks • {config.blackjackPayout}</p>

        <div className="bg-zinc-900 rounded-3xl p-12 mb-8">
          <div className="flex justify-between mb-12">
            <div>
              <p>Dealer</p>
              <div className="text-5xl font-mono">{dealerHand.join(' ')}</div>
            </div>
            <div className="text-right">
              <p>You</p>
              <div className="text-5xl font-mono">{playerHand.join(' ')}</div>
            </div>
          </div>

          <div className="text-3xl text-center mb-8 text-yellow-400">{message}</div>

          <div className="flex gap-4 justify-center">
            <button onClick={startGame} className="bg-yellow-500 text-black px-12 py-5 rounded-2xl">Deal</button>
            <button onClick={hit} disabled={gameOver} className="bg-zinc-800 px-12 py-5 rounded-2xl">Hit</button>
            <button onClick={stand} disabled={gameOver} className="bg-zinc-800 px-12 py-5 rounded-2xl">Stand</button>
          </div>
        </div>
      </div>
    </div>
  );
}