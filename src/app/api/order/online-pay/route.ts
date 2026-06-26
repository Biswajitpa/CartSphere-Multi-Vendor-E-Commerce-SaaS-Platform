import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import { auth } from "@/auth";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    // ✅ AUTH
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // ✅ BODY DATA
    const {
      productId,
      quantity,
      address,
      amount,
      deliveryCharge,
      serviceCharge,
    } = await req.json();

    // ✅ BASIC VALIDATION
    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "ProductId and quantity required" },
        { status: 400 }
      );
    }

    // ✅ ADDRESS VALIDATION
    if (
      !address?.name ||
      !address?.phone ||
      !address?.address ||
      !address?.city ||
      !address?.pincode
    ) {
      return NextResponse.json(
        { message: "All address fields are required" },
        { status: 400 }
      );
    }

    // ✅ AMOUNT VALIDATION
    if (
      typeof amount !== "number" ||
      typeof deliveryCharge !== "number" ||
      typeof serviceCharge !== "number"
    ) {
      return NextResponse.json(
        { message: "Invalid amount, deliveryCharge or serviceCharge" },
        { status: 400 }
      );
    }

    // ✅ LOAD USER
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ LOAD PRODUCT
    const product: any = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ STOCK CHECK
    if (product.stock < quantity) {
      return NextResponse.json(
        { message: `Insufficient stock for ${product.title}` },
        { status: 400 }
      );
    }

    const productsTotal = product.price * quantity;

    // ✅ CREATE ORDER (isPaid: false — will be set true after payment verified)
    const order = await Order.create({
      buyer: userId,
      products: [
        {
          product: product._id,
          quantity,
          price: product.price,
        },
      ],
      productVendor: product.vendor,
      productsTotal,
      deliveryCharge,
      serviceCharge,
      totalAmount: amount,
      paymentMethod: "razorpay",
      isPaid: false,
      orderStatus: "pending",
      returnedAmount: 0,
      address,
    });

    // ✅ CREATE RAZORPAY ORDER
    // NOTE: Stock deduction, cart removal, and user.orders update
    // are done in /api/order/razorpay/verify AFTER payment succeeds
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: order._id.toString(),
      notes: {
        orderId: order._id.toString(),
        productId: product._id.toString(),
      },
    });

    // ✅ Return all data frontend needs (including productId & quantity for verify)
    return NextResponse.json(
      {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        dbOrderId: order._id.toString(),
        productName: product.title,
        userEmail: session.user.email,
        userName: session.user.name,
        productId: product._id.toString(), // ✅ needed by verify route
        quantity,                           // ✅ needed by verify route
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ RAZORPAY ORDER ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}