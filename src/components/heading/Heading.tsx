import { Box, BoxProps, OtherProps } from "@chakra-ui/react";
import React from "react";

interface HeadingProps extends BoxProps {
  accent?: "bottom" | "through";
  size: OtherProps["textStyle"];
}

const Heading: React.FC<HeadingProps> = ({
  children,
  as = "h2",
  size,
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
        {...restProps}
      >
        {children}

        {accent === "through" && (
          <Box
            as="span"
            display="block"
            position="absolute"
            width="100%"
            height="80%"
            maxH="85px"
            bg="orange.400"
            zIndex={-1}
            top={0}
            left={0}
            transform="translateY(-35%)"
          />
        )}
        {accent === "bottom" && (
          <Box
            as="span"
            display="inline-block"
            position="absolute"
            width="100%"
            height="2px"
            bg="orange.400"
            left={0}
            bottom={0}
            zIndex={-1}
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
