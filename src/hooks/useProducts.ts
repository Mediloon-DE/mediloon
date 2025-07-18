import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    storeId: {
        _id: string;
        name: string;
        location: string;
    };
    createdAt: string;
    updatedAt: string;
}

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
    return response.data.data;
};

export const useProduct = (id: string) => {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => fetchpProduct(id),
        enabled: !!id, 
    });
};
