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
} from "@chakra-ui/react";
import { Heading } from "components/Heading";
import Link from "next/link";
import React from "react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import { LinkListItem, LanguageSwitch } from "./components";

const HEADER_HEIGHT = 64;

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

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
              {/* TODO - Add dynamic projects */}
              <Heading as="h1" size="h2">
                Proiecte
              </Heading>
              <List>
                <LinkListItem href="/">Industrial</LinkListItem>
                <LinkListItem href="/">Home</LinkListItem>
                <LinkListItem href="/">Personal</LinkListItem>
              </List>
            </DrawerBody>

            <Divider orientation="horizontal" />
            {/* TODO - Add contact information */}
            <DrawerFooter>Contact</DrawerFooter>
          </DrawerContent>
        </DarkMode>
      </Drawer>
    </>
  );
};
