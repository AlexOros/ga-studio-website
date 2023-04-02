import { Box, Divider, Grid, Stack } from "@chakra-ui/react";
import {
  SplitScreenSection,
  Heading,
  MotionBox,
  BlurImage,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from "@components";
import { ComponentHomeProjects, CategoryEntity } from "@models";
import { useTranslation } from "next-i18next";
import { getImageFormat } from "@utils";
import React from "react";

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
// TODO finish cards.
function Categories({
  categories,
  t,
}: {
  categories: CategoryEntity[];
  t: any;
}) {
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

        return (
          <Box key={id} overflow={["visible", "hidden"]} position="relative">
            <MotionBox
              h={["25vh", null, null, "50vh"]}
              cursor="pointer"
              whileHover={{ scale: 1.05 }}
              // @ts-ignore
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <BlurImage
                style={{
                  filter: "brightness(60%)",
                }}
                fill
                alt={original?.alternativeText || ""}
                blurDataURL={placeholder}
                src={url}
                quality={80}
              />

              <Stack
                position="absolute"
                inset="0"
                placeContent="center"
                alignItems="center"
              >
                <Heading px={4} py={1} color="white">
                  {t(`common:categories.${name}`)}
                </Heading>
              </Stack>
            </MotionBox>
          </Box>
        );
      })}
    </Grid>
  );
}
