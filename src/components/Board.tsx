import Square from "./Square";

type Props = {
  board: (string | null)[];
  handleClick: (index: number) => void;
  xTurn: boolean;
  winningLine: number[] | null;
  isGameOver: boolean;
};

const Board = ({ board, handleClick, xTurn, winningLine, isGameOver }: Props) => {
  return (
    <div className="w-full aspect-square max-w-[290px] sm:max-w-[340px] md:max-w-[380px] grid grid-cols-3 gap-2.5 sm:gap-3.5 mx-auto bg-fuchsia-100/40 p-2.5 sm:p-3.5 rounded-2xl border border-white/40 shadow-inner">
      {board.map((cell, index) => {
        const isWinningSquare = winningLine?.includes(index) ?? false;
        return (
          <Square 
            key={index} 
            value={cell} 
            onClick={() => handleClick(index)} 
            xTurn={xTurn}
            isWinningSquare={isWinningSquare}
            isGameOver={isGameOver}
          />
        );
      })}
    </div>
  );
};

export default Board;
