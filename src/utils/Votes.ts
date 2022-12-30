import type { Session } from "next-auth";
import type { TForum } from "../types";

export const getUpVoted = (forum: TForum, data: Session | null) => {
  const vote = forum.ForumVote.find(
    (vote) => vote.userId === data?.user?.id && vote.upVote === true
  );

  if (vote) {
    return true;
  }

  return false;
};

export const getDownVoted = (forum: TForum, data: Session | null) => {
  const vote = forum.ForumVote.find(
    (vote) => vote.userId === data?.user?.id && vote.downVote === true
  );

  if (vote) {
    return true;
  }

  return false;
};

export const getVoted = (forum: TForum, data: Session | null) => {
  const vote = forum.ForumVote.find((vote) => vote.userId === data?.user?.id);

  return vote;
};
