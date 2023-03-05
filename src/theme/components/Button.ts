import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Button = {
  // Styles for the base style
  baseStyle: {
    borderRadius: "2px",
    textTransform: "uppercase",
  },
  // Styles for the size variations
  sizes: {},

  // Styles for the visual style variations
  variants: {
    solid: ({ colorScheme, colorMode }) => {
      if (colorMode === "dark") {
        return {
          ...(colorScheme === "primary"
            ? {
                bgColor: "white",
                color: "gray.900",
                _hover: {
                  bgColor: "gray.100",
                },
                _active: {
                  bgColor: "gray.200",
                },
              }
            : {}),
        };
      }

      return {
        ...(colorScheme === "primary"
          ? {
              bgColor: "gray.900",
              color: "white",
              _hover: {
                bgColor: "gray.800",
              },
              _active: {
                bgColor: "gray.700",
              },
            }
          : {}),
      };
    },
    outline: ({ colorScheme, colorMode }) => {
      if (colorMode === "light") {
        return {
          ...(colorScheme === "gray"
            ? {
                borderColor: "white",
                _hover: {
                  bgColor: "gray.800",
                },
                _active: {
                  bgColor: "gray.700",
                },
              }
            : {}),
        };
      }

      return {
        ...(colorScheme === "primary"
          ? {
              borderColor: "gray.900",
              _hover: {
                bgColor: "gray.100",
              },
              _active: {
                bgColor: "gray.200",
              },
            }
          : {}),
      };
    },
    link: {
      textTransform: "none",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    colorScheme: "primary",
  },
} satisfies ComponentStyleConfig;

export default Button;
