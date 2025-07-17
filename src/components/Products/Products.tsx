"use client";
import ProductCard from "@/components/Products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton"; // Add a loading skeleton component

const Products = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-200">
                <div className="max-w-7xl mx-auto py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-48 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600">
                        Error loading products
                    </h2>
                    <p className="text-gray-600">
                        {(error as Error).message || "Please try again later"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={{
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                image: "/images/paracetamol.jpg",
                                category: product.storeId.name
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;