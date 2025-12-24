'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bell,
  BellOff,
  Briefcase,
  MessageSquare,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Trash2,
  CheckCheck,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notifications, getUnreadCount } from '@/data/notifications';
import { formatDistanceToNow } from '@/lib/utils';
import { toast } from 'sonner';
import { Notification } from '@/types';

const typeIcons: Record<Notification['type'], React.ElementType> = {
  application: Briefcase,
  job: AlertCircle,
  message: MessageSquare,
  system: Settings,
};

const typeColors: Record<Notification['type'], string> = {
  application: 'bg-blue-100 text-blue-600',
  job: 'bg-green-100 text-green-600',
  message: 'bg-purple-100 text-purple-600',
  system: 'bg-slate-100 text-slate-600',
};

const typeLabels: Record<Notification['type'], string> = {
  application: 'Application',
  job: 'Job Alert',
  message: 'Message',
  system: 'System',
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | Notification['type']>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications = useMemo(() => {
    let result = [...notificationList];

    if (filter !== 'all') {
      result = result.filter((n) => n.type === filter);
    }

    if (readFilter === 'unread') {
      result = result.filter((n) => !n.read);
    } else if (readFilter === 'read') {
      result = result.filter((n) => n.read);
    }

    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [notificationList, filter, readFilter]);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const stats = {
    total: notificationList.length,
    unread: unreadCount,
    application: notificationList.filter((n) => n.type === 'application').length,
    job: notificationList.filter((n) => n.type === 'job').length,
    message: notificationList.filter((n) => n.type === 'message').length,
    system: notificationList.filter((n) => n.type === 'system').length,
  };

  const handleMarkAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success('Marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    setNotificationList([]);
    toast.success('All notifications cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'You\'re all caught up!'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card
          className={`cursor-pointer transition-colors ${filter === 'all' ? 'border-primary' : ''}`}
          onClick={() => setFilter('all')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Bell className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">All</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${filter === 'application' ? 'border-blue-500' : ''}`}
          onClick={() => setFilter('application')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.application}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${filter === 'job' ? 'border-green-500' : ''}`}
          onClick={() => setFilter('job')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <AlertCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.job}</p>
                <p className="text-sm text-muted-foreground">Job Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${filter === 'message' ? 'border-purple-500' : ''}`}
          onClick={() => setFilter('message')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.message}</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${filter === 'system' ? 'border-slate-500' : ''}`}
          onClick={() => setFilter('system')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Settings className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.system}</p>
                <p className="text-sm text-muted-foreground">System</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs value={readFilter} onValueChange={(v) => setReadFilter(v as typeof readFilter)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground">
              Showing {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BellOff className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No notifications</h3>
              <p className="text-center text-muted-foreground">
                {readFilter === 'unread'
                  ? 'You\'ve read all your notifications'
                  : 'You don\'t have any notifications yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 transition-colors hover:bg-slate-50 ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        typeColors[notification.type]
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-medium ${
                                !notification.read ? 'font-semibold' : ''
                              }`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="shrink-0">
                            {typeLabels[notification.type]}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(notification.date))}
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={notification.link}>
                                View
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(notification.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clear All */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleClearAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Notifications
          </Button>
        </div>
      )}
    </div>
  );
}
