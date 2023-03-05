import { BoxProps, chakra } from "@chakra-ui/react";
import { HTMLMotionProps, isValidMotionProp, motion } from "framer-motion";
import React from "react";

// TODO improve typescript support
const ForwardededMotionBox = chakra(motion.div, {
  /**
   * Allow motion TProps and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export function MotionBox({
  children,
  ...props
}: { children: React.ReactNode } & HTMLMotionProps<"div"> & BoxProps) {
  return <ForwardededMotionBox {...props}>{children}</ForwardededMotionBox>;
}
