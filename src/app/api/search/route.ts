import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

const db = firebaseAdmin.firestore();
const productsRef = db.collection("storeProducts");
const storesRef = db.collection("stores");

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type"); // 'products' or 'stores'
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    try {
        const start = query;
        const end = query + "\uf8ff";

        if (type === "products") {
            const productsSnap = await productsRef
                .orderBy("name")
                .startAt(start)
                .endAt(end)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();

            const products: Product[] = productsSnap.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            }));

            return NextResponse.json({ products });
        } else if (type === "stores") {
            const storesSnap = await storesRef
                .orderBy("name")
                .startAt(start)
                .endAt(end)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();

            const stores: Store[] = storesSnap.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Store, "id">),
            }));

            return NextResponse.json({ stores });
        } else {
            // Return both with limited results for typeahead
            const [productsSnap, storesSnap] = await Promise.all([
                productsRef.orderBy("name").startAt(start).endAt(end).limit(3).get(),
                storesRef.orderBy("name").startAt(start).endAt(end).limit(3).get(),
            ]);

            const products: Product[] = productsSnap.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            }));

            const stores: Store[] = storesSnap.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Store, "id">),
            }));

            return NextResponse.json({ products, stores });
        }
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to search" },
            { status: 500 }
        );
    }
}
