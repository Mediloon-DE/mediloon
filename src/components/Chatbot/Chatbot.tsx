"use client"

import { useState, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowRight, X } from 'lucide-react';
import { WelcomeScreen } from './WelcomeScreen';
import { ActiveChatScreen } from './ActiveChatScreen';
import { motion, AnimatePresence } from 'framer-motion';

import { type Translation, type StringTranslationKey } from '@/locales/translations';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import Image from 'next/image';
import { ChatTrigger } from './ChatTrigger';

const translations: { en: Translation; de: Translation } = { en, de };

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'de'>('de');
    const [isChatActive, setIsChatActive] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const interval = setInterval(() => {
                setIsAnimating(true);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

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
        <>
            {/* Transparent overlay backdrop */}
            {/* <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence> */}

            <div className="fixed bottom-2 right-1 sm:bottom-6 sm:right-4 md:right-6 z-50 flex flex-col items-end gap-2">
                {/* Chatbot window with slide-up animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200
                            }}
                            className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-10rem)] max-h-[650px] bg-gray-50 rounded-lg shadow-xl flex flex-col border-2 border-gray-300 overflow-hidden"
                        >
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

                            <div className="p-2 border-t border-gray-200 bg-gray-50 shrink-0">
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
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <ChatTrigger onOpenChat={() => setIsOpen(true)} />
                )}

                {/* Hover tooltip */}

                {isHovered && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="relative max-w-xs hidden lg:flex"
                    >
                        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="px-2 py-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    💊 Hallo! Ich bin Medi der Apotheker, der nie Feierabend macht.
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                )}


                {/* Chatbot toggle button */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative max-w-xs"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.button
                        onClick={handleButtonClick}
                        className="bg-primary rounded-full rounded-br-lg shadow-lg hover:bg-red-700 transition-colors cursor-pointer p-0.5"
                        aria-label={isOpen ? "Close chat" : "Open chat"}
                        animate={isAnimating ? {
                            x: [0, -1, 1, -1, 0],
                            y: isOpen ? [0, 0, 0, 0, 0] : [0, -2, 2, -2, 0],
                            rotate: isOpen ? [0, 0, 0, 0, 0] : [0, -5, 5, -5, 0],
                            transition: {
                                duration: 0.5,
                                repeat: isOpen ? 0 : 1,
                                repeatType: "mirror"
                            }
                        } : {}}
                        onAnimationComplete={() => {
                            setIsAnimating(false);
                            if (!isOpen) {
                                setTimeout(() => setIsAnimating(true), 5000);
                            }
                        }}
                    >
                        {isOpen ? (
                            <X className="h-8 w-8 text-white" />
                        ) : (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-[110px] lg:h-[110px] relative">
                                <Image
                                    src="/images/chatbot.gif"
                                    alt='avatar'
                                    className="rounded-full object-cover"
                                    fill
                                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 70px"
                                    priority
                                />
                            </div>
                        )}
                    </motion.button>
                </motion.div>
            </div>
        </>
    );
}