export * from "./ImageCard";
import { Box, Stack } from "@chakra-ui/react";
import { BlurImage } from "components/BlurImage";
import { Heading } from "components/Heading";
import { MotionBox } from "components/MotionBox";
import React from "react";

export type ImageCardProps = {
  url: string;
  name: string;
  blurDataURL?: string;
  alt?: string;
};

export const ImageCard = ({
  name,
  url,
  blurDataURL,
  alt = "",
}: ImageCardProps) => {
  return (
    <Box overflow={["visible", "hidden"]} position="relative">
      <MotionBox
        h={["45vh", null, null, "50vh"]}
        cursor="pointer"
        whileHover={{ scale: 1.05, filter: "brightness(150%)" }}
        // @ts-ignore
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <Box
          h="full"
          style={{
            filter: "brightness(50%)",
          }}
        >
          <BlurImage
            fill
            alt={alt}
            blurDataURL={blurDataURL}
            src={url}
            quality={80}
          />
        </Box>

        <Stack
          position="absolute"
          inset="0"
          placeContent="center"
          alignItems="center"
        >
          <Heading px={4} py={1} color="white">
            {name}
          </Heading>
        </Stack>
      </MotionBox>
    </Box>
  );
};
