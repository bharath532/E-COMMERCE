// routes/cart.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ Add or update item in cart (POST)
router.post("/", async (req, res) => {
  try {
    const { userId, productId, name, price, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    // Check if product already exists for this user
    let existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      if (quantity <= 0) {
        // ❌ If quantity is 0 or less → delete item
        await Cart.deleteOne({ userId, productId });
        return res.status(200).json({ success: true, message: "Item removed from cart" });
      } else {
        // ✅ Update quantity
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.status(200).json({ success: true, message: "Cart updated", cartItem: existingItem });
      }
    }

    // ✅ If not exists, create new cart item (only if quantity > 0)
    if (quantity > 0) {
      const newCart = new Cart({ userId, productId, name, price, quantity });
      await newCart.save();
      return res.status(201).json({ success: true, message: "Item added to cart", cartItem: newCart });
    }

    res.status(400).json({ success: false, message: "Invalid quantity" });
  } catch (error) {
    console.error("❌ Error saving cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all cart items for a user (GET)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update quantity in cart (PUT)
router.put("/:productId", async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    if (!userId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "User ID & quantity required" });
    }

    let existingItem = await Cart.findOne({ userId, productId });

    if (!existingItem) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      // ❌ If quantity is 0 → remove item
      await Cart.deleteOne({ userId, productId });
      return res.status(200).json({ success: true, message: "Item removed from cart" });
    }

    // ✅ Update quantity
    existingItem.quantity = quantity;
    await existingItem.save();
    res.status(200).json({ success: true, message: "Quantity updated", cartItem: existingItem });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Remove product from cart (DELETE)
router.delete("/:productId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    await Cart.deleteOne({ userId, productId });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Error removing item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
