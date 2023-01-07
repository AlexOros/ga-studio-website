import { ROUTES } from "@api";
import { Container } from "@chakra-ui/react";
import { ContentImageSwiper, ContentBlocks } from "@components";
import { ProjectEntity } from "@models";
import { useRouter, useSyncNextLocale } from "@shared/hooks";
import { getImageFormat } from "@utils";

import React, { useState } from "react";

export const Project = ({ data }: { data: ProjectEntity }) => {
  const { locale } = useRouter();
  //   const { localeSlug } = data?.attributes || {};

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

  // console.log("🔥  data", data);
  const { hero, thumbnail, original } = getImageFormat(image?.data);

  return (
    <div>
      <h1> {title}</h1>
      {/* <Box position="relative" height="100vh" width="100%" overflow="hidden">
        {thumbnail && (
          <Image
            placeholder="empty"
            src={original.url}
            fill={true}
            priority={false}
            alt="hero image"
            style={{
              transition: "700ms all linear",
              // ...(hasLoaded
              //   ? { filter: "blur(0px)" }
              //   : { filter: "blur(40px)" }),
              objectFit: "cover",
            }}
            quality={80}
          />
        )}
      </Box> */}
      <Container mx="auto" maxWidth="3xl">
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
      </Container>
    </div>
  );
};
