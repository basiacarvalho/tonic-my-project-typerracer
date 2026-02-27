interface GameArenaProps {
  gameState: string;
  setGameState: (state: string) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  timeLeft: number;
  targetText: string;
  wpm: number;
}

export default function GameArena({
  gameState,
  setGameState,
  userInput,
  setUserInput,
  timeLeft,
  targetText,
  wpm,
}: GameArenaProps) {
  return (
    <section aria-labelledby="arena-heading" className="space-y-6">
      <h2 id="arena-heading" className="sr-only">
        Typing Arena
      </h2>

      <div className="flex items-center gap-2 px-1">
        <span className="animate-bounce-x">👇🏻</span>
        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
          Here is your sentence:
        </span>
      </div>

      <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl font-mono text-2xl leading-relaxed shadow-xl text-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-20" />
        {targetText}
      </div>

      <div className="flex justify-between items-end px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
            Remaining Time
          </span>
          <div
            className={`text-4xl font-mono font-black ${
              timeLeft < 10 ? "text-red-500 animate-pulse" : "text-gray-900"
            }`}
          >
            {timeLeft}
            <span className="text-xl ml-1 text-gray-400">s</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">
            Current Velocity
          </span>
          <span className="text-2xl font-mono font-bold text-blue-600">
            {wpm} <span className="text-sm text-gray-400">WPM</span>
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={
            gameState === "lobby"
              ? "Enter your nickname to start..."
              : "Type the text here..."
          }
          className="w-full p-6 text-xl bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all shadow-inner font-mono"
        />
      </div>

      <button
        onClick={() => setGameState("racing")}
        className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg active:scale-[0.98]"
      >
        {gameState === "lobby" ? "START RACE" : "RESTART"}
      </button>
    </section>
  );
}
