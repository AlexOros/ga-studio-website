import React from "react";
import { Text } from "@chakra-ui/react";
import NextLink from "next/link";

const LINK_TAG_REGEX = /(<a[\s\S]*?\/a>)/;
const MATCH_BETWEEN_QUOTES_REGEX = /"([\s\S]*?)"/;
const MATCH_BETWEEN_COMPARISON_SIGNS_REGEX = />([\s\S]*?)</;

function getLinkData(linkElement: string) {
  const href = linkElement.match(MATCH_BETWEEN_QUOTES_REGEX)?.[1];
  const content = linkElement.match(MATCH_BETWEEN_COMPARISON_SIGNS_REGEX)?.[1];

  return {
    href,
    content,
  };
}

function getInternalLinkData(href: string): {
  lang: string | undefined;
  path: string | undefined;
} {
  const [_, lang, path] = href.match(/http:\/\/(ro|en)(.*)/) ?? [];

  return {
    lang,
    path,
  };
}

export default function BlockParagraph({ text }: { text: string }) {
  const textBlocks = text.split(LINK_TAG_REGEX);

  return (
    <Text>
      {textBlocks.map((element, index) => {
        const key = `${element} ${index}`;

        if (!element.startsWith("<a"))
          return (
            <span key={key} dangerouslySetInnerHTML={{ __html: element }} />
          );

        try {
          const { href, content } = getLinkData(element);

          if (!href || !content) return null;

          const { lang, path } = getInternalLinkData(href);

          if (!lang || !path)
            return (
              <span key={key} dangerouslySetInnerHTML={{ __html: element }} />
            );

          return (
            <NextLink key={key} lang={lang} href={`/${path}`}>
              {content}
            </NextLink>
          );
        } catch {
          return null;
        }
      })}
    </Text>
  );
}
