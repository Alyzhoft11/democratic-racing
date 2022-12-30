import { ArrowUpIcon } from "@heroicons/react/24/outline";
import type { ForumVote } from "@prisma/client";
import clsx from "clsx";
import type { Session } from "next-auth";
import type { TForum } from "../../../types";
import { getUpVoted, getVoted } from "../../../utils/Votes";

interface Props {
  forum: TForum;
  session: Session | null;
  editVote: (vote: ForumVote) => void;
  deleteVote: (vote: ForumVote) => void;
  upVote: () => void;
}

export function UpVote({
  forum,
  session,
  editVote,
  deleteVote,
  upVote,
}: Props) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        const vote = getVoted(forum, session);

        if (vote) {
          if (vote.upVote === false) {
            editVote(vote);
          } else {
            deleteVote(vote);
          }
        } else {
          upVote();
        }
      }}
    >
      <ArrowUpIcon
        className={clsx(
          "h-6",
          getUpVoted(forum, session) ? "text-green-600" : "hover:text-green-600"
        )}
      />
    </button>
  );
}
