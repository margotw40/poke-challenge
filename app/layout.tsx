import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokémon Guessing Game",
  description: "A game to guess the Pokémon based on its shiny sprite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
