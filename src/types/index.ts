import type {
  ForumComment,
  ForumPost,
  ForumVote,
  Poll,
  Response,
  User,
  Vote,
} from "@prisma/client";

export type GetAllPolls = Poll & {
  user: User;
  Response: (Response & {
    Vote: Vote[];
  })[];
};

export type TForum = ForumPost & {
  user: User;
  ForumComment: (ForumComment & {
    user: User;
  })[];
  ForumVote: ForumVote[];
  // _count: {
  //   ForumVote: number;
  // };
};

export type TComment = ForumComment & {
  user: User;
};
