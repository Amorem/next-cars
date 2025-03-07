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
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 p-4 bg-white">
        <div className="flex flex-col lg:flex-row space-y-2 items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              We have found {count} classifieds
            </h2>
            {/* <DialogFilter />  */}
          </div>
          <ClassifiedList
            classifieds={classifieds}
            favorites={favorites ? favorites.ids : []}
          />
        </div>
      </div>
    </div>
  );
}
