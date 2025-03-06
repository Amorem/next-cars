import Link from "next/link";
import { routes } from "@/config/routes";
import Image from "next/image";
import { ClassifiedWithImages } from "@/config/types";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

export default function ClassifiedCard(props: ClassifiedCardProps) {
  const { classified } = props;
  return (
    <div className="bg-white relative rounded-md shadow-md overflow-hidden flex flex-col">
      <div className="aspect-3/2 relative">
        <Link href={routes.singleClassified(classified.slug)}>
          <Image
            placeholder="blur"
            blurDataURL={classified.images[0].blurhash}
            src={classified.images[0]?.src}
            alt={classified.images[0]?.alt}
            className="object-cover"
            fill
            quality={25}
          ></Image>
        </Link>
        <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
          <p className="text-xs lg:text-base xl:text-lg font-semibold">
            {classified.price}
          </p>
        </div>
      </div>
    </div>
  );
}
