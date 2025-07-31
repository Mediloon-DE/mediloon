"use client"

import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProducts";
import { use } from "react";
import { MapPin, ShoppingCart } from 'lucide-react';
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

    const isInStock = product.quantity !== undefined && product.quantity > 0;

    return (
        <div className="flex flex-col py-10">
            <div className="grid md:grid-cols-2 gap-10 max-w-[1080px] mx-auto">
                {/* Product Image */}
                <div className="w-full flex flex-col justify-center items-center space-x-5 md:space-y-10 p-2.5  md:p-5">
                    <div className="relative w-[250px] md:w-[400px] h-40 md:h-80 rounded-xl overflow-hidden">
                        <Image
                            src={product.imageUrl || '/images/paracetamol.png'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
                    </div>
                    <div className="hidden  md:grid md:grid-cols-3 gap-5 max-w-md mx-auto">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-[100px] w-[120px] relative rounded-lg overflow-hidden">
                                <Image
                                    src={product.imageUrl || '/images/paracetamol.png'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    width={120}
                                    height={100}
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center space-y-6 px-2.5">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-primary">
                                €{product.price.toFixed(2)}
                            </span>
                            <span className={`px-2 py-1 text-sm rounded-md ${isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-800'}`}>
                                {isInStock ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Sanitätshaus</h2>
                        <div className="mt-2 space-y-1">
                            <p className="text-gray-600">{product.storeId.name}</p>
                            <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <p>{product.storeId.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button className=" flex flex-row justify-center items-center w-sm py-3 gap-2 text-base font-bold text-center text-white bg-primary rounded-full max-md:px-5 hover:bg-rose-700 transition-colors">

                            <ShoppingCart className="" />
                            <span className="my-auto">In den Warenkorb</span>

                        </button>
                        
                        {/* <Button
                            variant="outline"
                            className="px-6 py-3 border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                            disabled={!isInStock}
                        >
                            Buy Now
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}