import { useLayoutEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";

export function BlurImage({ blurDataURL, ...props }: ImageProps) {
  const imageRef = useRef<any>(null);
  const [isCached, setIsCached] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setIsCached(imageRef.current.complete);
  }, []);

  return (
    <Image
      loading="lazy"
      {...(blurDataURL
        ? { placeholder: "blur", blurDataURL }
        : { placeholder: "empty" })}
      ref={imageRef}
      {...props}
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
