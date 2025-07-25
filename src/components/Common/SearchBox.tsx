"use client"

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/hooks/useProducts";
import { Store } from "@/hooks/useStores";

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['search', debouncedSearchQuery],
        queryFn: () => search(debouncedSearchQuery),
        enabled: debouncedSearchQuery.length > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="relative w-full max-w-xl">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search products or stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full py-3 pl-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button
                    type="submit"
                    className="absolute py-4 px-5 -mr-0.5 rounded-r-2xl right-0.5 top-1/2 bg-primary transform -translate-y-1/2 text-white cursor-pointer hover:bg-red-700 transition-colors"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>

            {/* Typeahead dropdown - shows preview of results */}
            {isFocused && debouncedSearchQuery && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : isError ? (
                        <div className="p-4 text-center text-red-500">Error searching</div>
                    ) : data ? (
                        <>
                            {data.products?.length > 0 && (
                                <div className="border-b border-gray-200">
                                            <Link
                                                href={`/search?q=${encodeURIComponent(debouncedSearchQuery)}&type=products`}
                                                className="block px-4 py-2 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100"
                                            >
                                                View all {data.products.length} products
                                            </Link>
                                            {data.products.slice(0, 3).map((product: Product) => (
                                        <Link
                                            key={product._id}
                                            href={`/products/${product._id}`}
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-sm text-gray-500">{product.name}</span>
                                                <p className="text-lg font-semibold text-primary">
                                                    €{product.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {data.stores?.length > 0 && (
                                <div>
                                            <Link
                                                href={`/search?q=${encodeURIComponent(debouncedSearchQuery)}&type=stores`}
                                                className="block px-4 py-2 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100"
                                            >
                                                View all {data.stores.length} stores
                                            </Link>
                                            {data.stores.slice(0, 3).map((store: Store) => (
                                        <Link
                                            key={store._id}
                                            href={`/stores/${store._id}`}
                                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-sm text-gray-500">{store.name}</span>
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    <MapPin className="h-4 w-4" />
                                                    <p>{store.location}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {data.products?.length === 0 && data.stores?.length === 0 && (
                                <div className="p-4 text-center text-gray-500">No results found</div>
                            )}
                                    <div className="p-2 border-t border-gray-200">
                                        <Link
                                            href={`/search?q=${encodeURIComponent(debouncedSearchQuery)}`}
                                            className="block w-full text-center py-2 bg-primary text-white rounded hover:bg-red-700"
                                        >
                                            See all results
                                        </Link>
                                    </div>
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchBox;