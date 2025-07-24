"use client";

import { useStores } from '@/hooks/useStores';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: stores, isLoading: storesLoading, error: storesError } = useStores();

    return (
        <div className="flex flex-col w-full items-center my-5 ">
            <div className="w-full rounded-sm p-2 flex justify-start items-center gap-2">

                {/* Menu Icon and Dropdown */}
                <div className="relative">
                    <button
                        className="p-2 focus:outline-none rounded transition-colors"
                        aria-label="Menu"
                        onMouseEnter={() => setIsMenuOpen(true)}
                    >
                        <div className='flex flex-row my-auto gap-2 text-gray-700 hover:text-primary'>
                            <AlignJustify className="h-6 w-6" />
                            <p className='text-base font-bold '>Categories</p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div
                            className="absolute right-0 left-2 mt-4 w-96 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                            onMouseEnter={() => setIsMenuOpen(true)}
                            onMouseLeave={() => setIsMenuOpen(false)}
                        >
                            <div className="py-1 flex flex-row">
                                {/* Stores Section */}
                                <div className='flex flex-col'>
                                    <div className="px-4 py-2 font-semibold border-b">Stores</div>
                                    <div className="flex flex-col">
                                        {storesLoading ? (
                                            Array(3).fill(0).map((_, i) => (
                                                <div key={`store-skeleton-${i}`} className="px-4 py-3 animate-pulse">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                </div>
                                            ))
                                        ) : storesError ? (
                                            <div className="px-4 py-2 text-sm text-red-500">
                                                Failed to load stores
                                            </div>
                                        ) : (
                                            stores?.map(store => (
                                                <Link
                                                    key={store._id}
                                                    href={`/stores/${store._id}`}
                                                    className="flex px-4 py-2 text-gray-700 hover:bg-amber-50 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <h3 className="text-base font-bold">{store?.name}</h3>
                                                    {/* <div className="flex items-center gap-1 text-gray-600 pl-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <p className="text-gray-600 ">{store?.location}</p>
                                                    </div> */}
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </div>


                                {/* Doctors Section - Uncomment when ready */}
                                {/* <div className="px-4 py-2 font-semibold border-b border-t mt-1">Doctors</div> */}
                                {/* {doctorsLoading ? (
                                    Array(3).fill(0).map((_, i) => (
                                        <div key={`doctor-skeleton-${i}`} className="px-4 py-3 animate-pulse">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    ))
                                ) : doctorsError ? (
                                    <div className="px-4 py-2 text-sm text-red-500">
                                        Failed to load doctors
                                    </div>
                                ) : (
                                    doctors?.map(doctor => (
                                        <Link
                                            key={doctor._id}
                                            href={`/doctors/${doctor._id}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dr. {doctor.name} - {doctor.specialization}
                                        </Link>
                                    ))
                                )} */}
                            </div>
                        </div>
                    )}
                </div>
                <div>|</div>
                <div className="flex flex-row gap-2 text-gray-700 hover:text-primary">
                    <Link href="/products" className="text-base font-bold">drug</Link>
                </div>
            </div>
        </div>
    )
}

export default Topbar;