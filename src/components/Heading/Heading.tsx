import { Box, BoxProps, ResponsiveValue } from "@chakra-ui/react";
import React from "react";

interface HeadingProps extends BoxProps {
  accent?: "bottom" | "through";
  size?:
    | ResponsiveValue<"title" | "h1" | "h2" | "h3" | "h4" | "h5" | ("h6" & {})>
    | undefined;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  as = "h2",
  size = "h2",
  accent,
  ...restProps
}) => {
  if (accent) {
    return (
      <Box
        w="fit-content"
        display="block"
        as={as}
        textStyle={size}
        position="relative"
        zIndex={1}
        {...(accent === "bottom" && {
          textDecoration: "underline",
          textDecorationColor: "orange.400",
          textDecorationThickness: "8%",
        })}
        {...restProps}
      >
        {children}

        {accent === "through" && (
          <Box
            as="span"
            display="block"
            position="absolute"
            width="100%"
            height="60%"
            maxH="60px"
            bg="orange.400"
            zIndex={-1}
            top={0}
            left={0}
            transform="translateY(-30%)"
          />
        )}
      </Box>
    );
  }

  return (
    <Box as={as} textStyle={size} {...restProps}>
      {children}
    </Box>
  );
};

export { Heading };
