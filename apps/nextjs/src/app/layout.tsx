import "../styles/globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { env } from "@/env.mjs";
import { AmplitudeProvider } from "@/libs/amplitude";
import { readUserSession } from "@/libs/auth";
import { useUserStore } from "@/libs/store/user";
import { cn } from "@/libs/tailwind";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "전국 파크골프장 정보를 한 곳에서! | 파크골프가자",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "파크골프장 추천",
    "근처 파크골프장",
    "파크골프장 예약",
    "파크골프장 비교",
    "지역별 파크골프장",
    "파크골프장 리뷰",
    "파크골프장 가격",
  ],
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.links.blog,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@alwaysfun2183",
  },
  icons: {
    shortcut: [
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL("https://goparkgolf.app"),
  alternates: {
    canonical: "/",
  },
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await readUserSession();

  useUserStore.setState({ user: session?.user });

  return (
    <html lang="ko">
      <AmplitudeProvider apiKey={env.NEXT_PUBLIC_AMPLITUDE_API_KEY}>
        <body className={cn("bg-backgroundfont-sans antialiased")}>
          {props.children}
          <Toaster />
        </body>
      </AmplitudeProvider>
    </html>
  );
}
