"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { formUrlQuery, removeURLQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";

const filters = [
  { name: "React", value: "react" },
  { name: "Next.js", value: "next.js" },
  //   {
  //     name: "Newest",
  //     value: "newest",
  //   },
  //   {
  //     name: "Popular",
  //     value: "popular",
  //   },
  //   {
  //     name: "Unanswered",
  //     value: "unanswered",
  //   },
  //   {
  //     name: "Recommended",
  //     value: "recommended",
  //   },
];

export default function HomeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [active, setActive] = useState(filterParams);
  const handleFilter = (filter: string) => {
    let newURL = "";
    if (filter === active) {
      setActive("");
      newURL = removeURLQueryParams({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });
    }
    router.push(newURL);
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none background-light700_dark300 cursor-pointer",
            active === filter.value
              ? "bg-brand text-brand-foreground  dark:bg-dark-400 dark:text-brand dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500dark:text-light-500 dark:bg-dark-300"
          )}
          onClick={() => handleFilter(filter.value)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}
