import React, { useState } from "react";
import {
  Container,
  Divider,
  VStack,
  Stack,
  Tag,
  Text,
  StackProps,
  Show,
} from "@chakra-ui/react";
import { ROUTES } from "@api";
import {
  ContentImageContainer,
  ContentBlocks,
  PageModal,
  FullPageSwiper,
} from "@components";
import { useRouter, useSyncNextLocale } from "@shared/hooks";
import { HeroSection } from "./components";
import {
  Maybe,
  ProjectContentDynamicZone,
  ProjectEntity,
  UploadFileEntity,
} from "@models";
import titleize from "titleizejs";
import { uniqBy, prop, pipe, reduce, __ } from "ramda";
import { useTranslation } from "next-i18next";

export const Project = ({ data }: { data: ProjectEntity | undefined }) => {
  if (!data) return null;

  return <ProjectContent data={data} />;
};

const ProjectContent = ({ data }: { data: ProjectEntity }) => {
  const [imageId, setImageId] = useState<number | null>(null);
  const { t } = useTranslation(["common"]);

  const handleOpenModal = (id: number) => setImageId(id);
  const handleCloseModal = () => setImageId(null);

  const { locale } = useRouter();
  const localeSlug =
    data?.attributes?.localizations?.data?.[0]?.attributes?.slug ?? null;

  const nextRoute =
    locale === "en"
      ? ROUTES.project.ro(localeSlug!)
      : ROUTES.project.en(localeSlug!);

  useSyncNextLocale(nextRoute);

  if (!data) return null;

  const { title, image, content, category } = data?.attributes || {};

  const projectImages = pipe(
    reduce(getImagesFromContentBlocks, []),
    uniqBy(prop("id"))
  )(content as any);

  return (
    <>
      <VStack as="article" overflow="hidden" spacing={[8, 12]} mb={32}>
        {image?.data && (
          <HeroSection imageData={image?.data} title={title ?? ""} />
        )}

        <Stack direction={["column", null, "row"]} spacing="8">
          {/* <Stack spacing="8" direction="row"> */}
          <Stat
            label={t("common:category")}
            value={
              t(`common:categoryObj.${category?.data?.attributes?.name}`) ?? ""
            }
          />

          <Show above="md">
            <Divider height="50px" orientation="vertical" />
          </Show>

          <Stat
            label="Status"
            value={t(`common:statusObj.${data.attributes!.status}`) ?? ""}
          />
          {/* </Stack> */}

          <Show above="md">
            <Divider height="50px" orientation="vertical" />
          </Show>

          <Stat
            label={t("common:location")}
            value={titleize(data.attributes!.location ?? "")}
          />
        </Stack>

        <Divider />

        <Container mx="auto" maxWidth="4xl">
          <VStack
            spacing={4}
            alignItems="flex-start"
            sx={{
              "h1, h2": {
                mb: 2,
              },
            }}
          >
            {content?.map((block) =>
              renderContentBlock(block, handleOpenModal)
            )}
          </VStack>
        </Container>
      </VStack>

      <PageModal
        id="projectModal"
        isOpen={typeof imageId === "number"}
        onClose={handleCloseModal}
      >
        <FullPageSwiper initialImageId={imageId!} images={projectImages} />
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
  console.log("🔥  block:", block);
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

function Stat({
  label,
  value,
  ...props
}: { label: string; value?: string } & StackProps) {
  if (!value) return null;

  return (
    <VStack spacing={1} {...props}>
      <Text fontWeight="bold" fontSize={["sm", "md"]}>
        {label}
      </Text>

      <Tag size={["sm", "md"]} colorScheme="gray">
        {value}
      </Tag>
    </VStack>
  );
}
