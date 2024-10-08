import { getAuthUserId } from "@convex-dev/auth/server";
// import { auth } from "./auth";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    // console.log({ userId });

    if (!userId) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});
