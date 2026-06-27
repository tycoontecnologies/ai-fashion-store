'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer">

        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">
          <h3 className="font-bold text-lg">
            {product.name}
          </h3>

          <p className="text-[#d6aa5a] font-bold mt-2">
            Rs {product.price}
          </p>
        </div>

      </div>
    </Link>
  )
}
