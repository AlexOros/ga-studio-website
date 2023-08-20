import { Box, BoxProps, Button, Text } from "@chakra-ui/react";
import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
interface ExpandableTextProps extends BoxProps {
  children: React.ReactNode;
  noOfLines: number;
}

export const ExpandableText = forwardRef<HTMLDivElement, ExpandableTextProps>(
  ({ children, noOfLines, ...rest }, ref) => {
    const [isExpandable, setIsExpandable] = useState(false);
    const containerRef = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(true);

    useLayoutEffect(() => {
      setIsOpen(false);
    }, []);

    useLayoutEffect(() => {
      const isTextClamped =
        (containerRef.current?.scrollHeight as number) >
        (containerRef.current?.clientHeight as number);

      if (isTextClamped) {
        setIsExpandable(true);
      }
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      setIsOpen((old) => !old);
    }, []);

    return (
      <Box ref={ref} {...rest}>
        <Box ref={containerRef} noOfLines={isOpen ? undefined : noOfLines}>
          {children}
        </Box>
        <Button
          variant="link"
          display={isExpandable ? "block" : "none"}
          size="sm"
          onClick={handleToggle}
        >
          <Text>{isOpen ? "Show less" : "Read more"}</Text>
        </Button>
      </Box>
    );
  }
);

ExpandableText.displayName = "ExpandableText";
