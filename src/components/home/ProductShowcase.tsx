"use client";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react"; // Optional icon for the empty state

export function ProductShowcase({ title, category }: { title: string; category?: string }) {
  const { data: products, isLoading, isError } = useProducts(category);

  if (isError) return null;

  // 1. Define the Empty State
  const isEmpty = !isLoading && (!products || products.length === 0);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-800">{title}</h2>
        {!isEmpty && (
          <button className="text-[#006044] text-xs font-bold border-b-2 border-[#006044]">
            VIEW ALL
          </button>
        )}
      </div>

      {/* 2. Proper No Data Message */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-700">No products found</h3>
          <p className="text-gray-500 text-sm text-center max-w-xs mt-2">
            We couldn't find any products in {category ? `the "${category}" category` : "this section"} right now.
          </p>
          <button 
             onClick={() => window.location.reload()}
             className="mt-6 px-6 py-2 bg-[#006044] text-white text-sm font-bold rounded-full hover:bg-[#004d36] transition-colors"
          >
            REFRESH CATALOG
          </button>
        </div>
      ) : (
        /* 3. Loading and Product Grid */
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
      )}
    </section>
  );
}