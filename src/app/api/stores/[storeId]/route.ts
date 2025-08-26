import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Store } from "@/types/store";

type Params = Promise<{ storeId: string }>;

const db = firebaseAdmin.firestore();
const storesRef = db.collection("stores");

export async function GET(request: Request, productData: { params: Params }) {
    const params = await productData.params;
    const storeId = params.storeId;

    try {
        const storeDoc = await storesRef.doc(storeId).get();

        if (!storeDoc.exists) {
            return NextResponse.json(
                { success: false, error: "Store not found" },
                { status: 404 }
            );
        }

        const store = { id: storeDoc.id, ...storeDoc.data() } as Store;

        return NextResponse.json({
            success: true,
            data: store,
        });
    } catch (error) {
        console.error("Error fetching store:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
