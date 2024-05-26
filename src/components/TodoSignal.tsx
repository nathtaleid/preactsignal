import { signal } from "@preact/signals";

export const todos = signal([
  { text: "Write my first post on DEV community", completed: true },
  { text: "Explore more into Preact Signals feature", completed: false },
]);
