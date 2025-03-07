"use client";

import {
  Pagination as PaginationRoot,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
interface CustomPaginationProps {
  baseUrl: string;
  totalPages: number;
  maxVisiblePages?: number;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationItem: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}

export default function CustomPagination({
  baseUrl,
  totalPages,
  maxVisiblePages = 5,
  styles,
}: CustomPaginationProps) {
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
    shallow: false,
  });

  return (
    <PaginationRoot className={styles.paginationRoot}>
      <PaginationContent className="lg:gap-4">
        <PaginationItem>
          <PaginationPrevious></PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink></PaginationLink>
        </PaginationItem>
        {/* Pages go here */}
        <PaginationItem>
          <PaginationLink></PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
