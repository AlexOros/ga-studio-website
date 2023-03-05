import { Box, Fade, Text, IconButton, Icon } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";
import { RiMouseLine } from "react-icons/ri";

import React from "react";

export const HeroSection = () => {
  // TODO add translations
  return (
    <Box
      as="section"
      position="relative"
      display="flex"
      justifyContent="center"
    >
      <Box position="absolute" left={0} bottom={"50%"} zIndex={1}>
        <Fade in={true} delay={0.5}>
          <Box color="whiteAlpha.900" px={5} py={2} background="blackAlpha.700">
            <Heading zIndex={-1} as="h1" size="title">
              <Box as="span" color="orange.400">
                G
              </Box>
              herman Alin Studio
            </Heading>
            <Text fontSize={["md", "2xl", "4xl"]}>
              Arhitectura si Inginerie
            </Text>
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
        <BlurImage
          style={{
            objectFit: "cover",
          }}
          fill
          // blurDataURL={hero64}
          alt={"hero"}
          src="/images/hero.png"
          quality={100}
        />
      </Box>
    </Box>
  );
};
