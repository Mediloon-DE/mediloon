import { NextResponse } from "next/server";
import Store from "@/models/store.model";
import { connectToDB } from "@/lib/dbConnect";

export async function GET(request: Request) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const stores = await Store.find()
            .select('name location')
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({
            success: true,
            data: stores,
            pagination: {
                page,
                limit,
                total: await Store.countDocuments()
            }
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch stores" },
            { status: 500 }
        );
    }
}