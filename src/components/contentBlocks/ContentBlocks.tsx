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
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Block } from "./ContentBlocks.model";
import BlockImage from "./components/BlockImage";
import BlockParagraph from "./components/BlockParagraph";
import { Heading } from "components/heading";

type ContentBlocksProps = {
  data?: {
    time: number;
    blocks: Block[];
  };
};

export const ContentBlocks = ({ data }: ContentBlocksProps) => {
  return (
    <>
      {data?.blocks.map((block) => {
        if (block.type === "header") {
          const headingLevel = `h${
            block.data.level + 1 > 6 ? 6 : block.data.level + 1
          }`;
          return (
            <Heading
              mb={3}
              accent="bottom"
              key={block.id}
              as={headingLevel as any}
              size={headingLevel}
            >
              {block.data.text}
            </Heading>
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
                          <Heading size="xs">{heading}</Heading>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                )}
                <Tbody>
                  {data.map((row, index) => (
                    <Tr key={block.id + index}>
                      {row.map((cell, cellIndex) => (
                        <Th key={cell + cellIndex}>{cell}</Th>
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
          return <BlockImage key={block.id} file={block.data.file} />;
        }

        return null;
      })}
    </>
  );
};
