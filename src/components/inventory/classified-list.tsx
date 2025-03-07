import { ClassifiedWithImages, Favorites } from "@/config/types";
import ClassifiedCard from "./classified-card";

interface ClassifiedListProps {
  classifieds: ClassifiedWithImages[];
  favorites: number[];
}

export default function ClassifiedList(props: ClassifiedListProps) {
  const { classifieds, favorites } = props;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {classifieds.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favorites={favorites}
          />
        );
      })}
    </div>
  );
}
