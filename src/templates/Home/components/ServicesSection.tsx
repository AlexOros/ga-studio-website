import { HomePage } from '@/lib/content';
import { VStack, Text, Divider } from '@chakra-ui/react';
import {
  BlurImage,
  Heading,
  SplitScreenSection,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from '@components';
import React from 'react';

export const ServicesSection = ({ data }: { data: HomePage['services'] }) => {
  const { image, title, items } = data;

  return (
    <SplitScreenSection
      mainContentPosition="right"
      mainContent={
        <SplitScreenSectionContent fontSize="lg">
          <Heading mb={[4]} size="h1" accent="bottom" alignSelf="center">
            {title}
          </Heading>

          <VStack textAlign="center" p={0} w="full">
            {items.map((item, index) => (
              <React.Fragment key={item}>
                <Text>{item}</Text>
                {items.length - 1 !== index && (
                  <Divider orientation="vertical" height="50px" />
                )}
              </React.Fragment>
            ))}
          </VStack>
        </SplitScreenSectionContent>
      }
      secondaryContent={
        <SplitScreenSectionImage>
          <BlurImage fill src={image} alt="" />
        </SplitScreenSectionImage>
      }
    />
  );
};
