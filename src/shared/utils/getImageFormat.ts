type Maybe<T> = T | null;

type UploadFileEntity = {
  id?: number;
  attributes?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: any;
    placeholder?: string;
    __typename?: string;
  };
};

export type Format = {
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

type Dimension =
  | "thumbnail"
  | "small"
  | "medium"
  | "large"
  | "hero"
  | "original";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getImageFormat = (
  imageData: Maybe<UploadFileEntity> | UploadFileEntity | undefined
) => {
  if (!imageData || !imageData?.attributes) return {};

  const { __typename, formats, placeholder, ...attributes } =
    imageData.attributes!;
  const { thumbnail, large, medium, small, hero } = formats as Record<
    string,
    Format | undefined
  >;

  return {
    placeholder: placeholder as string,
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

export function getImageFormatDimensions(
  imageFormat: ReturnType<typeof getImageFormat>,
  dimensionOrder: Dimension[] = ["original"]
) {
  return {
    width: dimensionOrder.reduce((width, nextDimension) => {
      if (width === 0) width = imageFormat[nextDimension]?.width ?? 0;
      return width;
    }, 0),
    height: dimensionOrder.reduce((height, nextDimension) => {
      if (height === 0) height = imageFormat[nextDimension]?.height ?? 0;
      return height;
    }, 0),
  };
}

function prependBaseUrl(format: Format): Format {
  return {
    ...format,
    url: `${baseUrl}${format?.url}`,
  };
}
