import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

const db = firebaseAdmin.firestore();
const productsRef = db.collection("storeProducts");
const storesRef = db.collection("stores");
const mmiProductsRef = db.collection("products");

type Params = Promise<{ id: string }>;

export async function GET(
    request: Request,
    productData: { params: Params }
) {
    const params = await productData.params;
    const id = params.id;
    console.log("Product id", id);

    try {
        // 1️⃣ Fetch store product
        const productDoc = await productsRef.doc(id).get();
        if (!productDoc.exists) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }
        const productData = productDoc.data() as Omit<Product, "id">;

        // 2️⃣ Fetch store (like mongoose populate)
        let store: Pick<
            Store,
            "id" | "name" | "location" | "userId" | "name_lowercase" | "location_lowercase"
        > | null = null;

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

        // 3️⃣ Fetch related MMI product
        let mmiProduct: any = null;
        if (productData.mmiProductId) {
            const mmiDoc = await mmiProductsRef.doc(String(productData.mmiProductId)).get();
            if (mmiDoc.exists) {
                mmiProduct = {
                    id: mmiDoc.id,
                    ...mmiDoc.data(),
                };
            }
        }

        // 4️⃣ Merge everything
        const product: Product & { store?: typeof store; mmiProduct?: typeof mmiProduct } = {
            id: productDoc.id,
            ...productData,
            store,
            mmiProduct,
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
