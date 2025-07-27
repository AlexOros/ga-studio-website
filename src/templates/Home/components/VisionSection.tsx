import {
  BlurImage,
  ContentBlocks,
  Heading,
  SplitScreenSection,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from "@components";
import { ComponentHomeVision } from "@models";
import { getImageFormat } from "@utils";
import React from "react";

export const VisionSection = ({ data }: { data: ComponentHomeVision }) => {
  const { image, title, content } = data;
  const { large, original, placeholder } = getImageFormat(image.data);

  return (
    <SplitScreenSection
      mainContentPosition={"right"}
      mainContent={
        <SplitScreenSectionContent fontSize="lg" maxWidth="lg" spacing={6}>
          <Heading mb={4} accent="bottom" size="h1" alignSelf="center">
            {title}
          </Heading>

          {content && (
            <ContentBlocks
              data={JSON.parse(content)}
              renderHeading={(_, text) => (
                <Heading as={"h2"} size={"h5"}>
                  {text}
                </Heading>
              )}
            />
          )}
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
