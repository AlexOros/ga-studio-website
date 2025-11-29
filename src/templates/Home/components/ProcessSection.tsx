import {
  SplitScreenSection,
  Heading,
  SplitScreenSectionContent,
  SplitScreenSectionImage,
  BlurImage,
} from '@components';
import { Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import React from 'react';

type ComponentHomeProcess = {
  image: any;
  title: string;
  content?: string;
};

export const ProcessSection = ({ data }: { data: ComponentHomeProcess }) => {
  const { image, title, content } = data;

  return (
    <SplitScreenSection
      mainContentPosition={['right', null, null, 'left']}
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
