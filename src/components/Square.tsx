type Props = {
  value: string | null;
  onClick: () => void;
};

const Square = ({ value, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-3xl font-bold text-white transition-all duration-200"
    >
      {value}
    </button>
  );
};

export default Square;
