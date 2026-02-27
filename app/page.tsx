"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroSection from "@/components/game/IntroSection";
import GameArena from "@/components/game/GameArena";
import Leaderboard from "@/components/game/Leaderboard";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const CHARACTERS_PER_WORD = 5;

export default function Home() {
  const [gameState, setGameState] = useState("lobby");
  const [userInput, setUserInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const targetText =
    "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.";

  let wpm = 0;

  if (startTime && now && userInput.length > 0) {
    const timeElapsedInMinutes =
      (now - startTime) / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE;
    wpm = Math.round(
      userInput.length / CHARACTERS_PER_WORD / timeElapsedInMinutes,
    );
  }

  useEffect(() => {
    if (gameState === "finished" && nickname) {
      const endRaceSync = async () => {
        const supabase = createClient();
        await supabase
          .from("profiles")
          .update({ is_racing: false })
          .eq("nickname", nickname);
      };
      endRaceSync();
    }
  }, [gameState, nickname]);

  useEffect(() => {
    if (gameState !== "racing" || !nickname) return;

    const syncProgress = async () => {
      const supabase = createClient();

      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) correctChars++;
      }
      const accuracy =
        userInput.length > 0 ? correctChars / userInput.length : 0;

      const payload = {
        nickname: nickname,
        wpm: wpm,
        progress: userInput,
        accuracy: accuracy,
        is_racing: true,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(payload, {
          onConflict: "nickname",
        })
        .select();

      if (error) console.error("Sync error:", error.message);
    };

    const timeout = setTimeout(syncProgress, 200);
    return () => clearTimeout(timeout);
  }, [userInput, wpm, gameState, nickname]);

  useEffect(() => {
    if (gameState !== "racing") return;

    const interval = setInterval(() => {
      setNow(Date.now());

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  const startRace = () => {
    if (!userInput.trim()) {
      alert("Please enter a nickname first!");
      return;
    }
    setNickname(userInput);
    const start = Date.now();
    setGameState("racing");
    setUserInput("");
    setStartTime(start);
    setNow(start);
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
