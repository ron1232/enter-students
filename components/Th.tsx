interface Props {
  head: string;
}

const Th = ({ head }: Props) => {
  return (
    <th className="border-b border-blue-gray-100 bg-blue-300 p-4 ">
      <p className="font-normal leading-none opacity-70">{head}</p>
    </th>
  );
};

export default Th;
