"use client"

import { ArrowRight, MessageCircleMore, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
        { text: "Hello! How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        
        const userMessage = { text: inputValue, sender: 'user' as const };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        
        setTimeout(() => {
            
            const botMessage = { text: '', sender: 'bot' as const };
            setMessages(prev => [...prev, botMessage]);

            const responseText = "Thanks for your message! I'm a demo bot.";

            let i = 0;
            const intervalId = setInterval(() => {
                if (i < responseText.length) {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = {
                            ...newMessages[newMessages.length - 1],
                            text: responseText.substring(0, i + 1)
                        };
                        return newMessages;
                    });
                    i++;
                } else {
                    clearInterval(intervalId);
                    setIsTyping(false);
                }
            }, 20);
        }, 1000);
    };

    return (
        <div className="fixed bottom-2 right-1 sm:bottom-6 sm:right-4 md:right-6 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-10rem)] max-h-[650px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden pb-2">
                    {/* Header */}
                    <div className="bg-primary/90 text-white p-3 sm:p-4 flex justify-between items-center">
                        <h3 className="font-semibold text-sm sm:text-base">Mediloon Chat Support</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <X />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                        <div className="space-y-2 sm:space-y-3">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] sm:max-w-xs p-2 sm:p-3 rounded-lg text-sm sm:text-base ${message.sender === 'user'
                                            ? 'bg-primary/90 text-white'
                                            : 'bg-gray-100 text-gray-800'}`}
                                    >
                                        {message.text}
                                        {index === messages.length - 1 && message.sender === 'bot' && isTyping && (
                                            <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-gray-500 align-middle"></span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSendMessage}
                                className=""
                                disabled={isTyping || inputValue.trim() === ''}
                            >
                                <ArrowRight className='text-sm sm:text-base text-primary' />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary/90 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-red-700 transition-colors"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="h-6 w-6 sm:h-8 sm:w-8" />
                ) : (
                    <MessageCircleMore className="h-6 w-6 sm:h-8 sm:w-8" />
                )}
            </button>
        </div>
    );
}