import type { Person, Fellow } from "../types";

export default function buildFellowHref(fellow: Fellow) {
  return `/fellows/${fellow.fellowshipYear?.slug}/${fellow?.slug}`;
}
