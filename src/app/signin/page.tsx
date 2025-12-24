'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Briefcase, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function SignInPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await login({ email, password, rememberMe });

    if (result.success) {
      toast.success('Welcome back!');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">JobHunt Pro</span>
          </Link>

          <Card>
            <CardHeader className="text-center">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to continue your job search
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <Separator className="my-6" />

              {/* Demo Account */}
              <div className="rounded-lg bg-slate-50 p-4 text-center text-sm">
                <p className="mb-2 font-medium">Demo Account</p>
                <p className="text-muted-foreground">
                  Create a new account to test the platform.
                </p>
              </div>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up for free
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-primary via-blue-600 to-violet-600 p-12">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Find Your Dream Job Today
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Join millions of professionals who have found their perfect career
            match through JobHunt Pro.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-white/80">Active Jobs</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-white/80">Companies</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">2M+</div>
              <div className="text-sm text-white/80">Job Seekers</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">500K+</div>
              <div className="text-sm text-white/80">Hires Made</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
