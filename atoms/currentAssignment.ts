import { atom } from "jotai";

export const currentAssignmentAtom = atom<Assignment | undefined>({
  name: "",
  body: "",
});
