import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Enter | Admin Panel",
  description: "An assignment app",
};

const AdminLayout = async ({ children }: Props) => {
  const data = await getServerSession(authOptions);

  return (
    <>
      <ToastContainer />
      <Navbar username={data?.user?.username as string} />
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center pt-10 overflow-x-hidden">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
