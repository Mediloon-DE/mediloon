import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/dbConnect";
import Product from "@/models/product.model";
import Store from "@/models/store.model";

export async function GET() {
    try {       

        await connectToDB();

        // Then get all products for these stores
        const products = await Product.find()
            .populate({
                path: 'storeId',
                select: 'name location',
                model: Store
            });

        return NextResponse.json(
            {
                success: true,
                data: products
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Fehler beim Abrufen der Produkte:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Ein Fehler ist aufgetreten",
                message: error instanceof Error ? error.message : "Unbekannter Fehler"
            },
            { status: 500 }
        );
    }
}