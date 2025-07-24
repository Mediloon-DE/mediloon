"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../Common/Logo";
import { navItems } from "@/utils/constants"
import { ShoppingCart, UserRound } from "lucide-react";
import SearchBox from "../Common/SearchBox";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center md:flex-1">
                        <Link href="/" className="">
                            <Logo className={"font-bold text-gray-900"} />
                        </Link>
                    </div>

                    {/* Search Box - Center */}
                    <div className="hidden md:flex flex-1">
                        <SearchBox />
                    </div>

                    {/* Desktop-Navigation */}
                    <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1">
                        {/* {
                            navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))
                        } */}

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
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
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
                <div className="md:hidden bg-white">
                    {/* Mobile Search Box - Only visible when menu is open */}
                    <div className="px-4 py-3">
                        <SearchBox />
                    </div>

                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}