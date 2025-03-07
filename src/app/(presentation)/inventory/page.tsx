import { PageProps, AwaitedPageProps, Favorites } from "@/config/types";
import { prisma } from "@/lib/prisma";
import ClassifiedList from "@/components/inventory/classified-list";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({
    include: {
      images: true,
    },
  });
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? "");

  return (
    <>
      <ClassifiedList
        classifieds={classifieds}
        favorites={favorites ? favorites.ids : []}
      />
    </>
  );
}
