export interface User {
  _id: string;
  name: string;
  email: string;
  freeUsesRemaining: number;
  subscription: {
    type: 'free' | 'monthly' | 'yearly';
    startDate?: Date;
    endDate?: Date;
    cancelAtPeriodEnd?: boolean;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  _id: string;
  userId: string;
  publicId: string;
  originalUrl: string;
  upscaledUrl: string;
  format: string;
  metadata: {
    originalSize: number;
    upscaledSize: number;
    dimensions: {
      width: number;
      height: number;
    };
    upscaledDimensions?: {
      width: number;
      height: number;
    };
    upscaleFactor: number;
    enhancementType: string;
    processingTime: number;
  };
  createdAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  images: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UsageStats {
  totalImages: number;
  imagesToday: number;
  imagesThisMonth: number;
  totalStorageUsed: number;
  freeUsesRemaining: number;
  subscription: User['subscription'];
}