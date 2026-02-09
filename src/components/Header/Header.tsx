import { ROUTES } from '@shared/routes';
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
  Badge,
  VStack,
} from '@chakra-ui/react';
import { CONTACT } from '@shared/constants';
import { useCopyToClipboard, useRouter } from '@shared/hooks';
import { Heading } from 'components/Heading';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiCloseFill, RiMenuFill } from 'react-icons/ri';
import { LinkListItem, LanguageSwitch } from './components';

export const HEADER_HEIGHT = 64;
const CATEGORIES = ['all', 'residential', 'industrial', 'urbanism'];

export const Header = () => {
  const { locale, asPath } = useRouter();
  const { t } = useTranslation(['common']);
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
      >
        <Link href="/">
          <VStack
            borderRadius="sm"
            px={5}
            h="full"
            spacing={-2}
            alignItems="start"
            bgColor="white"
            mixBlendMode="darken"
          >
            <Text fontSize="large" fontWeight="bold">
              GA Studio
            </Text>
            <Text>{t('mainSubTitle')}</Text>
          </VStack>
        </Link>
        <Box pr={5}>
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            aria-label="open menu button"
          >
            <Icon fontSize="xl" as={RiMenuFill} />
          </IconButton>
        </Box>
      </HStack>

      <Drawer
        size="lg"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef as any}
      >
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DarkMode>
          <DrawerContent bgColor="gray.900" color="white">
            <HStack as={DrawerHeader} justifyContent="space-between">
              <LanguageSwitch />

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
                  <HStack pb={2} align="center">
                    <Heading as="h2" size="h3">
                      {t('common:projects')}
                    </Heading>
                    <Text color="gray.400">
                      <Badge>{t('common:comingSoon')}</Badge>
                    </Text>
                  </HStack>

                  <List>
                    {CATEGORIES?.map(category => {
                      const categoryQueryParam =
                        category === 'all' ? '' : `?category=${category}`;
                      const href = `/${ROUTES.projects[locale]}${categoryQueryParam}`;

                      return (
                        <LinkListItem
                          href={href}
                          key={category}
                          onClick={onClose}
                          isActive={asPath === href}
                        >
                          {t(`common:categoryObj.${category}`)}
                        </LinkListItem>
                      );
                    })}
                  </List>
                </Box>

                <HStack>
                  <Heading as="h2" size="h3">
                    {t('common:news')}
                  </Heading>
                  <Text color="gray.400">
                    <Badge>{t('common:comingSoon')}</Badge>
                  </Text>
                </HStack>
              </Stack>
            </DrawerBody>

            <Divider orientation="horizontal" />

            <DrawerFooter>
              <Stack
                justifyContent="space-between"
                w="full"
                direction={['column', null, null, 'row']}
              >
                <Button variant="link" as="a" href={`mailto:${CONTACT.email}`}>
                  <HStack textTransform="none">
                    <Icon as={MdEmail} fontSize="2xl" />
                    <Text>{CONTACT.email}</Text>
                  </HStack>
                </Button>

                <HStack>
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
                    </Stack>
                  </Button>
                </HStack>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DarkMode>
      </Drawer>
    </>
  );
};
