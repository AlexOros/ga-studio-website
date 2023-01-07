// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { AppStateProvider } from "@context";
import { theme } from "theme";

// TODO add one or more font
const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default function AppWithContext(props: AppProps) {
  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <App {...props} />
      </ChakraProvider>
    </AppStateProvider>
  );
}
