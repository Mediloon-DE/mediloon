import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

const db = firebaseAdmin.firestore();
const productsRef = db.collection("storeProducts");
const storesRef = db.collection("stores");

type Params = Promise<{ id: string }>;

export async function GET(
    request: Request,
    productData: { params: Params }
) {
    const params = await productData.params;
    const id = params.id;
    console.log("Product id", id);

    try {
        // Fetch the product document
        const productDoc = await productsRef.doc(id).get();

        if (!productDoc.exists) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        const productData = productDoc.data() as Omit<Product, "id">;

        // Fetch store (like mongoose populate)
        let store: Pick<Store, "id" | "name" | "location" | "userId" | "name_lowercase" | "location_lowercase"> | null = null;
        if (productData.storeId) {
            const storeDoc = await storesRef.doc(productData.storeId).get();
            if (storeDoc.exists) {
                const storeData = storeDoc.data() as Store;
                store = {
                    id: storeDoc.id,
                    name: storeData.name,
                    location: storeData.location,
                    userId: storeData.userId,
                    name_lowercase: storeData.name_lowercase,
                    location_lowercase: storeData.location_lowercase,
                };
            }
        }

        // Merge product + store
        const product: Product & { store?: typeof store } = {
            id: productDoc.id,
            ...productData,
            store,
        };

        return NextResponse.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
