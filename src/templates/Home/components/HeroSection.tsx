import React from "react";
import { Box, Fade, IconButton, Icon } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";
import { RiMouseLine } from "react-icons/ri";
import { getImageFormat } from "@utils";
import { ComponentHomeHero } from "@models";

export const HeroSection = ({ data }: { data: ComponentHomeHero }) => {
  const { image, title, subTitle } = data;
  const { large, original, placeholder } = getImageFormat(image.data);

  const titleFirstLetter = title.slice(0, 1);
  const restOfTitle = title.slice(1, title.length);

  return (
    <Box
      as="section"
      position="relative"
      display="flex"
      justifyContent="center"
    >
      <Box position="absolute" left={0} bottom={"50%"} zIndex={1}>
        <Fade in={true} delay={0.5}>
          <Box color="white" px={5} py={2} background="blackAlpha.700">
            <Heading zIndex={-1} as="h1" size="title">
              <Box as="span" color="orange.400">
                {titleFirstLetter}
              </Box>
              {restOfTitle}
            </Heading>
            {subTitle && <Heading size="h4">{subTitle}</Heading>}
          </Box>
        </Fade>
      </Box>

      <IconButton
        colorScheme="gray"
        mb={16}
        zIndex="1"
        alignSelf="end"
        aria-label="scroll button"
      >
        <Icon as={RiMouseLine} fontSize="3xl" />
      </IconButton>

      <Box zIndex={0} height="100vh">
        {original && (
          <BlurImage
            style={{
              objectFit: "cover",
            }}
            fill
            blurDataURL={placeholder}
            alt={"hero"}
            src={large?.url ?? original.url}
            quality={100}
          />
        )}
      </Box>
    </Box>
  );
};
