import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Type definitions
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // CSRF token handling
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken && config.headers && config.method && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ErrorResponse>) => {
    // Handle auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API service implementation
const api = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, {params});
    return response.data.data;
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  patch: async <T>(url: string, data?: any): Promise<T> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url);
    return response.data.data;
  },

  upload: async <T>(
    url: string,
    formData: FormData,
    onProgress?: (percentage: number) => void
  ): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    });
    return response.data.data;
  }
};

export default api;