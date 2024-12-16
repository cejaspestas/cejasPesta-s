import { Inter } from "next/font/google";

const geistSans = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={geistSans.className}>
      {children}
    </div>
  );
}
