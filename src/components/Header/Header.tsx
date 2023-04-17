import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  HStack,
  IconButton,
  Icon,
  DarkMode,
  Divider,
  DrawerFooter,
  List,
  Button,
  useToast,
  Stack,
  Box,
} from "@chakra-ui/react";
import { CONTACT } from "@shared/constants";
import { useCopyToClipboard } from "@shared/hooks";
import { Heading } from "components/Heading";
import Link from "next/link";
import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import { LinkListItem, LanguageSwitch } from "./components";

export const HEADER_HEIGHT = 64;

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [_, copyPhone] = useCopyToClipboard();

  return (
    <>
      <HStack
        as="header"
        height={`${HEADER_HEIGHT}px`}
        position="fixed"
        zIndex="docked"
        justifyContent="space-between"
        width="full"
        px={5}
      >
        <Link href="/">
          <Text fontWeight="bold">Logo</Text>
        </Link>
        <IconButton ref={btnRef} onClick={onOpen} aria-label="open menu button">
          <Icon fontSize="xl" as={RiMenuFill} />
        </IconButton>
      </HStack>

      <Drawer
        size="lg"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DarkMode>
          <DrawerContent bgColor="gray.900" color="white">
            <HStack as={DrawerHeader} justifyContent="space-between">
              <LanguageSwitch onClose={onClose} />

              <IconButton
                variant="ghost"
                onClick={onClose}
                aria-label="close menu button"
              >
                <Icon fontSize="2xl" as={RiCloseFill} />
              </IconButton>
            </HStack>
            <Divider orientation="horizontal" />
            <DrawerBody p={6}>
              <Stack spacing={6}>
                <Box>
                  <Heading as="h2" size="h3">
                    Proiecte
                  </Heading>
                  <List>
                    <LinkListItem href="/">Industrial</LinkListItem>
                    <LinkListItem href="/">Home</LinkListItem>
                    <LinkListItem href="/">Personal</LinkListItem>
                  </List>
                </Box>

                <HStack>
                  <Heading color="gray.400" as="h2" size="h3">
                    News
                  </Heading>
                  <Text color="gray.400">(Coming soon)</Text>
                </HStack>
              </Stack>
            </DrawerBody>

            <Divider orientation="horizontal" />

            <DrawerFooter>
              <Stack
                justifyContent="space-between"
                w="full"
                direction={["column", null, null, "row"]}
              >
                <Button variant="link" as="a" href={`mailto:${CONTACT.email}`}>
                  <HStack textTransform="none">
                    <Icon as={MdEmail} fontSize="2xl" />
                    <Text>{CONTACT.email}</Text>
                  </HStack>
                </Button>

                <Button
                  variant="link"
                  onClick={() =>
                    copyPhone(CONTACT.phone).then(() =>
                      toast({
                        position: "top",
                        title: "Phone copied to clipboard",
                        status: "success",
                        variant: "subtle",
                      })
                    )
                  }
                >
                  <HStack>
                    <Icon as={MdPhone} fontSize="2xl" />

                    <Text>{CONTACT.phone}</Text>
                  </HStack>
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DarkMode>
      </Drawer>
    </>
  );
};
