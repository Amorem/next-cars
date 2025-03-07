"use client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-client";
import { endpoints } from "@/config/endpoints";
type FavoriteButtonProps = {
  setIsFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
  id: number;
};

export function FavoriteButton(props: FavoriteButtonProps) {
  const { setIsFavorite, isFavorite, id } = props;
  const router = useRouter();

  async function handleFavorite() {
    const { ids } = await api.post<{ ids: number[] }>(endpoints.favorites, {
      json: {
        id,
      },
    });
    if (ids.includes(id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
      setTimeout(() => {
        router.refresh();
      }, 250);
    }
  }

  return (
    <Button
      onClick={handleFavorite}
      variant={"ghost"}
      size={"icon"}
      className={cn(
        "absolute top-2.5 left-3.5 rounded-full z-10 group !h-6 !w-6 lg:!h-8 lg:!w-8 xl:!h-10 xl:!w-10",
        isFavorite ? "bg-white" : "bg-muted/15"
      )}
    >
      <HeartIcon
        className={cn(
          "duration-200 transition-colors ease-in-out w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 text-white",
          isFavorite
            ? "text-pink-500 fill-pink-500"
            : "group-hover:text-pink-500 group-hover:fill-pink-500"
        )}
      />
    </Button>
  );
}
