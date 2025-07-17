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
    };
    createdAt: string;
    updatedAt: string;
}

// Fetch all products for current user
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get("/products");
    return response.data.data;
};

// React Query hooks
export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};