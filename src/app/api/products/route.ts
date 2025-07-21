
import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import { connectToDB } from "@/lib/dbConnect";
import Store from "@/models/store.model";


export async function GET() {
    
    try {
        await connectToDB();

        const products = await Product.find()
            .populate({
                path: 'storeId',
                select: 'name location',
                model: Store
            });

        if (!products) {
            return NextResponse.json(
                { success: false, error: "Products not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}