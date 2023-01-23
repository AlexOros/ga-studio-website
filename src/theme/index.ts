import {
  extendTheme,
  theme as chackraTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import foundations from "./foundations";
// import components from "./components"
// import foundations from "./foundations"

import styles from "./styles";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

let customTheme = {
  ...chackraTheme,
  config,
  styles,
  // components,
  ...foundations,
};

const theme = extendTheme(
  customTheme,
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export { theme };
