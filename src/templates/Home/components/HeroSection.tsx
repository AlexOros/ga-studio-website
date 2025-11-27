import React from "react";
import { Box, Fade, IconButton, Icon, keyframes } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";
import { getImageFormat } from "@utils";
import { ComponentHomeHero } from "@models";
import { FaArrowDown } from "react-icons/fa";

const bounce = keyframes`
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(2px); }
`;

export const HeroSection = ({ data }: { data: ComponentHomeHero }) => {
  const { image, title, subTitle } = data;
  const { large, original, placeholder } = getImageFormat(image.data);

  const titleFirstLetter = title.slice(0, 1);
  const restOfTitle = title.slice(1, title.length);

  // Handler to scroll to the next section
  const handleScrollDown = () => {
    const nextSection = document.getElementById("vision-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box as="section" position="relative">
      <Box
        zIndex={0}
        display="flex"
        justifyContent="center"
        position="relative"
        h="100vh"
        w="full"
      >
        {original && (
          <BlurImage
            fill
            blurDataURL={placeholder}
            alt={"hero"}
            src={large?.url ?? original.url}
            quality={100}
          />
        )}

        <IconButton
          colorScheme="gray"
          mb={16}
          alignSelf="end"
          aria-label="scroll button"
          onClick={handleScrollDown}
        >
          <Icon
            as={FaArrowDown}
            fontSize="2xl"
            animation={`${bounce} 2s infinite`}
          />
        </IconButton>
      </Box>

      <Box zIndex={1} position="absolute" left={0} bottom={"50%"}>
        <Fade in={true} delay={0.5}>
          <Box color="white" px={5} py={2} background="blackAlpha.700">
            <Heading as="h1" size="title">
              <Box as="span" color="orange.400">
                {titleFirstLetter}
              </Box>
              {restOfTitle}
            </Heading>
            {subTitle && <Heading size="h4">{subTitle}</Heading>}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
