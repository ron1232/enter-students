"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { usePathname } from "next/navigation";

interface Props {
  username: string;
}

const Navbar = ({ username }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingAssignment, setLoadingAssignment] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "", redirect: false });
    router.push("/");
  };

  useEffect(() => {
    // Loading Spinner

    if (pathname.includes("students")) {
      return setLoadingStudents(false);
    }

    if (pathname.includes("assignments")) {
      return setLoadingAssignment(false);
    }
  }, [pathname]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6 shadow-xls">
      <div className="flex items-center gap-1 flex-shrink-0 text-white mr-6">
        <Image
          src="/assets/images/navbar.png"
          width={32}
          height={32}
          alt="icon"
        />
        <span className="font-semibold text-xl tracking-tight">
          Enter | Admin Panel
        </span>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/admin/students"
            className="block mt-4 lg:inline-block lg:mt-0 text-white w-20"
            onClick={() => {
              // Loading Spinner For Students
              if (pathname.includes("assignments")) setLoadingStudents(true);
            }}
          >
            <span className="flex items-center gap-1">
              Students {loadingStudents && <Spinner />}
            </span>
          </Link>
          <Link
            href="/admin/assignments"
            onClick={() => {
              // Loading Spinner For Assignments
              if (pathname.includes("students")) setLoadingAssignment(true);
            }}
            className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
          >
            <span className="flex items-center gap-1">
              Assignments {loadingAssignment && <Spinner />}
            </span>
          </Link>
        </div>
        <div>
          <span className="text-white mr-3 text-sm">Welcome {username} 👋</span>
          <button
            onClick={handleLogout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white   mt-4 lg:mt-0"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
