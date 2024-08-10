interface Props {
  head: string;
}

const Th = ({ head }: Props) => {
  return (
    <th className="border-b bg-gray-700  p-4 ">
      <p className="font-normal leading-none  text-white">{head}</p>
    </th>
  );
};

export default Th;
