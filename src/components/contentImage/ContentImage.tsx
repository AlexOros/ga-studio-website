import React from "react";
import { AspectRatio, Box, Container } from "@chakra-ui/react";
import { UploadFileEntity } from "@models";
import { getImageFormat, getImageFormatDimensions } from "@utils";
import { MotionBox } from "components/motion-box";
import { BlurImage } from "components/blurImage";

export type ContentImage = {
  image: UploadFileEntity;
  onClick: (id: number) => void;
};

export const ContentImage = ({ image, onClick }: ContentImage) => {
  const imageFormat = getImageFormat(image);
  const { hero, large, original, placeholder } = imageFormat;

  if (!original) return null;

  const src = large?.url || hero?.url || original.url;
  const { width, height } = getImageFormatDimensions(imageFormat, [
    "large",
    "hero",
    "original",
  ]);

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
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <AspectRatio maxH="400px" ratio={width / height}>
            <BlurImage
              width={width}
              height={height}
              alt={original?.alternativeText || ""}
              blurDataURL={placeholder}
              src={src}
              quality={80}
            />
          </AspectRatio>
        </MotionBox>
      </Box>
    </Container>
  );
};
