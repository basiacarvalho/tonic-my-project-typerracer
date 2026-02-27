"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroSection from "@/components/game/IntroSection";
import GameArena from "@/components/game/GameArena";
import Leaderboard from "@/components/game/Leaderboard";

export default function Home() {
  const [gameState, setGameState] = useState("lobby");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const targetText =
    "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.";

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-sans selection:bg-blue-100">
      <Header />
      <IntroSection />

      <GameArena
        gameState={gameState}
        setGameState={setGameState}
        userInput={userInput}
        setUserInput={setUserInput}
        timeLeft={timeLeft}
        targetText={targetText}
      />

      <Leaderboard />
      <Footer />
    </main>
  );
}

// export default function Home() {
//   // Stan gry: 'lobby' | 'racing' | 'finished'
//   const [gameState, setGameState] = useState("lobby");
//   const [userInput, setUserInput] = useState("");
//   const [timeLeft, setTimeLeft] = useState(30);

//   const targetText =
//     "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.";

//   return (
//     <main className="max-w-4xl mx-auto px-4 py-12 font-sans selection:bg-blue-100">
//       {/* --- HEADER --- */}
//       <header className="text-center mb-12">
//         <h1 className="text-6xl font-black tracking-tighter font-mono italic uppercase">
//           Key<span className="text-blue-600">{"//"}</span>Dash
//         </h1>
//         <p className="text-gray-400 uppercase text-xs tracking-[0.3em] mt-2 font-bold">
//           Fast Fingers - Typing Game - Challenge
//         </p>
//       </header>

//       {/* --- INTRO SECTION (SEO Friendly) --- */}
//       <section aria-labelledby="intro-heading" className="mb-12">
//         <h2 id="intro-heading" className="sr-only">
//           Game Introduction
//         </h2>
//         <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl shadow-sm">
//           <p className="text-xl text-blue-900 leading-relaxed">
//             Think you&apos;ve got quick fingers? ⌨️
//             <span className="font-bold p-2">
//               Prove it in 30 seconds! 💥
//             </span>{" "}
//             <br /> Type the text below as fast as you can. Mistakes will slow
//             you down.
//           </p>
//         </div>
//       </section>

//       {/* --- GAME ARENA --- */}
//       <section aria-labelledby="arena-heading" className="space-y-6">
//         <h2 id="arena-heading" className="sr-only">
//           Typing Arena
//         </h2>

//         {/* Little info tag */}
//         <div className="flex items-center gap-2 px-1">
//           <span className="animate-bounce-x">👇🏻</span>
//           <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
//             Here is your sentence:
//           </span>
//         </div>

//         {/* Display Text Area */}
//         <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl font-mono text-2xl leading-relaxed shadow-xl text-gray-800 relative overflow-hidden">
//           {/* Dekoracyjny element w tle, żeby było bardziej "pro" */}
//           <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-20" />
//           {targetText}
//         </div>

//         {/* TIMER & STATS BAR (NEW) */}
//         <div className="flex justify-between items-end px-2">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
//               Remaining Time
//             </span>
//             <div
//               className={`text-4xl font-mono font-black ${timeLeft < 10 ? "text-red-500 animate-pulse" : "text-gray-900"}`}
//             >
//               {timeLeft}
//               <span className="text-xl ml-1 text-gray-400">s</span>
//             </div>
//           </div>

//           <div className="text-right">
//             <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">
//               Current Velocity
//             </span>
//             <span className="text-2xl font-mono font-bold text-blue-600">
//               0 <span className="text-sm text-gray-400">WPM</span>
//             </span>
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="relative">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder={
//               gameState === "lobby"
//                 ? "Enter your nickname to start..."
//                 : "Type the text here..."
//             }
//             className="w-full p-6 text-xl bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all shadow-inner font-mono"
//           />
//         </div>

//         <button
//           onClick={() => setGameState("racing")}
//           className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg active:scale-[0.98]"
//         >
//           {gameState === "lobby" ? "START RACE" : "RESTART"}
//         </button>
//       </section>

//       {/* --- LEADERBOARD SECTION --- */}
//       <section aria-labelledby="leaderboard-heading" className="mt-20">
//         <h2 id="leaderboard-heading" className="sr-only">
//           Live Standings
//         </h2>

//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
//             <span className="text-3xl">🏁</span> Live Leaderboard
//           </h3>
//           <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
//             LIVE UPDATING
//           </span>
//         </div>

//         <div className="overflow-hidden border border-gray-100 rounded-3xl shadow-2xl">
//           <table className="w-full text-left bg-white border-collapse">
//             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-widest">
//               <tr>
//                 <th scope="col" className="px-8 py-5 font-bold">
//                   Player
//                 </th>
//                 <th scope="col" className="px-8 py-5 font-bold">
//                   Speed (WPM)
//                 </th>
//                 <th scope="col" className="px-8 py-5 font-bold">
//                   Live Progress
//                 </th>
//                 <th scope="col" className="px-11 py-5 font-bold text-right">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               <tr className="hover:bg-blue-50 transition-colors group">
//                 <td className="px-8 py-6 font-bold text-gray-700">
//                   Player_One
//                 </td>
//                 <td className="px-8 py-6 font-mono font-bold text-blue-600">
//                   --
//                 </td>
//                 <td className="px-8 py-6 font-mono font-bold text-gray-700">
//                   --
//                 </td>
//                 <td className="px-8 py-6 text-right">
//                   <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors">
//                     WAITING
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="mt-20 text-center text-gray-400 text-xs font-medium uppercase tracking-[0.2em]">
//         &copy; 2026 KEY//DASH Protocol. All rights reserved.
//       </footer>
//     </main>
//   );
// }
