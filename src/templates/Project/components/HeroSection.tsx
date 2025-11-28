import React from "react";
import { Box } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";

export type HeroSectionProps = {
  imageUrl: string;
  title: string;
};

export function HeroSection({ imageUrl, title }: HeroSectionProps) {

  return (
    <Box
      width="100%"
      position="relative"
      overflow="hidden"
      height={["60vh", null, "80vh"]}
    >
      {imageUrl && (
        <BlurImage
          loading="eager"
          fill={true}
          blurDataURL=""
          src={imageUrl}
          alt={title}
          quality={100}
        />
      )}
      <Box maxW={["80%"]} bottom={0} position="absolute">
        <Box px={[3, null, 6]} background="white">
          <Heading as="h1" accent="through" size={["h2", null, null, "h1"]}>
            {title}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}
