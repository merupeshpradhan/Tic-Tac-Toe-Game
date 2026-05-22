import Square from "./Square";

type Props = {
  board: (string | null)[];
  handleClick: (index: number) => void;
};

const Board = ({ board, handleClick }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {board.map((cell, index) => (
        <Square key={index} value={cell} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;
