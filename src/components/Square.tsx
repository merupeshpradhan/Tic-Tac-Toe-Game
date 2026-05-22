type Props = {
  value: string | null;
  onClick: () => void;
  xTurn: boolean;
  isWinningSquare: boolean;
  isGameOver: boolean;
};

const Square = ({ value, onClick, xTurn, isWinningSquare, isGameOver }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={value !== null || isGameOver}
      className={`group relative w-full aspect-square flex items-center justify-center rounded-xl text-3xl sm:text-4xl font-black shadow-sm transition-all duration-200 focus:outline-none border select-none cursor-pointer
        ${isWinningSquare 
          ? "bg-gradient-to-br from-green-400 to-emerald-500 border-emerald-300 text-white shadow-emerald-200 scale-102 z-10 animate-pulse" 
          : "bg-white/90 hover:bg-fuchsia-50/50 border-fuchsia-100/60 active:scale-95 disabled:active:scale-100"
        }
      `}
      style={{ minWidth: 0 }}
    >
      {/* Real Value Component Display */}
      {value && (
        <span className={isWinningSquare ? "text-white" : value === "X" ? "text-cyan-500" : "text-fuchsia-500"}>
          {value}
        </span>
      )}

      {/* Modern Hover Ghost Preview Indicator Hint Element */}
      {!value && !isGameOver && (
        <span className={`opacity-0 group-hover:opacity-20 transition-opacity duration-150 absolute font-black
          ${xTurn ? "text-cyan-500 content-['X']" : "text-fuchsia-500 content-['O']"}
        `}>
          {xTurn ? "X" : "O"}
        </span>
      )}
    </button>
  );
};

export default Square;
