import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, MoreHorizontal, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    time: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'agent',
            content: 'Hi there! 👋 How can I help you today?',
            time: 'Just now',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            time: 'Just now',
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate response
        setTimeout(() => {
            const response: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: "Thanks for your message! Our support team will get back to you shortly. In the meantime, check out our documentation for quick answers.",
                time: 'Just now',
            };
            setMessages((prev) => [...prev, response]);
        }, 1000);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 shadow-2xl"
                    >
                        <Card className="border-primary/20 overflow-hidden">
                            <CardHeader className="bg-primary/5 p-4 flex flex-row items-center justify-between space-y-0 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="h-2 w-2 rounded-full bg-success absolute bottom-0 right-0 ring-2 ring-background" />
                                        <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                                            <MessageCircle className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-bold">Support Team</CardTitle>
                                        <p className="text-xs text-muted-foreground">Typically replies in 5m</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-80 p-4">
                                    <div className="space-y-4" ref={scrollRef}>
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${message.role === 'user'
                                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                                            : 'bg-muted rounded-bl-none'
                                                        }`}
                                                >
                                                    {message.content}
                                                    <p className={`text-[10px] mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                                        }`}>
                                                        {message.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSend();
                                        }}
                                        className="flex gap-2"
                                    >
                                        <Button type="button" variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                                            <Paperclip className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            placeholder="Type a message..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="bg-transparent border-none focus-visible:ring-0 px-0"
                                        />
                                        <Button type="submit" size="icon" variant="ghost" className="shrink-0 text-primary" disabled={!inputValue.trim()}>
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow-primary flex items-center justify-center hover:opacity-90 transition-opacity"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.button>
        </>
    );
}
