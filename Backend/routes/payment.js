// backend/routes/payment.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./Config/config.env" });

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

// Helper: convert products to Stripe line_items
const buildLineItems = (products) => {
  return products.map((prod) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: prod.name,
        images: [prod.image],
      },
      unit_amount: Math.round(prod.price * 100), // price in paise
    },
    quantity: prod.quantity || 1,
  }));
};

// Route: Create Payment Session
router.post("/create-payment-session", async (req, res) => {
  try {
    const { userId, product, products } = req.body;

    if (!userId || (!product && !products)) {
      return res.status(400).json({ error: "userId and product(s) required" });
    }

    // Determine items to charge
    const itemsToCharge = products ? products : [product];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: buildLineItems(itemsToCharge),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

export default router;
