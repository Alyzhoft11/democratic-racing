import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const PollRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.poll.findMany({
      include: {
        Response: {
          include: {
            Vote: true,
          },
        },
        user: true,
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.poll.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Response: {
            include: {
              Vote: true,
            },
          },
        },
      });
    }),
  createPoll: protectedProcedure
    .input(z.object({ text: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const poll = await ctx.prisma.poll.create({
        data: {
          title: input.title,
          text: input.text,
          userId: ctx.session.user.id,
        },
      });

      // input.responses.forEach(async (response) => {
      //   await ctx.prisma.response.create({
      //     data: {
      //       text: response,
      //       pollId: poll.id,
      //     },
      //   });
      // });

      return poll;
    }),
  editPoll: protectedProcedure
    .input(z.object({ id: z.string(), text: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.poll.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
          title: input.title,
        },
      });
    }),
  deletePoll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.poll.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
