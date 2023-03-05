import { useRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { useIsomorphicLayoutEffect } from "@shared/hooks";

export function BlurImage({
  blurDataURL,
  priority,
  loading = "lazy",
  ...props
}: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isCached, setIsCached] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useIsomorphicLayoutEffect(() => {
    // TODO find a better way to handle eager loading
    // Now it will always be blurred
    if (imageRef.current?.loading === "eager") {
      setIsCached(false);
    } else {
      setIsCached(Boolean(imageRef.current?.complete));
    }
  }, []);

  return (
    <Image
      {...(blurDataURL
        ? { placeholder: "blur", blurDataURL }
        : { placeholder: "empty" })}
      ref={imageRef}
      {...props}
      {...(priority ? { priority } : { loading })}
      alt={props.alt}
      style={{
        objectFit: "cover",
        ...(!isCached && {
          transition: "300ms all linear",
          ...(!isLoading
            ? { filter: "blur(0px)", scale: "1" }
            : { filter: "blur(40px)", scale: "1.15" }),
        }),
        ...props.style,
      }}
      onLoadingComplete={() => !isCached && setLoading(false)}
    />
  );
}
