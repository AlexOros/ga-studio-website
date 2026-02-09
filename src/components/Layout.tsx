import { Box, ChakraProvider } from "@chakra-ui/react";
import { AppStateProvider } from "@context";
import { theme } from "theme";
import { Header, Footer } from "@components";
import { useIsomorphicLayoutEffect } from "@shared/hooks";
import { Roboto } from "next/font/google";

const robot = Roboto({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    // Making sure chackra will always use light mode
    window.localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <Box display="flex" flexDir="column" minHeight="100vh">
          <Header />
          <Box as="main" flex={1} className={robot.className}>
            {children}
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </AppStateProvider>
  );
}
