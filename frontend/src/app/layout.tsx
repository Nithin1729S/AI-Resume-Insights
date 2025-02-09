import "./styles/style.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "AI Resume Insights",
  description: "Elevate Your Resume, Unlock Your Career Potential",
  icons: {
    icon: "/favicon1.ico", // Ensure this is in your public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Other head tags if needed */}
      </head>
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
        {/* Render the Toaster so that toast notifications can appear */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
