import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Board from "./components/Board";
import Status from "./components/Status";

import { checkWinner } from "./utils/gameLogic";

export default function App() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));

  const [xTurn, setXTurn] = useState(true);

  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];

    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);

    setXTurn(!xTurn);
  };

  useEffect(() => {
  const gameWinner = checkWinner(board);

  if (gameWinner) {
    setWinner(gameWinner);

    toast.success(`🎉 Player ${gameWinner} Wins!`);
  } else if (
    !gameWinner &&
    board.every((cell) => cell !== null)
  ) {
    toast.error("🤝 It's a Draw!");
  }
}, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    setXTurn(true);

    setWinner(null);

    toast("🔄 Game reset!");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-5">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>

      <Status winner={winner} xTurn={xTurn} />

      <Board board={board} handleClick={handleClick} />

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Reset Game
      </button>
    </div>
  );
}
