"use client";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/ProductCard"; // Using your uploaded ProductCard
import { Skeleton } from "@/components/ui/skeleton";

export function ProductShowcase({ title, category }: { title: string; category?: string }) {
  const { data: products, isLoading, isError } = useProducts(category);

  if (isError) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-800">{title}</h2>
        <button className="text-[#006044] text-xs font-bold border-b-2 border-[#006044]">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : (
          products?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}