import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import type { Image } from "sanity";

const imageBuilder = imageUrlBuilder(sanityClient);

export default function urlFor(source: Image) {
  return imageBuilder?.image(source);
}
