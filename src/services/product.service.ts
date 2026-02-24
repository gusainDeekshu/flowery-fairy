//src/services/product.service.ts
import { apiClient } from '@/lib/api-client';

// Typing based on your Prisma Schema
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  variants?: {
    id: string;
    name: string;
    priceModifier: number;
  }[];
}

export const ProductApi = {
  // Fetch products, optionally filtered by category slug
  getProducts: async (category?: string): Promise<Product[]> => {
    return apiClient.get('/products', { params: { category } });
  },
  
  // Fetch a single product by slug for the details page
  getProductBySlug: async (slug: string): Promise<Product> => {
    return apiClient.get(`/products/${slug}`);
  }
};