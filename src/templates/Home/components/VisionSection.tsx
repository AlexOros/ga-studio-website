import { HomePage } from '@/lib/content';
import {
  BlurImage,
  Heading,
  SplitScreenSection,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
} from '@components';
import { Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export const VisionSection = ({ data }: { data: HomePage['vision'] }) => {
  const { image, title, content } = data;

  return (
    <SplitScreenSection
      id="vision-section"
      mainContentPosition={'right'}
      mainContent={
        <SplitScreenSectionContent fontSize="lg" maxWidth="lg" spacing={6}>
          <Heading mb={4} accent="bottom" size="h1" alignSelf="center">
            {title}
          </Heading>

          {content && (
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <Text fontSize="lg" mb={4} lineHeight="tall">
                    {children}
                  </Text>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
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
