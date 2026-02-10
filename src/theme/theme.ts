import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./tokens/colors";
import { textStyles } from "./tokens/textStyles";
import { buttonRecipe } from "./recipes/button";
import { menuRecipe } from "./recipes/menu";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts: {
        mono: { value: "Poppins" },
        heading: { value: "Poppins" },
        body: { value: "Poppins" },
      },
    },
    textStyles,
    recipes: {
      button: buttonRecipe,
    },
    slotRecipes: {
      menu: menuRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
