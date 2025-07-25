'use server';

import { connectToDB } from '@/lib/dbConnect';
import Product from '@/models/product.model';
import Store from '@/models/store.model';

export async function getSearchResults(query: string) {
    await connectToDB();

    try {
        const [products, stores] = await Promise.all([
            Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                ]
            }),
            Store.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            })
        ]);

        return {
            products: JSON.parse(JSON.stringify(products)),
            stores: JSON.parse(JSON.stringify(stores))
        };
    } catch (error) {
        console.error('Search failed:', error);
        return { products: [], stores: [] };
    }
}