"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/user.model";

export default function Footer({ user }: { user: IUser }) {
  const router = useRouter();
  const role = user?.role; // "user" | "admin" | "vendor"

  const isUser = role === "user" || !role; // Fallback to user if role is undefined
  const isAdmin = role === "admin";
  const isVendor = role === "vendor";
  const isAdminOrVendor = isAdmin || isVendor;

  return (
    <footer className="relative bg-neutral-950 text-neutral-400 border-t border-neutral-800/60 z-40 transition-colors duration-300">
      {/* Decorative Top Accent Line based on user role */}
      <div 
        className={`h-[2px] w-full bg-gradient-to-r transition-all duration-500 ${
          isAdmin 
            ? "from-blue-600 via-indigo-500 to-transparent" 
            : isVendor 
            ? "from-emerald-600 via-teal-500 to-transparent" 
            : "from-blue-500 via-purple-500 to-pink-500"
        }`} 
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* 1. BRAND SECTION */}
          <div className="md:col-span-4 space-y-4">
            <Link 
              href="/" 
              className="inline-block text-white text-2xl font-extrabold tracking-tight hover:opacity-90 transition"
            >
              Multi<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Cart</span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Smart, secure & scalable multi-vendor eCommerce platform built for high performance, ease of use, and enterprise growth.
            </p>
            
            {isAdminOrVendor && (
              <div className="pt-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${
                    isAdmin 
                      ? "bg-blue-950/40 text-blue-400 border-blue-800/50" 
                      : "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isAdmin ? "bg-blue-400" : "bg-emerald-400"}`} />
                  {isAdmin ? "Admin Console" : "Vendor Hub"}
                </span>
              </div>
            )}
          </div>

          {/* 2. DYNAMIC CONTENT SECTION (Changes based on roles) */}
          {isUser ? (
            <>
              {/* Quick Links */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-200">Explore</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
                  <li><Link href="/category" className="hover:text-white transition-colors duration-200">Categories</Link></li>
                  <li><Link href="/shop" className="hover:text-white transition-colors duration-200">Shop Products</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
                </ul>
              </div>

              {/* Help & Support */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-200">Support</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/support" className="hover:text-white transition-colors duration-200">Help Center</Link></li>
                  <li><Link href="/orders" className="hover:text-white transition-colors duration-200">Track Order</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors duration-200">Privacy & Terms</Link></li>
                </ul>
              </div>
            </>
          ) : (
            /* Admin / Vendor Metrics Overview Card */
            <div className="md:col-span-4">
              <div className={`p-5 rounded-xl border bg-neutral-900/40 backdrop-blur-sm ${
                isAdmin ? "border-blue-900/30 shadow-blue-950/10" : "border-emerald-900/30 shadow-emerald-950/10"
              } shadow-lg`}>
                <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                  <span>{isAdmin ? "System Overview" : "Merchant Scope"}</span>
                </h3>
                <ul className="space-y-2 text-xs text-neutral-400">
                  {isAdmin ? (
                    <>
                      <li className="flex items-center gap-2">─ Platform Management</li>
                      <li className="flex items-center gap-2">─ Vendor Control & Approvals</li>
                      <li className="flex items-center gap-2">─ System Security & Audits</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">─ Catalog & Inventory Operations</li>
                      <li className="flex items-center gap-2">─ Order & Fulfillment Pipelines</li>
                      <li className="flex items-center gap-2">─ Wallet Settlements & Payouts</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* 3. CONTACT INFO SECTION */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-200">Get in touch</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="text-neutral-500">Email:</span>
                <a href="mailto:pattanabiswajit07@gmail.com" className="hover:text-white transition-colors">
                  pattanabiswajit07@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neutral-500">Phone:</span>
                <a href="tel:+918658846620" className="hover:text-white transition-colors">
                  +91 8658846620
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neutral-500">Location:</span>
                <span>Khordha, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} MultiCart. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-neutral-600">
            <span>Powered by</span>
            <span className="font-medium text-neutral-400">Secure Commerce Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
