import { NextResponse } from "next/server";
import firebaseAdmin from "@/lib/firebaseAdmin";
import { Store } from "@/types/store";

const db = firebaseAdmin.firestore();
const storesRef = db.collection("stores");

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        // Query Firestore
        const snapshot = await storesRef
            .orderBy("createdAt", "desc")
            .offset((page - 1) * limit)
            .limit(limit)
            .get();

        const stores: Store[] = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Store)
        );

        // Count total (Firestore has no built-in count without aggregation)
        const totalSnap = await storesRef.count().get();
        const total = totalSnap.data().count;

        return NextResponse.json({
            success: true,
            data: stores,
            pagination: {
                page,
                limit,
                total,
            },
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch stores" },
            { status: 500 }
        );
    }
}
