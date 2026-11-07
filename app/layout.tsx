import type { Metadata } from "next";
import "./globals.css";
import { BookingProvider } from "@/components/booking/BookingContext";
import { AuthProvider } from "@/components/auth/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

export const metadata: Metadata = {
  title: "MedBridge Global | Connected Healthcare",
  description:
    "Discover connected healthcare services, medical specialists, and modern diagnostic care with MedBridge Global.",
  openGraph: {
    title: "MedBridge Global | Connected Healthcare",
    description:
      "From trusted specialists to coordinated medical services, MedBridge Global brings healthcare closer together.",
    type: "website",
    locale: "en_US",
    siteName: "MedBridge Global",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-white text-[#080808]">
        <AuthProvider>
          <BookingProvider>
            {children}
            <AuthModal />
            <ChatbotWidget />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
