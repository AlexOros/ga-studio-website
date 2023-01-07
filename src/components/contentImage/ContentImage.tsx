import React from "react";
import { AspectRatio, Box, Container, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { UploadFileEntity } from "@models";
import { getImageFormat } from "@utils";
import { MotionBox } from "components/motion-box";
import { PageModal } from "components/pageModal";
import { motion } from "framer-motion";

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
  const { hero, large, original, thumbnail, medium } = getImageFormat(image);
  const [mediaQueryActive] = useMediaQuery("(max-width: 800px)");

  const src = large?.url || medium?.url || original?.url || "";

  return (
    <Container
      onClick={onOpen}
      maxW="4xl"
      p={0}
      {...(mediaQueryActive && { m: "1em calc(50% - 50vw)", w: "100vw" })}
    >
      <Box overflow={["visible", "hidden"]}>
        <MotionBox
          cursor="pointer"
          whileHover={{ scale: 1.05 }}
          // @ts-ignore
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <AspectRatio
            maxH="400px"
            ratio={(original?.width ?? 0) / (original?.height ?? 0)}
          >
            <Image
              alt={original?.alternativeText || ""}
              // placeholder="blur"
              // blurDataURL={thumbnail?.url}
              src={src}
              fill={true}
              style={{
                objectFit: "cover",
              }}
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
          <AspectRatio
            overflow="hidden"
            maxH="100vh"
            ratio={(original?.width ?? 0) / (original?.height ?? 0)}
          >
            <Image
              alt={original?.alternativeText || ""}
              // placeholder="blur"
              // blurDataURL={thumbnail?.url}
              src={hero?.url ?? src}
              fill={true}
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
