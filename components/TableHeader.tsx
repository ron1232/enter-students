interface Props {
  title: string;
}

const TableHeader = ({ title }: Props) => {
  return (
    <h3 className="text-center w-2/3 mx-auto mb-3 mt-10 underline text-lg">
      {title}
    </h3>
  );
};

export default TableHeader;
