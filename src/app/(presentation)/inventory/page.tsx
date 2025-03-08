import { PageProps, AwaitedPageProps, Favorites } from "@/config/types";
import { prisma } from "@/lib/prisma";
import ClassifiedList from "@/components/inventory/classified-list";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import CustomPagination from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { z } from "zod";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";

const PageSchema = z
  .string()
  .transform((val) => Math.max(Number(val), 1))
  .optional();

async function getInventory(searchParams: AwaitedPageProps["searchParams"]) {
  const validPage = PageSchema.parse(searchParams?.page);

  // Get the current page
  const page = validPage ? validPage : 1;

  // Calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    where: {},
    include: {
      images: { take: 1 },
    },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
}

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count({ where: {} });

  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

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
          <CustomPagination
            styles={{
              paginationRoot: "flex justify-end",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border-none active:border text-black",
              paginationLinkActive: "",
            }}
            baseUrl={routes.inventory}
            totalPages={totalPages}
          />
          <ClassifiedList
            classifieds={classifieds}
            favorites={favorites ? favorites.ids : []}
          />
        </div>
      </div>
    </div>
  );
}
