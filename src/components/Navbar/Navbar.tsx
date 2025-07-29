"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../Common/Logo";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import SearchBox from "../Common/SearchBox";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white">
            <div className="max-w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center md:flex-1">
                        <Link href="/" className="">
                            <Logo className={"font-bold text-gray-900"} />
                        </Link>
                    </div>

                    {/* Search Box - Center */}
                    <div className="hidden md:flex flex-[2] max-w-xl mx-4">
                        <SearchBox />
                    </div>

                    {/* Desktop-Navigation */}
                    <div className="flex items-center justify-end space-x-8 md:flex-1">
                        <button className="flex md:hidden text-gray-700 hover:text-primary">
                            <Search className="w-8 h-8" />
                        </button>
                        {/* user-Icon */}
                        <button className="relative text-gray-700 hover:text-primary">
                            <UserRound className="w-8 h-8" />
                        </button>
                        {/* Warenkorb-Icon */}
                        <button className="relative text-gray-700 hover:text-primary">
                            <ShoppingCart className="w-8 h-8" />
                            <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                                0
                            </span>
                        </button>
                    </div>

                    {/* Mobile-Menü-Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile-Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    {/* Mobile Search Box - Only visible when menu is open */}
                    <div className="px-4 py-3">
                        <SearchBox />
                    </div>
                </div>
            )}
        </nav>
    );
}