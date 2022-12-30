import type {
  Poll,
  Vote,
  Response,
  User,
  ForumComment,
  ForumPost,
  ForumVote,
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
