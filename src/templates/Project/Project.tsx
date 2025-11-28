import React from "react";
import {
  Container,
  Divider,
  VStack,
  Stack,
  Tag,
  Text,
  StackProps,
  Show,
  Box,
} from "@chakra-ui/react";
import { ROUTES } from "@shared/routes";
import { useRouter, useSyncNextLocale } from "@shared/hooks";
import { HeroSection } from "./components";
import { Project as ProjectType } from "@/lib/content";
import titleize from "titleizejs";
import { useTranslation } from "next-i18next";

export const Project = ({ data }: { data: ProjectType | undefined }) => {
  if (!data) return null;

  return <ProjectContent data={data} />;
};

const ProjectContent = ({ data }: { data: ProjectType }) => {
  const { t } = useTranslation(["common"]);
  const { locale } = useRouter();

  // For now, use the same route for both locales (will be properly set up with i18n routing)
  const nextRoute =
    locale === "en"
      ? ROUTES.project.ro(data.slug)
      : ROUTES.project.en(data.slug);

  useSyncNextLocale(nextRoute);

  return (
    <VStack as="article" overflow="hidden" spacing={[8, 12]} mb={32}>
      {data.heroImage && (
        <HeroSection
          imageUrl={data.heroImage}
          title={data.title}
        />
      )}

      <Stack direction={["column", null, "row"]} spacing="8">
        <Stat
          label={t("common:category")}
          value={t(`common:categoryObj.${data.category}`) ?? data.category}
        />

        <Show above="md">
          <Divider height="50px" orientation="vertical" />
        </Show>

        <Stat
          label="Status"
          value={t(`common:statusObj.${data.status}`) ?? data.status}
        />

        <Show above="md">
          <Divider height="50px" orientation="vertical" />
        </Show>

        <Stat
          label={t("common:location")}
          value={titleize(data.location ?? "")}
        />
      </Stack>

      <Divider />

      <Container mx="auto" maxWidth="4xl">
        <Box
          sx={{
            "h1, h2, h3": {
              mb: 4,
              mt: 6,
              fontWeight: "bold",
            },
            "h1": {
              fontSize: ["2xl", "3xl"],
            },
            "h2": {
              fontSize: ["xl", "2xl"],
            },
            "h3": {
              fontSize: ["lg", "xl"],
            },
            "p": {
              mb: 4,
              lineHeight: "tall",
            },
            "ul, ol": {
              mb: 4,
              ml: 6,
            },
            "li": {
              mb: 2,
            },
            "img": {
              maxW: "100%",
              height: "auto",
              my: 6,
              borderRadius: "md",
            },
            "code": {
              px: 2,
              py: 1,
              bg: "gray.100",
              borderRadius: "md",
              fontSize: "sm",
              fontFamily: "mono",
            },
            "pre": {
              p: 4,
              bg: "gray.50",
              borderRadius: "md",
              overflowX: "auto",
              mb: 4,
              "code": {
                bg: "transparent",
                p: 0,
              },
            },
            "blockquote": {
              pl: 4,
              borderLeft: "4px solid",
              borderColor: "gray.300",
              fontStyle: "italic",
              my: 4,
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </Container>
    </VStack>
  );
};

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
