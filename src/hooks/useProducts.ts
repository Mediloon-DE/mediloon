import axios from "@/lib/axios";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";


// Fetch all products
export const fetchAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`/products`);
    return response.data.data;
};

export const useAllProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["allProducts"],
        queryFn: () => fetchAllProducts(),
        enabled: true,
        staleTime: 1000 * 60 * 1,
    });
};

// Fetch multiple products for a store
export const fetchProducts = async (storeId: string): Promise<Product[]> => {
    const response = await axios.get(`/stores/${storeId}/products`);
    return response.data.data;
};

export const useProducts = (storeId: string) => {
    return useQuery<Product[]>({ // Note the array type here
        queryKey: ["products", storeId],
        queryFn: () => fetchProducts(storeId),
        enabled: !!storeId,
    });
};

export const fetchpProduct = async (id: string): Promise<Product> => {
    const response = await axios.get(`/products/${id}`);
    // console.log(response.data.data);
    return response.data.data;
};

export const useProduct = (id: string) => {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => fetchpProduct(id),
        enabled: !!id, 
    });
};
