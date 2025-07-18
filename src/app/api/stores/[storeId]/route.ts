import { NextResponse } from "next/server";
import Store from "@/models/store.model";
import { connectToDB } from "@/lib/dbConnect";

type Params = Promise<{ storeId: string }>

export async function GET(request: Request, productData: { params: Params }) {
    const params = await productData.params
    const storeId = params.storeId
    try {
        await connectToDB();

        // Validate storeId format
        

        const store = await Store.findById(storeId)
            .select('name location createdAt')
            .lean();

        if (!store) {
            return NextResponse.json(
                { success: false, error: "Store not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: store
        });
    } catch (error) {
        console.error("Error fetching store:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}