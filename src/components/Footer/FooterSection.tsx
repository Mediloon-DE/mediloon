"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FooterLink {
    text: string;
    href: string;
}

interface FooterSectionProps {
    title: string;
    links: FooterLink[];
}

export const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex flex-col items-start mt-5 w-full md:w-auto">
            <button
                className="flex items-center justify-between w-full md:w-auto font-bold text-zinc-900 md:pointer-events-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`footer-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
                {title}
                <span className="md:hidden text-primary">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
            </button>
            <ul
                id={`footer-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`mt-4 space-y-2 ${isOpen ? 'block' : 'hidden'} md:block`}
            >
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.href}
                            className="text-sm tracking-normal text-zinc-700 hover:text-primary transition-colors"
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};