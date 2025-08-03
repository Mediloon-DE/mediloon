'use client';

import { useEffect, useState } from 'react';
import { HeartPulse } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

import { type StringTranslationKey } from '@/locales/translations';

interface WelcomeScreenProps {
    language: 'en' | 'de';
    setLanguage: (lang: 'en' | 'de') => void;
    onSuggestionClick: (suggestion: string) => void;

    t: (key: StringTranslationKey) => string;
    allSuggestions: string[];
}

export function WelcomeScreen({
    language,
    setLanguage,
    onSuggestionClick,
    t,
    allSuggestions,
}: WelcomeScreenProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 4));
    }, [allSuggestions]);

    return (

        <div className="flex h-full flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="absolute top-4 right-4">
                <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <HeartPulse className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('welcomeTitle')}</h2>
            <p className="mt-1 text-gray-500">{t('welcomeMessage')}</p>

            {suggestions.length > 0 && (
                <div className="mt-8 w-full max-w-md px-4">
                    <p className="text-sm text-gray-500">{t('suggestionsTitle')}</p>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 ">
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => onSuggestionClick(suggestion)}
                                className="rounded-lg border bg-white p-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 break-words cursor-pointer"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}