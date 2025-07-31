"use client"

import React from 'react'
import { useStores } from '@/hooks/useStores';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from 'lucide-react';

const AllStores = () => {
    const { data: stores, isLoading, error } = useStores();

    if (isLoading) return (
        <div className="flex flex-col justify-center items-center py-8 px-5">
            <h1 className="text-3xl font-bold mb-8">Sanitätshaus</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-gray-200 border rounded-lg p-6">
                        <Skeleton className="h-4 w-[250px] mb-4" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                ))}
            </div>
        </div>
    );

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col py-8 px-2">
            <h1 className="text-3xl font-bold mb-8">Sanitätshaus</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores?.map(store => (
                    <Link
                        key={store._id}
                        href={`/stores/${store._id}`}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold">{store.name}</h2>
                        <div className="flex flex-row gap-2 mt-2">
                            <p className="text-gray-600"><MapPin /> </p>
                            <p className="text-gray-600">{store.location}</p>
                        </div>
                        
                        <div className="mt-4 text-primary hover:underline">
                           Alle Produkte anzeigen →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AllStores;