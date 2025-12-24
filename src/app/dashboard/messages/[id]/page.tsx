'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  CheckCheck,
  Check,
  Trash2,
  Archive,
  Star,
  Flag,
  Building2,
  Mail,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getConversationById } from '@/data/messages';
import { formatDistanceToNow, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Message } from '@/types';

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const conversation = getConversationById(params.id as string);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="mb-2 text-xl font-semibold">Conversation not found</h2>
        <p className="mb-4 text-muted-foreground">
          This conversation may have been deleted or doesn't exist.
        </p>
        <Button asChild>
          <Link href="/dashboard/messages">Back to Messages</Link>
        </Button>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setIsSending(true);

    const message: Message = {
      id: `msg-new-${Date.now()}`,
      senderId: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
      setIsSending(false);
      toast.success('Message sent!');

      // Simulate recruiter reply
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg-reply-${Date.now()}`,
          senderId: conversation.participantId,
          content: 'Thanks for your message! I\'ll get back to you shortly.',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setMessages((prev) => [...prev, replyMessage]);
      }, 3000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    msgs.forEach((msg) => {
      const date = new Date(msg.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/messages">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.participantAvatar} />
            <AvatarFallback>
              {conversation.participantName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{conversation.participantName}</h2>
            <p className="text-sm text-muted-foreground">
              {conversation.participantRole} at {conversation.participantCompany}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Voice Call">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Video Call">
            <Video className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" title="Contact Info">
                <Info className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Contact Information</SheetTitle>
                <SheetDescription>
                  Details about {conversation.participantName}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={conversation.participantAvatar} />
                    <AvatarFallback className="text-2xl">
                      {conversation.participantName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">
                    {conversation.participantName}
                  </h3>
                  <p className="text-muted-foreground">
                    {conversation.participantRole}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {conversation.participantCompany}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <Building2 className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{conversation.participantCompany}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <Mail className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">
                        {conversation.participantName
                          .toLowerCase()
                          .replace(' ', '.')}
                        @{conversation.participantCompany
                          .toLowerCase()
                          .replace(/\s+/g, '')}.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <Calendar className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">First Contact</p>
                      <p className="font-medium">
                        {formatDate(messages[0]?.timestamp || new Date().toISOString())}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Star className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Star Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Company Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
        <div className="mx-auto max-w-3xl space-y-6">
          {Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">
                  {new Date(date).toDateString() === new Date().toDateString()
                    ? 'Today'
                    : new Date(date).toDateString() ===
                      new Date(Date.now() - 86400000).toDateString()
                    ? 'Yesterday'
                    : formatDate(date)}
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                {msgs.map((message) => {
                  const isUser = message.senderId === 'user';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex max-w-[80%] items-end gap-2 ${
                          isUser ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {!isUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={conversation.participantAvatar} />
                            <AvatarFallback className="text-xs">
                              {conversation.participantName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              isUser
                                ? 'bg-blue-600 text-white'
                                : 'bg-white shadow-sm'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>
                          <div
                            className={`mt-1 flex items-center gap-1 text-xs text-muted-foreground ${
                              isUser ? 'justify-end' : ''
                            }`}
                          >
                            <span>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {isUser && (
                              <span>
                                {message.read ? (
                                  <CheckCheck className="h-3 w-3 text-blue-500" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Button variant="ghost" size="icon" title="Attach File">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
              disabled={isSending}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              title="Add Emoji"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
