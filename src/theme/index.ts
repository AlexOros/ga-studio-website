import {
  extendTheme,
  theme as chackraTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import foundations from "./foundations";
import styles from "./styles";
import components from "./components";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
} satisfies ThemeConfig;

const theme = extendTheme({
  ...chackraTheme,
  config,
  styles,
  ...foundations,
  components,
});

export { theme };
