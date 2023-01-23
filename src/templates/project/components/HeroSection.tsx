import React from "react";
import { UploadFileEntity } from "@models";
import { getImageFormat, getImageFormatDimensions } from "@utils";
import { Box } from "@chakra-ui/react";
import { BlurImage } from "@components";

export type HeroSectionProps = {
  imageData: UploadFileEntity;
  title: string;
};

export function HeroSection({ imageData, title }: HeroSectionProps) {
  const imageFormat = getImageFormat(imageData);
  const { hero, original, placeholder } = imageFormat;
  const { width, height } = getImageFormatDimensions(imageFormat, [
    "hero",
    "original",
  ]);

  return (
    <Box position="relative" height="80vh" width="100%" overflow="hidden">
      {original && (
        <BlurImage
          loading="eager"
          width={width}
          height={height}
          blurDataURL={placeholder ?? ""}
          src={hero?.url ?? original.url}
          priority={false}
          alt="hero image"
          quality={80}
        />
      )}
      <h1> {title}</h1>
    </Box>
  );
}
