import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import { connectToDB } from "@/lib/dbConnect";

type Params = Promise<{ storeId: string }>

export async function GET(request: Request, productData: { params: Params }) {
    const params = await productData.params
    const storeId = params.storeId
    try {        
        await connectToDB();

        const products = await Product.find({storeId})
            .select('name price quantity')
            .populate('storeId', 'name location');

        return NextResponse.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}