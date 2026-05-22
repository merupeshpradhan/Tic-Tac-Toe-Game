import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Board from "./components/Board";
import Status from "./components/Status";

import { checkWinner } from "./utils/gameLogic";

export default function App() {
  // Load initial board state safely
  const [board, setBoard] = useState<(string | null)[]>(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });

  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Derive turn directly from the board state to prevent sync bugs
  const xMoves = board.filter((cell) => cell === "X").length;
  const oMoves = board.filter((cell) => cell === "O").length;
  const xTurn = xMoves === oMoves;

  const handleClick = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
  };

  // Game Logic Evaluation Engine
  useEffect(() => {
    // Save current state to local storage
    localStorage.setItem("board", JSON.stringify(board));

    // Custom checkWinner that returns both the winner string AND the winning line indices
    // Example return: { winner: "X", line: [0, 1, 2] } or null
    const gameResult = checkWinner(board);

    if (gameResult?.winner) {
      setWinner(gameResult.winner);
      setWinningLine(gameResult.line);
      setIsGameOver(true);
      toast.success(`🎉 Player ${gameResult.winner} Wins!`, {
        id: "game-over",
      });
    } else if (board.every((cell) => cell !== null)) {
      setIsGameOver(true);
      toast.error("🤝 It's a Draw!", { id: "game-over" });
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setIsGameOver(false);
    localStorage.removeItem("board");
    toast("🔄 Game reset!", { id: "reset" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-blue-100 text-neutral-900 flex flex-col items-center justify-center px-4 py-6 sm:py-10 gap-6 selection:bg-fuchsia-200">
      <Toaster position="top-right" />

      <div className="w-full max-w-md flex flex-col items-center gap-4 bg-white/60 rounded-3xl shadow-[0_20px_50px_rgba(240,46,170,0.07)] p-5 sm:p-8 border border-white/50 backdrop-blur-xl">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 text-center select-none">
          Tic Tac Toe
        </h1>

        <Status winner={winner} xTurn={xTurn} isDraw={isGameOver && !winner} />

        <Board
          board={board}
          handleClick={handleClick}
          xTurn={xTurn}
          winningLine={winningLine}
          isGameOver={isGameOver}
        />

        <button
          onClick={resetGame}
          className="w-full mt-2 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-extrabold rounded-2xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 text-base sm:text-lg cursor-pointer"
        >
          🔄 Reset Game
        </button>
      </div>
      <footer className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-400 text-center tracking-wide select-none whitespace-nowrap">
  © {new Date().getFullYear()} Premium Edition • Built by Rupesh Pradhan
</footer>
    </div>
  );
}
