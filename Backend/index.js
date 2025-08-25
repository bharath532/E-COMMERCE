// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// ✅ Load environment variables
dotenv.config({ path: path.join(__dirname, 'Config', 'config.env') });

const app = express();

// ✅ Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // change port if needed
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

// ✅ MongoDB connection (clean & modern)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ DB Connected'))
  .catch((err) => console.error('❌ DB Connection Error:', err));


// ✅ Test route
app.get('/', (req, res) => {
    res.send('API is working');
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
