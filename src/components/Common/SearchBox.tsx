"use client"

import { useState} from "react";
import { MapPin, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/hooks/useProducts";
import { Store } from "@/hooks/useStores";
import Link from "next/link";

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['search', debouncedSearchQuery],
        queryFn: () => search(debouncedSearchQuery),
        enabled: debouncedSearchQuery.length > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            refetch();
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
                    className="w-full py-3 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    type="submit"
                    className="absolute p-3.5 pr-8 rounded-r-full right-0.5 top-1/2 bg-pink-600 transform -translate-y-1/2 text-white cursor-pointer hover:bg-pink-700 transition-colors"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>

            {/* Search results dropdown */}
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
                                    {/* <h3 className="px-4 py-2 font-semibold text-gray-700 bg-gray-50">Products</h3> */}
                                    {data.products.map((product: Product) => (
                                        <Link
                                            key={product._id}
                                            href={`/products/${product._id}`}
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-sm text-gray-500">{product.name}</span>
                                                <p className="text-lg font-semibold text-pink-600">
                                                    €{product.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {data.stores?.length > 0 && (
                                <div>
                                    {/* <h3 className="px-4 py-2 font-semibold text-gray-700 bg-gray-50">Stores</h3> */}
                                    {data.stores.map((store: Store) => (
                                        <Link
                                            key={store._id}
                                            href={`/stores/${store._id}`}
                                            className="block px-4 py-2"
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
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchBox;