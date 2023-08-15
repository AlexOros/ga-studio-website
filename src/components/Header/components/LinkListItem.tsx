import { Box, ListIcon, ListItem } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import React from "react";
import { RiArrowRightLine } from "react-icons/ri";

export type LinkListItemProps = LinkProps &
  React.ComponentProps<typeof ListItem>;
export const LinkListItem = ({
  children,
  isActive,
  ...props
}: LinkListItemProps) => {
  return (
    <ListItem
      _hover={{
        color: "gray.100",
      }}
      as={Link}
      fontSize={["xl", "2xl"]}
      display="block"
      {...props}
    >
      <ListIcon color={isActive ? "white" : "gray.600"} as={RiArrowRightLine} />
      {children}
    </ListItem>
  );
};
