import { PageProps, AwaitedPageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import ClassifiedList from "@/components/inventory/classified-list";

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
  return (
    <>
      <ClassifiedList classifieds={classifieds} />
    </>
  );
}
