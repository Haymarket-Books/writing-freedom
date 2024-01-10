import type { Person } from "../types";

export default function joinNames(name: Person["name"]) {
  return `${name?.firstName} ${name?.lastName}`;
}
