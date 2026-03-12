// src/components/product/AddToCartButton.tsx
'use client';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AddToCartButton({ product, variantId }: any) {
  const addItem = useCartStore((state) => state.addItem);

  const handlePress = (e: React.MouseEvent) => {
    // Prevent navigating to the product page if this button is inside a Link
    e.preventDefault();
    e.stopPropagation();

    const item: CartItem = {
      productId: product.id,
      variantId: variantId || undefined,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    addItem(item);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Button 
      onClick={handlePress} 
      className="w-full bg-[#006044] hover:bg-[#004d3d] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
    >
      Add to Cart
    </Button>
  );
}