import { VStack, Text, Divider } from "@chakra-ui/react";
import {
  BlurImage,
  Heading,
  SplitScreenSection,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from "@components";
import { ComponentHomeService } from "@models";
import { getImageFormat } from "@utils";
import React from "react";

export const ServicesSection = ({ data }: { data: ComponentHomeService }) => {
  const { image, title, services } = data;
  const { large, original, placeholder } = getImageFormat(image.data);

  return (
    <SplitScreenSection
      mainContentPosition="right"
      mainContent={
        <SplitScreenSectionContent fontSize="lg">
          <Heading mb={[4]} size="h1" accent="bottom" alignSelf="center">
            {title}
          </Heading>

          <VStack textAlign="center" p={0} w="full">
            {services.map((service, index) => (
              <React.Fragment key={service?.id}>
                <Text>{service?.text}</Text>
                {services.length - 1 !== index && (
                  <Divider orientation="vertical" height="50px" />
                )}
              </React.Fragment>
            ))}
          </VStack>
        </SplitScreenSectionContent>
      }
      secondaryContent={
        <SplitScreenSectionImage>
          <BlurImage
            fill
            blurDataURL={placeholder!}
            src={large?.url ?? original!.url}
            alt=""
          />
        </SplitScreenSectionImage>
      }
    />
  );
};
