const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User"); // Adjust path if needed

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ Connection error:", err);
});

const createAdmin = async () => {
  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("⚠️ Admin already exists");
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = new User({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("✅ Admin user created!");
  process.exit();
};

createAdmin();
