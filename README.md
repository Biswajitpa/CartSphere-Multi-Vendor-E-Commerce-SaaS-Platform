<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B00,100:8A2BE2&height=200&section=header&text=CartSphere&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=35" width="100%"/>
</p>

<p align="center">
  <b>Enterprise Multi-Vendor E-Commerce SaaS Platform</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe%20%2F%20Razorpay-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Architecture-Multi--Tenant-informational?style=flat-square" />
  <img src="https://img.shields.io/badge/Realtime-Enabled-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/Maintained-Yes-success?style=flat-square" />
</p>

<p align="center">
  <a href="#-executive-summary">Executive Summary</a> •
  <a href="#-platform-architecture">Architecture</a> •
  <a href="#-role-based-modules">Modules</a> •
  <a href="#-real-time-chat-system">Chat System</a> •
  <a href="#-security--compliance">Security</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-scalability-strategy">Scalability</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🧭 Executive Summary

**CartSphere** is an enterprise-grade **multi-vendor e-commerce SaaS platform** — a single cloud-based marketplace where independent companies register, launch fully-managed storefronts, and sell products side by side, comparable in scope to Flipkart, Amazon, or Etsy's seller ecosystem.

Rather than a single-store shopping cart, CartSphere is architected as a **multi-tenant marketplace operating system**: every vendor operates an isolated business unit — its own catalog, inventory, orders, and analytics — while a central administrative layer governs onboarding, compliance, and platform-wide financial oversight.

| Pillar | What It Means Here |
|---|---|
| 🏢 **Multi-Tenancy** | Each vendor is a fully isolated business entity with independent data, branding, and operations |
| 🛡️ **Governance & Compliance** | GST verification, document review, and product-level approval gates before anything goes live |
| 📊 **Real-Time Business Intelligence** | Live revenue, order, and performance analytics across admin and vendor roles |
| 💬 **Integrated Communication** | Order-linked, real-time chat connecting customers, vendors, and support |

---

## 🏗️ Platform Architecture

CartSphere is built around **three role-scoped dashboards** — Administrator, Vendor, and Customer — sharing a common core (auth, catalog, orders, payments) while enforcing strict data and permission boundaries between tenants.

```
                        ┌───────────────────────────┐
                        │      Administrator         │
                        │  Vendor & Product Approval  │
                        │  Platform-Wide Analytics    │
                        └──────────────┬──────────────┘
                                       │ governs
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
      ┌───────▼────────┐      ┌────────▼────────┐      ┌────────▼────────┐
      │   Vendor A      │      │    Vendor B      │      │    Vendor C      │
      │ Own Catalog      │      │ Own Catalog      │      │ Own Catalog      │
      │ Own Orders       │      │ Own Orders       │      │ Own Orders       │
      │ Own Analytics    │      │ Own Analytics    │      │ Own Analytics    │
      └───────┬────────┘      └────────┬────────┘      └────────┬────────┘
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │ shop across all vendors
                              ┌────────▼─────────┐
                              │     Customers      │
                              │ Unified Marketplace │
                              └─────────────────────┘
```

### Architectural Principles

- **Tenant isolation** — every vendor's catalog, orders, and revenue data are logically partitioned, preventing cross-vendor data leakage
- **Approval-gated publishing** — no vendor or product reaches the marketplace without passing an explicit administrative checkpoint
- **Composable dashboards** — Admin, Vendor, and Customer experiences are built on shared primitives (auth, analytics, chat) but rendered as distinct, role-specific applications
- **API-first backend** — Next.js API routes expose a consistent contract consumed by all three dashboards, keeping business logic centralized

---

## ⚙️ Role-Based Modules

### 👨‍💼 Administrator — Marketplace Control Plane

**Vendor Governance**
- Approve / reject vendor registrations
- GST number & business document verification
- Suspend or block non-compliant vendors
- Manage vendor subscription tiers

**Product Approval Pipeline**
- Every product requires admin sign-off before going live
- Review images, pricing, and listing details
- Approve, reject-with-reason, or disable at any time

**Platform Intelligence Dashboard**
- Daily / Monthly / Yearly revenue
- Order funnel: total, pending, delivered, cancelled, returned
- Best-selling & top-rated products
- Top-performing vendors and revenue-by-vendor breakdown
- Sales trend graphs and order analytics

---

### 🏪 Vendor — Independent Store Operations

Each vendor operates a self-contained business dashboard:

| Category | Capabilities |
|---|---|
| Identity | Company profile, GST details, store logo & banner |
| Catalog | Product management, inventory management, stock monitoring |
| Orders | Order management, cancellations, returns |
| Growth | Sales analytics, revenue dashboard, coupon management |
| Reputation | Customer reviews & product ratings |

**Product Analytics** — daily / weekly / monthly sales, product-level revenue, best sellers, low-stock alerts, cancelled & returned order tracking.

**Delivery Configuration** — vendors independently control Cash-on-Delivery availability, delivery charges, free-delivery thresholds, estimated delivery windows, and serviceable locations.

---

### 🛍️ Customer — Unified Shopping Experience

**Authentication:** Email login, Google login, OTP verification.

**Discovery & Shopping:** Category/brand/price filtering, wishlist, cart, secure checkout.

**Orders:** Live tracking, pre-delivery OTP verification, real-time status updates, invoice download, full order history.

**Returns & Cancellations:** Order cancellation, return requests under a **7-day return policy**, refund and return-status tracking.

**Reviews & Ratings:** Post-delivery product and vendor ratings, written reviews, and image uploads — surfaced on both the product page and the vendor's dashboard.

---

## 🔍 Smart Product Discovery

A unified, instant filtering engine spans the entire multi-vendor catalog:

`Category` · `Brand` · `Vendor` · `Price Range` · `Rating` · `Discount` · `Availability` · `New Arrivals` · `Best Sellers` · `Popular Products`

---

## 💳 Payments & Delivery

| Payments | Delivery |
|---|---|
| Credit / Debit Cards | OTP verification before delivery |
| UPI | Live order tracking |
| Net Banking | Delivery notifications |
| Wallets | Delivery charge calculation |
| Cash on Delivery *(vendor-configurable)* | Free shipping rules & estimated delivery date |

---

## 💬 Real-Time Chat System

CartSphere ships with a **first-class, order-linked messaging layer** connecting customers, vendors, and admins — not a bolted-on support widget.

- Customers get a chat entry point automatically upon placing an order, scoped to that vendor and order
- Vendors respond in real time to product questions, delivery updates, and return/replacement discussions
- Admins can monitor conversations to resolve disputes and enforce marketplace policy

### Chat Capabilities

| Feature | Description |
|---|---|
| 💬 Real-Time Messaging | Instant Customer ↔ Vendor communication |
| 👨‍💼 Admin Oversight | Conversation monitoring for dispute resolution |
| 🟢 Presence | Online / offline status indicators |
| ✍️ Typing Indicators | Live typing feedback |
| ✅ Delivery & Read Receipts | Message-level confirmation |
| 🖼️ Media Sharing | Image and file attachments |
| 📦 Order-Scoped Threads | Conversations tied to specific orders |
| 🔔 Real-Time Notifications | Instant alerts on new messages |
| 📱 Responsive UI | Fully mobile-optimized chat interface |
| 🔒 Secure Transport | Encrypted communication channel |
| 🕒 Persistent History | Complete, searchable chat history |
| 🚫 Moderation | Block and report users |

---

## 🔐 Security & Compliance

| Layer | Control |
|---|---|
| Authentication | Auth.js (NextAuth), Google OAuth, Email login, OTP verification |
| Vendor Onboarding | Mandatory GST verification & business document review |
| Publishing Integrity | Admin approval gate on every vendor and every product |
| Order Integrity | OTP verification prior to delivery confirmation |
| Communication | Encrypted, order-scoped chat with block/report controls |
| Data Isolation | Per-vendor data partitioning across catalog, orders, and analytics |

---

## 📊 Real-Time Analytics

Both Admin and Vendor dashboards are powered by live data — revenue, order flow, product performance, and customer sentiment — rendered through interactive charts, enabling data-driven decisions across the marketplace without manual report generation.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React.js, TypeScript, Tailwind CSS, Shadcn UI |
| **Backend** | Node.js, Next.js API Routes |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | Auth.js (NextAuth), Google OAuth, Email Login |
| **Cloud Storage** | Cloudinary |
| **Payments** | Stripe / Razorpay |
| **Deployment** | Vercel, MongoDB Atlas, Cloudinary |

---

## 📈 Scalability Strategy

```
Current:   Multi-tenant monolith on Next.js API Routes  →  MongoDB Atlas (managed, sharding-ready)
Next:      Per-domain service boundaries (Catalog / Orders / Chat / Payments)
Future:    Dedicated realtime service for chat (WebSocket/Redis pub-sub)  →  Edge caching for catalog reads
```

- **MongoDB Atlas** provides managed scaling, replication, and sharding as vendor/catalog volume grows
- **Cloudinary** offloads media storage and transformation from application servers
- **Role-scoped API contracts** allow Admin, Vendor, and Customer surfaces to scale and deploy independently in the future
- **Order-scoped chat threads** are structured to migrate cleanly to a dedicated real-time messaging service under high concurrency

---

## 🌟 Why CartSphere?

CartSphere delivers an enterprise-level marketplace experience by combining multi-vendor management, GST verification, administrator-controlled product approvals, real-time analytics, intelligent product discovery, secure multi-method payments, OTP-based delivery verification, vendor-configurable shipping, and a full reviews-and-returns lifecycle — all on a scalable, role-secured, cloud-native foundation built for running multiple independent businesses on one platform.

---

## 🚀 Roadmap

- [ ] AI-driven product recommendations
- [ ] Vendor subscription tiering with usage-based billing
- [ ] Advanced fraud & anomaly detection for orders and reviews
- [ ] Dedicated real-time messaging microservice (WebSocket/Redis)
- [ ] Multi-currency & multi-region marketplace support
- [ ] Vendor-facing API for external inventory sync

---

## 👨‍💻 Author

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Engineered%20by-Biswajit%20Pattanaik-8A2BE2?style=for-the-badge" />
</p>

### **Biswajit Pattanaik**
**Full-Stack Developer • System Design Engineer • AI Integration • Backend Engineering • UI/UX Designer • DevOps & Deployment Engineer**

Designed, engineered, and deployed the **entire CartSphere platform** end-to-end — multi-tenant architecture, backend services, role-based dashboards, real-time chat system, and production infrastructure — as a single-owner, production-grade build.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:8A2BE2,100:FF6B00&height=100&section=footer" width="100%"/>
</p>
