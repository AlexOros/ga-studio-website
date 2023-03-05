import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Menu: ComponentStyleConfig = {
  parts: ["menu", "list", "item"],
  // Styles for the base style
  baseStyle: ({ colorMode }) => ({
    menu: { border: "none" },
    list: {
      ...(colorMode === "dark" && {
        border: "none",
        bg: "gray.800",
      }),
      // boxShadow: "md",
    },
    item: {
      ...(colorMode === "dark" && {
        bg: "gray.800",
        _hover: {
          bg: "gray.700",
        },
      }),
    },
  }),
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
};

export default Menu;
