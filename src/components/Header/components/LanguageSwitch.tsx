import { Button, HStack, Text, StackDivider, useToast } from "@chakra-ui/react";
import { useAppState } from "@context";
import { useRouter } from "@shared/hooks";
import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";

export type LanguageSwitch = {
  onClose: () => void;
};

export const LanguageSwitch = ({ onClose }: LanguageSwitch) => {
  const { locale = "ro", push, asPath } = useRouter();
  const [loadingNextLocale, setLoadingNextLocale] = useState(false);
  const toast = useToast();

  const { nextLocalePath } = useAppState();

  const hasNextLocalePath =
    asPath.split("/").filter(Boolean).length ===
    nextLocalePath.split("/").filter(Boolean).length;

  // TODO need to add translation to messages
  const showErrorNoLocalePageFound = () => {
    toast({
      title: "No locale page found",
      description: "There was no page matching this one",
      variant: "left-accent",
      position: "top",
      status: "error",
      duration: 20000,
      isClosable: true,
    });
  };

  const handleChangeLocale = async (nextLocale: "en" | "ro") => {
    if (nextLocale === locale) return;

    setLoadingNextLocale(true);

    if (!hasNextLocalePath) showErrorNoLocalePageFound();

    await push(nextLocalePath, undefined, { locale: nextLocale });
    setLoadingNextLocale(false);
    onClose();
  };

  return (
    <HStack divider={<StackDivider />}>
      <Button
        disabled={loadingNextLocale}
        variant="ghost"
        color={locale === "ro" ? "whiteAlpha.900" : "whiteAlpha.600"}
        as={Button}
        onClick={() => handleChangeLocale("ro")}
      >
        <HStack>
          <Text>RO</Text>
          <BsGlobe />
        </HStack>
      </Button>
      <Button
        disabled={loadingNextLocale}
        variant="ghost"
        color={locale === "en" ? "whiteAlpha.900" : "whiteAlpha.600"}
        as={Button}
        onClick={() => handleChangeLocale("en")}
      >
        <HStack>
          <Text>EN</Text>
          <BsGlobe />
        </HStack>
      </Button>
    </HStack>
  );
};
