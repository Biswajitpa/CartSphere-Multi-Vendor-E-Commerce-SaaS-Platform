"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"products" | "logo" | "done">("products");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 3600);
    const t3 = setTimeout(() => onFinish(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  const products = [
    { emoji: "👟", label: "Footwear", color: "#3b82f6", delay: 0 },
    { emoji: "📱", label: "Electronics", color: "#8b5cf6", delay: 0.1 },
    { emoji: "👗", label: "Fashion", color: "#ec4899", delay: 0.2 },
    { emoji: "🛋️", label: "Furniture", color: "#f59e0b", delay: 0.3 },
    { emoji: "📚", label: "Books", color: "#10b981", delay: 0.4 },
    { emoji: "⌚", label: "Accessories", color: "#ef4444", delay: 0.5 },
  ];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a0a",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Subtle radial glow behind everything */}
          <div
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            {/* ── Phase 1: product cards flying in ── */}
            {phase === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                  padding: 24,
                  maxWidth: 380,
                  width: "100%",
                }}
              >
                {products.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 60, scale: 0.7, rotate: -8 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{
                      delay: p.delay,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    style={{
                      background: "#141414",
                      border: `1.5px solid ${p.color}33`,
                      borderRadius: 16,
                      padding: "18px 8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* glow dot at top */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 60,
                        height: 4,
                        borderRadius: "0 0 8px 8px",
                        background: p.color,
                        opacity: 0.7,
                      }}
                    />
                    <span style={{ fontSize: 34 }}>{p.emoji}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#9ca3af",
                        letterSpacing: "0.04em",
                        textAlign: "center",
                      }}
                    >
                      {p.label}
                    </span>
                  </motion.div>
                ))}

                {/* Tagline below grid */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    color: "#4b5563",
                    fontSize: 13,
                    margin: "8px 0 0",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Everything in one place
                </motion.p>
              </motion.div>
            )}

            {/* ── Phase 2: logo reveal ── */}
            {phase === "logo" && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* Animated logo ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    border: "2px solid transparent",
                    borderTopColor: "#3b82f6",
                    borderRightColor: "#8b5cf6",
                    position: "absolute",
                  }}
                />
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#1a1a2e",
                    border: "1.5px solid #1e3a5f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    position: "relative",
                  }}
                >
                  🛒
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ textAlign: "center" }}
                >
                  <h1
                    style={{
                      color: "#ffffff",
                      fontSize: 32,
                      fontWeight: 700,
                      margin: 0,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Multi
                    <span style={{ color: "#3b82f6" }}>Cart</span>
                  </h1>
                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: 13,
                      margin: "6px 0 0",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Smart Multi-Vendor Commerce
                  </p>
                </motion.div>

                {/* Loading bar */}
                <motion.div
                  style={{
                    width: 160,
                    height: 2,
                    background: "#1f2937",
                    borderRadius: 4,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                      borderRadius: 4,
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
