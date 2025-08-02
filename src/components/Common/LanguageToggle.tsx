'use client';

import { Languages } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
    language: 'en' | 'de';
    setLanguage: (lang: 'en' | 'de') => void;
}

export function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 focus-visible:ring-offset-0 focus-visible:ring-white">
                    <Languages className="h-5 w-5" />
                    <span className="ml-2 font-semibold uppercase">{language}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className="cursor-pointer text-gray-800"
                >
                    <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage('de')}
                    className="cursor-pointer text-gray-800"
                >
                    <span>Deutsch</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}