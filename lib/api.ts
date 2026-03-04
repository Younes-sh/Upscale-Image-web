import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اینترسپتور برای اضافه کردن توکن
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== Image API ==========
export const imageApi = {
  // آپلود و افزایش کیفیت
  upscale: async (file: File, upscaleFactor: number, enhancementType: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('upscaleFactor', upscaleFactor.toString());
    formData.append('enhancementType', enhancementType);

    // برای دیباگ
    console.log('Uploading file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const response = await api.post('/images/upscale', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // دریافت تاریخچه تصاویر
  getHistory: async (page = 1) => {
    const response = await api.get(`/images?page=${page}`);
    return response.data;
  },

  // حذف تصویر
  deleteImage: async (imageId: string) => {
    const response = await api.delete(`/images/${imageId}`);
    return response.data;
  },

  // دریافت آمار استفاده
  getUsageStats: async () => {
    const response = await api.get('/images/stats/usage');
    return response.data;
  },

  // دریافت لینک دانلود
  getDownloadUrl: async (imageId: string) => {
    const response = await api.post(`/images/${imageId}/download`);
    return response.data;
  },
};

// ========== Auth API ==========
export const authApi = {
  // ثبت‌نام
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  // ورود
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

   
  verifyEmail: async (email: string, code: string) => {
    const response = await api.post('/auth/verify-email', { email, code });
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email: string, code: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', { email, code, newPassword });
    return response.data;
  },

  changePasswordRequest: async () => {
    const response = await api.post('/auth/change-password-request');
    return response.data;
  },

  changePassword: async (code: string, newPassword: string) => {
    const response = await api.post('/auth/change-password', { code, newPassword });
    return response.data;
  },

  // دریافت اطلاعات کاربر فعلی
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // فراموشی رمز عبور (ارسال ایمیل بازیابی)
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // بازنشانی رمز عبور با توکن
  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  // تغییر رمز عبور (برای کاربران لاگین شده)
  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },

  // به‌روزرسانی پروفایل
  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // خروج از حساب
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // تمدید توکن
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },
};

// ========== Subscription API ==========
export const subscriptionApi = {
  // دریافت پلن‌های اشتراک
  getPlans: async () => {
    const response = await api.get('/subscription/plans');
    return response.data;
  },

  // ایجاد اشتراک جدید
  createSubscription: async (planId: string, paymentMethodId: string) => {
    const response = await api.post('/subscription/create', { planId, paymentMethodId });
    return response.data;
  },

  // لغو اشتراک
  cancelSubscription: async () => {
    const response = await api.post('/subscription/cancel');
    return response.data;
  },

  // دریافت وضعیت اشتراک
  getSubscriptionStatus: async () => {
    const response = await api.get('/subscription/status');
    return response.data;
  },

  // ارتقا پلن
  upgradePlan: async (newPlanId: string) => {
    const response = await api.post('/subscription/upgrade', { newPlanId });
    return response.data;
  },

  // دریافت فاکتورها
  getInvoices: async () => {
    const response = await api.get('/subscription/invoices');
    return response.data;
  },
};

// export پیش‌فرض برای استفاده در موارد خاص
export default api;