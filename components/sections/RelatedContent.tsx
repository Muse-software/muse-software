import { Link } from "@/i18n/navigation";
import Image from "next/image";

type RelatedItem = {
  slug: string;
  title: string;
  excerpt: string;
  meta: string;
  href: string;
  image: string;
};

export default function RelatedContent({
  heading,
  items,
}: {
  heading: string;
  items: RelatedItem[];
}) {
  if (!items.length) return null;

  return (
    <div className="mt-16 border-t border-white/10 pt-12 md:mt-20 md:pt-16">
      <h2 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">{heading}</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="group overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601]"
          >
            <div className="relative h-32 w-full">
              <Image src={item.image} alt="" fill sizes="(min-width: 768px) 250px, (min-width: 640px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {item.meta}
              </p>
              <h3 className="mt-2 font-space-grotesk text-base font-bold leading-snug text-white">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
