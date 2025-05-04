import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgURL: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  imgStyles?: string;
  textStyles: string;
  isAuthor?: boolean;
}

export default function Metric({
  imgURL,
  alt,
  value,
  title,
  href,
  imgStyles,
  textStyles,
  isAuthor,
}: MetricProps) {
  const metricContent = (
    <>
      <Image
        src={imgURL}
        alt={alt}
        height={16}
        width={16}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor && "max-sm:hidden"}`}
        >
          {title}
        </span>
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
}
