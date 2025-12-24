'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  Send,
  MoreVertical,
  Trash2,
  Archive,
  Star,
  CheckCheck,
  Circle,
  Filter,
  Plus,
  Building2,
  Clock,
  Mail,
  MailOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { conversations, getUnreadCount } from '@/data/messages';
import { formatDistanceToNow } from '@/lib/utils';
import { toast } from 'sonner';

export default function MessagesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', content: '' });

  const filteredConversations = useMemo(() => {
    let result = [...conversations];

    // Search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (conv) =>
          conv.participantName.toLowerCase().includes(lowerSearch) ||
          conv.participantCompany.toLowerCase().includes(lowerSearch) ||
          conv.lastMessage.toLowerCase().includes(lowerSearch)
      );
    }

    // Status filter
    if (filter === 'unread') {
      result = result.filter((conv) => conv.unreadCount > 0);
    } else if (filter === 'read') {
      result = result.filter((conv) => conv.unreadCount === 0);
    }

    // Sort by most recent
    result.sort(
      (a, b) =>
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    return result;
  }, [search, filter]);

  const unreadCount = getUnreadCount();

  const handleSelectAll = () => {
    if (selectedConversations.length === filteredConversations.length) {
      setSelectedConversations([]);
    } else {
      setSelectedConversations(filteredConversations.map((c) => c.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedConversations((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleMarkAsRead = () => {
    toast.success(`Marked ${selectedConversations.length} conversations as read`);
    setSelectedConversations([]);
  };

  const handleDelete = () => {
    toast.success(`Deleted ${selectedConversations.length} conversations`);
    setSelectedConversations([]);
  };

  const handleSendMessage = () => {
    if (!newMessage.to || !newMessage.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully!');
    setComposeOpen(false);
    setNewMessage({ to: '', subject: '', content: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </div>
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Compose
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>
                Send a message to a recruiter or company
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Recruiter name or email"
                  value={newMessage.to}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, to: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input
                  id="subject"
                  placeholder="Message subject"
                  value={newMessage.subject}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, subject: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  placeholder="Write your message..."
                  rows={5}
                  value={newMessage.content}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, content: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setComposeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{conversations.length}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Mail className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <MailOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {conversations.length - unreadCount}
                </p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Set(conversations.map((c) => c.participantCompany)).size}
                </p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedConversations.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedConversations.length} selected
                </span>
                <Button variant="outline" size="sm" onClick={handleMarkAsRead}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Mark as Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardContent className="p-0">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No messages found</h3>
              <p className="text-center text-muted-foreground">
                {search || filter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : "You don't have any messages yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {/* Select All Header */}
              <div className="flex items-center gap-4 border-b bg-slate-50 px-4 py-2">
                <input
                  type="checkbox"
                  checked={
                    selectedConversations.length === filteredConversations.length &&
                    filteredConversations.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-muted-foreground">
                  {filteredConversations.length} conversation
                  {filteredConversations.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Conversation List */}
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-start gap-4 p-4 transition-colors hover:bg-slate-50 ${
                    conversation.unreadCount > 0 ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedConversations.includes(conversation.id)}
                    onChange={() => handleSelect(conversation.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <Link
                    href={`/dashboard/messages/${conversation.id}`}
                    className="flex flex-1 items-start gap-4"
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback>
                          {conversation.participantName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className={`font-medium ${
                              conversation.unreadCount > 0 ? 'font-semibold' : ''
                            }`}
                          >
                            {conversation.participantName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {conversation.participantRole} at{' '}
                            {conversation.participantCompany}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(conversation.lastMessageTime))}
                        </div>
                      </div>
                      <p
                        className={`mt-1 truncate text-sm ${
                          conversation.unreadCount > 0
                            ? 'font-medium text-slate-900'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Mark as {conversation.unreadCount > 0 ? 'Read' : 'Unread'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Star Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Messaging Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="mb-1 font-medium">Respond Promptly</h4>
              <p className="text-sm text-muted-foreground">
                Reply within 24 hours to show your interest and professionalism.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="mb-1 font-medium">Be Professional</h4>
              <p className="text-sm text-muted-foreground">
                Use proper grammar and maintain a professional tone in all messages.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Send className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="mb-1 font-medium">Follow Up</h4>
              <p className="text-sm text-muted-foreground">
                Don't hesitate to follow up if you haven't heard back in a week.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
