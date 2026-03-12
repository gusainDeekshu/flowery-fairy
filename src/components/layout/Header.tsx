"use client";

import { useState } from "react";
import { 
  Search, ShoppingCart, MapPin, ChevronDown, 
  User, Phone, Mail, Home, LayoutGrid, 
  Gift, MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/config/brand.config";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpModal } from "@/components/auth/OtpModal";

export function Header() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  
  // Zustand State
  const cartItems = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  
  // Calculate total items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="w-full bg-white shadow-sm border-border sticky top-0 z-50">
        {/* 1. Top Utility Bar */}
        <div className="bg-[#006044] text-white py-2 px-4 md:px-12 flex justify-between items-center text-[10px] sm:text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="fill-current" />
              <span className="hidden xs:inline">{BRAND.contact}</span>
            </div>
            <div className="flex items-center gap-1.5 hidden md:flex">
              <Mail size={14} />
              <span>{BRAND.mail}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/track" className="hover:underline">Track Order</Link>
            <span className="opacity-50">|</span>
            <Link href="/customer-care" className="hover:underline">Customer Care</Link>
          </div>
        </div>

        {/* 2. Main Search Bar Section */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between px-4 md:px-12 py-3 lg:py-4 gap-3">
          <div className="flex items-center justify-between lg:justify-start gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#006044] rounded-full flex items-center justify-center text-white text-lg">
                🌸
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                Flower Fairy
              </span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-4">
               <button onClick={() => !user && setLoginModalOpen(true)}>
                  <User size={22} className={user ? "text-[#006044]" : "text-gray-600"} />
               </button>
               <Link href="/cart" className="relative">
                  <ShoppingCart size={22} className="text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {cartCount}
                    </span>
                  )}
               </Link>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 border rounded-md px-3 py-2 bg-white text-gray-600 cursor-pointer shrink-0">
              <MapPin size={16} className="text-[#006044]" />
              <span className="text-xs font-medium">Select City</span>
              <ChevronDown size={14} />
            </div>

            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for flowers, cakes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => !user && setLoginModalOpen(true)}
              className="flex items-center gap-2 text-gray-800 font-medium hover:text-[#006044] transition-colors"
            >
              <User size={20} />
              <span>{user ? user.name : "Sign In"}</span>
            </button>
            <Link href="/cart" className="flex items-center gap-2 text-gray-800 font-medium relative hover:text-[#006044] transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* 3. Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-[#006044]">Home</Link>
          <Link href="/shop" className="hover:text-[#006044]">Shop</Link>
          <Link href="/flowers" className="hover:text-[#006044]">Flowers</Link>
          <Link href="/cakes" className="hover:text-[#006044]">Cakes</Link>
          <Link href="/gifts" className="hover:text-[#006044]">Gifts</Link>
          <Link href="/blog" className="hover:text-[#006044]">Blog</Link>
        </nav>
      </header>

      {/* Auth Modal Integration */}
      <OtpModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onSuccess={() => setLoginModalOpen(false)} 
      />

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe">
        <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-[#006044]">
          <Home size={20} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center w-full h-full text-gray-500">
          <LayoutGrid size={20} />
          <span className="text-[10px] mt-1 font-medium">Categories</span>
        </Link>
        <Link href="/occasions" className="flex flex-col items-center justify-center w-full h-full text-gray-500">
          <Gift size={20} />
          <span className="text-[10px] mt-1 font-medium">Gifts</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center justify-center w-full h-full text-gray-500">
          <MessageSquare size={20} />
          <span className="text-[10px] mt-1 font-medium">Support</span>
        </Link>
        <button 
          onClick={() => !user ? setLoginModalOpen(true) : window.location.href='/account'}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500"
        >
          <User size={20} />
          <span className="text-[10px] mt-1 font-medium">{user ? "Account" : "Login"}</span>
        </button>
      </div>
    </>
  );
}