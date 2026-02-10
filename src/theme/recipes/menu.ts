import { defineSlotRecipe } from "@chakra-ui/react";

export const menuRecipe = defineSlotRecipe({
  slots: ["trigger", "content", "item"],
  base: {
    trigger: {
      border: "none",
    },
    content: {
      border: "none",
      bg: "gray.800",
    },
    item: {
      bg: "gray.800",
      _hover: {
        bg: "gray.700",
      },
    },
  },
});
