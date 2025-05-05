import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ROUTES } from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  isButton?: boolean;
  remove?: boolean;
  handleTagRemove?: () => void;
}

export default function TagCard({
  _id,
  name,
  questions,
  showCount,
  compact,
  isButton,
  remove,
  handleTagRemove,
}: TagCardProps) {
  const iconClass = getDeviconClassName(name);
  const content = (
    <>
      <Badge className="flex flex-row gap-2 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex items-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="Close"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleTagRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );
  if (compact) {
    return isButton ? (
      <button type="button">{content}</button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="flex justify-between gap-2 items-center"
      >
        {content}
      </Link>
    );
  }
}
