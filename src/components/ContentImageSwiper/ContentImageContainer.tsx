import React, { useState } from "react";
import { ImageSwiper } from "./components/imageSwiper";
import { ContentImage } from "components/ContentImage/ContentImage";

type ImageData = {
  id?: number;
  attributes?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};

export const ContentImageContainer = ({
  images,
  onClick,
}: {
  images: ImageData[];
  onClick: (id: number) => void;
}) => {
  if (images.length === 1) {
    return <ContentImage image={images[0]} onClick={onClick} />;
  }

  return <ImageSwiper images={images} onClick={onClick} />;
};
