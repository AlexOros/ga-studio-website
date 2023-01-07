import {
  Box,
  Divider,
  Heading,
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

type ContentBlocksProps = {
  data?: {
    time: number;
    blocks: Block[];
  };
};

export const ContentBlocks = ({ data }: ContentBlocksProps) => {
  return (
    <Box display="flex" flexDir="column" gap={3}>
      {data?.blocks.map((block) => {
        if (block.type === "header") {
          return null;
          // <Heading key={block.id} as={`h${block.data.level}`}>
          //   {block.data.text}
          // </Heading>
        }

        if (block.type === "paragraph") {
          // return <BlockParagraph key={block.id} text={block.data.text} />;
        }

        if (block.type === "delimiter") {
          return <Divider my={2} key={block.id} />;
        }

        if (block.type === "list") {
          {
            return block.data.style === "ordered" ? (
              <OrderedList key={block.id} ml={8}>
                {block.data.items.map((item, index) => (
                  <ListItem key={item + index}>{item}</ListItem>
                ))}
              </OrderedList>
            ) : (
              <UnorderedList key={block.id} ml={8}>
                {block.data.items.map((item, index) => (
                  <ListItem key={item + index}>{item}</ListItem>
                ))}
              </UnorderedList>
            );
          }
        }

        if (block.type === "table") {
          const { withHeadings, content } = block.data;
          const headings = withHeadings ? content[0] : null;
          const data = withHeadings ? content.slice(1) : content;
          return null;
          return (
            <TableContainer key={block.id}>
              <Table variant="simple">
                {headings && (
                  <Thead>
                    <Tr>
                      {headings.map((heading, index) => (
                        <Th key={heading + index}>{heading}</Th>
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
    </Box>
  );
};
