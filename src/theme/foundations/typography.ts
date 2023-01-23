import type { Theme } from "@chakra-ui/react"

export interface Typography {
  fonts: Partial<Theme["fonts"]>
}

const typography: Typography = {
  fonts: {
    heading: "Roboto",
    body: "Roboto"
  }
}

export default typography
