import React, { useState } from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { ROUTES } from "@api";
import { ContentImageContainer, ContentBlocks, PageModal } from "@components";
import { useSyncNextLocale } from "@shared/hooks";
import { HeroSection, FullPageSwiper } from "./components";
import {
  Maybe,
  ProjectContentDynamicZone,
  ProjectEntity,
  UploadFileEntity,
} from "@models";
import { uniqBy, prop, pipe, reduce, __ } from "ramda";

export const Project = ({ data }: { data: ProjectEntity }) => {
  const [imageId, setImageId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => setImageId(id);
  const handleCloseModal = () => setImageId(null);

  // const { localeSlug } = data?.attributes || {};

  //   const nextRoute =
  //     locale === "en"
  //       ? ROUTES.project.ro(localeSlug!)
  //       : ROUTES.project.en(localeSlug!);

  useSyncNextLocale(ROUTES.project.ro("en"));

  const {
    title,
    image,
    content,
    // info: infoList,
    // description = [],
  } = data?.attributes || {};

  const projectImages = pipe(
    reduce(getImagesFromContentBlocks, []),
    uniqBy(prop("id"))
  )(content as any);

  return (
    <>
      <Box as="article" overflow="hidden">
        {image?.data && (
          <HeroSection imageData={image?.data} title={title ?? ""} />
        )}

        <Container mx="auto" maxWidth="4xl">
          <VStack spacing={4} alignItems="flex-start">
            {content?.map((block) =>
              renderContentBlock(block, handleOpenModal)
            )}
          </VStack>
        </Container>
      </Box>

      <PageModal
        id="projectModal"
        isOpen={typeof imageId === "number"}
        onClose={handleCloseModal}
      >
        <FullPageSwiper
          initialImageId={imageId as number}
          images={projectImages}
        />
      </PageModal>
    </>
  );
};

function renderContentBlock(
  block: Maybe<ProjectContentDynamicZone>,
  onClick: (id: number) => void
) {
  if (!block) return;

  if ("text" in block) {
    return (
      <ContentBlocks
        onImageClick={onClick}
        key={block.id}
        data={block.text && JSON.parse(block.text)}
      />
    );
  } else if ("images" in block) {
    return (
      <ContentImageContainer
        onClick={onClick}
        key={block.id}
        images={block.images?.data ?? []}
      />
    );
  }
}

function getImagesFromContentBlocks(
  acc: UploadFileEntity[],
  block: ProjectContentDynamicZone
) {
  if ("images" in block) {
    return [...acc, ...(block?.images?.data ?? [])];
  } else if ("text" in block && block.text) {
    const blocks = JSON.parse(block.text).blocks;
    return [
      ...acc,
      ...blocks
        .filter((b: any) => b.type === "image")
        .map((image: any) => ({
          id: image.data.file.id,
          attributes: image.data.file,
        })),
    ];
  }
  return acc;
}
