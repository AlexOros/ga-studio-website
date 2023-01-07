import React, { useState } from "react";

import { MotionBox } from "@components";
import { getImageFormat } from "@utils";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Container,
  Box,
  ModalProps,
  AspectRatio,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import { UploadFileEntity } from "@models";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ImageSwiper = ({ images }: { images: UploadFileEntity[] }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImageSlidesModal, setShowImageSlidesModal] = useState(false);
  const [startingModalSlideIndex, setStartingModalSlideIndex] = useState(0);

  const handleSliderClick = (index: number) => {
    setShowImageSlidesModal(true);
    setStartingModalSlideIndex(index);
  };

  const handleCloseSliderModal = () => {
    setShowImageSlidesModal(false);
    setStartingModalSlideIndex(0);
  };

  if (images.length === 1) {
    const sindleImage = images[0];
    const { hero, large, original, thumbnail, medium } =
      getImageFormat(sindleImage);

    const src = large?.url || medium?.url || original?.url || "";

    return (
      <Container
        onClick={() => setShowImageModal(!showImageModal)}
        maxW="4xl"
        p={0}
      >
        <Box overflow={["visible", "hidden"]}>
          <MotionBox
            cursor="pointer"
            whileHover={{ scale: 1.02 }}
            // @ts-ignore
            transition={{
              type: "spring",
              stiffness: 100,
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

        <ImageModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
            <AspectRatio overflow="hidden" maxH="95vh" ratio={16 / 9}>
              <Image
                alt={original?.alternativeText || ""}
                // placeholder="blur"
                // blurDataURL={thumbnail?.url}
                src={hero?.url ?? src}
                fill={true}
                style={{
                  objectFit: "cover",
                }}
                quality={100}
              />
            </AspectRatio>
          </Box>
        </ImageModal>
      </Container>
    );
  }

  return (
    <>
      <Container
        maxWidth={"2950"}
        p={0}
        maxHeight={"70%"}
        style={{
          margin: "1em calc(50% - 50vw)",
          width: "99vw",
        }}
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
                // style={{ overflow: "hidden" }}
                onClick={() => handleSliderClick(index)}
              >
                <MotionBox
                  cursor="pointer"
                  whileHover={{ scale: 1.02 }}
                  // @ts-ignore
                  transition={{
                    type: "spring",
                    stiffness: 100,
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>

      <ImageModal
        id="slider modal"
        isOpen={showImageSlidesModal}
        onClose={handleCloseSliderModal}
      >
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
                style={{ height: "calc(100vh - 64px)" }}
                key={original?.id}
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
      </ImageModal>
    </>
  );
};

const ImageModal = ({ isOpen, onClose, children }: ModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} size="full">
    <ModalOverlay />
    <ModalContent borderRadius="none">
      <ModalCloseButton
        zIndex="1"
        colorScheme="gray"
        size="lg"
        borderRadius="2px"
      />

      <ModalBody>
        <Container maxWidth={"full"} h={"calc(100vh - 64px)"}>
          {children}
        </Container>
      </ModalBody>
    </ModalContent>
  </Modal>
);
