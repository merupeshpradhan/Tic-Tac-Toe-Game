type Props = {
  winner: string | null;
  xTurn: boolean;
  isDraw: boolean;
};

const Status = ({ winner, xTurn, isDraw }: Props) => {
  return (
    <div className="w-full min-h-[44px] flex items-center justify-center text-sm sm:text-base font-black text-center bg-white/40 border border-white/60 rounded-xl px-4 py-2 shadow-xs backdrop-blur-sm">
      {winner ? (
        <div className="flex items-center gap-1.5 text-emerald-600 animate-bounce">
          🏆 Winner:{" "}
          <span className={`px-2 py-0.5 rounded-md text-white font-black text-xs sm:text-sm shadow-xs ${winner === "X" ? "bg-cyan-500" : "bg-fuchsia-500"}`}>
            {winner}
          </span>
        </div>
      ) : isDraw ? (
        <div className="flex items-center gap-1.5 text-amber-600">
          🤝 Game Ended in a Draw!
        </div>
      ) : (
        <div className="flex items-center gap-2 text-neutral-600">
          🎯 Turn:{" "}
          <span className={`font-black tracking-wide ${xTurn ? "text-cyan-500" : "text-fuchsia-500"}`}>
            {xTurn ? "Player X" : "Player O"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Status;
