import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { RiAdminFill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Enter | Admin Panel",
  description: "An assignment app",
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center pt-10 overflow-x-hidden">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
