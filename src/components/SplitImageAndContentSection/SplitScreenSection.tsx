import {
  Box,
  Center,
  Container,
  ContainerProps,
  Stack,
  StackProps,
  BoxProps,
  useBreakpointValue,
  ResponsiveValue,
} from "@chakra-ui/react";

export type SplitScreenSectionProps = {
  mainContent: React.ReactNode;
  secondaryContent?: React.ReactNode;
  mainContentPosition?: ResponsiveValue<"left" | "right">;
};

export const SplitScreenSection = ({
  mainContent,
  secondaryContent,
  mainContentPosition = "left",
}: SplitScreenSectionProps) => {
  const responsivePosition =
    useBreakpointValue(mainContentPosition as any) ?? mainContentPosition;

  return (
    <Stack
      as="section"
      flex={1}
      h={["full", null, null, "100vh"]}
      direction={["column", null, null, "row"]}
      spacing={0}
      overflowY="hidden"
    >
      {responsivePosition === "left" && (
        <>
          {mainContent}
          {secondaryContent}
        </>
      )}

      {responsivePosition === "right" && (
        <>
          {secondaryContent}
          {mainContent}
        </>
      )}
    </Stack>
  );
};

export const SplitScreenSectionContent = ({
  children,
  maxWidth,
  center = true,
  ...props
}: StackProps & {
  center?: boolean;
  maxWidth?: ContainerProps["maxWidth"];
}) => {
  return (
    <Center w="full" display={center ? "flex" : "box"}>
      <Container maxWidth={maxWidth}>
        <Stack spacing={[6, 8, null, 16]} py={16} {...props}>
          {children}
        </Stack>
      </Container>
    </Center>
  );
};

export const SplitScreenSectionImage = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      h={["50vh", null, null, "100vh"]}
      w="full"
      position="relative"
      {...props}
    >
      {children}
    </Box>
  );
};
