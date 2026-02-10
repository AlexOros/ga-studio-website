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
  Button,
  useToast,
  DarkMode,
} from "@chakra-ui/react";
import { Heading } from "@components";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { MdEmail, MdPhone, MdMap } from "react-icons/md";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { CONTACT } from "@shared/constants";
import { useCopyToClipboard } from "@shared/hooks";

export function Footer() {
  const [now] = useState(new Date());
  const { t } = useTranslation(["common"]);

  return (
    <DarkMode>
      <VStack
        as="footer"
        background="gray.900"
        py={12}
        color="white"
        fontWeight="medium"
        gap={[12, null, 8, 4]}
      >
        <Heading size="h3" accent="bottom">
          Contact
        </Heading>

        <Grid
          w="full"
          gridTemplateColumns={["1fr", null, null, "2fr 1fr"]}
          px={[4, 6, 8, 16, 32]}
          justifyContent="space-between"
          gap={[8, 4]}
        >
          <Box>
            <Box mb={2}>
              <Heading size="h4">
                {`${t("common:architect")} ${CONTACT.name}`}
              </Heading>
            </Box>

            <UnorderedList fontSize="md" fontWeight="semibold" p={0}>
              {(t("common:titles", { returnObjects: true }) as string[])?.map?.(
                (title, index) => (
                  <ListItem key={title + index}>{title}</ListItem>
                )
              )}
            </UnorderedList>
          </Box>

          <Stack fontSize="md">
            <Button
              width="fit-content"
              variant="link"
              as="a"
              href={`mailto:${CONTACT.email}`}
            >
              <HStack textTransform="none">
                <Icon as={MdEmail} fontSize="2xl" />
                <Text>{CONTACT.email}</Text>
              </HStack>
            </Button>

            <Button
              as="a"
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              width="fit-content"
              variant="link"
            >
              <Stack direction="row" align="center">
                <Icon as={FaInstagram} fontSize="2xl" />
                <Text>Instagram</Text>
              </Stack>
            </Button>

            <Button
              as="a"
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              width="fit-content"
              variant="link"
            >
              <Stack direction="row" align="center">
                <Icon as={FaFacebook} fontSize="2xl" />
                <Text>Facebook</Text>
              </Stack>
            </Button>

            {/* <CopyButton value={CONTACT.phone} subject="Phone">
              <HStack>
                <Icon as={MdPhone} fontSize="2xl" />

                <Text>{CONTACT.phone}</Text>
              </HStack>
            </CopyButton> */}

            <CopyButton value={CONTACT.address} subject="Address">
              <Stack direction="row">
                <Icon as={MdMap} fontSize="2xl" />
                <Text>{CONTACT.address}</Text>
              </Stack>
            </CopyButton>
          </Stack>
        </Grid>

        <Box>© GAStudio {now.getFullYear()}</Box>
      </VStack>
    </DarkMode>
  );
}

const CopyButton = ({
  subject,
  children,
  value,
}: {
  subject: string;
  value: any;
  children: React.ReactNode;
}) => {
  const [_, copy] = useCopyToClipboard();
  const toast = useToast();

  return (
    <Button
      variant="link"
      textAlign="start"
      whiteSpace="normal"
      textTransform="none"
      width="fit-content"
      onClick={() =>
        copy(value).then(() =>
          toast({
            position: "top",
            title: `${subject} copied to clipboard`,
            status: "success",
            variant: "subtle",
          })
        )
      }
    >
      {children}
    </Button>
  );
};
