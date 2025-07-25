import { NextResponse } from 'next/server';
import Product from '@/models/product.model';
import Store from '@/models/store.model';
import { connectToDB } from '@/lib/dbConnect';

export async function GET(request: Request) {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type'); // 'products' or 'stores'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    try {
        if (type === 'products') {
            const products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit);

            return NextResponse.json({ products });
        } else if (type === 'stores') {
            const stores = await Store.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit);

            return NextResponse.json({ stores });
        } else {
            // Return both with limited results for typeahead
            const [products, stores] = await Promise.all([
                Product.find({
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                    ]
                }).limit(3),
                Store.find({
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { location: { $regex: query, $options: 'i' } }
                    ]
                }).limit(3)
            ]);

            return NextResponse.json({
                products,
                stores
            });
        }
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to search' },
            { status: 500 }
        );
    }
}