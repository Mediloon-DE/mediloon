'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { X, MessageSquarePlus } from 'lucide-react';


interface ChatTriggerProps {

    onOpenChat: () => void;
}

export function ChatTrigger({ onOpenChat }: ChatTriggerProps) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);


    useEffect(() => {

        if (hasBeenDismissed) {
            return;
        }

        const showTimer = setTimeout(() => {
            setIsPopupVisible(true);
        }, 2000);


        return () => clearTimeout(showTimer);
    }, [hasBeenDismissed]);


    useEffect(() => {
        if (isPopupVisible) {

            const hideTimer = setTimeout(() => {
                setIsPopupVisible(false);
            }, 10000);

            return () => clearTimeout(hideTimer);
        }
    }, [isPopupVisible]);

    const handleDismissPopup = () => {
        setIsPopupVisible(false);
        setHasBeenDismissed(true);
    };

    const handleOpenChatClick = () => {

        setIsPopupVisible(false);
        onOpenChat();
    }

    return (
        <div className="relative flex items-center justify-center">


            <AnimatePresence>
                {isPopupVisible && (
                    <motion.div

                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}

                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}

                        className="absolute bottom-full right-0 mb-4 w-72 max-w-xs rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >

                        <div className="flex items-center gap-3 bg-primary p-3">
                            <MessageSquarePlus className="h-6 w-6 text-white" />
                            <p className="text-lg font-semibold text-white">Haben Sie eine Frage?</p>

                            <button
                                onClick={handleDismissPopup}
                                className="absolute top-2 right-2 rounded-full p-1 text-white/70 hover:bg-white/20 hover:text-white/100"
                                aria-label="Nachricht schließen"
                            >
                                <X size={18} />
                            </button>
                        </div>


                        <div className="p-3">
                            <p className="text-base text-gray-600">Klicken Sie hier, um zu chatten.</p>
                        </div>


                        <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 transform bg-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
