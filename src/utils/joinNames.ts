import type { Person } from "../types";

export default function joinNames(name: Person["name"]) {
  if (name?.firstName == "Torrin A." && name.lastName == "Greathouse") {
    return `${name.firstName.toLowerCase()} ${name.lastName.toLowerCase()}`;
  } else {
    return `${name?.firstName} ${name?.lastName}`;
  }
}
