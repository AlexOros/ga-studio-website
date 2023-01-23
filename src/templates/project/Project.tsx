import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { ROUTES } from "@api";
import { ContentImageSwiper, ContentBlocks } from "@components";
import { ProjectEntity } from "@models";
import { useRouter, useSyncNextLocale } from "@shared/hooks";
import { HeroSection } from "./components/HeroSection";

export const Project = ({ data }: { data: ProjectEntity }) => {
  const { locale } = useRouter();
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

  return (
    <Box overflow="hidden">
      {image?.data && (
        <HeroSection imageData={image?.data} title={title ?? ""} />
      )}

      <Container mx="auto" maxWidth="3xl">
        <VStack spacing={4}>
          {(content as any)?.map((block: any) => {
            if (block.__component === "common.rich-text") {
              return (
                <ContentBlocks
                  key={block.id}
                  data={block.text && JSON.parse(block.text)}
                />
              );
            }

            return (
              <ContentImageSwiper key={block.id} images={block.images.data} />
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
};
