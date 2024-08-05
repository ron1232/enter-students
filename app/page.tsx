import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <LoginForm />
        </div>

        <div className="md:block hidden w-1/2">
          <Image
            alt="classroom"
            className="rounded-2xl"
            src="/assets/images/learning.jpg"
            width={480}
            height={720}
          />
        </div>
      </div>
    </section>
  );
}
