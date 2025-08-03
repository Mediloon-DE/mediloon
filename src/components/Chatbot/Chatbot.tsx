"use client"

import { useState, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowRight, MessageCircleMore, X } from 'lucide-react';
import { WelcomeScreen } from './WelcomeScreen';
import { ActiveChatScreen } from './ActiveChatScreen';

import { type Translation, type StringTranslationKey } from '@/locales/translations';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

const translations: { en: Translation; de: Translation } = { en, de };

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'de'>('de');
    const [isChatActive, setIsChatActive] = useState(false);


    const t = useCallback((key: StringTranslationKey): string => {

        if (language === 'en') {

            const value = en[key as keyof typeof en];
            return typeof value === 'string' ? value : value.join(', ');
        } else {

            const value = de[key as keyof typeof de];
            return typeof value === 'string' ? value : value.join(', ');
        }
    }, [language]);


    const suggestionList = translations[language].suggestions;

    const { messages, input, handleInputChange, handleSubmit, setMessages, append, status } = useChat({
        api: '/api/chat',
        body: { language: language },
    });

    const isLoading = status === 'submitted'
    const isDisabled = status === 'submitted' || status === 'streaming'
    useEffect(() => {
        if (messages.length > 0 && !isChatActive) {
            setIsChatActive(true);
        }
    }, [messages, isChatActive]);

    const handleNewChat = useCallback(() => {
        setMessages([]);
        setIsChatActive(false);
    }, [setMessages]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
        append({ role: 'user', content: suggestion });
    }, [append]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) handleSubmit(e);
    };

    return (
        <div className="fixed bottom-2 right-1 sm:bottom-6 sm:right-4 md:right-6 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-10rem)] max-h-[650px] bg-gray-50 rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden">
                    {!isChatActive ? (
                        <WelcomeScreen
                            language={language}
                            setLanguage={setLanguage}
                            onSuggestionClick={handleSuggestionClick}

                            t={t}
                            allSuggestions={suggestionList}
                        />
                    ) : (
                        <ActiveChatScreen
                            messages={messages}
                            isLoading={isLoading}
                            onNewChat={handleNewChat}
                            onClose={() => setIsOpen(false)}
                            t={t}
                        />
                    )}

                    <div className="p-2 border-t border-gray-200 bg-white shrink-0">
                        <form onSubmit={handleFormSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}

                                placeholder={t('inputPlaceholder')}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled={isDisabled}
                            />
                            <button
                                type="submit"
                                className="p-2 text-primary disabled:opacity-50"
                                disabled={isDisabled || !input.trim()}
                                aria-label="Send message"
                            >
                                <ArrowRight className='h-5 w-5' />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary/90 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-red-700 transition-colors cursor-pointer"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="h-6 w-6 sm:h-8 sm:w-8" /> : <MessageCircleMore className="h-6 w-6 sm:h-8 sm:w-8" />}
            </button>
        </div>
    );
}