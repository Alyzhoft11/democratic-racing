import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { ForumRouter } from "./forum";
import { PollRouter } from "./poll";
import { UserRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  poll: PollRouter,
  user: UserRouter,
  forum: ForumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
