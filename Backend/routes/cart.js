import express from "express";
import Cart from "../models/Cart.js";
import auth from "../middleware/auth.js"; // ✅ import middleware

const router = express.Router();

// Add or update item in cart
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token
    const { productId, name, price, quantity } = req.body;

    let existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      if (quantity <= 0) {
        await Cart.deleteOne({ userId, productId });
        return res.status(200).json({ success: true, message: "Item removed from cart" });
      } else {
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.status(200).json({ success: true, message: "Cart updated", cartItem: existingItem });
      }
    }

    if (quantity > 0) {
      const newCart = new Cart({ userId, productId, name, price, quantity });
      await newCart.save();
      return res.status(201).json({ success: true, message: "Item added to cart", cartItem: newCart });
    }

    res.status(400).json({ success: false, message: "Invalid quantity" });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all cart items for a user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token
    const cartItems = await Cart.find({ userId });
    res.json({ success: true, cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update quantity in cart
router.put("/:productId", auth, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token
    const { quantity } = req.body;
    const { productId } = req.params;

    let existingItem = await Cart.findOne({ userId, productId });

    if (!existingItem) return res.status(404).json({ success: false, message: "Item not found in cart" });

    if (quantity <= 0) {
      await Cart.deleteOne({ userId, productId });
      return res.status(200).json({ success: true, message: "Item removed from cart" });
    }

    existingItem.quantity = quantity;
    await existingItem.save();
    res.status(200).json({ success: true, message: "Quantity updated", cartItem: existingItem });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove product from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token
    const { productId } = req.params;

    await Cart.deleteOne({ userId, productId });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
