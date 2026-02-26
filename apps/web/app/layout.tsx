import type { Metadata } from 'next';
import "./globals.css";
import { AppGenProvider } from "@/components/appgen-provider";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: 'FitForge - Build Your Best Self',
  description: 'Your personal fitness companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className="antialiased">
        <AppGenProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppGenProvider>
      </body>
    </html>
  );
}
