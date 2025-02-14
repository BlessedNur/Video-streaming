import { Inter } from "next/font/google";
import "./globals.css";
import Context from "@/context/Context";
import { SkeletonTheme } from "react-loading-skeleton";
import AuthProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuanMovies",
  description: "Exploe large variety of movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context>
          <AuthProvider>{children}</AuthProvider>
        </Context>
        {/* </SkeletonTheme> */}
        <script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
          defer
        ></script>
      </body>
    </html>
  );
}
