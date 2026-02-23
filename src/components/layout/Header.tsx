"use client";

import { useState } from "react";
import { 
  Search, ShoppingCart, MapPin, ChevronDown, 
  User, Phone, Mail, Home, LayoutGrid, 
  Gift, MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/config/brand.config";

export function Header() {
  return (
    <>
      <header className="w-full bg-white shadow-sm border-border sticky top-0 z-50">
        {/* 1. Top Utility Bar (Hidden on small mobile) */}
        <div className="bg-primary text-white py-2 px-4 md:px-12 flex justify-between items-center text-[10px] sm:text-sm">
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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg">
                🌸
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                Flower Fairy
              </span>
            </Link>

            {/* Mobile Search/Cart (Optional shortcuts for top bar) */}
            <div className="flex lg:hidden items-center gap-4">
               <User size={22} className="text-gray-600" />
               <div className="relative">
                  <ShoppingCart size={22} className="text-gray-600" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
               </div>
            </div>
          </div>

          {/* Search & City Selector Wrapper */}
          <div className="flex flex-1 items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 border rounded-md px-3 py-2 bg-white text-gray-600 cursor-pointer shrink-0">
              <MapPin size={16} className="text-primary" />
              <span className="text-xs font-medium">Select City</span>
              <ChevronDown size={14} />
            </div>

            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for flowers, cakes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-accent focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions Only */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-800 font-medium">
              <User size={20} />
              <span>Sign In</span>
            </button>
            <button className="flex items-center gap-2 text-gray-800 font-medium relative">
              <ShoppingCart size={20} />
              <span>Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>

        {/* 3. Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <Link href="/flowers" className="hover:text-primary">Flowers</Link>
          <Link href="/cakes" className="hover:text-primary">Cakes</Link>
          <Link href="/gifts" className="hover:text-primary">Gifts</Link>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
        </nav>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe">
        <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-primary">
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

        <Link href="/account" className="flex flex-col items-center justify-center w-full h-full text-gray-500">
          <User size={20} />
          <span className="text-[10px] mt-1 font-medium">Account</span>
        </Link>
      </div>
    </>
  );
}