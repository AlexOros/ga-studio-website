import {
  HStack,
  ListItem,
  Stack,
  VStack,
  Text,
  Box,
  UnorderedList,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { Heading } from "@components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdEmail, MdPhone, MdMap } from "react-icons/md";
import { CONTACT } from "@shared/constants";

// {/* // TODO add component for footer */}
//    {/* // Re implement it :)  */}
//    {/* // Fix layout on mobile */}

export function Footer() {
  const [now] = useState(new Date());
  // console.log(CONTACT.email);
  // const { t } = useTranslation(["common"]);

  return (
    <VStack
      background="gray.900"
      py={12}
      color="white"
      fontWeight="medium"
      spacing={[12, null, 8, 4]}
    >
      <Heading size="h3" accent="bottom">
        Contact
      </Heading>

      <Grid
        w="full"
        gridTemplateColumns={["1fr", null, null, "2fr 1fr"]}
        px={[4, 6, 8, 16, 32]}
        // justifyItems={"start"}
        justifyContent="space-between"
        gap={[8, 4]}
      >
        <Box>
          <Box mb={2}>
            <Heading size="h4">{/* {t("architect")} {CONTACT.name} */}</Heading>
          </Box>

          <UnorderedList fontSize="md" fontWeight="semibold" p={0}>
            <ListItem>Membru al Ordinului Arhitectilor din Romania</ListItem>
            <ListItem>Membru al Uniunii Arhitectilor din Romania</ListItem>
            <ListItem>
              Responsabil educație stagiu si formare profesională al OAR Filiala
              Alba
            </ListItem>
            <ListItem>
              Membru al Consiliului Teritorial OAR Filiala Alba{" "}
            </ListItem>
            <ListItem>Membru al Consiliului National al OAR</ListItem>
          </UnorderedList>
        </Box>

        <Stack fontSize="md" fontWeight="semibold">
          <HStack>
            <Icon as={MdEmail} />
            <Text>{CONTACT.email}</Text>
          </HStack>

          <HStack>
            <Icon as={MdPhone} fontSize="2xl" />

            <Text>{CONTACT.phone}</Text>
          </HStack>

          <Stack direction="row">
            <Icon as={MdMap} fontSize="2xl" />
            <Text>{CONTACT.address}</Text>
          </Stack>
        </Stack>
      </Grid>

      <Box>© GAStudio {now.getFullYear()}</Box>
    </VStack>
  );
}
