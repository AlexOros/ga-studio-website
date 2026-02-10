import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  presets: ["@pandacss/preset-base", "@chakra-ui/react/preset"],
  outdir: "styled-system",
  jsxFramework: "react",
  staticCss: {
    css: [{
      properties: {
        colorPalette: ["gray", "primary", "orange", "purple"],
      },
    }],
  },
  hash: false,
  optimize: true,
});
