import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
      productId,
      quantity,
    } = body;

    // ✅ VERIFY SIGNATURE
    const secret = process.env.RAZORPAY_KEY_SECRET!.trim();
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(text)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    await connectDb();
    const session = await auth();
    const userId = session?.user?.id;

    // ✅ MARK ORDER AS PAID
    await Order.findByIdAndUpdate(dbOrderId, {
      isPaid: true,
      "paymentDetails.razorpayPaymentId": razorpay_payment_id,
      "paymentDetails.razorpayOrderId": razorpay_order_id,
    });

    // ✅ DEDUCT STOCK
    if (productId && quantity) {
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity },
      });
    }

    // ✅ REMOVE FROM CART & ADD TO USER ORDERS
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        if (productId) {
          user.cart = user.cart.filter(
            (item: any) => item.product.toString() !== productId
          );
        }
        user.orders = user.orders || [];
        user.orders.push(dbOrderId);
        await user.save();
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("❌ RAZORPAY VERIFY ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}