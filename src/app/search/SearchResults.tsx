import { getSearchResults } from '@/hooks/search.actions';

import { StoreCard } from '@/components/Stores/StoreCard';
import ProductCard from '@/components/Products/ProductCard';
import { Product } from '@/hooks/useProducts';
import { Store } from '@/hooks/useStores';

export default async function SearchResults({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>
    }) {
    const query = (await searchParams).q;
    const { products, stores } = await getSearchResults(query);

    return (
        <div className="space-y-8">
            {products.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product: Product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {stores.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Stores ({stores.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stores.map((store: Store) => (
                            <StoreCard key={store._id} store={store} />
                        ))}
                    </div>
                </section>
            )}

            {products.length === 0 && stores.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}