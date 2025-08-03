import { type Message } from 'ai';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo, useEffect, useRef } from 'react';
import { MarkdownContent } from '@/components/ui/markdown-content';


function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1.5 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
        </div>
    );
}


interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    return (
        <div className="space-y-4">
            {messages.map((m, index) => (
                <div key={m.id || `message-${index}`} className="flex items-end gap-2">
                    {m.role === 'assistant' && (
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary/10 text-primary">
                            <Bot className="h-5 w-5" />
                        </div>
                    )}

                    <div
                        className={cn(
                            'max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
                            m.role === 'user'
                                ? 'ml-auto bg-primary text-primary-foreground'
                                : 'bg-white text-gray-800 border'
                        )}
                    >
                        <div className="prose prose-sm max-w-none text-inherit prose-p:text-inherit">

                            <MarkdownContent id={m.id} content={m.content} />
                        </div>
                    </div>

                    {m.role === 'user' && (
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-gray-100 text-gray-600">
                            <User className="h-5 w-5" />
                        </div>
                    )}
                </div>
            ))}

            {isLoading && (
                <div className="flex items-end gap-2">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary/10 text-primary">
                        <Bot className="h-5 w-5" />
                    </div>
                    <TypingIndicator />
                </div>
            )}


            <div ref={scrollRef} />
        </div>
    );
};

export default memo(ChatMessages);

