import { getAuthSessionId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthSessionId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});
