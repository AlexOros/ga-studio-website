import React, { useState } from "react";
import { UploadFileEntity } from "@models";
import { ImageSwiper } from "./components/imageSwiper";
import { ContentImage } from "components/contentImage/ContentImage";

export const ContentImageSwiper = ({
  images,
}: {
  images: UploadFileEntity[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (images.length === 1) {
    console.log(images);
    return (
      <ContentImage
        image={images[0]}
        open={isModalOpen}
        onClose={handleCloseModal}
        onOpen={handleOpenModal}
      />
    );
  }

  return (
    <ImageSwiper
      images={images}
      open={isModalOpen}
      onClose={handleCloseModal}
      onOpen={handleOpenModal}
    />
  );
};
