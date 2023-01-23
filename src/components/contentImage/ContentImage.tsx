import React from "react";
import { AspectRatio, Box, Container } from "@chakra-ui/react";
import { UploadFileEntity } from "@models";
import { getImageFormat, getImageFormatDimensions } from "@utils";
import { MotionBox } from "components/motion-box";
import { PageModal } from "components/pageModal";
import { BlurImage } from "components/blurImage";

export type ContentImage = {
  image: UploadFileEntity;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const ContentImage = ({
  image,
  open,
  onOpen,
  onClose,
}: ContentImage) => {
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
    <Container onClick={onOpen} maxW="4xl" p={0}>
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
          <AspectRatio maxH="600px" ratio={width / height}>
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

      <PageModal isOpen={open} onClose={onClose}>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          <AspectRatio overflow="hidden" maxH="100vh" ratio={width / height}>
            <BlurImage
              alt={original?.alternativeText || ""}
              blurDataURL={placeholder}
              src={hero?.url ?? src}
              width={original.width ?? 0}
              height={original.height ?? 0}
              style={{
                objectFit: "contain",
              }}
              quality={100}
            />
          </AspectRatio>
        </Box>
      </PageModal>
    </Container>
  );
};
