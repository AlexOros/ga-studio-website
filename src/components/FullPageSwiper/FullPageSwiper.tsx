import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper";
import { BlurImage } from "@components";

type ImageData = {
  id?: number;
  attributes?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};

export type FullPageSwiperProps = {
  initialImageId: number;
  images: ImageData[];
};

export const FullPageSwiper = ({
  initialImageId,
  images,
}: FullPageSwiperProps) => {
  const initialImageIndex = images.findIndex(
    (image: any) => image.id === initialImageId ?? 0
  );
  return (
    <Swiper
      loop
      lazy={{
        loadPrevNext: false,
      }}
      modules={[Navigation, Pagination, Keyboard, A11y]}
      keyboard={{
        enabled: true,
      }}
      navigation
      pagination={{
        type: "fraction",
        clickable: true,
        dynamicBullets: true,
      }}
      slidesPerView={1}
      spaceBetween={40}
      onInit={(swiper) => swiper.slideTo(initialImageIndex)}
    >
      {images.map((image) => {
        const url = image?.attributes?.url || "";
        const alt = image?.attributes?.alternativeText || "";

        return (
          <SwiperSlide
            key={image?.id}
            style={{
              height: "calc(100vh - 10px)",
              display: "grid",
              placeContent: "center",
            }}
          >
            <BlurImage
              style={{
                objectFit: "contain",
              }}
              fill
              blurDataURL=""
              alt={alt}
              src={url}
              quality={100}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
