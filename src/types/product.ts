export interface Product {
    id: string;
    storeId: string;
    name: string;
    name_lowercase: string;
    price: number;
    quantity: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    mmiProductId: number;
    store?: {
        id: string;
        name: string;
        name_lowercase: string;
        location: string;
        location_lowercase: string;
        userId: string;
    } | null;
}