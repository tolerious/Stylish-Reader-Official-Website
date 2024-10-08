// src/axios.ts
import router from '@/router';
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 替换为你的API基础URL
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` };
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 401) {
      router.push('/login');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装常用的请求方法
export const httpRequest = {
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return instance.get<T>(url, { params, ...config });
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return instance.post<T>(url, data, { ...config });
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return instance.put<T>(url, data, { ...config });
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return instance.delete<T>(url, { ...config });
  }
};
