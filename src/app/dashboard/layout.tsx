'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  User,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Applied Jobs',
    href: '/dashboard/applied',
    icon: Briefcase,
  },
  {
    label: 'Saved Jobs',
    href: '/dashboard/saved',
    icon: Bookmark,
  },
  {
    label: 'My Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Resume Builder',
    href: '/dashboard/resume',
    icon: FileText,
  },
  {
    label: 'Interview Prep',
    href: '/dashboard/interview-prep',
    icon: GraduationCap,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={cn('flex h-full flex-col bg-white', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">JobHunt Pro</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium">{user?.name || 'User'}</p>
            <p className="truncate text-sm text-muted-foreground">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
        {/* Profile Completion */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profile Completion</span>
            <span className="font-medium">{user?.profileCompletion || 0}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${user?.profileCompletion || 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
              {link.label === 'Applied Jobs' && user?.appliedJobs && user.appliedJobs.length > 0 && (
                <Badge
                  variant={isActive ? 'secondary' : 'default'}
                  className="ml-auto"
                >
                  {user.appliedJobs.length}
                </Badge>
              )}
              {link.label === 'Saved Jobs' && user?.savedJobs && user.savedJobs.length > 0 && (
                <Badge
                  variant={isActive ? 'secondary' : 'default'}
                  className="ml-auto"
                >
                  {user.savedJobs.length}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Get current page title
  const currentPage = sidebarLinks.find((link) => link.href === pathname);
  const pageTitle = currentPage?.label || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 lg:px-8">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            {pathname !== '/dashboard' && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{pageTitle}</span>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
