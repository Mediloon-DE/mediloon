"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from '@/hooks/useProducts';
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useAllProducts();
  const productsToShow = 4;

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 py-10">
      {/* Show All Products Link */}
      <div className="flex flex-row max-md:flex-wrap justify-between mb-4">
        <h2 className="text-xl font-bold">Our recommendations</h2>
        <Link
          href="/products"
          className="text-natural-900 hover:text-primary font-bold text-sm flex items-center"
        >
          Show all products<span className="text-primary ml-1 -mt-2 text-3xl">→</span>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {isLoading ? (
          [...Array(productsToShow)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="w-full h-[200px] rounded-lg bg-gray-300" />
              <Skeleton className="w-3/4 h-6 mt-2 bg-gray-300" />
              <Skeleton className="w-1/2 h-6 mt-2 bg-gray-300" />
            </div>
          ))
        ) : (
          products?.slice(0, productsToShow).map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="bg-white rounded-md shadow-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="h-[150px] w-[150px] relative self-center">
                <Image
                  src={product.imageUrl || '/images/paracetamol.png'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={2500}
                  height={2500}
                  priority
                  quality={85} 
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" 
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-extrabold text-xl text-primary">€{product.price}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;