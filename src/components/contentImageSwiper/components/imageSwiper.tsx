import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper";
import Image from "next/image";
import { Container, AspectRatio, Box } from "@chakra-ui/react";
import { MotionBox } from "@components";
import { getImageFormat } from "@utils";
import { UploadFileEntity } from "@models";
import { PageModal } from "components/pageModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type ImageSwiperProps = {
  images: UploadFileEntity[];
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ImageSwiper = ({
  images,
  open,
  onOpen,
  onClose,
}: ImageSwiperProps) => {
  const [startingModalSlideIndex, setStartingModalSlideIndex] = useState(0);

  const handleSliderClick = (index: number) => {
    onOpen();
    setStartingModalSlideIndex(index);
  };

  const handleCloseModal = () => {
    onClose();
    setStartingModalSlideIndex(0);
  };

  return (
    <>
      <Container
        maxWidth={"2950"}
        p={0}
        maxHeight={"70%"}
        m="1em calc(50% - 50vw)"
        w="99.4vw"
      >
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation
          pagination={{
            type: "bullets",
            clickable: true,
            dynamicBullets: true,
          }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            895: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1432: {
              slidesPerView: images.length > 2 ? 3 : 2,
            },
            2060: {
              slidesPerView: 4,
            },
          }}
        >
          {images.map((image, index) => {
            const { large, original, thumbnail, medium } =
              getImageFormat(image);

            const src = large?.url || medium?.url || original?.url || "";

            return (
              <SwiperSlide
                key={original?.id}
                onClick={() => handleSliderClick(index)}
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>

      <PageModal id="slider modal" isOpen={open} onClose={handleCloseModal}>
        <Swiper
          lazy
          modules={[Navigation, Pagination, Keyboard, A11y]}
          keyboard={{
            enabled: true,
          }}
          navigation
          pagination={{
            type: "bullets",
            clickable: true,
            dynamicBullets: true,
          }}
          slidesPerView={1}
          spaceBetween={40}
          onInit={(swiper) => swiper.slideTo(startingModalSlideIndex)}
        >
          {images.map((image) => {
            const { hero, large, original, medium, thumbnail } =
              getImageFormat(image);

            const src =
              hero?.url || large?.url || medium?.url || original?.url || "";

            return (
              <SwiperSlide
                key={original?.id}
                style={{ height: "calc(100vh - 64px)" }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={thumbnail?.url}
                  alt={original?.alternativeText || ""}
                  src={src}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  quality={100}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </PageModal>
    </>
  );
};
