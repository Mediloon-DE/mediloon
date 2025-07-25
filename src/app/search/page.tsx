"use client"

import { Suspense, use } from 'react';
import SearchResults from '@/components/Search/SearchResults';
import Loader from '@/components/Common/Loader';

type Params = Promise<{ q: string }>

export default function SearchPage(props: {
    params: Params
}) {
    const params = use(props.params)
    const q = params.q
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Search Results:
            </h1>

            <Suspense fallback={<Loader />}>
                <SearchResults searchQuery={q} />
            </Suspense>
        </div>
    );
}