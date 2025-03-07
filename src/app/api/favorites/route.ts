import { routes } from "@/config/routes";
import { Favorites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";

const validateIdSchema = z.object({
  id: z.number().int(),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { data, error } = validateIdSchema.safeParse(body);

  if (!data) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      { status: 400 }
    );
  }

  if (typeof data.id !== "number") {
    return NextResponse.json(
      {
        error: "Invalid ID",
      },
      { status: 400 }
    );
  }

  // Get the sourceId from cookies
  const sourceId = await getSourceId();
  // retrieve the existing favorites from redis session
  const storedFavorites = await redis.get<Favorites>(sourceId || "");
  const favorites: Favorites = storedFavorites || { ids: [] };

  // Add or remove the ID based on its current presence in the favorites
  if (favorites.ids.includes(data.id)) {
    // remove the ID from the favorites
    favorites.ids = favorites.ids.filter((favId) => favId !== data.id);
  } else {
    // add the ID to the favorites
    favorites.ids.push(data.id);
  }

  // store the updated favorites in redis
  await redis.set(sourceId!, favorites);
  revalidatePath(routes.favorites);

  return NextResponse.json(
    {
      ids: favorites.ids,
    },
    { status: 200 }
  );
};
