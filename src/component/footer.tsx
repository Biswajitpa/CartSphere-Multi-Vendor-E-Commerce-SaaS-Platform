"use client";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/user.model";

export default function Footer({ user }: { user: IUser }) {
  const router = useRouter();

  const role = user?.role; // "user" | "admin" | "vendor"
  const isUser = role === "user";
  const isAdminOrVendor = role === "admin" || role === "vendor";

  return (
    <footer className="bg-gradient-to-br from-[#1f1f1f] to-[#0f0f0f] w-full text-gray-300 z-40 py-12 border-t border-gray-700">
      <div
        className={`max-w-7xl mx-auto px-6 grid gap-10 text-center md:text-left
          ${
            isUser
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-3"
          }`}
      >
        {/* ── BRAND SECTION (all roles) ── */}
        <div className="space-y-4">
          <h2
            onClick={() => router.push("/")}
            className="text-white text-3xl font-bold cursor-pointer tracking-wide hover:text-blue-400 transition"
          >
            MultiCart
          </h2>

          <p className="text-sm leading-relaxed text-gray-400">
            Smart, secure &amp; scalable multi-vendor eCommerce platform built
            for performance and growth.
          </p>

          {/* Role badge */}
          {isAdminOrVendor && (
            <span
              className={`inline-block text-[11px] px-3 py-1 rounded-full text-white font-medium
                ${role === "admin" ? "bg-blue-600" : "bg-green-600"}`}
            >
              {role === "admin" ? "Admin Panel" : "Vendor Dashboard"}
            </span>
          )}

          {/* ── Social icons ── */}
          <div className="flex items-center gap-3 justify-center md:justify-start pt-1">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700 bg-[#1a1a1a] text-gray-400
                hover:border-[#0a66c2] hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700 bg-[#1a1a1a] text-gray-400
                hover:border-[#e1306c] hover:text-[#e1306c] hover:bg-[#e1306c]/10 transition-all duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:pattanabiswajit07@gmail.com"
              aria-label="Send email"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700 bg-[#1a1a1a] text-gray-400
                hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── QUICK LINKS (user only) ── */}
        {isUser && (
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "Categories", path: "/category" },
                { label: "Shop", path: "/shop" },
                { label: "Contact", path: "/contact" },
              ].map(({ label, path }) => (
                <li
                  key={path}
                  onClick={() => router.push(path)}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── HELP & SUPPORT (user only) ── */}
        {isUser && (
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Help &amp; support
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => router.push("/support")}
                className="cursor-pointer hover:text-white transition-colors"
              >
                Support
              </li>
              <li
                onClick={() => router.push("/orders")}
                className="cursor-pointer hover:text-white transition-colors"
              >
                Track order
              </li>
            </ul>
          </div>
        )}

        {/* ── ROLE PANEL (admin / vendor only) ── */}
        {isAdminOrVendor && (
          <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-3">
              {role === "admin" ? "System access" : "Vendor dashboard"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {role === "admin" ? (
                <>
                  <li>✔ Platform management</li>
                  <li>✔ Vendor control</li>
                  <li>✔ Orders &amp; revenue</li>
                  <li>✔ System security</li>
                </>
              ) : (
                <>
                  <li>✔ Product upload &amp; edit</li>
                  <li>✔ Order &amp; delivery tracking</li>
                  <li>✔ Sales &amp; profit analytics</li>
                  <li>✔ Wallet &amp; settlement</li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* ── CONTACT INFO (all roles) ── */}
        <div className="space-y-3">
          <h3 className="text-white text-lg font-semibold mb-4">
            Contact info
          </h3>

          {/* Email */}
          <div className="flex items-center gap-3 text-sm">
            <svg
              className="w-[17px] h-[17px] text-gray-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a
              href="mailto:pattanabiswajit07@gmail.com"
              className="text-gray-400 hover:text-indigo-400 transition-colors break-all"
            >
              pattanabiswajit07@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-sm">
            <svg
              className="w-[17px] h-[17px] text-gray-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href="tel:+918658846620"
              className="text-gray-400 hover:text-white transition-colors"
            >
              +91 8658846620
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 text-sm">
            <svg
              className="w-[17px] h-[17px] text-gray-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-gray-400">Khordha, India</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="text-center text-xs text-gray-500 mt-12 border-t border-gray-700 pt-4 px-6">
        © {new Date().getFullYear()} MultiCart — Powered by Secure Commerce
        Engine
      </div>
    </footer>
  );
}
