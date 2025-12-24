'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginCredentials, RegisterData, Skill, Experience, Education, AppliedJob, SavedJob } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  applyToJob: (jobId: string) => { success: boolean; error?: string };
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  isJobApplied: (jobId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'jobhunt_user';
const USERS_KEY = 'jobhunt_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();

    if (users.some((u) => u.email === data.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      phone: '',
      location: '',
      title: '',
      bio: '',
      avatar: '',
      profileCompletion: 20,
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      languages: [],
      socialLinks: {},
      preferences: {
        jobAlerts: true,
        emailNotifications: true,
        profileVisibility: 'public',
        preferredJobTypes: [],
        preferredLocations: [],
      },
      appliedJobs: [],
      savedJobs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsers(users);
    }

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  }, [user]);

  const applyToJob = useCallback((jobId: string): { success: boolean; error?: string } => {
    if (!user) return { success: false, error: 'Please sign in to apply' };
    if (user.appliedJobs.some((app) => app.jobId === jobId)) {
      return { success: false, error: 'Already applied to this job' };
    }

    const newApplication: AppliedJob = {
      jobId,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    updateUser({
      appliedJobs: [...user.appliedJobs, newApplication],
    });
    return { success: true };
  }, [user, updateUser]);

  const saveJob = useCallback((jobId: string) => {
    if (!user) return;
    if (user.savedJobs.some((saved) => saved.jobId === jobId)) return;

    const newSavedJob: SavedJob = {
      jobId,
      savedAt: new Date().toISOString(),
    };

    updateUser({
      savedJobs: [...user.savedJobs, newSavedJob],
    });
  }, [user, updateUser]);

  const unsaveJob = useCallback((jobId: string) => {
    if (!user) return;

    updateUser({
      savedJobs: user.savedJobs.filter((saved) => saved.jobId !== jobId),
    });
  }, [user, updateUser]);

  const isJobSaved = useCallback((jobId: string): boolean => {
    return user?.savedJobs.some((saved) => saved.jobId === jobId) ?? false;
  }, [user]);

  const isJobApplied = useCallback((jobId: string): boolean => {
    return user?.appliedJobs.some((app) => app.jobId === jobId) ?? false;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        applyToJob,
        saveJob,
        unsaveJob,
        isJobSaved,
        isJobApplied,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
