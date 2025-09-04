// backend/routes/payment.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: "./Config/config.env" });

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Debug check
console.log("Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

// Helper: build Stripe line_items
const buildLineItems = (products) =>
  products.map((prod) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: prod.name,
        images: prod.image ? [prod.image] : [], // ✅ fallback for missing images
      },
      unit_amount: Math.round(prod.price * 100), // convert to paise
    },
    quantity: prod.quantity || 1,
  }));

// ✅ Payment Session Route
router.post("/create-payment-session", async (req, res) => {
  try {
    const { userId, product, products } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    let line_items = [];

    if (product) {
      // Single product checkout
      line_items = buildLineItems([{ ...product, quantity: 1 }]);
    } else if (products && products.length > 0) {
      // Full cart checkout
      line_items = buildLineItems(products);
    } else {
      return res.status(400).json({ error: "No product(s) provided" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

export default router;
