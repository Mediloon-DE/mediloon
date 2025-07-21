"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from '@/hooks/useProducts';
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useAllProducts();
  const productsToShow = 4; // Number of products to display

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 mt-8">
      {/* Show All Products Link */}
      <div className="flex justify-end mb-4">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          Show all products <span className="ml-1">→</span>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="h-[200px] bg-gray-100 relative">
                <Image
                  src="/images/paracetamol.png"
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={2500}
                  height={2500}
                  priority
                  quality={85} // Optimize quality (default 75)
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // Responsive sizing
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-bold text-lg">€{product.price}</span>
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