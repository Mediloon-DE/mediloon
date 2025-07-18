
import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import { connectToDB } from "@/lib/dbConnect";
import Store from "@/models/store.model";

type Params = Promise<{ id: string }>

export async function GET(request: Request, productData: { params: Params }) {
    const params = await productData.params
    const id = params.id
    console.log("Product id", id);
    try {
        await connectToDB();

        const product = await Product.findById(id)
            .populate({
                path: 'storeId',
                select: 'name location',
                model: Store
            });

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}