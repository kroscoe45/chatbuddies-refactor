// src/types/api.types.ts
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

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface UploadProgressHandler {
  (percentage: number): void;
}

// API service method types
export interface ApiService {
  get<T>(url: string, params?: any, config?: any): Promise<T>;

  post<T>(url: string, data?: any, config?: any): Promise<T>;

  put<T>(url: string, data?: any, config?: any): Promise<T>;

  patch<T>(url: string, data?: any, config?: any): Promise<T>;

  delete<T>(url: string, config?: any): Promise<T>;

  upload<T>(url: string, formData: FormData, onProgress?: UploadProgressHandler): Promise<T>;
}