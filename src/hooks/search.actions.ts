'use server';

import firebaseAdmin from '@/lib/firebaseAdmin';
import { Product } from '@/types/product';
import { Store } from '@/types/store';

const db = firebaseAdmin.firestore();
const productsRef = db.collection('storeProducts');
const storesRef = db.collection('stores');

export async function getSearchResults(query: string): Promise<{
    products: (Product & { id: string })[];
    stores: (Store & { id: string })[];
}> {
    try {
        const q = query.toLowerCase();

        // Products search (case-insensitive)
        const productsSnap = await productsRef
            .orderBy('name_lowercase')
            .startAt(q)
            .endAt(q + '\uf8ff')
            .get();

        const products: (Product & { id: string })[] = productsSnap.docs.map((doc) => ({
            ...(doc.data() as Product),
            id: doc.id,
        }));

        // Stores search (case-insensitive by name or location)
        const [storeNameSnap, storeLocationSnap] = await Promise.all([
            storesRef.orderBy('name_lowercase').startAt(q).endAt(q + '\uf8ff').get(),
            storesRef.orderBy('location_lowercase').startAt(q).endAt(q + '\uf8ff').get(),
        ]);

        const storeMap = new Map<string, Store & { id: string }>();

        storeNameSnap.forEach((doc) =>
            storeMap.set(doc.id, { ...(doc.data() as Store), id: doc.id })
        );
        storeLocationSnap.forEach((doc) =>
            storeMap.set(doc.id, { ...(doc.data() as Store), id: doc.id })
        );

        const stores = Array.from(storeMap.values());

        return { products, stores };
    } catch (error) {
        console.error('Search failed:', error);
        return { products: [], stores: [] };
    }
}
