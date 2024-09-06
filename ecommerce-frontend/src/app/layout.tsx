'use client'

import LoginLayout from "@/components/layout/login-layout";
import PageLayout from "@/components/layout/page-layout";
import { NO_SIDEBAR_PATH } from "@/core/config/sidebar.config";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { DialogProvider } from "@/hooks/common/use-dialog.hook";
import "./globals.css";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/loading/loading";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const PATH_NAME = usePathname()

  let Layout: any = PageLayout
  if (NO_SIDEBAR_PATH.includes(PATH_NAME)) Layout = LoginLayout

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <DialogProvider>
                <Layout>
                  {children}
                  <Toaster />
                </Layout>
              </DialogProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
