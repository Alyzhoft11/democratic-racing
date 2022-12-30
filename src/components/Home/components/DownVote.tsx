import { ArrowDownIcon } from "@heroicons/react/24/outline";
import type { ForumVote } from "@prisma/client";
import clsx from "clsx";
import type { Session } from "next-auth";
import type { TForum } from "../../../types";
import { getDownVoted, getVoted } from "../../../utils/Votes";

interface Props {
  forum: TForum;
  session: Session | null;
  editVote: (vote: ForumVote) => void;
  deleteVote: (vote: ForumVote) => void;
  downVote: () => void;
}

export function DownVote({
  forum,
  session,
  editVote,
  deleteVote,
  downVote,
}: Props) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        const vote = getVoted(forum, session);

        if (vote) {
          if (vote.downVote === false) {
            editVote(vote);
          } else {
            deleteVote(vote);
          }
        } else {
          downVote();
        }
      }}
    >
      <ArrowDownIcon
        className={clsx(
          "h-6",
          getDownVoted(forum, session) ? "text-red-600" : "hover:text-red-600"
        )}
      />
    </button>
  );
}
