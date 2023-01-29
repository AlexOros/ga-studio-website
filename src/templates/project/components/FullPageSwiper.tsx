import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper";
import { getImageFormat } from "@utils";
import { BlurImage } from "@components";
import { UploadFileEntity } from "@models";

export type FullPageSwiperProps = {
  initialImageId: number;
  images: UploadFileEntity[];
};

export const FullPageSwiper = ({
  initialImageId,
  images,
}: FullPageSwiperProps) => {
  const initialImageIndex =
    images.findIndex((i) => i.id === (initialImageId as any)) ?? 0;
  return (
    <Swiper
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
        const imageFormat = getImageFormat(image);
        const { hero, original, placeholder } = imageFormat;
        const src = hero?.url || original?.url || "";

        return (
          <SwiperSlide
            key={original?.id}
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
              blurDataURL={placeholder}
              alt={original?.alternativeText || ""}
              src={src}
              quality={100}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
