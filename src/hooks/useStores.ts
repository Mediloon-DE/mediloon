import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Store {
    _id: string;
    name: string;
    location: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

// Fetch all stores
export const fetchStores = async (): Promise<Store[]> => {
    const response = await axios.get("/stores");
    return response.data.data;
};

export const fetchStore = async (id: string): Promise<Store> => {
    const response = await axios.get(`/stores/${id}`);
    return response.data.data;
};


// React Query hooks
export const useStores = () => {
    return useQuery<Store[]>({
        queryKey: ["stores"],
        queryFn: fetchStores,
    });
};

export const useStore = (id: string) => {
    return useQuery<Store>({
        queryKey: ["stores", id],
        queryFn: () => fetchStore(id),
        enabled: !!id, 
    });
};