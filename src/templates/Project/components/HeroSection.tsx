import React from "react";
import { UploadFileEntity } from "@models";
import { getImageFormat } from "@utils";
import { Box } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";

export type HeroSectionProps = {
  imageData: UploadFileEntity;
  title: string;
};

export function HeroSection({ imageData, title }: HeroSectionProps) {
  const { hero, original, placeholder } = getImageFormat(imageData);

  return (
    <Box
      width="100%"
      position="relative"
      overflow="hidden"
      height={["60vh", null, "80vh"]}
    >
      {original && (
        <BlurImage
          loading="eager"
          fill={true}
          blurDataURL={placeholder ?? ""}
          src={hero?.url ?? original.url}
          alt="project image"
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
