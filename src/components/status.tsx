type Props = {
  winner: string | null;
  xTurn: boolean;
};

const Status = ({ winner, xTurn }: Props) => {
  return (
    <div className="text-xl font-bold">
      {winner ? `🏆 Winner: ${winner}` : `🎯 Current Turn: ${xTurn ? "X" : "O"}`}
    </div>
  );
};

export default Status;
