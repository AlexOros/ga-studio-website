import React from "react";
import { Box, Fade, IconButton, Icon, keyframes } from "@chakra-ui/react";
import { BlurImage, Heading } from "@components";
import { FaArrowDown } from "react-icons/fa";
import { HomePage } from '@/lib/content/types';

const bounce = keyframes`
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(2px); }
`;

export const HeroSection = ({ data }: { data: HomePage['hero'] }) => {
  const { image, title, subtitle } = data;

  const titleFirstLetter = title.slice(0, 1);
  const restOfTitle = title.slice(1, title.length);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('vision-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
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
        {image && (
          <BlurImage
            fill
            blurDataURL=""
            alt={title}
            src={image}
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

      <Box zIndex={1} position="absolute" left={0} bottom={'50%'}>
        <Fade in={true} delay={0.5}>
          <Box color="white" px={5} py={2} background="blackAlpha.700">
            <Heading as="h1" size="title">
              <Box as="span" color="orange.400">
                {titleFirstLetter}
              </Box>
              {restOfTitle}
            </Heading>
            {subtitle && <Heading size="h4">{subtitle}</Heading>}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
