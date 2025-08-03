'use client';

import { X } from 'lucide-react';
import ChatMessages from './ChatMessages';
import { type Message } from 'ai';
import { Button } from '@/components/ui/button';
import { type StringTranslationKey } from '@/locales/translations';

interface ActiveChatScreenProps {
    messages: Message[];
    isLoading: boolean;
    onNewChat: () => void;
    onClose: () => void;
    t: (key: StringTranslationKey) => string;
}

export function ActiveChatScreen({
    messages,
    isLoading,
    onNewChat,
    onClose,
    t,
}: ActiveChatScreenProps) {
    return (
        <>

            <div className="bg-primary/90 text-white p-3 sm:p-4 flex justify-between items-center shrink-0">
                <h3 className="font-semibold text-sm sm:text-base">{t('chatTitle')}</h3>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onNewChat}
                        // variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 cursor-pointer"
                    >
                        New Chat
                    </Button>
                    <button onClick={onClose} className="text-white hover:text-gray-200 cursor-pointer">
                        <X />
                    </button>
                </div>
            </div>


            <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
        </>
    );
}