"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { CiSearch } from "react-icons/ci";

const Search = ({
  search,
  type,
}: {
  search?: string;
  type: "students" | "assignments";
}) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/admin/${type}`);
    } else {
      router.push(`/admin/${type}?search=${query}`);
    }
  }, [query]);

  return (
    <div className="relative rounded-md shadow-md mb-4 w-1/3 ">
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pl-3">
        <CiSearch />
      </div>
      <input
        value={text}
        placeholder={`Search ${type}...`}
        onChange={(e) => setText(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-2 text-black placeholder:text-black ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Search;
