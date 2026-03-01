import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useProducts(categorySlug?: string) {
  console.log('Fetching products for category:', categorySlug);
  return useQuery({
    queryKey: ['store-catalog', 'flower-fairy-dehradun', categorySlug],
    queryFn: async () => {
      // Calls your ProductsService.getStoreCatalog backend method
      const data: any = await apiClient.get('/products/catalog/flower-fairy-dehradun');
      
      if (categorySlug) {
        return data.products.filter((p: any) => p.category.slug === categorySlug);
      }
      return data.products;
    },
    staleTime: 1000 * 60 * 10, // Cache on client for 10 minutes
  });
}