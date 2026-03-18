import { createBrowserRouter } from "react-router";
import { EntryScene } from "./components/EntryScene";
import { WritingRoom } from "./components/WritingRoom";
import { TransitionScene } from "./components/TransitionScene";
import { LetterArrival } from "./components/LetterArrival";
import { ReadingScene } from "./components/ReadingScene";
import { ArchiveScene } from "./components/ArchiveScene";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: EntryScene,
  },
  {
    path: "/write",
    Component: WritingRoom,
  },
  {
    path: "/sending",
    Component: TransitionScene,
  },
  {
    path: "/arrival",
    Component: LetterArrival,
  },
  {
    path: "/read/:letterId",
    Component: ReadingScene,
  },
  {
    path: "/archive",
    Component: ArchiveScene,
  },
]);
