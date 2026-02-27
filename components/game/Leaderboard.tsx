import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_racing", true)
        .order("wpm", { ascending: false });
      if (data) setPlayers(data);
    };

    fetchPlayers();

    const channel = supabase
      .channel("realtime-leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        (payload) => {
          fetchPlayers();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <section aria-labelledby="leaderboard-heading" className="mt-20">
      <h2 id="leaderboard-heading" className="sr-only">
        Live Standings
      </h2>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
          <span className="text-3xl">🏁</span> Live Leaderboard
        </h3>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
          LIVE UPDATING
        </span>
      </div>

      <div className="overflow-hidden border border-gray-100 rounded-3xl shadow-2xl">
        <table className="w-full text-left bg-white border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-widest">
            <tr>
              <th scope="col" className="px-8 py-5 font-bold">
                Player
              </th>
              <th scope="col" className="px-8 py-5 font-bold">
                Speed (WPM)
              </th>
              <th scope="col" className="px-8 py-5 font-bold">
                Live Progress
              </th>
              <th scope="col" className="px-11 py-5 font-bold text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {players.length === 0 ? (
              <tr className="hover:bg-blue-50 transition-colors group">
                <td className="px-8 py-6 font-bold text-gray-400 italic">
                  No players joined yet...
                </td>
                <td className="px-8 py-6 font-mono font-bold text-gray-300">
                  --
                </td>
                <td className="px-8 py-6 font-mono font-bold text-gray-300">
                  --
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-400">
                    WAITING
                  </span>
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <tr
                  key={player.nickname}
                  className="hover:bg-blue-50 transition-colors group"
                >
                  <td className="px-8 py-6 font-bold text-gray-700">
                    {player.nickname}
                  </td>
                  <td className="px-8 py-6 font-mono font-bold text-blue-600">
                    {player.wpm}
                  </td>
                  <td className="px-8 py-6 font-mono text-sm text-gray-500 max-w-[200px] truncate">
                    {player.progress || "..."}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                        player.is_racing
                          ? "bg-green-100 text-green-700 group-hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700"
                      }`}
                    >
                      {player.is_racing ? "RACING" : "FINISHED"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
