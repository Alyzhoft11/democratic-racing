import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const ForumRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.forumPost.findMany({
      include: {
        ForumComment: {
          include: { user: true },
        },

        ForumVote: true,
        user: true,
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.forumPost.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ForumComment: {
            include: { user: true },
          },
          ForumVote: true,
          user: true,
        },
      });
    }),
  createForum: protectedProcedure
    .input(z.object({ text: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const forum = await ctx.prisma.forumPost.create({
        data: {
          title: input.title,
          text: input.text,
          userId: ctx.session.user.id,
        },
      });

      return forum;
    }),
  editForum: protectedProcedure
    .input(z.object({ id: z.string(), text: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumPost.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
          title: input.title,
        },
      });
    }),
  deleteForum: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumPost.delete({
        where: {
          id: input.id,
        },
      });
    }),

  upVote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumVote.create({
        data: {
          upVote: true,
          forumPostId: input.id,
          userId: ctx.session.user.id,
          downVote: false,
        },
      });
    }),

  downVote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumVote.create({
        data: {
          upVote: false,
          forumPostId: input.id,
          userId: ctx.session.user.id,
          downVote: true,
        },
      });
    }),

  editVote: protectedProcedure
    .input(
      z.object({ id: z.string(), upVote: z.boolean(), downVote: z.boolean() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumVote.update({
        where: {
          id: input.id,
        },
        data: {
          upVote: !input.upVote,
          downVote: !input.downVote,
        },
      });
    }),

  deleteVote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forumVote.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
