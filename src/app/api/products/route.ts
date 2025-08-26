import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

const db = firebaseAdmin.firestore();
const productsRef = db.collection("storeProducts");
const storesRef = db.collection("stores");

type StorePreview = Pick<Store, "id" | "name" | "location" | "userId" | "name_lowercase" | "location_lowercase">;

export async function GET() {
    try {
        // Fetch all products
        const productsSnap = await productsRef.get();

        if (productsSnap.empty) {
            return NextResponse.json(
                { success: false, error: "Products not found" },
                { status: 404 }
            );
        }

        // Map product documents
        const products: (Product & { store?: StorePreview | null })[] =
            await Promise.all(
                productsSnap.docs.map(async (doc) => {
                    const productData = doc.data() as Omit<Product, "id">;
                    const storeId = productData.storeId;

                    let store: StorePreview | null = null;
                    if (storeId) {
                        const storeDoc = await storesRef.doc(storeId).get();
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

                    return {
                        id: doc.id,
                        ...productData,
                        store,
                    };
                })
            );

        return NextResponse.json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
