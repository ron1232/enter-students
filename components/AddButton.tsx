import { MdAddBox } from "react-icons/md";

interface Props {
  onClick: () => void;
  text: string;
}

const AddButton = ({ onClick, text }: Props) => {
  return (
    <button
      className="bg-gray-700 rounded-xl text-white py-3 p-10 flex items-center gap-1 mb-10"
      onClick={onClick}
    >
      {text} <MdAddBox />
    </button>
  );
};

export default AddButton;
