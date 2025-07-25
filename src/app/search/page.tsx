import { Suspense } from 'react';
import SearchResults from './SearchResults';
import Loader from '@/components/Common/Loader';


export default function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>
}) {

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Search Results:
            </h1>

            <Suspense fallback={<Loader />}>
                <SearchResults searchParams={searchParams} />
            </Suspense>
        </div>
    );
}