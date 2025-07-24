"use client"

import ProductCard from "@/components/Products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { useStore } from "@/hooks/useStores";
import { MapPin } from "lucide-react";
import { use } from "react";

type Params = Promise<{ storeId: string }>

export default function StorePage(props: {
  params: Params
}) {

  const params = use(props.params)
  const storeId = params.storeId
  
  const { data: store, isLoading: storeLoading, error: storeError } = useStore(storeId);
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts(storeId);

  if (storeLoading || productsLoading) {
    return (
      <div className="flex flex-col py-8">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-1/2 bg-gray-200" />
          <Skeleton className="h-4 w-1/3 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  if (storeError || productsError) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-red-500 mb-4">
          Error loading store data
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }
 

  return (
    <div className="flex flex-col py-8 px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{store?.name}</h1>
        <div className="flex items-center gap-1 text-gray-600 mt-2">
          <MapPin className="h-4 w-4" />
          <p className="text-gray-600 ">{store?.location.toUpperCase()}</p>
        </div>
        
      </div>

      {products?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No products available in this store
        </div>
      )}
    </div>
  );
}