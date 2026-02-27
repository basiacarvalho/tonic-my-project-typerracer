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

  const targetText =
    "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.";

  let wpm = 0;
  if (startTime && userInput.length > 0) {
    const now = Date.now();
    const timeElapsedInMinutes = (now - startTime) / 1000 / 60;
    wpm = Math.round(userInput.length / 5 / timeElapsedInMinutes);
  }

  const startRace = () => {
    setGameState("racing");
    setUserInput("");
    setStartTime(Date.now());
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
