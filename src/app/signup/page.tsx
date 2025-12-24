'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  Briefcase,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const features = [
  'Access to thousands of job listings',
  'Build your professional profile',
  'Save and track job applications',
  'Create beautiful resumes',
  'Get personalized job recommendations',
  'Connect with top employers',
];

export default function SignUpPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await register(formData);

    if (result.success) {
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Failed to create account');
    }

    setIsLoading(false);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-gradient-to-br from-primary via-blue-600 to-violet-600 p-12">
        <div className="max-w-md text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Start Your Career Journey
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Create your free account and get access to thousands of job
            opportunities from top companies worldwide.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-4 w-4" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-white/10 p-6 backdrop-blur">
            <p className="mb-2 text-sm text-white/80">Trusted by professionals at</p>
            <div className="flex flex-wrap gap-4 text-lg font-semibold">
              <span>Google</span>
              <span>Microsoft</span>
              <span>Amazon</span>
              <span>Meta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">JobHunt Pro</span>
          </Link>

          <Card>
            <CardHeader className="text-center">
              <h1 className="text-2xl font-bold">Create Your Account</h1>
              <p className="text-muted-foreground">
                Join millions of job seekers today
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`pl-10 ${errors.firstName ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
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
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength.strength
                                ? passwordStrength.color
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeToTerms: checked as boolean,
                        }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <Separator className="my-6" />

              {/* Sign In Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
