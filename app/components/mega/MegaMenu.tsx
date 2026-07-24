"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Item = {
  name: string;
  href: string;
  image: string;
  description: string;
};

export default function MegaMenu({
  open,
  items,
}: {
  open: boolean;
  items: Item[];
}) {
  const first = useMemo(() => items[0], [items]);
  const [active, setActive] = useState(first);

  if (!open) return null;

  const current = active ?? first;

  return (
    <div className="absolute left-0 top-full z-50 pt-4 w-[90vw] max-w-[800px]">
      <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="grid grid-cols-[240px_1fr]">
          <div className="border-r border-neutral-200 bg-white py-2">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setActive(item)}
                className={`flex items-center justify-between px-6 py-2 transition ${
                  current?.name === item.name
                    ? "bg-stone-100 font-medium"
                    : "hover:bg-neutral-50"
                }`}
              >
                <span className="text-lg">{item.name}</span>
                <span className="text-xl">›</span>
              </Link>
            ))}
          </div>

          <div className="p-6">
            {current && (
              <div className="relative h-[350px] overflow-hidden rounded-xl">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-r from-transparent via-transparent to-white/90">
                  <div className="max-w-sm pr-12">
                    <h2 className="text-5xl font-medium">
                      {current.name}
                    </h2>

                    <p className="mt-4 text-lg text-neutral-600">
                      {current.description}
                    </p>

                    <Link
                      href={current.href}
                      className="mt-8 inline-flex rounded-md bg-black px-6 py-2 text-sm font-medium uppercase tracking-wide text-white"
                    >
                      Shop {current.name}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
