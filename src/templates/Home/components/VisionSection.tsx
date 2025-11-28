import { HomePage } from '@/lib/content';
import {
  BlurImage,
  ContentBlocks,
  Heading,
  SplitScreenSection,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from '@components';
import { getImageFormat } from '@utils';
import React from 'react';

export const VisionSection = ({ data }: { data: HomePage['vision'] }) => {
  const { image, title, content } = data;
  // const { large, original, placeholder } = getImageFormat(image.data);

  return (
    <SplitScreenSection
      id="vision-section"
      mainContentPosition={'right'}
      mainContent={
        <SplitScreenSectionContent fontSize="lg" maxWidth="lg" spacing={6}>
          <Heading mb={4} accent="bottom" size="h1" alignSelf="center">
            {title}
          </Heading>

          {/* {content && (
            <ContentBlocks
              data={content}
              renderHeading={(_, text) => (
                <Heading as={'h2'} size={'h5'}>
                  {text}
                </Heading>
              )}
            />
          )} */}
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
