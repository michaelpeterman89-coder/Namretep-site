'use client';

export default function Blackjack() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-8xl mb-8">🃏</div>
        <h1 className="text-7xl font-bold text-yellow-400 mb-6">Blackjack</h1>
        <p className="text-2xl text-zinc-400 mb-12">Private tables • Configurable rules • Friends only</p>

        <div className="bg-zinc-900 rounded-3xl p-16 mb-12">
          <p className="text-3xl mb-8">Dealer AI • Hit / Stand / Double / Split</p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black text-2xl px-16 py-6 rounded-2xl font-semibold transition">
            Play Now (Demo)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-3">Table Rules</h3>
            <p className="text-zinc-400">Hit on soft 17 • 3:2 payout • Multiple decks</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-3">Stats Tracking</h3>
            <p className="text-zinc-400">Win rate • Hands played • Bankroll</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-3">Multiplayer</h3>
            <p className="text-zinc-400">Play with friends • Private tables</p>
          </div>
        </div>
      </div>
    </div>
  );
}