import type { Theme } from "@chakra-ui/react";

export interface Typography {
  fonts: Partial<Theme["fonts"]>;
}

const typography: Typography = {
  fonts: {
    mono: "Poppins",
    heading: "Poppins",
    body: "Poppins",
  },
};

export default typography;
