import "server-only";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const SOURCE_ID_KEY = "sourceId";

export async function setSourceId() {
  const cookieStore = await cookies();
  let sourceId = cookieStore.get(SOURCE_ID_KEY)?.value;

  if (!sourceId) {
    sourceId = uuidv4();
    cookieStore.set(SOURCE_ID_KEY, sourceId, {
      path: "/",
    });
  }

  return sourceId;
}

export async function getSourceId() {
  const cookieStore = await cookies();
  return cookieStore.get(SOURCE_ID_KEY)?.value;
}
