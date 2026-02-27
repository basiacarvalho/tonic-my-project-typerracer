"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroSection from "@/components/game/IntroSection";
import GameArena from "@/components/game/GameArena";
import Leaderboard from "@/components/game/Leaderboard";

export default function Home() {
  const [gameState, setGameState] = useState("lobby");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const targetText =
    "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.";

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === "racing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setNow(Date.now()); // Update "now" safely inside the effect
      }, 1000);
    }

    if (timeLeft === 0 && gameState === "racing") {
      setGameState("finished");
    }

    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  // --- DERIVED STATE (Pure calculation) ---
  let wpm = 0;
  // We use the 'now' state variable instead of calling Date.now()
  if (startTime && now && userInput.length > 0) {
    const timeElapsedInMinutes = (now - startTime) / 1000 / 60;
    // Standard formula: (chars / 5) / minutes
    wpm = Math.round(userInput.length / 5 / timeElapsedInMinutes);
  }

  const startRace = () => {
    const start = Date.now();
    setGameState("racing");
    setUserInput("");
    setStartTime(start);
    setNow(start); // Initialize now so calculation works immediately
    setTimeLeft(30);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-sans selection:bg-blue-100">
      <Header />
      <IntroSection />

      <GameArena
        gameState={gameState}
        setGameState={startRace}
        userInput={userInput}
        setUserInput={setUserInput}
        timeLeft={timeLeft}
        targetText={targetText}
        wpm={wpm}
      />

      <Leaderboard />
      <Footer />
    </main>
  );
}
