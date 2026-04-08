import type { CollectionEntry } from "astro:content";

export default function joinNames(
  name: CollectionEntry<"fellows">["data"]["name"],
) {
  if (name.firstName == "Torrin A." && name.lastName == "Greathouse") {
    return `${name.firstName.toLowerCase()} ${name.lastName.toLowerCase()}`;
  } else {
    return `${name.firstName} ${name.lastName}`;
  }
}
