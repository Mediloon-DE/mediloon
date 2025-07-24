import { NextResponse } from 'next/server';
import Product from '@/models/product.model';
import Store from '@/models/store.model';
import { connectToDB } from '@/lib/dbConnect';

export async function GET(request: Request) {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    try {
        // Search both products and stores
        const [products, stores] = await Promise.all([
            Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                ]
            }).limit(5),
            Store.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            }).limit(5)
        ]);

        return NextResponse.json({
            products,
            stores
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to search' },
            { status: 500 }
        );
    }
}