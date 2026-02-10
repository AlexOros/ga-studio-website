import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "2px",
    textTransform: "uppercase",
  },

  variants: {
    variant: {
      solid: {
        _colorPalettePrimary: {
          bg: "gray.900",
          color: "white",
          _hover: {
            bg: "gray.800",
          },
          _active: {
            bg: "gray.700",
          },
        },
      },
      outline: {
        _colorPaletteGray: {
          borderColor: "white",
          _hover: {
            bg: "gray.800",
          },
          _active: {
            bg: "gray.700",
          },
        },
        _colorPalettePrimary: {
          borderColor: "gray.900",
          _hover: {
            bg: "gray.100",
          },
          _active: {
            bg: "gray.200",
          },
        },
      },
      link: {
        textTransform: "none",
      },
    },
  },

  defaultVariants: {
    colorPalette: "primary",
  },
});
