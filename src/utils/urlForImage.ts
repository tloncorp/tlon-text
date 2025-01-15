import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return imageBuilder.image(source);
}

export function urlForVideo(source: any) {
  if (!source?.asset?._ref) {
    return undefined;
  }
  return sanityClient.config().projectId
    ? `https://cdn.sanity.io/files/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${source.asset._ref
        .replace('file-', '')
        .replace('-mp4', '.mp4')}`
    : undefined;
}