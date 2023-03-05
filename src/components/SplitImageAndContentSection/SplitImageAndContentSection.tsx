import {
  Box,
  Center,
  Container,
  ContainerProps,
  Show,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { BlurImage } from "components/BlurImage";
import React from "react";

export type SplitImageAndContentSectionProps = {
  children: React.ReactNode;
  contentPosition: "right" | "left";
  imageProps: {
    src: string;
    blurDataURL: string;
  };
  maxWidth?: ContainerProps["maxWidth"];
};
// TODO handle content position and responsive image shift
export const SplitImageAndContentSection = ({
  children,
  imageProps,
  contentPosition,
  maxWidth,
}: SplitImageAndContentSectionProps) => {
  const content = (
    <Center w="full">
      <Container maxWidth={maxWidth}>
        <VStack spacing={[6, 8, null, 16]} py={[16, null]}>
          {children}
        </VStack>
      </Container>
    </Center>
  );

  const image = (
    <Box h={["50vh", null, "100vh"]} w="full" position="relative">
      <BlurImage
        style={{
          objectFit: "cover",
        }}
        fill
        alt={"hero"}
        quality={100}
        {...imageProps}
      />
    </Box>
  );

  return (
    <Stack w="100%" direction={["column", null, "row"]} spacing={0}>
      <Show below="md">{image}</Show>

      {contentPosition === "left" && content}

      <Show above="md">{image}</Show>

      {contentPosition === "right" && content}
    </Stack>
  );
};
