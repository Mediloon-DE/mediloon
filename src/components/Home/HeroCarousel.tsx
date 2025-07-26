"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Product, useAllProducts } from "@/hooks/useProducts"
import { Skeleton } from "@/components/ui/skeleton"

export function HeroCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    const { data: products, isLoading, error } = useAllProducts();
    const productsToShow = 4;

    if (error) {
        return (
            <div className="flex items-center justify-center h-[500px] bg-red-50">
                <p className="text-red-500">Failed to load products. Please try again later.</p>
            </div>
        )
    }

    if (!products || products.length === 0 || isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <Skeleton className="h-96 w-full rounded-xl bg-gray-300" />
                <div className="flex flex-col space-y-6">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4 bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-5/6 bg-gray-300" />
                        <Skeleton className="h-4 w-2/3 bg-gray-300" />
                    </div>
                    <div className="flex justify-end mt-auto pt-8">
                        <Skeleton className="h-12 w-32 bg-gray-300" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <Carousel
                plugins={[plugin.current]}
                className="w-full mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {products && products.length > 0 &&
                        products?.slice(0, productsToShow).map((product: Product) => (
                            <CarouselItem key={product._id}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center h-full">
                                    <div className="relative w-[350px] h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={product.image || '/images/paracetamol.png'}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>

                                    <div className="flex flex-col h-full px-4 md:px-0 gap-5">
                                        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 line-clamp-3 text-end">
                                            {product.storeId.name}
                                        </p>
                                        <div className="flex-grow">
                                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                                {product.name}
                                            </h1>

                                        </div>

                                        <div className="w-full flex justify-end">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="bg-primary hover:bg-red-700 w-40 rounded-full"
                                            >
                                                <Link href={`/products/${product._id}`}>
                                                    Shop Now
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>
            </Carousel>
        </section>
    )
}