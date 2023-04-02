import {
  SplitScreenSection,
  Heading,
  ContentBlocks,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
  BlurImage,
} from "@components";
import { ComponentHomeProcess } from "@models";
import { getImageFormat } from "@utils";
import React from "react";

export const ProcessSection = ({ data }: { data: ComponentHomeProcess }) => {
  const { image, title, content } = data;
  const { large, original, placeholder } = getImageFormat(image.data);

  return (
    <SplitScreenSection
      mainContentPosition={["right", null, null, "left"]}
      mainContent={
        <SplitScreenSectionContent
          fontSize="lg"
          maxWidth="2xl"
          spacing={[2]}
          sx={{ h2: { mt: 4 } }}
        >
          <Heading mb={10} accent="bottom" size="h1" alignSelf="center">
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
