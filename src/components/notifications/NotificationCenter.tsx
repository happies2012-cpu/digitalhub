import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning';
    read: boolean;
    time: string;
}

const initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'Campaign "Summer Sale" Approved',
        description: 'Your ad campaign has been reviewed and is now live.',
        type: 'success',
        read: false,
        time: '5 min ago',
    },
    {
        id: '2',
        title: 'Budget Threshold Reached',
        description: 'Campaign "Q4 Awareness" has used 80% of its budget.',
        type: 'warning',
        read: false,
        time: '1 hour ago',
    },
    {
        id: '3',
        title: 'New Feature Available',
        description: 'Check out the new AI-powered analytics dashboard.',
        type: 'info',
        read: true,
        time: '2 hours ago',
    },
];

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <Check className="h-4 w-4 text-success" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4 text-warning" />;
            default:
                return <Info className="h-4 w-4 text-info" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center animate-in zoom-in">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between pb-2">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto px-2 text-primary hover:text-primary/80"
                            onClick={markAllAsRead}
                        >
                            Mark all read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No notifications
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 p-1">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "relative flex gap-3 p-3 rounded-md transition-colors hover:bg-muted/50 group",
                                        !notification.read && "bg-muted/20"
                                    )}
                                >
                                    <div className={cn(
                                        "mt-1 h-2 w-2 rounded-full shrink-0",
                                        !notification.read ? "bg-primary" : "bg-transparent"
                                    )} />
                                    <div className="flex-1 space-y-1">
                                        <p className={cn("text-sm font-medium leading-none", !notification.read && "font-semibold")}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.description}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground pt-1">
                                            {notification.time}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notification.id);
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
