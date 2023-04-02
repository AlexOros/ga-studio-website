import { ChakraProvider } from "@chakra-ui/react";
import { AppStateProvider } from "@context";
import { theme } from "theme";
import { Header, Footer } from "@components";
import { useIsomorphicLayoutEffect } from "@shared/hooks";

export default function Layout({ children }: { children: React.ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    // Making sure chackra will always use light mode
    window.localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <Header />
        {children}
        <Footer />
      </ChakraProvider>
    </AppStateProvider>
  );
}
