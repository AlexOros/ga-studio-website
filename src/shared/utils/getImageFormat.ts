import { Maybe, UploadFileEntity } from "@models";

type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const prependBaseUrl = (format: Format): Format => ({
  ...format,
  url: `${baseUrl}${format?.url}`,
});

export const getImageFormat = (
  imageData: Maybe<UploadFileEntity> | UploadFileEntity | undefined
) => {
  if (!imageData || !imageData?.attributes) return {};

  const { __typename, formats, ...attributes } = imageData.attributes!;
  const { thumbnail, large, medium, small, hero } = formats as Record<
    string,
    Format | undefined
  >;

  return {
    original: {
      ...attributes,
      url: `${baseUrl}${imageData?.attributes?.url}`,
      id: imageData.id,
    },
    thumbnail: thumbnail && prependBaseUrl(thumbnail),
    large: large && prependBaseUrl(large),
    medium: medium && prependBaseUrl(medium),
    small: small && prependBaseUrl(small),
    hero: hero && prependBaseUrl(hero),
  };
};

export default getImageFormat;
