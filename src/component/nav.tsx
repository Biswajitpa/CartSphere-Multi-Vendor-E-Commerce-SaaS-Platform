"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import { signOut } from "next-auth/react";
import mongoose from "mongoose";
import axios from "axios";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "vendor" | "admin";
  phone?: string;
  shopName?: string;
  businessAddress?: string;
  gstNumber?: string;
  isApproved?: boolean;
  verificationStatus?: "pending" | "approved" | "rejected";
  requestedAt?: Date;
  approvedAt?: Date;
  rejectedReason?: string;
  vendorProducts?: mongoose.Types.ObjectId[];
  orders?: mongoose.Types.ObjectId[];
  cart?: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Navbar({ user }: { user: IUser }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get("/api/cart/get");
      if (res.status === 200) {
        const cart = res.data?.cart || [];
        const totalQty = cart.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCartCount(totalQty);
      }
    } catch (err) {
      console.log("Navbar cart fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "user") {
      fetchCartCount();
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#profile-menu-wrapper")) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
          <span className="text-xl font-semibold hidden sm:inline">MultiCart</span>
        </div>

        {/* Desktop Nav Links — only for users */}
        {user.role === "user" && (
          <div className="hidden md:flex gap-8">
            <NavItem label="Home" path="/" router={router} />
            <NavItem label="Categories" path="/category" router={router} />
            <NavItem label="Shop" path="/shop" router={router} />
            <NavItem label="Orders" path="/orders" router={router} />
          </div>
        )}

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          {user?.role === "user" && (
            <IconBtn Icon={AiOutlineSearch} onClick={() => router.push("/category")} />
          )}

          <IconBtn Icon={AiOutlinePhone} onClick={() => router.push("/support")} />

          {/* Profile avatar / icon + dropdown */}
          <div className="relative" id="profile-menu-wrapper">
            {user?.image ? (
              <Image
                src={user.image}
                alt="user"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer"
                onClick={() => setOpenMenu((prev) => !prev)}
              />
            ) : (
              <IconBtn Icon={AiOutlineUser} onClick={() => setOpenMenu((prev) => !prev)} />
            )}
            <AnimatePresence>
              {openMenu && (
                <ProfileDropdown
                  router={router}
                  close={() => setOpenMenu(false)}
                  user={user}
                />
              )}
            </AnimatePresence>
          </div>

          {user?.role === "user" && <CartBtn router={router} count={cartCount} />}
        </div>

        {/* ── Mobile Icons ── */}
        <div className="md:hidden flex items-center gap-4">
          {user?.role === "admin" || user?.role === "vendor" ? (
            <>
              <IconBtn Icon={AiOutlinePhone} onClick={() => router.push("/support")} />

              {/* Profile for admin/vendor on mobile */}
              <div className="relative" id="profile-menu-wrapper">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700 cursor-pointer"
                    onClick={() => setOpenMenu((prev) => !prev)}
                  />
                ) : (
                  <IconBtn Icon={AiOutlineUser} onClick={() => setOpenMenu((prev) => !prev)} />
                )}
                <AnimatePresence>
                  {openMenu && (
                    <ProfileDropdown
                      router={router}
                      close={() => setOpenMenu(false)}
                      user={user}
                    />
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* Normal user on mobile */}
              <IconBtn Icon={AiOutlineSearch} onClick={() => router.push("/category")} />
              <IconBtn Icon={AiOutlinePhone} onClick={() => router.push("/support")} />
              <CartBtn router={router} count={cartCount} />
              <AiOutlineMenu
                size={28}
                className="cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* Sidebar (mobile, user only) */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            close={() => setSidebarOpen(false)}
            router={router}
            user={user}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────────────── Sub-components ─────────────────────── */

const NavItem = ({ label, path, router }: any) => (
  <button onClick={() => router.push(path)} className="hover:text-gray-300 transition">
    {label}
  </button>
);

const IconBtn = ({ Icon, onClick }: any) => (
  <motion.button whileHover={{ scale: 1.1 }} onClick={onClick}>
    <Icon size={24} />
  </motion.button>
);

const CartBtn = ({ router, count }: any) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    onClick={() => router.push("/cart")}
    className="relative"
  >
    <AiOutlineShoppingCart size={24} />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
        {count}
      </span>
    )}
  </motion.button>
);

/* 
  ✅ FIXED ProfileDropdown:
  - Added top-full so it appears below the icon, not overlapping content
  - "Sign In" only shown when user is NOT logged in
  - Solid dark background so it's readable on mobile
  - z-50 to stay above all content
*/
const ProfileDropdown = ({ router, close, user }: any) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.15 }}
    className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
  >
    {/* Profile — only if logged in */}
    {user && (
      <DropdownBtn
        Icon={AiOutlineUser}
        label="Profile"
        onClick={() => router.push("/profile")}
        close={close}
      />
    )}

    {/* Sign In — only if NOT logged in */}
    {!user && (
      <DropdownBtn
        Icon={AiOutlineLogin}
        label="Sign In"
        onClick={() => router.push("/login")}
        close={close}
      />
    )}

    {/* Sign Out — only if logged in */}
    {user && (
      <DropdownBtn
        Icon={AiOutlineLogout}
        label="Sign Out"
        onClick={signOut}
        close={close}
      />
    )}
  </motion.div>
);

const DropdownBtn = ({ Icon, label, onClick, close }: any) => (
  <button
    onClick={() => {
      onClick();
      close();
    }}
    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 text-left text-sm transition"
  >
    <Icon size={18} />
    {label}
  </button>
);

/* 
  ✅ FIXED Sidebar:
  - "Login" link only shown when user is NOT logged in
  - user prop passed in so we can conditionally render
*/
const Sidebar = ({ close, router, user }: any) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", stiffness: 200, damping: 24 }}
    className="fixed top-0 right-0 h-screen w-[65%] bg-black/95 backdrop-blur-lg p-6 text-white z-50"
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Menu</h2>
      <AiOutlineClose size={28} className="cursor-pointer" onClick={close} />
    </div>

    <div className="flex flex-col gap-3 text-lg">
      <SidebarLink Icon={AiOutlineHome} label="Home" path="/" router={router} close={close} />
      <SidebarLink Icon={AiOutlineAppstore} label="Categories" path="/category" router={router} close={close} />
      <SidebarLink Icon={AiOutlineShop} label="Shop" path="/shop" router={router} close={close} />
      <SidebarLink Icon={GoListUnordered} label="Orders" path="/orders" router={router} close={close} />
      <SidebarLink Icon={AiOutlinePhone} label="Support" path="/support" router={router} close={close} />

      {/* Show Profile only if logged in */}
      {user && (
        <SidebarLink Icon={AiOutlineUser} label="Profile" path="/profile" router={router} close={close} />
      )}

      {/* Show Login only if NOT logged in */}
      {!user && (
        <SidebarLink Icon={AiOutlineLogin} label="Login" path="/login" router={router} close={close} />
      )}

      {/* Show Sign Out only if logged in */}
      {user && (
        <SidebarSignOut Icon={AiOutlineLogout} label="Sign Out" close={close} />
      )}
    </div>
  </motion.div>
);

const SidebarLink = ({ Icon, label, path, router, close }: any) => (
  <button
    onClick={() => {
      router.push(path);
      close();
    }}
    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-left transition"
  >
    <Icon size={20} /> {label}
  </button>
);

const SidebarSignOut = ({ Icon, label, close }: any) => (
  <button
    onClick={() => {
      signOut();
      close();
    }}
    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-900/30 hover:bg-red-800/40 text-left transition text-red-300"
  >
    <Icon size={20} /> {label}
  </button>
);
