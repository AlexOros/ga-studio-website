import React from "react";
import { AspectRatio, Box, Container } from "@chakra-ui/react";
import { MotionBox } from "components/MotionBox";
import { BlurImage } from "components/BlurImage";

type ImageData = {
  id?: number;
  attributes?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};

export type ContentImage = {
  image: ImageData;
  onClick: (id: number) => void;
};

export const ContentImage = ({ image, onClick }: ContentImage) => {
  const url = image?.attributes?.url;
  const alt = image?.attributes?.alternativeText || "";
  const width = image?.attributes?.width || 1200;
  const height = image?.attributes?.height || 800;

  if (!url) return null;

  return (
    <Container onClick={() => onClick(image.id as any)} maxW="4xl" p={0}>
      <Box
        position="relative"
        left="-10vw"
        marginRight="-20vw"
        overflow={["visible", "hidden"]}
      >
        <MotionBox
          cursor="pointer"
          whileHover={{ scale: 1.05 }}
          // @ts-ignore
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <AspectRatio maxH="400px" ratio={width / height}>
            <BlurImage
              width={width}
              height={height}
              alt={alt}
              blurDataURL=""
              src={url}
              quality={80}
            />
          </AspectRatio>
        </MotionBox>
      </Box>
    </Container>
  );
};
