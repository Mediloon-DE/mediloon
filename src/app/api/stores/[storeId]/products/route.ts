import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

type Params = Promise<{ storeId: string }>;

const db = firebaseAdmin.firestore();
const productsRef = db.collection("storeProducts");
const storesRef = db.collection("stores");

export async function GET(request: Request, productData: { params: Params }) {
    const params = await productData.params;
    const storeId = params.storeId;

    try {
        // Fetch products belonging to the store
        const productsSnap = await productsRef.where("storeId", "==", storeId).get();

        if (productsSnap.empty) {
            return NextResponse.json({
                success: true,
                data: [],
            });
        }

        // Fetch store details (like populate in Mongoose)
        const storeDoc = await storesRef.doc(storeId).get();
        const store = storeDoc.exists
            ? ({ id: storeDoc.id, ...storeDoc.data() } as Store)
            : null;

        const products: (Product & { store?: Store | null })[] = productsSnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
                store,
            };
        });

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
