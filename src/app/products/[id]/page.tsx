"use client"

import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProducts";
import { use } from "react";
import { MapPin } from 'lucide-react';
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";


type Params = Promise<{ id: string }>

export default function ProductPage(props: {
    params: Params
}) {
    const params = use(props.params)
    const id = params.id
    const { data: product, isLoading, error } = useProduct(id);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="w-full aspect-square rounded-lg" />
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="w-full h-20 rounded-md" />
                            ))}
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                        <div className="flex gap-4 pt-6">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
                    <p>Failed to load product: {error.message}</p>
                    <Button
                        variant="ghost"
                        className="mt-2 text-red-600 hover:bg-red-100"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        );
    }

    // Type guard to ensure quantity exists
    const isInStock = product.quantity !== undefined && product.quantity > 0;

    return (
        <div className="flex flex-col py-8">
            <div className="grid md:grid-cols-2 gap-8 px-5">
                {/* Product Image */}
                <div className="space-y-0">
                    <div className="relative w-full pb-[60%] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src="/images/paracetamol.png"
                            alt={product.name}
                            fill
                            className="object-cover"
                            quality={100}
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-5">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-[150px] w-[200px] relative rounded-lg overflow-hidden">
                                <Image
                                    src="/images/paracetamol.png"
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    width={150}
                                    height={200}
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-2xl font-semibold text-gray-900">
                                €{product.price.toFixed(2)}
                            </span>
                            <span className={`px-2 py-1 text-sm rounded-md ${isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-800'}`}>
                                {isInStock ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
                        <div className="mt-2 space-y-1">
                            <p className="text-gray-600">{product.storeId.name}</p>
                            <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <p>{product.storeId.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <Button
                            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 cursor-pointer"
                            disabled={!isInStock}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            className="px-6 py-3 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white cursor-pointer"
                            disabled={!isInStock}
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}