import { Box, ListIcon, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { RiArrowRightLine } from "react-icons/ri";

export type LinkListItemProps = {
  href: string;
  children: React.ReactNode;
};

export const LinkListItem = ({ children, href }: LinkListItemProps) => {
  return (
    <ListItem as={Link} href={href} fontSize={["xl", "2xl"]} display="block">
      <ListIcon as={RiArrowRightLine} />
      {children}
    </ListItem>
  );
};
