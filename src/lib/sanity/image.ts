import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}

/**
 * Props for `next/image` from a Sanity image. The query supplies the asset's
 * aspect ratio, so the height can be set up front and nothing shifts as the
 * image loads.
 */
export function imageProps(
  source: SanityImageSource,
  aspectRatio: number | null | undefined,
  width: number,
) {
  return {
    src: urlFor(source).width(width).url(),
    width,
    height: Math.round(width / (aspectRatio ?? 16 / 10)),
  };
}
