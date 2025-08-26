"use client"

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Store } from "@/types/store";


interface StoreCardProps {
    store: Store;
}

export const StoreCard = ({ store }: StoreCardProps) => {
    return (
        <Link
            href={`/stores/${store.id}`}
            className="group block overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
            <div className="relative h-48 bg-gray-100">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-200" />
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-1">{store.name}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{store.location}</span>
                </div>
            </div>
        </Link>
    );
};