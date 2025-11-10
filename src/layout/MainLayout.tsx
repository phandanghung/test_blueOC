import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import naruto from "../assets/naruto.png";
import sasuke from "../assets/images.jpg";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex flex-col justify-between w-full">
      <header className="fixed flex justify-center gap-5 bg-white w-full py-8">
          <Link
            to="/"
            className="hover:underline"
          >
            Home
          </Link>

          <a
            href="/mypage.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-yellow-300"
          >
            Thuật toán
          </a>
      </header>

      <main className="min-h-screen flex justify-between w-full p-2 mt-20">
        <img src={naruto} className="w-1/6 h-auto hidden sm:block" />
        <div>{children}</div>
        <img src={sasuke} className="w-1/6 h-auto hidden sm:block" />
      </main>

      <footer className="text-gray-600 text-center p-4">
        &copy; {new Date().getFullYear()} Phan Đăng Hùng hehehehe.
      </footer>
    </div>
  );
};

export default MainLayout;
