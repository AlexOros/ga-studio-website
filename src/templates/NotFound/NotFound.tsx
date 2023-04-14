import { Center, VStack, Text, Box } from "@chakra-ui/react";
import { Heading } from "@components";
import React from "react";

export const NotFound = () => {
  // TODO add internationalization
  // TODO add links to home or projects

  return (
    <Box h="65vh">
      <Center h="full">
        <VStack>
          <Heading as="h1" size="title">
            404 - Not Found
          </Heading>

          <Text fontSize={["md", null, "xl", "2xl"]}>
            The page you are looking for does not exist
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};
