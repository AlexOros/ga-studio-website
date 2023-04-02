// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { AppStateProvider } from "@context";
import { theme } from "theme";
import { Header, Footer } from "@components";
import { useIsomorphicLayoutEffect } from "@shared/hooks";

// TODO add one or more font
const robot = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={robot.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default function AppWithContext(props: AppProps) {
  useIsomorphicLayoutEffect(() => {
    // Making sure chackra will always use light mode
    window.localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <App {...props} />
        <Footer />
      </ChakraProvider>
    </AppStateProvider>
  );
}
