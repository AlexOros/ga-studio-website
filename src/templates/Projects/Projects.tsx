import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { HEADER_HEIGHT, Heading, ImageCard } from "@components";
import { CategoryEntity, ProjectEntity } from "@models";
import {
  stringifySearchParams,
  useRouter,
  useSearchParams,
  useSyncNextLocale,
} from "@shared/hooks";
import { getImageFormat } from "@utils";
import { ROUTES } from "api/routes";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { TbZoomQuestion } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";
import { useSearch } from "./useSearch";

export type ProjectsProps = {
  projects: ProjectEntity[];
  categories: CategoryEntity[];
};

export const Projects = ({ projects, categories }: ProjectsProps) => {
  const { pathname, locale } = useRouter();
  const [searchQuery, setSearchQuery] = useSearch();

  const { searchParams, setSearchParams } = useSearchParams<{
    category: string | null;
  }>();
  const { category = "all" } = searchParams;

  const { t } = useTranslation(["common"]);

  const getNextLocaleWithSearchParam = () => {
    const suffix =
      category !== "all" ? `?${stringifySearchParams({ category })}` : "";
    return locale === "ro"
      ? `${ROUTES.projects.en}${suffix}`
      : `${ROUTES.projects.ro}${suffix}`;
  };

  useSyncNextLocale(getNextLocaleWithSearchParam());

  const filteredProjectsByCategory = projects
    .filter(({ attributes }) => {
      if (category === "all") return true;
      return attributes?.category?.data?.attributes?.name === category;
    })
    .filter(({ attributes }) =>
      attributes?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams((searchParams) => ({
      ...searchParams,
      category: newCategory === "all" ? null : newCategory,
    }));
    setSearchQuery("");
  };

  const pathnameWithLocale =
    locale === "ro" ? pathname : `/${locale}${pathname}`;

  return (
    <Box pt={`${HEADER_HEIGHT}px`}>
      <Center pb={6} pt={12}>
        <Heading size="h1">{t("common:projects")}</Heading>
      </Center>

      <VStack
        alignItems="start"
        px={4}
        py={8}
        width={["auto", null, null, "min-content"]}
      >
        <Stack
          direction={["column", null, null, "row"]}
          alignItems="center"
          alignSelf={["center", null, null, "start"]}
        >
          <Heading whiteSpace="nowrap" size="h5">
            {t("common:selectedCategory")}:
          </Heading>

          {categories.map(({ id, attributes }) => (
            <Button
              textTransform="none"
              onClick={() => handleCategoryChange(attributes!.name)}
              variant={category === attributes!.name ? "solid" : "ghost"}
              key={id}
            >
              {t(`common:categoryObj.${attributes?.name}`) ?? ""}
            </Button>
          ))}
        </Stack>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
            borderRadius={1}
            focusBorderColor="gray.800"
            variant="outline"
            placeholder={t("common:searchSelectedCategory") ?? "Search"}
          />
          {searchQuery && (
            <InputRightElement width="4.5rem">
              <IconButton
                size="sm"
                variant="ghost"
                onClick={() => setSearchQuery("")}
                aria-label="clear search input"
              >
                <Icon fontSize="2xl" as={RiCloseFill} />
              </IconButton>
            </InputRightElement>
          )}
        </InputGroup>
      </VStack>
      <Grid gridTemplateColumns={["1fr", null, null, "1fr 1fr"]} gap={2}>
        {filteredProjectsByCategory.map(({ id, attributes }) => {
          const { title, image, slug } = attributes ?? {};
          const { large, original, placeholder } = getImageFormat(image!.data);

          const { url } = large ?? {
            width: 0,
            height: 0,
            url: "",
          };

          return (
            <Box key={id} href={`${pathnameWithLocale}/${slug}`} as={Link}>
              <ImageCard
                name={title!}
                url={url}
                blurDataURL={placeholder}
                alt={original?.alternativeText || ""}
              />
            </Box>
          );
        })}
      </Grid>
      {filteredProjectsByCategory.length === 0 && (
        <Center py={12}>
          <VStack spacing={6}>
            <Icon as={TbZoomQuestion} fontSize="6xl" />
            <Heading>{t("common:noProjectFound")}</Heading>
          </VStack>
        </Center>
      )}
    </Box>
  );
};
