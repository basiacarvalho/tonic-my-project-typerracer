export default function Leaderboard() {
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
            <tr className="hover:bg-blue-50 transition-colors group">
              <td className="px-8 py-6 font-bold text-gray-700">Player_One</td>
              <td className="px-8 py-6 font-mono font-bold text-blue-600">
                --
              </td>
              <td className="px-8 py-6 font-mono font-bold text-gray-700">
                --
              </td>
              <td className="px-8 py-6 text-right">
                <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors">
                  WAITING
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
