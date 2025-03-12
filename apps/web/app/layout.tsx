import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-provider";

export const metadata: Metadata = {
  title: "Go Park Golf",
  description: "Find and explore park golf courses in Korea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false`}
          />
        </head>
        <body className="antialiased">{children}</body>
      </html>
    </AuthProvider>
  );
}
