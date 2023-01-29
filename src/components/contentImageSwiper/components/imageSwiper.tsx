import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Container, AspectRatio, Box } from "@chakra-ui/react";
import { BlurImage, MotionBox } from "@components";
import { getImageFormat, getImageFormatDimensions } from "@utils";
import { UploadFileEntity } from "@models";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type ImageSwiperProps = {
  images: UploadFileEntity[];
  onClick: (id: number) => void;
};

export const ImageSwiper = ({ images, onClick }: ImageSwiperProps) => {
  return (
    <Container
      alignSelf="center"
      maxWidth={"2950"}
      p={0}
      maxHeight={"70%"}
      m="0 calc(50% - 50vw)"
      w={["99vw", "99.2vw", "99.3vw", "99.4vw"]}
    >
      <Swiper
        lazy
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{
          type: "fraction",
          clickable: true,
          dynamicBullets: true,
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          895: {
            slidesPerView: images.length > 1 ? 2 : 1,
          },
          1432: {
            slidesPerView: images.length > 2 ? 3 : 2,
          },
        }}
      >
        {images.map((image) => {
          const imageFormat = getImageFormat(image);
          const { large, original, placeholder, medium } = imageFormat;

          const src = large?.url || medium?.url || original?.url || "";

          const { width, height } = getImageFormatDimensions(imageFormat, [
            "large",
            "hero",
            "original",
          ]);

          return (
            <SwiperSlide
              key={original?.id}
              onClick={() => onClick(image.id as any)}
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
                  <AspectRatio maxH="400px" ratio={16 / 9}>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};
