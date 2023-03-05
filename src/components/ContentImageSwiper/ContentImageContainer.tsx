import React, { useState } from "react";
import { UploadFileEntity } from "@models";
import { ImageSwiper } from "./components/imageSwiper";
import { ContentImage } from "components/ContentImage/ContentImage";

export const ContentImageContainer = ({
  images,
  onClick,
}: {
  images: UploadFileEntity[];
  onClick: (id: number) => void;
}) => {
  if (images.length === 1) {
    return <ContentImage image={images[0]} onClick={onClick} />;
  }

  return <ImageSwiper images={images} onClick={onClick} />;
};
