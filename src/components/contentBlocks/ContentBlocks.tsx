import React from "react";
import {
  Box,
  Divider,
  ListItem,
  OrderedList,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  UnorderedList,
  Heading as ChackraHeading,
} from "@chakra-ui/react";
import { Block } from "./ContentBlocks.model";
import BlockParagraph from "./components/BlockParagraph";
import { Heading } from "components/heading";
import { ContentImage } from "components/contentImage";

type ContentBlocksProps = {
  onImageClick: (id: number) => void;
  data?: {
    time: number;
    blocks: Block[];
  };
};

export const ContentBlocks = ({ data, onImageClick }: ContentBlocksProps) => {
  return (
    <>
      {data?.blocks.map((block) => {
        if (block.type === "header") {
          const headingLevel = block.data.level;

          return (
            <Box key={block.id} alignSelf="center">
              <Heading
                mb={2}
                accent="bottom"
                as={`h${headingLevel + 1 > 6 ? 6 : headingLevel + 1}` as any}
                size={`h${headingLevel}`}
              >
                {block.data.text}
              </Heading>
            </Box>
          );
        }

        if (block.type === "paragraph") {
          return <BlockParagraph key={block.id} text={block.data.text} />;
        }

        if (block.type === "delimiter") {
          return <Divider my={2} key={block.id} />;
        }

        if (block.type === "list") {
          {
            return block.data.style === "ordered" ? (
              <OrderedList key={block.id}>
                {block.data.items.map((item, index) => (
                  <ListItem
                    key={item + index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </OrderedList>
            ) : (
              <UnorderedList key={block.id}>
                {block.data.items.map((item, index) => (
                  <ListItem
                    key={item + index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </UnorderedList>
            );
          }
        }

        if (block.type === "table") {
          const { withHeadings, content } = block.data;
          const headings = withHeadings ? content[0] : null;
          const data = withHeadings ? content.slice(1) : content;

          return (
            <TableContainer key={block.id} w="full">
              <Table variant="simple" colorScheme="gray">
                {headings && (
                  <Thead>
                    <Tr>
                      {headings.map((heading, index) => (
                        <Th key={heading + index}>
                          <Heading fontSize="sm" size="h3">
                            {heading}
                          </Heading>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                )}
                <Tbody>
                  {data.map((row, index) => (
                    <Tr key={block.id + index}>
                      {row.map((cell, cellIndex) => (
                        <Th key={cell + cellIndex}>
                          <Text fontSize="sm">{cell}</Text>
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          );
        }

        if (block.type === "quote") {
          return (
            <Box
              as="blockquote"
              key={block.id}
              alignSelf="center"
              textAlign="center"
              fontStyle="italic"
              fontSize="medium"
              textColor="gray.500"
              px={[6, 12, 16, 24]}
            >
              {block.data.text} <br />
              <cite> — {block.data.caption}</cite>
            </Box>
          );
        }

        if (block.type === "image") {
          return (
            <ContentImage
              key={block.id}
              onClick={onImageClick}
              image={{
                id: (block.data.file as any)?.id,
                attributes: block.data.file,
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
};
