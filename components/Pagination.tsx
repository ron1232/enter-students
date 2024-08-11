"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  pathname: string;
  itemsLength: number;
}

const Pagination = ({ pathname, itemsLength }: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page: number = Number(searchParams.get("page")) || 1;

  return (
    <div className="mb-12 flex items-center justify-between gap-x-16">
      <div className="flex space-x-6">
        <Link
          href={{
            pathname: pathname,
            query: {
              search: search !== "" ? search : "",
              page: page > 1 ? page - 1 : 1,
            },
          }}
          className={clsx(
            "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
            page <= 1 && "pointer-events-none opacity-50"
          )}
        >
          Previous Page
        </Link>
        <Link
          href={{
            pathname: pathname,
            query: {
              search: search !== "" ? search : "",
              page: page + 1,
            },
          }}
          className={clsx(
            "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
            itemsLength === 0 && "pointer-events-none opacity-50"
          )}
        >
          Next Page
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
