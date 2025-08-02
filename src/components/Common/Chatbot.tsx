"use client"

import { ArrowRight, MessageCircleMore, X } from 'lucide-react';
import { useEffect, useState, } from 'react';
import { useChat } from '@ai-sdk/react'
import ChatMessages from './ChatMessages'

import { LanguageToggle } from './LanguageToggle';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

const translations = { en, de };


export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const [language, setLanguage] = useState<'en' | 'de'>('de');
    const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

    const t = (key: keyof typeof en): any => {
        return translations[language][key] || key;
    };

    const { messages, input, handleInputChange, handleSubmit, status, setMessages, append } = useChat({
        api: '/api/chat',



        body: {
            language: language,
        },
        onFinish() {
            handleSuggetions();
        },

        onError: (err) => {
            console.error("Chat Error:", err);

        },


    })

    const isLoading = status === 'submitted';

    const isDisabled = status === 'streaming' || status === 'submitted';

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            handleSubmit(e);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const fakeEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
            if (input.trim()) {
                handleSubmit(fakeEvent);
            }
        }
    }

    const handleSuggetions = () => {

        if (messages.length <= 1) {
            const allSuggestions = t('suggestions');

            const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
            setCurrentSuggestions(shuffled.slice(0, 4));
        } else {
            setCurrentSuggestions([]);
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        append({
            role: 'user',
            content: suggestion,
        });
    };


    useEffect(() => {

        if (isOpen) {
            setMessages([{ id: 'initial-greet', role: 'assistant', content: t('welcomeMessage') }]);
            handleSuggetions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, isOpen]);


    return (
        <div className="fixed bottom-2 right-1 sm:bottom-6 sm:right-4 md:right-6 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-10rem)] max-h-[650px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden pb-2">

                    <div className="bg-primary/90 text-white p-3 sm:p-4 flex justify-between items-center">
                        <h3 className="font-semibold text-sm sm:text-base">{t('chatTitle')}</h3>
                        <div className="flex items-center gap-2">
                            <LanguageToggle language={language} setLanguage={setLanguage} />
                            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                                <X />
                            </button>
                        </div>
                    </div>


                    <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                        <ChatMessages messages={messages} isLoading={isLoading} />


                        {messages.length <= 1 && !isLoading && (
                            <div className="mt-4 animate-in fade-in duration-500">
                                <p className="text-xs text-center text-gray-500 mb-2">{t('suggestionsTitle')}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {currentSuggestions.map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-left text-sm p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="p-2 border-t border-gray-200">
                        <form onSubmit={handleFormSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                placeholder={t('inputPlaceholder')}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled={isDisabled}
                            />
                            <button
                                type="submit"
                                className="p-2 text-primary disabled:opacity-50"
                                disabled={isDisabled || !input.trim()}
                                aria-label="Send message"
                            >
                                <ArrowRight className='text-sm sm:text-base' />
                            </button>
                        </form>
                    </div>
                </div>
            )}


            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary/90 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-red-700 transition-colors"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="h-6 w-6 sm:h-8 sm:w-8" /> : <MessageCircleMore className="h-6 w-6 sm:h-8 sm:w-8" />}
            </button>
        </div>
    );
}
