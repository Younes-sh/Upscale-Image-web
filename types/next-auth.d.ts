import 'next-auth';

declare module 'next-auth' {
  interface Session {
    backendToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      freeUsesRemaining: number;
      subscription: {
        type: 'free' | 'monthly' | 'yearly';
      };
    };
  }

  interface Profile {
    email?: string;
    name?: string;
    sub?: string;
    id?: string;
  }
}