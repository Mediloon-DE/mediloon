"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from '@/hooks/useProducts';
import Image from "next/image";
import Link from "next/link";

const AllProduct = () => {
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
        <div className="w-full mx-auto flex justify-center items-center">
            {/* Show All Products Link */}


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
                    products?.map((product) => (
                        <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary flex flex-col h-[350px]"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                        quality={80}
                                        priority={false}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-medium text-gray-900 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="mt-3 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-primary">
                                        €{product.price.toFixed(2)}
                                    </p>
                                    {product.quantity > 0 ? (
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllProduct;