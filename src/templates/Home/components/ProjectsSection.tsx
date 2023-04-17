import { Box, Divider, Grid, Stack } from "@chakra-ui/react";
import {
  SplitScreenSection,
  Heading,
  MotionBox,
  BlurImage,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
  ImageCard,
} from "@components";
import { ComponentHomeProjects, CategoryEntity } from "@models";
import { useTranslation } from "next-i18next";
import { getImageFormat } from "@utils";
import React from "react";
import Link from "next/link";
import { useRouter } from "@shared/hooks";
import { ROUTES } from "@api";

export const ProjectsSection = ({ data }: { data: ComponentHomeProjects }) => {
  const { title, categories = { data: [] } } = data;
  const { t } = useTranslation(["common"]);

  const categoryData = categories!.data;

  return (
    <>
      <Divider />
      <SplitScreenSection
        mainContentPosition={"left"}
        mainContent={
          <SplitScreenSectionContent>
            <Heading py={8} size="h1" alignSelf="center" accent="bottom">
              {title}
            </Heading>
          </SplitScreenSectionContent>
        }
        secondaryContent={
          <SplitScreenSectionImage>
            <Categories categories={categoryData} t={t} />
          </SplitScreenSectionImage>
        }
      />
    </>
  );
};

export function Categories({
  categories,
  t,
}: {
  categories: CategoryEntity[];
  t: any;
}) {
  const { locale } = useRouter();

  return (
    <Grid gridTemplateColumns={"1fr 1fr"}>
      {categories.map(({ attributes, id }) => {
        const { name, image } = attributes ?? {};
        const { large, original, placeholder } = getImageFormat(image!.data);

        const { url } = large ?? {
          width: 0,
          height: 0,
          url: "",
        };

        const href = `/${ROUTES.projects[locale]}?category=${name}`;

        return (
          <Box key={id} href={href} as={Link}>
            <ImageCard
              name={t(`common:categoryObj.${name}`)}
              url={url}
              blurDataURL={placeholder}
              alt={original?.alternativeText || ""}
            />
          </Box>
        );
      })}
    </Grid>
  );
}
